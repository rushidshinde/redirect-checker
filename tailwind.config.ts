import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'lg': '1135px',
      'xl': '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
      'md': {'max': '1135px'},
      'ml': {'max': '767px'},
      'mp': {'max': '639px'},
      'xs': {'max': '474px'},
    },
    container: {
      center: true,
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
export default config;
