// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./src/**/*.{js,jsx,ts,tsx}", // Inclut tous les fichiers JS et JSX dans le dossier src
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#fbbf24', // Couleur principale : un jaune chaud
        secondary: '#3b82f6', // Bleu
        accent: '#10b981', // Vert accent
        dark: '#111827', // Couleur sombre
        light: '#f3f4f6', // Fond clair
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'], // Police moderne
      },
    },
  },
  plugins: [],
}
