"use client";
import { useState, useCallback } from "react";
import ToolLayout, { ToolInput, ToolOutput, ToolButton } from "@/components/ToolLayout";

async function hashWithPbkdf2(password: string, rounds: number): Promise<string> {
  const enc = new TextEncoder();
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const key = await crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits({ name: "PBKDF2", salt, iterations: rounds * 1000, hash: "SHA-256" }, key, 256);
  const saltHex = Array.from(salt).map((b) => b.toString(16).padStart(2, "0")).join("");
  const hashHex = Array.from(new Uint8Array(bits)).map((b) => b.toString(16).padStart(2, "0")).join("");
  return `$pbkdf2-sha256$rounds=${rounds * 1000}$${saltHex}$${hashHex}`;
}

export default function BcryptGenerator() {
  const [input, setInput] = useState("");
  const [rounds, setRounds] = useState(10);
  const [output, setOutput] = useState("");

  const generate = useCallback(async () => {
    if (!input) return;
    const hash = await hashWithPbkdf2(input, rounds);
    setOutput(hash);
  }, [input, rounds]);

  return (
    <ToolLayout title="Bcrypt Generator" description="Hash passwords using a secure algorithm. Uses PBKDF2-SHA256 (Web Crypto API) as a browser-compatible alternative.">
      <ToolInput label="Enter password" value={input} onChange={setInput} placeholder="my-secret-password" />
      <div className="flex items-end gap-3">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-zinc-600 dark:text-zinc-400">Rounds: {rounds}</label>
          <input type="range" min={4} max={16} value={rounds} onChange={(e) => setRounds(+e.target.value)} className="w-40 accent-violet-600" />
        </div>
        <ToolButton onClick={generate} disabled={!input}>Generate Hash</ToolButton>
      </div>
      <ToolOutput label="Hash" value={output} />
    </ToolLayout>
  );
}
