<template>
  <section class="py-12 sm:py-16">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
        <!-- Feature 1 -->
        <div class="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow text-center">
          <div class="bg-blue-100 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              class="w-7 h-7 sm:w-8 sm:h-8 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
              />
            </svg>
          </div>
          <h3 class="text-lg sm:text-xl font-bold text-gray-900 mb-2">
            Produtos de Qualidade
          </h3>
          <p class="text-sm sm:text-base text-gray-600">
            Seleção criteriosa dos melhores produtos do mercado
          </p>
        </div>

        <!-- Feature 2 -->
        <div class="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow text-center">
          <div class="bg-green-100 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              class="w-7 h-7 sm:w-8 sm:h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 class="text-lg sm:text-xl font-bold text-gray-900 mb-2">
            Melhores Preços
          </h3>
          <p class="text-sm sm:text-base text-gray-600">
            Preços competitivos e ofertas especiais diariamente
          </p>
        </div>

        <!-- Feature 3 -->
        <div class="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow text-center sm:col-span-2 lg:col-span-1">
          <div class="bg-purple-100 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              class="w-7 h-7 sm:w-8 sm:h-8 text-purple-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <h3 class="text-lg sm:text-xl font-bold text-gray-900 mb-2">
            Entrega Rápida
          </h3>
          <p class="text-sm sm:text-base text-gray-600">
            Frete grátis e entrega ágil para todo o Brasil
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts"></script>
