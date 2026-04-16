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

  // Categories
  const laptops = await prisma.category.upsert({
    where: { slug: "laptops" },
    update: {},
    create: {
      name: "Laptops",
      slug: "laptops",
      description: "Gaming & Business laptops for every need",
      image:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80",
    },
  });

  const smartphones = await prisma.category.upsert({
    where: { slug: "smartphones" },
    update: {},
    create: {
      name: "Smartphones",
      slug: "smartphones",
      description: "Latest flagship and mid-range smartphones",
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80",
    },
  });

  const audio = await prisma.category.upsert({
    where: { slug: "audio" },
    update: {},
    create: {
      name: "Audio",
      slug: "audio",
      description: "Headphones, earbuds & speakers",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80",
    },
  });

  const accessories = await prisma.category.upsert({
    where: { slug: "accessories" },
    update: {},
    create: {
      name: "Accessories",
      slug: "accessories",
      description: "Powerbanks, cables & more",
      image:
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&q=80",
    },
  });

  console.log("✅ Categories created");

  // Products - Laptops
  const laptopProducts = [
    {
      name: "ASUS ROG Strix G16 Gaming Laptop",
      slug: "asus-rog-strix-g16-gaming",
      description:
        "Dominate every game with the ROG Strix G16 powered by AMD Ryzen 9 and NVIDIA RTX 4070. Features a 165Hz QHD display, RGB backlit keyboard, and advanced cooling system built for marathon gaming sessions.",
      price: 185000,
      comparePrice: 210000,
      stock: 12,
      brand: "ASUS",
      sku: "ASUS-ROG-G16-001",
      images: [
        "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&q=80",
        "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&q=80",
        "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&q=80",
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
      ],
      featured: true,
      specs: {
        processor: "AMD Ryzen 9 7945HX",
        gpu: "NVIDIA GeForce RTX 4070 8GB",
        ram: "16GB DDR5 4800MHz",
        storage: "1TB NVMe SSD",
        display: '16" QHD 165Hz IPS',
        battery: "90Wh",
        os: "Windows 11 Home",
        weight: "2.5kg",
        ports: "2x USB-A, 2x USB-C, HDMI 2.1, SD Card",
      },
    },
    {
      name: "Dell XPS 15 Business Laptop",
      slug: "dell-xps-15-business",
      description:
        "The Dell XPS 15 sets the standard for premium business laptops. With an Intel Core i7 processor, stunning OLED display, and all-day battery life, it's the perfect companion for professionals on the go.",
      price: 165000,
      comparePrice: 185000,
      stock: 8,
      brand: "Dell",
      sku: "DELL-XPS15-002",
      images: [
        "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&q=80",
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80",
        "https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=800&q=80",
        "https://images.unsplash.com/photo-1542393545-10f5cde2c810?w=800&q=80",
      ],
      featured: true,
      specs: {
        processor: "Intel Core i7-13700H",
        gpu: "NVIDIA GeForce RTX 4060 8GB",
        ram: "32GB DDR5",
        storage: "512GB NVMe SSD",
        display: '15.6" OLED 3.5K 120Hz',
        battery: "86Wh",
        os: "Windows 11 Pro",
        weight: "1.86kg",
        ports: "2x Thunderbolt 4, USB-A, SD Card Reader",
      },
    },
    {
      name: "Lenovo ThinkPad X1 Carbon",
      slug: "lenovo-thinkpad-x1-carbon",
      description:
        "The ultra-light ThinkPad X1 Carbon Gen 11 is engineered for business excellence. Military-grade durability meets premium performance in a chassis weighing just 1.12kg.",
      price: 145000,
      comparePrice: 160000,
      stock: 15,
      brand: "Lenovo",
      sku: "LEN-X1C-003",
      images: [
        "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&q=80",
        "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&q=80",
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
        "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&q=80",
      ],
      featured: false,
      specs: {
        processor: "Intel Core i7-1365U",
        gpu: "Intel Iris Xe Graphics",
        ram: "16GB LPDDR5",
        storage: "512GB SSD",
        display: '14" IPS 2.8K OLED',
        battery: "57Wh",
        os: "Windows 11 Pro",
        weight: "1.12kg",
        ports: "2x Thunderbolt 4, 2x USB-A, HDMI",
      },
    },
    {
      name: "MSI Raider GE78 HX Gaming Laptop",
      slug: "msi-raider-ge78-gaming",
      description:
        "Unleash extreme gaming power with MSI Raider GE78 HX featuring Intel Core i9 HX and RTX 4080. The per-key RGB keyboard and 240Hz QHD+ display make every session extraordinary.",
      price: 285000,
      comparePrice: 320000,
      stock: 5,
      brand: "MSI",
      sku: "MSI-GE78-004",
      images: [
        "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&q=80",
        "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&q=80",
        "https://images.unsplash.com/photo-1542393545-10f5cde2c810?w=800&q=80",
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80",
      ],
      featured: true,
      specs: {
        processor: "Intel Core i9-13980HX",
        gpu: "NVIDIA GeForce RTX 4080 12GB",
        ram: "32GB DDR5 5600MHz",
        storage: "2TB NVMe SSD (RAID 0)",
        display: '17.3" QHD+ 240Hz IPS',
        battery: "99.9Wh",
        os: "Windows 11 Home",
        weight: "3.1kg",
        ports: "3x USB-A, 2x USB-C, HDMI 2.1, SD Card, Ethernet",
      },
    },
    {
      name: "HP Spectre x360 14 Business",
      slug: "hp-spectre-x360-14",
      description:
        "The HP Spectre x360 14 is a stunning 2-in-1 convertible laptop for creative professionals. Flip it into tablet mode, draw with the included stylus, and enjoy the gorgeous OLED display.",
      price: 155000,
      comparePrice: 175000,
      stock: 10,
      brand: "HP",
      sku: "HP-SPX360-005",
      images: [
        "https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=800&q=80",
        "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&q=80",
        "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&q=80",
        "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&q=80",
      ],
      featured: false,
      specs: {
        processor: "Intel Core i7-1355U EVO",
        gpu: "Intel Iris Xe Graphics",
        ram: "16GB LPDDR5",
        storage: "1TB SSD",
        display: '13.5" OLED 2.8K 120Hz Touch',
        battery: "66Wh",
        os: "Windows 11 Home",
        weight: "1.36kg",
        ports: "2x Thunderbolt 4, USB-A, microSD",
      },
    },
  ];

  for (const product of laptopProducts) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: { ...product, categoryId: laptops.id },
    });
  }

  // Products - Smartphones
  const smartphoneProducts = [
    {
      name: "Samsung Galaxy S24 Ultra",
      slug: "samsung-galaxy-s24-ultra",
      description:
        "The Galaxy S24 Ultra redefines what a smartphone can do. With its built-in S Pen, 200MP camera, titanium frame, and 7 years of OS updates, it's the ultimate Android flagship for power users.",
      price: 135000,
      comparePrice: 148000,
      stock: 20,
      brand: "Samsung",
      sku: "SAM-S24U-001",
      images: [
        "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&q=80",
        "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800&q=80",
        "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=800&q=80",
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80",
      ],
      featured: true,
      specs: {
        display: '6.8" Dynamic AMOLED 2X, 120Hz',
        processor: "Snapdragon 8 Gen 3",
        ram: "12GB",
        storage: "256GB",
        rearCamera: "200MP + 12MP + 10MP + 10MP",
        frontCamera: "12MP",
        battery: "5000mAh, 45W Fast Charging",
        os: "Android 14, One UI 6.1",
        connectivity: "5G, Wi-Fi 7, Bluetooth 5.3, NFC",
        color: "Titanium Black",
      },
    },
    {
      name: "iPhone 15 Pro Max",
      slug: "iphone-15-pro-max",
      description:
        "iPhone 15 Pro Max with the A17 Pro chip, titanium design, and a 5x optical zoom camera. The Action button lets you customize your shortcuts while USB 3 delivers lightning-fast transfers.",
      price: 148000,
      comparePrice: 165000,
      stock: 18,
      brand: "Apple",
      sku: "APL-IP15PM-002",
      images: [
        "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&q=80",
        "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=800&q=80",
        "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800&q=80",
        "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&q=80",
      ],
      featured: true,
      specs: {
        display: '6.7" Super Retina XDR OLED, 120Hz ProMotion',
        processor: "Apple A17 Pro",
        ram: "8GB",
        storage: "256GB",
        rearCamera: "48MP Main + 12MP Ultra Wide + 12MP 5x Telephoto",
        frontCamera: "12MP TrueDepth",
        battery: "4422mAh, 27W Fast Charging",
        os: "iOS 17",
        connectivity: "5G, Wi-Fi 6E, Bluetooth 5.3, NFC, USB 3",
        color: "Black Titanium",
      },
    },
    {
      name: "Google Pixel 8 Pro",
      slug: "google-pixel-8-pro",
      description:
        "The Pixel 8 Pro brings the best of Google AI to your phone. Magic Eraser, Best Take, and Call Screen are just a few of the intelligent features powered by the Google Tensor G3 chip.",
      price: 95000,
      comparePrice: 110000,
      stock: 14,
      brand: "Google",
      sku: "GOO-P8P-003",
      images: [
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80",
        "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&q=80",
        "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800&q=80",
        "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=800&q=80",
      ],
      featured: false,
      specs: {
        display: '6.7" LTPO OLED, 1-120Hz',
        processor: "Google Tensor G3",
        ram: "12GB",
        storage: "128GB",
        rearCamera: "50MP + 48MP Ultra Wide + 48MP 5x Telephoto",
        frontCamera: "10.5MP",
        battery: "5050mAh, 30W Wired, 23W Wireless",
        os: "Android 14",
        connectivity: "5G, Wi-Fi 7, Bluetooth 5.3, NFC, UWB",
        color: "Obsidian",
      },
    },
    {
      name: "Samsung Galaxy A55 5G",
      slug: "samsung-galaxy-a55-5g",
      description:
        "Exceptional camera quality meets sleek design in the Galaxy A55. With Nightography technology and a 50MP camera, capture stunning shots in any condition without breaking the bank.",
      price: 55000,
      comparePrice: 62000,
      stock: 30,
      brand: "Samsung",
      sku: "SAM-A55-004",
      images: [
        "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800&q=80",
        "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&q=80",
        "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=800&q=80",
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80",
      ],
      featured: false,
      specs: {
        display: '6.6" Super AMOLED, 120Hz',
        processor: "Exynos 1480",
        ram: "8GB",
        storage: "128GB (expandable)",
        rearCamera: "50MP + 12MP + 5MP",
        frontCamera: "32MP",
        battery: "5000mAh, 25W Fast Charging",
        os: "Android 14, One UI 6.1",
        connectivity: "5G, Wi-Fi 6, Bluetooth 5.3, NFC",
        color: "Awesome Ice Blue",
      },
    },
  ];

  for (const product of smartphoneProducts) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: { ...product, categoryId: smartphones.id },
    });
  }

  // Products - Audio
  const audioProducts = [
    {
      name: "Sony WH-1000XM5 Wireless Headphones",
      slug: "sony-wh-1000xm5",
      description:
        "Industry-leading noise cancellation meets exceptional sound quality. The WH-1000XM5 with 8 microphones and HD Noise Cancelling Processor QN2 delivers unmatched silence anywhere you go.",
      price: 38000,
      comparePrice: 45000,
      stock: 25,
      brand: "Sony",
      sku: "SNY-WH1000XM5-001",
      images: [
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
        "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80",
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=80",
        "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=80",
      ],
      featured: true,
      specs: {
        type: "Over-ear",
        driver: "30mm",
        frequencyResponse: "4Hz-40,000Hz",
        noiseCancellation: "Active Noise Cancellation (ANC)",
        battery: "30 hours (ANC on), 40 hours (ANC off)",
        charging: "USB-C, 3 min = 3 hours playback",
        connectivity: "Bluetooth 5.2, NFC",
        codec: "SBC, AAC, LDAC",
        weight: "250g",
        microphone: "8 microphones for calls",
      },
    },
    {
      name: "Apple AirPods Pro (2nd Gen)",
      slug: "apple-airpods-pro-2nd-gen",
      description:
        "AirPods Pro feature the H2 chip for up to 2x more Active Noise Cancellation, Adaptive Audio, and Conversation Awareness. The MagSafe charging case adds precision finding.",
      price: 28000,
      comparePrice: 33000,
      stock: 35,
      brand: "Apple",
      sku: "APL-APPRO2-002",
      images: [
        "https://images.unsplash.com/photo-1606741965429-02919b2a6f28?w=800&q=80",
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
        "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80",
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=80",
      ],
      featured: false,
      specs: {
        type: "In-ear (True Wireless)",
        chip: "Apple H2",
        noiseCancellation: "Active Noise Cancellation, Transparency Mode",
        battery: "6 hours (earbuds), 30 hours (with case)",
        charging: "Lightning/USB-C, MagSafe, Qi",
        connectivity: "Bluetooth 5.3",
        codec: "AAC",
        waterResistance: "IP54 (earbuds), IP54 (case)",
        sensors: "Skin-detect, motion, pressure",
        spatialAudio: "Yes, with dynamic head tracking",
      },
    },
    {
      name: "JBL Charge 5 Portable Speaker",
      slug: "jbl-charge-5-portable-speaker",
      description:
        "The JBL Charge 5 delivers powerful JBL Pro Sound, a massive 7500mAh battery, and the ability to charge your devices. IP67 waterproof and dustproof for adventure-ready audio.",
      price: 14500,
      comparePrice: 18000,
      stock: 40,
      brand: "JBL",
      sku: "JBL-CHG5-003",
      images: [
        "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80",
        "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=80",
        "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80",
        "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=80",
      ],
      featured: true,
      specs: {
        type: "Portable Bluetooth Speaker",
        output: "40W RMS",
        frequencyResponse: "65Hz - 20kHz",
        battery: "7500mAh, 20 hours playtime",
        charging: "USB-C",
        connectivity: "Bluetooth 5.1",
        waterResistance: "IP67",
        dimensions: "218 x 95 x 92mm",
        weight: "960g",
        features: "PartyBoost, Powerbank, JBL Portable App",
      },
    },
    {
      name: "Bose QuietComfort Ultra Headphones",
      slug: "bose-quietcomfort-ultra",
      description:
        "The Bose QuietComfort Ultra Headphones feature world-class noise cancellation, immersive audio with Bose Immersive Audio, and CustomTune technology that personalizes the sound to your ear.",
      price: 48000,
      comparePrice: 55000,
      stock: 15,
      brand: "Bose",
      sku: "BOSE-QCUH-004",
      images: [
        "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=80",
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=80",
        "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80",
      ],
      featured: false,
      specs: {
        type: "Over-ear",
        noiseCancellation: "World-class ANC with Aware Mode",
        battery: "24 hours (Quiet Mode), 18 hours (Immersive Mode)",
        charging: "USB-C, 15 min = 2.5 hours",
        connectivity: "Bluetooth 5.3, 3.5mm",
        features: "Bose Immersive Audio, CustomTune, Multipoint",
        weight: "250g",
        microphone: "4-microphone array",
        codec: "SBC, AAC, aptX Adaptive",
      },
    },
  ];

  for (const product of audioProducts) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: { ...product, categoryId: audio.id },
    });
  }

  // Products - Accessories
  const accessoryProducts = [
    {
      name: "Anker 737 PowerBank 24000mAh",
      slug: "anker-737-powerbank-24000mah",
      description:
        "The Anker 737 PowerBank with 24,000mAh capacity and 140W total output can charge a MacBook Pro to 50% in 27 minutes. Smart display shows precise battery percentage and charge rate.",
      price: 12500,
      comparePrice: 15000,
      stock: 50,
      brand: "Anker",
      sku: "ANK-737PB-001",
      images: [
        "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&q=80",
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=80",
        "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=800&q=80",
        "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=800&q=80",
      ],
      featured: true,
      specs: {
        capacity: "24,000mAh / 88.8Wh",
        input: "140W USB-C",
        output: "140W USB-C (Port 1), 18W USB-C (Port 2), 22.5W USB-A",
        totalOutput: "140W max",
        cells: "Lithium Polymer",
        weight: "624g",
        dimensions: "163 x 73.5 x 26mm",
        display: "Smart LED display",
        passthrough: "Yes",
        certifications: "FCC, CE, RoHS",
      },
    },
    {
      name: "Baseus 65W USB-C GaN Charger",
      slug: "baseus-65w-gan-charger",
      description:
        "Ultra-compact Baseus GaN charger delivers 65W through 3 ports simultaneously. Charge laptop, phone, and earbuds at the same time — all from a charger smaller than a credit card.",
      price: 3500,
      comparePrice: 4500,
      stock: 80,
      brand: "Baseus",
      sku: "BAS-65GAN-002",
      images: [
        "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=800&q=80",
        "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&q=80",
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=80",
        "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=800&q=80",
      ],
      featured: false,
      specs: {
        technology: "GaN III",
        totalOutput: "65W",
        ports: "2x USB-C + 1x USB-A",
        protocols: "PD 3.0, QC 4+, SCP, AFC, Apple Fast Charge",
        input: "100-240V ~ 50/60Hz",
        dimensions: "48 x 48 x 28mm",
        weight: "114g",
        color: "White / Black",
        safetyFeatures: "OTP, OCP, OVP, Short Circuit Protection",
      },
    },
    {
      name: "Ugreen USB-C to USB-C Cable 240W",
      slug: "ugreen-usbc-240w-cable",
      description:
        "Future-proof your charging setup with this Ugreen 240W USB-C cable. Compatible with all USB PD 3.1 devices including the latest MacBooks and gaming laptops requiring high-wattage charging.",
      price: 1800,
      comparePrice: 2500,
      stock: 100,
      brand: "Ugreen",
      sku: "UGR-USBC240-003",
      images: [
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=80",
        "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=800&q=80",
        "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&q=80",
        "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=800&q=80",
      ],
      featured: false,
      specs: {
        standard: "USB 2.0, USB PD 3.1",
        maxPower: "240W (48V/5A)",
        dataTransfer: "480Mbps",
        length: "2 meters",
        material: "Nylon braided",
        connector: "USB-C to USB-C",
        compatibility: "MacBook, iPad, Samsung, Dell, ASUS, HP",
        certifications: "USB-IF Certified",
      },
    },
    {
      name: "Romoss Sense 20+ 20000mAh PowerBank",
      slug: "romoss-sense-20-powerbank",
      description:
        "The Romoss Sense 20+ offers 20,000mAh of capacity with 22.5W fast charging for phones and 18W PD for laptops. Built with dual input ports for faster recharging when you need it most.",
      price: 4500,
      comparePrice: 6000,
      stock: 60,
      brand: "Romoss",
      sku: "ROM-S20P-004",
      images: [
        "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=800&q=80",
        "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&q=80",
        "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=800&q=80",
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=80",
      ],
      featured: true,
      specs: {
        capacity: "20,000mAh / 72Wh",
        input: "18W USB-C + Micro USB",
        output: "22.5W USB-A (x2) + 18W USB-C",
        cells: "Li-Polymer",
        weight: "410g",
        dimensions: "159 x 74 x 22mm",
        display: "LED Indicator",
        safetyFeatures: "Over-charge, over-current, short circuit, temperature",
        compatibility: "iPhone, Samsung, MacBook Air, iPad",
      },
    },
    {
      name: "Sandisk 1TB Portable SSD",
      slug: "sandisk-1tb-portable-ssd",
      description:
        "Blazing-fast SSD speeds up to 800MB/s in a palm-sized, shockproof design. Transfer a 4K movie in seconds and take your entire digital life wherever you go.",
      price: 8500,
      comparePrice: 11000,
      stock: 30,
      brand: "SanDisk",
      sku: "SND-1TBSSD-005",
      images: [
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
        "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&q=80",
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=80",
        "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=800&q=80",
      ],
      featured: false,
      specs: {
        capacity: "1TB",
        readSpeed: "Up to 800MB/s",
        writeSpeed: "Up to 800MB/s",
        interface: "USB-C (USB 3.2 Gen 2)",
        dimensions: "97.6 x 44.8 x 8.9mm",
        weight: "39g",
        durability: "2m drop resistant, IP65",
        compatibility: "Mac, Windows, Android, USB-C devices",
        warranty: "5 years",
        encryption: "128-bit AES hardware",
      },
    },
  ];

  for (const product of accessoryProducts) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: { ...product, categoryId: accessories.id },
    });
  }

  console.log("✅ Products created");
  console.log(
    `📦 Total products: ${laptopProducts.length + smartphoneProducts.length + audioProducts.length + accessoryProducts.length}`
  );
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
