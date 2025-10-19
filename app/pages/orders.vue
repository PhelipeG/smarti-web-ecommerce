<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
    <div class="container mx-auto px-4 py-8">
      <!-- Header -->
      <header class="mb-8">
        <h1 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Meus Pedidos
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          Histórico de todos os seus pedidos realizados
        </p>
      </header>

      <!-- Lista de Pedidos -->
      <section
        v-if="orders.length > 0"
        class="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        aria-label="Lista de pedidos"
      >
        <OrderCard
          v-for="order in orders"
          :key="order.id"
          :order="order"
        />
      </section>

      <!-- Estado Vazio -->
      <div
        v-else
        class="text-center py-16"
      >
        <LucidePackageOpen
          class="w-24 h-24 mx-auto text-gray-400 dark:text-gray-600 mb-4"
          aria-hidden="true"
        />
        <h2 class="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Nenhum pedido encontrado
        </h2>
        <p class="text-gray-600 dark:text-gray-400 mb-6">
          Você ainda não realizou nenhum pedido
        </p>
        <NuxtLink
          to="/products"
          class="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          <LucideShoppingBag
            class="w-5 h-5"
            aria-hidden="true"
          />
          Explorar Produtos
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { getOrders, } = useOrders()
const orders = ref(getOrders(),)

// Atualizar lista ao montar (caso tenha novos pedidos)
onMounted(() => {
  orders.value = getOrders()
},)

useHead({
  title: 'Meus Pedidos - Smarti Store',
  meta: [
    {
      name: 'description',
      content: 'Visualize o histórico de todos os seus pedidos realizados na Smarti Store',
    },
  ],
},)
</script>
