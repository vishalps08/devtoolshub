"use client";
import { useState } from "react";
import ToolLayout, { ToolInput, ToolOutput } from "@/components/ToolLayout";

export default function OpenGraphGenerator() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [url, setUrl] = useState("");
  const [image, setImage] = useState("");
  const [siteName, setSiteName] = useState("");

  const output = [
    `<meta property="og:type" content="website">`,
    title && `<meta property="og:title" content="${title}">`,
    desc && `<meta property="og:description" content="${desc}">`,
    url && `<meta property="og:url" content="${url}">`,
    image && `<meta property="og:image" content="${image}">`,
    siteName && `<meta property="og:site_name" content="${siteName}">`,
  ].filter(Boolean).join("\n");

  return (
    <ToolLayout title="Open Graph Generator" description="Generate Open Graph tags for social sharing.">
      <ToolInput label="Title" value={title} onChange={setTitle} placeholder="My Page Title" />
      <ToolInput label="Description" value={desc} onChange={setDesc} placeholder="Page description for social previews" />
      <ToolInput label="URL" value={url} onChange={setUrl} placeholder="https://example.com" />
      <ToolInput label="Image URL" value={image} onChange={setImage} placeholder="https://example.com/og-image.png" />
      <ToolInput label="Site Name" value={siteName} onChange={setSiteName} placeholder="My Website" />
      <ToolOutput label="Open Graph Tags" value={output} />
    </ToolLayout>
  );
}
