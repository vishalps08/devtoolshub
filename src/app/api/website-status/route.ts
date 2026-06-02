import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();
    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    const target = url.startsWith("http") ? url : `https://${url}`;
    const start = Date.now();

    // Try HEAD first, fall back to GET if it fails or returns 4xx/5xx
    let res = await fetch(target, {
      method: "HEAD",
      redirect: "follow",
      signal: AbortSignal.timeout(10000),
    });

    if (res.status >= 400) {
      res = await fetch(target, {
        method: "GET",
        redirect: "follow",
        signal: AbortSignal.timeout(10000),
      });
    }

    const elapsed = Date.now() - start;

    return NextResponse.json({
      online: res.status < 400,
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
