/** @type {import('tailwindcss').Config} */
import flowbitePlugin from 'flowbite/plugin'
export default {
  content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'],
  theme: {
    colors: {
       // flowbite-svelte
       primary: {
        50: '#FFF5F2',
        100: '#FFF1EE',
        200: '#FFE4DE',
        300: '#FFD5CC',
        400: '#FFBCAD',
        500: '#FE795D',
        600: '#EF562F',
        700: '#EB4F27',
        800: '#CC4522',
        900: '#A5371B'
      },
      'bgBlack': '#121212',
      'bgPurp': '#211938',
      'bgPink': '#673249',
      'bgRoseGold': '#5f3e42',
      'bgBlackWhite': '#474747',
      'bgGreen': '#174724',
      'bgMaroon': '#4f1817',
      'bgBlue':'#013174'
      
    },
    extend: {},
  },
  plugins: [flowbitePlugin],
}

