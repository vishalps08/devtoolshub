"use client";
import { useState } from "react";
import ToolLayout, { ToolInput, ToolOutput } from "@/components/ToolLayout";

export default function UrlDecoder() {
  const [input, setInput] = useState("");
  let decoded = "";
  try { decoded = input ? decodeURIComponent(input) : ""; } catch { decoded = "Invalid encoded URL"; }

  return (
    <ToolLayout title="URL Decoder" description="Decode any URL that has been encoded.">
      <ToolInput label="Enter encoded URL" value={input} onChange={setInput} placeholder="https%3A%2F%2Fexample.com" />
      <ToolOutput label="Decoded" value={decoded} />
    </ToolLayout>
  );
}
