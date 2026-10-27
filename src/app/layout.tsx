import type { Metadata, Viewport } from "next";
import { Inter, Noto_Kufi_Arabic, Tajawal } from "next/font/google";
import type { ReactNode } from "react";
import { siteConfig } from "@/config/site";
import "@/styles/globals.css";
import { Providers } from "./providers";

const kufi = Noto_Kufi_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700"],
  variable: "--font-kufi",
  display: "swap",
});

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  variable: "--font-tajawal",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.title,
  description: siteConfig.description,
  applicationName: siteConfig.name,
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    locale: "ar_SA",
    type: "website",
    images: [{ url: siteConfig.logo.default, width: 2172, height: 724, alt: siteConfig.logo.alt }],
  },
};

export const viewport: Viewport = {
  themeColor: "#e87524",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang={siteConfig.locale} dir="rtl" className={`${kufi.variable} ${tajawal.variable} ${inter.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
