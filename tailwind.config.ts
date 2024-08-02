import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        customGray: "#353634",
        customDarkGray: "#2b2b2b",
        customRed: "#e6324b",
        customPeach: "#ffc6a5",
        customBeige: "#f2e3c6",
      },
    },
  },
  plugins: [],
};

export default config;
