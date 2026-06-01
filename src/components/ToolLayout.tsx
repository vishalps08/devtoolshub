"use client";

import Link from "next/link";
import { ArrowLeft, Copy, Check, ChevronRight } from "lucide-react";
import { useState, useCallback } from "react";
import { tools, categories } from "@/lib/tools";
import { getIcon } from "@/lib/get-icon";

interface ToolLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export default function ToolLayout({ title, description, children }: ToolLayoutProps) {
  const tool = tools.find((t) => t.name === title);
  const category = tool ? categories.find((c) => c.name === tool.category) : null;
  const Icon = tool ? getIcon(tool.icon) : null;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-1.5 text-sm text-zinc-400 dark:text-zinc-500">
        <Link href="/" className="transition-colors hover:text-zinc-700 dark:hover:text-zinc-300">Home</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        {category && (
          <>
            <Link href={`/category/${category.slug}`} className="transition-colors hover:text-zinc-700 dark:hover:text-zinc-300">{category.name}</Link>
            <ChevronRight className="h-3.5 w-3.5" />
          </>
        )}
        <span className="text-zinc-700 dark:text-zinc-200">{title}</span>
      </nav>

      {/* Header */}
      <div className="mb-8 flex items-start gap-4">
        {Icon && category && (
          <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${category.color} shadow-lg`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
        )}
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">{title}</h1>
          <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">{description}</p>
        </div>
      </div>

      {/* Main tool area */}
      <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-white/[0.06] dark:bg-[#16161f]">
        <div className="divide-y divide-zinc-100 dark:divide-white/[0.04]">
          <div className="space-y-5 p-6 sm:p-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Copy Button ─── */
export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(() => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [text]);

  return (
    <button
      onClick={copy}
      disabled={!text}
      className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-medium text-zinc-600 transition-all hover:bg-zinc-100 active:scale-95 disabled:opacity-30 dark:border-white/10 dark:bg-white/5 dark:text-zinc-400 dark:hover:bg-white/10"
    >
      {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

/* ─── Text Input ─── */
export function ToolInput({
  label,
  value,
  onChange,
  placeholder,
  textarea,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  textarea?: boolean;
}) {
  const baseCls =
    "w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 font-mono text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition-all focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-violet-500/20 dark:border-white/10 dark:bg-white/[0.03] dark:text-white dark:placeholder:text-zinc-600 dark:focus:border-violet-500/50 dark:focus:bg-white/[0.05]";

  return (
    <div>
      <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
        {label}
      </label>
      {textarea ? (
        <textarea
          rows={5}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={baseCls + " resize-y"}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={baseCls}
        />
      )}
    </div>
  );
}

/* ─── Output Display ─── */
export function ToolOutput({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
          {label}
        </label>
        <CopyButton text={value} />
      </div>
      <div className="relative min-h-[120px] overflow-auto whitespace-pre-wrap break-all rounded-xl border border-zinc-200 bg-gradient-to-b from-zinc-50 to-white px-5 py-4 font-mono text-sm leading-relaxed text-zinc-800 dark:border-white/10 dark:from-white/[0.02] dark:to-white/[0.01] dark:text-zinc-200">
        {value || (
          <span className="text-zinc-300 dark:text-zinc-700 italic">Output will appear here...</span>
        )}
      </div>
    </div>
  );
}

/* ─── Action Button ─── */
export function ToolButton({
  onClick,
  children,
  disabled,
  variant = "primary",
}: {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  variant?: "primary" | "secondary";
}) {
  const cls =
    variant === "primary"
      ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-500/20 hover:shadow-lg hover:shadow-violet-500/30 hover:brightness-110"
      : "border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300 dark:hover:bg-white/10";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all active:scale-[0.97] disabled:opacity-40 disabled:shadow-none disabled:pointer-events-none ${cls}`}
    >
      {children}
    </button>
  );
}
