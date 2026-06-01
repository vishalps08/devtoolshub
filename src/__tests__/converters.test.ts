/**
 * Pure logic tests for converter tools
 */

describe("Hex to RGB", () => {
  function hexToRgb(hex: string): string | null {
    const h = hex.replace("#", "").trim();
    if (!/^[0-9a-fA-F]{6}$/.test(h)) return null;
    const r = parseInt(h.slice(0, 2), 16);
    const g = parseInt(h.slice(2, 4), 16);
    const b = parseInt(h.slice(4, 6), 16);
    return `rgb(${r}, ${g}, ${b})`;
  }

  test("converts valid hex to RGB", () => {
    expect(hexToRgb("#ffffff")).toBe("rgb(255, 255, 255)");
    expect(hexToRgb("#000000")).toBe("rgb(0, 0, 0)");
    expect(hexToRgb("#4c3ff2")).toBe("rgb(76, 63, 242)");
    expect(hexToRgb("ff5733")).toBe("rgb(255, 87, 51)");
  });

  test("returns null for invalid hex", () => {
    expect(hexToRgb("xyz")).toBeNull();
    expect(hexToRgb("#fff")).toBeNull(); // 3-char not supported
    expect(hexToRgb("")).toBeNull();
  });
});

describe("RGB to Hex", () => {
  function rgbToHex(r: number, g: number, b: number): string {
    return `#${[r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("")}`;
  }

  test("converts valid RGB to hex", () => {
    expect(rgbToHex(255, 255, 255)).toBe("#ffffff");
    expect(rgbToHex(0, 0, 0)).toBe("#000000");
    expect(rgbToHex(76, 63, 242)).toBe("#4c3ff2");
  });

  test("handles edge values", () => {
    expect(rgbToHex(0, 0, 0)).toBe("#000000");
    expect(rgbToHex(255, 255, 255)).toBe("#ffffff");
  });
});

describe("Timestamp Converter", () => {
  test("converts unix timestamp to date", () => {
    const date = new Date(1700000000 * 1000);
    expect(date.toISOString()).toBe("2023-11-14T22:13:20.000Z");
  });

  test("converts date to unix timestamp", () => {
    const d = new Date("2024-01-15T12:00:00Z");
    expect(Math.floor(d.getTime() / 1000)).toBe(1705320000);
  });

  test("handles millisecond timestamps", () => {
    const ts = 1700000000000;
    const date = new Date(ts);
    expect(date.toISOString()).toBe("2023-11-14T22:13:20.000Z");
  });

  test("invalid date returns NaN", () => {
    const d = new Date("not-a-date");
    expect(isNaN(d.getTime())).toBe(true);
  });
});

describe("CSV to JSON", () => {
  function csvToJson(csv: string): Record<string, string>[] | null {
    const lines = csv.trim().split("\n").map((l) => l.split(",").map((c) => c.trim()));
    if (lines.length < 2) return null;
    const headers = lines[0];
    return lines.slice(1).map((row) => {
      const obj: Record<string, string> = {};
      headers.forEach((h, i) => { obj[h] = row[i] ?? ""; });
      return obj;
    });
  }

  test("converts simple CSV", () => {
    const csv = "name,age\nAlice,30\nBob,25";
    const result = csvToJson(csv);
    expect(result).toEqual([
      { name: "Alice", age: "30" },
      { name: "Bob", age: "25" },
    ]);
  });

  test("handles single row", () => {
    expect(csvToJson("name,age")).toBeNull();
  });

  test("handles missing values", () => {
    const csv = "a,b,c\n1,2";
    const result = csvToJson(csv);
    expect(result![0]).toEqual({ a: "1", b: "2", c: "" });
  });
});

describe("JSON to CSV", () => {
  function jsonToCsv(data: Record<string, unknown>[]): string {
    const headers = Object.keys(data[0]);
    const rows = data.map((row) => headers.map((h) => String(row[h] ?? "")).join(","));
    return [headers.join(","), ...rows].join("\n");
  }

  test("converts simple JSON array", () => {
    const data = [{ name: "Alice", age: 30 }, { name: "Bob", age: 25 }];
    expect(jsonToCsv(data)).toBe("name,age\nAlice,30\nBob,25");
  });
});

describe("Memory Storage Converter", () => {
  const multipliers = [1, 1024, 1024 ** 2, 1024 ** 3, 1024 ** 4, 1024 ** 5];

  test("converts MB to bytes", () => {
    expect(1 * multipliers[2]).toBe(1048576);
  });

  test("converts GB to MB", () => {
    expect((1 * multipliers[3]) / multipliers[2]).toBe(1024);
  });

  test("converts TB to GB", () => {
    expect((1 * multipliers[4]) / multipliers[3]).toBe(1024);
  });

  test("converts 1 byte to KB", () => {
    expect(1 / multipliers[1]).toBeCloseTo(0.000977, 4);
  });
});
