"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";

export default function SortSelect({ current }: { current: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleSort(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", value);
    params.delete("page");
    router.push(`/products?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="flex items-center gap-1">
      <SlidersHorizontal size={14} className="text-gray-500" />
      <select
        value={current}
        onChange={(e) => handleSort(e.target.value)}
        className="text-sm border-none outline-none text-gray-700 bg-transparent cursor-pointer"
      >
        <option value="newest">Newest</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="name">Name A-Z</option>
      </select>
    </div>
  );
}
