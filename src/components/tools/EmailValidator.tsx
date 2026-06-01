"use client";
import { useState } from "react";
import ToolLayout, { ToolInput } from "@/components/ToolLayout";

export default function EmailValidator() {
  const [input, setInput] = useState("");
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const valid = input ? pattern.test(input) : null;

  return (
    <ToolLayout title="Email Validator" description="Check if an email address is valid.">
      <ToolInput label="Enter email" value={input} onChange={setInput} placeholder="user@example.com" />
      {valid !== null && (
        <div className={`rounded-xl border p-4 text-sm font-medium ${valid ? "border-green-200 bg-green-50 text-green-700 dark:border-green-500/20 dark:bg-green-500/10 dark:text-green-400" : "border-red-200 bg-red-50 text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400"}`}>
          {valid ? "✓ Valid email address" : "✗ Invalid email address"}
        </div>
      )}
    </ToolLayout>
  );
}
