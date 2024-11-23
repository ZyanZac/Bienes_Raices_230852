/** @type {import('tailwindcss').Config} */
export default {
  content: ['./views/**/*.pug'], /**Todo lo que se encuentre con .pug se generará una vista. ** no importa el nivel(carpeta) en el que esté, sólo se buscará cualquier archivo que tenga la extensión .pug**/
  theme: {
    extend: {},
  },
  plugins: [],
}

