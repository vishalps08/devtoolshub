"use client";
import { useState } from "react";
import ToolLayout, { ToolInput, ToolOutput } from "@/components/ToolLayout";

export default function MetaTagsGenerator() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [keywords, setKeywords] = useState("");
  const [url, setUrl] = useState("");

  const output = [
    title && `<meta name="title" content="${title}">`,
    desc && `<meta name="description" content="${desc}">`,
    keywords && `<meta name="keywords" content="${keywords}">`,
    url && `<link rel="canonical" href="${url}">`,
    title && `<meta property="og:title" content="${title}">`,
    desc && `<meta property="og:description" content="${desc}">`,
    url && `<meta property="og:url" content="${url}">`,
    `<meta property="og:type" content="website">`,
  ].filter(Boolean).join("\n");

  return (
    <ToolLayout title="Meta Tags Generator" description="Generate meta tags for better SEO.">
      <ToolInput label="Page title" value={title} onChange={setTitle} placeholder="My Awesome Page" />
      <ToolInput label="Description" value={desc} onChange={setDesc} placeholder="A brief description of the page" />
      <ToolInput label="Keywords (comma-separated)" value={keywords} onChange={setKeywords} placeholder="web, tools, developer" />
      <ToolInput label="Canonical URL" value={url} onChange={setUrl} placeholder="https://example.com/page" />
      <ToolOutput label="Meta Tags" value={output} />
    </ToolLayout>
  );
}
