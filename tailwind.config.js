/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        dark: "rgb(28,36,49)",
        darker: "rgb(24,31,42)",
        darkest: "rgb(11,21,35)",
        blue: "rgb(32,42,60)",
        accent: "#3861FB",
        textDark: "#0D1421",
        textDarkGray: "#58667E",
        textGray: "#808A9D",
        ratinggreen: "#008000",
      },
    },
  },
  plugins: [],
};
