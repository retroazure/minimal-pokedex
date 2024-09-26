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
        pokedexRed: "#FF4C4C", // Bright red
        pokedexDarkRed: "#D32F2F", // Keep the darker variant
        pokedexGradientStart: "#FF4C4C", // Brighter red
        pokedexGradientEnd: "#FF8A80", // Soft pink
        screenBackground: "#F4F4F9",
        buttonBlue: "#1E88E5",
        buttonBlueHover: "#1565C0",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;