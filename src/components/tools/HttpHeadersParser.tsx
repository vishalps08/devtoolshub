"use client";
import { useState } from "react";
import ToolLayout, { ToolInput, ToolButton } from "@/components/ToolLayout";

export default function HttpHeadersParser() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ status?: number; headers?: Record<string, string>; error?: string } | null>(null);

  const check = async () => {
    if (!url) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/http-headers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      setResult(await res.json());
    } catch {
      setResult({ error: "Request failed" });
    }
    setLoading(false);
  };

  return (
    <ToolLayout title="HTTP Headers Parser" description="Parse and inspect HTTP headers of any URL.">
      <ToolInput label="Enter URL" value={url} onChange={setUrl} placeholder="example.com" />
      <ToolButton onClick={check} disabled={!url || loading}>{loading ? "Fetching..." : "Get Headers"}</ToolButton>

      {result?.error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400">
          {result.error}
        </div>
      )}

      {result?.headers && (
        <div className="overflow-hidden rounded-xl border border-zinc-200 dark:border-white/10">
          <div className="bg-zinc-100 px-4 py-2 text-xs font-medium text-zinc-500 dark:bg-white/5">
            Status: {result.status}
          </div>
          <div className="divide-y divide-zinc-100 dark:divide-white/5">
            {Object.entries(result.headers).map(([key, value]) => (
              <div key={key} className="flex gap-4 px-4 py-2 text-sm">
                <span className="w-48 shrink-0 font-mono text-xs font-medium text-violet-600 dark:text-violet-400">{key}</span>
                <span className="break-all font-mono text-xs text-zinc-700 dark:text-zinc-300">{value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </ToolLayout>
  );
}
