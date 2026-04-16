import type { Metadata } from "next";
import Link from "next/link";
import { Truck, Clock, MapPin, Package } from "lucide-react";

export const metadata: Metadata = {
  title: "Delivery & Shipping — Henki Electronics Kenya",
  description:
    "Henki Electronics Kenya delivery information. Same-day Nairobi delivery. Nationwide shipping 1–3 days. M-Pesa and card accepted.",
  alternates: { canonical: "https://henkielectronics.co.ke/shipping" },
};

export default function ShippingPage() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 py-8">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-[#fed700]">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800 font-medium">Delivery & Shipping</span>
      </nav>

      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-6 bg-[#fed700] rounded-sm" />
        <h1 className="text-xl font-black uppercase text-[#1e2022]">Delivery & Shipping</h1>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {[
          {
            icon: <Clock size={24} className="text-[#fed700]" />,
            title: "Same-Day Nairobi Delivery",
            desc: "Order before 12 noon Mon–Fri and receive your item the same day anywhere in Nairobi. After 12 noon = next business day.",
            detail: "KSh 200–350",
          },
          {
            icon: <Truck size={24} className="text-[#fed700]" />,
            title: "Nationwide Delivery",
            desc: "We deliver to all major towns in Kenya: Mombasa, Kisumu, Nakuru, Eldoret, Thika, and more via trusted couriers.",
            detail: "KSh 400–700 | 1–3 business days",
          },
          {
            icon: <MapPin size={24} className="text-[#fed700]" />,
            title: "Free Delivery in Nairobi",
            desc: "Orders over KSh 10,000 qualify for free delivery within Nairobi. No promo code needed — discount applies automatically.",
            detail: "FREE on orders over KSh 10,000",
          },
          {
            icon: <Package size={24} className="text-[#fed700]" />,
            title: "Secure Packaging",
            desc: "All items are carefully packed to prevent damage in transit. Fragile items receive extra bubble wrap and foam protection.",
            detail: "Included at no extra cost",
          },
        ].map((item) => (
          <div key={item.title} className="border border-[#eeeeee] bg-white p-5">
            <div className="flex items-center gap-3 mb-3">
              {item.icon}
              <h2 className="font-bold text-[#1e2022] text-sm uppercase">{item.title}</h2>
            </div>
            <p className="text-sm text-[#8c98a4] leading-relaxed mb-2">{item.desc}</p>
            <div className="text-sm font-bold text-[#333e48]">{item.detail}</div>
          </div>
        ))}
      </div>

      {/* Delivery zones table */}
      <div className="border border-[#eeeeee] bg-white mb-6 overflow-hidden">
        <div className="bg-[#f5f5f5] px-4 py-2.5 border-b border-[#eeeeee]">
          <h2 className="font-bold text-sm uppercase text-[#1e2022] tracking-wide">Delivery Fees by Zone</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#eeeeee]">
                <th className="text-left px-4 py-2.5 font-semibold text-[#333e48]">Zone</th>
                <th className="text-left px-4 py-2.5 font-semibold text-[#333e48]">Areas</th>
                <th className="text-left px-4 py-2.5 font-semibold text-[#333e48]">Fee</th>
                <th className="text-left px-4 py-2.5 font-semibold text-[#333e48]">Time</th>
              </tr>
            </thead>
            <tbody>
              {[
                { zone: "Nairobi CBD", areas: "CBD, Westlands, Upperhill", fee: "KSh 200", time: "Same day" },
                { zone: "Nairobi Suburbs", areas: "Karen, Runda, Gigiri, Kileleshwa", fee: "KSh 300", time: "Same day" },
                { zone: "Nairobi Outskirts", areas: "Thika, Kiambu, Athi River", fee: "KSh 350", time: "Next day" },
                { zone: "Coast", areas: "Mombasa, Malindi, Diani", fee: "KSh 600", time: "1–2 days" },
                { zone: "Western Kenya", areas: "Kisumu, Eldoret, Nakuru", fee: "KSh 500", time: "1–2 days" },
                { zone: "Other Areas", areas: "Rest of Kenya", fee: "KSh 700", time: "2–3 days" },
              ].map((row) => (
                <tr key={row.zone} className="border-b border-[#f5f5f5] hover:bg-[#f9f9f9]">
                  <td className="px-4 py-2.5 font-medium text-[#333e48]">{row.zone}</td>
                  <td className="px-4 py-2.5 text-[#8c98a4]">{row.areas}</td>
                  <td className="px-4 py-2.5 font-bold text-[#0062bd]">{row.fee}</td>
                  <td className="px-4 py-2.5 text-[#8c98a4]">{row.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-[#fffbf0] border border-[#fed700]/30 p-4 text-sm text-[#333e48]">
        <strong>Note:</strong> Delivery times are estimates and exclude public holidays.
        For urgent orders, please contact us via{" "}
        <Link href="/contact" className="text-[#0062bd] font-bold hover:text-[#fed700]">WhatsApp</Link>.
      </div>
    </div>
  );
}
