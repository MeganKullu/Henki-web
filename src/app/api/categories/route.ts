import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const categories = await (prisma as any).category.findMany({
    where:   { active: true },
    orderBy: { sortOrder: "asc" },
    include: {
      subcategories: {
        orderBy: { name: "asc" },
        select:  { id: true, name: true, slug: true, image: true },
      },
      _count: { select: { products: true } },
    },
  });

  return NextResponse.json(categories);
}
