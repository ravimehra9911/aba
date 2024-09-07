/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      // sm: '480px',
      // md: '768px',
      // lg: '1024px',
      // xl: '1440px',
      // xxl: '1600px',
      sm: '540px',
      md: '768px',
      lg: '960px',
      xl: '1140px',
      xxl: '1320px',
      xxxl: '1550px',
    },
    colors: {
      yellowColor: '#FDFADB',
      yellowColorDark: '#F5EBAC',
      blackColor: '#2C2E31',
      whiteColor: '#FFFCFC',
      black: '#000000',
      blue: '#DCE6F5',
      green: '#DCEDD7',
      grey10: 'rgba(105, 106, 108, 0.1);',
      red: '#FF0000',
    },
    extend: {
      fontFamily: {
        primary: 'SpaceMono',
        secondary: 'InterstateRegular',
        secondaryLight: 'InterstateLight',
      },
      backgroundImage: {
        landingLogo: "url('../public/assets/images/aba-logo-landing.png')",
        landingGif: "url('../public/assets/images/landing-main.gif')",
      },
    },
  },
  plugins: [],
};
