"use client";
import { useState, useCallback } from "react";
import ToolLayout, { ToolOutput, ToolButton } from "@/components/ToolLayout";

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [upper, setUpper] = useState(true);
  const [lower, setLower] = useState(true);
  const [digits, setDigits] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [password, setPassword] = useState("");

  const generate = useCallback(() => {
    let chars = "";
    if (upper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (lower) chars += "abcdefghijklmnopqrstuvwxyz";
    if (digits) chars += "0123456789";
    if (symbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";
    if (!chars) return;
    const arr = new Uint32Array(length);
    crypto.getRandomValues(arr);
    setPassword(Array.from(arr, (v) => chars[v % chars.length]).join(""));
  }, [length, upper, lower, digits, symbols]);

  const checkClass = "h-4 w-4 rounded accent-violet-600";
  const labelClass = "flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300";

  return (
    <ToolLayout title="Password Generator" description="Generate strong, random passwords.">
      <div className="flex flex-wrap items-end gap-4">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-zinc-600 dark:text-zinc-400">Length: {length}</label>
          <input type="range" min={4} max={128} value={length} onChange={(e) => setLength(+e.target.value)} className="w-40 accent-violet-600" />
        </div>
        <label className={labelClass}><input type="checkbox" checked={upper} onChange={(e) => setUpper(e.target.checked)} className={checkClass} /> A-Z</label>
        <label className={labelClass}><input type="checkbox" checked={lower} onChange={(e) => setLower(e.target.checked)} className={checkClass} /> a-z</label>
        <label className={labelClass}><input type="checkbox" checked={digits} onChange={(e) => setDigits(e.target.checked)} className={checkClass} /> 0-9</label>
        <label className={labelClass}><input type="checkbox" checked={symbols} onChange={(e) => setSymbols(e.target.checked)} className={checkClass} /> Symbols</label>
      </div>
      <ToolButton onClick={generate}>Generate Password</ToolButton>
      <ToolOutput label="Password" value={password} />
    </ToolLayout>
  );
}
