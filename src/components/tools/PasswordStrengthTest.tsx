"use client";
import { useState } from "react";
import ToolLayout, { ToolInput } from "@/components/ToolLayout";

function analyze(pw: string) {
  if (!pw) return { score: 0, label: "", color: "", checks: [] as { label: string; pass: boolean }[] };
  const checks = [
    { label: "At least 8 characters", pass: pw.length >= 8 },
    { label: "At least 12 characters", pass: pw.length >= 12 },
    { label: "Contains uppercase", pass: /[A-Z]/.test(pw) },
    { label: "Contains lowercase", pass: /[a-z]/.test(pw) },
    { label: "Contains numbers", pass: /[0-9]/.test(pw) },
    { label: "Contains symbols", pass: /[^a-zA-Z0-9]/.test(pw) },
    { label: "No common patterns", pass: !/^(123|abc|password|qwerty)/i.test(pw) },
  ];
  const score = checks.filter((c) => c.pass).length;
  const levels = [
    { min: 0, label: "Very Weak", color: "bg-red-500" },
    { min: 2, label: "Weak", color: "bg-orange-500" },
    { min: 4, label: "Fair", color: "bg-yellow-500" },
    { min: 6, label: "Strong", color: "bg-green-500" },
    { min: 7, label: "Very Strong", color: "bg-emerald-500" },
  ];
  const level = [...levels].reverse().find((l) => score >= l.min)!;
  return { score, label: level.label, color: level.color, checks };
}

export default function PasswordStrengthTest() {
  const [input, setInput] = useState("");
  const result = analyze(input);

  return (
    <ToolLayout title="Password Strength Test" description="Test how strong your password is.">
      <ToolInput label="Enter password" value={input} onChange={setInput} placeholder="Enter a password to test" />

      {input && (
        <div className="space-y-3 rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-white/10 dark:bg-white/[0.02]">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-zinc-900 dark:text-white">{result.label}</span>
            <span className="text-xs text-zinc-500">{result.score}/7</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-zinc-200 dark:bg-white/10">
            <div className={`h-full rounded-full transition-all duration-500 ${result.color}`} style={{ width: `${(result.score / 7) * 100}%` }} />
          </div>
          <ul className="space-y-1">
            {result.checks.map((c) => (
              <li key={c.label} className={`text-xs ${c.pass ? "text-green-600 dark:text-green-400" : "text-zinc-400 dark:text-zinc-600"}`}>
                {c.pass ? "✓" : "✗"} {c.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </ToolLayout>
  );
}
