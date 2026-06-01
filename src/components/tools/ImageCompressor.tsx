"use client";
import { useState, useRef } from "react";
import ToolLayout, { ToolButton } from "@/components/ToolLayout";

export default function ImageCompressor() {
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [quality, setQuality] = useState(0.7);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);
  const [compressed, setCompressed] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setOriginalSize(file.size);
    setCompressed(null);
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const compress = () => {
    if (!preview) return;
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      canvas.getContext("2d")!.drawImage(img, 0, 0);
      const dataUrl = canvas.toDataURL("image/jpeg", quality);
      setCompressed(dataUrl);
      setCompressedSize(Math.round((dataUrl.length - "data:image/jpeg;base64,".length) * 0.75));
    };
    img.src = preview;
  };

  const download = () => {
    if (!compressed) return;
    const a = document.createElement("a");
    a.href = compressed;
    a.download = fileName.replace(/\.[^.]+$/, "") + "-compressed.jpg";
    a.click();
  };

  const fmt = (bytes: number) => bytes > 1024 * 1024 ? (bytes / 1024 / 1024).toFixed(2) + " MB" : (bytes / 1024).toFixed(1) + " KB";

  return (
    <ToolLayout title="Image Compressor" description="Compress images without losing quality.">
      <div>
        <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
        <button onClick={() => fileRef.current?.click()} className="rounded-xl border-2 border-dashed border-zinc-300 bg-zinc-50 px-6 py-8 text-sm text-zinc-500 transition-colors hover:border-violet-400 hover:bg-violet-50 dark:border-white/10 dark:bg-white/[0.02] dark:hover:border-violet-500/50 dark:hover:bg-violet-500/5 w-full">
          {fileName || "Click to select an image"}
        </button>
      </div>
      {preview && (
        <>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-zinc-600 dark:text-zinc-400">Quality: {Math.round(quality * 100)}%</label>
            <input type="range" min={0.1} max={1} step={0.05} value={quality} onChange={(e) => setQuality(+e.target.value)} className="w-60 accent-violet-600" />
          </div>
          <div className="flex gap-2">
            <ToolButton onClick={compress}>Compress</ToolButton>
            {compressed && <ToolButton onClick={download}>Download</ToolButton>}
          </div>
          {compressed && (
            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-white/10 dark:bg-white/[0.02]">
              <p className="text-sm text-zinc-700 dark:text-zinc-300">
                Original: <strong>{fmt(originalSize)}</strong> → Compressed: <strong>{fmt(compressedSize)}</strong>
                <span className="ml-2 text-green-600 dark:text-green-400">({Math.round((1 - compressedSize / originalSize) * 100)}% smaller)</span>
              </p>
            </div>
          )}
        </>
      )}
    </ToolLayout>
  );
}
