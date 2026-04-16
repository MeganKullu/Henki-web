import Link from "next/link";
import Image from "next/image";

export default function HeroBanner() {
  return (
    <>
      {/* ── HERO SLIDER ─────────────────────────────────────────────────
          Full-bleed section: background goes edge-to-edge.
          Content inside is max-width-[1200px] centered container.
      ──────────────────────────────────────────────────────────────── */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "422px",
        }}
      >
        {/* dark overlay */}
        <div className="absolute inset-0 bg-[#1e2022]/80" />

        {/* container */}
        <div className="relative z-10 max-w-[1200px] mx-auto px-4">
          <div className="flex items-center" style={{ minHeight: "422px" }}>

            {/* Text column */}
            <div className="w-full md:w-1/2 py-10">
              <p className="text-[#8c98a4] text-[13px] font-semibold uppercase tracking-widest mb-3">
                New Season 2025
              </p>
              <h1
                className="text-white font-light leading-[1.1] mb-3"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
              >
                THE NEW{" "}
                <span className="block font-black text-[#fed700]">
                  STANDARD
                </span>
              </h1>
              <h6 className="text-[#8c98a4] text-[15px] font-bold uppercase tracking-wide mb-4">
                Kenya&apos;s Premium Electronics Store
              </h6>
              <div className="mb-6">
                <span className="text-[#8c98a4] text-[13px] uppercase">From</span>
                <div className="text-white font-bold leading-none mt-1" style={{ fontSize: "3rem" }}>
                  <sup className="text-xl align-super">KSh</sup>
                  9,999
                </div>
              </div>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-[#fed700] hover:bg-[#d8b700] text-[#333e48] font-bold text-[15px] px-8 py-3 transition-colors uppercase tracking-wide"
                style={{ borderRadius: "4px" }}
              >
                Start Shopping
              </Link>
            </div>

            {/* Image column */}
            <div className="hidden md:flex w-1/2 justify-center items-end" style={{ minHeight: "422px" }}>
              <div className="relative w-[380px] h-[380px]">
                <Image
                  src="https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600&q=80"
                  alt="Featured product"
                  fill
                  sizes="380px"
                  className="object-contain drop-shadow-2xl"
                  priority
                />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── 4 PROMO BANNER CARDS ─────────────────────────────────────── */}
      <div className="max-w-[1200px] mx-auto px-4 py-5">
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
          {[
            {
              img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80",
              label: "Catch Big",
              bold: "DEALS",
              sub: "on Laptops",
              href: "/products?category=laptops",
              bg: "#f0f4ff",
            },
            {
              img: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=400&q=80",
              label: "Exclusive",
              bold: "OFFERS",
              sub: "on Smartphones",
              href: "/products?category=smartphones",
              bg: "#fff4f0",
            },
            {
              img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80",
              label: "Best",
              bold: "PRICES",
              sub: "on Audio Gear",
              href: "/products?category=audio",
              bg: "#f0fff8",
            },
            {
              img: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&q=80",
              label: "Hot",
              bold: "DEALS",
              sub: "on Accessories",
              href: "/products?category=accessories",
              bg: "#fffbf0",
            },
          ].map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group flex items-stretch overflow-hidden transition-shadow duration-200 hover:shadow-md"
              style={{ background: card.bg, height: "120px" }}
            >
              {/* Image — fixed 120×120 square, object-contain so product shows fully */}
              <div className="flex-shrink-0 w-[120px] h-[120px] relative bg-white/60">
                <Image
                  src={card.img}
                  alt={card.sub}
                  fill
                  sizes="120px"
                  className="object-contain p-3"
                />
              </div>
              {/* Text */}
              <div className="flex flex-col justify-center px-3 py-2 flex-1 min-w-0">
                <div className="text-[13px] font-light text-[#333e48] leading-tight">
                  {card.label}
                </div>
                <div className="text-[18px] font-black text-[#1e2022] leading-tight">
                  {card.bold}
                </div>
                <div className="text-[11px] text-[#8c98a4] mt-0.5 leading-tight">
                  {card.sub}
                </div>
                <div className="text-[#0062bd] group-hover:text-[#fed700] font-bold text-[11px] mt-2 transition-colors flex items-center gap-0.5">
                  Shop now <span className="text-[13px]">›</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
