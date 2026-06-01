import Link from "next/link";
import * as Icons from "lucide-react";
import type { Tool } from "@/lib/tools";

interface ToolCardProps {
  tool: Tool;
  accentGradient: string;
}

export default function ToolCard({ tool, accentGradient }: ToolCardProps) {
  const IconComponent = (Icons as Record<string, React.ComponentType<{ className?: string }>>)[tool.icon] ?? Icons.Wrench;

  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group relative flex flex-col gap-2.5 rounded-xl border border-zinc-200/80 bg-white p-4 shadow-sm transition-all duration-300 hover:border-violet-200 hover:shadow-md hover:shadow-violet-500/5 dark:border-white/[0.06] dark:bg-white/[0.02] dark:hover:border-white/[0.12] dark:hover:bg-white/[0.04] dark:hover:shadow-violet-500/5"
    >
      <div
        className={`flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br ${accentGradient} shadow-md transition-transform duration-300 group-hover:scale-110`}
      >
        <IconComponent className="h-5 w-5 text-white" />
      </div>

      <div>
        <h3 className="text-sm font-semibold text-zinc-900 transition-colors group-hover:text-violet-600 dark:text-white dark:group-hover:text-violet-300">
          {tool.name}
        </h3>
        <p className="mt-1 text-xs leading-relaxed text-zinc-500 transition-colors group-hover:text-zinc-600 dark:text-zinc-500 dark:group-hover:text-zinc-400">
          {tool.description}
        </p>
      </div>
    </Link>
  );
}
