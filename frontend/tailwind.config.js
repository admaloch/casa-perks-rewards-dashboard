/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  safelist: [
    { pattern: /^bg-brand-/ },
    { pattern: /^text-brand-/ },
    { pattern: /^border-brand-/ },
    { pattern: /^from-brand-/ },
    { pattern: /^to-brand-/ },
    { pattern: /^ring-brand-/ },
    { pattern: /^hover:bg-brand-/ },
    { pattern: /^hover:border-brand-/ },
    { pattern: /^focus:ring-brand-/ },
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange:         '#f34926',
          'orange-dark':  '#d93d1a',
          darkred:        '#5f1f21',
          offwhite:       '#fef9f9',
          pink:           '#ffe3e4',
          salmon:         '#ff8b7c',
          green:          '#2f4b46',
          'light-purple': '#f8cfe5',
          'light-green':  '#dbebe7',
          'light-blue':   '#e2f0f2',
        }
      }
    }
  },
  plugins: [],
}
