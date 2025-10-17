<template>
  <div class="bg-white rounded-xl shadow-md p-6 mb-6">
    <div class="flex flex-col md:flex-row gap-4">
      <!-- Busca -->
      <div class="flex-1">
        <label
          for="search"
          class="block text-sm font-medium text-gray-700 mb-2"
        >
          Buscar produtos
        </label>
        <div class="relative">
          <input
            id="search"
            type="text"
            :value="searchQuery"
            placeholder="Digite o nome do produto..."
            class="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            @input="handleSearch"
          >
          <LucideSearch
            class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
          />
        </div>
      </div>

      <!-- Filtro por categoria -->
      <div class="md:w-64">
        <label
          for="category"
          class="block text-sm font-medium text-gray-700 mb-2"
        >
          Categoria
        </label>
        <select
          id="category"
          :value="selectedCategory"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white cursor-pointer"
          @change="handleCategoryChange"
        >
          <option value="all">
            Todas as categorias
          </option>
          <option
            v-for="category in categories"
            :key="category"
            :value="category"
          >
            {{ formatCategory(category,) }}
          </option>
        </select>
      </div>

      <!-- Botão limpar filtros -->
      <div class="flex items-end">
        <button
          v-if="hasActiveFilters"
          class="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium flex items-center space-x-2"
          @click="handleClearFilters"
        >
          <LucideX class="w-5 h-5" />
          <span>Limpar</span>
        </button>
      </div>
    </div>

    <!-- Contador de resultados -->
    <div
      v-if="resultsCount !== undefined"
      class="mt-4 text-sm text-gray-600"
    >
      <span class="font-semibold">{{ resultsCount }}</span>
      {{ resultsCount === 1 ? "produto encontrado" : "produtos encontrados" }}
      <span
        v-if="hasActiveFilters"
        class="text-blue-600"
      >
        (filtrado{{
          selectedCategory !== "all"
            ? ` - ${formatCategory(selectedCategory,)}`
            : ""
        }})
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  searchQuery: string
  selectedCategory: string
  categories: string[]
  hasActiveFilters: boolean
  resultsCount?: number
}>()

// Emissão de eventos
const emit = defineEmits<{
  'update:search': [value: string,]
  'update:category': [value: string,]
  'clear': []
}>()

const handleSearch = (event: Event,) => {
  const target = event.target as HTMLInputElement
  emit('update:search', target.value,)
}

const handleCategoryChange = (event: Event,) => {
  const target = event.target as HTMLSelectElement
  emit('update:category', target.value,)
}

const handleClearFilters = () => {
  emit('clear',)
}
</script>
