import { MemoryCache } from "@/lib/memoryCache";
import { NextResponse } from "next/server";

export async function GET(req: Request) {

  if (req.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse('Unauthorized', {status: 401})
  }

  MemoryCache.logCache();

  return NextResponse.json({ ok: true });
}
