/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [],
  theme: {
    extend: {
      padding: {
        global: "15px",
        "global-sm": "30px",
      },
      maxWidth: {
        global: "768px",
      },
      backgroundColor: {
        "d-main": "rgb(20, 20, 20)",
        "d-secondary": "rgb(31, 31, 31)",
        "d-tertiary": "rgb(58, 58, 58)",
      },
      textColor: {
        "d-main": "rgb(220, 220, 230)",
        "d-secondary": "rgb(119, 119, 119)",
      },
      borderColor: {
        "d-main": "rgb(58, 58, 58)",
        "d-secondary": "rgb(75, 75, 75)",
      },
      colors: {
        "light-blue": "rgb(98, 160, 230)",
        "dark-xl-gray": "rgb(90, 90, 90)",
        "dark-gray": "rgb(115, 115, 115)",
        gray: "rgb(136, 136, 136)",
        "light-gray": "rgb(169, 169, 169)",
      },
    },
  },
};
