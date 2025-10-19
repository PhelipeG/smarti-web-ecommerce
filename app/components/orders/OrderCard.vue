<template>
  <article
    class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
    :aria-label="`Pedido ${order.id}`"
  >
    <!-- Header -->
    <header class="flex items-start justify-between mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
          Pedido {{ order.id }}
        </h3>
        <time
          :datetime="order.date"
          class="text-sm text-gray-500 dark:text-gray-400"
        >
          {{ formatDate(order.date, "dd 'de' MMMM 'de' yyyy, HH:mm",) }}
        </time>
      </div>
      <span class="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-full text-sm font-medium">
        Concluído
      </span>
    </header>

    <!-- Cliente -->
    <section class="mb-4">
      <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Cliente
      </h4>
      <p class="text-gray-900 dark:text-white">
        {{ order.name }}
      </p>
      <p class="text-sm text-gray-600 dark:text-gray-400">
        {{ order.address }}
      </p>
    </section>

    <!-- Itens -->
    <section class="mb-4">
      <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Itens ({{ order.items.length }})
      </h4>
      <ul class="space-y-2">
        <li
          v-for="item in order.items"
          :key="item.id"
          class="flex items-center justify-between text-sm"
        >
          <span class="text-gray-700 dark:text-gray-300">
            {{ item.quantity }}x {{ item.title }}
          </span>
          <span class="font-medium text-gray-900 dark:text-white">
            {{ formatCurrency(item.price * item.quantity,) }}
          </span>
        </li>
      </ul>
    </section>

    <!-- Total -->
    <footer class="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
      <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
        Total
      </span>
      <span class="text-xl font-bold text-blue-600 dark:text-blue-400">
        {{ formatCurrency(order.total,) }}
      </span>
    </footer>
  </article>
</template>

<script setup lang="ts">
import type { Order, } from '~~/types'

interface Props {
  order: Order
}

defineProps<Props>()
</script>
