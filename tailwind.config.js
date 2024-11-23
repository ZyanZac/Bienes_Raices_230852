/** @type {import('tailwindcss').Config} */
export default {
  content: ['./views/**/*.pug'], /**Todo lo que se encuentre con .pug se generará una vista. ** no importa el nivel(carpeta) en el que esté, sólo se buscará cualquier archivo que tenga la extensión .pug**/
  theme: {
    extend: {},
    colors:{
      'cute_purple':{
        100: '#573280',
        200: '#9D8DF1',
        300: '#B8CDF8'
      },
      'black': '#000',
      'white': '#FFF',
      'gray':{
        300: '#d1d5db',
        400: '#9ca3af',
        500: '#6b7280'
      },
      'shadow': 'shadow'
    },
  },
  plugins: [],
}

