/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'background': '#FFFFFF',
      },
    },
    fontSize: {
      sm: '0.8rem',
      base: '1rem',
      xl: '1.25rem',
      '8': '8px',
      '11': '11px',
      '14': '14px',
      '24': '24px',
      '26': '26px',
      '12': '12px',
      '13': '13px',
      '15': '15px',
      '16': '16px',
      '18': '18px',
      '32': '32px',
      '20': '20px',
      '22': '22px',
    },
    fontFamily: {
      'roboto': ['Roboto Mono'],
    },
  },
  plugins: [],
}

