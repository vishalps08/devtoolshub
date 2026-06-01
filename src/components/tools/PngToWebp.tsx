"use client";
import ImageConverter from "./ImageConverter";
export default function PngToWebp() {
  return <ImageConverter title="PNG to WebP" description="Convert PNG images to WebP format." acceptTypes="image/png" outputFormat="image/webp" outputExt="webp" />;
}
