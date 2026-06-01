"use client";
import { useState } from "react";
import ToolLayout, { ToolInput, ToolOutput } from "@/components/ToolLayout";

export default function TwitterCardGenerator() {
  const [card, setCard] = useState("summary_large_image");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState("");
  const [site, setSite] = useState("");

  const output = [
    `<meta name="twitter:card" content="${card}">`,
    title && `<meta name="twitter:title" content="${title}">`,
    desc && `<meta name="twitter:description" content="${desc}">`,
    image && `<meta name="twitter:image" content="${image}">`,
    site && `<meta name="twitter:site" content="${site}">`,
  ].filter(Boolean).join("\n");

  return (
    <ToolLayout title="Twitter Card Generator" description="Generate Twitter Card meta tags.">
      <div>
        <label className="mb-1.5 block text-xs font-medium text-zinc-600 dark:text-zinc-400">Card type</label>
        <select value={card} onChange={(e) => setCard(e.target.value)} className="rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-900 outline-none dark:border-white/10 dark:bg-white/5 dark:text-white">
          <option value="summary">Summary</option>
          <option value="summary_large_image">Summary Large Image</option>
        </select>
      </div>
      <ToolInput label="Title" value={title} onChange={setTitle} placeholder="My Page Title" />
      <ToolInput label="Description" value={desc} onChange={setDesc} placeholder="Page description" />
      <ToolInput label="Image URL" value={image} onChange={setImage} placeholder="https://example.com/card.png" />
      <ToolInput label="@site handle" value={site} onChange={setSite} placeholder="@mysite" />
      <ToolOutput label="Twitter Card Tags" value={output} />
    </ToolLayout>
  );
}
