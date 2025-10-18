<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <ToastNotification />
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
