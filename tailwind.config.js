const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        focus: "#1c801c",
        background: "#090909",
        primary: {
          50: "#f5faf0",
          100: "#eaf5e1",
          200: "#c8e3b8",
          300: "#a5d192",
          400: "#61b053",
          500: "#228b22",
          600: "#1c801c",
          700: "#136913",
          800: "#0c540c",
          900: "#074007",
          950: "#032903",
          DEFAULT: "#228b22",
        },
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      prefix: "hassanah",
    }),
  ],
};
