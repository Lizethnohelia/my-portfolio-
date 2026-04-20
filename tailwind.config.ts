import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        surface: "var(--surface)",
        border: "var(--border)",
        muted: "var(--muted)",
        gray: "var(--gray)",
      },
      keyframes: {
        drawX: {
          "0%": { transform: "scaleX(0)", opacity: "0" },
          "60%": { opacity: "0.9" },
          "100%": { transform: "scaleX(1)", opacity: "0.75" },
        },
        drawY: {
          "0%": { transform: "scaleY(0)", opacity: "0" },
          "60%": { opacity: "0.9" },
          "100%": { transform: "scaleY(1)", opacity: "0.75" },
        },
        shimmer: {
          "0%": { opacity: "0" },
          "30%": { opacity: "0.25" },
          "100%": { opacity: "0" },
        },
      },
      animation: {
        drawX: "drawX 800ms cubic-bezier(.22,.61,.36,1) forwards",
        drawY: "drawY 900ms cubic-bezier(.22,.61,.36,1) forwards",
        shimmer: "shimmer 900ms ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;