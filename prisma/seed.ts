import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env" });
dotenv.config({ path: ".env.local" });

const connectionString = process.env.DATABASE_URL!;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

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
    { name: "Sedans",    slug: "sedans",    categoryId: cars.id },
    { name: "SUVs",      slug: "suvs",      categoryId: cars.id },
    { name: "Pickups",   slug: "pickups",   categoryId: cars.id },
    { name: "Hatchbacks", slug: "hatchbacks", categoryId: cars.id },
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
    { title: "Hot Deals",       slug: "hot-deals",    type: "hot_deal",    sortOrder: 1, maxItems: 8, showTabs: true  },
    { title: "New Arrivals",    slug: "new-arrivals", type: "new_arrival", sortOrder: 2, maxItems: 8, showTabs: false },
    { title: "Latest Laptops",  slug: "laptops-sec",  type: "category",    categorySlug: "laptops",     sortOrder: 3, maxItems: 8, showTabs: false },
    { title: "Top Smartphones", slug: "phones-sec",   type: "category",    categorySlug: "smartphones", sortOrder: 4, maxItems: 8, showTabs: false },
    { title: "Audio & Sound",   slug: "audio-sec",    type: "category",    categorySlug: "audio",       sortOrder: 5, maxItems: 8, showTabs: false },
    { title: "On Sale",         slug: "on-sale",      type: "on_sale",     sortOrder: 6, maxItems: 8, showTabs: false },
    { title: "Accessories",     slug: "accessories-sec", type: "category", categorySlug: "accessories", sortOrder: 7, maxItems: 8, showTabs: false },
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
      model: "ROG Strix G16",
      variant: "Ryzen 9 / RTX 4070 / 16GB / 1TB",
      keyFeature: "165Hz QHD, RGB Backlit",
      description: "Dominate every game with the ROG Strix G16 powered by AMD Ryzen 9 and NVIDIA RTX 4070. Features a 165Hz QHD display, RGB backlit keyboard, and advanced cooling system built for marathon gaming sessions.",
      price: 185000, comparePrice: 210000, stock: 12, brand: "ASUS", sku: "ASUS-ROG-G16-001",
      images: ["https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&q=80"],
      featured: true, hotDeal: true, newArrival: false, onSale: true,
      condition: "new", warranty: "1 Year Official ASUS Warranty",
      deliveryInfo: "Same Day Delivery in Nairobi",
      titleTemplate: "price_focus",
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
      condition: "new", warranty: "1 Year Dell Warranty",
      deliveryInfo: "Same Day Delivery in Nairobi",
      titleTemplate: "spec_focus",
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
      condition: "new", warranty: "1 Year Lenovo Warranty",
      deliveryInfo: "Next Day Delivery Nationwide",
      titleTemplate: "trust_focus",
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
      condition: "new", warranty: "2 Years MSI Warranty",
      deliveryInfo: "Same Day Delivery in Nairobi",
      titleTemplate: "spec_focus",
      specs: { processor: "Intel Core i9-13980HX", gpu: "NVIDIA GeForce RTX 4080 12GB", ram: "32GB DDR5", storage: "2TB NVMe SSD (RAID 0)", display: '17.3" QHD+ 240Hz', battery: "99.9Wh", os: "Windows 11 Home" },
    },
    {
      name: "HP Spectre x360 14 Business",
      slug: "hp-spectre-x360-14",
      model: "Spectre x360 14", variant: "i7 EVO / 16GB / 1TB",
      keyFeature: "2-in-1 Convertible, OLED Touch",
      description: "The HP Spectre x360 14 is a stunning 2-in-1 convertible laptop for creative professionals. Flip it into tablet mode and enjoy the gorgeous OLED display.",
      price: 155000, comparePrice: 175000, stock: 10, brand: "HP", sku: "HP-SPX360-005",
      images: ["https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=800&q=80"],
      featured: false, hotDeal: false, newArrival: true, onSale: true,
      condition: "new", warranty: "1 Year HP Warranty",
      deliveryInfo: "Same Day Delivery in Nairobi",
      titleTemplate: "price_focus",
      specs: { processor: "Intel Core i7-1355U EVO", gpu: "Intel Iris Xe", ram: "16GB LPDDR5", storage: "1TB SSD", display: '13.5" OLED 2.8K 120Hz Touch', battery: "66Wh", os: "Windows 11 Home" },
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
      condition: "new", warranty: "1 Year Samsung Warranty",
      deliveryInfo: "Same Day Delivery in Nairobi",
      titleTemplate: "price_focus",
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
      condition: "new", warranty: "1 Year Apple Warranty",
      deliveryInfo: "Same Day Delivery in Nairobi",
      titleTemplate: "trust_focus",
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
      condition: "new", warranty: "1 Year Google Warranty",
      deliveryInfo: "Next Day Delivery Nationwide",
      titleTemplate: "price_focus",
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
      condition: "new", warranty: "1 Year Samsung Warranty",
      deliveryInfo: "Same Day Delivery in Nairobi",
      titleTemplate: "price_focus",
      specs: { display: '6.6" Super AMOLED 120Hz', processor: "Exynos 1480", ram: "8GB", storage: "128GB (expandable)", rearCamera: "50MP + 12MP + 5MP", battery: "5000mAh, 25W", os: "Android 14" },
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
      condition: "new", warranty: "1 Year Sony Warranty",
      deliveryInfo: "Same Day Delivery in Nairobi",
      titleTemplate: "price_focus",
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
      condition: "new", warranty: "1 Year Apple Warranty",
      deliveryInfo: "Same Day Delivery in Nairobi",
      titleTemplate: "trust_focus",
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
      condition: "new", warranty: "1 Year JBL Warranty",
      deliveryInfo: "Same Day Delivery in Nairobi",
      titleTemplate: "price_focus",
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
      condition: "new", warranty: "1 Year Bose Warranty",
      deliveryInfo: "Next Day Delivery Nationwide",
      titleTemplate: "spec_focus",
      specs: { noiseCancellation: "World-class ANC + Aware Mode", battery: "24 hours Quiet Mode", charging: "USB-C, 15min = 2.5hrs", connectivity: "Bluetooth 5.3", weight: "250g" },
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
      condition: "new", warranty: "18 Month Anker Warranty",
      deliveryInfo: "Same Day Delivery in Nairobi",
      titleTemplate: "spec_focus",
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
      condition: "new", warranty: "1 Year Baseus Warranty",
      deliveryInfo: "Same Day Delivery in Nairobi",
      titleTemplate: "price_focus",
      specs: { technology: "GaN III", totalOutput: "65W", ports: "2x USB-C + 1x USB-A" },
    },
    {
      name: "SanDisk 1TB Portable SSD", slug: "sandisk-1tb-portable-ssd",
      model: "Portable SSD", variant: "1TB",
      keyFeature: "800MB/s, IP65 Shockproof, Pocket-Sized",
      description: "Blazing-fast SSD speeds up to 800MB/s in a palm-sized, shockproof design. Transfer a 4K movie in seconds and take your entire digital life wherever you go.",
      price: 8500, comparePrice: 11000, stock: 30, brand: "SanDisk", sku: "SND-1TBSSD-005",
      images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"],
      featured: false, hotDeal: false, newArrival: true, onSale: true,
      condition: "new", warranty: "5 Year SanDisk Warranty",
      deliveryInfo: "Same Day Delivery in Nairobi",
      titleTemplate: "spec_focus",
      specs: { capacity: "1TB", readSpeed: "800MB/s", interface: "USB-C 3.2 Gen 2", durability: "2m drop, IP65" },
    },
  ];

  for (const p of accessoryProducts) {
    await prisma.product.upsert({
      where:  { slug: p.slug },
      update: { hotDeal: p.hotDeal, newArrival: p.newArrival, onSale: p.onSale, featured: p.featured },
      create: { ...p, categoryId: accessories.id },
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
      condition: "used", warranty: "3 Months Dealer Warranty",
      deliveryInfo: "Viewing at Nairobi Showroom",
      titleTemplate: "price_focus",
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
      condition: "used", warranty: "3 Months Dealer Warranty",
      deliveryInfo: "Viewing at Nairobi Showroom",
      titleTemplate: "price_focus",
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
