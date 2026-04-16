import type { Metadata } from "next";
import Link from "next/link";
import { Shield, Truck, Phone, MapPin, Award, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us — Henki Electronics Kenya",
  description:
    "Learn about Henki Electronics — Kenya's trusted electronics retailer in Nairobi. Genuine products, M-Pesa payments, and expert support since 2020.",
  alternates: { canonical: "https://henkielectronics.co.ke/about" },
};

export default function AboutPage() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-[#fed700]">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800 font-medium">About Us</span>
      </nav>

      {/* Hero */}
      <div className="bg-[#333e48] text-white rounded p-8 md:p-12 mb-8 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-6 bg-[#fed700] rounded-sm" />
            <span className="text-[#fed700] font-bold text-sm uppercase tracking-widest">Our Story</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black mb-4 leading-tight">
            Kenya&apos;s Trusted Electronics Destination
          </h1>
          <p className="text-gray-300 text-base leading-relaxed">
            Henki Electronics was founded with a simple mission: give Kenyans access to genuine,
            quality electronics at fair prices — with the convenience of M-Pesa payments and
            reliable delivery right to your door.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { number: "10,000+", label: "Happy Customers" },
          { number: "500+", label: "Products Available" },
          { number: "4.8★", label: "Average Rating" },
          { number: "Same Day", label: "Nairobi Delivery" },
        ].map((stat) => (
          <div key={stat.label} className="bg-[#f9f9f9] border border-[#eeeeee] p-4 text-center">
            <div className="text-2xl font-black text-[#fed700] mb-1">{stat.number}</div>
            <div className="text-sm text-[#8c98a4] font-medium">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Why choose us */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-6 bg-[#fed700] rounded-sm" />
          <h2 className="text-xl font-black uppercase text-[#1e2022]">Why Choose Henki Electronics</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              icon: <Shield size={28} className="text-[#fed700]" />,
              title: "100% Genuine Products",
              desc: "Every product we sell is sourced from authorized distributors and comes with a valid manufacturer warranty.",
            },
            {
              icon: <Truck size={28} className="text-[#fed700]" />,
              title: "Fast Kenya Delivery",
              desc: "Same-day delivery within Nairobi. Nationwide delivery in 1–3 business days via trusted couriers.",
            },
            {
              icon: <Phone size={28} className="text-[#fed700]" />,
              title: "M-Pesa & Card Payments",
              desc: "Pay conveniently via M-Pesa, Visa, or Mastercard. Secure checkout every time.",
            },
            {
              icon: <Award size={28} className="text-[#fed700]" />,
              title: "Expert Support",
              desc: "Our team of tech experts is available via WhatsApp, phone, and email to help you find the right product.",
            },
            {
              icon: <Users size={28} className="text-[#fed700]" />,
              title: "Community First",
              desc: "We sponsor local tech events and offer student discounts. Proud to be a Kenyan business giving back.",
            },
            {
              icon: <MapPin size={28} className="text-[#fed700]" />,
              title: "Walk-in Store in Nairobi",
              desc: "Visit our Westlands showroom to try products before buying. Open Mon–Sat, 8am–6pm.",
            },
          ].map((item) => (
            <div key={item.title} className="border border-[#eeeeee] bg-white p-5">
              <div className="mb-3">{item.icon}</div>
              <h3 className="font-bold text-[#1e2022] mb-2 text-sm uppercase">{item.title}</h3>
              <p className="text-sm text-[#8c98a4] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-[#fffbf0] border border-[#fed700]/30 p-6 text-center">
        <h2 className="text-xl font-black text-[#1e2022] mb-2">Ready to Shop?</h2>
        <p className="text-[#8c98a4] mb-4 text-sm">Browse our full range of electronics with Kenya&apos;s best prices.</p>
        <Link href="/products" className="btn-primary">Browse All Products</Link>
      </div>
    </div>
  );
}
