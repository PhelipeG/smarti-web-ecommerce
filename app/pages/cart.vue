<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-6 sm:py-8 lg:py-12 transition-colors duration-300">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
      <!-- Cabeçalho -->
      <div class="mb-6 sm:mb-8 lg:mb-10">
        <div class="flex flex-col gap-4">
          <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
            <div>
              <h1 class="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Meu Carrinho
              </h1>
              <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                <LucideShoppingBag class="w-4 h-4 text-blue-600" />
                {{
                  isEmpty
                    ? "Seu carrinho está vazio"
                    : `${totalItems} ${totalItems === 1 ? "item" : "itens"} no carrinho`
                }}
              </p>
            </div>

            <!-- Breadcrumb -->
            <div class="self-start">
              <Breadcrumb :items="breadcrumbItems" />
            </div>
          </div>
        </div>
      </div>

      <!-- Carrinho Vazio -->
      <CartEmpty v-if="isEmpty" />

      <!-- Carrinho com Itens -->
      <div
        v-else
        class="grid lg:grid-cols-12 gap-6 lg:gap-8"
      >
        <!-- Lista de Itens -->
        <div class="lg:col-span-8 space-y-4">
          <!-- Header da lista (apenas desktop) -->
          <div class="hidden lg:flex items-center justify-between bg-white rounded-xl p-4 shadow-sm">
            <h3 class="text-lg font-semibold text-gray-900">
              Produtos ({{ totalItems }})
            </h3>
            <button
              class="text-sm text-red-600 hover:text-red-700 font-medium transition-colors flex items-center gap-2"
              @click="handleClearAllConfirm"
            >
              <LucideTrash2 class="w-4 h-4" />
              Limpar Carrinho
            </button>
          </div>

          <TransitionGroup
            name="cart-item"
            tag="div"
            class="space-y-3 sm:space-y-4"
          >
            <CartItem
              v-for="item in items"
              :key="item.id"
              :item="item"
            />
          </TransitionGroup>
        </div>

        <!-- Resumo do Pedido -->
        <div class="lg:col-span-4">
          <CartSummary
            :total-items="totalItems"
            :subtotal="totalPrice"
            :total="totalPrice"
            :last-updated="lastUpdated"
            :show-clear-button="false"
          />
        </div>
      </div>

      <!-- Produtos Relacionados -->
      <div
        v-if="!isEmpty"
        class="mt-12 sm:mt-16 lg:mt-20"
      >
        <div class="flex items-center justify-between mb-6 sm:mb-8">
          <h2 class="text-2xl sm:text-3xl font-bold text-gray-900">
            Você também pode gostar
          </h2>
          <NuxtLink
            to="/products"
            class="text-sm sm:text-base text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2 transition-colors"
          >
            Ver todos
            <LucideArrowRight class="w-4 h-4" />
          </NuxtLink>
        </div>

        <div
          v-if="suggestedProducts.length > 0"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          <ProductCard
            v-for="product in suggestedProducts"
            :key="product.id"
            :product="product"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BreadcrumbItem, } from '~/components/common/Breadcrumb.vue'

definePageMeta({
  pageTransition: {
    name: 'rotate',
  },
},)

const { products, } = useProducts()
const { items, totalItems, totalPrice, isEmpty, lastUpdated, clearCart, } = useCart()

const breadcrumbItems: BreadcrumbItem[] = [
  { label: 'Home', to: '/', },
  { label: 'Carrinho', },
]

const suggestedProducts = computed(() => {
  if (isEmpty.value) return []
  const cartProductIds = items.value.map(item => item.id,)
  return products.value
    .filter(product => !cartProductIds.includes(product.id,),)
    .slice(0, 4,)
},)

const handleClearAllConfirm = () => {
  if (confirm('Deseja realmente limpar todo o carrinho?',)) {
    clearCart()
  }
}

useHead({
  title: `Carrinho (${totalItems.value}) - Smarti Store`,
  meta: [
    {
      name: 'description',
      content: 'Revise os itens do seu carrinho e finalize sua compra.',
    },
  ],
},)
</script>

<style scoped>
.cart-item-move,
.cart-item-enter-active,
.cart-item-leave-active {
  transition: all 0.3s ease;
}

.cart-item-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.cart-item-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.cart-item-leave-active {
  position: absolute;
  width: 100%;
}
</style>
