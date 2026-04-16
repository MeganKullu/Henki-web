import { Suspense } from "react";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/products/ProductCard";
import ProductFilters from "@/components/products/ProductFilters";
import { LayoutGrid, List } from "lucide-react";
import Link from "next/link";
import SortSelect from "@/components/products/SortSelect";

/* Fallback data used when the database is not connected */
const DUMMY_PRODUCTS = [
  { id: "1", name: "Dell XPS 15 Laptop — i7 16GB 512GB SSD", slug: "dell-xps-15-laptop", price: 219999, comparePrice: 249999, brand: "Dell", images: ["https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80"], stock: 3, featured: true, category: { name: "Laptops" } },
  { id: "2", name: "Apple iPhone 15 Pro 256GB — Natural Titanium", slug: "apple-iphone-15-pro-256gb", price: 149999, comparePrice: null, brand: "Apple", images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80"], stock: 5, featured: true, category: { name: "Smartphones" } },
  { id: "3", name: "Sony WH-1000XM5 Wireless Noise-Cancelling Headphones", slug: "sony-wh-1000xm5", price: 39999, comparePrice: 49999, brand: "Sony", images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80"], stock: 20, featured: false, category: { name: "Audio" } },
  { id: "4", name: 'Samsung Galaxy S24 Ultra 512GB — Titanium Black', slug: "samsung-galaxy-s24-ultra", price: 179999, comparePrice: null, brand: "Samsung", images: ["https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&q=80"], stock: 7, featured: true, category: { name: "Smartphones" } },
  { id: "5", name: "ASUS ROG Zephyrus G14 Gaming Laptop RTX 4060", slug: "asus-rog-zephyrus-g14", price: 289999, comparePrice: 329999, brand: "ASUS", images: ["https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&q=80"], stock: 4, featured: true, category: { name: "Laptops" } },
  { id: "6", name: "Logitech MX Master 3S Wireless Mouse", slug: "logitech-mx-master-3s", price: 12999, comparePrice: 15999, brand: "Logitech", images: ["https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&q=80"], stock: 30, featured: false, category: { name: "Accessories" } },
  { id: "7", name: "Apple AirPods Pro 2nd Gen with MagSafe", slug: "apple-airpods-pro-2", price: 34999, comparePrice: 38999, brand: "Apple", images: ["https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&q=80"], stock: 15, featured: false, category: { name: "Audio" } },
  { id: "8", name: "Anker 65W USB-C GaN Charger 3-Port", slug: "anker-65w-gan-charger", price: 4999, comparePrice: 6999, brand: "Anker", images: ["https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&q=80"], stock: 50, featured: false, category: { name: "Accessories" } },
  { id: "9", name: "JBL Charge 5 Portable Bluetooth Speaker", slug: "jbl-charge-5", price: 18999, comparePrice: 22999, brand: "JBL", images: ["https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&q=80"], stock: 12, featured: false, category: { name: "Audio" } },
  { id: "10", name: "Samsung 970 EVO Plus 1TB NVMe SSD", slug: "samsung-970-evo-plus-1tb", price: 14999, comparePrice: 18999, brand: "Samsung", images: ["https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&q=80"], stock: 25, featured: false, category: { name: "Accessories" } },
  { id: "11", name: "HP Pavilion 15 Laptop — Ryzen 5 8GB 256GB", slug: "hp-pavilion-15", price: 89999, comparePrice: 109999, brand: "HP", images: ["https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=400&q=80"], stock: 6, featured: false, category: { name: "Laptops" } },
  { id: "12", name: "Baseus 20000mAh Power Bank 65W PD", slug: "baseus-20000mah-powerbank", price: 5999, comparePrice: 7999, brand: "Baseus", images: ["https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&q=80"], stock: 40, featured: false, category: { name: "Accessories" } },
];

export const metadata: Metadata = {
  title: "All Products",
  description:
    "Shop laptops, smartphones, audio gear and accessories. Best electronics prices in Kenya with M-Pesa payment.",
};

interface SearchParams {
  category?: string;
  brand?: string | string[];
  minPrice?: string;
  maxPrice?: string;
  q?: string;
  featured?: string;
  page?: string;
  sort?: string;
}

const ITEMS_PER_PAGE = 12;

async function ProductGrid({ searchParams }: { searchParams: SearchParams }) {
  const page = Math.max(1, parseInt(searchParams.page || "1"));
  const skip = (page - 1) * ITEMS_PER_PAGE;

  const brands =
    typeof searchParams.brand === "string"
      ? [searchParams.brand]
      : (searchParams.brand ?? []);

  const where = {
    ...(searchParams.category && {
      category: { slug: searchParams.category },
    }),
    ...(brands.length > 0 && { brand: { in: brands } }),
    ...(searchParams.minPrice || searchParams.maxPrice
      ? {
          price: {
            ...(searchParams.minPrice && {
              gte: parseFloat(searchParams.minPrice),
            }),
            ...(searchParams.maxPrice && {
              lte: parseFloat(searchParams.maxPrice),
            }),
          },
        }
      : {}),
    ...(searchParams.featured === "true" && { featured: true }),
    ...(searchParams.q && {
      OR: [
        { name: { contains: searchParams.q, mode: "insensitive" as const } },
        { brand: { contains: searchParams.q, mode: "insensitive" as const } },
        {
          description: {
            contains: searchParams.q,
            mode: "insensitive" as const,
          },
        },
      ],
    }),
  };

  const sort = searchParams.sort || "newest";
  const orderBy =
    sort === "price-asc"
      ? { price: "asc" as const }
      : sort === "price-desc"
        ? { price: "desc" as const }
        : sort === "name"
          ? { name: "asc" as const }
          : { createdAt: "desc" as const };

  let products: typeof DUMMY_PRODUCTS;
  let total: number;

  try {
    const [dbProducts, dbTotal] = await Promise.all([
      prisma.product.findMany({
        where,
        include: { category: { select: { name: true } } },
        orderBy,
        skip,
        take: ITEMS_PER_PAGE,
      }),
      prisma.product.count({ where }),
    ]);
    products = dbProducts as typeof DUMMY_PRODUCTS;
    total = dbTotal;
  } catch {
    /* DB not connected — show demo products */
    products = DUMMY_PRODUCTS;
    total = DUMMY_PRODUCTS.length;
  }

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-bold text-gray-700 mb-2">
          No products found
        </h3>
        <p className="text-gray-500 mb-4">
          Try adjusting your filters or search terms
        </p>
        <Link href="/products" className="btn-primary">
          Clear Filters
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div
        className="grid grid-cols-2 md:grid-cols-3 mb-6"
        style={{ borderTop: "1px solid #eeeeee", borderLeft: "1px solid #eeeeee" }}
      >
        {products.map((p) => (
          <div key={p.id} style={{ borderRight: "1px solid #eeeeee", borderBottom: "1px solid #eeeeee" }}>
            <ProductCard product={p} />
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
            const params = new URLSearchParams();
            if (searchParams.category)
              params.set("category", searchParams.category);
            if (searchParams.q) params.set("q", searchParams.q);
            if (searchParams.sort) params.set("sort", searchParams.sort);
            params.set("page", String(p));
            return (
              <Link
                key={p}
                href={`/products?${params.toString()}`}
                className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${page === p ? "bg-[#333e48] text-white" : "bg-white border border-gray-200 hover:border-[#fed700] text-gray-700"}`}
              >
                {p}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  let categories: Array<{ id: string; name: string; slug: string }> = [];
  try {
    categories = await prisma.category.findMany({ orderBy: { name: "asc" } });
  } catch {
    /* DB not connected */
    categories = [
      { id: "1", name: "Laptops", slug: "laptops" },
      { id: "2", name: "Smartphones", slug: "smartphones" },
      { id: "3", name: "Audio", slug: "audio" },
      { id: "4", name: "Accessories", slug: "accessories" },
    ];
  }

  const activeCategory = categories.find((c) => c.slug === params.category);
  const title = activeCategory
    ? activeCategory.name
    : params.q
      ? `Search: "${params.q}"`
      : params.featured === "true"
        ? "Hot Deals"
        : "All Products";

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-[#fed700]">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800 font-medium">{title}</span>
      </nav>

      <div className="flex gap-6">
        {/* Sidebar filters */}
        <div className="w-56 flex-shrink-0 hidden md:block">
          <Suspense fallback={null}>
            <ProductFilters categories={categories} />
          </Suspense>
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Toolbar */}
          <div
            className="flex items-center justify-between mb-0 bg-[#f5f5f5] px-4 py-2.5"
            style={{ border: "1px solid #eeeeee" }}
          >
            <h1
              className="font-black uppercase text-[#1e2022]"
              style={{ fontSize: "14px" }}
            >
              {title}
            </h1>
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-1 text-[#8c98a4]">
                <button className="p-1 hover:text-[#333e48] transition-colors">
                  <LayoutGrid size={15} />
                </button>
                <button className="p-1 hover:text-[#333e48] transition-colors">
                  <List size={15} />
                </button>
              </div>
              <Suspense fallback={null}>
                <SortSelect current={params.sort || "newest"} />
              </Suspense>
            </div>
          </div>

          <Suspense
            fallback={
              <div
                className="grid grid-cols-2 md:grid-cols-3"
                style={{ borderTop: "1px solid #eeeeee", borderLeft: "1px solid #eeeeee" }}
              >
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="animate-pulse"
                    style={{ borderRight: "1px solid #eeeeee", borderBottom: "1px solid #eeeeee" }}
                  >
                    <div style={{ height: "200px" }} className="bg-[#f5f5f5]" />
                    <div className="p-3 space-y-2">
                      <div className="h-2 bg-[#eeeeee] rounded w-1/3" />
                      <div className="h-3 bg-[#eeeeee] rounded w-full" />
                      <div className="h-3 bg-[#eeeeee] rounded w-3/4" />
                      <div className="h-4 bg-[#eeeeee] rounded w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            }
          >
            <ProductGrid searchParams={params} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
