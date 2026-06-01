/**
 * Tests for SEO tool output generation
 */

describe("Meta Tags Generator", () => {
  function generateMeta(opts: { title?: string; desc?: string; keywords?: string; url?: string }): string {
    return [
      opts.title && `<meta name="title" content="${opts.title}">`,
      opts.desc && `<meta name="description" content="${opts.desc}">`,
      opts.keywords && `<meta name="keywords" content="${opts.keywords}">`,
      opts.url && `<link rel="canonical" href="${opts.url}">`,
    ].filter(Boolean).join("\n");
  }

  test("generates title meta tag", () => {
    const output = generateMeta({ title: "Test Page" });
    expect(output).toContain('content="Test Page"');
  });

  test("generates all tags when all fields provided", () => {
    const output = generateMeta({ title: "T", desc: "D", keywords: "K", url: "U" });
    expect(output.split("\n").length).toBe(4);
  });

  test("skips empty fields", () => {
    const output = generateMeta({ title: "T" });
    expect(output.split("\n").length).toBe(1);
  });
});

describe("Open Graph Generator", () => {
  function generateOg(opts: { title?: string; desc?: string; url?: string; image?: string; siteName?: string }): string {
    return [
      `<meta property="og:type" content="website">`,
      opts.title && `<meta property="og:title" content="${opts.title}">`,
      opts.desc && `<meta property="og:description" content="${opts.desc}">`,
      opts.url && `<meta property="og:url" content="${opts.url}">`,
      opts.image && `<meta property="og:image" content="${opts.image}">`,
      opts.siteName && `<meta property="og:site_name" content="${opts.siteName}">`,
    ].filter(Boolean).join("\n");
  }

  test("always includes og:type", () => {
    expect(generateOg({})).toContain('og:type');
  });

  test("includes all provided fields", () => {
    const output = generateOg({ title: "T", desc: "D", url: "U", image: "I", siteName: "S" });
    expect(output).toContain("og:title");
    expect(output).toContain("og:image");
    expect(output).toContain("og:site_name");
  });
});

describe("Twitter Card Generator", () => {
  function generateTwitter(opts: { card?: string; title?: string; desc?: string; image?: string; site?: string }): string {
    return [
      `<meta name="twitter:card" content="${opts.card || "summary"}">`,
      opts.title && `<meta name="twitter:title" content="${opts.title}">`,
      opts.desc && `<meta name="twitter:description" content="${opts.desc}">`,
      opts.image && `<meta name="twitter:image" content="${opts.image}">`,
      opts.site && `<meta name="twitter:site" content="${opts.site}">`,
    ].filter(Boolean).join("\n");
  }

  test("defaults to summary card", () => {
    expect(generateTwitter({})).toContain('content="summary"');
  });

  test("supports summary_large_image", () => {
    expect(generateTwitter({ card: "summary_large_image" })).toContain("summary_large_image");
  });

  test("includes site handle", () => {
    expect(generateTwitter({ site: "@mysite" })).toContain("@mysite");
  });
});
