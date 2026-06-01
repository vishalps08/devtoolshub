"use client";
import { useState } from "react";
import ToolLayout, { ToolInput, ToolOutput } from "@/components/ToolLayout";

export default function UrlEncoder() {
  const [input, setInput] = useState("");
  const encoded = input ? encodeURIComponent(input) : "";

  return (
    <ToolLayout title="URL Encoder" description="Encode your URL to make it transmission-safe.">
      <ToolInput label="Enter URL or text" value={input} onChange={setInput} placeholder="https://example.com/path?q=hello world" />
      <ToolOutput label="Encoded" value={encoded} />
    </ToolLayout>
  );
}
