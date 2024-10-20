import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	screens: {
  		lg: '1135px',
  		xl: '1280px',
  		'2xl': '1536px',
  		'3xl': '1920px',
  		md: {
  			max: '1135px'
  		},
  		ml: {
  			max: '767px'
  		},
  		mp: {
  			max: '639px'
  		},
  		xs: {
  			max: '474px'
  		}
  	},
  	container: {
  		center: true
  	},
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {}
  	}
  },
  plugins: [
	  // eslint-disable-next-line @typescript-eslint/no-require-imports
	  require("tailwindcss-animate"),
  ],
};
export default config;
