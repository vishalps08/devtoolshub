"use client";
import { useState } from "react";
import ToolLayout, { ToolInput, ToolOutput, ToolButton } from "@/components/ToolLayout";

export default function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [indent, setIndent] = useState(2);

  const format = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, indent));
    } catch (e) {
      setOutput(`Error: ${e instanceof Error ? e.message : "Invalid JSON"}`);
    }
  };

  const minify = () => {
    try {
      setOutput(JSON.stringify(JSON.parse(input)));
    } catch (e) {
      setOutput(`Error: ${e instanceof Error ? e.message : "Invalid JSON"}`);
    }
  };

  return (
    <ToolLayout title="JSON Formatter" description="Format and beautify JSON data.">
      <ToolInput label="Paste JSON" value={input} onChange={setInput} placeholder='{"key": "value"}' textarea />
      <div className="flex flex-wrap items-end gap-3">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-zinc-600 dark:text-zinc-400">Indent</label>
          <select value={indent} onChange={(e) => setIndent(+e.target.value)} className="rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-900 outline-none dark:border-white/10 dark:bg-white/5 dark:text-white">
            <option value={2}>2 spaces</option>
            <option value={4}>4 spaces</option>
            <option value={1}>Tab</option>
          </select>
        </div>
        <ToolButton onClick={format}>Format</ToolButton>
        <ToolButton onClick={minify}>Minify</ToolButton>
      </div>
      <ToolOutput label="Output" value={output} />
    </ToolLayout>
  );
}
