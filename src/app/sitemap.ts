import { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://henkielectronics.co.ke";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [
    { url: SITE_URL, priority: 1.0, changeFrequency: "daily" as const },
    { url: `${SITE_URL}/products`, priority: 0.9, changeFrequency: "daily" as const },
    { url: `${SITE_URL}/products?category=laptops`, priority: 0.8, changeFrequency: "daily" as const },
    { url: `${SITE_URL}/products?category=smartphones`, priority: 0.8, changeFrequency: "daily" as const },
    { url: `${SITE_URL}/products?category=audio`, priority: 0.8, changeFrequency: "daily" as const },
    { url: `${SITE_URL}/products?category=accessories`, priority: 0.8, changeFrequency: "daily" as const },
    { url: `${SITE_URL}/products?category=tvs`, priority: 0.7, changeFrequency: "weekly" as const },
    { url: `${SITE_URL}/about`, priority: 0.5, changeFrequency: "monthly" as const },
    { url: `${SITE_URL}/contact`, priority: 0.6, changeFrequency: "monthly" as const },
    { url: `${SITE_URL}/faq`, priority: 0.5, changeFrequency: "monthly" as const },
    { url: `${SITE_URL}/shipping`, priority: 0.5, changeFrequency: "monthly" as const },
    { url: `${SITE_URL}/returns`, priority: 0.5, changeFrequency: "monthly" as const },
    { url: `${SITE_URL}/terms`, priority: 0.3, changeFrequency: "yearly" as const },
    { url: `${SITE_URL}/privacy`, priority: 0.3, changeFrequency: "yearly" as const },
  ];

  // Optionally fetch product slugs from DB
  let productPages: MetadataRoute.Sitemap = [];
  try {
    const { prisma } = await import("@/lib/prisma");
    const products = await prisma.product.findMany({
      select: { slug: true, updatedAt: true },
    });
    productPages = products.map((p) => ({
      url: `${SITE_URL}/products/${p.slug}`,
      lastModified: p.updatedAt,
      priority: 0.7,
      changeFrequency: "weekly" as const,
    }));
  } catch {
    // DB not connected — skip product pages
  }

  return [
    ...staticPages.map((p) => ({
      url: p.url,
      lastModified: new Date(),
      priority: p.priority,
      changeFrequency: p.changeFrequency,
    })),
    ...productPages,
  ];
}
