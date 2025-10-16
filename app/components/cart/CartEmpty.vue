<template>
  <div class="flex flex-col items-center justify-center py-16 px-4">
    <!-- Ícone -->
    <div class="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-6">
      <svg class="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    </div>

    <!-- Mensagem -->
    <h2 class="text-2xl font-bold text-gray-800 mb-2">Seu carrinho está vazio</h2>
    <p class="text-gray-600 text-center mb-8 max-w-md">
      Navegue pelo nosso catálogo e adicione produtos ao seu carrinho para continuar comprando.
    </p>

    <!-- Botão -->
    <NuxtLink
      to="/products"
      class="inline-flex items-center space-x-2 bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all hover:scale-105 shadow-md"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
      </svg>
      <span>Ver Produtos</span>
    </NuxtLink>

    <!-- Categorias sugeridas -->
    <div class="mt-12 text-center">
      <p class="text-sm text-gray-600 mb-4">Categorias populares:</p>
      <div class="flex flex-wrap justify-center gap-3">
        <NuxtLink
          v-for="category in suggestedCategories"
          :key="category.value"
          :to="`/products?category=${category.value}`"
          class="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-blue-100 hover:text-blue-700 transition-colors"
        >
          {{ category.label }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

const suggestedCategories = [
  { value: 'electronics', label: 'Eletrônicos' },
  { value: 'jewelery', label: 'Joias' },
  { value: "men's clothing", label: 'Moda Masculina' },
  { value: "women's clothing", label: 'Moda Feminina' }
]
</script>

