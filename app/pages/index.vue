<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50"
  >
    <!-- Hero Section -->
    <section class="py-12 sm:py-16 lg:py-20">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto text-center">
          <!-- Logo animado -->
          <div class="mb-6 sm:mb-8 flex justify-center">
            <div
              class="bg-gradient-to-r from-blue-600 to-purple-600 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center shadow-2xl animate-bounce"
            >
              <span class="text-white font-bold text-3xl sm:text-4xl">S</span>
            </div>
          </div>

          <!-- Título -->
          <h1
            class="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 px-4"
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
            class="text-lg sm:text-xl text-gray-600 mb-8 sm:mb-12 max-w-2xl mx-auto px-4"
          >
            Descubra os melhores produtos com preços incríveis. Navegue pelo
            nosso catálogo e aproveite ofertas exclusivas!
          </p>

          <!-- CTA Buttons -->
          <div
            class="flex flex-col sm:flex-row gap-4 justify-center items-center px-4"
          >
            <NuxtLink
              to="/products"
              class="w-full sm:w-auto group inline-flex items-center justify-center space-x-3 bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:bg-blue-700 transition-all hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span>Explorar Produtos</span>
              <svg
                class="w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </NuxtLink>

            <NuxtLink
              to="/cart"
              class="w-full sm:w-auto inline-flex items-center justify-center space-x-3 bg-white text-gray-800 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:bg-gray-50 transition-all border-2 border-gray-200 hover:border-blue-200 shadow-md"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span>Ver Carrinho</span>
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
  title: "Home - Smarti Store",
  meta: [
    {
      name: "description",
      content:
        "Bem-vindo à Smarti Store. Os melhores produtos com preços incríveis!",
    },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
  ],
});
</script>
