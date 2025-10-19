import type { CartItem, } from '../../types'

interface Order {
  id: string
  name: string
  address: string
  items: CartItem[]
  total: number
  date: string
}

const STORAGE_KEY = 'smart-ecommerce-orders'

export const useOrders = () => {
  const saveOrder = (name: string, address: string, items: CartItem[], total: number,): string => {
    const orderId = `ORDER-${Date.now()}`
    const order: Order = {
      id: orderId,
      name,
      address,
      items,
      total,
      date: new Date().toISOString(),
    }

    const orders = getOrders()
    orders.push(order,)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders,),)

    return orderId
  }

  const getOrders = (): Order[] => {
    if (!import.meta.client) return []
    const stored = localStorage.getItem(STORAGE_KEY,)
    return stored ? JSON.parse(stored,) : []
  }

  return {
    saveOrder,
    getOrders,
  }
}
