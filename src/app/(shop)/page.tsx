export const dynamic = "force-dynamic";

import HeroBanner from "@/components/home/HeroBanner";
import CategoryGrid from "@/components/home/CategoryGrid";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import BrandsBanner from "@/components/home/BrandsBanner";
import { Suspense } from "react";

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

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <CategoryGrid />

      {/* Product sections — each inside max-width container */}
      <div className="max-w-[1400px] mx-auto px-4">
        <Suspense fallback={<ProductsSkeleton />}>
          <FeaturedProducts title="Hot Deals" featured />
        </Suspense>

        <Suspense fallback={<ProductsSkeleton />}>
          <FeaturedProducts title="Latest Laptops" categorySlug="laptops" />
        </Suspense>

        <Suspense fallback={<ProductsSkeleton />}>
          <FeaturedProducts title="Top Smartphones" categorySlug="smartphones" />
        </Suspense>

        <Suspense fallback={<ProductsSkeleton />}>
          <FeaturedProducts title="Audio & Sound" categorySlug="audio" />
        </Suspense>

        <Suspense fallback={<ProductsSkeleton />}>
          <FeaturedProducts title="Must-Have Accessories" categorySlug="accessories" />
        </Suspense>
      </div>

      <BrandsBanner />
    </>
  );
}
