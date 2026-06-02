"use client";

import { useMemo } from "react";
import { Zap, BookOpen } from "lucide-react";
import { tools, categories } from "@/lib/tools";
import CategoryCard from "@/components/CategoryCard";
import ToolCard from "@/components/ToolCard";
import { useSearch } from "@/components/SearchProvider";

export default function Home() {
  const { query } = useSearch();

  const filtered = useMemo(() => {
    if (!query.trim()) return null;
    const q = query.toLowerCase().replace(/\s/g, "");
    return tools.filter(
      (t) =>
        t.name.toLowerCase().replace(/\s/g, "").includes(q) ||
        t.description.toLowerCase().replace(/\s/g, "").includes(q)
    );
  }, [query]);

  return (
    <div className="bg-grid relative">
      {/* Search results overlay */}
      {filtered ? (
        <section className="relative mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          {filtered.length > 0 ? (
            <div>
              <p className="mb-4 text-sm text-zinc-500">
                {filtered.length} result{filtered.length !== 1 && "s"} for &ldquo;{query}&rdquo;
              </p>
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {filtered.map((tool) => {
                  const cat = categories.find((c) => c.name === tool.category);
                  return (
                    <ToolCard
                      key={tool.slug}
                      tool={tool}
                      accentGradient={cat?.color ?? "from-zinc-500 to-zinc-600"}
                    />
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="py-12 text-center">
              <p className="text-base text-zinc-400 dark:text-zinc-500">No tools found for &ldquo;{query}&rdquo;</p>
              <p className="mt-1 text-sm text-zinc-400 dark:text-zinc-600">Try a different search term.</p>
            </div>
          )}
        </section>
      ) : (
        <>
          {/* User Guide Banner */}
          <section className="relative mx-auto max-w-7xl px-4 pb-6 sm:px-6 lg:px-8">
            <a
              href="/devtoolshub-guide.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-2xl border border-violet-200 bg-gradient-to-r from-violet-50 to-indigo-50 p-4 transition-all hover:border-violet-300 hover:shadow-md hover:shadow-violet-500/10 dark:border-violet-500/10 dark:from-violet-500/[0.06] dark:to-indigo-500/[0.06] dark:hover:border-violet-500/20"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-md">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                  New here? Read the guide
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  A quick walkthrough of every tool — what it does, how to use it, and tips for developers.
                </p>
              </div>
              <span className="hidden shrink-0 rounded-lg bg-violet-100 px-3 py-1.5 text-xs font-semibold text-violet-700 transition-colors group-hover:bg-violet-200 dark:bg-violet-500/10 dark:text-violet-300 dark:group-hover:bg-violet-500/20 sm:block">
                Download PDF
              </span>
            </a>
          </section>

          {/* Category cards */}
          <section className="relative mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
            <div className="mb-6 flex items-center gap-2">
              <Zap className="h-5 w-5 text-violet-600 dark:text-violet-400" />
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Explore by Category</h2>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {categories.map((cat) => (
                <CategoryCard key={cat.slug} category={cat} />
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
