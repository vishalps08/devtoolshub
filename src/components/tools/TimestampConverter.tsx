"use client";
import { useState } from "react";
import ToolLayout, { ToolInput, ToolOutput, ToolButton } from "@/components/ToolLayout";

export default function TimestampConverter() {
  const [ts, setTs] = useState("");
  const [dateStr, setDateStr] = useState("");
  const [tsOutput, setTsOutput] = useState("");
  const [dateOutput, setDateOutput] = useState("");

  const toDate = () => {
    const n = parseInt(ts);
    if (isNaN(n)) { setDateOutput("Invalid timestamp"); return; }
    const ms = ts.length > 12 ? n : n * 1000;
    setDateOutput(new Date(ms).toISOString());
  };

  const toTimestamp = () => {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) { setTsOutput("Invalid date"); return; }
    setTsOutput(`${Math.floor(d.getTime() / 1000)} (seconds)\n${d.getTime()} (milliseconds)`);
  };

  const now = () => {
    const n = Date.now();
    setTs(Math.floor(n / 1000).toString());
    setDateOutput(new Date(n).toISOString());
  };

  return (
    <ToolLayout title="Timestamp Converter" description="Convert between Unix timestamps and dates.">
      <div className="space-y-4 rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-white/10 dark:bg-white/[0.02]">
        <ToolInput label="Unix timestamp" value={ts} onChange={setTs} placeholder="1700000000" />
        <div className="flex gap-2">
          <ToolButton onClick={toDate}>To Date</ToolButton>
          <ToolButton onClick={now}>Now</ToolButton>
        </div>
        <ToolOutput label="Date" value={dateOutput} />
      </div>

      <div className="space-y-4 rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-white/10 dark:bg-white/[0.02]">
        <ToolInput label="Date string" value={dateStr} onChange={setDateStr} placeholder="2024-01-15T12:00:00Z" />
        <ToolButton onClick={toTimestamp}>To Timestamp</ToolButton>
        <ToolOutput label="Timestamp" value={tsOutput} />
      </div>
    </ToolLayout>
  );
}
