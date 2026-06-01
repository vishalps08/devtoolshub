"use client";
import { useState } from "react";
import ToolLayout, { ToolInput, ToolOutput } from "@/components/ToolLayout";

function md2html(md: string): string {
  let html = md;
  html = html.replace(/^### (.+)$/gm, "<h3>$1</h3>");
  html = html.replace(/^## (.+)$/gm, "<h2>$1</h2>");
  html = html.replace(/^# (.+)$/gm, "<h1>$1</h1>");
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");
  html = html.replace(/`(.+?)`/g, "<code>$1</code>");
  html = html.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');
  html = html.replace(/^- (.+)$/gm, "<li>$1</li>");
  html = html.replace(/(<li>.*<\/li>\n?)+/g, (m) => `<ul>\n${m}</ul>\n`);
  html = html.replace(/^(?!<[hulo])(.*\S.*)$/gm, "<p>$1</p>");
  return html.trim();
}

export default function MarkdownToHtml() {
  const [input, setInput] = useState("");
  return (
    <ToolLayout title="Markdown to HTML" description="Convert Markdown text to HTML.">
      <ToolInput label="Markdown" value={input} onChange={setInput} placeholder="# Hello\n\n**Bold** and *italic*" textarea />
      <ToolOutput label="HTML" value={input ? md2html(input) : ""} />
    </ToolLayout>
  );
}
