/**
 * Tests for security/encryption tool logic
 */

describe("MD5 Generator", () => {
  // Pure JS MD5 implementation (same as in the component)
  function md5(str: string): string {
    function rotl(v: number, s: number) { return (v << s) | (v >>> (32 - s)); }
    const K = [
      0xd76aa478,0xe8c7b756,0x242070db,0xc1bdceee,0xf57c0faf,0x4787c62a,0xa8304613,0xfd469501,
      0x698098d8,0x8b44f7af,0xffff5bb1,0x895cd7be,0x6b901122,0xfd987193,0xa679438e,0x49b40821,
      0xf61e2562,0xc040b340,0x265e5a51,0xe9b6c7aa,0xd62f105d,0x02441453,0xd8a1e681,0xe7d3fbc8,
      0x21e1cde6,0xc33707d6,0xf4d50d87,0x455a14ed,0xa9e3e905,0xfcefa3f8,0x676f02d9,0x8d2a4c8a,
      0xfffa3942,0x8771f681,0x6d9d6122,0xfde5380c,0xa4beea44,0x4bdecfa9,0xf6bb4b60,0xbebfbc70,
      0x289b7ec6,0xeaa127fa,0xd4ef3085,0x04881d05,0xd9d4d039,0xe6db99e5,0x1fa27cf8,0xc4ac5665,
      0xf4292244,0x432aff97,0xab9423a7,0xfc93a039,0x655b59c3,0x8f0ccc92,0xffeff47d,0x85845dd1,
      0x6fa87e4f,0xfe2ce6e0,0xa3014314,0x4e0811a1,0xf7537e82,0xbd3af235,0x2ad7d2bb,0xeb86d391,
    ];
    const S = [7,12,17,22,7,12,17,22,7,12,17,22,7,12,17,22,5,9,14,20,5,9,14,20,5,9,14,20,5,9,14,20,4,11,16,23,4,11,16,23,4,11,16,23,4,11,16,23,6,10,15,21,6,10,15,21,6,10,15,21,6,10,15,21];
    const bytes = new TextEncoder().encode(str);
    const bitLen = bytes.length * 8;
    const padded = new Uint8Array(((bytes.length + 9 + 63) & ~63));
    padded.set(bytes); padded[bytes.length] = 0x80;
    const view = new DataView(padded.buffer);
    view.setUint32(padded.length - 8, bitLen >>> 0, true);
    view.setUint32(padded.length - 4, Math.floor(bitLen / 0x100000000), true);
    let a0 = 0x67452301, b0 = 0xefcdab89, c0 = 0x98badcfe, d0 = 0x10325476;
    for (let i = 0; i < padded.length; i += 64) {
      const M = new Uint32Array(16);
      for (let j = 0; j < 16; j++) M[j] = view.getUint32(i + j * 4, true);
      let A = a0, B = b0, C = c0, D = d0;
      for (let j = 0; j < 64; j++) {
        let F: number, g: number;
        if (j < 16) { F = (B & C) | (~B & D); g = j; }
        else if (j < 32) { F = (D & B) | (~D & C); g = (5 * j + 1) % 16; }
        else if (j < 48) { F = B ^ C ^ D; g = (3 * j + 5) % 16; }
        else { F = C ^ (B | ~D); g = (7 * j) % 16; }
        F = (F + A + K[j] + M[g]) >>> 0;
        A = D; D = C; C = B; B = (B + rotl(F, S[j])) >>> 0;
      }
      a0 = (a0 + A) >>> 0; b0 = (b0 + B) >>> 0; c0 = (c0 + C) >>> 0; d0 = (d0 + D) >>> 0;
    }
    return [a0, b0, c0, d0].map(v => {
      const b = new Uint8Array(4); new DataView(b.buffer).setUint32(0, v, true);
      return Array.from(b, x => x.toString(16).padStart(2, "0")).join("");
    }).join("");
  }

  test("generates correct MD5 for known inputs", () => {
    expect(md5("")).toBe("d41d8cd98f00b204e9800998ecf8427e");
    expect(md5("hello")).toBe("5d41402abc4b2a76b9719d911017c592");
    expect(md5("Hello World")).toBe("b10a8db164e0754105b7a99be72e3fe5");
  });

  test("generates 32-char hex string", () => {
    const hash = md5("test");
    expect(hash.length).toBe(32);
    expect(hash).toMatch(/^[0-9a-f]{32}$/);
  });

  test("different inputs produce different hashes", () => {
    expect(md5("hello")).not.toBe(md5("world"));
    expect(md5("abc")).not.toBe(md5("abd"));
  });

  test("same input produces same hash", () => {
    expect(md5("consistent")).toBe(md5("consistent"));
  });
});

describe("Password Strength Test", () => {
  function analyze(pw: string) {
    const checks = [
      { label: "8+ chars", pass: pw.length >= 8 },
      { label: "12+ chars", pass: pw.length >= 12 },
      { label: "uppercase", pass: /[A-Z]/.test(pw) },
      { label: "lowercase", pass: /[a-z]/.test(pw) },
      { label: "numbers", pass: /[0-9]/.test(pw) },
      { label: "symbols", pass: /[^a-zA-Z0-9]/.test(pw) },
      { label: "no common", pass: !/^(123|abc|password|qwerty)/i.test(pw) },
    ];
    return checks.filter((c) => c.pass).length;
  }

  test("empty password scores 1 (only no-common-pattern passes)", () => {
    expect(analyze("")).toBe(1);
  });

  test("weak password scores low", () => {
    expect(analyze("abc")).toBeLessThanOrEqual(2);
  });

  test("strong password scores high", () => {
    expect(analyze("Str0ng!P@ssw0rd")).toBeGreaterThanOrEqual(6);
  });

  test("common patterns reduce score", () => {
    expect(analyze("password123")).toBeLessThan(analyze("x9K#mL2$pQ"));
  });

  test("longer passwords score higher", () => {
    expect(analyze("Ab1!xxxxxxxxxx")).toBeGreaterThan(analyze("Ab1!"));
  });
});
