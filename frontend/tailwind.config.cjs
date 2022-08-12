/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        xdark: "#111827",
        xgray: "#1e2431",
        xmint: "#4ECCA3",
        xwhite: "#EEEEEE",
      },
      fontFamily: {
        roboto: "Roboto",
      },
    },
  },
  plugins: [],
};
