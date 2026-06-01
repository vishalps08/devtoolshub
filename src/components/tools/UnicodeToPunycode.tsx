"use client";
import { useState } from "react";
import ToolLayout, { ToolInput, ToolOutput } from "@/components/ToolLayout";

function unicodeToPunycode(input: string): string {
  try {
    const url = new URL(`http://${input}`);
    return url.hostname;
  } catch { return "Invalid input"; }
}

export default function UnicodeToPunycode() {
  const [input, setInput] = useState("");
  return (
    <ToolLayout title="Unicode to Punycode" description="Convert Unicode to Punycode encoding.">
      <ToolInput label="Enter Unicode domain" value={input} onChange={setInput} placeholder="münchen.de" />
      <ToolOutput label="Punycode" value={input ? unicodeToPunycode(input) : ""} />
    </ToolLayout>
  );
}
