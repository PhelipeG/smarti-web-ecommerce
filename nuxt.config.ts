// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from 'node:url'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  // CSS global: usar caminho absoluto para evitar problemas de resolução no Vite/SSR
  css: [fileURLToPath(new URL('./assets/css/main.css', import.meta.url))],
  modules: ['@pinia/nuxt'],
  vite:{
    plugins:[
      tailwindcss()
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./', import.meta.url))
      }
    }
  },
  components:[
     {
      path: '~/components',
      pathPrefix: false,
    },
  ]
})