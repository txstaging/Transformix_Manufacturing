import type { Config } from "tailwindcss";

/**
 * Design tokens extracted from the Figma file (transformix-2 › Desktop - 2).
 * Raw values live as CSS variables in `src/styles/globals.css`; this file maps
 * them to Tailwind utilities so components never hardcode brand values.
 *
 * Loaded by Tailwind v4 through the `@config` directive in globals.css.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "var(--tx-brand-orange)", // Brand/Industrial orange
          deep: "var(--tx-brand-deep)", // Brand/Deep orange
          accent: "var(--tx-brand-accent)", // manfaction
          ember: "var(--tx-brand-ember)",
          rust: "var(--tx-brand-rust)",
          umber: "var(--tx-brand-umber)",
          peach: "var(--tx-brand-peach)",
          blush: "var(--tx-brand-blush)",
          edge: "var(--tx-brand-edge)",
        },
        ink: {
          primary: "var(--tx-ink-primary)", // Text primary
          secondary: "var(--tx-ink-secondary)", // Text secondary
          heading: "var(--tx-ink-heading)",
          strong: "var(--tx-ink-strong)", // gray/900
          inverse: "var(--tx-ink-inverse)", // Text inverse
          mock: "var(--tx-ink-mock)",
        },
        surface: {
          DEFAULT: "var(--tx-surface)", // background/main
          neutral: "var(--tx-surface-neutral)", // Neutral/100
          lavender: "var(--tx-surface-lavender)", // Foundation/Blue/Light
          snow: "var(--tx-surface-snow)", // Foundation/White/Normal
          cream: "var(--tx-surface-cream)", // Foundation/Yellow/Light
        },
        line: {
          DEFAULT: "var(--tx-line)",
          soft: "var(--tx-line-soft)",
          dot: "var(--tx-line-dot)",
          mist: "var(--tx-line-mist)",
        },
        // Illustration palette used only inside the miniature product mockups.
        mock: {
          ink: "#0b0b22",
          muted: "#888888",
          faint: "#999999",
          subtle: "#aaaaaa",
          border: "#eeeeee",
          panel: "#fafafa",
          indigo: "#6576ff",
          mint: "#65d292",
          periwinkle: "#7a9ffa",
          lilac: "#f3f2fc",
          green: "#61bd83",
        },
        success: "var(--tx-success)", // Green
        amber: "var(--tx-amber)", // amber/500
        third: "var(--tx-third)",
      },
      fontFamily: {
        kufi: ["var(--font-kufi)", "Tahoma", "sans-serif"],
        tajawal: ["var(--font-tajawal)", "Tahoma", "sans-serif"],
        inter: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      // Fluid type: each token reaches its exact Figma size at >= 1280px.
      fontSize: {
        display: ["clamp(28px, 23.03px + 1.326vw, 40px)", { lineHeight: "normal" }], // H1/H2/H3 · 40px
        headline: ["clamp(20px, 15.03px + 1.326vw, 32px)", { lineHeight: "normal" }], // 32px
        title: ["clamp(18px, 15.51px + 0.663vw, 24px)", { lineHeight: "normal" }], // H4 · 24px
        lead: ["clamp(16px, 15.17px + 0.221vw, 18px)", { lineHeight: "normal" }], // H4 · 18px
        action: ["clamp(18px, 17.17px + 0.221vw, 20px)", { lineHeight: "normal" }], // 20px
        caption: ["14px", { lineHeight: "normal" }], // SMALL TEXT · 14px
      },
      borderRadius: {
        card: "14px",
        dashboard: "19px",
        panel: "20px",
        feature: "32px",
        button: "32px",
        "button-lg": "45px",
        review: "47.647px",
        tag: "92px",
      },
      boxShadow: {
        "widget-ring": "0 0 0 8px rgba(255,255,255,0.38), 0 0 0 17px rgba(255,255,255,0.19)",
        "panel-ring": "0 0 0 13px rgba(255,255,255,0.33)",
        "cta-button": "0 0.915px 2.744px 0 rgba(0,0,0,0.2), inset 0 3.658px 1.829px 0 rgba(255,255,255,0.8)",
        review:
          "0 520px 146px 0 rgba(255,255,255,0), 0 333px 133px 0 rgba(255,255,255,0.01), 0 187px 112px 0 rgba(255,255,255,0.05), 0 83px 83px 0 rgba(255,255,255,0.09), 0 21px 46px 0 rgba(241,227,227,0.1)",
        lift: "0 18px 40px -18px rgba(168,82,20,0.35)",
      },
      backgroundImage: {
        "hero-veil":
          "linear-gradient(to bottom, rgba(255,255,255,0.2), rgba(123,123,123,0.2) 51.813%, rgba(0,0,0,0.2))",
        "cta-sweep": "linear-gradient(to left, var(--tx-brand-orange), var(--tx-brand-ember))",
        "card-peach": "linear-gradient(to bottom, rgba(247,223,206,0.48), #fdfdfd)",
        "card-sand": "linear-gradient(to bottom, #f9eee6, #fafbfa)",
        "card-dune": "linear-gradient(to bottom, #f9efe8, #fafbfa)",
        "deals-fade": "linear-gradient(to bottom, #dce2fb, #ffffff)",
        "bar-orange":
          "linear-gradient(0deg, rgb(232,117,36) 0%, rgb(196,106,43) 32%, rgba(232,117,36,0.71) 32%, rgba(232,117,36,0.67) 55%, rgba(232,117,36,0.55) 55%, rgba(232,117,36,0.33) 80%, rgba(232,117,36,0.2) 80%)",
        "bar-blue":
          "linear-gradient(0deg, rgb(49,75,122) 0%, rgb(49,75,122) 32%, rgb(96,125,245) 32%, rgb(96,125,245) 55%, rgb(138,170,250) 55%, rgb(138,170,250) 80%, rgb(213,225,255) 80%)",
        "bar-idle":
          "repeating-linear-gradient(25deg, rgb(238,238,238) 0 6.5423%, rgb(250,250,250) 6.5423% 14.72%)",
      },
      maxWidth: {
        content: "1240px",
        header: "1194px",
      },
      transitionTimingFunction: {
        "out-soft": "cubic-bezier(0, 0, 0.2, 1)",
      },
    },
  },
};

export default config;
