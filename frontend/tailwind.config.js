/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4cc9f0',
          light: '#90e0ef',
          dark: '#0096c7',
        },
        secondary: {
          DEFAULT: '#f72585',
          light: '#ff85a1',
          dark: '#b5179e',
        },
        dark: {
          bg: '#1a1a2e',
          surface: '#16213e',
        },
        light: {
          bg: '#f8f9fa',
          surface: '#ffffff',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        heading: ['Montserrat', 'Poppins', 'ui-sans-serif', 'system-ui'],
      },
      boxShadow: {
        'card': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 10px 15px rgba(0, 0, 0, 0.1)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      height: {
        '128': '32rem',
      },
      lineClamp: {
        7: '7',
        8: '8',
      },
    },
  },
  plugins: [],
} 