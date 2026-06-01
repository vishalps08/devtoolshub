"use client";
import { useState } from "react";
import ToolLayout, { ToolInput, ToolOutput, ToolButton } from "@/components/ToolLayout";

export default function CsvToJson() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const convert = () => {
    try {
      const lines = input.trim().split("\n").map((l) => l.split(",").map((c) => c.trim()));
      if (lines.length < 2) { setOutput("Need at least a header row and one data row"); return; }
      const headers = lines[0];
      const data = lines.slice(1).map((row) => {
        const obj: Record<string, string> = {};
        headers.forEach((h, i) => { obj[h] = row[i] ?? ""; });
        return obj;
      });
      setOutput(JSON.stringify(data, null, 2));
    } catch { setOutput("Invalid CSV input"); }
  };

  return (
    <ToolLayout title="CSV to JSON" description="Convert CSV data to JSON format.">
      <ToolInput label="Paste CSV" value={input} onChange={setInput} placeholder={"name,age,city\nAlice,30,NYC\nBob,25,LA"} textarea />
      <ToolButton onClick={convert} disabled={!input}>Convert</ToolButton>
      <ToolOutput label="JSON" value={output} />
    </ToolLayout>
  );
}
