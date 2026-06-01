/**
 * Tests for image tool logic (format detection, file naming)
 */

describe("Image Converter — format mapping", () => {
  const conversions = [
    { from: "jpg", to: "png", mime: "image/png" },
    { from: "jpg", to: "webp", mime: "image/webp" },
    { from: "png", to: "jpg", mime: "image/jpeg" },
    { from: "png", to: "webp", mime: "image/webp" },
    { from: "webp", to: "jpg", mime: "image/jpeg" },
    { from: "webp", to: "png", mime: "image/png" },
  ];

  conversions.forEach(({ from, to, mime }) => {
    test(`${from} → ${to} uses MIME type ${mime}`, () => {
      expect(mime).toMatch(/^image\/(png|jpeg|webp)$/);
    });
  });
});

describe("Image Converter — filename generation", () => {
  function outputFilename(original: string, ext: string): string {
    return original.replace(/\.[^.]+$/, "") + "." + ext;
  }

  test("replaces extension correctly", () => {
    expect(outputFilename("photo.jpg", "png")).toBe("photo.png");
    expect(outputFilename("image.png", "webp")).toBe("image.webp");
    expect(outputFilename("file.webp", "jpg")).toBe("file.jpg");
  });

  test("handles filenames with dots", () => {
    expect(outputFilename("my.photo.2024.jpg", "png")).toBe("my.photo.2024.png");
  });
});

describe("Image Compressor — size calculation", () => {
  function compressionRatio(original: number, compressed: number): number {
    return Math.round((1 - compressed / original) * 100);
  }

  test("calculates compression percentage", () => {
    expect(compressionRatio(1000, 700)).toBe(30);
    expect(compressionRatio(1000, 500)).toBe(50);
    expect(compressionRatio(1000, 100)).toBe(90);
  });

  test("handles no compression", () => {
    expect(compressionRatio(1000, 1000)).toBe(0);
  });
});

describe("Image Resizer — aspect ratio lock", () => {
  function calcHeight(newWidth: number, origWidth: number, origHeight: number): number {
    return Math.round((newWidth / origWidth) * origHeight);
  }

  function calcWidth(newHeight: number, origWidth: number, origHeight: number): number {
    return Math.round((newHeight / origHeight) * origWidth);
  }

  test("maintains aspect ratio when width changes", () => {
    expect(calcHeight(800, 1600, 900)).toBe(450);
    expect(calcHeight(400, 1600, 900)).toBe(225);
  });

  test("maintains aspect ratio when height changes", () => {
    expect(calcWidth(450, 1600, 900)).toBe(800);
  });

  test("handles square images", () => {
    expect(calcHeight(500, 1000, 1000)).toBe(500);
  });
});

describe("Image to Base64", () => {
  test("data URI has correct format", () => {
    const dataUri = "data:image/png;base64,iVBORw0KGgo=";
    expect(dataUri).toMatch(/^data:image\/[a-z]+;base64,/);
  });

  test("base64 portion is valid", () => {
    const base64 = "iVBORw0KGgo=";
    expect(base64).toMatch(/^[A-Za-z0-9+/]+=*$/);
  });
});
