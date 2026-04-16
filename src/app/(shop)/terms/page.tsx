import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms & Conditions — Henki Electronics Kenya",
  description: "Terms and conditions for shopping at Henki Electronics Kenya. Read our policies on orders, payments, delivery, and warranties.",
  alternates: { canonical: "https://henkielectronics.co.ke/terms" },
};

export default function TermsPage() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 py-8">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-[#fed700]">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800 font-medium">Terms & Conditions</span>
      </nav>

      <div className="flex items-center gap-3 mb-2">
        <div className="w-1 h-6 bg-[#fed700] rounded-sm" />
        <h1 className="text-xl font-black uppercase text-[#1e2022]">Terms & Conditions</h1>
      </div>
      <p className="text-sm text-[#8c98a4] mb-8">Last updated: April 2025</p>

      <div className="max-w-3xl space-y-6 text-sm text-[#333e48] leading-relaxed">
        {[
          {
            title: "1. Acceptance of Terms",
            body: "By placing an order or using our website, you agree to these terms and conditions. Henki Electronics reserves the right to update these terms at any time.",
          },
          {
            title: "2. Products & Pricing",
            body: "All prices are in Kenyan Shillings (KSh) and include VAT at 16%. Prices may change without notice. We reserve the right to cancel orders where a pricing error has occurred. Product images are for illustration — actual products may vary slightly.",
          },
          {
            title: "3. Orders & Payment",
            body: "An order is confirmed only after successful payment. We accept M-Pesa, Visa, Mastercard, and bank transfers. For WhatsApp orders, payment must be received before dispatch. All payments are processed securely.",
          },
          {
            title: "4. Delivery",
            body: "Delivery times are estimates and not guaranteed. Henki Electronics is not liable for delays caused by couriers, weather, or events beyond our control. Risk of loss passes to you upon delivery.",
          },
          {
            title: "5. Warranty",
            body: "Products are covered by the manufacturer's warranty as stated on the product page. Warranty is void if the product is tampered with, physically damaged, or used contrary to the manufacturer's guidelines.",
          },
          {
            title: "6. Returns",
            body: "See our full Returns & Refunds policy at henkielectronics.co.ke/returns. Returns are accepted within 7 days subject to conditions.",
          },
          {
            title: "7. Limitation of Liability",
            body: "Henki Electronics is not liable for any indirect, incidental, or consequential damages arising from the use of our products or website. Our maximum liability is limited to the purchase price of the product.",
          },
          {
            title: "8. Governing Law",
            body: "These terms are governed by the laws of Kenya. Any disputes shall be resolved under Kenyan jurisdiction.",
          },
          {
            title: "9. Contact",
            body: "For questions about these terms, contact legal@henkielectronics.co.ke.",
          },
        ].map((section) => (
          <div key={section.title}>
            <h2 className="font-bold text-[#1e2022] text-sm uppercase tracking-wide mb-2 border-b border-[#eeeeee] pb-1">
              {section.title}
            </h2>
            <p className="text-[#8c98a4]">{section.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
