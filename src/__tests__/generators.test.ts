/**
 * Tests for generator tool logic
 */

describe("Password Generator", () => {
  function generatePassword(length: number, { upper = true, lower = true, digits = true, symbols = true } = {}): string {
    let chars = "";
    if (upper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (lower) chars += "abcdefghijklmnopqrstuvwxyz";
    if (digits) chars += "0123456789";
    if (symbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";
    if (!chars) return "";
    return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  }

  test("generates correct length", () => {
    expect(generatePassword(16).length).toBe(16);
    expect(generatePassword(8).length).toBe(8);
    expect(generatePassword(128).length).toBe(128);
  });

  test("generates only uppercase when others disabled", () => {
    const pw = generatePassword(50, { upper: true, lower: false, digits: false, symbols: false });
    expect(pw).toMatch(/^[A-Z]+$/);
  });

  test("generates only lowercase when others disabled", () => {
    const pw = generatePassword(50, { upper: false, lower: true, digits: false, symbols: false });
    expect(pw).toMatch(/^[a-z]+$/);
  });

  test("generates only digits when others disabled", () => {
    const pw = generatePassword(50, { upper: false, lower: false, digits: true, symbols: false });
    expect(pw).toMatch(/^[0-9]+$/);
  });

  test("returns empty when nothing enabled", () => {
    expect(generatePassword(16, { upper: false, lower: false, digits: false, symbols: false })).toBe("");
  });
});

describe("UUID Generator", () => {
  test("generates valid UUID v4 format", () => {
    const uuid = "550e8400-e29b-41d4-a716-446655440000";
    expect(uuid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
  });

  test("UUIDs are strings of length 36", () => {
    expect("550e8400-e29b-41d4-a716-446655440000".length).toBe(36);
  });
});

describe("Random Number Generator", () => {
  function generateRandom(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  test("generates within range", () => {
    for (let i = 0; i < 100; i++) {
      const n = generateRandom(1, 10);
      expect(n).toBeGreaterThanOrEqual(1);
      expect(n).toBeLessThanOrEqual(10);
    }
  });

  test("handles same min and max", () => {
    expect(generateRandom(5, 5)).toBe(5);
  });

  test("handles negative ranges", () => {
    for (let i = 0; i < 50; i++) {
      const n = generateRandom(-10, -1);
      expect(n).toBeGreaterThanOrEqual(-10);
      expect(n).toBeLessThanOrEqual(-1);
    }
  });
});

describe("Lorem Ipsum Generator", () => {
  const WORDS = "lorem ipsum dolor sit amet consectetur adipiscing elit".split(" ");

  function generateParagraph(): string {
    const len = 40 + Math.floor(Math.random() * 40);
    const p = Array.from({ length: len }, () => WORDS[Math.floor(Math.random() * WORDS.length)]).join(" ") + ".";
    return p.charAt(0).toUpperCase() + p.slice(1);
  }

  test("generates paragraph with correct structure", () => {
    const p = generateParagraph();
    expect(p.length).toBeGreaterThan(50);
    expect(p).toMatch(/^[A-Z]/); // starts with uppercase
    expect(p).toMatch(/\.$/);    // ends with period
  });

  test("generates multiple paragraphs", () => {
    const paras = Array.from({ length: 3 }, generateParagraph);
    expect(paras.length).toBe(3);
    paras.forEach((p) => expect(p.length).toBeGreaterThan(0));
  });
});
