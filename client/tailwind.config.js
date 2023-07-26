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
      // d stands for dark
      // l stands for light
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
        "d-header": "rgba(55, 55, 55, 0.6)",

        "l-main": "rgb(242, 242, 242)",
        "l-secondary": "rgb(255, 255, 255)",
        "l-tertiary": "rgb(235, 235, 235)",
        "l-header": "rgba(255, 255, 255, 0.6)"
      },
      textColor: {
        "d-main": "rgb(220, 220, 230)",
        "d-secondary": "rgb(119, 119, 119)",

        "l-main": "rgb(0, 0, 0)",
        "l-secondary": "rgb(120, 130, 140)",
      },
      borderColor: {
        "d-main": "rgb(58, 58, 58)",
        "d-secondary": "rgb(75, 75, 75)",

        "l-main": "rgb(58, 58, 58)",
        "l-secondary": "rgb(75, 75, 75)",
      },
      colors: {
        "dark-blue": "rgb(8, 65, 120)",
        "blue": "rgb(8, 82, 155)",
        "light-blue": "rgb(12, 100, 185)",

        "dark-4xl-gray": "rgb(55, 55, 55)",
        "dark-3.5xl-gray": "rgb(62, 62, 62)",
        "dark-3xl-gray": "rgb(70, 70, 70)",
        "dark-2xl-gray": "rgb(85, 85, 85)",
        "dark-xl-gray": "rgb(100, 100, 100)",
        "dark-gray": "rgb(115, 115, 115)",

        "gray": "rgb(130, 130, 130)",

        "light-gray": "rgb(170, 170, 170)",
        "light-xl-gray": "rgb(185, 185, 185)",
        "light-2xl-gray": "rgb(200, 200, 200)",
        "light-3xl-gray": "rgb(215, 215, 215)",
        "light-3.5xl-gray": "rgb(223, 223, 223)",
        "light-4xl-gray": "rgb(230, 230, 230)"
      },
    },
  },
};
