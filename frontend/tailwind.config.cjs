/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      xdark: "#232931",
      xgray: "#393E46",
      xmint: "#4ECCA3",
      xwhite: "#EEEEEE",
    },
    extend: {
      fontFamily: {
        roboto: "Roboto",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0%" },
          "100%": { opacity: "100%" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.3s ease",
      },
    },
  },
  plugins: [],
};
