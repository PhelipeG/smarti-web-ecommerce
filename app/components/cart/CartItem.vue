<template>
  <div class="bg-white rounded-lg shadow-md p-4 flex items-center space-x-4 hover:shadow-lg transition-shadow">
    <!-- Imagem -->
    <div class="flex-shrink-0 w-24 h-24 bg-gray-100 rounded-lg p-2 flex items-center justify-center">
      <img 
        :src="item.image" 
        :alt="item.title"
        class="max-w-full max-h-full object-contain"
      />
    </div>

    <!-- Informações -->
    <div class="flex-1 min-w-0">
      <h3 class="text-lg font-semibold text-gray-800 truncate mb-1">
        {{ item.title }}
      </h3>
      <p class="text-sm text-gray-500 mb-2">
        {{ formatCategory(item.category) }}
      </p>
      <p class="text-xl font-bold text-blue-600">
        {{ formatCurrency(item.price) }}
      </p>
    </div>

    <!-- Controles de quantidade -->
    <div class="flex flex-col items-center space-y-2">
      <div class="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
        <!-- Botão decrementar -->
        <button
          @click="handleDecrement"
          class="w-8 h-8 flex items-center justify-center bg-white rounded-md hover:bg-gray-200 transition-colors"
          :disabled="item.quantity <= 1"
          :class="{ 'opacity-50 cursor-not-allowed': item.quantity <= 1 }"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
          </svg>
        </button>

        <!-- Quantidade -->
        <span class="w-12 text-center font-semibold text-gray-800">
          {{ item.quantity }}
        </span>

        <!-- Botão incrementar -->
        <button
          @click="handleIncrement"
          class="w-8 h-8 flex items-center justify-center bg-white rounded-md hover:bg-gray-200 transition-colors"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      <!-- Subtotal -->
      <p class="text-sm text-gray-600">
        Subtotal: <span class="font-semibold">{{ formatCurrency(item.price * item.quantity) }}</span>
      </p>
    </div>

    <!-- Botão remover -->
    <button
      @click="handleRemove"
      class="flex-shrink-0 w-10 h-10 flex items-center justify-center text-red-500 hover:bg-red-50 rounded-lg transition-colors"
      title="Remover do carrinho"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { useCart } from '~/composables/useCart';
import type { CartItem } from '~~/types';

const props = defineProps<{
  item: CartItem
}>()

const { removeFromCart , increment , decrement } = useCart()

const handleIncrement = () => {
  increment(props.item.id)
}

const handleDecrement = () => {
  decrement(props.item.id)
}

const handleRemove = () => {
  if (confirm(`Deseja remover "${props.item.title}" do carrinho?`)) {
    removeFromCart(props.item.id, props.item.title)
  }
}
</script>