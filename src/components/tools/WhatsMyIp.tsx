"use client";
import { useState, useEffect } from "react";
import ToolLayout, { ToolOutput } from "@/components/ToolLayout";

export default function WhatsMyIp() {
  const [ip, setIp] = useState("Loading...");

  useEffect(() => {
    fetch("/api/whats-my-ip")
      .then((r) => r.json())
      .then((d) => setIp(d.ip))
      .catch(() => setIp("Could not detect IP"));
  }, []);

  return (
    <ToolLayout title="What's My IP" description="Find out your public IP address.">
      <ToolOutput label="Your IP Address" value={ip} />
    </ToolLayout>
  );
}
