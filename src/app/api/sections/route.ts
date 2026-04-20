import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sections = await (prisma as any).section.findMany({
    where:   { active: true },
    orderBy: { sortOrder: "asc" },
  });

  return NextResponse.json(sections);
}
