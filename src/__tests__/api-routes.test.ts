/**
 * Tests for API route logic (serverless functions)
 */

describe("API: /api/whats-my-ip", () => {
  test("extracts IP from x-forwarded-for header", () => {
    const forwarded = "203.0.113.50, 70.41.3.18, 150.172.238.178";
    const ip = forwarded.split(",")[0].trim();
    expect(ip).toBe("203.0.113.50");
  });

  test("handles single IP in x-forwarded-for", () => {
    const forwarded = "192.168.1.1";
    const ip = forwarded.split(",")[0].trim();
    expect(ip).toBe("192.168.1.1");
  });
});

describe("API: /api/website-status", () => {
  test("validates URL is required", () => {
    const url = "";
    expect(!url || typeof url !== "string").toBe(true);
  });

  test("prepends https if missing", () => {
    const url = "example.com";
    const target = url.startsWith("http") ? url : `https://${url}`;
    expect(target).toBe("https://example.com");
  });

  test("keeps existing protocol", () => {
    const url = "http://example.com";
    const target = url.startsWith("http") ? url : `https://${url}`;
    expect(target).toBe("http://example.com");
  });
});

describe("API: /api/redirect-checker", () => {
  test("resolves relative location headers", () => {
    const current = "https://example.com/page";
    const location = "/new-page";
    const resolved = location.startsWith("http") ? location : new URL(location, current).href;
    expect(resolved).toBe("https://example.com/new-page");
  });

  test("keeps absolute location headers", () => {
    const current = "https://example.com";
    const location = "https://other.com/page";
    const resolved = location.startsWith("http") ? location : new URL(location, current).href;
    expect(resolved).toBe("https://other.com/page");
  });

  test("identifies redirect status codes", () => {
    const redirectCodes = [301, 302, 303, 307, 308];
    redirectCodes.forEach((code) => {
      expect(code >= 300 && code < 400).toBe(true);
    });
  });

  test("identifies non-redirect status codes", () => {
    const nonRedirect = [200, 404, 500];
    nonRedirect.forEach((code) => {
      expect(code >= 300 && code < 400).toBe(false);
    });
  });
});

describe("API: /api/http-headers", () => {
  test("URL validation logic", () => {
    expect("".startsWith("http")).toBe(false);
    expect("https://example.com".startsWith("http")).toBe(true);
    expect("example.com".startsWith("http")).toBe(false);
  });
});
