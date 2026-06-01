import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();
    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    const target = url.startsWith("http") ? url : `https://${url}`;
    const start = Date.now();
    const res = await fetch(target, {
      method: "HEAD",
      redirect: "follow",
      signal: AbortSignal.timeout(10000),
    });
    const elapsed = Date.now() - start;

    return NextResponse.json({
      online: true,
      status: res.status,
      statusText: res.statusText,
      responseTime: elapsed,
      url: target,
    });
  } catch (e) {
    return NextResponse.json({
      online: false,
      error: e instanceof Error ? e.message : "Could not reach the website",
    });
  }
}
