<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden animate-pulse">
    <!-- Imagem skeleton -->
    <div class="bg-gray-200 dark:bg-gray-700 h-48 sm:h-56 md:h-64" />

    <!-- Conteúdo skeleton -->
    <div class="p-4 sm:p-5 space-y-3 sm:space-y-4">
      <!-- Título -->
      <div class="space-y-2">
        <div class="h-3 sm:h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
        <div class="h-3 sm:h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
      </div>

      <!-- Descrição -->
      <div class="space-y-2">
        <div class="h-2.5 sm:h-3 bg-gray-200 dark:bg-gray-700 rounded" />
        <div class="h-2.5 sm:h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
      </div>

      <!-- Preço e botão -->
      <div class="flex items-center justify-between pt-3 sm:pt-4">
        <div class="h-7 sm:h-8 bg-gray-200 dark:bg-gray-700 rounded w-20 sm:w-24" />
        <div class="h-9 sm:h-10 bg-gray-200 dark:bg-gray-700 rounded w-24 sm:w-28" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>
