import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();
    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    const target = url.startsWith("http") ? url : `https://${url}`;

    // Try HEAD first, fall back to GET if it fails
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

    const headers: Record<string, string> = {};
    res.headers.forEach((value, key) => {
      headers[key] = value;
    });

    return NextResponse.json({ url: target, status: res.status, headers });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Failed to fetch headers" },
      { status: 500 }
    );
  }
}
