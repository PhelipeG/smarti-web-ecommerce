<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { VueQueryPlugin } from '@tanstack/vue-query'

// Configurar Vue Query
const vueQueryPluginOptions = {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutos
        gcTime: 1000 * 60 * 10, // 10 minutos
        refetchOnWindowFocus: false,
        retry: 1
      }
    }
  }
}

// // Carregar carrinho do localStorage na inicialização
// const cartStore = useCartStore()
// onMounted(() => {
//   cartStore.loadCart()
// })
</script>