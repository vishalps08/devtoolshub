"use client";
import { useState, useCallback } from "react";
import ToolLayout, { ToolOutput, ToolButton } from "@/components/ToolLayout";

export default function RandomNumberGenerator() {
  const [min, setMin] = useState("1");
  const [max, setMax] = useState("100");
  const [count, setCount] = useState("1");
  const [result, setResult] = useState("");

  const generate = useCallback(() => {
    const lo = parseInt(min) || 0;
    const hi = parseInt(max) || 100;
    const n = Math.min(parseInt(count) || 1, 1000);
    const nums = Array.from({ length: n }, () => Math.floor(Math.random() * (hi - lo + 1)) + lo);
    setResult(nums.join(", "));
  }, [min, max, count]);

  const inputCls = "w-24 rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-900 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-500/20 dark:border-white/10 dark:bg-white/5 dark:text-white";
  const labelCls = "mb-1.5 block text-xs font-medium text-zinc-600 dark:text-zinc-400";

  return (
    <ToolLayout title="Random Number Generator" description="Generate random numbers in any range.">
      <div className="flex flex-wrap items-end gap-4">
        <div><label className={labelCls}>Min</label><input type="number" value={min} onChange={(e) => setMin(e.target.value)} className={inputCls} /></div>
        <div><label className={labelCls}>Max</label><input type="number" value={max} onChange={(e) => setMax(e.target.value)} className={inputCls} /></div>
        <div><label className={labelCls}>Count</label><input type="number" value={count} onChange={(e) => setCount(e.target.value)} className={inputCls} /></div>
        <ToolButton onClick={generate}>Generate</ToolButton>
      </div>
      <ToolOutput label="Result" value={result} />
    </ToolLayout>
  );
}
