<template>
  <footer class="bg-gray-900 text-white py-12 mt-auto">
    <div class="container mx-auto px-4">
      <div class="grid md:grid-cols-4 gap-8">
        <!-- Sobre -->
        <div>
          <h3 class="text-lg font-bold mb-4">
            Smarti Store
          </h3>
          <p class="text-gray-400 text-sm">
            Sua loja online com os melhores produtos e preços do mercado.
          </p>
        </div>

        <!-- Links -->
        <div>
          <h3 class="text-lg font-bold mb-4">
            Links Rápidos
          </h3>
          <ul class="space-y-2 text-sm">
            <li>
              <NuxtLink
                to="/"
                class="text-gray-400 hover:text-white transition-colors"
              >
                Home
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/products"
                class="text-gray-400 hover:text-white transition-colors"
              >
                Produtos
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/cart"
                class="text-gray-400 hover:text-white transition-colors"
              >
                Carrinho
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Categorias -->
        <div>
          <h3 class="text-lg font-bold mb-4">
            Categorias
          </h3>
          <ul class="space-y-2 text-sm">
            <li
              v-for="category in categories"
              :key="category"
            >
              <NuxtLink
                :to="`/products?category=${category}`"
                class="text-gray-400 hover:text-white transition-colors"
              >
                {{ formatCategory(category,) }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Contato -->
        <div>
          <h3 class="text-lg font-bold mb-4">
            Contato
          </h3>
          <ul class="space-y-2 text-sm text-gray-400">
            <li>Email: contato@smarti.com.br</li>
            <li>Telefone: (11) 1234-5678</li>
            <li>Horário: Seg-Sex 9h-18h</li>
          </ul>
        </div>
      </div>

      <!-- Copyright -->
      <div
        class="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400"
      >
        <p>
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
