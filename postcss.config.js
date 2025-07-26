// postcss.config.js
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {}, // ← ここが重要！
    autoprefixer: {},
  },
};
