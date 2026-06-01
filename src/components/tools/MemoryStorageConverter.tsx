"use client";
import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

const units = ["Bytes", "KB", "MB", "GB", "TB", "PB"];
const multipliers = [1, 1024, 1024 ** 2, 1024 ** 3, 1024 ** 4, 1024 ** 5];

export default function MemoryStorageConverter() {
  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState(2);

  const bytes = parseFloat(value) * multipliers[fromUnit];
  const valid = value !== "" && !isNaN(bytes);

  const selectCls = "rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-900 outline-none dark:border-white/10 dark:bg-white/5 dark:text-white";

  return (
    <ToolLayout title="Memory Storage Converter" description="Convert between bytes, KB, MB, GB, and TB.">
      <div className="flex items-end gap-3">
        <div className="flex-1">
          <label className="mb-1.5 block text-xs font-medium text-zinc-600 dark:text-zinc-400">Value</label>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="1024"
            className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-500/20 dark:border-white/10 dark:bg-white/5 dark:text-white"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-zinc-600 dark:text-zinc-400">From</label>
          <select value={fromUnit} onChange={(e) => setFromUnit(+e.target.value)} className={selectCls}>
            {units.map((u, i) => <option key={u} value={i}>{u}</option>)}
          </select>
        </div>
      </div>

      {valid && (
        <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-white/10 dark:bg-white/[0.02]">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {units.map((u, i) => (
              <div key={u} className="rounded-lg bg-white px-3 py-2 dark:bg-white/5">
                <p className="text-xs text-zinc-500 dark:text-zinc-400">{u}</p>
                <p className="font-mono text-sm font-medium text-zinc-900 dark:text-white">
                  {(bytes / multipliers[i]).toLocaleString(undefined, { maximumFractionDigits: 6 })}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </ToolLayout>
  );
}
