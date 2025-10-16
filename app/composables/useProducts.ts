import { useQuery } from "@tanstack/vue-query";
import { productsAPI } from "../services/product-services";

export const useProducts = () => {
  const STALE_TIME = 1000 * 60 * 5; // 5 minutos
  const GC_TIME = 1000 * 60 * 10; // 10 minutos

  const {
    data: products,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: productsAPI.getAll,
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
  });
  return {
    products: computed(() => products.value || []),
    isLoading,
    isError,
    error,
    refetch,
  };
};

export const useProductCategories = () => {
  const STALE_TIME = 1000 * 60 * 30; // 30 minutos

  // Query para buscar categorias
  const {
    data: categories,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: productsAPI.getCategories,
    staleTime: STALE_TIME,
  });

  return {
    categories: computed(() => categories.value || []),
    isLoading,
    isError,
  };
};
export const useFilteredProducts = () => {
  const { products } = useProducts();
  const searchQuery = ref("");
  const selectedCategory = ref("all");

  const filteredProducts = computed(() => {
    let filtered = products.value;

    if (selectedCategory.value && selectedCategory.value !== "all") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory.value
      );
    }
    if (searchQuery.value.trim()) {
      const query = searchQuery.value.toLowerCase().trim();
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
      );
    }
    return filtered;
  });
  // Funções para atualizar filtros e limpar
  const setCategory = (category: string) => {
    selectedCategory.value = category;
  };

  const setSearch = (query: string) => {
    searchQuery.value = query;
  };

  const clearFilters = () => {
    searchQuery.value = "";
    selectedCategory.value = "all";
  };

  return {
    filteredProducts,
    searchQuery,
    selectedCategory,
    setCategory,
    setSearch,
    clearFilters,
    hasActiveFilters: computed(
      () => searchQuery.value.trim() !== "" || selectedCategory.value !== "all"
    ),
  };
};
