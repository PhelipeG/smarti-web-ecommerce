<template>
  <div
    class="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full group"
  >
    <!-- Imagem do produto -->
    <div
      class="relative bg-gray-50 p-6 h-64 flex items-center justify-center overflow-hidden"
    >
      <img
        :src="product.image"
        :alt="product.title"
        class="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300"
        loading="lazy"
      />

      <!-- Badge de categoria -->
      <div
        class="absolute top-2 left-2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold"
      >
        {{ formatCategory(product.category) }}
      </div>

      <!-- Rating -->
      <div
        class="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center space-x-1"
      >
        <svg class="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
          <path
            d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
          />
        </svg>
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
        {{ product.description }}
      </p>

      <!-- Preço e ações -->
      <div class="flex items-center justify-between mt-auto">
        <div class="flex flex-col">
          <span class="text-2xl font-bold text-blue-600">
            {{ product.price }}
          </span>
          <span class="text-xs text-gray-500">
            {{ product.rating.count }} avaliações
          </span>
        </div>

        <!-- Botão adicionar -->
        <button
          @click="handleAddToCart"
          :disabled="isInCart(product.id)"
          class="flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold transition-all duration-200"
          :class="
            isInCart(product.id)
              ? 'bg-green-100 text-green-700 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 active:scale-95'
          "
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              v-if="!isInCart(product.id)"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
            <path
              v-else
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span class="hidden sm:inline">
            {{ isInCart(product.id) ? "No Carrinho" : "Adicionar" }}
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCart } from "~/composables/useCart";
import type { Product } from "~~/types";

const props = defineProps<{
  product: Product;
}>();

const { addToCart, isInCart } = useCart();

const handleAddToCart = () => {
  if (!isInCart(props.product.id)) {
    addToCart(props.product);
  }
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
