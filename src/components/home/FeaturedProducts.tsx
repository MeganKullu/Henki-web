"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/products/ProductCard";

export interface ProductItem {
  id: string;
  name: string;
  slug: string;
  price: number;
  comparePrice: number | null;
  brand: string;
  images: string[];
  stock: number;
  featured: boolean;
  hotDeal?: boolean;
  newArrival?: boolean;
  onSale?: boolean;
  category: { name: string; slug?: string };
}

const TABS = [
  { key: "all",        label: "All Products" },
  { key: "featured",   label: "Featured" },
  { key: "onSale",     label: "On Sale" },
  { key: "newArrival", label: "New Arrivals" },
  { key: "hotDeal",    label: "Hot Deals" },
];

interface FeaturedProductsProps {
  title: string;
  products: ProductItem[];
  viewAllHref?: string;
  showTabs?: boolean;
}

export default function FeaturedProducts({
  title,
  products,
  viewAllHref = "/products",
  showTabs = true,
}: FeaturedProductsProps) {
  const [activeTab, setActiveTab] = useState("all");

  const display =
    activeTab === "all"
      ? products
      : products.filter((p) => {
          if (activeTab === "featured")   return p.featured;
          if (activeTab === "onSale")     return p.onSale || p.comparePrice !== null;
          if (activeTab === "newArrival") return p.newArrival;
          if (activeTab === "hotDeal")    return p.hotDeal;
          return true;
        });

  const shown = display.slice(0, 8);

  // Only render tabs that have matching products
  const activeTabs = showTabs
    ? TABS.filter(
        (t) =>
          t.key === "all" ||
          products.some((p) => {
            if (t.key === "featured")   return p.featured;
            if (t.key === "onSale")     return p.onSale || p.comparePrice !== null;
            if (t.key === "newArrival") return p.newArrival;
            if (t.key === "hotDeal")    return p.hotDeal;
            return false;
          })
      )
    : [];

  return (
    <section className="pt-7 pb-2">

      {/* ── Section header ── */}
      <div className="flex items-end justify-between mb-0">
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

        <Link
          href={viewAllHref}
          className="flex items-center gap-1 font-bold uppercase text-[#0062bd] hover:text-[#fed700] transition-colors flex-shrink-0 ml-4"
          style={{ fontSize: "12px" }}
        >
          View All <ArrowRight size={12} />
        </Link>
      </div>

      {/* ── Tab pills ── */}
      {activeTabs.length > 0 && (
        <div className="nav-classic mt-3 mb-4 overflow-x-auto">
          {activeTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`nav-link${activeTab === tab.key ? " active" : ""}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {/* ── Product grid: 2 / 4 / 6 columns ── */}
      {shown.length > 0 ? (
        <div
          className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6"
          style={{ borderTop: "1px solid #eeeeee", borderLeft: "1px solid #eeeeee" }}
        >
          {shown.map((product) => (
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
          No products in this section yet.
        </div>
      )}
    </section>
  );
}
