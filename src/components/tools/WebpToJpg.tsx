"use client";
import ImageConverter from "./ImageConverter";
export default function WebpToJpg() {
  return <ImageConverter title="WebP to JPG" description="Convert WebP images to JPG format." acceptTypes="image/webp" outputFormat="image/jpeg" outputExt="jpg" />;
}
