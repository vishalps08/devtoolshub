import { notFound } from "next/navigation";
import Link from "next/link";
import * as Icons from "lucide-react";
import { ArrowLeft } from "lucide-react";
import { categories, getCategoryBySlug, getToolsByCategory } from "@/lib/tools";
import ToolCard from "@/components/ToolCard";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) return notFound();

  const tools = getToolsByCategory(category.name);
  const IconComponent = (Icons as Record<string, React.ComponentType<{ className?: string }>>)[category.icon] ?? Icons.Folder;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        All categories
      </Link>

      <div className="flex items-center gap-3">
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${category.color} shadow-md`}>
          <IconComponent className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">{category.name}</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">{category.description}</p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {tools.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} accentGradient={category.color} />
        ))}
      </div>
    </div>
  );
}
