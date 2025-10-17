<template>
  <div
    class="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full group"
  >
    <!-- Imagem do produto -->
    <div
      class="relative bg-gray-50 p-6 h-64 flex items-center justify-center overflow-hidden"
    >
      <NuxtImg
        :src="product.image"
        :alt="product.title"
        class="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300"
        loading="lazy"
      />

      <!-- Badge de categoria -->
      <div
        class="absolute top-2 left-2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold"
      >
        {{ formatCategory(product.category,) }}
      </div>

      <!-- Rating -->
      <div
        class="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center space-x-1"
      >
        <LucideStar class="w-4 h-4 text-yellow-400" />
        <span class="text-sm font-semibold text-gray-700">{{
          product.rating.rate
        }}</span>
      </div>
    </div>

    <!-- Conteúdo -->
    <div class="p-5 flex-1 flex flex-col">
      <!-- Título -->
      <h3
        class="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 min-h-[56px]"
      >
        {{ product.title }}
      </h3>

      <!-- Descrição -->
      <p class="text-sm text-gray-600 mb-4 line-clamp-2 flex-1">
        {{ truncateText(product.description,) }}
      </p>

      <!-- Preço e ações -->
      <div class="flex items-center justify-between mt-auto">
        <div class="flex flex-col">
          <span class="text-2xl font-bold text-blue-600">
            {{ formatCurrency(product.price,) }}
          </span>
          <span class="text-xs text-gray-500">
            {{ product.rating.count }} avaliações
          </span>
        </div>

        <!-- Botão adicionar -->
        <button
          :disabled="isInCart(product.id,)"
          class="flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold transition-all duration-200"
          :class="
            isInCart(product.id,)
              ? 'bg-green-100 text-green-700 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 active:scale-95'
          "
          @click="handleAddToCart"
        >
          <LucidePlus
            v-if="!isInCart(product.id,)"
            class="w-5 h-5 text-white"
          />
          <LucideCheckCircle
            v-else
            class="w-5 h-5 text-green-600"
          />
          <span class="hidden sm:inline">
            {{ isInCart(product.id,) ? "No Carrinho" : "Adicionar" }}
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCart, } from '~/composables/useCart'
import { truncateText, } from '~/utils/formatters'
import type { Product, } from '~~/types'

const props = defineProps<{
  product: Product
}>()

const { addToCart, isInCart, } = useCart()

const handleAddToCart = () => {
  if (!isInCart(props.product.id,)) {
    addToCart(props.product,)
  }
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
