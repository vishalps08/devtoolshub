"use client";
import { useState } from "react";
import ToolLayout, { ToolInput, ToolOutput, ToolButton } from "@/components/ToolLayout";

function formatHtml(html: string, indent: number): string {
  const tab = " ".repeat(indent);
  let result = "";
  let level = 0;
  const tokens = html.replace(/>\s*</g, ">\n<").split("\n");
  for (const token of tokens) {
    const t = token.trim();
    if (!t) continue;
    if (t.startsWith("</")) level = Math.max(0, level - 1);
    result += tab.repeat(level) + t + "\n";
    if (t.startsWith("<") && !t.startsWith("</") && !t.endsWith("/>") && !t.startsWith("<!") && !/^<(br|hr|img|input|meta|link)[\s>]/i.test(t)) {
      level++;
    }
  }
  return result.trim();
}

export default function HtmlFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  return (
    <ToolLayout title="HTML Formatter" description="Beautify and indent HTML code.">
      <ToolInput label="Paste HTML" value={input} onChange={setInput} placeholder="<div><p>Hello</p></div>" textarea />
      <ToolButton onClick={() => setOutput(formatHtml(input, 2))}>Format</ToolButton>
      <ToolOutput label="Formatted HTML" value={output} />
    </ToolLayout>
  );
}
