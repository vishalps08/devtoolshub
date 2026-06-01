"use client";
import ImageConverter from "./ImageConverter";
export default function WebpToPng() {
  return <ImageConverter title="WebP to PNG" description="Convert WebP images to PNG format." acceptTypes="image/webp" outputFormat="image/png" outputExt="png" />;
}
