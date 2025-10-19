import { defineStore, } from 'pinia'
import type { CartState, Product, } from '~~/types'

const STORAGE_KEY = 'smarti-cart'

export const useCartStore = defineStore('cart', {
  state: (): CartState => ({
    items: [],
    lastUpdated: null,
  }),
  getters: {
    totalItems: (state,): number => {
      return state.items.reduce((total, item,) => total + item.quantity, 0,)
    },
    totalPrice: (state,): number => {
      return state.items.reduce(
        (total, item,) => item.price * item.quantity + total,
        0,
      )
    },
    isEmpty: (state,): boolean => state.items.length === 0,
    isInCart: (state,) => {
      return (productId: number,): boolean => {
        return state.items.some(item => item.id === productId,)
      }
    },
    getItemQuantity: (state,) => {
      return (productId: number,): number => {
        const item = state.items.find(item => item.id === productId,)
        return item?.quantity || 0
      }
    },
  },
  actions: {
    _persist() {
      this.lastUpdated = new Date()

      if (import.meta.client) {
        try {
          localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({ items: this.items, lastUpdated: this.lastUpdated, },),
          )
        }
        catch {
          // Falha silenciosa - localStorage pode estar desabilitado
        }
      }
    },
    addItem(product: Product,) {
      const existingItem = this.items.find(item => item.id === product.id,)

      if (existingItem) {
        existingItem.quantity += 1
      }
      else {
        this.items.push({ ...product, quantity: 1, },)
      }
      this._persist()
    },
    removeItem(productId: number,) {
      this.items = this.items.filter(item => item.id !== productId,)
      this._persist()
    },
    updateItemQuantity(productId: number, quantity: number,) {
      const item = this.items.find(item => item.id === productId,)

      if (item) {
        if (quantity <= 0) {
          this.removeItem(productId,)
        }
        else {
          item.quantity = quantity
          this._persist()
        }
      }
    },
    incrementItemQuantity(productId: number,) {
      const item = this.items.find(item => item.id === productId,)
      if (item) {
        item.quantity += 1
        this._persist()
      }
    },
    decrementItemQuantity(productId: number,) {
      const item = this.items.find(item => item.id === productId,)
      if (item) {
        if (item.quantity > 1) {
          item.quantity--
          this._persist()
        }
        else {
          this.removeItem(productId,)
        }
      }
    },
    clearCart() {
      this.items = []
      this._persist()
    },
    loadCart() {
      if (import.meta.client) {
        try {
          const data = localStorage.getItem(STORAGE_KEY,)
          if (data) {
            const parsed = JSON.parse(data,)
            this.items = parsed.items || []
            this.lastUpdated = parsed.lastUpdated
              ? new Date(parsed.lastUpdated,)
              : null
          }
        }
        catch {
          // Falha silenciosa - dados corrompidos ou inexistentes
        }
      }
    },
  },
},)
