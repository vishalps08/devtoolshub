import { notFound } from "next/navigation";
import { tools } from "@/lib/tools";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ToolPage({ params }: Props) {
  const { slug } = await params;
  const tool = tools.find((t) => t.slug === slug);

  if (!tool) return notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to all tools
      </Link>

      <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">{tool.name}</h1>
      <p className="mt-2 text-zinc-500 dark:text-zinc-400">{tool.description}</p>

      <div className="mt-10 rounded-2xl border border-zinc-200 bg-white p-8 text-center shadow-sm dark:border-white/[0.06] dark:bg-white/[0.02]">
        <p className="text-zinc-400 dark:text-zinc-500">Tool interface coming soon.</p>
      </div>
    </div>
  );
}
