import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();
    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    const target = url.startsWith("http") ? url : `https://${url}`;
    const hops: { url: string; status: number; statusText: string }[] = [];
    let current = target;

    for (let i = 0; i < 20; i++) {
      const res = await fetch(current, {
        method: "HEAD",
        redirect: "manual",
        signal: AbortSignal.timeout(10000),
      });

      hops.push({ url: current, status: res.status, statusText: res.statusText });

      const location = res.headers.get("location");
      if (!location || res.status < 300 || res.status >= 400) break;

      current = location.startsWith("http") ? location : new URL(location, current).href;
    }

    return NextResponse.json({ hops });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Failed to trace redirects" },
      { status: 500 }
    );
  }
}
