"use client";
import ImageConverter from "./ImageConverter";
export default function JpgToPng() {
  return <ImageConverter title="JPG to PNG" description="Convert JPG images to PNG format." acceptTypes="image/jpeg" outputFormat="image/png" outputExt="png" />;
}
