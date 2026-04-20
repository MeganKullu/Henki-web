import { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://henkielectronics.co.ke";

const STATIC_PAGES: MetadataRoute.Sitemap = [
  { url: SITE_URL,                  priority: 1.0, changeFrequency: "daily"   as const },
  { url: `${SITE_URL}/products`,    priority: 0.9, changeFrequency: "daily"   as const },
  { url: `${SITE_URL}/about`,       priority: 0.5, changeFrequency: "monthly" as const },
  { url: `${SITE_URL}/contact`,     priority: 0.6, changeFrequency: "monthly" as const },
  { url: `${SITE_URL}/faq`,         priority: 0.5, changeFrequency: "monthly" as const },
  { url: `${SITE_URL}/shipping`,    priority: 0.5, changeFrequency: "monthly" as const },
  { url: `${SITE_URL}/returns`,     priority: 0.5, changeFrequency: "monthly" as const },
  { url: `${SITE_URL}/terms`,       priority: 0.3, changeFrequency: "yearly"  as const },
  { url: `${SITE_URL}/privacy`,     priority: 0.3, changeFrequency: "yearly"  as const },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  let categoryPages: MetadataRoute.Sitemap = [];
  let productPages:  MetadataRoute.Sitemap = [];

  try {
    const { prisma } = await import("@/lib/prisma");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [categories, products]: [any[], any[]] = await Promise.all([
      (prisma as any).category.findMany({ where: { active: true }, select: { slug: true, updatedAt: true } }),
      prisma.product.findMany({  where: { stock: { gt: 0 } }, select: { slug: true, updatedAt: true } }),
    ]);

    categoryPages = categories.map((c: { slug: string; updatedAt?: Date }) => ({
      url:             `${SITE_URL}/products?category=${c.slug}`,
      lastModified:    c.updatedAt,
      priority:        0.8,
      changeFrequency: "daily" as const,
    }));

    productPages = products.map((p: { slug: string; updatedAt: Date }) => ({
      url:             `${SITE_URL}/products/${p.slug}`,
      lastModified:    p.updatedAt,
      priority:        0.7,
      changeFrequency: "weekly" as const,
    }));
  } catch {
    // DB not connected — skip dynamic pages
  }

  return [
    ...STATIC_PAGES.map((p) => ({ ...p, lastModified: now })),
    ...categoryPages,
    ...productPages,
  ];
}
