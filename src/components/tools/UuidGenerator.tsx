"use client";
import { useState, useCallback } from "react";
import ToolLayout, { ToolOutput, ToolButton } from "@/components/ToolLayout";

export default function UuidGenerator() {
  const [count, setCount] = useState(1);
  const [uuids, setUuids] = useState("");

  const generate = useCallback(() => {
    const results = Array.from({ length: count }, () => crypto.randomUUID());
    setUuids(results.join("\n"));
  }, [count]);

  return (
    <ToolLayout title="UUID Generator" description="Generate random UUIDv4 identifiers.">
      <div className="flex items-end gap-4">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-zinc-600 dark:text-zinc-400">Count</label>
          <input
            type="number"
            min={1}
            max={100}
            value={count}
            onChange={(e) => setCount(Math.min(100, Math.max(1, +e.target.value)))}
            className="w-24 rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-900 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-500/20 dark:border-white/10 dark:bg-white/5 dark:text-white"
          />
        </div>
        <ToolButton onClick={generate}>Generate</ToolButton>
      </div>
      <ToolOutput label="UUIDs" value={uuids} />
    </ToolLayout>
  );
}
