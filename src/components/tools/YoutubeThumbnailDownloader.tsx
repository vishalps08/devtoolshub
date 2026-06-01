"use client";
import { useState } from "react";
import ToolLayout, { ToolInput, ToolButton } from "@/components/ToolLayout";

function extractVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/)([a-zA-Z0-9_-]{11})/,
    /^([a-zA-Z0-9_-]{11})$/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

const qualities = [
  { label: "Max Resolution", key: "maxresdefault" },
  { label: "Standard (SD)", key: "sddefault" },
  { label: "High Quality", key: "hqdefault" },
  { label: "Medium Quality", key: "mqdefault" },
  { label: "Default", key: "default" },
];

export default function YoutubeThumbnailDownloader() {
  const [url, setUrl] = useState("");
  const videoId = url ? extractVideoId(url.trim()) : null;

  return (
    <ToolLayout title="YouTube Thumbnail Downloader" description="Download thumbnails from any YouTube video.">
      <ToolInput label="YouTube URL or Video ID" value={url} onChange={setUrl} placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ" />

      {videoId && (
        <div className="space-y-3">
          {qualities.map((q) => {
            const src = `https://img.youtube.com/vi/${videoId}/${q.key}.jpg`;
            return (
              <div key={q.key} className="rounded-xl border border-zinc-200 bg-white p-3 dark:border-white/10 dark:bg-white/[0.02]">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">{q.label}</span>
                  <a href={src} target="_blank" rel="noopener noreferrer" download className="text-xs font-medium text-violet-600 hover:text-violet-700 dark:text-violet-400">
                    Open in new tab ↗
                  </a>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={q.label} className="w-full rounded-lg" />
              </div>
            );
          })}
        </div>
      )}

      {url && !videoId && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400">
          Could not extract a video ID from that URL.
        </div>
      )}
    </ToolLayout>
  );
}
