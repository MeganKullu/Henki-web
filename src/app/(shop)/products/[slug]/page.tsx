import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
import Link from "next/link";
import ProductGallery from "@/components/products/ProductGallery";
import AddToCartButton from "@/components/products/AddToCartButton";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import ProductCard from "@/components/products/ProductCard";
import ProductJsonLd from "@/components/common/JsonLd";
import ProductViewTracker from "@/components/analytics/ProductViewTracker";
import { formatPrice, formatDiscount } from "@/lib/formatters";
import {
  Shield,
  Truck,
  RefreshCw,
  Package,
  Tag,
} from "lucide-react";

/* ── Static demo products (used when DB is not connected) ──────────── */
const DEMO_PRODUCTS = [
  {
    id: "1",
    name: "Dell XPS 15 Laptop — i7 16GB 512GB SSD",
    slug: "dell-xps-15-laptop",
    description:
      "The Dell XPS 15 combines stunning 4K OLED display technology with the latest Intel Core i7 processor and NVIDIA RTX graphics. Perfect for creative professionals and power users in Kenya looking for premium performance in a sleek design.",
    price: 219999,
    comparePrice: 249999,
    brand: "Dell",
    sku: "DEL-XPS15-i7-16-512",
    images: [
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80",
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&q=80",
      "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&q=80",
    ],
    stock: 3,
    featured: true,
    categoryId: "cat-1",
    category: { name: "Laptops", slug: "laptops" },
    specs: {
      Processor: "Intel Core i7-13700H",
      RAM: "16GB DDR5",
      Storage: "512GB NVMe SSD",
      Display: "15.6\" 4K OLED Touch",
      Graphics: "NVIDIA RTX 4060 8GB",
      Battery: "86Whr — up to 12 hrs",
      OS: "Windows 11 Home",
      Weight: "1.86 kg",
    },
  },
  {
    id: "2",
    name: "Apple iPhone 15 Pro 256GB — Natural Titanium",
    slug: "apple-iphone-15-pro-256gb",
    description:
      "The iPhone 15 Pro features the A17 Pro chip, titanium design, and a 48MP main camera with 5x optical zoom. Shop the latest Apple iPhone in Kenya at Henki Electronics with M-Pesa payment and Nairobi delivery.",
    price: 149999,
    comparePrice: null,
    brand: "Apple",
    sku: "APL-IP15PRO-256-TIT",
    images: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80",
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&q=80",
    ],
    stock: 5,
    featured: true,
    categoryId: "cat-2",
    category: { name: "Smartphones", slug: "smartphones" },
    specs: {
      Chip: "A17 Pro",
      Display: "6.1\" Super Retina XDR OLED",
      Camera: "48MP Main + 12MP Ultra Wide + 12MP 5x Telephoto",
      Storage: "256GB",
      Battery: "3274mAh — up to 23 hrs video",
      Connectivity: "5G, Wi-Fi 6E, Bluetooth 5.3",
      Material: "Titanium frame + textured matte glass",
      OS: "iOS 17",
    },
  },
  {
    id: "3",
    name: "Sony WH-1000XM5 Wireless Noise-Cancelling Headphones",
    slug: "sony-wh-1000xm5",
    description:
      "Industry-leading noise cancellation with Auto NC Optimizer. 30-hour battery life and multipoint connection. Best wireless headphones available in Kenya at Henki Electronics.",
    price: 39999,
    comparePrice: 49999,
    brand: "Sony",
    sku: "SNY-WH1000XM5-BLK",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80",
    ],
    stock: 20,
    featured: false,
    categoryId: "cat-3",
    category: { name: "Audio", slug: "audio" },
    specs: {
      "Driver Unit": "30mm",
      "Frequency Response": "4 Hz – 40,000 Hz",
      "Battery Life": "Up to 30 hours",
      Charging: "USB-C, 3 min charge = 3 hrs play",
      "Noise Cancellation": "Dual noise sensor technology",
      Weight: "250g",
      Connectivity: "Bluetooth 5.2, NFC",
      Microphone: "8 microphone system",
    },
  },
  {
    id: "4",
    name: "Samsung Galaxy S24 Ultra 512GB — Titanium Black",
    slug: "samsung-galaxy-s24-ultra",
    description:
      "Galaxy AI meets the most powerful Galaxy S series ever. With a built-in S Pen, 200MP camera, and Snapdragon 8 Gen 3 processor. Buy Samsung Galaxy S24 Ultra in Kenya at Henki Electronics.",
    price: 179999,
    comparePrice: null,
    brand: "Samsung",
    sku: "SAM-S24ULTRA-512-BLK",
    images: [
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&q=80",
      "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=800&q=80",
    ],
    stock: 7,
    featured: true,
    categoryId: "cat-2",
    category: { name: "Smartphones", slug: "smartphones" },
    specs: {
      Processor: "Snapdragon 8 Gen 3",
      Display: "6.8\" QHD+ Dynamic AMOLED 2X 120Hz",
      Camera: "200MP Main + 50MP Periscope + 10MP + 12MP UW",
      Storage: "512GB",
      RAM: "12GB",
      Battery: "5000mAh",
      S_Pen: "Included",
      OS: "Android 14 / One UI 6.1",
    },
  },
  {
    id: "5",
    name: "ASUS ROG Zephyrus G14 Gaming Laptop RTX 4060",
    slug: "asus-rog-zephyrus-g14",
    description:
      "The ROG Zephyrus G14 packs AMD Ryzen 9 and NVIDIA RTX 4060 in a compact 14-inch form factor. The best gaming laptop in Kenya for serious gamers who want portability without compromise.",
    price: 289999,
    comparePrice: 329999,
    brand: "ASUS",
    sku: "ASUS-ROG-G14-R9-RTX4060",
    images: [
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&q=80",
      "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&q=80",
    ],
    stock: 4,
    featured: true,
    categoryId: "cat-1",
    category: { name: "Laptops", slug: "laptops" },
    specs: {
      Processor: "AMD Ryzen 9 7940HS",
      GPU: "NVIDIA RTX 4060 8GB",
      RAM: "16GB DDR5 (upgradeable to 32GB)",
      Storage: "1TB NVMe SSD",
      Display: "14\" QHD+ 165Hz IPS",
      Battery: "73Whr — up to 10 hrs",
      Weight: "1.65 kg",
      OS: "Windows 11 Home",
    },
  },
  {
    id: "6",
    name: "JBL Charge 5 Portable Bluetooth Speaker",
    slug: "jbl-charge-5",
    description:
      "JBL's powerful signature sound with powerful bass. IP67 waterproof and dustproof. 20 hours of playtime and built-in power bank. Best portable speaker in Kenya.",
    price: 18999,
    comparePrice: 22999,
    brand: "JBL",
    sku: "JBL-CHARGE5-BLK",
    images: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80",
    ],
    stock: 12,
    featured: false,
    categoryId: "cat-3",
    category: { name: "Audio", slug: "audio" },
    specs: {
      Output: "40W RMS",
      "Battery Life": "20 hours",
      Charging: "USB-C",
      "Water Resistance": "IP67",
      "Power Bank": "Yes — charge your phone",
      Bluetooth: "5.1",
      Weight: "960g",
      Dimensions: "220 × 96 × 93 mm",
    },
  },
  {
    id: "7",
    name: "Apple AirPods Pro 2nd Gen with MagSafe",
    slug: "apple-airpods-pro-2",
    description:
      "AirPods Pro 2nd generation feature up to 2× better Active Noise Cancellation, Adaptive Transparency, and Personalized Spatial Audio. Buy Apple AirPods Pro in Kenya at Henki Electronics.",
    price: 34999,
    comparePrice: 38999,
    brand: "Apple",
    sku: "APL-AIRPODSPRO2-MAGSAFE",
    images: [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80",
    ],
    stock: 15,
    featured: false,
    categoryId: "cat-3",
    category: { name: "Audio", slug: "audio" },
    specs: {
      Chip: "H2",
      "ANC": "2× better than AirPods Pro 1",
      Battery: "6 hrs earbuds + 24 hrs case",
      Charging: "MagSafe / Lightning / Qi",
      "Water Resistance": "IPX4",
      Connectivity: "Bluetooth 5.3",
      "Spatial Audio": "Dynamic head tracking",
    },
  },
  {
    id: "8",
    name: "Anker 65W USB-C GaN Charger 3-Port",
    slug: "anker-65w-gan-charger",
    description:
      "Power 3 devices at once with this compact GaN charger. 65W total output — fast charge your laptop, phone, and tablet simultaneously. Buy Anker chargers in Kenya at Henki Electronics.",
    price: 4999,
    comparePrice: 6999,
    brand: "Anker",
    sku: "ANK-A2668-65W-GAN",
    images: [
      "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&q=80",
    ],
    stock: 50,
    featured: false,
    categoryId: "cat-4",
    category: { name: "Accessories", slug: "accessories" },
    specs: {
      "Total Output": "65W",
      Ports: "2× USB-C + 1× USB-A",
      "USB-C 1": "45W (laptop charging)",
      "USB-C 2": "20W",
      "USB-A": "12W",
      Technology: "GaN II",
      Certifications: "CE, FCC, RoHS",
      Size: "Pocket-sized",
    },
  },
  {
    id: "9",
    name: "HP Pavilion 15 Laptop — Ryzen 5 8GB 256GB",
    slug: "hp-pavilion-15",
    description:
      "Reliable everyday laptop for students and professionals in Kenya. AMD Ryzen 5 processor with integrated graphics handles productivity tasks with ease at an affordable price.",
    price: 89999,
    comparePrice: 109999,
    brand: "HP",
    sku: "HP-PAV15-R5-8-256",
    images: [
      "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=800&q=80",
    ],
    stock: 6,
    featured: false,
    categoryId: "cat-1",
    category: { name: "Laptops", slug: "laptops" },
    specs: {
      Processor: "AMD Ryzen 5 7520U",
      RAM: "8GB DDR5",
      Storage: "256GB NVMe SSD",
      Display: "15.6\" FHD IPS Anti-glare",
      Graphics: "AMD Radeon 610M Integrated",
      Battery: "41Whr",
      OS: "Windows 11 Home",
      Weight: "1.75 kg",
    },
  },
  {
    id: "10",
    name: "Baseus 20000mAh Power Bank 65W PD",
    slug: "baseus-20000mah-powerbank",
    description:
      "Fast-charge your laptop and phone on the go. 65W USB-C PD output is powerful enough to charge most laptops. Compact design with digital display showing remaining power.",
    price: 5999,
    comparePrice: 7999,
    brand: "Baseus",
    sku: "BAS-PB20000-65W",
    images: [
      "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&q=80",
    ],
    stock: 40,
    featured: false,
    categoryId: "cat-4",
    category: { name: "Accessories", slug: "accessories" },
    specs: {
      Capacity: "20,000mAh",
      "USB-C Output": "65W PD",
      "USB-A Output": "22.5W",
      Input: "65W USB-C",
      Display: "Digital % indicator",
      "Charges Phone": "Up to 4× full charges",
      "Charges Laptop": "Yes (compatible)",
      Weight: "440g",
    },
  },
  {
    id: "11",
    name: "Logitech MX Master 3S Wireless Mouse",
    slug: "logitech-mx-master-3s",
    description:
      "The most advanced Logitech mouse for productivity. Ultra-fast MagSpeed scrolling, 8K DPI sensor, and silent clicks. Works across multiple computers with Logitech Flow.",
    price: 12999,
    comparePrice: 15999,
    brand: "Logitech",
    sku: "LOG-MXM3S-GRY",
    images: [
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80",
    ],
    stock: 30,
    featured: false,
    categoryId: "cat-4",
    category: { name: "Accessories", slug: "accessories" },
    specs: {
      Sensor: "8000 DPI Darkfield",
      Scroll: "MagSpeed electromagnetic",
      Battery: "70 days on full charge",
      Charging: "USB-C",
      Connectivity: "Bluetooth / USB Receiver",
      Buttons: "7 programmable",
      Compatibility: "Windows, macOS, Linux, iPadOS",
    },
  },
  {
    id: "12",
    name: "Samsung 970 EVO Plus 1TB NVMe SSD",
    slug: "samsung-970-evo-plus-1tb",
    description:
      "Upgrade your laptop or desktop with Samsung's reliable NVMe SSD. Sequential read speeds up to 3,500 MB/s — up to 6× faster than SATA SSDs. 5-year warranty included.",
    price: 14999,
    comparePrice: 18999,
    brand: "Samsung",
    sku: "SAM-970EVOPLUS-1TB",
    images: [
      "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=800&q=80",
    ],
    stock: 25,
    featured: false,
    categoryId: "cat-4",
    category: { name: "Accessories", slug: "accessories" },
    specs: {
      Capacity: "1TB",
      Interface: "PCIe 3.0 x4, NVMe 1.3",
      "Sequential Read": "3,500 MB/s",
      "Sequential Write": "3,300 MB/s",
      "Form Factor": "M.2 2280",
      Warranty: "5 years",
      TBW: "600TB",
    },
  },
];

