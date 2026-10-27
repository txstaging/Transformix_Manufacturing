import type { CallToAction, NavLink } from "./content";

export type SocialPlatform = "facebook" | "linkedin" | "twitter";

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  href: string;
  icon: string;
}

export interface ContactDetails {
  email: string;
  phone: string;
  locations: readonly string[];
}

export interface SiteConfig {
  name: string;
  /** Canonical origin, used to resolve absolute Open Graph URLs. */
  url: string;
  title: string;
  description: string;
  locale: string;
  logo: {
    default: string;
    light: string;
    alt: string;
  };
  nav: readonly NavLink[];
  headerCta: CallToAction;
  contact: ContactDetails;
  social: readonly SocialLink[];
  footer: {
    tagline: string;
    quickLinksTitle: string;
    quickLinks: readonly NavLink[];
    contactTitle: string;
    socialTitle: string;
    copyright: string;
  };
}
