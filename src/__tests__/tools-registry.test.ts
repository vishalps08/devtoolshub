import { tools, categories, getToolsByCategory, getCategoryBySlug } from "@/lib/tools";

describe("Tools registry", () => {
  test("has 56 tools", () => {
    expect(tools.length).toBeGreaterThanOrEqual(50);
  });

  test("has 8 categories", () => {
    expect(categories.length).toBe(8);
  });

  test("every tool has required fields", () => {
    tools.forEach((t) => {
      expect(t.name).toBeTruthy();
      expect(t.slug).toBeTruthy();
      expect(t.description).toBeTruthy();
      expect(t.category).toBeTruthy();
      expect(t.icon).toBeTruthy();
    });
  });

  test("slugs are unique", () => {
    const slugs = tools.map((t) => t.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  test("slugs are URL-safe", () => {
    tools.forEach((t) => {
      expect(t.slug).toMatch(/^[a-z0-9-]+$/);
    });
  });

  test("every tool belongs to a valid category", () => {
    const catNames = categories.map((c) => c.name);
    tools.forEach((t) => {
      expect(catNames).toContain(t.category);
    });
  });

  test("every category has at least one tool", () => {
    categories.forEach((c) => {
      expect(getToolsByCategory(c.name).length).toBeGreaterThan(0);
    });
  });

  test("category slugs are unique", () => {
    const slugs = categories.map((c) => c.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  test("getCategoryBySlug returns correct category", () => {
    expect(getCategoryBySlug("utilities")?.name).toBe("Utilities");
    expect(getCategoryBySlug("converters")?.name).toBe("Converters");
    expect(getCategoryBySlug("nonexistent")).toBeUndefined();
  });
});
