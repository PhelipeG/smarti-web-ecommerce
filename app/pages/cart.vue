<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="container mx-auto px-4">
      <!-- Cabeçalho -->
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-gray-900 mb-2">
          Meu Carrinho
        </h1>
        <p class="text-gray-600">
          {{
            isEmpty
              ? "Seu carrinho está vazio"
              : `${totalItems} ${
                totalItems === 1 ? "item" : "itens"
              } no carrinho`
          }}
        </p>
      </div>

      <!-- Carrinho Vazio -->
      <CartEmpty v-if="isEmpty" />

      <!-- Carrinho com Itens -->
      <div
        v-else
        class="grid lg:grid-cols-3 gap-8"
      >
        <div class="lg:col-span-2 space-y-4">
          <TransitionGroup
            name="cart-item"
            tag="div"
            class="space-y-4"
          >
            <CartItem
              v-for="item in items"
              :key="item.id"
              :item="item"
            />
          </TransitionGroup>
        </div>

        <!-- Resumo do Pedido -->
        <div class="lg:col-span-1">
          <CartSummary
            :total-items="totalItems"
            :subtotal="totalPrice"
            :total="totalPrice"
            :last-updated="lastUpdated"
            :show-clear-button="true"
          />
        </div>
      </div>
      <!-- Produtos Relacionados -->
      <div
        v-if="!isEmpty"
        class="mt-16"
      >
        <h2 class="text-2xl font-bold text-gray-900 mb-6">
          Você também pode gostar
        </h2>
        <div
          v-if="suggestedProducts.length > 0"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
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
definePageMeta({
  pageTransition: {
    name: 'rotate',
  },
},)
const { products, } = useProducts()
const { items, totalItems, totalPrice, isEmpty, lastUpdated, } = useCart()

const suggestedProducts = computed(() => {
  if (isEmpty.value) return []
  const cartProductIds = items.value.map(item => item.id,)
  return products.value
    .filter(product => !cartProductIds.includes(product.id,),)
    .slice(0, 4,)
},)

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
