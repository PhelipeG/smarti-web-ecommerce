// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, } from 'node:url'

export default defineNuxtConfig({
  modules: ['@pinia/nuxt', 'nuxt-lucide-icons', '@nuxt/image', '@nuxt/eslint',],
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  devtools: { enabled: true, },
  app: {
    pageTransition: { name: 'fade', mode: 'out-in', },
  },
  // CSS global: usar caminho absoluto para evitar problemas de resolução no Vite/SSR
  css: [fileURLToPath(new URL('./assets/css/main.css', import.meta.url,),),],
  compatibilityDate: '2025-07-15',
  vite: {
    plugins: [tailwindcss(),],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./', import.meta.url,),),
      },
    },
  },
  eslint: {
    config: {
      stylistic: {
        indent: 2,
        quotes: 'single',
        semi: false,
        commaDangle: 'always',
      },
    },
  },
},)
