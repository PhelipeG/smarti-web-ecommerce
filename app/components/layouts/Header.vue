<template>
  <header class="bg-white shadow-md sticky top-0 z-50">
    <div class="container mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <NuxtLink
          to="/"
          class="flex items-center space-x-2 group"
        >
          <div class="bg-gradient-to-r from-blue-600 to-purple-600 w-10 h-10 rounded-lg flex items-center justify-center transform group-hover:scale-105 transition-transform">
            <span class="text-white font-bold text-xl">S</span>
          </div>
          <span class="text-xl font-bold text-gray-800">Smarti Store</span>
        </NuxtLink>

        <!-- Navigation -->
        <nav class="hidden md:flex items-center space-x-8">
          <NuxtLink
            to="/cart"
            class="relative flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-medium transition-colors group"
            active-class="text-blue-600"
          >
            <LucideShoppingCart class="w-6 h-6 group-hover:scale-110 transition-transform" />
            <span>Carrinho</span>

            <!-- Badge contador -->
            <span
              v-if="totalItems > 0"
              class="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse"
            >
              {{ totalItems }}
            </span>
          </NuxtLink>
        </nav>

        <!-- Mobile Menu Button -->
        <button
          class="md:hidden text-gray-700 hover:text-blue-600"
          @click="mobileMenuOpen = !mobileMenuOpen"
        >
          <LucideMenu class="w-6 h-6" />
        </button>
      </div>

      <!-- Mobile Menu -->
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-4"
      >
        <nav
          v-if="mobileMenuOpen"
          class="md:hidden mt-4 pb-4 border-t pt-4"
        >
          <div class="flex flex-col space-y-4">
            <NuxtLink
              to="/products"
              class="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              @click="mobileMenuOpen = false"
            >
              Produtos
            </NuxtLink>

            <NuxtLink
              to="/cart"
              class="flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
              @click="mobileMenuOpen = false"
            >
              <LucideShoppingCart class="w-6 h-6" />
              <span>Carrinho ({{ totalItems }})</span>
            </NuxtLink>
          </div>
        </nav>
      </Transition>
    </div>
  </header>
</template>

<script setup lang="ts">
const { totalItems, } = useCart()
const mobileMenuOpen = ref(false,)

// Fechar menu mobile ao mudar de rota
const route = useRoute()
watch(() => route.path, () => {
  mobileMenuOpen.value = false
},)
</script>
