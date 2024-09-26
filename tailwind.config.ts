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
        pokedexRed: "#FF3E3E",
        pokedexDarkRed: "#D32F2F",
        pokedexGradientStart: "#FF3E3E",
        pokedexGradientEnd: "#E53935",
        screenBackground: "#F4F4F9",
        buttonBlue: "#1E88E5",
        buttonBlueHover: "#1565C0",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;