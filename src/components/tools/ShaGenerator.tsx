"use client";
import { useState, useCallback } from "react";
import ToolLayout, { ToolInput, ToolOutput, ToolButton } from "@/components/ToolLayout";

async function sha(algo: string, text: string): Promise<string> {
  const buf = await crypto.subtle.digest(algo, new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

export default function ShaGenerator() {
  const [input, setInput] = useState("");
  const [algo, setAlgo] = useState("SHA-256");
  const [output, setOutput] = useState("");

  const generate = useCallback(async () => {
    if (input) setOutput(await sha(algo, input));
  }, [input, algo]);

  return (
    <ToolLayout title="SHA Generator" description="Generate SHA-1, SHA-256, and SHA-512 hashes.">
      <ToolInput label="Enter text" value={input} onChange={setInput} placeholder="Hello World" textarea />
      <div className="flex items-end gap-3">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-zinc-600 dark:text-zinc-400">Algorithm</label>
          <select value={algo} onChange={(e) => setAlgo(e.target.value)} className="rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-900 outline-none dark:border-white/10 dark:bg-white/5 dark:text-white">
            <option value="SHA-1">SHA-1</option>
            <option value="SHA-256">SHA-256</option>
            <option value="SHA-512">SHA-512</option>
          </select>
        </div>
        <ToolButton onClick={generate} disabled={!input}>Generate</ToolButton>
      </div>
      <ToolOutput label={`${algo} Hash`} value={output} />
    </ToolLayout>
  );
}
