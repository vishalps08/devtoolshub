"use client";
import { useState, useEffect, useRef } from "react";
import ToolLayout, { ToolInput, ToolButton } from "@/components/ToolLayout";

function qrEncode(text: string, canvas: HTMLCanvasElement) {
  const size = 256;
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, size, size);
  // Use a QR API image as fallback since pure JS QR encoding is complex
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.onload = () => { ctx.drawImage(img, 0, 0, size, size); };
  img.src = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}`;
}

export default function QrCodeGenerator() {
  const [input, setInput] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [generated, setGenerated] = useState(false);

  const generate = () => {
    if (!input || !canvasRef.current) return;
    qrEncode(input, canvasRef.current);
    setGenerated(true);
  };

  const download = () => {
    if (!canvasRef.current) return;
    const a = document.createElement("a");
    a.href = canvasRef.current.toDataURL("image/png");
    a.download = "qrcode.png";
    a.click();
  };

  return (
    <ToolLayout title="QR Code Generator" description="Generate QR codes from any text or URL.">
      <ToolInput label="Text or URL" value={input} onChange={setInput} placeholder="https://example.com" />
      <div className="flex gap-2">
        <ToolButton onClick={generate} disabled={!input}>Generate QR</ToolButton>
        {generated && <ToolButton onClick={download}>Download PNG</ToolButton>}
      </div>
      <div className="flex justify-center rounded-xl border border-zinc-200 bg-white p-4 dark:border-white/10 dark:bg-white/[0.03]">
        <canvas ref={canvasRef} width={256} height={256} className="rounded" />
      </div>
    </ToolLayout>
  );
}
