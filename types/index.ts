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

// Order interfaces
export interface Order {
  id: string
  name: string
  address: string
  items: CartItem[]
  total: number
  date: string
}

// Filter interfaces
export interface ProductFilters {
  category: string
  search: string
}
