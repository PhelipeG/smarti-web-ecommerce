<template>
  <div class="bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:sticky lg:top-24">
    <h2 class="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
      Resumo do Pedido
    </h2>

    <!-- Detalhes -->
    <div class="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
      <div class="flex justify-between text-sm sm:text-base text-gray-600">
        <span class="flex-1">Subtotal ({{ totalItems }}
          {{ totalItems === 1 ? "item" : "itens" }})</span>
        <span class="font-semibold ml-2">{{ formatCurrency(subtotal,) }}</span>
      </div>

      <div class="flex justify-between text-sm sm:text-base text-gray-600">
        <span>Frete</span>
        <span class="font-semibold text-green-600">Grátis</span>
      </div>

      <div class="border-t pt-3 sm:pt-4">
        <div class="flex justify-between items-center">
          <span class="text-base sm:text-lg font-bold text-gray-800">Total</span>
          <span class="text-xl sm:text-2xl font-bold text-blue-600">{{
            formatCurrency(total,)
          }}</span>
        </div>
      </div>
    </div>

    <!-- Botões -->
    <div class="space-y-2 sm:space-y-3">
      <Button
        variant="primary"
        size="lg"
        full-width
        aria-label="Finalizar compra"
        class="shadow-md hover:shadow-lg space-x-2"
        @click="handleCheckout"
      >
        <LucideCreditCard class="w-4 h-4 sm:w-5 sm:h-5" />
        <span>Finalizar Compra</span>
      </Button>

      <NuxtLink
        to="/products"
        class="block w-full bg-gray-100 text-gray-700 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-medium hover:bg-gray-200 transition-colors text-center"
      >
        Continuar Comprando
      </NuxtLink>

      <Button
        v-if="showClearButton"
        variant="ghost"
        size="md"
        full-width
        aria-label="Limpar todo o carrinho"
        class="!bg-amber-600 !text-white hover:!bg-amber-700"
        @click="handleClearCart"
      >
        Limpar Carrinho
      </Button>
    </div>

    <!-- Informações extras -->
    <div
      v-if="lastUpdated"
      class="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t text-xs text-gray-500 text-center"
    >
      Última atualização: {{ formatDate(lastUpdated,) }}
    </div>

    <!-- Benefícios -->
    <div class="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t space-y-2 sm:space-y-3">
      <div class="flex items-start space-x-2 sm:space-x-3 text-xs sm:text-sm text-gray-600">
        <LucideTruck class="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0 mt-0.5" />
        <span>Frete grátis para todo o Brasil</span>
      </div>

      <div class="flex items-start space-x-2 sm:space-x-3 text-xs sm:text-sm text-gray-600">
        <LucideCheckCircle
          class="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0 mt-0.5"
        />
        <span>Compra 100% segura</span>
      </div>

      <div class="flex items-start space-x-2 sm:space-x-3 text-xs sm:text-sm text-gray-600">
        <LucideRefreshCcw class="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0 mt-0.5" />
        <span>Troca grátis em até 30 dias</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  totalItems: number
  subtotal: number
  total: number
  lastUpdated: Date | null
  showClearButton?: boolean
}>()

const { clearCart, } = useCart()
const toast = useToast()
const { confirmClearCart, } = useConfirm()

const handleCheckout = () => {
  toast.info({
    title: 'Em desenvolvimento',
    message: 'A funcionalidade de checkout estará disponível em breve.',
  },)
}

const handleClearCart = () => {
  confirmClearCart(clearCart,)
}
</script>
