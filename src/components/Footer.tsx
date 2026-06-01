import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white dark:border-white/5 dark:bg-[#0e0e14]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold text-zinc-900 dark:text-white">
            <Image src="/logo.svg" alt="DevTools Hub" width={28} height={28} className="rounded-md" />
            Dev<span className="text-violet-600 dark:text-violet-400">Tools</span> <span className="text-sm font-normal text-zinc-400 dark:text-zinc-500">Hub</span>
          </Link>

          <div className="flex items-center gap-6">
            <Link href="/" className="text-sm text-zinc-400 transition-colors hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-300">
              Home
            </Link>
            <Link href="/blog" className="text-sm text-zinc-400 transition-colors hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-300">
              Blog
            </Link>
            <Link href="/contact" className="text-sm text-zinc-400 transition-colors hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-300">
              Contact
            </Link>
          </div>
        </div>

        <div className="mt-8 border-t border-zinc-100 pt-6 text-center dark:border-white/5">
          <p className="text-sm text-zinc-400 dark:text-zinc-600">
            &copy; {new Date().getFullYear()} DevTools Hub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
