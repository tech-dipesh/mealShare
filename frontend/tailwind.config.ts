import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#06b6d4',
        'brand': '#6B4EFF',
        'brand-dark': '#5A42D6',
        'brand-light': '#F9F9FB',
      },
    },
  },
  plugins: [],
}

export default config