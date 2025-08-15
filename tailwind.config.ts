import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Professional Education Palette - Built around the ocean blue you love
        'oceanBlue': '#4a90a4',        // Primary - the blue you love!
        'darkOcean': '#3a7284',        // Darker version for headers
        'lightOcean': '#6ba4b8',       // Lighter version for backgrounds
        'warmBeige': '#f5f1eb',        // Soft beige background
        'creamyWhite': '#fefcf8',      // Warm white
        'richTaupe': '#8b7d6b',        // Sophisticated taupe
        'softBrown': '#a6937f',        // Warm brown for accents
        'deepNavy': '#2c3e50',         // Professional dark
        'lightGray': '#e8e6e3',        // Subtle gray
        'mediumGray': '#9b9b9b',       // Text gray
        'accentCoral': '#d4826e',      // Muted coral accent
        'accentGold': '#c9a961',       // Sophisticated gold
        // Keep some originals that work
        'coolGray': '#64748b',
        'forestMist': '#c9d5d5',
        'softSand': '#f2ece1',
        // Additional missing colors used in Teacher Portal
        'pineShadow': '#2d3319',       // Dark green for text
        'forestGreen': '#22c55e',      // Success green
        'mossGray': '#6b7280',         // Medium gray for secondary text
        'roseAccent': '#e11d48'        // Rose accent for highlights
      },
      backgroundImage: {
        'subtle-texture': `radial-gradient(
          circle at 20% 80%, rgba(74, 144, 164, 0.03) 1px, transparent 1px),
          radial-gradient(circle at 80% 20%, rgba(74, 144, 164, 0.02) 1px, transparent 1px),
          radial-gradient(circle at 40% 40%, rgba(212, 130, 110, 0.02) 1px, transparent 1px)`
      },
    },
  },
  plugins: [],
};
export default config;