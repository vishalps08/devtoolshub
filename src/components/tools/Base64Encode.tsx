"use client";
import { useState } from "react";
import ToolLayout, { ToolInput, ToolOutput } from "@/components/ToolLayout";

export default function Base64Encode() {
  const [input, setInput] = useState("");
  let output = "";
  try { output = input ? btoa(unescape(encodeURIComponent(input))) : ""; } catch { output = "Encoding error"; }

  return (
    <ToolLayout title="Base64 Encode" description="Encode text to Base64 format.">
      <ToolInput label="Enter text" value={input} onChange={setInput} placeholder="Hello, World!" textarea />
      <ToolOutput label="Base64" value={output} />
    </ToolLayout>
  );
}
