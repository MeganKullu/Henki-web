import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const { productId, sessionId, userId } = await req.json();
    if (!productId || typeof productId !== "string") {
      return NextResponse.json({ error: "productId required" }, { status: 400 });
    }

    await (prisma as any).productView.create({
      data: {
        productId,
        sessionId: sessionId ?? null,
        userId:    userId    ?? null,
      },
    });

    return NextResponse.json({ ok: true });
  } catch {
    // Silently fail — never break product pages over analytics
    return NextResponse.json({ ok: false });
  }
}
