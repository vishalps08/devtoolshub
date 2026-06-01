import Link from "next/link";
import * as Icons from "lucide-react";
import { ArrowRight } from "lucide-react";
import type { CategoryInfo } from "@/lib/tools";
import { getToolsByCategory } from "@/lib/tools";

interface CategoryCardProps {
  category: CategoryInfo;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const IconComponent = (Icons as Record<string, React.ComponentType<{ className?: string }>>)[category.icon] ?? Icons.Folder;
  const count = getToolsByCategory(category.name).length;

  return (
    <Link
      href={`/category/${category.slug}`}
      className="group flex flex-col justify-between rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:border-violet-200 hover:shadow-lg hover:shadow-violet-500/5 dark:border-white/[0.06] dark:bg-white/[0.03] dark:hover:border-white/[0.12] dark:hover:shadow-violet-500/5"
    >
      <div>
        <div className="flex items-center justify-between">
          <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${category.color} shadow-md transition-transform duration-300 group-hover:scale-110`}>
            <IconComponent className="h-5 w-5 text-white" />
          </div>
          <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-500 dark:bg-white/5 dark:text-zinc-400">
            {count} tools
          </span>
        </div>
        <h3 className="mt-4 text-base font-semibold text-zinc-900 transition-colors group-hover:text-violet-600 dark:text-white dark:group-hover:text-violet-300">
          {category.name}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
          {category.description}
        </p>
      </div>
      <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-violet-600 dark:text-violet-400">
        Explore tools
        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
      </div>
    </Link>
  );
}
