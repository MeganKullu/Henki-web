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

export const metadata: Metadata = {
  title: {
    default: "Henki Electronics — Kenya's Premium Electronics Store",
    template: "%s | Henki Electronics",
  },
  description:
    "Shop the latest laptops, smartphones, audio gear, and accessories at Henki Electronics. Best prices in Kenya with M-Pesa payment.",
  keywords: [
    "electronics kenya",
    "laptops nairobi",
    "smartphones kenya",
    "buy electronics kenya",
    "henki electronics",
  ],
  openGraph: {
    type: "website",
    locale: "en_KE",
    siteName: "Henki Electronics",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${openSans.variable} h-full`}>
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
