"use client";
import { useState } from "react";
import ToolLayout, { ToolInput, ToolOutput } from "@/components/ToolLayout";

function rot13(str: string): string {
  return str.replace(/[a-zA-Z]/g, (c) => {
    const base = c <= "Z" ? 65 : 97;
    return String.fromCharCode(((c.charCodeAt(0) - base + 13) % 26) + base);
  });
}

export default function Rot13Encoder() {
  const [input, setInput] = useState("");
  return (
    <ToolLayout title="ROT13 Encoder" description="Encode text using the ROT13 cipher.">
      <ToolInput label="Enter text" value={input} onChange={setInput} placeholder="Hello World" textarea />
      <ToolOutput label="ROT13 encoded" value={rot13(input)} />
    </ToolLayout>
  );
}
