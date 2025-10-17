<template>
  <section class="py-12 sm:py-16">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
        <!-- Feature 1 -->
        <div class="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow text-center">
          <div class="bg-blue-100 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <lucide-sparkles class="w-7 h-7 sm:w-8 sm:h-8 text-blue-600" />
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
            <lucide-circle-dollar-sign class="w-7 h-7 sm:w-8 sm:h-8 text-green-600" />
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
            <lucide-zap class="w-7 h-7 sm:w-8 sm:h-8 text-purple-600" />
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
