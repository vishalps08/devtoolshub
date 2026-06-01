"use client";
import { useState } from "react";
import ToolLayout, { ToolInput, ToolOutput, ToolButton } from "@/components/ToolLayout";

const KEYWORDS = ["SELECT", "FROM", "WHERE", "AND", "OR", "INSERT", "INTO", "VALUES", "UPDATE", "SET", "DELETE", "JOIN", "LEFT", "RIGHT", "INNER", "OUTER", "ON", "GROUP BY", "ORDER BY", "HAVING", "LIMIT", "OFFSET", "CREATE", "TABLE", "ALTER", "DROP", "INDEX", "UNION", "AS", "IN", "NOT", "NULL", "IS", "BETWEEN", "LIKE", "EXISTS", "CASE", "WHEN", "THEN", "ELSE", "END"];

function formatSql(sql: string): string {
  let result = sql.trim();
  const newlineBefore = ["SELECT", "FROM", "WHERE", "AND", "OR", "JOIN", "LEFT JOIN", "RIGHT JOIN", "INNER JOIN", "OUTER JOIN", "GROUP BY", "ORDER BY", "HAVING", "LIMIT", "UNION", "INSERT", "UPDATE", "DELETE", "SET", "VALUES"];
  for (const kw of newlineBefore) {
    result = result.replace(new RegExp(`\\b${kw}\\b`, "gi"), `\n${kw.toUpperCase()}`);
  }
  for (const kw of KEYWORDS) {
    result = result.replace(new RegExp(`\\b${kw}\\b`, "gi"), kw.toUpperCase());
  }
  return result.replace(/^\n/, "").trim();
}

export default function SqlFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  return (
    <ToolLayout title="SQL Formatter" description="Format and beautify SQL queries.">
      <ToolInput label="Paste SQL" value={input} onChange={setInput} placeholder="select id, name from users where active = 1 order by name" textarea />
      <ToolButton onClick={() => setOutput(formatSql(input))}>Format</ToolButton>
      <ToolOutput label="Formatted SQL" value={output} />
    </ToolLayout>
  );
}
