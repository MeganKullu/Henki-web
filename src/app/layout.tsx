import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  weight: ["300", "400", "600", "700", "800"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://henkielectronics.co.ke";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Henki Electronics — Best Electronics Prices in Kenya | Nairobi",
    template: "%s | Henki Electronics Kenya",
  },
  description:
    "Shop laptops, smartphones, audio gear, TVs and accessories at Henki Electronics. Best prices in Kenya, M-Pesa accepted. Free delivery in Nairobi. Genuine products with warranty.",
  keywords: [
    "electronics kenya",
    "buy laptop nairobi",
    "smartphones kenya prices",
    "cheap electronics nairobi",
    "buy iphone kenya",
    "samsung phone kenya",
    "laptop prices kenya",
    "electronics shop nairobi",
    "mpesa electronics",
    "genuine electronics kenya",
    "henki electronics",
    "buy headphones kenya",
    "gaming laptop kenya",
    "powerbank kenya",
    "accessories nairobi",
  ],
  authors: [{ name: "Henki Electronics" }],
  creator: "Henki Electronics",
  publisher: "Henki Electronics",
  formatDetection: { telephone: true, email: true, address: true },
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: SITE_URL,
    siteName: "Henki Electronics",
    title: "Henki Electronics — Best Electronics Prices in Kenya",
    description:
      "Kenya's premium electronics store. Laptops, smartphones, audio gear & accessories. M-Pesa accepted. Nairobi delivery.",
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Henki Electronics — Kenya's Premium Electronics Store",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Henki Electronics — Best Electronics Prices in Kenya",
    description: "Laptops, smartphones, audio & accessories. M-Pesa accepted. Nairobi delivery.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: {
    canonical: SITE_URL,
  },
  verification: {
    // Add your Google Search Console verification token here
    // google: "your-token",
  },
};

// JSON-LD: Organization + WebSite + LocalBusiness
const orgSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Henki Electronics",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+254700000000",
        contactType: "customer service",
        areaServed: "KE",
        availableLanguage: "English",
      },
      sameAs: [
        "https://www.facebook.com/henkielectronics",
        "https://twitter.com/henkielectronics",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Henki Electronics",
      publisher: { "@id": `${SITE_URL}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_URL}/products?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#localbusiness`,
      name: "Henki Electronics",
      image: `${SITE_URL}/og-image.jpg`,
      telephone: "+254700000000",
      email: "support@henkielectronics.co.ke",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Westlands",
        addressLocality: "Nairobi",
        addressCountry: "KE",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: "-1.2921",
        longitude: "36.8219",
      },
      url: SITE_URL,
      priceRange: "KSh 999 – KSh 500,000",
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "08:00",
          closes: "18:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: "Saturday",
          opens: "09:00",
          closes: "16:00",
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-KE" className={`${openSans.variable} h-full`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-[#333e48] antialiased">
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#333e48",
              color: "#fff",
              borderRadius: "4px",
              fontWeight: "500",
              fontSize: "14px",
            },
            success: {
              iconTheme: { primary: "#fed700", secondary: "#333e48" },
            },
          }}
        />
      </body>
    </html>
  );
}
