"use client";
import { useState, useCallback } from "react";
import ToolLayout, { ToolInput, ToolOutput, ToolButton } from "@/components/ToolLayout";

async function hash(algo: string, text: string): Promise<string> {
  const data = new TextEncoder().encode(text);
  const buf = await crypto.subtle.digest(algo, data);
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

export default function HashGenerator() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const generate = useCallback(async () => {
    if (!input) return;
    const [sha1, sha256, sha512] = await Promise.all([
      hash("SHA-1", input),
      hash("SHA-256", input),
      hash("SHA-512", input),
    ]);
    setOutput(`SHA-1:\n${sha1}\n\nSHA-256:\n${sha256}\n\nSHA-512:\n${sha512}`);
  }, [input]);

  return (
    <ToolLayout title="Hash Generator" description="Generate various hash digests from text.">
      <ToolInput label="Enter text" value={input} onChange={setInput} placeholder="Hello World" textarea />
      <ToolButton onClick={generate} disabled={!input}>Generate Hashes</ToolButton>
      <ToolOutput label="Hashes" value={output} />
    </ToolLayout>
  );
}
