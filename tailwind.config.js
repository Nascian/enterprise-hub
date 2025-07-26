/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  mode: 'jit',
  theme: {
    extend: {},
  },
  plugins: [],
  theme: {
    extend: {
      stroke: {
        'gray-500': '#6b7280', // Define stroke colors directly if needed
      },
    },
  },
  variants: {
    extend: {
      stroke: ['hover', 'focus'], // Enable additional states if required
    },
  },
}