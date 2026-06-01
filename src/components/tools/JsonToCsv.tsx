"use client";
import { useState } from "react";
import ToolLayout, { ToolInput, ToolOutput, ToolButton } from "@/components/ToolLayout";

export default function JsonToCsv() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const convert = () => {
    try {
      const data = JSON.parse(input);
      if (!Array.isArray(data) || data.length === 0) { setOutput("Input must be a non-empty JSON array"); return; }
      const headers = Object.keys(data[0]);
      const rows = data.map((row: Record<string, unknown>) => headers.map((h) => String(row[h] ?? "")).join(","));
      setOutput([headers.join(","), ...rows].join("\n"));
    } catch { setOutput("Invalid JSON input"); }
  };

  return (
    <ToolLayout title="JSON to CSV" description="Convert JSON data to CSV format.">
      <ToolInput label="Paste JSON array" value={input} onChange={setInput} placeholder={'[{"name":"Alice","age":30},{"name":"Bob","age":25}]'} textarea />
      <ToolButton onClick={convert} disabled={!input}>Convert</ToolButton>
      <ToolOutput label="CSV" value={output} />
    </ToolLayout>
  );
}
