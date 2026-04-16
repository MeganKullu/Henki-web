import type { Metadata } from "next";
import Link from "next/link";
import { RefreshCw, CheckCircle, XCircle, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Returns & Refunds — Henki Electronics Kenya",
  description:
    "Henki Electronics 7-day return policy in Kenya. Easy returns, fast refunds via M-Pesa. Genuine products with manufacturer warranty.",
  alternates: { canonical: "https://henkielectronics.co.ke/returns" },
};

export default function ReturnsPage() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 py-8">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-[#fed700]">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800 font-medium">Returns & Refunds</span>
      </nav>

      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-6 bg-[#fed700] rounded-sm" />
        <h1 className="text-xl font-black uppercase text-[#1e2022]">Returns & Refunds</h1>
      </div>

      {/* Key policy banner */}
      <div className="bg-[#333e48] text-white p-5 mb-6 flex items-center gap-4">
        <RefreshCw size={32} className="text-[#fed700] flex-shrink-0" />
        <div>
          <div className="font-black text-lg">7-Day Returns Policy</div>
          <div className="text-gray-300 text-sm">
            Not happy? Return any item within 7 days of delivery for a full refund or exchange.
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Eligible */}
        <div className="border border-[#eeeeee] bg-white p-5">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle size={18} className="text-green-500" />
            <h2 className="font-bold text-sm uppercase text-[#1e2022]">Items Eligible for Return</h2>
          </div>
          <ul className="space-y-2 text-sm text-[#8c98a4]">
            {[
              "Product in original condition and packaging",
              "All accessories, manuals, and gifts included",
              "Product not used or damaged by customer",
              "Return requested within 7 days of delivery",
              "Wrong item delivered by Henki Electronics",
              "Item arrived damaged or defective",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Not eligible */}
        <div className="border border-[#eeeeee] bg-white p-5">
          <div className="flex items-center gap-2 mb-3">
            <XCircle size={18} className="text-red-500" />
            <h2 className="font-bold text-sm uppercase text-[#1e2022]">Items Not Eligible for Return</h2>
          </div>
          <ul className="space-y-2 text-sm text-[#8c98a4]">
            {[
              "Items returned after 7 days",
              "Products with broken seals or used accessories",
              "Software/digital downloads once activated",
              "Items damaged due to misuse or accidents",
              "Products with tampered or missing serial numbers",
              "Customized or special-order items",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-red-500 mt-0.5 flex-shrink-0">✗</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Process */}
      <div className="border border-[#eeeeee] bg-white p-5 mb-6">
        <h2 className="font-bold text-sm uppercase text-[#1e2022] mb-4">How to Return an Item</h2>
        <div className="grid sm:grid-cols-4 gap-4">
          {[
            { step: "1", title: "Contact Us", desc: "WhatsApp or call us within 7 days. Share your order number and reason for return." },
            { step: "2", title: "Pack the Item", desc: "Place item in original packaging with all accessories and your order receipt." },
            { step: "3", title: "Drop-off / Pickup", desc: "Drop off at our Westlands store or we arrange a pickup for KSh 200." },
            { step: "4", title: "Get Refund", desc: "M-Pesa refund processed within 24–48 hours. Bank transfers take 3–5 days." },
          ].map((step) => (
            <div key={step.step} className="text-center">
              <div className="w-10 h-10 bg-[#fed700] text-[#333e48] font-black text-lg rounded-full flex items-center justify-center mx-auto mb-2">
                {step.step}
              </div>
              <div className="font-bold text-sm text-[#1e2022] mb-1">{step.title}</div>
              <div className="text-xs text-[#8c98a4] leading-relaxed">{step.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#fff4f0] border border-red-100 p-4 text-sm flex items-start gap-3">
        <AlertCircle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
        <div>
          <strong className="text-[#333e48]">Warranty Claims:</strong>{" "}
          <span className="text-[#8c98a4]">
            For products within the manufacturer warranty period, contact the brand service centre directly.
            We will assist you in locating the nearest service centre in Kenya.{" "}
            <Link href="/contact" className="text-[#0062bd] font-bold hover:text-[#fed700]">Contact us for help.</Link>
          </span>
        </div>
      </div>
    </div>
  );
}
