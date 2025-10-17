<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const cartStore = useCartStore()
const { initTheme, } = useTheme()

onMounted(() => {
  cartStore.loadCart()
  initTheme()
},)
</script>
