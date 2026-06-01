"use client";
import { useState } from "react";
import ToolLayout, { ToolInput, ToolOutput } from "@/components/ToolLayout";

function rot13(str: string): string {
  return str.replace(/[a-zA-Z]/g, (c) => {
    const base = c <= "Z" ? 65 : 97;
    return String.fromCharCode(((c.charCodeAt(0) - base + 13) % 26) + base);
  });
}

export default function Rot13Decoder() {
  const [input, setInput] = useState("");
  return (
    <ToolLayout title="ROT13 Decoder" description="Decode ROT13-encoded text.">
      <ToolInput label="Enter ROT13 text" value={input} onChange={setInput} placeholder="Uryyb Jbeyq" textarea />
      <ToolOutput label="Decoded text" value={rot13(input)} />
    </ToolLayout>
  );
}