type DemoProduct = typeof DEMO_PRODUCTS[number];

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  // Try DB first
  try {
    const { prisma } = await import("@/lib/prisma");
    const product = await prisma.product.findUnique({
      where: { slug },
      include: { category: true },
    });
    if (product) {
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://henkielectronics.co.ke";
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const p: any  = product;
      const title   = (p.metaTitle as string | null) || `${product.name} — ${formatPrice(product.price)} | Henki Electronics`;
      const desc    = (p.metaDesc  as string | null) || product.description.slice(0, 160);
      return {
        title,
        description: desc,
        openGraph: {
          title:       product.name,
          description: desc,
          images:      product.images[0] ? [{ url: product.images[0], width: 800, height: 800, alt: (p.imageAltText as string | null) || product.name }] : [],
        },
        alternates: { canonical: `${siteUrl}/products/${slug}` },
      };
    }
  } catch { /* DB not connected */ }

  // Fallback to demo data
  const demo = DEMO_PRODUCTS.find((p) => p.slug === slug);
  if (!demo) return { title: "Product Not Found" };
  return {
    title: `${demo.name} — ${formatPrice(demo.price)} | Henki Electronics`,
    description: demo.description.slice(0, 160),
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  let product: DemoProduct | null = null;
  let related: DemoProduct[] = [];

  // Try DB first
  try {
    const { prisma } = await import("@/lib/prisma");
    const dbProduct = await prisma.product.findUnique({
      where: { slug },
      include: { category: true },
    });

    if (dbProduct) {
      const dbRelated = await prisma.product.findMany({
        where: { categoryId: dbProduct.categoryId, id: { not: dbProduct.id }, stock: { gt: 0 } },
        include: { category: { select: { name: true } } },
        take: 4,
        orderBy: { featured: "desc" },
      });
      product = dbProduct as unknown as DemoProduct;
      related = dbRelated as unknown as DemoProduct[];
    }
  } catch { /* DB not connected — fall through to demo data */ }

  // Fallback to static demo data
  if (!product) {
    product = DEMO_PRODUCTS.find((p) => p.slug === slug) ?? null;
    if (product) {
      related = DEMO_PRODUCTS.filter(
        (p) => p.categoryId === product!.categoryId && p.id !== product!.id
      ).slice(0, 4);
    }
  }

  if (!product) notFound();

  const discount = product.comparePrice
    ? formatDiscount(product.comparePrice, product.price)
    : null;

  const specs = (product.specs ?? {}) as unknown as Record<string, string>;

  return (
    <>
      <ProductViewTracker productId={product.id} />
      <ProductJsonLd
        product={{
          id:           product.id,
          name:         product.name,
          description:  product.description,
          price:        product.price,
          comparePrice: product.comparePrice,
          images:       product.images,
          brand:        product.brand,
          sku:          product.sku,
          stock:        product.stock,
          slug:         product.slug,
          condition:    (product as Record<string, unknown>).condition as string | null,
          warranty:     (product as Record<string, unknown>).warranty  as string | null,
          deliveryInfo: (product as Record<string, unknown>).deliveryInfo as string | null,
        }}
      />

      <div className="max-w-[1400px] mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-[#fed700]">Home</Link>
          <span className="mx-2">/</span>
          <Link href={`/products?category=${product.category.slug}`} className="hover:text-[#fed700]">
            {product.category.name}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800 font-medium line-clamp-1">{product.name}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Gallery */}
          <div>
            <ProductGallery images={product.images} name={product.name} />
          </div>

          {/* Info */}
          <div className="space-y-5">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">{product.brand}</span>
                <span className="text-gray-300">·</span>
                <span className="text-xs text-gray-500">SKU: {product.sku}</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-[#333e48] leading-tight">
                {product.name}
              </h1>
            </div>

            {/* Price */}
            <div className="flex items-end gap-3">
              <span className="text-3xl font-black text-[#333e48]">
                {formatPrice(product.price)}
              </span>
              {product.comparePrice && (
                <>
                  <span className="text-lg price-compare">{formatPrice(product.comparePrice)}</span>
                  <span className="badge badge-sale text-sm">Save {discount}%</span>
                </>
              )}
            </div>

            {/* Stock */}
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${product.stock > 5 ? "bg-green-500" : product.stock > 0 ? "bg-yellow-500" : "bg-red-500"}`} />
              <span className={`text-sm font-medium ${product.stock > 5 ? "text-green-700" : product.stock > 0 ? "text-yellow-700" : "text-red-700"}`}>
                {product.stock > 5 ? "In Stock" : product.stock > 0 ? `Only ${product.stock} left!` : "Out of Stock"}
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed text-sm">{product.description}</p>

            {/* CTA */}
            <div className="space-y-3">
              <AddToCartButton product={product} />
              <WhatsAppButton product={product} variant="inline" />
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100">
              {[
                { icon: <Shield size={16} className="text-[#fed700]" />, text: "Genuine warranty" },
                { icon: <Truck size={16} className="text-[#fed700]" />, text: "Free delivery over KSh 10k" },
                { icon: <RefreshCw size={16} className="text-[#fed700]" />, text: "7-day returns" },
                { icon: <Package size={16} className="text-[#fed700]" />, text: "Secure packaging" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2 text-xs text-gray-600">
                  {item.icon}
                  {item.text}
                </div>
              ))}
            </div>

            {/* Category tag */}
            <div className="flex items-center gap-1.5 text-sm">
              <Tag size={14} className="text-gray-400" />
              <Link
                href={`/products?category=${product.category.slug}`}
                className="text-gray-500 hover:text-[#fed700] transition-colors"
              >
                {product.category.name}
              </Link>
            </div>
          </div>
        </div>

        {/* Specs */}
        <div className="mt-10 bg-white border border-[#eeeeee] overflow-hidden">
          <div className="flex border-b border-[#eeeeee]">
            <button className="px-6 py-3.5 text-sm font-bold text-[#333e48] border-b-2 border-[#fed700] uppercase tracking-wide">
              Specifications
            </button>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.entries(specs).map(([key, value]) => (
                <div key={key} className="flex gap-2 py-2 border-b border-gray-50">
                  <span className="text-sm text-gray-500 capitalize font-medium w-36 flex-shrink-0">
                    {key.replace(/_/g, " ")}
                  </span>
                  <span className="text-sm text-gray-800">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-5 bg-[#fed700] rounded-sm" />
              <h2 className="font-black uppercase text-[#1e2022] text-sm tracking-wide">Related Products</h2>
            </div>
            <div
              className="grid grid-cols-2 md:grid-cols-4"
              style={{ borderTop: "1px solid #eeeeee", borderLeft: "1px solid #eeeeee" }}
            >
              {related.map((p) => (
                <div key={p.id} style={{ borderRight: "1px solid #eeeeee", borderBottom: "1px solid #eeeeee" }}>
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky WhatsApp */}
      <WhatsAppButton product={product} variant="sticky" />
    </>
  );
}
