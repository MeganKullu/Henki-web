import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";

const FALLBACK_CATEGORIES = [
  { id: "1", slug: "laptops",     name: "Laptops",      description: "Gaming & Business",     image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&q=80" },
  { id: "2", slug: "smartphones", name: "Smartphones",  description: "Android & iPhone",      image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=300&q=80" },
  { id: "3", slug: "audio",       name: "Audio",        description: "Headphones & Speakers", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80" },
  { id: "4", slug: "accessories", name: "Accessories",  description: "Cables & Powerbanks",   image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=300&q=80" },
  { id: "5", slug: "tvs",         name: "TVs",          description: "Smart & 4K TVs",        image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=300&q=80" },
  { id: "6", slug: "gaming",      name: "Gaming",       description: "Consoles & Controllers", image: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=300&q=80" },
];

async function getCategories() {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cats: any[] = await (prisma as any).category.findMany({
      where:   { active: true },
      orderBy: { sortOrder: "asc" },
      take:    6,
    });
    return cats.length > 0 ? cats : FALLBACK_CATEGORIES;
  } catch {
    return FALLBACK_CATEGORIES;
  }
}

export default async function CategoryGrid() {
  const categories = await getCategories();

  return (
    <div className="border-b border-[#eeeeee]">
      <div className="max-w-[1400px] mx-auto px-4 py-6">
        <div
          className="grid grid-cols-3 md:grid-cols-6 gap-0 border border-[#eeeeee]"
        >
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/products?category=${cat.slug}`}
              className="group flex flex-col items-center text-center py-4 px-2 hover:bg-[#fffbf0] transition-colors border-r border-b border-[#eeeeee]"
            >
              <div className="relative w-14 h-14 mb-2 overflow-hidden rounded-full bg-[#f5f5f5]">
                {cat.image ? (
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    sizes="56px"
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-2xl">
                    {cat.icon || "🛍️"}
                  </div>
                )}
              </div>
              <div className="text-[12px] font-bold text-[#333e48] group-hover:text-[#fed700] transition-colors leading-tight">
                {cat.name}
              </div>
              {cat.description && (
                <div className="text-[10px] text-[#8c98a4] mt-0.5 leading-tight hidden sm:block line-clamp-1">
                  {cat.description}
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
