/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        abyss: '#020b14',
        biolum: '#00f3ff',
        toxic: '#39ff14',
        trench: '#0a001a',
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Roboto Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
