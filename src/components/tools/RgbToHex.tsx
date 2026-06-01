"use client";
import { useState } from "react";
import ToolLayout, { ToolOutput } from "@/components/ToolLayout";

export default function RgbToHex() {
  const [r, setR] = useState("76");
  const [g, setG] = useState("63");
  const [b, setB] = useState("242");

  const valid = [r, g, b].every((v) => { const n = parseInt(v); return !isNaN(n) && n >= 0 && n <= 255; });
  const hex = valid ? `#${[r, g, b].map((v) => parseInt(v).toString(16).padStart(2, "0")).join("")}` : "";

  const inputCls = "w-20 rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-900 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-500/20 dark:border-white/10 dark:bg-white/5 dark:text-white";
  const labelCls = "mb-1.5 block text-xs font-medium text-zinc-600 dark:text-zinc-400";

  return (
    <ToolLayout title="RGB to Hex" description="Convert RGB values to hex color codes.">
      <div className="flex items-end gap-3">
        <div><label className={labelCls}>R</label><input type="number" min={0} max={255} value={r} onChange={(e) => setR(e.target.value)} className={inputCls} /></div>
        <div><label className={labelCls}>G</label><input type="number" min={0} max={255} value={g} onChange={(e) => setG(e.target.value)} className={inputCls} /></div>
        <div><label className={labelCls}>B</label><input type="number" min={0} max={255} value={b} onChange={(e) => setB(e.target.value)} className={inputCls} /></div>
        {valid && <div className="h-10 w-10 shrink-0 rounded-lg border border-zinc-200 dark:border-white/10" style={{ backgroundColor: hex }} />}
      </div>
      <ToolOutput label="Hex" value={hex} />
    </ToolLayout>
  );
}
