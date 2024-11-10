import {nextui} from "@nextui-org/react"

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#FFC0CB",
        "secondary": "#8A2BE2",
        "tertiary": "#9F89A9",
        "error": "#FF5449",
        "neutral": "#909093",
        "neutral-variant": "#8D9198"
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()],
}

