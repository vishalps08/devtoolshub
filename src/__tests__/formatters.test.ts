/**
 * Tests for formatter/beautifier tool logic
 */

describe("JSON Formatter", () => {
  test("formats valid JSON", () => {
    const input = '{"a":1,"b":[2,3]}';
    const output = JSON.stringify(JSON.parse(input), null, 2);
    expect(output).toContain('"a": 1');
    expect(output).toContain('"b": [\n');
  });

  test("minifies JSON", () => {
    const input = '{\n  "a": 1,\n  "b": 2\n}';
    expect(JSON.stringify(JSON.parse(input))).toBe('{"a":1,"b":2}');
  });

  test("rejects invalid JSON", () => {
    expect(() => JSON.parse("{not json}")).toThrow();
    expect(() => JSON.parse("")).toThrow();
  });

  test("handles nested objects", () => {
    const input = '{"a":{"b":{"c":1}}}';
    const output = JSON.stringify(JSON.parse(input), null, 2);
    expect(output.split("\n").length).toBeGreaterThan(3);
  });

  test("handles arrays", () => {
    const input = '[1,2,3]';
    const output = JSON.stringify(JSON.parse(input), null, 2);
    expect(output).toContain("[\n");
  });
});

describe("HTML Formatter", () => {
  function formatHtml(html: string): string {
    const tab = "  ";
    let result = "";
    let level = 0;
    const tokens = html.replace(/>\s*</g, ">\n<").split("\n");
    for (const token of tokens) {
      const t = token.trim();
      if (!t) continue;
      if (t.startsWith("</")) level = Math.max(0, level - 1);
      result += tab.repeat(level) + t + "\n";
      if (t.startsWith("<") && !t.startsWith("</") && !t.endsWith("/>") && !t.startsWith("<!") && !/^<(br|hr|img|input|meta|link)[\s>]/i.test(t)) {
        level++;
      }
    }
    return result.trim();
  }

  test("indents nested elements", () => {
    const output = formatHtml("<div><p>Hello</p></div>");
    expect(output).toContain("  <p>Hello</p>");
  });

  test("handles self-closing tags", () => {
    const output = formatHtml("<div><br/><img src='x'/></div>");
    expect(output).not.toBe(""); // should not crash
  });

  test("handles empty input", () => {
    expect(formatHtml("")).toBe("");
  });
});

describe("CSS Formatter", () => {
  function formatCss(css: string): string {
    let result = css;
    result = result.replace(/\s*{\s*/g, " {\n  ");
    result = result.replace(/\s*}\s*/g, "\n}\n\n");
    result = result.replace(/;\s*/g, ";\n  ");
    result = result.replace(/\n  \n}/g, "\n}");
    result = result.replace(/\n{3,}/g, "\n\n");
    return result.trim();
  }

  function minifyCss(css: string): string {
    return css.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\s+/g, " ").replace(/\s*([{}:;,])\s*/g, "$1").trim();
  }

  test("formats minified CSS", () => {
    const output = formatCss("body{margin:0;padding:0;}");
    expect(output).toContain("body {");
    expect(output).toContain("margin:0;");
  });

  test("minifies CSS", () => {
    const output = minifyCss("body {\n  margin: 0;\n  padding: 0;\n}");
    expect(output).toBe("body{margin:0;padding:0;}");
  });

  test("removes comments when minifying", () => {
    const output = minifyCss("/* comment */ body { color: red; }");
    expect(output).not.toContain("comment");
  });
});

describe("SQL Formatter", () => {
  const KEYWORDS = ["SELECT", "FROM", "WHERE", "ORDER BY", "GROUP BY", "JOIN", "LIMIT"];

  function formatSql(sql: string): string {
    let result = sql.trim();
    for (const kw of KEYWORDS) {
      result = result.replace(new RegExp(`\\b${kw}\\b`, "gi"), `\n${kw.toUpperCase()}`);
    }
    return result.replace(/^\n/, "").trim();
  }

  test("adds newlines before keywords", () => {
    const output = formatSql("select id from users where active = 1");
    expect(output).toContain("\nFROM");
    expect(output).toContain("\nWHERE");
  });

  test("uppercases keywords", () => {
    const output = formatSql("select id from users");
    expect(output).toContain("SELECT");
    expect(output).toContain("FROM");
  });
});

describe("XML Formatter", () => {
  function formatXml(xml: string): string {
    const tab = "  ";
    let formatted = "";
    let indent = 0;
    const nodes = xml.replace(/>\s*</g, ">\n<").split("\n");
    for (const node of nodes) {
      const n = node.trim();
      if (!n) continue;
      if (n.startsWith("</")) indent = Math.max(0, indent - 1);
      formatted += tab.repeat(indent) + n + "\n";
      if (n.startsWith("<") && !n.startsWith("</") && !n.endsWith("/>") && !n.startsWith("<?") && !n.startsWith("<!")) {
        indent++;
      }
    }
    return formatted.trim();
  }

  test("indents nested XML", () => {
    const output = formatXml("<root><item>text</item></root>");
    expect(output).toContain("  <item>text</item>");
  });

  test("handles self-closing tags", () => {
    const output = formatXml("<root><item/></root>");
    expect(output).toContain("  <item/>");
  });
});
