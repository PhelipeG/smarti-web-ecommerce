
<template>
  <div class="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
    <!-- Imagem skeleton -->
    <div class="bg-gray-200 h-64"></div>
    
    <!-- Conteúdo skeleton -->
    <div class="p-5 space-y-4">
      <!-- Título -->
      <div class="space-y-2">
        <div class="h-4 bg-gray-200 rounded w-3/4"></div>
        <div class="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
      
      <!-- Descrição -->
      <div class="space-y-2">
        <div class="h-3 bg-gray-200 rounded"></div>
        <div class="h-3 bg-gray-200 rounded w-5/6"></div>
      </div>
      
      <!-- Preço e botão -->
      <div class="flex items-center justify-between pt-4">
        <div class="h-8 bg-gray-200 rounded w-24"></div>
        <div class="h-10 bg-gray-200 rounded w-28"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>