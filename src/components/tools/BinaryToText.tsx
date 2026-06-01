"use client";
import { useState } from "react";
import ToolLayout, { ToolInput, ToolOutput } from "@/components/ToolLayout";

export default function BinaryToText() {
  const [input, setInput] = useState("");
  let output = "";
  try {
    output = input.trim()
      ? input.trim().split(/\s+/).map((b) => String.fromCharCode(parseInt(b, 2))).join("")
      : "";
  } catch { output = "Invalid binary input"; }

  return (
    <ToolLayout title="Binary to Text" description="Convert binary code to readable text.">
      <ToolInput label="Enter binary (space-separated)" value={input} onChange={setInput} placeholder="01001000 01100101 01101100 01101100 01101111" textarea />
      <ToolOutput label="Text" value={output} />
    </ToolLayout>
  );
}
