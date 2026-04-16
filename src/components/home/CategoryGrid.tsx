import Link from "next/link";
import Image from "next/image";

const categories = [
  {
    name: "Computers",
    slug: "laptops",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&q=80",
    sub: "Laptops & Desktops",
  },
  {
    name: "Smartphones",
    slug: "smartphones",
    image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=300&q=80",
    sub: "Android & iPhone",
  },
  {
    name: "Audio",
    slug: "audio",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80",
    sub: "Headphones & Speakers",
  },
  {
    name: "Accessories",
    slug: "accessories",
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=300&q=80",
    sub: "Cables & Powerbanks",
  },
  {
    name: "TVs",
    slug: "tvs",
    image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=300&q=80",
    sub: "Smart & 4K TVs",
  },
  {
    name: "Gaming",
    slug: "gaming",
    image: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=300&q=80",
    sub: "Consoles & Controllers",
  },
];

export default function CategoryGrid() {
  return (
    <div className="border-b border-[#eeeeee]">
      <div className="max-w-[1400px] mx-auto px-4 py-6">
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-0 border border-[#eeeeee] divide-x divide-[#eeeeee]">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/products?category=${cat.slug}`}
              className="group flex flex-col items-center text-center py-4 px-2 hover:bg-[#fffbf0] transition-colors"
            >
              <div className="relative w-14 h-14 mb-2 overflow-hidden rounded-full bg-[#f5f5f5]">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="56px"
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="text-[12px] font-bold text-[#333e48] group-hover:text-[#fed700] transition-colors leading-tight">
                {cat.name}
              </div>
              <div className="text-[10px] text-[#8c98a4] mt-0.5 leading-tight hidden sm:block">
                {cat.sub}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
