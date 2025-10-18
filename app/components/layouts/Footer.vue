<template>
  <footer class="bg-gray-900 dark:bg-gray-950 text-white py-8 sm:py-12 mt-auto transition-colors duration-300">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        <!-- Sobre -->
        <div class="text-center sm:text-left">
          <h3 class="text-base sm:text-lg font-bold mb-3 sm:mb-4">
            Smarti Store
          </h3>
          <p class="text-gray-400 text-xs sm:text-sm">
            Sua loja online com os melhores produtos e preços do mercado.
          </p>
        </div>

        <!-- Links -->
        <div class="text-center sm:text-left">
          <h3 class="text-base sm:text-lg font-bold mb-3 sm:mb-4">
            Links Rápidos
          </h3>
          <ul class="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
            <li>
              <NuxtLink
                to="/"
                class="text-gray-400 hover:text-white transition-colors inline-block"
              >
                Home
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/products"
                class="text-gray-400 hover:text-white transition-colors inline-block"
              >
                Produtos
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/cart"
                class="text-gray-400 hover:text-white transition-colors inline-block"
              >
                Carrinho
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Categorias -->
        <div class="text-center sm:text-left">
          <h3 class="text-base sm:text-lg font-bold mb-3 sm:mb-4">
            Categorias
          </h3>
          <ul class="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
            <li
              v-for="category in categories"
              :key="category"
            >
              <NuxtLink
                :to="`/products?category=${category}`"
                class="text-gray-400 hover:text-white transition-colors inline-block"
              >
                {{ formatCategory(category,) }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Contato -->
        <div class="text-center sm:text-left">
          <h3 class="text-base sm:text-lg font-bold mb-3 sm:mb-4">
            Contato
          </h3>
          <ul class="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-400">
            <li class="break-words">
              Email: contato@smarti.com.br
            </li>
            <li>Telefone: (11) 1234-5678</li>
            <li>Horário: Seg-Sex 9h-18h</li>
          </ul>
        </div>
      </div>

      <!-- Copyright -->
      <div
        class="border-t border-gray-800 dark:border-gray-700 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-xs sm:text-sm text-gray-400"
      >
        <p class="px-4">
          © {{ currentYear }} Smarti Store. Desenvolvido para o Desafio Técnico
          Grupo Smarti.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const { categories, } = useProductCategories()
const currentYear = new Date().getFullYear()
</script>
