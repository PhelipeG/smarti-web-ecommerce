<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-3 sm:p-4 hover:shadow-lg transition-shadow">
    <!-- Layout Mobile e Desktop -->
    <div class="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
      <!-- Imagem -->
      <div class="flex-shrink-0 w-full h-32 xs:w-20 xs:h-20 sm:w-24 sm:h-24 bg-gray-100 dark:bg-gray-700 rounded-lg p-2 flex items-center justify-center mx-auto xs:mx-0">
        <NuxtImg
          :src="item.image"
          :alt="item.title"
          class="max-w-full max-h-full object-contain"
          loading="lazy"
          format="webp"
          quality="80"
        />
      </div>

      <!-- Informações -->
      <div class="flex-1 min-w-0 text-center xs:text-left">
        <h3 class="text-sm sm:text-base lg:text-lg font-semibold text-gray-800 dark:text-gray-200 line-clamp-2 mb-1">
          {{ item.title }}
        </h3>
        <p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-2">
          {{ formatCategory(item.category,) }}
        </p>
        <p class="text-base sm:text-lg lg:text-xl font-bold text-blue-600 dark:text-blue-400">
          {{ formatCurrency(item.price,) }}
        </p>
      </div>

      <!-- Controles de quantidade e Remover -->
      <div class="flex flex-row xs:flex-col sm:flex-row items-center justify-center xs:justify-start gap-3 sm:gap-4">
        <!-- Controles de quantidade -->
        <div class="flex flex-col items-center space-y-2">
          <div class="flex items-center space-x-1.5 sm:space-x-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <!-- Botão decrementar -->
            <Button
              variant="ghost"
              size="sm"
              :disabled="item.quantity <= 1"
              :aria-label="`Diminuir quantidade de ${item.title}`"
              class="!w-7 !h-7 sm:!w-8 sm:!h-8 !p-0 !bg-white dark:!bg-gray-600 !rounded-md hover:!bg-gray-200 dark:hover:!bg-gray-500"
              @click="handleDecrement"
            >
              <LucideMinus class="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </Button>

            <!-- Quantidade -->
            <span class="w-8 sm:w-10 lg:w-12 text-center font-semibold text-sm sm:text-base text-gray-800 dark:text-gray-200">
              {{ item.quantity }}
            </span>

            <!-- Botão incrementar -->
            <Button
              variant="ghost"
              size="sm"
              :aria-label="`Aumentar quantidade de ${item.title}`"
              class="!w-7 !h-7 sm:!w-8 sm:!h-8 !p-0 !bg-white dark:!bg-gray-600 !rounded-md hover:!bg-gray-200 dark:hover:!bg-gray-500"
              @click="handleIncrement"
            >
              <LucidePlus class="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </Button>
          </div>

          <!-- Subtotal -->
          <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
            Subtotal: <span class="font-semibold">{{ formatCurrency(item.price * item.quantity,) }}</span>
          </p>
        </div>

        <!-- Botão remover -->
        <Button
          variant="danger"
          size="sm"
          :aria-label="`Remover ${item.title} do carrinho`"
          class="!w-9 !h-9 sm:!w-10 sm:!h-10 !p-0 flex-shrink-0"
          @click="handleRemove"
        >
          <LucideTrash2 class="w-4 h-4 sm:w-5 sm:h-5" />
        </Button>
      </div>
    </div>
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
  removeFromCart(props.item.id, props.item.title,)
}
</script>
