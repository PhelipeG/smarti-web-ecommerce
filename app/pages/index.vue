<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300"
  >
    <!-- Hero Section -->
    <section class="py-12 sm:py-16 lg:py-20">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto text-center">
          <!-- Logo animado -->
          <div class="mb-6 sm:mb-8 flex justify-center">
            <div
              class="bg-gradient-to-r from-blue-600 to-purple-600 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-2xl flex items-center justify-center shadow-2xl animate-bounce"
            >
              <span class="text-white font-bold text-2xl sm:text-3xl lg:text-4xl">S</span>
            </div>
          </div>

          <!-- Título -->
          <h1
            class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 px-4"
          >
            Bem-vindo à
            <span
              class="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text"
            >
              Smarti Store
            </span>
          </h1>

          <!-- Subtítulo -->
          <p
            class="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 sm:mb-12 max-w-2xl mx-auto px-4"
          >
            Descubra os melhores produtos com preços incríveis. Navegue pelo
            nosso catálogo e aproveite ofertas exclusivas!
          </p>

          <div
            class="flex flex-col sm:flex-row gap-4 justify-center items-center px-4"
          >
            <NuxtLink
              to="/products"
              class="w-full sm:w-auto group inline-flex items-center justify-center space-x-3 bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:bg-blue-700 transition-all hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span>Explore Nossos Produtos</span>
              <LucideMoveRight class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <FeaturesSection />
  </div>
</template>

<script setup lang="ts">
// SEO
useHead({
  title: 'Home - Smarti Store',
  meta: [
    {
      name: 'description',
      content:
        'Bem-vindo à Smarti Store. Os melhores produtos com preços incríveis!',
    },
    { name: 'viewport', content: 'width=device-width, initial-scale=1', },
  ],
},)
</script>
