module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens : {
      'sm': {'max': '576px'},
      'md': {'max': '767.98px'},
      'lg': {'max': '991.98px'},
      'xl': {'max': '1199px'},
      '2xl': {'min': '1200px'},
    },
    extend: {},
  },
  plugins: [],
};
