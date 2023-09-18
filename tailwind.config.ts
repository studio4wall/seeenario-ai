import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      backgroundColor: {
        'background': 'var(--background)',
        'primary': 'var(--primary)',


      },
      height: {
        'screen-with-nav': 'calc(100vh - var(--navbar-height) - var(--footer-height))',
        'navbar-height': 'var(--navbar-height)',
      }
    },
  },
  plugins: [],
}
export default config
