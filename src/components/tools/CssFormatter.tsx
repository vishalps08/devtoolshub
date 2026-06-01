"use client";
import { useState } from "react";
import ToolLayout, { ToolInput, ToolOutput, ToolButton } from "@/components/ToolLayout";

function formatCss(css: string): string {
  let result = css;
  result = result.replace(/\s*{\s*/g, " {\n  ");
  result = result.replace(/\s*}\s*/g, "\n}\n\n");
  result = result.replace(/;\s*/g, ";\n  ");
  result = result.replace(/\n  \n}/g, "\n}");
  result = result.replace(/\n{3,}/g, "\n\n");
  return result.trim();
}

function minifyCss(css: string): string {
  return css.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\s+/g, " ").replace(/\s*([{}:;,])\s*/g, "$1").trim();
}

export default function CssFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  return (
    <ToolLayout title="CSS Formatter" description="Format and beautify CSS code.">
      <ToolInput label="Paste CSS" value={input} onChange={setInput} placeholder="body{margin:0;padding:0;}" textarea />
      <div className="flex gap-2">
        <ToolButton onClick={() => setOutput(formatCss(input))}>Format</ToolButton>
        <ToolButton onClick={() => setOutput(minifyCss(input))}>Minify</ToolButton>
      </div>
      <ToolOutput label="Output" value={output} />
    </ToolLayout>
  );
}
