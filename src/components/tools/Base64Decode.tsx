"use client";
import { useState } from "react";
import ToolLayout, { ToolInput, ToolOutput } from "@/components/ToolLayout";

export default function Base64Decode() {
  const [input, setInput] = useState("");
  let output = "";
  try { output = input ? decodeURIComponent(escape(atob(input))) : ""; } catch { output = "Invalid Base64 string"; }

  return (
    <ToolLayout title="Base64 Decode" description="Decode Base64 back to plain text.">
      <ToolInput label="Enter Base64" value={input} onChange={setInput} placeholder="SGVsbG8sIFdvcmxkIQ==" textarea />
      <ToolOutput label="Decoded text" value={output} />
    </ToolLayout>
  );
}
