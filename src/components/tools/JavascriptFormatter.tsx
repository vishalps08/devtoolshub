"use client";
import { useState } from "react";
import ToolLayout, { ToolInput, ToolOutput, ToolButton } from "@/components/ToolLayout";

function formatJs(js: string): string {
  let result = "";
  let indent = 0;
  const tab = "  ";
  let inString: string | null = null;
  let escaped = false;

  for (let i = 0; i < js.length; i++) {
    const ch = js[i];
    if (escaped) { result += ch; escaped = false; continue; }
    if (ch === "\\") { result += ch; escaped = true; continue; }
    if (inString) { result += ch; if (ch === inString) inString = null; continue; }
    if (ch === '"' || ch === "'" || ch === "`") { result += ch; inString = ch; continue; }
    if (ch === "{" || ch === "[") { indent++; result += ch + "\n" + tab.repeat(indent); continue; }
    if (ch === "}" || ch === "]") { indent = Math.max(0, indent - 1); result += "\n" + tab.repeat(indent) + ch; continue; }
    if (ch === ";") { result += ";\n" + tab.repeat(indent); continue; }
    if (ch === ",") { result += ",\n" + tab.repeat(indent); continue; }
    result += ch;
  }
  return result.replace(/\n\s*\n/g, "\n").trim();
}

export default function JavascriptFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  return (
    <ToolLayout title="JavaScript Formatter" description="Beautify and format JavaScript code.">
      <ToolInput label="Paste JavaScript" value={input} onChange={setInput} placeholder='const x = {a: 1, b: [2, 3]};' textarea />
      <ToolButton onClick={() => setOutput(formatJs(input))}>Format</ToolButton>
      <ToolOutput label="Formatted" value={output} />
    </ToolLayout>
  );
}
