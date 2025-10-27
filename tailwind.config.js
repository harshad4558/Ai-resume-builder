/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".hide-scrollbar": {
          "-ms-overflow-style": "none", /* IE and Edge */
          "scrollbar-width": "none", /* Firefox */
        },
        ".hide-scrollbar::-webkit-scrollbar": {
          display: "none", /* Chrome, Safari, Opera */
        },
      };
      addUtilities(newUtilities, ["responsive"]);
    },
  ],
};
