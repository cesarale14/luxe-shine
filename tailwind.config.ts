import type { Config } from "tailwindcss";

/**
 * Design tokens are the source of truth in src/app/globals.css (:root).
 * Tailwind mirrors them here so utilities stay in sync with the design direction.
 * See docs/luxe-shine/luxe-shine-design-direction.md §3–§7.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#FFFFFF",
        ivory: "#FAF7F2",
        sand: "#EFE9DF",
        line: "#E5DFD3",
        "line-hover": "#C9D3E0",
        navy: {
          900: "#10233F",
          700: "#1E3A5F",
          600: "#274B73",
        },
        ink: "#1C2B42",
        muted: "#5B6779",
        palm: "#3F6B54",
        "palm-tint": "#E9F0EB",
        brass: "#A98C5F",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      borderRadius: {
        btn: "8px",
        card: "12px",
      },
      maxWidth: {
        content: "1160px",
      },
      letterSpacing: {
        eyebrow: "0.08em",
      },
      spacing: {
        "section-mobile": "72px",
        "section-desktop": "120px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(16, 35, 63, 0.05)",
        "card-hover": "0 6px 20px rgba(16, 35, 63, 0.08)",
      },
      transitionTimingFunction: {
        "out-luxe": "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      transitionDuration: {
        ui: "180ms",
        reveal: "500ms",
      },
      fontSize: {
        eyebrow: ["0.75rem", { lineHeight: "1", letterSpacing: "0.08em" }],
      },
    },
  },
  plugins: [],
};

export default config;
