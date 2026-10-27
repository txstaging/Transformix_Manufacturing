/** Shared content models. Every section renders from these typed shapes. */

export interface NavLink {
  label: string;
  href: string;
}

export interface CallToAction {
  label: string;
  href: string;
}

export interface SectionIntro {
  title: string;
  subtitle: string;
}

export interface HeroContent extends SectionIntro {
  primaryCta: CallToAction;
  secondaryCta: CallToAction;
  /** Floating annotations around the dashboard mockup. */
  annotations: {
    operations: string;
    mrp: string;
    analytics: string;
  };
}

export interface SolutionItem {
  title: string;
  description: string;
}

export interface SolutionsContent extends SectionIntro {
  cta: CallToAction;
  mrp: SolutionItem;
  analytics: SolutionItem;
  digital: SolutionItem;
}

export interface ProcessContent {
  title: string;
  /** Ordered from the first step (bottom layer) to the last (top layer). */
  steps: readonly [string, string, string, string, string];
}

export interface ChallengesContent extends SectionIntro {
  cta: CallToAction;
  comparison: {
    beforeAlt: string;
    afterAlt: string;
    handleLabel: string;
  };
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqContent extends SectionIntro {
  items: readonly FaqItem[];
}

export interface CtaContent extends SectionIntro {
  action: CallToAction;
}

export interface Testimonial {
  id: string;
  author: string;
  quote: string;
  avatar: {
    src: string;
    /** Rendered avatar edge in px (Figma uses 47.712 and 43). */
    size: number;
  };
  rating: {
    value: number;
    image: string;
  };
}

export interface TestimonialsContent {
  title: string;
  items: readonly Testimonial[];
}
