import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env" });
dotenv.config({ path: ".env.local" });

const connectionString = process.env.DATABASE_URL!;
const prisma = new PrismaClient({ adapter: new PrismaNeon({ connectionString }) });

async function main() {
  console.log("🌱 Seeding database...");

  // ── Categories ──────────────────────────────────────────────────────────
  const laptops = await prisma.category.upsert({
    where: { slug: "laptops" },
    update: { sortOrder: 1 },
    create: {
      name: "Laptops", slug: "laptops", sortOrder: 1,
      description: "Gaming & Business laptops for every need",
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80",
    },
  });

  const smartphones = await prisma.category.upsert({
    where: { slug: "smartphones" },
    update: { sortOrder: 2 },
    create: {
      name: "Smartphones", slug: "smartphones", sortOrder: 2,
      description: "Latest flagship and mid-range smartphones",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80",
    },
  });

  const audio = await prisma.category.upsert({
    where: { slug: "audio" },
    update: { sortOrder: 3 },
    create: {
      name: "Audio", slug: "audio", sortOrder: 3,
      description: "Headphones, earbuds & speakers",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80",
    },
  });

  const accessories = await prisma.category.upsert({
    where: { slug: "accessories" },
    update: { sortOrder: 4 },
    create: {
      name: "Accessories", slug: "accessories", sortOrder: 4,
      description: "Powerbanks, cables & more",
      image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&q=80",
    },
  });

  const tvs = await prisma.category.upsert({
    where: { slug: "tvs" },
    update: { sortOrder: 5 },
    create: {
      name: "TVs", slug: "tvs", sortOrder: 5,
      description: "Smart TVs & home entertainment",
      image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=400&q=80",
    },
  });

  const gaming = await prisma.category.upsert({
    where: { slug: "gaming" },
    update: { sortOrder: 6 },
    create: {
      name: "Gaming", slug: "gaming", sortOrder: 6,
      description: "Consoles, controllers & gaming gear",
      image: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=400&q=80",
    },
  });

  const cars = await prisma.category.upsert({
    where: { slug: "cars" },
    update: { sortOrder: 7 },
    create: {
      name: "Cars", slug: "cars", sortOrder: 7, icon: "🚗",
      description: "New & used cars for sale in Kenya",
      image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&q=80",
    },
  });

  console.log("✅ Categories created");

  // ── Sub-categories ───────────────────────────────────────────────────────
  const laptopSubs = [
    { name: "Gaming Laptops",    slug: "gaming-laptops",    categoryId: laptops.id },
    { name: "Business Laptops",  slug: "business-laptops",  categoryId: laptops.id },
    { name: "Student Laptops",   slug: "student-laptops",   categoryId: laptops.id },
    { name: "Ultrabooks",        slug: "ultrabooks",        categoryId: laptops.id },
  ];
  const smartphoneSubs = [
    { name: "Android Phones",    slug: "android-phones",    categoryId: smartphones.id },
    { name: "iPhones",           slug: "iphones",           categoryId: smartphones.id },
    { name: "Budget Phones",     slug: "budget-phones",     categoryId: smartphones.id },
    { name: "Flagship Phones",   slug: "flagship-phones",   categoryId: smartphones.id },
  ];
  const audioSubs = [
    { name: "Wireless Headphones", slug: "wireless-headphones", categoryId: audio.id },
    { name: "Earbuds",             slug: "earbuds",             categoryId: audio.id },
    { name: "Bluetooth Speakers",  slug: "bluetooth-speakers",  categoryId: audio.id },
  ];
  const carSubs = [
    { name: "Sedans",      slug: "sedans",      categoryId: cars.id },
    { name: "SUVs",        slug: "suvs",        categoryId: cars.id },
    { name: "Pickups",     slug: "pickups",     categoryId: cars.id },
    { name: "Hatchbacks",  slug: "hatchbacks",  categoryId: cars.id },
    { name: "Vans & Buses", slug: "vans-buses", categoryId: cars.id },
  ];

  for (const sub of [...laptopSubs, ...smartphoneSubs, ...audioSubs, ...carSubs]) {
    await prisma.subCategory.upsert({
      where:  { slug: sub.slug },
      update: {},
      create: sub,
    });
  }

  console.log("✅ Sub-categories created");

  // ── Sections (homepage) ─────────────────────────────────────────────────
  const sections = [
    { title: "Hot Deals",       slug: "hot-deals",       type: "hot_deal",    sortOrder: 1, maxItems: 8, showTabs: true  },
    { title: "New Arrivals",    slug: "new-arrivals",    type: "new_arrival", sortOrder: 2, maxItems: 8, showTabs: false },
    { title: "Latest Laptops",  slug: "laptops-sec",     type: "category",    categorySlug: "laptops",     sortOrder: 3, maxItems: 8, showTabs: false },
    { title: "Top Smartphones", slug: "phones-sec",      type: "category",    categorySlug: "smartphones", sortOrder: 4, maxItems: 8, showTabs: false },
    { title: "Audio & Sound",   slug: "audio-sec",       type: "category",    categorySlug: "audio",       sortOrder: 5, maxItems: 8, showTabs: false },
    { title: "On Sale",         slug: "on-sale",         type: "on_sale",     sortOrder: 6, maxItems: 8, showTabs: false },
    { title: "Accessories",     slug: "accessories-sec", type: "category",    categorySlug: "accessories", sortOrder: 7, maxItems: 8, showTabs: false },
  ];

  for (const section of sections) {
    await prisma.section.upsert({
      where:  { slug: section.slug },
      update: { sortOrder: section.sortOrder, active: true },
      create: { ...section, active: true, categorySlug: section.categorySlug ?? null },
    });
  }

  console.log("✅ Sections created");

  // ── Products – Laptops ───────────────────────────────────────────────────
  const laptopProducts = [
    {
      name: "ASUS ROG Strix G16 Gaming Laptop",
      slug: "asus-rog-strix-g16-gaming",
      model: "ROG Strix G16", variant: "Ryzen 9 / RTX 4070 / 16GB / 1TB",
      keyFeature: "165Hz QHD, RGB Backlit",
      description: "Dominate every game with the ROG Strix G16 powered by AMD Ryzen 9 and NVIDIA RTX 4070. Features a 165Hz QHD display, RGB backlit keyboard, and advanced cooling system built for marathon gaming sessions.",
      price: 185000, comparePrice: 210000, stock: 12, brand: "ASUS", sku: "ASUS-ROG-G16-001",
      images: ["https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&q=80"],
      featured: true, hotDeal: true, newArrival: false, onSale: true,
      condition: "new", warranty: "1 Year Official ASUS Warranty", deliveryInfo: "Same Day Delivery in Nairobi",
      specs: { processor: "AMD Ryzen 9 7945HX", gpu: "NVIDIA GeForce RTX 4070 8GB", ram: "16GB DDR5", storage: "1TB NVMe SSD", display: '16" QHD 165Hz IPS', battery: "90Wh", os: "Windows 11 Home" },
    },
    {
      name: "Dell XPS 15 Business Laptop",
      slug: "dell-xps-15-business",
      model: "XPS 15", variant: "i7 / RTX 4060 / 32GB / 512GB",
      keyFeature: "OLED 3.5K Display",
      description: "The Dell XPS 15 sets the standard for premium business laptops. With an Intel Core i7 processor, stunning OLED display, and all-day battery life, it's the perfect companion for professionals on the go.",
      price: 165000, comparePrice: 185000, stock: 8, brand: "Dell", sku: "DELL-XPS15-002",
      images: ["https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&q=80"],
      featured: true, hotDeal: false, newArrival: true, onSale: true,
      condition: "new", warranty: "1 Year Dell Warranty", deliveryInfo: "Same Day Delivery in Nairobi",
      specs: { processor: "Intel Core i7-13700H", gpu: "NVIDIA GeForce RTX 4060 8GB", ram: "32GB DDR5", storage: "512GB NVMe SSD", display: '15.6" OLED 3.5K 120Hz', battery: "86Wh", os: "Windows 11 Pro" },
    },
    {
      name: "Lenovo ThinkPad X1 Carbon",
      slug: "lenovo-thinkpad-x1-carbon",
      model: "ThinkPad X1 Carbon Gen 11", variant: "i7 / 16GB / 512GB",
      keyFeature: "Military-Grade, Ultra-Light 1.12kg",
      description: "The ultra-light ThinkPad X1 Carbon Gen 11 is engineered for business excellence. Military-grade durability meets premium performance in a chassis weighing just 1.12kg.",
      price: 145000, comparePrice: 160000, stock: 15, brand: "Lenovo", sku: "LEN-X1C-003",
      images: ["https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&q=80"],
      featured: false, hotDeal: false, newArrival: true, onSale: true,
      condition: "new", warranty: "1 Year Lenovo Warranty", deliveryInfo: "Next Day Delivery Nationwide",
      specs: { processor: "Intel Core i7-1365U", gpu: "Intel Iris Xe", ram: "16GB LPDDR5", storage: "512GB SSD", display: '14" OLED 2.8K', battery: "57Wh", os: "Windows 11 Pro" },
    },
    {
      name: "MSI Raider GE78 HX Gaming Laptop",
      slug: "msi-raider-ge78-gaming",
      model: "Raider GE78 HX", variant: "i9 / RTX 4080 / 32GB / 2TB",
      keyFeature: "240Hz QHD+, Per-Key RGB",
      description: "Unleash extreme gaming power with MSI Raider GE78 HX featuring Intel Core i9 HX and RTX 4080. The per-key RGB keyboard and 240Hz QHD+ display make every session extraordinary.",
      price: 285000, comparePrice: 320000, stock: 5, brand: "MSI", sku: "MSI-GE78-004",
      images: ["https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&q=80"],
      featured: true, hotDeal: true, newArrival: false, onSale: true,
      condition: "new", warranty: "2 Years MSI Warranty", deliveryInfo: "Same Day Delivery in Nairobi",
      specs: { processor: "Intel Core i9-13980HX", gpu: "NVIDIA GeForce RTX 4080 12GB", ram: "32GB DDR5", storage: "2TB NVMe SSD (RAID 0)", display: '17.3" QHD+ 240Hz', battery: "99.9Wh", os: "Windows 11 Home" },
    },
    {
      name: "HP Spectre x360 14 Convertible",
      slug: "hp-spectre-x360-14",
      model: "Spectre x360 14", variant: "i7 EVO / 16GB / 1TB",
      keyFeature: "2-in-1 Convertible, OLED Touch",
      description: "The HP Spectre x360 14 is a stunning 2-in-1 convertible laptop for creative professionals. Flip it into tablet mode and enjoy the gorgeous OLED display.",
      price: 155000, comparePrice: 175000, stock: 10, brand: "HP", sku: "HP-SPX360-005",
      images: ["https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=800&q=80"],
      featured: false, hotDeal: false, newArrival: true, onSale: true,
      condition: "new", warranty: "1 Year HP Warranty", deliveryInfo: "Same Day Delivery in Nairobi",
      specs: { processor: "Intel Core i7-1355U EVO", gpu: "Intel Iris Xe", ram: "16GB LPDDR5", storage: "1TB SSD", display: '13.5" OLED 2.8K 120Hz Touch', battery: "66Wh", os: "Windows 11 Home" },
    },
    {
      name: "Acer Nitro 16 Gaming Laptop",
      slug: "acer-nitro-16-gaming",
      model: "Nitro 16", variant: "Ryzen 7 / RTX 4060 / 16GB / 512GB",
      keyFeature: "165Hz IPS, Quad-Fan Cooling",
      description: "The Acer Nitro 16 delivers serious gaming performance at an accessible price. Powered by AMD Ryzen 7 and RTX 4060, it features Acer's CoolBoost technology to keep temperatures in check during intense sessions.",
      price: 115000, comparePrice: 132000, stock: 18, brand: "Acer", sku: "ACE-N16-006",
      images: ["https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&q=80"],
      featured: false, hotDeal: true, newArrival: true, onSale: true,
      condition: "new", warranty: "1 Year Acer Warranty", deliveryInfo: "Same Day Delivery in Nairobi",
      specs: { processor: "AMD Ryzen 7 7745HX", gpu: "NVIDIA GeForce RTX 4060 8GB", ram: "16GB DDR5", storage: "512GB NVMe SSD", display: '16" FHD 165Hz IPS', battery: "90Wh", os: "Windows 11 Home" },
    },
    {
      name: "MacBook Air 15-inch M3",
      slug: "macbook-air-15-m3",
      model: "MacBook Air 15\"", variant: "M3 / 8GB / 256GB",
      keyFeature: "Apple M3 Chip, 18hr Battery, Fanless",
      description: "The MacBook Air 15 with M3 chip is thin, light, and surprisingly powerful. With up to 18 hours of battery life and a fanless design, it's the perfect everyday laptop for students and professionals.",
      price: 195000, comparePrice: 215000, stock: 7, brand: "Apple", sku: "APL-MBA15M3-007",
      images: ["https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80"],
      featured: true, hotDeal: false, newArrival: true, onSale: false,
      condition: "new", warranty: "1 Year Apple Warranty", deliveryInfo: "Same Day Delivery in Nairobi",
      specs: { processor: "Apple M3 8-core CPU", gpu: "10-core GPU", ram: "8GB Unified Memory", storage: "256GB SSD", display: '15.3" Liquid Retina 2880x1864', battery: "70.1Wh (18hrs)", os: "macOS Sequoia" },
    },
    {
      name: "Huawei MateBook D16 OLED",
      slug: "huawei-matebook-d16-oled",
      model: "MateBook D16 2024", variant: "i5 / 16GB / 1TB",
      keyFeature: "3.1K OLED Touch, Intel EVO Platform",
      description: "The MateBook D16 OLED brings a stunning 3.1K OLED touchscreen to a slim business laptop. Intel EVO-certified with fast charging and a full suite of productivity features.",
      price: 98000, comparePrice: 115000, stock: 12, brand: "Huawei", sku: "HUA-MBD16-008",
      images: ["https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=800&q=80"],
      featured: false, hotDeal: false, newArrival: true, onSale: true,
      condition: "new", warranty: "1 Year Huawei Warranty", deliveryInfo: "Next Day Delivery Nationwide",
      specs: { processor: "Intel Core i5-13500H", gpu: "Intel Iris Xe", ram: "16GB LPDDR5", storage: "1TB SSD", display: '16" OLED 3.1K 120Hz Touch', battery: "84Wh", os: "Windows 11 Home" },
    },
  ];

  for (const p of laptopProducts) {
    await prisma.product.upsert({
      where:  { slug: p.slug },
      update: { hotDeal: p.hotDeal, newArrival: p.newArrival, onSale: p.onSale, featured: p.featured },
      create: { ...p, categoryId: laptops.id },
    });
  }

  // ── Products – Smartphones ────────────────────────────────────────────────
  const smartphoneProducts = [
    {
      name: "Samsung Galaxy S24 Ultra", slug: "samsung-galaxy-s24-ultra",
      model: "Galaxy S24 Ultra", variant: "256GB / 12GB RAM",
      keyFeature: "200MP Camera, S Pen, Titanium Frame",
      description: "The Galaxy S24 Ultra redefines what a smartphone can do. Built-in S Pen, 200MP camera, titanium frame, and 7 years of OS updates.",
      price: 135000, comparePrice: 148000, stock: 20, brand: "Samsung", sku: "SAM-S24U-001",
      images: ["https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&q=80"],
      featured: true, hotDeal: true, newArrival: false, onSale: true,
      condition: "new", warranty: "1 Year Samsung Warranty", deliveryInfo: "Same Day Delivery in Nairobi",
      specs: { display: '6.8" Dynamic AMOLED 120Hz', processor: "Snapdragon 8 Gen 3", ram: "12GB", storage: "256GB", rearCamera: "200MP + 12MP + 10MP + 10MP", battery: "5000mAh, 45W", os: "Android 14" },
    },
    {
      name: "iPhone 15 Pro Max", slug: "iphone-15-pro-max",
      model: "iPhone 15 Pro Max", variant: "256GB / Natural Titanium",
      keyFeature: "A17 Pro, 5x Zoom, Titanium Design",
      description: "iPhone 15 Pro Max with the A17 Pro chip, titanium design, and a 5x optical zoom camera. The Action button lets you customize your shortcuts.",
      price: 148000, comparePrice: 165000, stock: 18, brand: "Apple", sku: "APL-IP15PM-002",
      images: ["https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&q=80"],
      featured: true, hotDeal: false, newArrival: true, onSale: true,
      condition: "new", warranty: "1 Year Apple Warranty", deliveryInfo: "Same Day Delivery in Nairobi",
      specs: { display: '6.7" Super Retina XDR 120Hz', processor: "Apple A17 Pro", storage: "256GB", rearCamera: "48MP + 12MP UW + 12MP 5x Telephoto", battery: "4422mAh, 27W", os: "iOS 17" },
    },
    {
      name: "Google Pixel 8 Pro", slug: "google-pixel-8-pro",
      model: "Pixel 8 Pro", variant: "128GB / 12GB RAM",
      keyFeature: "Google AI, Magic Eraser, 7yr Updates",
      description: "The Pixel 8 Pro brings the best of Google AI to your phone. Magic Eraser, Best Take, and Call Screen are powered by the Google Tensor G3 chip.",
      price: 95000, comparePrice: 110000, stock: 14, brand: "Google", sku: "GOO-P8P-003",
      images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80"],
      featured: false, hotDeal: true, newArrival: false, onSale: true,
      condition: "new", warranty: "1 Year Google Warranty", deliveryInfo: "Next Day Delivery Nationwide",
      specs: { display: '6.7" LTPO OLED 120Hz', processor: "Google Tensor G3", ram: "12GB", storage: "128GB", rearCamera: "50MP + 48MP UW + 48MP 5x", battery: "5050mAh, 30W", os: "Android 14" },
    },
    {
      name: "Samsung Galaxy A55 5G", slug: "samsung-galaxy-a55-5g",
      model: "Galaxy A55", variant: "128GB / 8GB RAM",
      keyFeature: "50MP Nightography Camera, 5G",
      description: "Exceptional camera quality meets sleek design in the Galaxy A55. Nightography technology and a 50MP camera capture stunning shots at any condition.",
      price: 55000, comparePrice: 62000, stock: 30, brand: "Samsung", sku: "SAM-A55-004",
      images: ["https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800&q=80"],
      featured: false, hotDeal: false, newArrival: true, onSale: true,
      condition: "new", warranty: "1 Year Samsung Warranty", deliveryInfo: "Same Day Delivery in Nairobi",
      specs: { display: '6.6" Super AMOLED 120Hz', processor: "Exynos 1480", ram: "8GB", storage: "128GB (expandable)", rearCamera: "50MP + 12MP + 5MP", battery: "5000mAh, 25W", os: "Android 14" },
    },
    {
      name: "Samsung Galaxy S24 FE 5G", slug: "samsung-galaxy-s24-fe",
      model: "Galaxy S24 FE", variant: "256GB / 8GB RAM",
      keyFeature: "Galaxy AI, 50MP Camera, IP68",
      description: "Get Galaxy AI features at a fan-friendly price. The Galaxy S24 FE brings AI-powered photography, IP68 water resistance, and a brilliant 6.7\" display.",
      price: 82000, comparePrice: 95000, stock: 25, brand: "Samsung", sku: "SAM-S24FE-005",
      images: ["https://images.unsplash.com/photo-1610945264803-c22b62d2a7b3?w=800&q=80"],
      featured: true, hotDeal: true, newArrival: true, onSale: true,
      condition: "new", warranty: "1 Year Samsung Warranty", deliveryInfo: "Same Day Delivery in Nairobi",
      specs: { display: '6.7" Dynamic AMOLED 120Hz', processor: "Exynos 2500", ram: "8GB", storage: "256GB", rearCamera: "50MP + 12MP UW + 10MP 3x", battery: "4700mAh, 45W", os: "Android 14, One UI 7" },
    },
    {
      name: "Tecno Camon 30 Pro 5G", slug: "tecno-camon-30-pro-5g",
      model: "Camon 30 Pro", variant: "256GB / 12GB RAM",
      keyFeature: "50MP RGBW AI Camera, 5G, 6.78\"",
      description: "The Tecno Camon 30 Pro 5G delivers flagship-level photography with its RGBW sensor and AI enhancements. With 5G connectivity, 256GB storage and a massive 6.78\" AMOLED display.",
      price: 32000, comparePrice: 38000, stock: 40, brand: "Tecno", sku: "TEC-CAM30P-006",
      images: ["https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=800&q=80"],
      featured: false, hotDeal: false, newArrival: true, onSale: true,
      condition: "new", warranty: "1 Year Tecno Warranty", deliveryInfo: "Same Day Delivery in Nairobi",
      specs: { display: '6.78" AMOLED 120Hz', processor: "Dimensity 7020", ram: "12GB", storage: "256GB", rearCamera: "50MP RGBW + 13MP + 2MP", battery: "5000mAh, 45W", os: "Android 14, HiOS 14" },
    },
    {
      name: "Xiaomi 14T Pro 5G", slug: "xiaomi-14t-pro-5g",
      model: "14T Pro", variant: "512GB / 12GB RAM",
      keyFeature: "Leica Cameras, Snapdragon 8s Gen 3",
      description: "Co-engineered with Leica, the Xiaomi 14T Pro brings professional photography to a mid-flagship smartphone. Snapdragon 8s Gen 3 ensures top-tier performance in every task.",
      price: 88000, comparePrice: 98000, stock: 16, brand: "Xiaomi", sku: "XIA-14TP-007",
      images: ["https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&q=80"],
      featured: true, hotDeal: false, newArrival: true, onSale: true,
      condition: "new", warranty: "1 Year Xiaomi Warranty", deliveryInfo: "Next Day Delivery Nationwide",
      specs: { display: '6.67" AMOLED 144Hz', processor: "Snapdragon 8s Gen 3", ram: "12GB", storage: "512GB", rearCamera: "50MP Leica + 50MP Leica Tele + 12MP UW", battery: "5000mAh, 120W", os: "Android 14, HyperOS" },
    },
    {
      name: "OnePlus 12 5G", slug: "oneplus-12-5g",
      model: "OnePlus 12", variant: "256GB / 12GB RAM",
      keyFeature: "Hasselblad Camera, 100W Fast Charge",
      description: "OnePlus 12 combines Hasselblad-tuned cameras with blazing 100W SUPERVOOC charging. Snapdragon 8 Gen 3 powers everything with flagship performance and a stunning 6.82\" LTPO display.",
      price: 92000, comparePrice: 105000, stock: 14, brand: "OnePlus", sku: "OPL-12-008",
      images: ["https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=800&q=80"],
      featured: false, hotDeal: true, newArrival: false, onSale: true,
      condition: "new", warranty: "1 Year OnePlus Warranty", deliveryInfo: "Same Day Delivery in Nairobi",
      specs: { display: '6.82" LTPO AMOLED 120Hz', processor: "Snapdragon 8 Gen 3", ram: "12GB", storage: "256GB", rearCamera: "50MP Hasselblad + 64MP Tele + 48MP UW", battery: "5400mAh, 100W", os: "Android 14, OxygenOS 14" },
    },
  ];

  for (const p of smartphoneProducts) {
    await prisma.product.upsert({
      where:  { slug: p.slug },
      update: { hotDeal: p.hotDeal, newArrival: p.newArrival, onSale: p.onSale, featured: p.featured },
      create: { ...p, categoryId: smartphones.id },
    });
  }

  // ── Products – Audio ─────────────────────────────────────────────────────
  const audioProducts = [
    {
      name: "Sony WH-1000XM5 Wireless Headphones", slug: "sony-wh-1000xm5",
      model: "WH-1000XM5", variant: "Black",
      keyFeature: "Industry-Leading ANC, 30hr Battery",
      description: "Industry-leading noise cancellation meets exceptional sound quality. 8 microphones and HD Noise Cancelling Processor QN2 deliver unmatched silence anywhere you go.",
      price: 38000, comparePrice: 45000, stock: 25, brand: "Sony", sku: "SNY-WH1000XM5-001",
      images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80"],
      featured: true, hotDeal: true, newArrival: false, onSale: true,
      condition: "new", warranty: "1 Year Sony Warranty", deliveryInfo: "Same Day Delivery in Nairobi",
      specs: { type: "Over-ear", battery: "30 hours ANC", charging: "USB-C", connectivity: "Bluetooth 5.2, NFC", weight: "250g" },
    },
    {
      name: "Apple AirPods Pro (2nd Gen)", slug: "apple-airpods-pro-2nd-gen",
      model: "AirPods Pro 2", variant: "MagSafe Charging Case",
      keyFeature: "H2 Chip, 2x Better ANC, Spatial Audio",
      description: "AirPods Pro feature the H2 chip for up to 2x more Active Noise Cancellation, Adaptive Audio, and Conversation Awareness.",
      price: 28000, comparePrice: 33000, stock: 35, brand: "Apple", sku: "APL-APPRO2-002",
      images: ["https://images.unsplash.com/photo-1606741965429-02919b2a6f28?w=800&q=80"],
      featured: false, hotDeal: false, newArrival: true, onSale: true,
      condition: "new", warranty: "1 Year Apple Warranty", deliveryInfo: "Same Day Delivery in Nairobi",
      specs: { chip: "H2", noiseCancellation: "ANC + Transparency Mode", battery: "6hrs + 30hrs case", charging: "MagSafe/Lightning/Qi", connectivity: "Bluetooth 5.3" },
    },
    {
      name: "JBL Charge 5 Portable Speaker", slug: "jbl-charge-5-portable-speaker",
      model: "Charge 5", variant: "Black",
      keyFeature: "IP67 Waterproof, 20hr Battery, Powerbank",
      description: "The JBL Charge 5 delivers powerful JBL Pro Sound, 7500mAh battery, and the ability to charge your devices. IP67 waterproof for adventure-ready audio.",
      price: 14500, comparePrice: 18000, stock: 40, brand: "JBL", sku: "JBL-CHG5-003",
      images: ["https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80"],
      featured: true, hotDeal: true, newArrival: false, onSale: true,
      condition: "new", warranty: "1 Year JBL Warranty", deliveryInfo: "Same Day Delivery in Nairobi",
      specs: { output: "40W RMS", battery: "7500mAh, 20 hours", charging: "USB-C", waterResistance: "IP67", connectivity: "Bluetooth 5.1" },
    },
    {
      name: "Bose QuietComfort Ultra Headphones", slug: "bose-quietcomfort-ultra",
      model: "QuietComfort Ultra", variant: "Black",
      keyFeature: "World-Class ANC, Bose Immersive Audio",
      description: "The Bose QuietComfort Ultra Headphones feature world-class noise cancellation and immersive audio with CustomTune technology that personalizes sound to your ear.",
      price: 48000, comparePrice: 55000, stock: 15, brand: "Bose", sku: "BOSE-QCUH-004",
      images: ["https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=80"],
      featured: false, hotDeal: false, newArrival: true, onSale: true,
      condition: "new", warranty: "1 Year Bose Warranty", deliveryInfo: "Next Day Delivery Nationwide",
      specs: { noiseCancellation: "World-class ANC + Aware Mode", battery: "24 hours Quiet Mode", charging: "USB-C, 15min = 2.5hrs", connectivity: "Bluetooth 5.3", weight: "250g" },
    },
    {
      name: "Samsung Galaxy Buds3 Pro", slug: "samsung-galaxy-buds3-pro",
      model: "Galaxy Buds3 Pro", variant: "Silver",
      keyFeature: "Blade Design, Hi-Fi Sound, Galaxy AI",
      description: "Galaxy Buds3 Pro introduces a bold blade design with Hi-Fi audio performance. Galaxy AI features like Interpret translate conversations in real time through your earbuds.",
      price: 22000, comparePrice: 26000, stock: 28, brand: "Samsung", sku: "SAM-GB3PRO-005",
      images: ["https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80"],
      featured: true, hotDeal: true, newArrival: true, onSale: true,
      condition: "new", warranty: "1 Year Samsung Warranty", deliveryInfo: "Same Day Delivery in Nairobi",
      specs: { driver: "11mm Woofer + 6.1mm Tweeter", noiseCancellation: "Active Noise Cancellation", battery: "6hrs + 24hrs case", charging: "Wireless + USB-C", connectivity: "Bluetooth 5.4" },
    },
    {
      name: "JBL Xtreme 4 Portable Speaker", slug: "jbl-xtreme-4-speaker",
      model: "Xtreme 4", variant: "Black",
      keyFeature: "IP67, 24hr Battery, Carry Strap, 40W",
      description: "The JBL Xtreme 4 cranks out powerful stereo sound with an all-new design. IP67 rated, 24 hours of playtime, and an integrated carry strap make it built for adventure.",
      price: 18500, comparePrice: 23000, stock: 22, brand: "JBL", sku: "JBL-XTR4-006",
      images: ["https://images.unsplash.com/photo-1563330232-57114bb0823c?w=800&q=80"],
      featured: false, hotDeal: false, newArrival: true, onSale: true,
      condition: "new", warranty: "1 Year JBL Warranty", deliveryInfo: "Same Day Delivery in Nairobi",
      specs: { output: "40W", battery: "24 hours", waterResistance: "IP67", connectivity: "Bluetooth 5.3, AUX", charging: "USB-C" },
    },
    {
      name: "Sennheiser Momentum 4 Wireless", slug: "sennheiser-momentum-4-wireless",
      model: "Momentum 4 Wireless", variant: "Black",
      keyFeature: "60hr Battery, Adaptive ANC, Hi-Res Audio",
      description: "The Momentum 4 Wireless delivers Sennheiser's legendary sound quality with up to 60 hours battery life and Adaptive Noise Cancellation. Perfect for audiophiles on the move.",
      price: 35000, comparePrice: 42000, stock: 12, brand: "Sennheiser", sku: "SEN-MOM4-007",
      images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80"],
      featured: false, hotDeal: false, newArrival: true, onSale: true,
      condition: "new", warranty: "2 Year Sennheiser Warranty", deliveryInfo: "Next Day Delivery Nationwide",
      specs: { type: "Over-ear", battery: "60 hours", noiseCancellation: "Adaptive ANC + Transparency", charging: "USB-C", connectivity: "Bluetooth 5.2, 3.5mm AUX" },
    },
    {
      name: "Anker Soundcore Space Q45", slug: "anker-soundcore-space-q45",
      model: "Space Q45", variant: "Black",
      keyFeature: "Hybrid ANC, 50hr Battery, Hi-Res Audio",
      description: "Soundcore Space Q45 delivers premium audio with Hybrid Active Noise Cancellation, 50 hours of battery, and Hi-Res Audio certification — at a fraction of the flagship price.",
      price: 8500, comparePrice: 12000, stock: 45, brand: "Anker", sku: "ANK-SQ45-008",
      images: ["https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80"],
      featured: false, hotDeal: true, newArrival: false, onSale: true,
      condition: "new", warranty: "18 Month Anker Warranty", deliveryInfo: "Same Day Delivery in Nairobi",
      specs: { type: "Over-ear", battery: "50 hours ANC on", noiseCancellation: "Hybrid ANC", connectivity: "Bluetooth 5.3", charging: "USB-C" },
    },
  ];

  for (const p of audioProducts) {
    await prisma.product.upsert({
      where:  { slug: p.slug },
      update: { hotDeal: p.hotDeal, newArrival: p.newArrival, onSale: p.onSale, featured: p.featured },
      create: { ...p, categoryId: audio.id },
    });
  }

  // ── Products – Accessories ───────────────────────────────────────────────
  const accessoryProducts = [
    {
      name: "Anker 737 PowerBank 24000mAh", slug: "anker-737-powerbank-24000mah",
      model: "737 PowerBank", variant: "24000mAh / 140W",
      keyFeature: "140W Output, Smart Display, MacBook Compatible",
      description: "The Anker 737 PowerBank with 24,000mAh capacity and 140W total output can charge a MacBook Pro to 50% in 27 minutes. Smart display shows precise battery percentage.",
      price: 12500, comparePrice: 15000, stock: 50, brand: "Anker", sku: "ANK-737PB-001",
      images: ["https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&q=80"],
      featured: true, hotDeal: false, newArrival: true, onSale: true,
      condition: "new", warranty: "18 Month Anker Warranty", deliveryInfo: "Same Day Delivery in Nairobi",
      specs: { capacity: "24,000mAh", output: "140W USB-C", totalOutput: "140W max", weight: "624g" },
    },
    {
      name: "Baseus 65W USB-C GaN Charger", slug: "baseus-65w-gan-charger",
      model: "65W GaN Charger", variant: "3-Port / White",
      keyFeature: "GaN III, 3 Ports, Ultra-Compact",
      description: "Ultra-compact Baseus GaN charger delivers 65W through 3 ports simultaneously. Charge laptop, phone, and earbuds at the same time.",
      price: 3500, comparePrice: 4500, stock: 80, brand: "Baseus", sku: "BAS-65GAN-002",
      images: ["https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=800&q=80"],
      featured: false, hotDeal: true, newArrival: false, onSale: true,
      condition: "new", warranty: "1 Year Baseus Warranty", deliveryInfo: "Same Day Delivery in Nairobi",
      specs: { technology: "GaN III", totalOutput: "65W", ports: "2x USB-C + 1x USB-A" },
    },
    {
      name: "SanDisk 1TB Portable SSD", slug: "sandisk-1tb-portable-ssd",
      model: "Portable SSD", variant: "1TB",
      keyFeature: "800MB/s, IP65 Shockproof, Pocket-Sized",
      description: "Blazing-fast SSD speeds up to 800MB/s in a palm-sized, shockproof design. Transfer a 4K movie in seconds and take your entire digital life wherever you go.",
      price: 8500, comparePrice: 11000, stock: 30, brand: "SanDisk", sku: "SND-1TBSSD-003",
      images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"],
      featured: false, hotDeal: false, newArrival: true, onSale: true,
      condition: "new", warranty: "5 Year SanDisk Warranty", deliveryInfo: "Same Day Delivery in Nairobi",
      specs: { capacity: "1TB", readSpeed: "800MB/s", interface: "USB-C 3.2 Gen 2", durability: "2m drop, IP65" },
    },
    {
      name: "Logitech MX Keys S Wireless Keyboard", slug: "logitech-mx-keys-s-keyboard",
      model: "MX Keys S", variant: "Graphite",
      keyFeature: "Backlit, Multi-Device, USB-C Rechargeable",
      description: "MX Keys S is the ultimate wireless keyboard for productivity. Smart backlighting adjusts to your hands, and Easy-Switch lets you type across 3 devices seamlessly.",
      price: 9500, comparePrice: 12000, stock: 35, brand: "Logitech", sku: "LOG-MXKS-004",
      images: ["https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=800&q=80"],
      featured: true, hotDeal: false, newArrival: true, onSale: true,
      condition: "new", warranty: "1 Year Logitech Warranty", deliveryInfo: "Same Day Delivery in Nairobi",
      specs: { connectivity: "Bluetooth + USB Receiver", battery: "10 days (backlighting on)", multiDevice: "Up to 3 devices", charging: "USB-C", compatibility: "Windows / macOS / Linux" },
    },
    {
      name: "Logitech MX Master 3S Wireless Mouse", slug: "logitech-mx-master-3s-mouse",
      model: "MX Master 3S", variant: "Graphite",
      keyFeature: "8000 DPI, MagSpeed Scroll, Quiet Clicks",
      description: "MX Master 3S sets the standard for wireless mice with 8000 DPI tracking on any surface, MagSpeed electromagnetic scrolling, and quiet click buttons.",
      price: 8200, comparePrice: 10500, stock: 45, brand: "Logitech", sku: "LOG-MXM3S-005",
      images: ["https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80"],
      featured: false, hotDeal: true, newArrival: false, onSale: true,
      condition: "new", warranty: "1 Year Logitech Warranty", deliveryInfo: "Same Day Delivery in Nairobi",
      specs: { sensor: "8000 DPI", connectivity: "Bluetooth + USB Receiver", battery: "70 days USB-C rechargeable", scrolling: "MagSpeed electromagnetic", multiDevice: "Up to 3 devices" },
    },
    {
      name: "Logitech C920 HD Pro Webcam", slug: "logitech-c920-hd-pro-webcam",
      model: "C920 HD Pro", variant: "Black",
      keyFeature: "1080p 30fps, Dual Mics, Auto Focus",
      description: "The Logitech C920 delivers crisp 1080p video at 30fps, built-in dual stereo microphones, and automatic HD light correction for professional-quality calls and streams.",
      price: 5800, comparePrice: 7500, stock: 55, brand: "Logitech", sku: "LOG-C920-006",
      images: ["https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=800&q=80"],
      featured: false, hotDeal: false, newArrival: true, onSale: true,
      condition: "new", warranty: "2 Year Logitech Warranty", deliveryInfo: "Same Day Delivery in Nairobi",
      specs: { resolution: "1080p Full HD 30fps", microphone: "Dual stereo mics with noise reduction", focus: "Autofocus", connection: "USB-A 2.0", compatibility: "Windows / macOS / ChromeOS" },
    },
    {
      name: "Anker 10-in-1 USB-C Hub", slug: "anker-10-in-1-usb-c-hub",
      model: "10-in-1 Hub", variant: "Grey",
      keyFeature: "4K HDMI, 100W PD, SD Card, 10 Ports",
      description: "Expand your laptop's connectivity with 10 ports in one slim hub. 4K HDMI output, 100W Power Delivery pass-through, SD card reader, and multiple USB-A/C ports.",
      price: 4200, comparePrice: 5800, stock: 60, brand: "Anker", sku: "ANK-HUB10-007",
      images: ["https://images.unsplash.com/photo-1625842268584-8f3296236761?w=800&q=80"],
      featured: false, hotDeal: true, newArrival: true, onSale: true,
      condition: "new", warranty: "18 Month Anker Warranty", deliveryInfo: "Same Day Delivery in Nairobi",
      specs: { ports: "10-in-1", hdmi: "4K@30Hz HDMI", usb: "3x USB-A 3.0 + 2x USB-C", powerDelivery: "100W PD pass-through", cardReader: "SD + microSD" },
    },
    {
      name: "Ugreen 100W USB-C to USB-C Cable", slug: "ugreen-100w-usb-c-cable",
      model: "100W Charging Cable", variant: "2m / Braided",
      keyFeature: "100W Fast Charging, 10Gbps Data, Nylon Braided",
      description: "Charge your laptop, tablet, or phone at full 100W speed with this premium nylon braided cable. Supports 10Gbps data transfer and 4K@60Hz video output via USB 3.1.",
      price: 1200, comparePrice: 1800, stock: 120, brand: "Ugreen", sku: "UGR-USBCC-008",
      images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"],
      featured: false, hotDeal: true, newArrival: false, onSale: true,
      condition: "new", warranty: "18 Month Ugreen Warranty", deliveryInfo: "Same Day Delivery in Nairobi",
      specs: { charging: "100W / 5A", data: "10Gbps USB 3.1", video: "4K@60Hz", length: "2 meters", material: "Nylon braided" },
    },
  ];

  for (const p of accessoryProducts) {
    await prisma.product.upsert({
      where:  { slug: p.slug },
      update: { hotDeal: p.hotDeal, newArrival: p.newArrival, onSale: p.onSale, featured: p.featured },
      create: { ...p, categoryId: accessories.id },
    });
  }

  // ── Products – TVs ───────────────────────────────────────────────────────
  const tvProducts = [
    {
      name: "Samsung 55\" QLED 4K Smart TV Q65B", slug: "samsung-55-qled-4k-q65b",
      model: "Q65B QLED", variant: "55 inch / 4K",
      keyFeature: "Quantum Dot, 120Hz, SmartThings Hub",
      description: "The Samsung Q65B QLED brings vibrant Quantum Dot colour to your living room. With a 120Hz panel, 4K resolution, and built-in SmartThings hub for a smarter home.",
      price: 89000, comparePrice: 105000, stock: 10, brand: "Samsung", sku: "SAM-Q65B-001",
      images: ["https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&q=80"],
      featured: true, hotDeal: false, newArrival: true, onSale: true,
      condition: "new", warranty: "2 Year Samsung Warranty", deliveryInfo: "Free Delivery & Installation in Nairobi",
      specs: { display: '55" QLED 4K 120Hz', resolution: "3840x2160", hdr: "HDR10+", smartOs: "Tizen", hdmiPorts: "4x HDMI 2.1", audio: "40W 2.2ch" },
    },
    {
      name: "LG 55\" OLED C3 evo 4K Smart TV", slug: "lg-55-oled-c3-evo",
      model: "OLED55C3", variant: "55 inch / 4K",
      keyFeature: "Self-Lit OLED Pixels, 120Hz, Dolby Vision IQ",
      description: "Experience perfect blacks and infinite contrast with LG's self-lit OLED C3. The α9 AI Processor Gen6 optimises picture and sound automatically for every scene.",
      price: 125000, comparePrice: 148000, stock: 6, brand: "LG", sku: "LG-OC3-55-002",
      images: ["https://images.unsplash.com/photo-1461151304267-38535e596517?w=800&q=80"],
      featured: true, hotDeal: true, newArrival: false, onSale: true,
      condition: "new", warranty: "2 Year LG Warranty", deliveryInfo: "Free Delivery & Installation in Nairobi",
      specs: { display: '55" OLED evo 4K 120Hz', resolution: "3840x2160", hdr: "Dolby Vision IQ, HDR10, HLG", processor: "α9 AI Gen6", gaming: "NVIDIA G-Sync, FreeSync Premium", audio: "60W 4.2ch" },
    },
    {
      name: "Sony Bravia 43\" 4K LED Smart TV X75K", slug: "sony-bravia-43-x75k",
      model: "X75K Bravia", variant: "43 inch / 4K",
      keyFeature: "4K HDR, Google TV, Triluminos Pro",
      description: "Sony Bravia X75K brings 4K HDR with TRILUMINOS PRO display technology and Google TV for seamless access to all your favourite streaming services.",
      price: 58000, comparePrice: 68000, stock: 15, brand: "Sony", sku: "SNY-X75K43-003",
      images: ["https://images.unsplash.com/photo-1571415060716-baff5fe5f5a0?w=800&q=80"],
      featured: false, hotDeal: false, newArrival: true, onSale: true,
      condition: "new", warranty: "2 Year Sony Warranty", deliveryInfo: "Free Delivery & Installation in Nairobi",
      specs: { display: '43" 4K LED', resolution: "3840x2160", hdr: "HDR10, HLG, Dolby Vision", smartOs: "Google TV", hdmiPorts: "3x HDMI", audio: "20W 2.0ch" },
    },
    {
      name: "Hisense 65\" ULED 4K Smart TV U6K", slug: "hisense-65-uled-4k-u6k",
      model: "U6K ULED", variant: "65 inch / 4K",
      keyFeature: "ULED, Quantum Dot, 144Hz, VIDAA Smart TV",
      description: "Hisense U6K ULED TV combines Quantum Dot Colour, 144Hz smooth motion, and full-array local dimming for an incredible picture at a great price.",
      price: 72000, comparePrice: 85000, stock: 8, brand: "Hisense", sku: "HIS-U6K65-004",
      images: ["https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&q=80"],
      featured: false, hotDeal: true, newArrival: true, onSale: true,
      condition: "new", warranty: "2 Year Hisense Warranty", deliveryInfo: "Free Delivery & Installation in Nairobi",
      specs: { display: '65" ULED 4K 144Hz', resolution: "3840x2160", hdr: "Dolby Vision, HDR10+", smartOs: "VIDAA U7", dimming: "Full Array Local Dimming", audio: "40W Dolby Atmos" },
    },
  ];

  for (const p of tvProducts) {
    await prisma.product.upsert({
      where:  { slug: p.slug },
      update: { hotDeal: p.hotDeal, newArrival: p.newArrival, onSale: p.onSale, featured: p.featured },
      create: { ...p, categoryId: tvs.id },
    });
  }

  // ── Products – Gaming ────────────────────────────────────────────────────
  const gamingProducts = [
    {
      name: "PlayStation 5 Disc Edition Console", slug: "playstation-5-disc-edition",
      model: "PS5 Disc Edition", variant: "825GB SSD",
      keyFeature: "4K 120fps, DualSense Haptics, Ultra-HD Blu-ray",
      description: "PlayStation 5 delivers lightning-fast loading with its custom SSD, deeper immersion with the DualSense controller's haptic feedback, and stunning visuals up to 4K 120fps.",
      price: 68000, comparePrice: 78000, stock: 15, brand: "Sony", sku: "SNY-PS5-001",
      images: ["https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800&q=80"],
      featured: true, hotDeal: true, newArrival: false, onSale: true,
      condition: "new", warranty: "1 Year Sony Warranty", deliveryInfo: "Same Day Delivery in Nairobi",
      specs: { cpu: "AMD Zen 2 3.5GHz 8-core", gpu: "AMD RDNA 2, 10.28 TFLOPS", storage: "825GB Custom SSD", resolution: "Up to 8K", frameRate: "Up to 120fps", optical: "Ultra HD Blu-ray" },
    },
    {
      name: "Xbox Series X Console", slug: "xbox-series-x-console",
      model: "Xbox Series X", variant: "1TB SSD",
      keyFeature: "4K 120fps, Game Pass Ready, Quick Resume",
      description: "Xbox Series X is the fastest, most powerful Xbox ever. Enjoy 4K gaming at up to 120fps, Quick Resume for multiple games, and instant access to 100+ titles with Game Pass.",
      price: 65000, comparePrice: 75000, stock: 12, brand: "Microsoft", sku: "MSF-XBXS-002",
      images: ["https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=800&q=80"],
      featured: true, hotDeal: false, newArrival: true, onSale: true,
      condition: "new", warranty: "1 Year Microsoft Warranty", deliveryInfo: "Same Day Delivery in Nairobi",
      specs: { cpu: "AMD Zen 2 3.8GHz 8-core", gpu: "12 TFLOPS RDNA 2", storage: "1TB NVMe SSD", resolution: "Up to 8K", frameRate: "Up to 120fps", hdmi: "HDMI 2.1" },
    },
    {
      name: "Razer BlackShark V2 HyperSpeed Headset", slug: "razer-blackshark-v2-hyperspeed",
      model: "BlackShark V2 HyperSpeed", variant: "Black",
      keyFeature: "2.4GHz Wireless, THX Spatial Audio, 70hr Battery",
      description: "The BlackShark V2 HyperSpeed wireless gaming headset delivers crystal-clear audio via HyperSpeed wireless technology with a 70-hour battery and ultra-low latency for competitive gaming.",
      price: 8500, comparePrice: 11000, stock: 35, brand: "Razer", sku: "RAZ-BSV2-003",
      images: ["https://images.unsplash.com/photo-1599669454699-248893623440?w=800&q=80"],
      featured: false, hotDeal: true, newArrival: true, onSale: true,
      condition: "new", warranty: "2 Year Razer Warranty", deliveryInfo: "Same Day Delivery in Nairobi",
      specs: { driver: "50mm Custom-tuned", wireless: "HyperSpeed 2.4GHz", battery: "70 hours", microphone: "Detachable Cardioid", surround: "THX Spatial Audio", weight: "240g" },
    },
    {
      name: "Logitech G Pro X Superlight 2 Mouse", slug: "logitech-g-pro-x-superlight-2",
      model: "G Pro X Superlight 2", variant: "White",
      keyFeature: "60g Ultra-Light, HERO 2 25600 DPI, 95hr Battery",
      description: "The lightest PRO gaming mouse ever at just 60g. HERO 2 sensor delivers 25,600 DPI precision with zero smoothing for the most competitive edge.",
      price: 9800, comparePrice: 13500, stock: 20, brand: "Logitech", sku: "LOG-GPXSL2-004",
      images: ["https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80"],
      featured: false, hotDeal: false, newArrival: true, onSale: true,
      condition: "new", warranty: "2 Year Logitech Warranty", deliveryInfo: "Same Day Delivery in Nairobi",
      specs: { sensor: "HERO 2 25600 DPI", weight: "60g", wireless: "LIGHTSPEED 2.4GHz", battery: "95 hours", buttons: "5 programmable", connection: "USB-A receiver" },
    },
  ];

  for (const p of gamingProducts) {
    await prisma.product.upsert({
      where:  { slug: p.slug },
      update: { hotDeal: p.hotDeal, newArrival: p.newArrival, onSale: p.onSale, featured: p.featured },
      create: { ...p, categoryId: gaming.id },
    });
  }

  // ── Products – Cars ──────────────────────────────────────────────────────
  const carProducts = [
    {
      name: "Toyota Prado TX 2020 — 7 Seater", slug: "toyota-prado-tx-2020",
      model: "Prado TX", variant: "2020 / 2.7L Petrol / 7 Seater",
      keyFeature: "7 Seater, Leather Interior, Low Mileage",
      description: "2020 Toyota Prado TX with full leather interior, 7 seats, and sunroof. Japan-imported unit with low mileage. Perfect family SUV in Kenya with genuine warranty available.",
      price: 5800000, comparePrice: 6200000, stock: 2, brand: "Toyota", sku: "TOY-PRADO-TX-2020",
      images: ["https://images.unsplash.com/photo-1559416523-140ddc3d238c?w=800&q=80"],
      featured: true, hotDeal: true, newArrival: false, onSale: true,
      condition: "used", warranty: "3 Months Dealer Warranty", deliveryInfo: "Viewing at Nairobi Showroom",
      tags: ["cars", "suv", "toyota"],
      specs: { year: "2020", mileage: "38,000 km", engine: "2.7L 4-cylinder Petrol", transmission: "Automatic", fuel: "Petrol", seats: "7", color: "Pearl White", driveType: "4WD" },
    },
    {
      name: "Mazda Demio 2019 — 1.3L Petrol", slug: "mazda-demio-2019",
      model: "Demio", variant: "2019 / 1.3L Petrol / Hatchback",
      keyFeature: "Fuel Efficient, Low Mileage, Japan Import",
      description: "2019 Mazda Demio hatchback — the ideal city car in Kenya. Fuel-efficient 1.3L engine, push-start ignition, and reverse camera. Fresh import from Japan.",
      price: 1200000, comparePrice: 1350000, stock: 3, brand: "Mazda", sku: "MAZ-DEMIO-2019",
      images: ["https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&q=80"],
      featured: false, hotDeal: true, newArrival: true, onSale: true,
      condition: "used", warranty: "3 Months Dealer Warranty", deliveryInfo: "Viewing at Nairobi Showroom",
      tags: ["cars", "hatchback", "mazda"],
      specs: { year: "2019", mileage: "42,000 km", engine: "1.3L Petrol", transmission: "Automatic", fuel: "Petrol", seats: "5", color: "Silver", driveType: "2WD" },
    },
  ];

  for (const p of carProducts) {
    await prisma.product.upsert({
      where:  { slug: p.slug },
      update: { hotDeal: p.hotDeal, newArrival: p.newArrival, onSale: p.onSale, featured: p.featured },
      create: { ...p, categoryId: cars.id },
    });
  }

  console.log("✅ Products created");

  // ── Fake Orders (for admin dashboard metrics) ────────────────────────────
  // Fetch a handful of product IDs to use in order items
  const seedProducts = await prisma.product.findMany({
    select: { id: true, name: true, price: true, images: true },
    take: 12,
    orderBy: { createdAt: "asc" },
  });

  if (seedProducts.length > 0) {
    const p = seedProducts;
    const pick = (i: number) => p[i % p.length];

    const fakeOrders = [
      {
        orderNumber: "HNK-001001", status: "DELIVERED" as const,
        customerName: "James Mwangi", customerEmail: "james.mwangi@gmail.com", customerPhone: "+254712345678",
        paymentMethod: "mpesa", paymentStatus: "paid", mpesaRef: "RHE4X7Y2KL",
        shippingAddress: { name: "James Mwangi", phone: "+254712345678", line1: "Westlands Road", city: "Nairobi", county: "Nairobi" },
        items: [{ product: pick(0), qty: 1 }, { product: pick(3), qty: 2 }],
        shipping: 0, createdAt: new Date("2026-01-05"),
      },
      {
        orderNumber: "HNK-001002", status: "DELIVERED" as const,
        customerName: "Grace Njeri", customerEmail: "grace.njeri@yahoo.com", customerPhone: "+254723456789",
        paymentMethod: "mpesa", paymentStatus: "paid", mpesaRef: "QAB3N8P1ZT",
        shippingAddress: { name: "Grace Njeri", phone: "+254723456789", line1: "Kiambu Road", city: "Kiambu", county: "Kiambu" },
        items: [{ product: pick(1), qty: 1 }],
        shipping: 300, createdAt: new Date("2026-01-12"),
      },
      {
        orderNumber: "HNK-001003", status: "DELIVERED" as const,
        customerName: "Brian Otieno", customerEmail: "brian.otieno@gmail.com", customerPhone: "+254734567890",
        paymentMethod: "mpesa", paymentStatus: "paid", mpesaRef: "LMN5R2V8WC",
        shippingAddress: { name: "Brian Otieno", phone: "+254734567890", line1: "Oginga Odinga St", city: "Kisumu", county: "Kisumu" },
        items: [{ product: pick(4), qty: 1 }, { product: pick(7), qty: 1 }],
        shipping: 500, createdAt: new Date("2026-01-18"),
      },
      {
        orderNumber: "HNK-001004", status: "DELIVERED" as const,
        customerName: "Faith Wanjiku", customerEmail: "faith.w@gmail.com", customerPhone: "+254745678901",
        paymentMethod: "mpesa", paymentStatus: "paid", mpesaRef: "XPK7D4H9MB",
        shippingAddress: { name: "Faith Wanjiku", phone: "+254745678901", line1: "Thika Road", city: "Nairobi", county: "Nairobi" },
        items: [{ product: pick(2), qty: 1 }],
        shipping: 0, createdAt: new Date("2026-01-24"),
      },
      {
        orderNumber: "HNK-001005", status: "DELIVERED" as const,
        customerName: "Samuel Kamau", customerEmail: "sam.kamau@gmail.com", customerPhone: "+254756789012",
        paymentMethod: "mpesa", paymentStatus: "paid", mpesaRef: "YRT9S5J3NC",
        shippingAddress: { name: "Samuel Kamau", phone: "+254756789012", line1: "Ngong Road", city: "Nairobi", county: "Nairobi" },
        items: [{ product: pick(5), qty: 2 }, { product: pick(8), qty: 1 }],
        shipping: 0, createdAt: new Date("2026-02-03"),
      },
      {
        orderNumber: "HNK-001006", status: "DELIVERED" as const,
        customerName: "Esther Achieng", customerEmail: "esther.a@gmail.com", customerPhone: "+254767890123",
        paymentMethod: "mpesa", paymentStatus: "paid", mpesaRef: "ZKU2T6L4OD",
        shippingAddress: { name: "Esther Achieng", phone: "+254767890123", line1: "Moi Avenue", city: "Mombasa", county: "Mombasa" },
        items: [{ product: pick(6), qty: 1 }],
        shipping: 500, createdAt: new Date("2026-02-10"),
      },
      {
        orderNumber: "HNK-001007", status: "SHIPPED" as const,
        customerName: "Kevin Njoroge", customerEmail: "kevin.nj@gmail.com", customerPhone: "+254778901234",
        paymentMethod: "mpesa", paymentStatus: "paid", mpesaRef: "AVC4W7M5PE",
        shippingAddress: { name: "Kevin Njoroge", phone: "+254778901234", line1: "Haile Selassie Ave", city: "Nairobi", county: "Nairobi" },
        items: [{ product: pick(9), qty: 1 }, { product: pick(11), qty: 1 }],
        shipping: 0, createdAt: new Date("2026-02-18"),
      },
      {
        orderNumber: "HNK-001008", status: "SHIPPED" as const,
        customerName: "Diana Wambui", customerEmail: "diana.w@gmail.com", customerPhone: "+254789012345",
        paymentMethod: "mpesa", paymentStatus: "paid", mpesaRef: "BWX5Y8N6QF",
        shippingAddress: { name: "Diana Wambui", phone: "+254789012345", line1: "Kenyatta Ave", city: "Nairobi", county: "Nairobi" },
        items: [{ product: pick(0), qty: 1 }],
        shipping: 0, createdAt: new Date("2026-02-25"),
      },
      {
        orderNumber: "HNK-001009", status: "PROCESSING" as const,
        customerName: "Peter Mugo", customerEmail: "peter.mugo@gmail.com", customerPhone: "+254790123456",
        paymentMethod: "mpesa", paymentStatus: "paid", mpesaRef: "CRY6Z9O7RG",
        shippingAddress: { name: "Peter Mugo", phone: "+254790123456", line1: "Kimathi Street", city: "Nairobi", county: "Nairobi" },
        items: [{ product: pick(3), qty: 1 }, { product: pick(5), qty: 1 }],
        shipping: 0, createdAt: new Date("2026-03-04"),
      },
      {
        orderNumber: "HNK-001010", status: "PROCESSING" as const,
        customerName: "Lucy Chebet", customerEmail: "lucy.c@gmail.com", customerPhone: "+254701234567",
        paymentMethod: "mpesa", paymentStatus: "paid", mpesaRef: "DSA7A0P8SH",
        shippingAddress: { name: "Lucy Chebet", phone: "+254701234567", line1: "Eldoret Town", city: "Eldoret", county: "Uasin Gishu" },
        items: [{ product: pick(10), qty: 1 }],
        shipping: 700, createdAt: new Date("2026-03-09"),
      },
      {
        orderNumber: "HNK-001011", status: "CONFIRMED" as const,
        customerName: "Alex Omondi", customerEmail: "alex.omondi@gmail.com", customerPhone: "+254712345000",
        paymentMethod: "mpesa", paymentStatus: "paid", mpesaRef: "ETB8B1Q9TI",
        shippingAddress: { name: "Alex Omondi", phone: "+254712345000", line1: "Tom Mboya St", city: "Nairobi", county: "Nairobi" },
        items: [{ product: pick(1), qty: 1 }, { product: pick(4), qty: 1 }],
        shipping: 0, createdAt: new Date("2026-03-15"),
      },
      {
        orderNumber: "HNK-001012", status: "CONFIRMED" as const,
        customerName: "Mary Nyambura", customerEmail: "mary.ny@gmail.com", customerPhone: "+254723456000",
        paymentMethod: "mpesa", paymentStatus: "paid", mpesaRef: "FUC9C2R0UJ",
        shippingAddress: { name: "Mary Nyambura", phone: "+254723456000", line1: "Waiyaki Way", city: "Nairobi", county: "Nairobi" },
        items: [{ product: pick(6), qty: 2 }],
        shipping: 0, createdAt: new Date("2026-03-20"),
      },
      {
        orderNumber: "HNK-001013", status: "PENDING" as const,
        customerName: "John Kipchoge", customerEmail: "john.k@gmail.com", customerPhone: "+254734567000",
        paymentMethod: "mpesa", paymentStatus: "pending",
        shippingAddress: { name: "John Kipchoge", phone: "+254734567000", line1: "Eldoret Road", city: "Eldoret", county: "Uasin Gishu" },
        items: [{ product: pick(2), qty: 1 }],
        shipping: 700, createdAt: new Date("2026-03-28"),
      },
      {
        orderNumber: "HNK-001014", status: "CANCELLED" as const,
        customerName: "Rose Auma", customerEmail: "rose.auma@gmail.com", customerPhone: "+254745678000",
        paymentMethod: "mpesa", paymentStatus: "cancelled",
        shippingAddress: { name: "Rose Auma", phone: "+254745678000", line1: "Kisumu CBD", city: "Kisumu", county: "Kisumu" },
        items: [{ product: pick(8), qty: 1 }],
        shipping: 500, createdAt: new Date("2026-04-01"),
      },
      {
        orderNumber: "HNK-001015", status: "PENDING" as const,
        customerName: "Daniel Kimani", customerEmail: "dan.k@gmail.com", customerPhone: "+254756789000",
        paymentMethod: "mpesa", paymentStatus: "pending",
        shippingAddress: { name: "Daniel Kimani", phone: "+254756789000", line1: "Mombasa Road", city: "Nairobi", county: "Nairobi" },
        items: [{ product: pick(0), qty: 1 }, { product: pick(7), qty: 1 }],
        shipping: 0, createdAt: new Date("2026-04-20"),
      },
    ];

    for (const o of fakeOrders) {
      const subtotal = o.items.reduce((sum, i) => sum + i.product.price * i.qty, 0);
      const total = subtotal + o.shipping;

      const existing = await prisma.order.findUnique({ where: { orderNumber: o.orderNumber } });
      if (existing) continue;

      await prisma.order.create({
        data: {
          orderNumber:    o.orderNumber,
          status:         o.status,
          customerName:   o.customerName,
          customerEmail:  o.customerEmail,
          customerPhone:  o.customerPhone,
          paymentMethod:  o.paymentMethod,
          paymentStatus:  o.paymentStatus,
          mpesaRef:       (o as any).mpesaRef ?? null,
          shippingAddress: o.shippingAddress,
          subtotal,
          shipping:       o.shipping,
          total,
          createdAt:      o.createdAt,
          items: {
            create: o.items.map((i) => ({
              productId: i.product.id,
              name:      i.product.name,
              price:     i.product.price,
              quantity:  i.qty,
              image:     i.product.images[0] ?? null,
            })),
          },
        },
      });
    }

    console.log(`✅ Fake orders created (${fakeOrders.length})`);
  }

  console.log(`📦 Categories: 7 | Sub-categories: 14 | Sections: ${sections.length}`);
  console.log("🎉 Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
