"use client";

import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { trackAddToCart } from "@/lib/gtm";
import toast from "react-hot-toast";

interface AddToCartButtonProps {
  product: {
    id: string;
    name: string;
    price: number;
    images: string[];
    slug: string;
    brand: string;
    stock: number;
    category: { name: string };
  };
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem, openCart } = useCartStore();

  function handleAdd() {
    for (let i = 0; i < qty; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        slug: product.slug,
        brand: product.brand,
        stock: product.stock,
      });
    }
    trackAddToCart({
      id: product.id,
      name: product.name,
      brand: product.brand,
      category: product.category.name,
      price: product.price,
      quantity: qty,
    });
    setAdded(true);
    toast.success(`Added ${qty}x ${product.name} to cart!`);
    openCart();
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="space-y-3">
      {/* Quantity selector */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-gray-600">Quantity:</span>
        <div className="flex items-center border border-[#eeeeee] rounded overflow-hidden">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors text-lg font-medium"
          >
            −
          </button>
          <span className="w-12 text-center font-semibold text-gray-800">
            {qty}
          </span>
          <button
            onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
            className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors text-lg font-medium"
            disabled={qty >= product.stock}
          >
            +
          </button>
        </div>
        <span className="text-xs text-gray-400">
          {product.stock} in stock
        </span>
      </div>

      {/* Add to Cart */}
      <button
        onClick={handleAdd}
        disabled={product.stock === 0}
        className={`w-full flex items-center justify-center gap-2 py-3 rounded font-bold text-sm uppercase tracking-wide transition-all ${
          added
            ? "bg-green-500 text-white"
            : product.stock === 0
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-[#fed700] hover:bg-[#d8b700] text-[#333e48]"
        }`}
      >
        {added ? (
          <>
            <Check size={20} />
            Added to Cart!
          </>
        ) : (
          <>
            <ShoppingCart size={20} />
            {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
          </>
        )}
      </button>
    </div>
  );
}
