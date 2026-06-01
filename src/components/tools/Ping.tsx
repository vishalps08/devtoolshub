"use client";
import { useState } from "react";
import ToolLayout, { ToolInput, ToolButton } from "@/components/ToolLayout";

export default function Ping() {
  const [host, setHost] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<number[]>([]);

  const ping = async () => {
    if (!host) return;
    setLoading(true);
    setResults([]);
    const target = host.startsWith("http") ? host : `https://${host}`;
    const times: number[] = [];

    for (let i = 0; i < 5; i++) {
      try {
        const start = performance.now();
        await fetch(target, { method: "HEAD", mode: "no-cors", cache: "no-store" });
        times.push(Math.round(performance.now() - start));
      } catch {
        times.push(-1);
      }
      setResults([...times]);
    }
    setLoading(false);
  };

  const valid = results.filter((t) => t >= 0);
  const avg = valid.length ? Math.round(valid.reduce((a, b) => a + b, 0) / valid.length) : 0;
  const min = valid.length ? Math.min(...valid) : 0;
  const max = valid.length ? Math.max(...valid) : 0;

  return (
    <ToolLayout title="Ping" description="Measure HTTP latency for any address. Note: this measures HTTP round-trip time, not ICMP ping.">
      <ToolInput label="Host or URL" value={host} onChange={setHost} placeholder="google.com" />
      <ToolButton onClick={ping} disabled={!host || loading}>{loading ? "Pinging..." : "Ping (5x)"}</ToolButton>

      {results.length > 0 && (
        <div className="space-y-2">
          <div className="space-y-1">
            {results.map((t, i) => (
              <div key={i} className="flex items-center gap-3 rounded-lg border border-zinc-200 bg-white px-4 py-2 dark:border-white/10 dark:bg-white/[0.02]">
                <span className="text-xs text-zinc-500 w-6">#{i + 1}</span>
                {t >= 0 ? (
                  <>
                    <div className="flex-1 h-2 rounded-full bg-zinc-100 dark:bg-white/10">
                      <div className={`h-full rounded-full ${t < 100 ? "bg-green-500" : t < 300 ? "bg-yellow-500" : "bg-red-500"}`} style={{ width: `${Math.min(100, (t / 500) * 100)}%` }} />
                    </div>
                    <span className="font-mono text-xs font-medium text-zinc-700 dark:text-zinc-300 w-16 text-right">{t}ms</span>
                  </>
                ) : (
                  <span className="text-xs text-red-500">Timeout</span>
                )}
              </div>
            ))}
          </div>
          {valid.length > 0 && (
            <div className="flex gap-4 rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-white/10 dark:bg-white/[0.02]">
              <div className="text-center"><p className="text-xs text-zinc-500">Min</p><p className="font-mono text-sm font-medium text-zinc-900 dark:text-white">{min}ms</p></div>
              <div className="text-center"><p className="text-xs text-zinc-500">Avg</p><p className="font-mono text-sm font-medium text-zinc-900 dark:text-white">{avg}ms</p></div>
              <div className="text-center"><p className="text-xs text-zinc-500">Max</p><p className="font-mono text-sm font-medium text-zinc-900 dark:text-white">{max}ms</p></div>
              <div className="text-center"><p className="text-xs text-zinc-500">Loss</p><p className="font-mono text-sm font-medium text-zinc-900 dark:text-white">{results.length - valid.length}/{results.length}</p></div>
            </div>
          )}
        </div>
      )}
    </ToolLayout>
  );
}
