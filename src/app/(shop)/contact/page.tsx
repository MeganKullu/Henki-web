import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us — Henki Electronics Kenya",
  description:
    "Contact Henki Electronics in Nairobi. Call, WhatsApp, or email us. Walk-in store in Westlands, Nairobi. Open Mon–Sat 8am–6pm.",
  alternates: { canonical: "https://henkielectronics.co.ke/contact" },
};

const WA_URL = "https://wa.me/254700000000?text=" + encodeURIComponent("Hi Henki Electronics, I need help with:");

export default function ContactPage() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 py-8">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-[#fed700]">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800 font-medium">Contact Us</span>
      </nav>

      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-6 bg-[#fed700] rounded-sm" />
        <h1 className="text-xl font-black uppercase text-[#1e2022]">Contact Us</h1>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Contact info */}
        <div className="space-y-4">
          <div className="bg-[#f9f9f9] border border-[#eeeeee] p-5">
            <h2 className="font-bold text-[#1e2022] mb-4 uppercase text-sm tracking-wide">Get in Touch</h2>
            <div className="space-y-3">
              {[
                {
                  icon: <Phone size={16} className="text-[#fed700]" />,
                  label: "Phone / WhatsApp",
                  value: "+254 700 000 000",
                  href: WA_URL,
                },
                {
                  icon: <Mail size={16} className="text-[#fed700]" />,
                  label: "Email",
                  value: "support@henkielectronics.co.ke",
                  href: "mailto:support@henkielectronics.co.ke",
                },
                {
                  icon: <MapPin size={16} className="text-[#fed700]" />,
                  label: "Store Address",
                  value: "Westlands, Nairobi, Kenya",
                  href: "https://maps.google.com/?q=Westlands,Nairobi",
                },
                {
                  icon: <Clock size={16} className="text-[#fed700]" />,
                  label: "Business Hours",
                  value: "Mon–Fri 8am–6pm | Sat 9am–4pm",
                  href: null,
                },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <div className="mt-0.5">{item.icon}</div>
                  <div>
                    <div className="text-[11px] text-[#8c98a4] uppercase font-semibold">{item.label}</div>
                    {item.href ? (
                      <a href={item.href} className="text-sm text-[#333e48] hover:text-[#fed700] font-medium transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <div className="text-sm text-[#333e48] font-medium">{item.value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full py-4 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold rounded transition-colors"
          >
            <MessageCircle size={20} fill="white" />
            Chat on WhatsApp — Fastest Response
          </a>
        </div>

        {/* Contact form */}
        <div className="bg-white border border-[#eeeeee] p-5">
          <h2 className="font-bold text-[#1e2022] mb-4 uppercase text-sm tracking-wide">Send a Message</h2>
          <form className="space-y-4" action="#" method="POST">
            <div>
              <label className="block text-xs font-semibold text-[#8c98a4] uppercase mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                required
                placeholder="John Kamau"
                className="w-full border border-[#e6e6e6] px-3 py-2.5 text-sm text-[#333e48] outline-none focus:border-[#fed700] transition-colors rounded"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#8c98a4] uppercase mb-1">Phone / WhatsApp</label>
              <input
                type="tel"
                name="phone"
                placeholder="0700 000 000"
                className="w-full border border-[#e6e6e6] px-3 py-2.5 text-sm text-[#333e48] outline-none focus:border-[#fed700] transition-colors rounded"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#8c98a4] uppercase mb-1">Email</label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                className="w-full border border-[#e6e6e6] px-3 py-2.5 text-sm text-[#333e48] outline-none focus:border-[#fed700] transition-colors rounded"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#8c98a4] uppercase mb-1">Message</label>
              <textarea
                name="message"
                rows={4}
                required
                placeholder="How can we help you?"
                className="w-full border border-[#e6e6e6] px-3 py-2.5 text-sm text-[#333e48] outline-none focus:border-[#fed700] transition-colors rounded resize-none"
              />
            </div>
            <button type="submit" className="btn-primary w-full justify-center">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
