// tailwind.config.js
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "warm-clay": "#D78F62",
        "golden-mist": "#F2D2A9",
        "dusty-rose": "#E8A39C",
        "sage-green": "#B6B6A8",
        "sky-blue-gray": "#AFC9D9",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
