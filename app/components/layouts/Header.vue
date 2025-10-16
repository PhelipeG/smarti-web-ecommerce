<template>
  <header class="bg-white shadow-md sticky top-0 z-50">
    <div class="container mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center space-x-2 group">
          <div class="bg-gradient-to-r from-blue-600 to-purple-600 w-10 h-10 rounded-lg flex items-center justify-center transform group-hover:scale-105 transition-transform">
            <span class="text-white font-bold text-xl">S</span>
          </div>
          <span class="text-xl font-bold text-gray-800">Smarti Store</span>
        </NuxtLink>

        <!-- Navigation -->
        <nav class="hidden md:flex items-center space-x-8">
          <NuxtLink 
            to="/produtos" 
            class="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            active-class="text-blue-600"
          >
            Produtos
          </NuxtLink>
          
          <NuxtLink 
            to="/carrinho" 
            class="relative flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-medium transition-colors group"
            active-class="text-blue-600"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>Carrinho</span>
            
            <!-- Badge contador -->
            <!-- <span 
              v-if="totalItems > 0"
              class="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse"
            >
              {{ totalItems }}
            </span> -->
          </NuxtLink>
        </nav>

        <!-- Mobile Menu Button -->
        <button 
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="md:hidden text-gray-700 hover:text-blue-600"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path 
              v-if="!mobileMenuOpen"
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d="M4 6h16M4 12h16M4 18h16" 
            />
            <path 
              v-else
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d="M6 18L18 6M6 6l12 12" 
            />
          </svg>
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
        <nav v-if="mobileMenuOpen" class="md:hidden mt-4 pb-4 border-t pt-4">
          <div class="flex flex-col space-y-4">
            <NuxtLink 
              to="/produtos" 
              class="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              @click="mobileMenuOpen = false"
            >
              Produtos
            </NuxtLink>
            
            <NuxtLink 
              to="/carrinho" 
              class="flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
              @click="mobileMenuOpen = false"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span>Carrinho ({{ 8 }})</span>
            </NuxtLink>
          </div>
        </nav>
      </Transition>
    </div>
  </header>
</template>

<script setup lang="ts">
// const { totalItems } = useCart()
const mobileMenuOpen = ref(false)

// Fechar menu mobile ao mudar de rota
const route = useRoute()
watch(() => route.path, () => {
  mobileMenuOpen.value = false
})
</script>