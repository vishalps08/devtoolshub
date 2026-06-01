"use client";
import { useState } from "react";
import ToolLayout, { ToolInput, ToolOutput } from "@/components/ToolLayout";

export default function TextToBinary() {
  const [input, setInput] = useState("");
  const output = input
    ? input.split("").map((c) => c.charCodeAt(0).toString(2).padStart(8, "0")).join(" ")
    : "";

  return (
    <ToolLayout title="Text to Binary" description="Convert text to binary representation.">
      <ToolInput label="Enter text" value={input} onChange={setInput} placeholder="Hello" textarea />
      <ToolOutput label="Binary" value={output} />
    </ToolLayout>
  );
}
