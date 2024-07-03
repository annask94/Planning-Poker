import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      gridTemplateColumns: {
        "2fr-1fr": "2fr 1fr",
        "1fr-2fr-1fr": "1fr 5fr 3fr",
        "3fr-1fr": "3fr 1fr",
        "1fr-1fr": "1fr 1fr",
      },
    },
  },
  plugins: [],
};
export default config;
