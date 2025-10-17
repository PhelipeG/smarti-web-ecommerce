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
    addItem(product: Product,) {
      const existingItem = this.items.find(item => item.id === product.id,)

      if (existingItem) {
        existingItem.quantity += 1
      }
      else {
        this.items.push({ ...product, quantity: 1, },)
      }
    },
    removeItem(productId: number,) {
      this.items = this.items.filter(item => item.id !== productId,)
    },
    incrementItemQuantity(productId: number,) {
      const item = this.items.find(item => item.id === productId,)
      if (item) {
        item.quantity += 1
        this.lastUpdated = new Date()
        this.persistCart()
      }
    },
    decrementItemQuantity(productId: number,) {
      const item = this.items.find(item => item.id === productId,)
      if (item) {
        if (item.quantity > 1) {
          item.quantity--
          this.lastUpdated = new Date()
          this.persistCart()
        }
        else {
          this.removeItem(productId,)
        }
      }
    },
    persistCart() {
      if (import.meta.client) {
        try {
          localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({
              items: this.items,
              lastUpdated: this.lastUpdated,
            },),
          )
        }
        catch (error) {
          console.error('Erro ao salvar carrinho:', error,)
        }
      }
    },
    clearCart() {
      this.items = []
      this.lastUpdated = new Date()
      this.persistCart()
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
        catch (error) {
          console.error('Erro ao carregar carrinho:', error,)
        }
      }
    },
  },
},)
