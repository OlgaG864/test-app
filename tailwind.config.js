/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        main: "#171717",
        second: "#272727",
        "dark-subtle": "rgba(255,255,255,0.5)",
        "light-subtle": "rgba(39,39,39,0.5)",
      },
    },
  },
  plugins: [],
};
