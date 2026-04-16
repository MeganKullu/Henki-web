"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Heart, BarChart2, Star } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { formatPrice, formatDiscount } from "@/lib/formatters";
import { trackAddToCart } from "@/lib/gtm";
import toast from "react-hot-toast";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    comparePrice: number | null;
    brand: string;
    images: string[];
    stock: number;
    featured: boolean;
    category: { name: string };
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem, openCart } = useCartStore();
  const discount = product.comparePrice
    ? formatDiscount(product.comparePrice, product.price)
    : null;

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      slug: product.slug,
      brand: product.brand,
      stock: product.stock,
    });
    trackAddToCart({
      id: product.id,
      name: product.name,
      brand: product.brand,
      category: product.category.name,
      price: product.price,
      quantity: 1,
    });
    toast.success(`Added to cart!`);
    openCart();
  }

  return (
    <div
      className="group bg-white h-full flex flex-col transition-shadow duration-200 hover:shadow-[0_0_16px_rgba(0,0,0,0.15)] hover:z-10 relative"
    >
      {/* ── Image area ──────────────────────────── */}
      <Link href={`/products/${product.slug}`} className="block relative flex-shrink-0">
        {/* Badges */}
        <div className="absolute top-0 left-0 z-10 flex flex-col">
          {discount && (
            <span
              className="text-white font-bold text-[11px] px-1.5 py-0.5"
              style={{ background: "#df3737", letterSpacing: "0.02em" }}
            >
              -{discount}%
            </span>
          )}
          {product.featured && !discount && product.stock > 0 && (
            <span
              className="text-white font-bold text-[11px] px-1.5 py-0.5"
              style={{ background: "#00c9a7", letterSpacing: "0.02em" }}
            >
              NEW
            </span>
          )}
          {product.stock === 0 && (
            <span
              className="text-white font-bold text-[11px] px-1.5 py-0.5"
              style={{ background: "#8c98a4" }}
            >
              SOLD OUT
            </span>
          )}
        </div>

        {/* Wishlist icon — top right, visible on hover */}
        <button
          className="
            absolute top-2 right-2 z-10
            w-8 h-8 rounded-full bg-white shadow-md
            flex items-center justify-center
            text-[#8c98a4] hover:text-[#df3737]
            opacity-0 group-hover:opacity-100
            transition-all duration-200
            border border-[#eeeeee]
          "
          title="Add to Wishlist"
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
        >
          <Heart size={13} />
        </button>

        {/* Product image */}
        <div
          className="relative overflow-hidden bg-white flex items-center justify-center"
          style={{ height: "200px" }}
        >
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, 25vw"
            className="object-contain p-4 transition-transform duration-300 group-hover:scale-[1.06]"
          />
        </div>
      </Link>

      {/* ── Card body ───────────────────────────── */}
      <div className="px-3 pt-2 pb-2 flex-1 flex flex-col">
        {/* Category */}
        <div className="mb-1">
          <Link
            href={`/products?category=${product.category.name.toLowerCase()}`}
            className="text-[11px] text-[#8c98a4] hover:text-[#0062bd] transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            {product.category.name}
          </Link>
        </div>

        {/* Title */}
        <h3 className="mb-2" style={{ minHeight: "2.4rem" }}>
          <Link
            href={`/products/${product.slug}`}
            className="
              text-[#0062bd] font-bold leading-tight
              hover:text-[#fed700]
              transition-colors duration-150
              line-clamp-2
            "
            style={{ fontSize: "13px", lineHeight: "1.3" }}
          >
            {product.name}
          </Link>
        </h3>

        {/* Stars */}
        <div className="flex items-center gap-0.5 mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={10}
              className={i < 4 ? "text-[#fed700] fill-[#fed700]" : "text-[#dddddd] fill-[#dddddd]"}
            />
          ))}
          <span className="text-[11px] text-[#8c98a4] ml-1">(24)</span>
        </div>

        {/* Price row */}
        <div className="flex items-center justify-between mt-auto">
          <div>
            <div
              className="font-bold text-[#333e48] leading-none"
              style={{ fontSize: product.comparePrice ? "15px" : "16px" }}
            >
              {formatPrice(product.price)}
            </div>
            {product.comparePrice && (
              <div className="text-[11px] text-[#8c98a4] line-through mt-0.5">
                {formatPrice(product.comparePrice)}
              </div>
            )}
          </div>

          {product.stock > 0 ? (
            <button
              onClick={handleAddToCart}
              title="Add to Cart"
              className="
                flex items-center justify-center rounded-full
                transition-colors duration-150
                bg-[#e6e6e6] hover:bg-[#fed700]
                text-[#333e48]
              "
              style={{ width: "35px", height: "35px", flexShrink: 0 }}
            >
              <ShoppingCart size={15} />
            </button>
          ) : (
            <span className="text-[11px] text-[#8c98a4] italic">Out of stock</span>
          )}
        </div>
      </div>

      {/* ── Footer — hidden by default, revealed on hover ── */}
      <div
        className="
          border-t border-[#eeeeee]
          flex items-center justify-between
          px-3
          overflow-hidden
          max-h-0 group-hover:max-h-[40px]
          opacity-0 group-hover:opacity-100
          transition-all duration-200
        "
      >
        <button
          className="flex items-center gap-1 text-[#8c98a4] hover:text-[#333e48] transition-colors py-2"
          style={{ fontSize: "12px" }}
          onClick={(e) => e.preventDefault()}
        >
          <BarChart2 size={13} />
          Compare
        </button>
        <div className="w-px h-3 bg-[#eeeeee]" />
        <button
          className="flex items-center gap-1 text-[#8c98a4] hover:text-[#df3737] transition-colors py-2"
          style={{ fontSize: "12px" }}
          onClick={(e) => e.preventDefault()}
        >
          <Heart size={13} />
          Add to Wishlist
        </button>
      </div>
    </div>
  );
}
