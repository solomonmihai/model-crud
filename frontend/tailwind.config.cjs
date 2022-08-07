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
    },
  },
  plugins: [],
};
