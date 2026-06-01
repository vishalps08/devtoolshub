"use client";
import { useState } from "react";
import ToolLayout, { ToolInput, ToolOutput } from "@/components/ToolLayout";

function punycodeToUnicode(input: string): string {
  try {
    return input.split(".").map((part) => {
      if (part.startsWith("xn--")) {
        const url = new URL(`http://${part}`);
        return url.hostname;
      }
      return part;
    }).join(".");
  } catch { return "Invalid Punycode"; }
}

export default function PunycodeToUnicode() {
  const [input, setInput] = useState("");
  return (
    <ToolLayout title="Punycode to Unicode" description="Convert Punycode to Unicode characters.">
      <ToolInput label="Enter Punycode" value={input} onChange={setInput} placeholder="xn--nxasmq6b" />
      <ToolOutput label="Unicode" value={input ? punycodeToUnicode(input) : ""} />
    </ToolLayout>
  );
}
