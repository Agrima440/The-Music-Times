// tailwind.config.js
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {

      },
      backgroundImage: {
        // Custom gradient for the footer
        'footer-gradient': 'linear-gradient(to top, #1d4ed8, #F3F4F6)',
        'dark-gradient': 'linear-gradient(to top, #1d4ed8, #000)',
      },
      backgroundColor:{
        'main': '#F3F4F6',
        'dark': '#000',
      },
      fontSize: {
        'sm': '0.875rem',  // Equivalent to `text-sm`
        'lg': '1.125rem',  // Equivalent to `text-lg`
        'xl': '1.25rem',   // Equivalent to `fontSize="xl"`
      },
      spacing: {
        '80': '20rem',     // for custom min-width or other spacing needs
      },
      blue: {
        400: '#60a5fa',
        500: '#3b82f6',
        600: '#2563eb',
      },
      boxShadow: {
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.2)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
        'neon': '0 0 30px 5px #4299e1, 0 0 50px 10px #4299e1, inset 0 0 30px 5px #4299e1',
      },
      blur: {
        '3xl': '64px',
      },
      animation: {
        'flicker': 'flicker 3s linear infinite',
      },
      keyframes: {
        flicker: {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': {
            opacity: '0.99',
            filter: 'brightness(1)',
          },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': {
            opacity: '0.4',
            filter: 'brightness(0.3)',
          },
        },
      },
    },
  },
  plugins: [
  ],
};
