/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "./src/assets/css/output.css"],
  theme: {
    extend: {
      fontFamily: {
        cinzel: ["Cinzel Decorative", "serif"], // Cinzel Decorative font
        dancing: ["Dancing Script", "cursive"], // Dancing Script font
        inter: ["Inter", "sans-serif"], // Inter font
      },
      colors: {
        primary: "#FBFBFB",
        secondary: "#222222",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      "light",
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
      "dim",
      "nord",
      "sunset",
    ],
  }, // Use daisyui without additional options
};
