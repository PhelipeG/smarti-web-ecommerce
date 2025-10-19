<template>
  <article
    class="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full group"
    :aria-label="`Produto: ${product.title}`"
  >
    <!-- Imagem do produto -->
    <div
      class="relative bg-gray-50 dark:bg-gray-700 p-6 h-64 flex items-center justify-center overflow-hidden"
    >
      <NuxtImg
        :src="product.image"
        :alt="`${product.title} - ${formatCategory(product.category,)}`"
        class="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300"
        loading="lazy"
        format="webp"
        quality="80"
        width="300"
        height="300"
        fit="contain"
      />

      <!-- Badge de categoria -->
      <div
        class="absolute top-2 left-2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold"
        role="status"
        :aria-label="`Categoria: ${formatCategory(product.category,)}`"
      >
        {{ formatCategory(product.category,) }}
      </div>

      <!-- Rating -->
      <div
        class="absolute top-2 right-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center space-x-1"
        role="status"
        :aria-label="`Avaliação: ${product.rating.rate} de 5 estrelas`"
      >
        <LucideStar
          class="w-4 h-4 text-yellow-400"
          aria-hidden="true"
        />
        <span class="text-sm font-semibold text-gray-700 dark:text-gray-300">{{
          product.rating.rate
        }}</span>
      </div>
    </div>

    <!-- Conteúdo -->
    <div class="p-4 sm:p-5 flex-1 flex flex-col">
      <!-- Título -->
      <h3 class="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2 line-clamp-2 min-h-[44px] sm:min-h-[56px]">
        {{ product.title }}
      </h3>

      <!-- Descrição -->
      <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-3 sm:mb-4 line-clamp-2 flex-1">
        {{ truncateText(product.description,) }}
      </p>

      <!-- Preço e ações -->
      <div class="flex flex-col xs:flex-row items-center justify-between gap-3 mt-auto">
        <div class="flex flex-col text-center xs:text-left w-full xs:w-auto">
          <span
            class="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400"
            :aria-label="`Preço: ${formatCurrency(product.price,)}`"
          >
            {{ formatCurrency(product.price,) }}
          </span>
          <span
            class="text-xs text-gray-500 dark:text-gray-400"
            role="status"
          >
            {{ product.rating.count }} avaliações
          </span>
        </div>

        <!-- Botão adicionar -->
        <Button
          type="button"
          :variant="isInCart(product.id,) ? 'success' : 'primary'"
          :disabled="isInCart(product.id,)"
          :aria-label="isInCart(product.id,) ? `${product.title} já está no carrinho` : `Adicionar ${product.title} ao carrinho`"
          :aria-pressed="isInCart(product.id,)"
          :full-width="true"
          class="xs:!w-auto space-x-2"
          @click="handleAddToCart"
        >
          <LucidePlus
            v-if="!isInCart(product.id,)"
            class="w-4 h-4 sm:w-5 sm:h-5 text-white"
            aria-hidden="true"
          />
          <LucideCheckCircle
            v-else
            class="w-4 h-4 sm:w-5 sm:h-5 text-green-600 dark:text-green-400"
            aria-hidden="true"
          />
          <span>
            {{ isInCart(product.id,) ? "No Carrinho" : "Adicionar" }}
          </span>
        </Button>
      </div>
    </div>
  </article>
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
