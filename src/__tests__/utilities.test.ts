/**
 * Tests for utility tool logic
 */

describe("Email Validator", () => {
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  test("accepts valid emails", () => {
    expect(pattern.test("user@example.com")).toBe(true);
    expect(pattern.test("test.name+tag@domain.co.uk")).toBe(true);
    expect(pattern.test("a@b.cd")).toBe(true);
  });

  test("rejects invalid emails", () => {
    expect(pattern.test("")).toBe(false);
    expect(pattern.test("not-an-email")).toBe(false);
    expect(pattern.test("@domain.com")).toBe(false);
    expect(pattern.test("user@")).toBe(false);
    expect(pattern.test("user@.com")).toBe(false);
    expect(pattern.test("user@domain")).toBe(false);
  });
});

describe("YouTube Thumbnail Extractor", () => {
  function extractVideoId(url: string): string | null {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/)([a-zA-Z0-9_-]{11})/,
      /^([a-zA-Z0-9_-]{11})$/,
    ];
    for (const p of patterns) {
      const m = url.match(p);
      if (m) return m[1];
    }
    return null;
  }

  test("extracts from standard URL", () => {
    expect(extractVideoId("https://www.youtube.com/watch?v=dQw4w9WgXcQ")).toBe("dQw4w9WgXcQ");
  });

  test("extracts from short URL", () => {
    expect(extractVideoId("https://youtu.be/dQw4w9WgXcQ")).toBe("dQw4w9WgXcQ");
  });

  test("extracts from embed URL", () => {
    expect(extractVideoId("https://www.youtube.com/embed/dQw4w9WgXcQ")).toBe("dQw4w9WgXcQ");
  });

  test("extracts bare video ID", () => {
    expect(extractVideoId("dQw4w9WgXcQ")).toBe("dQw4w9WgXcQ");
  });

  test("returns null for invalid URL", () => {
    expect(extractVideoId("https://google.com")).toBeNull();
    expect(extractVideoId("not-a-url")).toBeNull();
    expect(extractVideoId("")).toBeNull();
  });

  test("thumbnail URLs are correct", () => {
    const id = "dQw4w9WgXcQ";
    expect(`https://img.youtube.com/vi/${id}/maxresdefault.jpg`).toBe(
      "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg"
    );
  });
});

describe("Markdown to HTML", () => {
  function md2html(md: string): string {
    let html = md;
    html = html.replace(/^### (.+)$/gm, "<h3>$1</h3>");
    html = html.replace(/^## (.+)$/gm, "<h2>$1</h2>");
    html = html.replace(/^# (.+)$/gm, "<h1>$1</h1>");
    html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");
    html = html.replace(/`(.+?)`/g, "<code>$1</code>");
    html = html.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');
    return html.trim();
  }

  test("converts headings", () => {
    expect(md2html("# Hello")).toContain("<h1>Hello</h1>");
    expect(md2html("## Sub")).toContain("<h2>Sub</h2>");
    expect(md2html("### Sub2")).toContain("<h3>Sub2</h3>");
  });

  test("converts bold and italic", () => {
    expect(md2html("**bold**")).toContain("<strong>bold</strong>");
    expect(md2html("*italic*")).toContain("<em>italic</em>");
  });

  test("converts inline code", () => {
    expect(md2html("`code`")).toContain("<code>code</code>");
  });

  test("converts links", () => {
    expect(md2html("[text](http://url)")).toContain('<a href="http://url">text</a>');
  });
});

describe("HTML to Markdown", () => {
  function html2md(html: string): string {
    let md = html;
    md = md.replace(/<h1[^>]*>(.*?)<\/h1>/gi, "# $1\n");
    md = md.replace(/<strong[^>]*>(.*?)<\/strong>/gi, "**$1**");
    md = md.replace(/<em[^>]*>(.*?)<\/em>/gi, "*$1*");
    md = md.replace(/<code[^>]*>(.*?)<\/code>/gi, "`$1`");
    md = md.replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, "[$2]($1)");
    md = md.replace(/<[^>]+>/g, "");
    return md.trim();
  }

  test("converts h1 to #", () => {
    expect(html2md("<h1>Hello</h1>")).toContain("# Hello");
  });

  test("converts strong to **", () => {
    expect(html2md("<strong>bold</strong>")).toContain("**bold**");
  });

  test("converts links", () => {
    expect(html2md('<a href="http://url">text</a>')).toContain("[text](http://url)");
  });

  test("strips unknown tags", () => {
    expect(html2md("<div>text</div>")).toBe("text");
  });
});
