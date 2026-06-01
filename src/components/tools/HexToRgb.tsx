"use client";
import { useState } from "react";
import ToolLayout, { ToolInput, ToolOutput } from "@/components/ToolLayout";

export default function HexToRgb() {
  const [input, setInput] = useState("");

  let output = "";
  const hex = input.replace("#", "").trim();
  if (/^[0-9a-fA-F]{6}$/.test(hex)) {
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    output = `rgb(${r}, ${g}, ${b})`;
  } else if (hex.length > 0) {
    output = "Invalid hex color";
  }

  return (
    <ToolLayout title="Hex to RGB" description="Convert hex color codes to RGB values.">
      <div className="flex items-end gap-3">
        <div className="flex-1">
          <ToolInput label="Hex color" value={input} onChange={setInput} placeholder="#4c3ff2" />
        </div>
        {/^[0-9a-fA-F]{6}$/.test(hex) && (
          <div className="h-10 w-10 shrink-0 rounded-lg border border-zinc-200 dark:border-white/10" style={{ backgroundColor: `#${hex}` }} />
        )}
      </div>
      <ToolOutput label="RGB" value={output} />
    </ToolLayout>
  );
}
