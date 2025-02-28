import type { Config } from "tailwindcss";
import {nextui} from "@nextui-org/react";
import { url } from "inspector";


const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        aconcagua: "url(/images/aconcagua.JPG)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        dark: {
          colors: {
            primary: {
              DEFAULT: "#EF2F2D",
              foreground: "#FFFFFF",

            },
          },
        },
        light: {
          colors: {
            primary: {
              DEFAULT: "#EF2F2D",
              foreground: "#FFFFFF",

            },
          },
        },
      },
    }),
  ],
};
export default config;
