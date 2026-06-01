"use client";
import { useState } from "react";
import ToolLayout, { ToolInput, ToolButton } from "@/components/ToolLayout";

export default function RedirectChecker() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [hops, setHops] = useState<{ url: string; status: number; statusText: string }[] | null>(null);
  const [error, setError] = useState("");

  const check = async () => {
    if (!url) return;
    setLoading(true);
    setHops(null);
    setError("");
    try {
      const res = await fetch("/api/redirect-checker", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      if (data.error) setError(data.error);
      else setHops(data.hops);
    } catch {
      setError("Request failed");
    }
    setLoading(false);
  };

  return (
    <ToolLayout title="Redirect Checker" description="Trace URL redirects and hops.">
      <ToolInput label="Enter URL" value={url} onChange={setUrl} placeholder="http://bit.ly/example" />
      <ToolButton onClick={check} disabled={!url || loading}>{loading ? "Tracing..." : "Trace Redirects"}</ToolButton>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400">
          {error}
        </div>
      )}

      {hops && (
        <div className="space-y-2">
          {hops.map((hop, i) => (
            <div key={i} className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white px-4 py-3 dark:border-white/10 dark:bg-white/[0.02]">
              <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${hop.status >= 300 && hop.status < 400 ? "bg-yellow-500" : hop.status < 300 ? "bg-green-500" : "bg-red-500"}`}>
                {i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-mono text-xs text-zinc-800 dark:text-zinc-200">{hop.url}</p>
                <p className="text-xs text-zinc-500">{hop.status} {hop.statusText}</p>
              </div>
              {i < hops.length - 1 && <span className="text-zinc-400">→</span>}
            </div>
          ))}
          <p className="text-xs text-zinc-500">{hops.length === 1 ? "No redirects — direct response." : `${hops.length - 1} redirect${hops.length - 1 > 1 ? "s" : ""} found.`}</p>
        </div>
      )}
    </ToolLayout>
  );
}
