"use client";
import { useState } from "react";
import ToolLayout, { ToolInput, ToolButton } from "@/components/ToolLayout";

export default function WebsiteStatusChecker() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ online: boolean; status?: number; statusText?: string; responseTime?: number; error?: string } | null>(null);

  const check = async () => {
    if (!url) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/website-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      setResult(await res.json());
    } catch {
      setResult({ online: false, error: "Request failed" });
    }
    setLoading(false);
  };

  return (
    <ToolLayout title="Website Status Checker" description="Check whether a website is online or not.">
      <ToolInput label="Enter URL" value={url} onChange={setUrl} placeholder="example.com" />
      <ToolButton onClick={check} disabled={!url || loading}>{loading ? "Checking..." : "Check Status"}</ToolButton>

      {result && (
        <div className={`rounded-xl border p-4 ${result.online ? "border-green-200 bg-green-50 dark:border-green-500/20 dark:bg-green-500/10" : "border-red-200 bg-red-50 dark:border-red-500/20 dark:bg-red-500/10"}`}>
          <p className={`text-sm font-semibold ${result.online ? "text-green-700 dark:text-green-400" : "text-red-700 dark:text-red-400"}`}>
            {result.online ? "✓ Website is online" : "✗ Website is down"}
          </p>
          {result.online && (
            <div className="mt-2 space-y-1 text-xs text-zinc-600 dark:text-zinc-400">
              <p>Status: <strong>{result.status} {result.statusText}</strong></p>
              <p>Response time: <strong>{result.responseTime}ms</strong></p>
            </div>
          )}
          {result.error && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{result.error}</p>}
        </div>
      )}
    </ToolLayout>
  );
}
