import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — Henki Electronics Kenya",
  description: "Henki Electronics privacy policy. How we collect, use and protect your personal data in Kenya.",
  alternates: { canonical: "https://henkielectronics.co.ke/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 py-8">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-[#fed700]">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800 font-medium">Privacy Policy</span>
      </nav>

      <div className="flex items-center gap-3 mb-2">
        <div className="w-1 h-6 bg-[#fed700] rounded-sm" />
        <h1 className="text-xl font-black uppercase text-[#1e2022]">Privacy Policy</h1>
      </div>
      <p className="text-sm text-[#8c98a4] mb-8">Last updated: April 2025</p>

      <div className="max-w-3xl prose-like space-y-6 text-sm text-[#333e48] leading-relaxed">
        {[
          {
            title: "1. Information We Collect",
            body: "We collect personal information you provide directly: name, email address, phone number, delivery address, and payment information (M-Pesa transaction references, card details processed securely by our payment processor). We also automatically collect usage data such as pages visited, browser type, and IP address through cookies and analytics tools.",
          },
          {
            title: "2. How We Use Your Information",
            body: "We use your information to process and fulfil your orders; send order confirmations, updates, and delivery notifications via SMS/WhatsApp/email; improve our website and product offerings; send marketing communications (you may opt out at any time); prevent fraud and ensure secure transactions; and comply with Kenyan law.",
          },
          {
            title: "3. M-Pesa & Payment Security",
            body: "M-Pesa transactions are processed through Safaricom's secure API. We do not store your M-Pesa PIN or full card numbers. Payment data is encrypted using industry-standard TLS/SSL protocols. We are compliant with PCI DSS standards.",
          },
          {
            title: "4. Sharing Your Information",
            body: "We do not sell your personal data. We may share it with delivery partners (G4S, Wells Fargo) to fulfil your order; payment processors to complete transactions; Google Analytics to understand site usage (anonymised); and law enforcement if required by Kenyan law.",
          },
          {
            title: "5. Your Rights (Kenya DPA)",
            body: "Under the Kenya Data Protection Act 2019, you have the right to access, correct, or delete your personal data. To exercise these rights, email privacy@henkielectronics.co.ke or contact us via WhatsApp.",
          },
          {
            title: "6. Cookies",
            body: "We use essential cookies for site functionality (cart, session) and optional analytics cookies (Google Analytics). You can disable non-essential cookies in your browser settings.",
          },
          {
            title: "7. Data Retention",
            body: "We retain order data for 7 years as required by Kenyan tax law. Account data is kept until you request deletion. Marketing preferences are updated immediately upon unsubscribe.",
          },
          {
            title: "8. Contact",
            body: "For privacy concerns: email privacy@henkielectronics.co.ke or write to Henki Electronics, Westlands, Nairobi, Kenya.",
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
