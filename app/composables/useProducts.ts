import { useQuery, } from '@tanstack/vue-query'
import { productsAPI, } from '../services/product-services'

// Constantes de cache centralizadas
const CACHE_CONFIG = {
  products: {
    staleTime: 1000 * 60 * 5, // 5 minutos
    gcTime: 1000 * 60 * 10, // 10 minutos
  },
  categories: {
    staleTime: 1000 * 60 * 30, // 30 minutos
    gcTime: 1000 * 60 * 60, // 1 hora
  },
} as const

/**
 * Hook para buscar todos os produtos
 */
export const useProducts = () => {
  const {
    data: products,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['products',],
    queryFn: productsAPI.getAll,
    staleTime: CACHE_CONFIG.products.staleTime,
    gcTime: CACHE_CONFIG.products.gcTime,
  },)

  return {
    products: computed(() => products.value || [],),
    isLoading,
    isError,
    error,
    refetch,
  }
}

/**
 * Hook para buscar categorias de produtos
 */
export const useProductCategories = () => {
  const {
    data: categories,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['categories',],
    queryFn: productsAPI.getCategories,
    staleTime: CACHE_CONFIG.categories.staleTime,
    gcTime: CACHE_CONFIG.categories.gcTime,
  },)

  return {
    categories: computed(() => categories.value || [],),
    isLoading,
    isError,
  }
}

/**
 * Hook para filtrar produtos por categoria e busca
 */
export const useFilteredProducts = () => {
  const { products, } = useProducts()
  const searchQuery = ref('',)
  const selectedCategory = ref('all',)

  // Memoização da query normalizada para evitar recálculo
  const normalizedQuery = computed(() =>
    searchQuery.value.toLowerCase().trim(),
  )

  const filteredProducts = computed(() => {
    let filtered = products.value

    // Filtro por categoria (mais rápido, aplicar primeiro)
    if (selectedCategory.value && selectedCategory.value !== 'all') {
      filtered = filtered.filter(
        product => product.category === selectedCategory.value,
      )
    }

    // Filtro por busca textual
    if (normalizedQuery.value) {
      filtered = filtered.filter(
        product =>
          product.title.toLowerCase().includes(normalizedQuery.value,)
          || product.description.toLowerCase().includes(normalizedQuery.value,),
      )
    }

    return filtered
  },)

  const setCategory = (category: string,) => {
    selectedCategory.value = category
  }

  const setSearch = (query: string,) => {
    searchQuery.value = query
  }

  const clearFilters = () => {
    searchQuery.value = ''
    selectedCategory.value = 'all'
  }

  const hasActiveFilters = computed(
    () => normalizedQuery.value !== '' || selectedCategory.value !== 'all',
  )

  return {
    filteredProducts,
    searchQuery,
    selectedCategory,
    setCategory,
    setSearch,
    clearFilters,
    hasActiveFilters,
  }
}
