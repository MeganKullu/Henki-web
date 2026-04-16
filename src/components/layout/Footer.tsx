import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  CreditCard,
  Smartphone,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#333e48] text-gray-300 mt-8">

      {/* Newsletter bar */}
      <div className="bg-[#fed700]">
        <div className="max-w-[1200px] mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Mail size={22} className="text-[#333e48]" />
            <div>
              <div className="font-black text-[#333e48] text-[15px] uppercase tracking-wide">
                Subscribe to Our Newsletter
              </div>
              <div className="text-[#333e48]/70 text-[12px]">
                Get deals, new products &amp; exclusive offers
              </div>
            </div>
          </div>
          <form className="flex gap-0 w-full md:w-auto md:min-w-[420px]">
            <input
              type="email"
              placeholder="Enter your email address..."
              className="flex-1 h-10 px-4 text-[#333e48] text-sm outline-none rounded-l border-0"
            />
            <button
              type="submit"
              className="h-10 px-5 bg-[#333e48] hover:bg-[#1e2022] text-white text-sm font-bold uppercase rounded-r transition-colors whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-[1200px] mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#fed700] rounded flex items-center justify-center font-black text-[#333e48] text-sm">
                H
              </div>
              <div className="leading-none">
                <span className="font-black text-[22px] text-white tracking-tight">HENKI</span>
                <span className="font-black text-[22px] text-[#fed700]">.</span>
                <div className="text-[9px] text-gray-400 tracking-[0.15em] uppercase font-semibold -mt-0.5">
                  Electronics
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-5 leading-relaxed max-w-xs">
              Kenya&apos;s premium electronics store. Quality products, genuine
              warranties, and M-Pesa payments for your convenience.
            </p>
            <div className="flex gap-2 mb-5">
              {[
                { icon: "f", label: "Facebook" },
                { icon: "𝕏", label: "Twitter" },
                { icon: "in", label: "Instagram" },
                { icon: "▶", label: "YouTube" },
              ].map((s) => (
                <a
                  key={s.label}
                  href="#"
                  title={s.label}
                  className="w-8 h-8 rounded bg-white/10 flex items-center justify-center hover:bg-[#fed700] hover:text-[#333e48] text-gray-400 transition-colors text-xs font-bold"
                >
                  {s.icon}
                </a>
              ))}
            </div>
            {/* Contact info */}
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <Phone size={14} className="text-[#fed700] flex-shrink-0" />
                +254 700 000 000
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <Mail size={14} className="text-[#fed700] flex-shrink-0" />
                support@henkielectronics.co.ke
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-400">
                <MapPin size={14} className="text-[#fed700] flex-shrink-0 mt-0.5" />
                Westlands, Nairobi, Kenya
              </li>
            </ul>
          </div>

          {/* Find it Fast */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 pb-2 border-b border-white/10">
              Find it Fast
            </h4>
            <ul className="space-y-2">
              {[
                { label: "Laptops & Computers", href: "/products?category=laptops" },
                { label: "Smartphones", href: "/products?category=smartphones" },
                { label: "Audio & Headphones", href: "/products?category=audio" },
                { label: "TVs & Monitors", href: "/products?category=tvs" },
                { label: "Accessories", href: "/products?category=accessories" },
                { label: "Hot Deals", href: "/products?featured=true" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-[#fed700] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 pb-2 border-b border-white/10">
              Customer Care
            </h4>
            <ul className="space-y-2">
              {[
                { label: "My Account", href: "/account" },
                { label: "My Orders", href: "/account/orders" },
                { label: "Track Order", href: "/track" },
                { label: "Shipping Info", href: "/shipping" },
                { label: "Returns & Refunds", href: "/returns" },
                { label: "FAQ", href: "/faq" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-[#fed700] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Information */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 pb-2 border-b border-white/10">
              Information
            </h4>
            <ul className="space-y-2">
              {[
                { label: "About Us", href: "/about" },
                { label: "Contact Us", href: "/contact" },
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms & Conditions", href: "/terms" },
                { label: "Warranty Policy", href: "/warranty" },
                { label: "Store Locator", href: "/stores" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-[#fed700] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-[1200px] mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-3">
          <span className="text-xs text-gray-500">
            © {new Date().getFullYear()} Henki Electronics. All rights reserved.
          </span>
          {/* Payment methods */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 mr-1">We Accept:</span>
            {[
              { icon: <Smartphone size={12} />, label: "M-Pesa" },
              { icon: <CreditCard size={12} />, label: "Visa" },
              { icon: <CreditCard size={12} />, label: "Mastercard" },
            ].map((method) => (
              <span
                key={method.label}
                className="flex items-center gap-1 px-2 py-1 bg-white/10 rounded text-[11px] text-gray-300 font-medium"
              >
                {method.icon}
                {method.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
