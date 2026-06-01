"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Zap, Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur-xl dark:border-white/5 dark:bg-[#13131a]/80">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 shadow-md shadow-violet-500/20">
            <Zap className="h-4 w-4 text-white" />
          </span>
          Dev<span className="text-violet-600 dark:text-violet-400">Tools</span> <span className="text-sm font-normal text-zinc-400 dark:text-zinc-500">Hub</span>
        </Link>

        <div className="flex items-center gap-4">
          {/* Desktop links */}
          <div className="hidden items-center gap-6 md:flex">
            <Link href="/" className="text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">
              Home
            </Link>
            <Link href="/blog" className="text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">
              Blog
            </Link>
            <Link href="/contact" className="text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">
              Contact
            </Link>
          </div>

          {/* Theme toggle */}
          <button
            onClick={toggle}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-100 text-zinc-600 transition-colors hover:bg-zinc-200 dark:border-white/10 dark:bg-white/5 dark:text-zinc-400 dark:hover:bg-white/10"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="inline-flex items-center justify-center rounded-md p-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white md:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-zinc-200 bg-white/95 backdrop-blur-xl dark:border-white/5 dark:bg-[#13131a]/95 md:hidden">
          <div className="flex flex-col gap-1 px-4 py-3">
            <Link href="/" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-sm text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-white/5 dark:hover:text-white">
              Home
            </Link>
            <Link href="/blog" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-sm text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-white/5 dark:hover:text-white">
              Blog
            </Link>
            <Link href="/contact" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-sm text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-white/5 dark:hover:text-white">
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
