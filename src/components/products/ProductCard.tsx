"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Heart, BarChart2, MessageCircle } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { formatPrice, formatDiscount } from "@/lib/formatters";
import { trackAddToCart } from "@/lib/gtm";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
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
  const waUrl = buildWhatsAppUrl(product);

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
    toast.success("Added to cart!");
    openCart();
  }

  return (
    <div className="group bg-white flex flex-col w-full h-full transition-shadow duration-200 hover:shadow-[0_2px_16px_rgba(0,0,0,0.13)] hover:z-10 relative">

      {/* ── Image (square aspect ratio — same for every card) ── */}
      <Link href={`/products/${product.slug}`} className="block relative">
        {/* Badges */}
        <div className="absolute top-0 left-0 z-10 flex flex-col">
          {discount && (
            <span className="text-white font-bold text-[10px] px-1.5 py-0.5"
              style={{ background: "#df3737" }}>
              -{discount}%
            </span>
          )}
          {product.featured && !discount && product.stock > 0 && (
            <span className="text-white font-bold text-[10px] px-1.5 py-0.5"
              style={{ background: "#00c9a7" }}>
              NEW
            </span>
          )}
          {product.stock === 0 && (
            <span className="text-white font-bold text-[10px] px-1.5 py-0.5"
              style={{ background: "#8c98a4" }}>
              SOLD OUT
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          className="absolute top-2 right-2 z-10 w-7 h-7 rounded-full bg-white shadow flex items-center justify-center text-[#8c98a4] hover:text-[#df3737] opacity-0 group-hover:opacity-100 transition-all duration-200 border border-[#eeeeee]"
          title="Wishlist"
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
        >
          <Heart size={11} />
        </button>

        {/* Square image */}
        <div className="relative w-full aspect-square bg-white overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 17vw"
            className="object-contain p-3 transition-transform duration-300 group-hover:scale-[1.05]"
          />
        </div>
      </Link>

      {/* ── Body ── */}
      <div className="px-2.5 pt-2 pb-2.5 flex flex-col flex-1">
        {/* Category */}
        <Link
          href={`/products?category=${product.category.name.toLowerCase()}`}
          className="text-[10px] text-[#8c98a4] hover:text-[#0062bd] transition-colors mb-1 block"
          onClick={(e) => e.stopPropagation()}
        >
          {product.category.name}
        </Link>

        {/* Title — always exactly 2 lines tall */}
        <h3 className="mb-2" style={{ height: "2.6rem", overflow: "hidden" }}>
          <Link
            href={`/products/${product.slug}`}
            className="text-[#0062bd] font-semibold hover:text-[#fed700] transition-colors line-clamp-2 leading-[1.3]"
            style={{ fontSize: "12px" }}
          >
            {product.name}
          </Link>
        </h3>

        {/* Price + actions — pinned at bottom */}
        <div className="flex items-center justify-between gap-1 mt-auto">
          <div>
            <div className="font-black text-[#333e48]" style={{ fontSize: "13px" }}>
              {formatPrice(product.price)}
            </div>
            {product.comparePrice ? (
              <div className="text-[10px] text-[#8c98a4] line-through leading-none mt-0.5">
                {formatPrice(product.comparePrice)}
              </div>
            ) : (
              /* Spacer so cards without comparePrice keep same height */
              <div className="h-[14px]" />
            )}
          </div>

          {product.stock > 0 ? (
            <div className="flex items-center gap-1">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Buy via WhatsApp"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center justify-center rounded-full bg-[#e8f9ef] hover:bg-[#25D366] text-[#25D366] hover:text-white transition-colors"
                style={{ width: "30px", height: "30px", flexShrink: 0 }}
              >
                <MessageCircle size={13} />
              </a>
              <button
                onClick={handleAddToCart}
                title="Add to Cart"
                className="flex items-center justify-center rounded-full bg-[#eeeeee] hover:bg-[#fed700] text-[#333e48] transition-colors"
                style={{ width: "30px", height: "30px", flexShrink: 0 }}
              >
                <ShoppingCart size={13} />
              </button>
            </div>
          ) : (
            <span className="text-[10px] text-[#8c98a4] italic">Out of stock</span>
          )}
        </div>
      </div>

      {/* ── Hover footer ── */}
      <div className="border-t border-[#eeeeee] flex items-center justify-between px-2.5 overflow-hidden max-h-0 group-hover:max-h-[34px] opacity-0 group-hover:opacity-100 transition-all duration-200">
        <button
          className="flex items-center gap-1 text-[#8c98a4] hover:text-[#333e48] transition-colors py-2"
          style={{ fontSize: "11px" }}
          onClick={(e) => e.preventDefault()}
        >
          <BarChart2 size={11} /> Compare
        </button>
        <div className="w-px h-3 bg-[#eeeeee]" />
        <button
          className="flex items-center gap-1 text-[#8c98a4] hover:text-[#df3737] transition-colors py-2"
          style={{ fontSize: "11px" }}
          onClick={(e) => e.preventDefault()}
        >
          <Heart size={11} /> Wishlist
        </button>
      </div>
    </div>
  );
}
