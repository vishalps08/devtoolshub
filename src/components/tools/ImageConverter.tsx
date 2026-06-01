"use client";
import { useState, useRef } from "react";
import ToolLayout, { ToolButton } from "@/components/ToolLayout";

interface ImageConverterProps {
  title: string;
  description: string;
  acceptTypes: string;
  outputFormat: "image/png" | "image/jpeg" | "image/webp";
  outputExt: string;
}

export default function ImageConverter({ title, description, acceptTypes, outputFormat, outputExt }: ImageConverterProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [converted, setConverted] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setConverted(null);
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const convert = () => {
    if (!preview) return;
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      setConverted(canvas.toDataURL(outputFormat, 0.92));
    };
    img.src = preview;
  };

  const download = () => {
    if (!converted) return;
    const a = document.createElement("a");
    a.href = converted;
    a.download = fileName.replace(/\.[^.]+$/, "") + "." + outputExt;
    a.click();
  };

  return (
    <ToolLayout title={title} description={description}>
      <div>
        <input ref={fileRef} type="file" accept={acceptTypes} onChange={handleFile} className="hidden" />
        <button
          onClick={() => fileRef.current?.click()}
          className="rounded-xl border-2 border-dashed border-zinc-300 bg-zinc-50 px-6 py-8 text-sm text-zinc-500 transition-colors hover:border-violet-400 hover:bg-violet-50 dark:border-white/10 dark:bg-white/[0.02] dark:hover:border-violet-500/50 dark:hover:bg-violet-500/5 w-full"
        >
          {fileName || "Click to select an image"}
        </button>
      </div>
      {preview && (
        <>
          <div className="flex gap-2">
            <ToolButton onClick={convert}>Convert to {outputExt.toUpperCase()}</ToolButton>
            {converted && <ToolButton onClick={download}>Download</ToolButton>}
          </div>
          <div className="flex gap-4 overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 p-3 dark:border-white/10 dark:bg-white/[0.02]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview} alt="Original" className="max-h-48 rounded object-contain" />
            {converted && (
              <>
                <div className="self-center text-zinc-400">→</div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={converted} alt="Converted" className="max-h-48 rounded object-contain" />
              </>
            )}
          </div>
        </>
      )}
    </ToolLayout>
  );
}
