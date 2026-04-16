"use client";

import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { MessageCircle } from "lucide-react";

interface WhatsAppButtonProps {
  product: {
    name: string;
    price: number;
    slug: string;
  };
  variant?: "sticky" | "inline";
}

export default function WhatsAppButton({
  product,
  variant = "inline",
}: WhatsAppButtonProps) {
  const url = buildWhatsAppUrl(product);

  if (variant === "sticky") {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-[#25D366] text-white px-4 py-3 rounded-full shadow-2xl hover:bg-[#1ebe5d] transition-all hover:scale-105 font-semibold text-sm"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={22} fill="white" />
        <span className="hidden sm:block">Buy via WhatsApp</span>
      </a>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold text-base transition-colors"
    >
      <MessageCircle size={20} fill="white" />
      Buy via WhatsApp
    </a>
  );
}
