import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQ — Henki Electronics Kenya",
  description:
    "Frequently asked questions about shopping at Henki Electronics. Delivery, M-Pesa payments, warranty, returns and more.",
  alternates: { canonical: "https://henkielectronics.co.ke/faq" },
};

const FAQS = [
  {
    category: "Orders & Payment",
    items: [
      {
        q: "Do you accept M-Pesa?",
        a: "Yes! M-Pesa is our primary payment method. We also accept Visa, Mastercard, and bank transfers. Pay via M-Pesa Paybill or buy directly via WhatsApp.",
      },
      {
        q: "Can I buy via WhatsApp?",
        a: "Absolutely. Just click any 'Buy via WhatsApp' button on a product page or contact us on +254 728 200 018. We'll guide you through the order and send payment details.",
      },
      {
        q: "How do I track my order?",
        a: "After placing your order you will receive an SMS and email confirmation with a tracking number. You can also check your order status in My Account.",
      },
      {
        q: "Can I cancel or change my order?",
        a: "Orders can be cancelled or modified within 1 hour of placement. Contact us immediately via WhatsApp or call for fastest response.",
      },
    ],
  },
  {
    category: "Delivery & Shipping",
    items: [
      {
        q: "How fast is delivery in Nairobi?",
        a: "Same-day delivery is available for orders placed before 12 noon Monday to Friday. Next-day delivery is available for orders placed after noon.",
      },
      {
        q: "Do you deliver outside Nairobi?",
        a: "Yes, we deliver nationwide through trusted courier partners (G4S, Wells Fargo, Fargo Courier). Delivery to major towns takes 1–3 business days.",
      },
      {
        q: "What are the delivery fees?",
        a: "Nairobi delivery: KSh 200–350 depending on location. Free delivery on orders over KSh 10,000 within Nairobi. Upcountry delivery: KSh 400–700.",
      },
    ],
  },
  {
    category: "Products & Warranty",
    items: [
      {
        q: "Are your products genuine?",
        a: "100% yes. We source exclusively from authorized distributors and brand-official importers. All products come with genuine manufacturer warranty.",
      },
      {
        q: "How long is the warranty?",
        a: "Warranty varies by product — typically 1 year for most electronics. The warranty period is listed on each product page.",
      },
      {
        q: "What if a product arrives damaged?",
        a: "Document the damage immediately with photos and contact us within 24 hours. We will arrange a free replacement or full refund.",
      },
    ],
  },
  {
    category: "Returns & Refunds",
    items: [
      {
        q: "What is your return policy?",
        a: "We accept returns within 7 days of delivery if the product is in its original condition, unused, and in original packaging. Contact us to initiate a return.",
      },
      {
        q: "How long does a refund take?",
        a: "M-Pesa refunds are processed within 24–48 hours. Bank transfers take 3–5 business days.",
      },
    ],
  },
];

// JSON-LD FAQ Schema
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.flatMap((cat) =>
    cat.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    }))
  ),
};

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-[1400px] mx-auto px-4 py-8">
        <nav className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-[#fed700]">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800 font-medium">FAQ</span>
        </nav>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-6 bg-[#fed700] rounded-sm" />
          <h1 className="text-xl font-black uppercase text-[#1e2022]">Frequently Asked Questions</h1>
        </div>

        <div className="max-w-3xl space-y-8">
          {FAQS.map((cat) => (
            <div key={cat.category}>
              <h2 className="font-bold text-[#333e48] uppercase text-sm tracking-wider mb-3 pb-2 border-b border-[#eeeeee]">
                {cat.category}
              </h2>
              <div className="space-y-3">
                {cat.items.map((item) => (
                  <details
                    key={item.q}
                    className="group border border-[#eeeeee] bg-white"
                  >
                    <summary className="flex items-center justify-between px-4 py-3 cursor-pointer font-semibold text-sm text-[#1e2022] hover:bg-[#f9f9f9] transition-colors list-none">
                      {item.q}
                      <span className="text-[#fed700] text-lg font-light ml-3 flex-shrink-0 group-open:rotate-45 transition-transform">+</span>
                    </summary>
                    <div className="px-4 pb-4 text-sm text-[#8c98a4] leading-relaxed border-t border-[#eeeeee] pt-3">
                      {item.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-[#fffbf0] border border-[#fed700]/30 p-5 max-w-3xl">
          <p className="text-sm text-[#333e48]">
            Still have questions?{" "}
            <Link href="/contact" className="text-[#0062bd] font-bold hover:text-[#fed700] transition-colors">
              Contact our support team
            </Link>{" "}
            or chat with us on WhatsApp — we respond within minutes.
          </p>
        </div>
      </div>
    </>
  );
}
