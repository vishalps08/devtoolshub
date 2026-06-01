"use client";
import ImageConverter from "./ImageConverter";
export default function JpgToWebp() {
  return <ImageConverter title="JPG to WebP" description="Convert JPG images to WebP format." acceptTypes="image/jpeg" outputFormat="image/webp" outputExt="webp" />;
}
