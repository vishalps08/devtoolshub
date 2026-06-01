"use client";
import { useState, useCallback } from "react";
import ToolLayout, { ToolOutput, ToolButton } from "@/components/ToolLayout";

const WORDS = "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum".split(" ");

function generateParagraph(): string {
  const len = 40 + Math.floor(Math.random() * 40);
  return Array.from({ length: len }, () => WORDS[Math.floor(Math.random() * WORDS.length)]).join(" ") + ".";
}

export default function LoremIpsumGenerator() {
  const [count, setCount] = useState(3);
  const [output, setOutput] = useState("");

  const generate = useCallback(() => {
    const paras = Array.from({ length: count }, () => {
      const p = generateParagraph();
      return p.charAt(0).toUpperCase() + p.slice(1);
    });
    setOutput(paras.join("\n\n"));
  }, [count]);

  return (
    <ToolLayout title="Lorem Ipsum Generator" description="Generate placeholder text for designs.">
      <div className="flex items-end gap-4">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-zinc-600 dark:text-zinc-400">Paragraphs</label>
          <input type="number" min={1} max={50} value={count} onChange={(e) => setCount(+e.target.value)} className="w-24 rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-900 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-500/20 dark:border-white/10 dark:bg-white/5 dark:text-white" />
        </div>
        <ToolButton onClick={generate}>Generate</ToolButton>
      </div>
      <ToolOutput label="Lorem Ipsum" value={output} />
    </ToolLayout>
  );
}
