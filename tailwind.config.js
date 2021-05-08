module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fill: (theme) => ({
      green: theme("colors.green.500"),
    }),
    extend: {},
  },
  variants: {
    extend: {
      opacity: ["disabled"],
      fill: ["hover"],
    },
  },
  plugins: [],
};
