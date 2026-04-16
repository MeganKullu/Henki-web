"use client";

import { useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Filter, X, ChevronDown, ChevronUp } from "lucide-react";

interface FiltersProps {
  categories: Array<{ id: string; name: string; slug: string }>;
}

const brands = [
  "Apple",
  "Samsung",
  "ASUS",
  "Dell",
  "Lenovo",
  "HP",
  "MSI",
  "Sony",
  "JBL",
  "Bose",
  "Anker",
  "Baseus",
  "Google",
  "SanDisk",
  "Ugreen",
  "Romoss",
];

export default function ProductFilters({ categories }: FiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [openSections, setOpenSections] = useState<Set<string>>(
    new Set(["category", "price", "brand"])
  );
  const [priceMin, setPriceMin] = useState(
    searchParams.get("minPrice") || ""
  );
  const [priceMax, setPriceMax] = useState(
    searchParams.get("maxPrice") || ""
  );

  const activeCategory = searchParams.get("category") || "";
  const activeBrands = searchParams.getAll("brand");

  const updateFilter = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("page");
      if (value === null || value === "") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
      router.push(`/products?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  function toggleBrand(brand: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("page");
    const current = params.getAll("brand");
    params.delete("brand");
    if (current.includes(brand)) {
      current.filter((b) => b !== brand).forEach((b) => params.append("brand", b));
    } else {
      [...current, brand].forEach((b) => params.append("brand", b));
    }
    router.push(`/products?${params.toString()}`, { scroll: false });
  }

  function applyPriceRange() {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("page");
    if (priceMin) params.set("minPrice", priceMin);
    else params.delete("minPrice");
    if (priceMax) params.set("maxPrice", priceMax);
    else params.delete("maxPrice");
    router.push(`/products?${params.toString()}`, { scroll: false });
  }

  function clearAll() {
    router.push("/products");
    setPriceMin("");
    setPriceMax("");
  }

  function toggleSection(key: string) {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  const hasFilters =
    activeCategory ||
    activeBrands.length > 0 ||
    searchParams.get("minPrice") ||
    searchParams.get("maxPrice");

  return (
    <aside className="w-full">
      <div className="bg-white border border-[#eeeeee] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#f5f5f5] border-b border-[#eeeeee]">
          <div className="flex items-center gap-2 text-[#1e2022] font-black uppercase text-[12px] tracking-wide">
            <Filter size={13} />
            Filter By
          </div>
          {hasFilters && (
            <button
              onClick={clearAll}
              className="text-xs text-[#fed700] hover:text-yellow-300 flex items-center gap-1"
            >
              <X size={12} />
              Clear
            </button>
          )}
        </div>

        {/* Category */}
        <div className="border-b border-gray-100">
          <button
            onClick={() => toggleSection("category")}
            className="flex items-center justify-between w-full px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
          >
            Category
            {openSections.has("category") ? (
              <ChevronUp size={16} />
            ) : (
              <ChevronDown size={16} />
            )}
          </button>
          {openSections.has("category") && (
            <div className="px-4 pb-3 space-y-1">
              <button
                onClick={() => updateFilter("category", null)}
                className={`w-full text-left text-sm py-1.5 px-2 transition-colors ${!activeCategory ? "text-[#0062bd] font-bold bg-blue-50" : "text-[#333e48] hover:text-[#0062bd] hover:bg-[#f5f5f5]"}`}
              >
                All Categories
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => updateFilter("category", cat.slug)}
                  className={`w-full text-left text-sm py-1.5 px-2 rounded-lg transition-colors ${activeCategory === cat.slug ? "text-[#0062bd] font-bold bg-blue-50" : "text-[#333e48] hover:text-[#0062bd] hover:bg-[#f5f5f5]"}`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Price range */}
        <div className="border-b border-gray-100">
          <button
            onClick={() => toggleSection("price")}
            className="flex items-center justify-between w-full px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
          >
            Price (KSh)
            {openSections.has("price") ? (
              <ChevronUp size={16} />
            ) : (
              <ChevronDown size={16} />
            )}
          </button>
          {openSections.has("price") && (
            <div className="px-4 pb-3">
              <div className="flex gap-2 mb-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={priceMin}
                  onChange={(e) => setPriceMin(e.target.value)}
                  className="w-1/2 border border-gray-200 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-[#fed700]"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={priceMax}
                  onChange={(e) => setPriceMax(e.target.value)}
                  className="w-1/2 border border-gray-200 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-[#fed700]"
                />
              </div>
              <button
                onClick={applyPriceRange}
                className="w-full py-1.5 bg-[#fed700] text-[#333e48] text-sm font-semibold rounded-lg hover:bg-[#d8b700] transition-colors"
              >
                Apply
              </button>
              {/* Presets */}
              <div className="mt-2 space-y-1">
                {[
                  { label: "Under KSh 10,000", min: "", max: "10000" },
                  { label: "KSh 10k – 50k", min: "10000", max: "50000" },
                  { label: "KSh 50k – 150k", min: "50000", max: "150000" },
                  { label: "Over KSh 150k", min: "150000", max: "" },
                ].map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() => {
                      setPriceMin(preset.min);
                      setPriceMax(preset.max);
                      const params = new URLSearchParams(
                        searchParams.toString()
                      );
                      params.delete("page");
                      if (preset.min) params.set("minPrice", preset.min);
                      else params.delete("minPrice");
                      if (preset.max) params.set("maxPrice", preset.max);
                      else params.delete("maxPrice");
                      router.push(`/products?${params.toString()}`, {
                        scroll: false,
                      });
                    }}
                    className="w-full text-left text-xs py-1.5 px-2 text-gray-500 hover:text-[#d8b700] hover:bg-[#fff8ec] rounded-lg transition-colors"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Brand */}
        <div>
          <button
            onClick={() => toggleSection("brand")}
            className="flex items-center justify-between w-full px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
          >
            Brand
            {openSections.has("brand") ? (
              <ChevronUp size={16} />
            ) : (
              <ChevronDown size={16} />
            )}
          </button>
          {openSections.has("brand") && (
            <div className="px-4 pb-3 space-y-1.5 max-h-60 overflow-y-auto">
              {brands.map((brand) => (
                <label
                  key={brand}
                  className="flex items-center gap-2 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={activeBrands.includes(brand)}
                    onChange={() => toggleBrand(brand)}
                    className="w-3.5 h-3.5 accent-[#fed700]"
                  />
                  <span className="text-sm text-gray-600 group-hover:text-gray-800">
                    {brand}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
