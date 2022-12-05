module.exports = {
  darkmode: true,
  content: ["./index.html", "./src/**/*.{svelte,js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      label: ['"Segoeui"', "ui-sans-serif", "system-ui"],
    },

    extend: {
      backgroundImage: {
        "diag-pattern": "url('/diag-pattern.webp')",
      },
      backgroundSize: {
        "400p": "400px",
      },
    },
  },
  plugins: [],
};
