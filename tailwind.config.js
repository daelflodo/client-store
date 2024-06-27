module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // Puedes activar el modo oscuro basado en una clase
  theme: {
    extend: {
      colors: {
        primary: {
          600: '#1D4ED8', // Define tu color personalizado aquí
          700: '#1E40AF',
          800: '#1E3A8A',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
