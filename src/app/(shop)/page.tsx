export const dynamic = "force-dynamic";

import HeroBanner from "@/components/home/HeroBanner";
import CategoryGrid from "@/components/home/CategoryGrid";
import FeaturedProducts, { type ProductItem } from "@/components/home/FeaturedProducts";
import BrandsBanner from "@/components/home/BrandsBanner";
import { Suspense } from "react";
import { prisma } from "@/lib/prisma";

type SectionRow = {
  id: string;
  title: string;
  slug: string;
  type: string;
  categorySlug: string | null;
  maxItems: number;
  showTabs: boolean;
};

/* ── Fallback sections rendered when DB is not connected ─────────── */
const FALLBACK_SECTIONS: SectionRow[] = [
  { id: "1", title: "Hot Deals",       slug: "hot-deals",    type: "hot_deal",    categorySlug: null,          maxItems: 8, showTabs: true  },
  { id: "2", title: "Latest Laptops",  slug: "laptops",      type: "category",    categorySlug: "laptops",     maxItems: 8, showTabs: false },
  { id: "3", title: "Top Smartphones", slug: "smartphones",  type: "category",    categorySlug: "smartphones", maxItems: 8, showTabs: false },
  { id: "4", title: "New Arrivals",    slug: "new-arrivals", type: "new_arrival", categorySlug: null,          maxItems: 8, showTabs: false },
];

interface SectionData {
  id: string;
  title: string;
  slug: string;
  type: string;
  categorySlug: string | null;
  maxItems: number;
  showTabs: boolean;
  products: ProductItem[];
  viewAllHref: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function fetchSectionProducts(
  type: string,
  categorySlug: string | null,
  maxItems: number
): Promise<ProductItem[]> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: Record<string, any> = { stock: { gt: 0 } };

  if (type === "hot_deal")    where.hotDeal    = true;
  if (type === "new_arrival") where.newArrival = true;
  if (type === "on_sale")     where.onSale     = true;
  if (type === "featured")    where.featured   = true;
  if (type === "category" && categorySlug)
    where.category = { slug: categorySlug };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let products: any[] = [];
  try {
    products = await (prisma as any).product.findMany({
      where,
      include: { category: { select: { name: true, slug: true } } },
      take:    maxItems,
      orderBy: { createdAt: "desc" },
    });
    console.log(`[homepage] ${type}${categorySlug ? "/" + categorySlug : ""}: ${products.length} products`);
  } catch (err) {
    console.error(`[homepage] fetchSectionProducts error (${type}/${categorySlug}):`, err);
    return [];
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return products.map((p: any) => ({
    id:           p.id,
    name:         p.name,
    slug:         p.slug,
    price:        p.price,
    comparePrice: p.comparePrice,
    brand:        p.brand,
    images:       p.images,
    stock:        p.stock,
    featured:     p.featured,
    hotDeal:      p.hotDeal,
    newArrival:   p.newArrival,
    onSale:       p.onSale,
    category:     p.category,
  }));
}

function sectionViewAllHref(type: string, categorySlug: string | null, sectionSlug: string): string {
  if (type === "category" && categorySlug) return `/products?category=${categorySlug}`;
  if (type === "hot_deal")    return `/products?hotDeal=true`;
  if (type === "new_arrival") return `/products?newArrival=true`;
  if (type === "on_sale")     return `/products?onSale=true`;
  if (type === "featured")    return `/products?featured=true`;
  return `/products`;
}

async function loadSections(): Promise<SectionData[]> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dbSections: SectionRow[] = await (prisma as any).section.findMany({
      where:   { active: true },
      orderBy: { sortOrder: "asc" },
    });

    const sections: SectionRow[] = dbSections.length > 0 ? dbSections : FALLBACK_SECTIONS;
    console.log(`[homepage] ${dbSections.length > 0 ? `${dbSections.length} sections from DB` : "using fallback sections"}`);

    return Promise.all(
      sections.map(async (sec: SectionRow) => ({
        id:          sec.id,
        title:       sec.title,
        slug:        sec.slug,
        type:        sec.type,
        categorySlug: sec.categorySlug,
        maxItems:    sec.maxItems,
        showTabs:    sec.showTabs,
        products:    await fetchSectionProducts(sec.type, sec.categorySlug, sec.maxItems),
        viewAllHref: sectionViewAllHref(sec.type, sec.categorySlug, sec.slug),
      }))
    );
  } catch (err) {
    console.error("[homepage] Failed to load sections:", err);
    // Try loading fallback sections with demo-safe empty products
    return FALLBACK_SECTIONS.map((sec) => ({
      ...sec,
      products: [],
      viewAllHref: sectionViewAllHref(sec.type, sec.categorySlug, sec.slug),
    }));
  }
}

function ProductsSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="bg-white border border-[#eeeeee] overflow-hidden animate-pulse">
          <div className="aspect-square bg-[#f5f5f5]" />
          <div className="p-3 space-y-2">
            <div className="h-3 bg-[#f5f5f5] rounded w-1/3" />
            <div className="h-4 bg-[#f5f5f5] rounded w-full" />
            <div className="h-5 bg-[#f5f5f5] rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}

async function ProductSections() {
  const sections = await loadSections();

  if (sections.length === 0) {
    return (
      <div className="py-16 text-center text-[#8c98a4] text-sm">
        Connect the database and add sections to populate the homepage.
      </div>
    );
  }

  return (
    <>
      {sections.map((sec) => (
        <FeaturedProducts
          key={sec.id}
          title={sec.title}
          products={sec.products}
          viewAllHref={sec.viewAllHref}
          showTabs={sec.showTabs}
        />
      ))}
    </>
  );
}

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <CategoryGrid />

      <div className="max-w-[1400px] mx-auto px-4">
        <Suspense fallback={<ProductsSkeleton />}>
          <ProductSections />
        </Suspense>
      </div>

      <BrandsBanner />
    </>
  );
}
