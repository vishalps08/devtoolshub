/**
 * Pure logic tests for all encoder/decoder tools
 */

describe("URL Encoder/Decoder", () => {
  test("encodes special characters", () => {
    expect(encodeURIComponent("hello world")).toBe("hello%20world");
    expect(encodeURIComponent("a=1&b=2")).toBe("a%3D1%26b%3D2");
    expect(encodeURIComponent("https://example.com/path?q=test")).toBe(
      "https%3A%2F%2Fexample.com%2Fpath%3Fq%3Dtest"
    );
  });

  test("decodes encoded strings", () => {
    expect(decodeURIComponent("hello%20world")).toBe("hello world");
    expect(decodeURIComponent("a%3D1%26b%3D2")).toBe("a=1&b=2");
  });

  test("decoding invalid string throws", () => {
    expect(() => decodeURIComponent("%E0%A4%A")).toThrow();
  });
});

describe("Base64 Encode/Decode", () => {
  test("encodes text to base64", () => {
    expect(btoa("Hello, World!")).toBe("SGVsbG8sIFdvcmxkIQ==");
    expect(btoa("")).toBe("");
  });

  test("decodes base64 to text", () => {
    expect(atob("SGVsbG8sIFdvcmxkIQ==")).toBe("Hello, World!");
    expect(atob("")).toBe("");
  });

  test("decoding invalid base64 throws", () => {
    expect(() => atob("not-valid-base64!!!")).toThrow();
  });

  test("roundtrip encoding", () => {
    const original = "Testing 123 !@#$%";
    expect(atob(btoa(original))).toBe(original);
  });
});

describe("ROT13", () => {
  function rot13(str: string): string {
    return str.replace(/[a-zA-Z]/g, (c) => {
      const base = c <= "Z" ? 65 : 97;
      return String.fromCharCode(((c.charCodeAt(0) - base + 13) % 26) + base);
    });
  }

  test("encodes alphabetic characters", () => {
    expect(rot13("Hello")).toBe("Uryyb");
    expect(rot13("abc")).toBe("nop");
    expect(rot13("ABC")).toBe("NOP");
  });

  test("preserves non-alphabetic characters", () => {
    expect(rot13("Hello, World! 123")).toBe("Uryyb, Jbeyq! 123");
  });

  test("double ROT13 returns original", () => {
    expect(rot13(rot13("Hello World"))).toBe("Hello World");
  });

  test("empty string returns empty", () => {
    expect(rot13("")).toBe("");
  });
});

describe("Binary to Text / Text to Binary", () => {
  function textToBinary(text: string): string {
    return text.split("").map((c) => c.charCodeAt(0).toString(2).padStart(8, "0")).join(" ");
  }

  function binaryToText(binary: string): string {
    return binary.trim().split(/\s+/).map((b) => String.fromCharCode(parseInt(b, 2))).join("");
  }

  test("converts text to binary", () => {
    expect(textToBinary("A")).toBe("01000001");
    expect(textToBinary("Hi")).toBe("01001000 01101001");
  });

  test("converts binary to text", () => {
    expect(binaryToText("01000001")).toBe("A");
    expect(binaryToText("01001000 01101001")).toBe("Hi");
  });

  test("roundtrip conversion", () => {
    const original = "Hello World";
    expect(binaryToText(textToBinary(original))).toBe(original);
  });

  test("empty input", () => {
    expect(textToBinary("")).toBe("");
  });
});
