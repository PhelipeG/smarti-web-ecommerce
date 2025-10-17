import type { Product, } from '../../types'

export const productsAPI = {
  // Buscar todos os produtos
  getAll: async (): Promise<Product[]> => {
    const { data, } = await api.get<Product[]>('/products',)
    return data
  },

  // Buscar produto por ID
  getById: async (id: number,): Promise<Product> => {
    const { data, } = await api.get<Product>(`/products/${id}`,)
    return data
  },

  // Buscar produtos por categoria
  getByCategory: async (category: string,): Promise<Product[]> => {
    const { data, } = await api.get<Product[]>(`/products/category/${category}`,)
    return data
  },

  // Buscar todas as categorias
  getCategories: async (): Promise<string[]> => {
    const { data, } = await api.get<string[]>('/products/categories',)
    return data
  },
}
