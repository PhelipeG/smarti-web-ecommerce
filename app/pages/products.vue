<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors duration-300">
    <div class="container mx-auto px-4">
      <!-- Breadcrumb -->
      <div class="mb-6">
        <Breadcrumb :items="breadcrumbItems" />
      </div>

      <div class="mb-8">
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Nossos Produtos
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          Explore nossa coleção completa de produtos
        </p>
      </div>

      <!-- Filtros -->
      <ProductFilters
        :search-query="searchQuery"
        :selected-category="selectedCategory"
        :categories="categories"
        :has-active-filters="hasActiveFilters"
        :results-count="filteredProducts.length"
        @update:search="setSearch"
        @update:category="setCategory"
        @clear="clearFilters"
      />

      <!-- Loading State -->
      <div
        v-if="isLoading"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <ProductSkeleton
          v-for="n in 8"
          :key="n"
        />
      </div>

      <!-- Error State -->
      <ErrorState
        v-else-if="isError"
        title="Erro ao carregar produtos"
        :error="error"
        @retry="refetch"
      />

      <!-- Lista de Produtos -->
      <div v-else>
        <div
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <ProductCard
            v-for="product in filteredProducts"
            :key="product.id"
            :product="product"
          />
        </div>
        <!-- Informação de produtos carregados -->
        <div class="mt-8 text-center text-gray-600 dark:text-gray-400">
          <p>
            Exibindo {{ filteredProducts.length }} de
            {{ products.length }} produtos
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BreadcrumbItem, } from '~/components/common/Breadcrumb.vue'

definePageMeta({
  layout: 'default',
},)

const breadcrumbItems: BreadcrumbItem[] = [
  { label: 'Home', to: '/', },
  { label: 'Produtos', },
]

const { products, isLoading, isError, error, refetch, } = useProducts()
const { categories, } = useProductCategories()
const {
  filteredProducts,
  searchQuery,
  selectedCategory,
  hasActiveFilters,
  setCategory,
  setSearch,
  clearFilters,
} = useFilteredProducts()

const route = useRoute()

onMounted(() => {
  if (route.query.category && typeof route.query.category === 'string') {
    setCategory(route.query.category,)
  }
  if (route.query.search && typeof route.query.search === 'string') {
    setSearch(route.query.search,)
  }
},)
watch([selectedCategory, searchQuery,], () => {
  const query: Record<string, string> = {}

  if (selectedCategory.value !== 'all') {
    query.category = selectedCategory.value
  }

  if (searchQuery.value.trim()) {
    query.search = searchQuery.value
  }

  navigateTo(
    {
      path: '/products',
      query,
    },
    {
      replace: true,
    },
  )
},)

// SEO
useHead({
  title: 'Produtos - Smarti Store',
  meta: [
    {
      name: 'description',
      content:
        'Navegue por nosso catálogo completo de produtos com as melhores ofertas.',
    },
  ],
},)
</script>

<style>
.rotate-enter-active,
.rotate-leave-active {
  transition: all 0.4s;
}
.rotate-enter-from,
.rotate-leave-to {
  opacity: 0;
  transform: rotate3d(1, 1, 1, 15deg);
}
</style>
