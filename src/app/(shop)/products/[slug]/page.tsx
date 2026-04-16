import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ProductGallery from "@/components/products/ProductGallery";
import AddToCartButton from "@/components/products/AddToCartButton";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import ProductCard from "@/components/products/ProductCard";
import ProductJsonLd from "@/components/common/JsonLd";
import { formatPrice, formatDiscount } from "@/lib/formatters";
import {
  Star,
  Shield,
  Truck,
  RefreshCw,
  Package,
  Tag,
} from "lucide-react";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { category: true },
  });

  if (!product) return { title: "Product Not Found" };

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://henkielectronics.co.ke";

  return {
    title: `${product.name} — ${formatPrice(product.price)}`,
    description: product.description.slice(0, 160),
    openGraph: {
      title: product.name,
      description: product.description.slice(0, 160),
      images: [{ url: product.images[0], width: 800, height: 800 }],
      type: "website",
    },
    alternates: {
      canonical: `${siteUrl}/products/${slug}`,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug },
    include: { category: true },
  });

  if (!product) notFound();

  const related = await prisma.product.findMany({
    where: {
      categoryId: product.categoryId,
      id: { not: product.id },
      stock: { gt: 0 },
    },
    include: { category: { select: { name: true } } },
    take: 4,
    orderBy: { featured: "desc" },
  });

  const discount = product.comparePrice
    ? formatDiscount(product.comparePrice, product.price)
    : null;

  const specs = product.specs as Record<string, string>;

  return (
    <>
      <ProductJsonLd product={product} />

      <div className="max-w-[1200px] mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-[#fed700]">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link
            href={`/products?category=${product.category.slug}`}
            className="hover:text-[#fed700]"
          >
            {product.category.name}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800 font-medium line-clamp-1">
            {product.name}
          </span>
        </nav>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Gallery */}
          <div>
            <ProductGallery images={product.images} name={product.name} />
          </div>

          {/* Info */}
          <div className="space-y-5">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                  {product.brand}
                </span>
                <span className="text-gray-300">·</span>
                <span className="text-xs text-gray-500">
                  SKU: {product.sku}
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-[#333e48] leading-tight">
                {product.name}
              </h1>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={
                      i < 4
                        ? "text-[#fed700] fill-[#fed700]"
                        : "text-gray-300 fill-gray-300"
                    }
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600 font-medium">4.5</span>
              <span className="text-sm text-gray-400">(24 reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-end gap-3">
              <span className="text-3xl font-black text-[#333e48]">
                {formatPrice(product.price)}
              </span>
              {product.comparePrice && (
                <>
                  <span className="text-lg price-compare">
                    {formatPrice(product.comparePrice)}
                  </span>
                  <span className="badge badge-sale text-sm">
                    Save {discount}%
                  </span>
                </>
              )}
            </div>

            {/* Stock */}
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${product.stock > 5 ? "bg-green-500" : product.stock > 0 ? "bg-yellow-500" : "bg-red-500"}`}
              />
              <span
                className={`text-sm font-medium ${product.stock > 5 ? "text-green-700" : product.stock > 0 ? "text-yellow-700" : "text-red-700"}`}
              >
                {product.stock > 5
                  ? "In Stock"
                  : product.stock > 0
                    ? `Only ${product.stock} left!`
                    : "Out of Stock"}
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed text-sm">
              {product.description}
            </p>

            {/* CTA Buttons */}
            <div className="space-y-3">
              <AddToCartButton product={product} />
              <WhatsAppButton product={product} variant="inline" />
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100">
              {[
                {
                  icon: <Shield size={16} className="text-[#fed700]" />,
                  text: "Genuine warranty",
                },
                {
                  icon: <Truck size={16} className="text-[#fed700]" />,
                  text: "Free delivery over KSh 10k",
                },
                {
                  icon: <RefreshCw size={16} className="text-[#fed700]" />,
                  text: "7-day returns",
                },
                {
                  icon: <Package size={16} className="text-[#fed700]" />,
                  text: "Secure packaging",
                },
              ].map((item) => (
                <div
                  key={item.text}
                  className="flex items-center gap-2 text-xs text-gray-600"
                >
                  {item.icon}
                  {item.text}
                </div>
              ))}
            </div>

            {/* Category tag */}
            <div className="flex items-center gap-1.5 text-sm">
              <Tag size={14} className="text-gray-400" />
              <Link
                href={`/products?category=${product.category.slug}`}
                className="text-gray-500 hover:text-[#fed700] transition-colors"
              >
                {product.category.name}
              </Link>
            </div>
          </div>
        </div>

        {/* Tabs: Description & Specs */}
        <div className="mt-10 bg-white rounded border border-[#eeeeee] overflow-hidden">
          <div className="flex border-b border-[#eeeeee]">
            <button className="px-6 py-3.5 text-sm font-bold text-[#333e48] border-b-2 border-[#fed700] uppercase tracking-wide">
              Specifications
            </button>
            <button className="px-6 py-3.5 text-sm text-gray-500 hover:text-gray-700">
              Description
            </button>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.entries(specs).map(([key, value]) => (
                <div
                  key={key}
                  className="flex gap-2 py-2 border-b border-gray-50"
                >
                  <span className="text-sm text-gray-500 capitalize font-medium w-32 flex-shrink-0">
                    {key
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (s) => s.toUpperCase())}
                  </span>
                  <span className="text-sm text-gray-800">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-10">
            <h2 className="section-title mb-5">Related Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky WhatsApp */}
      <WhatsAppButton product={product} variant="sticky" />
    </>
  );
}
