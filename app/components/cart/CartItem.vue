<template>
  <div class="bg-white rounded-lg shadow-md p-4 flex items-center space-x-4 hover:shadow-lg transition-shadow">
    <!-- Imagem -->
    <div class="flex-shrink-0 w-24 h-24 bg-gray-100 rounded-lg p-2 flex items-center justify-center">
      <NuxtImg
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
        {{ formatCategory(item.category,) }}
      </p>
      <p class="text-xl font-bold text-blue-600">
        {{ formatCurrency(item.price,) }}
      </p>
    </div>

    <!-- Controles de quantidade -->
    <div class="flex flex-col items-center space-y-2">
      <div class="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
        <!-- Botão decrementar -->
        <button
          class="w-8 h-8 flex items-center justify-center bg-white rounded-md hover:bg-gray-200 transition-colors"
          :disabled="item.quantity <= 1"
          :class="{ 'opacity-50 cursor-not-allowed': item.quantity <= 1, }"
          @click="handleDecrement"
        >
          <LucideMinus class="w-5 h-5 transform rotate-180" />
        </button>

        <!-- Quantidade -->
        <span class="w-12 text-center font-semibold text-gray-800">
          {{ item.quantity }}
        </span>

        <!-- Botão incrementar -->
        <button
          class="w-8 h-8 flex items-center justify-center bg-white rounded-md hover:bg-gray-200 transition-colors"
          @click="handleIncrement"
        >
          <LucidePlus class="w-5 h-5" />
        </button>
      </div>

      <!-- Subtotal -->
      <p class="text-sm text-gray-600">
        Subtotal: <span class="font-semibold">{{ formatCurrency(item.price * item.quantity,) }}</span>
      </p>
    </div>

    <!-- Botão remover -->
    <button
      class="flex-shrink-0 w-10 h-10 flex items-center justify-center text-red-500 hover:bg-red-50 rounded-lg transition-colors"
      title="Remover do carrinho"
      @click="handleRemove"
    >
      <LucideTrash2 class="w-6 h-6" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { useCart, } from '~/composables/useCart'
import type { CartItem, } from '~~/types'

const props = defineProps<{
  item: CartItem
}>()

const { removeFromCart, increment, decrement, } = useCart()

const handleIncrement = () => {
  increment(props.item.id,)
}

const handleDecrement = () => {
  decrement(props.item.id,)
}

const handleRemove = () => {
  if (confirm(`Deseja remover "${props.item.title}" do carrinho?`,)) {
    removeFromCart(props.item.id, props.item.title,)
  }
}
</script>
