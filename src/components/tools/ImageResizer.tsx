"use client";
import { useState, useRef } from "react";
import ToolLayout, { ToolButton } from "@/components/ToolLayout";

export default function ImageResizer() {
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [origW, setOrigW] = useState(0);
  const [origH, setOrigH] = useState(0);
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [lock, setLock] = useState(true);
  const [resized, setResized] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setResized(null);
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => { setOrigW(img.width); setOrigH(img.height); setWidth(String(img.width)); setHeight(String(img.height)); };
      img.src = reader.result as string;
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const onW = (v: string) => {
    setWidth(v);
    if (lock && origW) setHeight(String(Math.round((+v / origW) * origH)));
  };
  const onH = (v: string) => {
    setHeight(v);
    if (lock && origH) setWidth(String(Math.round((+v / origH) * origW)));
  };

  const resize = () => {
    if (!preview) return;
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = +width || img.width;
      canvas.height = +height || img.height;
      canvas.getContext("2d")!.drawImage(img, 0, 0, canvas.width, canvas.height);
      setResized(canvas.toDataURL("image/png"));
    };
    img.src = preview;
  };

  const download = () => {
    if (!resized) return;
    const a = document.createElement("a");
    a.href = resized;
    a.download = fileName.replace(/\.[^.]+$/, "") + `-${width}x${height}.png`;
    a.click();
  };

  const inputCls = "w-24 rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-900 outline-none focus:border-violet-400 dark:border-white/10 dark:bg-white/5 dark:text-white";

  return (
    <ToolLayout title="Image Resizer" description="Resize images to any dimension.">
      <div>
        <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
        <button onClick={() => fileRef.current?.click()} className="rounded-xl border-2 border-dashed border-zinc-300 bg-zinc-50 px-6 py-8 text-sm text-zinc-500 transition-colors hover:border-violet-400 hover:bg-violet-50 dark:border-white/10 dark:bg-white/[0.02] dark:hover:border-violet-500/50 dark:hover:bg-violet-500/5 w-full">
          {fileName ? `${fileName} (${origW}×${origH})` : "Click to select an image"}
        </button>
      </div>
      {preview && (
        <>
          <div className="flex flex-wrap items-end gap-3">
            <div><label className="mb-1.5 block text-xs font-medium text-zinc-600 dark:text-zinc-400">Width</label><input type="number" value={width} onChange={(e) => onW(e.target.value)} className={inputCls} /></div>
            <div><label className="mb-1.5 block text-xs font-medium text-zinc-600 dark:text-zinc-400">Height</label><input type="number" value={height} onChange={(e) => onH(e.target.value)} className={inputCls} /></div>
            <label className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
              <input type="checkbox" checked={lock} onChange={(e) => setLock(e.target.checked)} className="h-4 w-4 accent-violet-600 rounded" /> Lock ratio
            </label>
          </div>
          <div className="flex gap-2">
            <ToolButton onClick={resize}>Resize</ToolButton>
            {resized && <ToolButton onClick={download}>Download</ToolButton>}
          </div>
        </>
      )}
    </ToolLayout>
  );
}
