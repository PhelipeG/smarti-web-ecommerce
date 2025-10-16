// Product interface
export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

// Cart related interfaces
export interface CartItem extends Product {
  quantity: number
}

export interface CartState {
  items: CartItem[]
  lastUpdated: Date | null
}

// Filter interfaces
export interface ProductFilters {
  category: string
  search: string
}