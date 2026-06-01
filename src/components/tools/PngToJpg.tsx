"use client";
import ImageConverter from "./ImageConverter";
export default function PngToJpg() {
  return <ImageConverter title="PNG to JPG" description="Convert PNG images to JPG format." acceptTypes="image/png" outputFormat="image/jpeg" outputExt="jpg" />;
}
