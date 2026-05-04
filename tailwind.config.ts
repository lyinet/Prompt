import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-serif)", "Tiempos Headline", "Georgia", "serif"],
        sans: [
          "var(--font-inter)",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
      },
      colors: {
        // Anthropic-style warm ivory surfaces
        ivory: {
          50: "#FAF9F5",
          100: "#F5F4ED",
          200: "#EFEDE3",
          300: "#E8E6DC",
          400: "#DAD7CD",
        },
        // Editorial ink scale for text
        ink: {
          900: "#191919",
          800: "#1F1E1D",
          700: "#3D3929",
          600: "#5C5A52",
          500: "#6B6862",
          400: "#8D8C85",
          300: "#B5B2A8",
        },
        // Anthropic clay / coral accent
        clay: {
          50: "#FBF1E9",
          100: "#F1E4DA",
          200: "#E8C9B3",
          500: "#CC785C",
          600: "#C15F3C",
          700: "#A04E30",
          800: "#7E3D26",
        },
      },
      letterSpacing: {
        tightish: "-0.015em",
        editorial: "-0.025em",
      },
      borderRadius: {
        card: "14px",
      },
    },
  },
  plugins: [],
} satisfies Config;
