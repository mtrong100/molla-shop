const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "slide-1": "url('./src/assets/slides/slide-1.jpg')",
        "slide-2": "url('./src/assets/slides/slide-2.jpg')",
        "banner-1": "url('./src/assets/banners/banner-1.jpg')",
        "banner-2": "url('./src/assets/banners/banner-2.jpg')",
        "banner-3": "url('./src/assets/banners/banner-3.jpg')",
      },
    },
  },
  plugins: [],
});
