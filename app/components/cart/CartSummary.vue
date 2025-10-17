<template>
  <div class="bg-white rounded-xl shadow-lg p-6 sticky top-24">
    <h2 class="text-2xl font-bold text-gray-800 mb-6">
      Resumo do Pedido
    </h2>

    <!-- Detalhes -->
    <div class="space-y-4 mb-6">
      <div class="flex justify-between text-gray-600">
        <span>Subtotal ({{ totalItems }}
          {{ totalItems === 1 ? "item" : "itens" }})</span>
        <span class="font-semibold">{{ formatCurrency(subtotal,) }}</span>
      </div>

      <div class="flex justify-between text-gray-600">
        <span>Frete</span>
        <span class="font-semibold text-green-600">Grátis</span>
      </div>

      <div class="border-t pt-4">
        <div class="flex justify-between items-center">
          <span class="text-lg font-bold text-gray-800">Total</span>
          <span class="text-2xl font-bold text-blue-600">{{
            formatCurrency(total,)
          }}</span>
        </div>
      </div>
    </div>

    <!-- Botões -->
    <div class="space-y-3">
      <button
        class="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
        @click="handleCheckout"
      >
        <LucideCreditCard class="w-5 h-5" />
        <span>Finalizar Compra</span>
      </button>

      <NuxtLink
        to="/products"
        class="block w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors text-center"
      >
        Continuar Comprando
      </NuxtLink>

      <button
        v-if="showClearButton"
        class="w-full bg-amber-600 text-white hover:bg-amber-700 rounded-lg py-2 font-medium transition-colors space-x-2"
        @click="handleClearCart"
      >
        Limpar Carrinho
      </button>
    </div>

    <!-- Informações extras -->
    <div
      v-if="lastUpdated"
      class="mt-6 pt-6 border-t text-xs text-gray-500 text-center"
    >
      Última atualização: {{ formatDate(lastUpdated,) }}
    </div>

    <!-- Benefícios -->
    <div class="mt-6 pt-6 border-t space-y-3">
      <div class="flex items-start space-x-3 text-sm text-gray-600">
        <LucideTruck class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
        <span>Frete grátis para todo o Brasil</span>
      </div>

      <div class="flex items-start space-x-3 text-sm text-gray-600">
        <LucideCheckCircle
          class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
        />
        <span>Compra 100% segura</span>
      </div>

      <div class="flex items-start space-x-3 text-sm text-gray-600">
        <LucideRefreshCcw class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
        <span>Troca grátis em até 30 dias</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  totalItems: number
  subtotal: number
  total: number
  lastUpdated: Date | null
  showClearButton?: boolean
}>()

const { clearCart, } = useCart()

const handleCheckout = () => {
  alert('Funcionalidade de checkout em desenvolvimento!',)
}

const handleClearCart = () => {
  clearCart()
}
</script>
