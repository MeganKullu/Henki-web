import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const category    = searchParams.get("category");
  const subcategory = searchParams.get("subcategory");
  const brand       = searchParams.getAll("brand");
  const condition   = searchParams.get("condition");
  const minPrice    = searchParams.get("minPrice");
  const maxPrice    = searchParams.get("maxPrice");
  const q           = searchParams.get("q");
  const featured    = searchParams.get("featured");
  const hotDeal     = searchParams.get("hotDeal");
  const newArrival  = searchParams.get("newArrival");
  const onSale      = searchParams.get("onSale");
  const section     = searchParams.get("section"); // section slug — resolves via Section table
  const page        = Math.max(1, parseInt(searchParams.get("page")  || "1"));
  const limit       = Math.min(50, parseInt(searchParams.get("limit") || "12"));

  // Resolve section slug → flag filter
  let sectionFilter: Record<string, boolean> = {};
  if (section) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const sec = await (prisma as any).section.findUnique({ where: { slug: section } });
      if (sec) {
        if (sec.type === "hot_deal")    sectionFilter = { hotDeal:    true };
        if (sec.type === "new_arrival") sectionFilter = { newArrival: true };
        if (sec.type === "on_sale")     sectionFilter = { onSale:     true };
        if (sec.type === "featured")    sectionFilter = { featured:   true };
      }
    } catch { /* DB not connected */ }
  }

  const where = {
    stock: { gt: 0 },
    ...(category         && { category:    { slug: category } }),
    ...(subcategory      && { subcategory: { slug: subcategory } }),
    ...(brand.length > 0 && { brand: { in: brand } }),
    ...(condition        && { condition }),
    ...((minPrice || maxPrice) && {
      price: {
        ...(minPrice && { gte: parseFloat(minPrice) }),
        ...(maxPrice && { lte: parseFloat(maxPrice) }),
      },
    }),
    ...(featured    === "true" && { featured:   true }),
    ...(hotDeal     === "true" && { hotDeal:    true }),
    ...(newArrival  === "true" && { newArrival: true }),
    ...(onSale      === "true" && { onSale:     true }),
    ...sectionFilter,
    ...(q && {
      OR: [
        { name:        { contains: q, mode: "insensitive" as const } },
        { brand:       { contains: q, mode: "insensitive" as const } },
        { description: { contains: q, mode: "insensitive" as const } },
        { model:       { contains: q, mode: "insensitive" as const } },
      ],
    }),
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [products, total] = await Promise.all([
    (prisma as any).product.findMany({
      where,
      include: {
        category:    { select: { name: true, slug: true } },
        subcategory: { select: { name: true, slug: true } },
      },
      skip:    (page - 1) * limit,
      take:    limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.product.count({ where }),
  ]);

  return NextResponse.json({ products, total, page, limit });
}
