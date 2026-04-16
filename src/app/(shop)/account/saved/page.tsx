import Link from "next/link";
import { Heart, ArrowLeft, ShoppingBag } from "lucide-react";

export default function SavedItemsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/account" className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <ArrowLeft size={20} className="text-gray-600" />
        </Link>
        <h1 className="text-2xl font-black text-[#333e48]">Saved Items</h1>
      </div>
      <div className="text-center py-16">
        <Heart size={48} className="mx-auto text-gray-300 mb-3" />
        <h3 className="font-semibold text-gray-700 mb-1">No saved items</h3>
        <p className="text-sm text-gray-500 mb-4">
          Click the heart icon on any product to save it for later
        </p>
        <Link href="/products" className="btn-primary inline-flex items-center gap-2">
          <ShoppingBag size={18} />
          Start Shopping
        </Link>
      </div>
    </div>
  );
}
