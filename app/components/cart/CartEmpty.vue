<template>
  <div class="flex flex-col items-center justify-center py-12 sm:py-16 px-4">
    <!-- Ícone -->
    <div class="w-24 h-24 sm:w-32 sm:h-32 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
      <LucideShoppingCart class="w-12 h-12 sm:w-16 sm:h-16 text-gray-600 dark:text-gray-400" />
    </div>

    <!-- Mensagem -->
    <h2 class="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2 text-center">
      Seu carrinho está vazio
    </h2>
    <p class="text-sm sm:text-base text-gray-600 dark:text-gray-400 text-center mb-8 max-w-md px-4">
      Navegue pelo nosso catálogo e adicione produtos ao seu carrinho para continuar comprando.
    </p>

    <!-- Botão -->
    <NuxtLink
      to="/products"
      class="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all hover:scale-105 shadow-md text-sm sm:text-base"
    >
      <LucideMoveLeft class="w-4 h-4 sm:w-5 sm:h-5" />
      <span>Ver Produtos</span>
    </NuxtLink>

    <!-- Categorias sugeridas -->
    <div class="mt-8 sm:mt-12 text-center w-full max-w-2xl">
      <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-4">
        Categorias populares:
      </p>
      <div class="flex flex-wrap justify-center gap-2 sm:gap-3 px-4">
        <NuxtLink
          v-for="category in suggestedCategories"
          :key="category.value"
          :to="`/products?category=${category.value}`"
          class="px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-xs sm:text-sm hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
        >
          {{ category.label }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const suggestedCategories = [
  { value: 'electronics', label: 'Eletrônicos', },
  { value: 'jewelery', label: 'Joias', },
  { value: 'men\'s clothing', label: 'Moda Masculina', },
  { value: 'women\'s clothing', label: 'Moda Feminina', },
]
</script>
