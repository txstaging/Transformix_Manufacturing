import type { SiteConfig } from "@/types/site";

/** Section anchors shared by navigation and the sections that own them. */
export const SECTION_IDS = {
  home: "home",
  services: "services",
  process: "process",
  faq: "faq",
  contact: "contact",
} as const;

export const siteConfig: SiteConfig = {
  name: "TransformiX",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  title: "TransformiX | حلول رقمية تدعم كفاءة العمليات الصناعية",
  description:
    "تدعم TRANSFORMIX المصانع في تطوير عملياتها والاستفادة من التكنولوجيا، من خلال حلول رقمية عملية تشمل أنظمة MRP سهلة الاستخدام، وتحليل البيانات، والتحول الرقمي و الذكاء الاصطناعي",
  locale: "ar",
  logo: {
    default: "/images/logo.png",
    light: "/images/logo-light.png",
    alt: "TransformiX Digital Solution",
  },
  nav: [
    { label: "الرئيسية", href: `#${SECTION_IDS.home}` },
    { label: "الخدمات", href: `#${SECTION_IDS.services}` },
    { label: "تواصل معنا", href: `#${SECTION_IDS.contact}` },
  ],
  headerCta: { label: "ناقش احتياجات مصنعك", href: `#${SECTION_IDS.contact}` },
  contact: {
    email: "Info@thetransformix.com",
    phone: "+966567623953",
    locations: ["المملكة العربية السعودية ,جدة", "الامارات المتحدة,الشارقة"],
  },
  social: [
    { platform: "facebook", label: "Facebook", href: "#", icon: "/icons/facebook.svg" },
    { platform: "linkedin", label: "LinkedIn", href: "#", icon: "/icons/linkedin.svg" },
    { platform: "twitter", label: "X (Twitter)", href: "#", icon: "/icons/twitter.svg" },
  ],
  footer: {
    tagline: "دليلك الذكي لنمو شركتك",
    quickLinksTitle: "الروابط سريعة",
    quickLinks: [
      { label: "الرئسية", href: `#${SECTION_IDS.home}` },
      { label: "تواصل معنا", href: `#${SECTION_IDS.contact}` },
    ],
    contactTitle: "تواصل معنا",
    socialTitle: "تابعنا على",
    copyright: "جمع الحقوق محفوظة Transformix",
  },
};
