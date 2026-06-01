"use client";
import { useState } from "react";
import ToolLayout, { ToolInput, ToolOutput, ToolButton } from "@/components/ToolLayout";

function formatXml(xml: string): string {
  const tab = "  ";
  let formatted = "";
  let indent = 0;
  const nodes = xml.replace(/>\s*</g, ">\n<").split("\n");
  for (const node of nodes) {
    const n = node.trim();
    if (!n) continue;
    if (n.startsWith("</")) indent = Math.max(0, indent - 1);
    formatted += tab.repeat(indent) + n + "\n";
    if (n.startsWith("<") && !n.startsWith("</") && !n.endsWith("/>") && !n.startsWith("<?") && !n.startsWith("<!")) {
      indent++;
    }
  }
  return formatted.trim();
}

export default function XmlFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  return (
    <ToolLayout title="XML Formatter" description="Format and beautify XML documents.">
      <ToolInput label="Paste XML" value={input} onChange={setInput} placeholder='<root><item><name>Test</name></item></root>' textarea />
      <ToolButton onClick={() => setOutput(formatXml(input))}>Format</ToolButton>
      <ToolOutput label="Formatted XML" value={output} />
    </ToolLayout>
  );
}
