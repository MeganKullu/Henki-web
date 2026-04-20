import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const { sessionId, path, userId, referrer } = await req.json();
    if (!sessionId || !path) {
      return NextResponse.json({ error: "sessionId and path required" }, { status: 400 });
    }

    await (prisma as any).siteVisit.create({
      data: {
        sessionId,
        path,
        userId:   userId   ?? null,
        referrer: referrer ?? null,
      },
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false });
  }
}
