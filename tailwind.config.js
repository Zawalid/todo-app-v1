const defaultTheme = require('tailwindcss/defaultTheme')
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#9C27B0",
        // Light Theme
        "light-background": "#FFFFFF",
        "light-secondary": "#E0E0E0",
        "light-text": "#333333",
        "light-text-2": "#777777",
        "light-correct": "#66BB6A",
        "light-incorrect": "#FF5733",
        // Dark Theme
        background: "#121212",
        secondary: "#333333",
        text: "#FFFFFF",
        "text-2": "#AAAAAA",
      },

    },
    screens: {
      'xs': '420px',
      ...defaultTheme.screens,
    },
  },
  plugins: [],
};
