"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/products/ProductCard";

/* ── Real product data with genuine Unsplash photos ────────────────── */
const ALL_PRODUCTS = [
  {
    id: "1",
    name: "Dell XPS 15 Laptop — i7 16GB 512GB SSD",
    slug: "dell-xps-15-laptop",
    price: 219999,
    comparePrice: 249999,
    brand: "Dell",
    images: ["https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80"],
    stock: 3,
    featured: true,
    category: { name: "Laptops" },
    tags: ["featured", "sale"],
  },
  {
    id: "2",
    name: "Apple iPhone 15 Pro 256GB — Natural Titanium",
    slug: "apple-iphone-15-pro-256gb",
    price: 149999,
    comparePrice: null,
    brand: "Apple",
    images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80"],
    stock: 5,
    featured: true,
    category: { name: "Smartphones" },
    tags: ["featured", "new"],
  },
  {
    id: "3",
    name: "Sony WH-1000XM5 Wireless Noise-Cancelling Headphones",
    slug: "sony-wh-1000xm5",
    price: 39999,
    comparePrice: 49999,
    brand: "Sony",
    images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80"],
    stock: 20,
    featured: false,
    category: { name: "Audio" },
    tags: ["sale", "bestseller"],
  },
  {
    id: "4",
    name: 'LG 27" 4K UHD IPS Monitor with USB-C',
    slug: "lg-27-4k-monitor",
    price: 54999,
    comparePrice: 64999,
    brand: "LG",
    images: ["https://images.unsplash.com/photo-1527443224154-c4a573d5afed?w=400&q=80"],
    stock: 8,
    featured: true,
    category: { name: "Monitors" },
    tags: ["featured", "sale"],
  },
  {
    id: "5",
    name: "Samsung Galaxy S24 Ultra 512GB — Titanium Black",
    slug: "samsung-galaxy-s24-ultra",
    price: 179999,
    comparePrice: null,
    brand: "Samsung",
    images: ["https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&q=80"],
    stock: 7,
    featured: true,
    category: { name: "Smartphones" },
    tags: ["new", "featured"],
  },
  {
    id: "6",
    name: "Logitech MX Master 3S Wireless Mouse",
    slug: "logitech-mx-master-3s",
    price: 12999,
    comparePrice: 15999,
    brand: "Logitech",
    images: ["https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&q=80"],
    stock: 30,
    featured: false,
    category: { name: "Accessories" },
    tags: ["sale", "bestseller"],
  },
  {
    id: "7",
    name: "Apple AirPods Pro 2nd Gen with MagSafe",
    slug: "apple-airpods-pro-2",
    price: 34999,
    comparePrice: 38999,
    brand: "Apple",
    images: ["https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&q=80"],
    stock: 15,
    featured: false,
    category: { name: "Audio" },
    tags: ["sale", "bestseller"],
  },
  {
    id: "8",
    name: "ASUS ROG Zephyrus G14 Gaming Laptop RTX 4060",
    slug: "asus-rog-zephyrus-g14",
    price: 289999,
    comparePrice: 329999,
    brand: "ASUS",
    images: ["https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&q=80"],
    stock: 4,
    featured: true,
    category: { name: "Laptops" },
    tags: ["featured", "new", "sale"],
  },
];

const TABS = [
  { key: "all", label: "All Products" },
  { key: "featured", label: "Featured" },
  { key: "sale", label: "On Sale" },
  { key: "new", label: "New Arrivals" },
  { key: "bestseller", label: "Best Sellers" },
];

interface FeaturedProductsProps {
  title: string;
  categorySlug?: string;
  featured?: boolean;
}

export default function FeaturedProducts({
  title,
  categorySlug,
  featured,
}: FeaturedProductsProps) {
  const [activeTab, setActiveTab] = useState("all");

  /* Filter by section prop first, then by active tab */
  let base = ALL_PRODUCTS.filter((p) => p.stock > 0);
  if (categorySlug) base = base.filter((p) => p.category.name.toLowerCase() === categorySlug);
  if (featured) base = base.filter((p) => p.featured);

  const shown =
    activeTab === "all"
      ? base
      : base.filter((p) => p.tags.includes(activeTab));

  const display = shown.slice(0, 6);

  const href = categorySlug
    ? `/products?category=${categorySlug}`
    : featured
      ? `/products?featured=true`
      : "/products";

  return (
    <section className="pt-7 pb-2">

      {/* ── Section header ── */}
      <div className="flex items-end justify-between mb-0">
        {/* Left: title with yellow border accent */}
        <div className="flex items-center gap-3">
          <div
            className="self-stretch w-1 rounded-sm"
            style={{ background: "#fed700", minWidth: "4px" }}
          />
          <h2
            className="font-black uppercase text-[#1e2022] tracking-wide"
            style={{ fontSize: "16px" }}
          >
            {title}
          </h2>
        </div>

        {/* Right: View All link */}
        <Link
          href={href}
          className="flex items-center gap-1 font-bold uppercase text-[#0062bd] hover:text-[#fed700] transition-colors flex-shrink-0 ml-4"
          style={{ fontSize: "12px" }}
        >
          View All <ArrowRight size={12} />
        </Link>
      </div>

      {/* ── Tab pills ── */}
      <div className="nav-classic mt-3 mb-4 overflow-x-auto">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`nav-link${activeTab === tab.key ? " active" : ""}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── Product grid: 2 / 4 / 6 columns ── */}
      {display.length > 0 ? (
        <div
          className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6"
          style={{ borderTop: "1px solid #eeeeee", borderLeft: "1px solid #eeeeee" }}
        >
          {display.map((product) => (
            <div
              key={product.id}
              className="flex flex-col"
              style={{ borderRight: "1px solid #eeeeee", borderBottom: "1px solid #eeeeee" }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        <div className="py-12 text-center text-[#8c98a4] text-sm border border-[#eeeeee]">
          No products in this category yet.
        </div>
      )}
    </section>
  );
}
