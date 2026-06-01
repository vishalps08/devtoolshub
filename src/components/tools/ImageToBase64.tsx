"use client";
import { useState, useRef } from "react";
import ToolLayout, { ToolOutput } from "@/components/ToolLayout";

export default function ImageToBase64() {
  const [output, setOutput] = useState("");
  const [fileName, setFileName] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = () => setOutput(reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <ToolLayout title="Image to Base64" description="Convert images to Base64 encoded strings.">
      <div>
        <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
        <button
          onClick={() => fileRef.current?.click()}
          className="rounded-xl border-2 border-dashed border-zinc-300 bg-zinc-50 px-6 py-8 text-sm text-zinc-500 transition-colors hover:border-violet-400 hover:bg-violet-50 dark:border-white/10 dark:bg-white/[0.02] dark:hover:border-violet-500/50 dark:hover:bg-violet-500/5 w-full"
        >
          {fileName || "Click to select an image"}
        </button>
      </div>
      <ToolOutput label="Base64 Data URI" value={output} />
    </ToolLayout>
  );
}
