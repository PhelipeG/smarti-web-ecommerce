<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6 transition-colors duration-300">
    <div class="flex flex-col md:flex-row gap-4">
      <!-- Busca -->
      <div class="flex-1">
        <Input
          :model-value="searchQuery"
          type="search"
          label="Buscar produtos"
          placeholder="Digite o nome do produto..."
          aria-label="Campo de busca de produtos"
          @update:model-value="handleSearch"
        >
          <template #icon>
            <LucideSearch class="w-5 h-5" />
          </template>
        </Input>
      </div>

      <!-- Filtro por categoria -->
      <div class="md:w-64">
        <label
          for="category"
          class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Categoria
        </label>
        <select
          id="category"
          :value="selectedCategory"
          class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 cursor-pointer"
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
        <Button
          v-if="hasActiveFilters"
          variant="secondary"
          size="lg"
          aria-label="Limpar todos os filtros"
          @click="handleClearFilters"
        >
          <LucideX class="w-5 h-5" />
          <span>Limpar</span>
        </Button>
      </div>
    </div>

    <!-- Contador de resultados -->
    <div
      v-if="resultsCount !== undefined"
      class="mt-4 text-sm text-gray-600 dark:text-gray-400"
    >
      <span class="font-semibold">{{ resultsCount }}</span>
      {{ resultsCount === 1 ? "produto encontrado" : "produtos encontrados" }}
      <span
        v-if="hasActiveFilters"
        class="text-blue-600 dark:text-blue-400"
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
defineProps<{
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

const handleSearch = (value: string | number,) => {
  emit('update:search', String(value,),)
}

const handleCategoryChange = (event: Event,) => {
  const target = event.target as HTMLSelectElement
  emit('update:category', target.value,)
}

const handleClearFilters = () => {
  emit('clear',)
}
</script>
