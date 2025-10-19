<template>
  <header class="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 transition-colors duration-300">
    <div class="container mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <NuxtLink
          to="/"
          class="flex items-center space-x-2 group"
          aria-label="Ir para página inicial - Smarti Store"
        >
          <div class="bg-gradient-to-r from-blue-600 to-purple-600 w-10 h-10 rounded-lg flex items-center justify-center transform group-hover:scale-105 transition-transform">
            <span
              class="text-white font-bold text-xl"
              aria-hidden="true"
            >S</span>
          </div>
          <span class="text-xl font-bold text-gray-800 dark:text-white transition-colors">Smarti Store</span>
        </NuxtLink>

        <!-- Navigation -->
        <nav
          class="hidden md:flex items-center space-x-4"
          aria-label="Navegação principal"
        >
          <NuxtLink
            to="/orders"
            class="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
            active-class="text-blue-600 dark:text-blue-400"
            aria-label="Ver meus pedidos"
          >
            <LucideClipboardList
              class="w-5 h-5"
              aria-hidden="true"
            />
            <span>Meus Pedidos</span>
          </NuxtLink>

          <NuxtLink
            to="/cart"
            class="relative flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors group"
            active-class="text-blue-600 dark:text-blue-400"
            :aria-label="`Ir para carrinho - ${totalItems} ${totalItems === 1 ? 'item' : 'itens'}`"
          >
            <LucideShoppingCart
              class="w-6 h-6 group-hover:scale-110 transition-transform"
              aria-hidden="true"
            />
            <span>Carrinho</span>

            <!-- Badge contador -->
            <span
              v-if="totalItems > 0"
              class="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse"
              :aria-label="`${totalItems} itens no carrinho`"
            >
              {{ totalItems }}
            </span>
          </NuxtLink>

          <!-- Theme Toggle -->
          <ThemeToggle />
        </nav>

        <!-- Mobile Menu Button and Theme Toggle -->
        <div class="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-2"
            :aria-label="mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'"
            :aria-expanded="mobileMenuOpen"
            aria-controls="mobile-menu"
            @click="mobileMenuOpen = !mobileMenuOpen"
          >
            <LucideMenu
              v-if="!mobileMenuOpen"
              class="w-6 h-6"
              aria-hidden="true"
            />
            <LucideX
              v-else
              class="w-6 h-6"
              aria-hidden="true"
            />
          </button>
        </div>
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
          id="mobile-menu"
          class="md:hidden mt-4 pb-4 border-t dark:border-gray-700 pt-4"
          aria-label="Menu mobile"
        >
          <div class="flex flex-col space-y-4">
            <NuxtLink
              to="/products"
              class="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
              aria-label="Ver todos os produtos"
              @click="mobileMenuOpen = false"
            >
              <LucidePackage
                class="w-5 h-5"
                aria-hidden="true"
              />
              <span>Produtos</span>
            </NuxtLink>

            <NuxtLink
              to="/orders"
              class="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
              aria-label="Ver meus pedidos"
              @click="mobileMenuOpen = false"
            >
              <LucideClipboardList
                class="w-5 h-5"
                aria-hidden="true"
              />
              <span>Meus Pedidos</span>
            </NuxtLink>

            <NuxtLink
              to="/cart"
              class="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
              :aria-label="`Carrinho com ${totalItems} ${totalItems === 1 ? 'item' : 'itens'}`"
              @click="mobileMenuOpen = false"
            >
              <LucideShoppingCart
                class="w-6 h-6"
                aria-hidden="true"
              />
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
const { initTheme, } = useTheme()
const mobileMenuOpen = ref(false,)

// Inicializar tema ao montar componente
onMounted(() => {
  initTheme()
},)

// Fechar menu mobile ao mudar de rota
const route = useRoute()
watch(() => route.path, () => {
  mobileMenuOpen.value = false
},)
</script>
