"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  ShoppingCart,
  Search,
  User,
  Phone,
  MapPin,
  ChevronDown,
  Menu,
  X,
  Heart,
  Truck,
  LayoutGrid,
} from "lucide-react";
import { useCartStore } from "@/store/cart";
import CartDrawer from "@/components/cart/CartDrawer";

const categories = [
  { name: "Laptops", slug: "laptops", sub: ["Gaming", "Business", "2-in-1", "Ultrabooks"] },
  { name: "Smartphones", slug: "smartphones", sub: ["Android", "iPhone", "Mid-Range", "Tablets"] },
  { name: "Audio", slug: "audio", sub: ["Headphones", "Earbuds", "Speakers", "Soundbars"] },
  { name: "Accessories", slug: "accessories", sub: ["Powerbanks", "Cables", "Storage", "Cases"] },
  { name: "TVs & Monitors", slug: "tvs", sub: ["Smart TVs", "4K TVs", "Gaming Monitors", "IPS Displays"] },
];

const allDeptCategories = [
  "Computers & Laptops",
  "Smartphones & Tablets",
  "Audio & Headphones",
  "TVs & Home Cinema",
  "Cameras & Photography",
  "Gaming & Consoles",
  "Smart Home & IoT",
  "Accessories & Cables",
];

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [deptOpen, setDeptOpen] = useState(false);
  const { itemCount, toggleCart } = useCartStore();
  const count = itemCount();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (!target.closest("#dept-menu")) setDeptOpen(false);
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <>
      {/* ── TIER 1: Top bar ──────────────────────────────────────── */}
      <div className="bg-white border-b border-[#e8e8e8] hidden xl:block">
        <div className="max-w-[1200px] mx-auto px-4 h-9 flex items-center justify-between">
          <span className="text-[13px] text-[#8c98a4]">
            Welcome to Henki Electronics — Kenya&apos;s Premium Store
          </span>
          <div className="flex items-center gap-0">
            <Link
              href="/contact"
              className="flex items-center gap-1 text-[13px] text-[#8c98a4] hover:text-[#fed700] px-3 border-r border-[#e8e8e8] h-9 transition-colors"
            >
              <MapPin size={13} />
              Store Locator
            </Link>
            <Link
              href="/account/orders"
              className="flex items-center gap-1 text-[13px] text-[#8c98a4] hover:text-[#fed700] px-3 border-r border-[#e8e8e8] h-9 transition-colors"
            >
              <Truck size={13} />
              Track Your Order
            </Link>
            <Link
              href="/account"
              className="flex items-center gap-1 text-[13px] text-[#8c98a4] hover:text-[#fed700] px-3 h-9 transition-colors"
            >
              <User size={13} />
              Register or Sign in
            </Link>
          </div>
        </div>
      </div>

      {/* ── TIER 2: Main header ──────────────────────────────────── */}
      <div className="bg-white border-b border-[#e8e8e8]">
        <div className="max-w-[1200px] mx-auto px-4 py-3 xl:py-4">
          <div className="flex items-center gap-4 xl:gap-6">

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="xl:hidden text-[#333e48] p-1"
              aria-label="Menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Logo */}
            <Link href="/" className="flex-shrink-0 flex items-center gap-2">
              <div className="w-8 h-8 bg-[#fed700] rounded flex items-center justify-center font-black text-[#333e48] text-sm">
                H
              </div>
              <div className="leading-none">
                <span className="font-black text-[22px] text-[#333e48] tracking-tight">
                  HENKI
                </span>
                <span className="font-black text-[22px] text-[#fed700]">.</span>
                <div className="text-[9px] text-[#8c98a4] tracking-[0.15em] uppercase font-semibold -mt-0.5">
                  Electronics
                </div>
              </div>
            </Link>

            {/* Search bar */}
            <form
              action="/products"
              className="flex-1 hidden md:flex items-stretch max-w-2xl"
            >
              <select
                name="category"
                className="h-[42px] px-3 bg-[#f5f5f5] border border-[#e6e6e6] border-r-0 text-[#333e48] text-[13px] rounded-l outline-none cursor-pointer min-w-[130px] appearance-none"
                defaultValue=""
              >
                <option value="">All Categories</option>
                {categories.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
              <input
                type="text"
                name="q"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, brands and more..."
                className="flex-1 h-[42px] px-4 border border-[#e6e6e6] text-[#333e48] text-sm outline-none placeholder:text-[#8c98a4]"
              />
              <button
                type="submit"
                className="h-[42px] px-5 bg-[#fed700] hover:bg-[#d8b700] border border-[#fed700] rounded-r transition-colors flex items-center justify-center"
              >
                <Search size={18} className="text-[#333e48]" />
              </button>
            </form>

            {/* Actions */}
            <div className="flex items-center gap-1 ml-auto xl:ml-0">
              {/* Phone */}
              <div className="hidden xl:flex items-center gap-2 pr-4 mr-2 border-r border-[#e8e8e8]">
                <div className="w-9 h-9 rounded-full bg-[#f5f5f5] flex items-center justify-center">
                  <Phone size={16} className="text-[#fed700]" />
                </div>
                <div className="leading-none">
                  <div className="text-[11px] text-[#8c98a4]">Call Us Now</div>
                  <div className="text-[13px] font-bold text-[#333e48]">0700 000 000</div>
                </div>
              </div>

              {/* Wishlist */}
              <Link
                href="/account/saved"
                className="hidden md:flex flex-col items-center justify-center gap-0.5 w-11 h-11 text-[#333e48] hover:text-[#fed700] transition-colors rounded"
              >
                <Heart size={20} />
                <span className="text-[10px] font-semibold">Wishlist</span>
              </Link>

              {/* Account */}
              <Link
                href="/account"
                className="hidden md:flex flex-col items-center justify-center gap-0.5 w-11 h-11 text-[#333e48] hover:text-[#fed700] transition-colors rounded"
              >
                <User size={20} />
                <span className="text-[10px] font-semibold">Account</span>
              </Link>

              {/* Cart */}
              <button
                onClick={toggleCart}
                className="relative flex items-center gap-2 px-3 py-2 bg-[#fed700] hover:bg-[#d8b700] rounded transition-colors"
                aria-label="Shopping cart"
              >
                <div className="relative">
                  <ShoppingCart size={22} className="text-[#333e48]" />
                  {count > 0 && (
                    <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#333e48] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {count > 9 ? "9+" : count}
                    </span>
                  )}
                </div>
                <div className="hidden md:block leading-none text-left">
                  <div className="text-[10px] text-[#333e48]/70">My Cart</div>
                  <div className="text-[13px] font-bold text-[#333e48]">
                    {count} item{count !== 1 ? "s" : ""}
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Mobile search */}
          <form action="/products" className="md:hidden flex mt-3">
            <input
              type="text"
              name="q"
              placeholder="Search products..."
              className="flex-1 h-10 px-3 border border-[#e6e6e6] text-[#333e48] text-sm outline-none rounded-l"
            />
            <button
              type="submit"
              className="h-10 px-4 bg-[#fed700] rounded-r"
            >
              <Search size={16} className="text-[#333e48]" />
            </button>
          </form>
        </div>
      </div>

      {/* ── TIER 3: Category nav ─────────────────────────────────── */}
      <nav className="bg-[#333e48] sticky top-0 z-50 hidden xl:block">
        <div className="max-w-[1200px] mx-auto px-4">
          <ul className="flex items-center">

            {/* All Departments dropdown */}
            <li id="dept-menu" className="relative flex-shrink-0">
              <button
                onClick={(e) => { e.stopPropagation(); setDeptOpen(!deptOpen); }}
                className="flex items-center gap-2 px-4 py-3 bg-[#fed700] text-[#333e48] text-sm font-bold hover:bg-[#d8b700] transition-colors h-[46px] min-w-[180px]"
              >
                <LayoutGrid size={16} />
                All Departments
                <ChevronDown size={14} className={`ml-auto transition-transform ${deptOpen ? "rotate-180" : ""}`} />
              </button>
              {deptOpen && (
                <div className="absolute top-full left-0 w-56 bg-white border border-[#eeeeee] shadow-lg z-50">
                  {allDeptCategories.map((cat) => (
                    <Link
                      key={cat}
                      href={`/products?q=${encodeURIComponent(cat)}`}
                      className="block px-4 py-2.5 text-sm text-[#333e48] hover:bg-[#f9f9f9] hover:text-[#fed700] border-b border-[#f5f5f5] transition-colors font-medium"
                      onClick={() => setDeptOpen(false)}
                    >
                      {cat}
                    </Link>
                  ))}
                </div>
              )}
            </li>

            {/* Category links */}
            {categories.map((cat) => (
              <li key={cat.slug} className="group relative">
                <Link
                  href={`/products?category=${cat.slug}`}
                  className="flex items-center gap-1 px-4 py-3 text-[13px] text-gray-200 hover:text-[#fed700] transition-colors font-semibold h-[46px] whitespace-nowrap"
                >
                  {cat.name}
                  <ChevronDown size={12} />
                </Link>
                <div className="absolute top-full left-0 w-52 bg-white border border-[#eeeeee] shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
                  {cat.sub.map((sub) => (
                    <Link
                      key={sub}
                      href={`/products?category=${cat.slug}&sub=${sub.toLowerCase()}`}
                      className="block px-4 py-2.5 text-sm text-[#333e48] hover:bg-[#f9f9f9] hover:text-[#fed700] border-b border-[#f5f5f5] transition-colors"
                    >
                      {sub}
                    </Link>
                  ))}
                  <Link
                    href={`/products?category=${cat.slug}`}
                    className="block px-4 py-2.5 text-sm text-[#fed700] font-bold hover:bg-[#f9f9f9] transition-colors"
                  >
                    View All {cat.name} →
                  </Link>
                </div>
              </li>
            ))}

            {/* Special links */}
            <li className="ml-auto">
              <Link
                href="/products?featured=true"
                className="flex items-center gap-1 px-4 py-3 text-[13px] text-[#fed700] font-bold hover:text-yellow-300 transition-colors h-[46px]"
              >
                🔥 Hot Deals
              </Link>
            </li>
            <li>
              <Link
                href="/products?sort=newest"
                className="flex items-center gap-1 px-4 py-3 text-[13px] text-gray-200 hover:text-[#fed700] font-semibold transition-colors h-[46px]"
              >
                New Arrivals
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="xl:hidden bg-white border-b border-[#e8e8e8] z-50 relative">
          <div className="px-4 py-3 space-y-0.5">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/products?category=${cat.slug}`}
                className="flex items-center py-2.5 px-3 text-sm text-[#333e48] hover:text-[#fed700] hover:bg-[#f9f9f9] rounded transition-colors font-semibold"
                onClick={() => setMobileOpen(false)}
              >
                {cat.name}
              </Link>
            ))}
            <div className="border-t border-[#e8e8e8] pt-2 mt-2 space-y-0.5">
              <Link
                href="/account"
                className="flex items-center py-2.5 px-3 text-sm text-[#333e48] hover:text-[#fed700] rounded"
                onClick={() => setMobileOpen(false)}
              >
                My Account
              </Link>
              <Link
                href="/account/saved"
                className="flex items-center py-2.5 px-3 text-sm text-[#333e48] hover:text-[#fed700] rounded"
                onClick={() => setMobileOpen(false)}
              >
                Wishlist
              </Link>
            </div>
          </div>
        </div>
      )}

      <CartDrawer />
    </>
  );
}
