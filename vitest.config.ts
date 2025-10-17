import { defineConfig, } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, } from 'url'

export default defineConfig({
  plugins: [vue(),],
  test: {
    globals: true,
    environment: 'happy-dom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html',],
      exclude: [
        'node_modules/',
        'tests/',
        '*.config.*',
        '.nuxt/',
        'dist/',
      ],
    },
  },
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./', import.meta.url,),),
      '@': fileURLToPath(new URL('./', import.meta.url,),),
      '~/app': fileURLToPath(new URL('./app', import.meta.url,),),
      '~/types': fileURLToPath(new URL('./types', import.meta.url,),),
      '~/utils': fileURLToPath(new URL('./utils', import.meta.url,),),
    },
  },
},)
