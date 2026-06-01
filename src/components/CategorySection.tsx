import * as Icons from "lucide-react";
import type { Tool, Category } from "@/lib/tools";
import ToolCard from "./ToolCard";

interface CategorySectionProps {
  name: Category;
  icon: string;
  color: string;
  tools: Tool[];
}

export default function CategorySection({ name, icon, color, tools }: CategorySectionProps) {
  const IconComponent = (Icons as Record<string, React.ComponentType<{ className?: string }>>)[icon] ?? Icons.Folder;

  if (tools.length === 0) return null;

  return (
    <section>
      <div className="mb-4 flex items-center gap-3">
        <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${color}`}>
          <IconComponent className="h-4 w-4 text-white" />
        </div>
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">{name}</h2>
        <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-500 dark:bg-white/5 dark:text-zinc-500">
          {tools.length}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {tools.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} accentGradient={color} />
        ))}
      </div>
    </section>
  );
}
