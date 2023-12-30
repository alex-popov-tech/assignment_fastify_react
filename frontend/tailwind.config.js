/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        saira: ["Saira", "sans-serif"],
      },
      colors: {
        success: "#6FCF97",
        error: "#EB5757",
        warn: "#F2994A",
        placehelder: "#717171",
        darkgrey: "#696969",
        lightgrey: "#CBCACA",
        white: "#E8E8E8",
        border: "#C4C4C4",
      },
    },
  },
  plugins: [],
};
