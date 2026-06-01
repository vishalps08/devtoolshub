"use client";
import { useState, useEffect } from "react";
import ToolLayout, { ToolOutput } from "@/components/ToolLayout";

export default function UserAgentFinder() {
  const [ua, setUa] = useState("");
  useEffect(() => { setUa(navigator.userAgent); }, []);

  return (
    <ToolLayout title="User Agent Finder" description="Find out your browser's user agent string.">
      <ToolOutput label="Your User Agent" value={ua} />
    </ToolLayout>
  );
}
