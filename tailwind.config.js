/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // CipherIt brand — derived from logo #9dfdcd
        brand: {
          DEFAULT: "#9dfdcd", // logo mint green
          deep:    "#3ae7b5", // logo stroke teal
          glow:    "#6effc0", // lighter highlight
          dim:     "#1a3d35", // dark tinted brand bg
          muted:   "#23564a", // subtle brand tint
        },
        // Page & surface backgrounds
        surface: {
          DEFAULT:      "#0a0c18", // deepest page bg
          card:         "#101320", // card bg
          "card-unread":"#131c38", // unread card bg
          overlay:      "#191d33", // subtle elevated layer
        },
        // Borders
        border: {
          DEFAULT: "#1e2240",
          active:  "#3a4680",
          brand:   "#9dfdcd33", // brand with opacity
        },
        // Text
        ink: {
          primary:   "#e2e8ff", // main headings
          secondary: "#9ca3c8", // subheadings
          muted:     "#585b7a", // timestamps, hints
          faint:     "#2a2d4a", // separators
        },
      },
    },
  },
  plugins: [],
};