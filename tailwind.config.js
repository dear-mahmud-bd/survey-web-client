/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customPurple1: '#8C3061',
        customPurple2: '#704264', 
        customPurple3: '#522258',
        customPurple4: '#49243E',
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

