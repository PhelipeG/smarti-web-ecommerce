import { createPinia, setActivePinia, } from 'pinia'
import { describe, it, expect, beforeEach, } from 'vitest'
import { useCartStore, } from '~/stores/cart' // Adicionar esta linha
import type { Product, } from '~~/types'

const localStorageMock = (() => {
  let store: Record<string, string> = {}

  return {
    getItem: (key: string,) => store[key] || null,
    setItem: (key: string, value: string,) => {
      store[key] = value.toString()
    },
    removeItem: (key: string,) => {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete store[key]
    },
    clear: () => {
      store = {}
    },
  }
})()

Object.defineProperty(global, 'localStorage', {
  value: localStorageMock,
},)

const mockProduct: Product = {
  id: 1,
  title: 'Produto Teste',
  price: 99.99,
  description: 'Descrição do produto teste',
  category: 'electronics',
  image: 'https://via.placeholder.com/150',
  rating: {
    rate: 4.5,
    count: 100,
  },
}

const mockProduct2: Product = {
  id: 2,
  title: 'Produto Teste 2',
  price: 149.99,
  description: 'Descrição do produto teste 2',
  category: 'jewelery',
  image: 'https://via.placeholder.com/150',
  rating: {
    rate: 4.8,
    count: 50,
  },
}

describe('Teste do Store do Carrinho', () => {
  beforeEach(() => {
    // Criar nova instância do Pinia para cada teste
    setActivePinia(createPinia(),)
    localStorageMock.clear()
  },)

  it('Deve Iniciar com o carrinho vazio', () => {
    const cartStore = useCartStore()

    expect(cartStore.items.length,).toBe(0,)
    expect(cartStore.isEmpty,).toBe(true,)
    expect(cartStore.totalItems,).toBe(0,)
    expect(cartStore.lastUpdated,).toBeNull()
  },)
  it('Deve adicionar um produto ao carrinho', () => {
    const cartStore = useCartStore()
    cartStore.addItem(mockProduct,)

    expect(cartStore.items.length,).toBe(1,)
    expect(cartStore.items[0]?.id,).toBe(mockProduct.id,)
  },)
  it('Deve atualizar a quantidade de um produto existente', () => {
    const cartStore = useCartStore()
    cartStore.addItem(mockProduct2,)
    cartStore.updateItemQuantity(mockProduct2.id, 8,)

    expect(cartStore.items[0]?.quantity,).toBe(8,)
  },)
  it('não deve fazer nada se produto não existe', () => {
    const store = useCartStore()
    store.addItem(mockProduct,)
    store.removeItem(999,)

    expect(store.items,).toHaveLength(1,)
  },)
  it('getItemQuantity deve retornar quantidade correta', () => {
    const store = useCartStore()
    store.addItem(mockProduct,)
    store.addItem(mockProduct,)

    expect(store.getItemQuantity(mockProduct.id,),).toBe(2,)
    expect(store.getItemQuantity(999,),).toBe(0,)
  },)
  it('isInCart deve verificar se produto está no carrinho', () => {
    const store = useCartStore()
    store.addItem(mockProduct,)

    expect(store.isInCart(mockProduct.id,),).toBe(true,)
    expect(store.isInCart(999,),).toBe(false,)
  },)
  it('TotalPrice deve calcular preço total corretamente', () => {
    const store = useCartStore()
    store.addItem(mockProduct,) // 99.99
    store.addItem(mockProduct,) // 99.99
    store.addItem(mockProduct2,) // 149.99

    const expected = (mockProduct.price * 2) + mockProduct2.price
    expect(store.totalPrice,).toBeCloseTo(expected, 2,)
  },)
  it('TotalItems deve calcular quantidade total corretamente', () => {
    const store = useCartStore()
    store.addItem(mockProduct,)
    store.addItem(mockProduct,)
    store.addItem(mockProduct2,)

    expect(store.totalItems,).toBe(3,)
  },)
  it('Deve limpar todos os itens do carrinho', () => {
    const store = useCartStore()
    store.addItem(mockProduct,)
    store.addItem(mockProduct2,)
    store.clearCart()

    expect(store.items,).toHaveLength(0,)
    expect(store.isEmpty,).toBe(true,)
  },)
  it('Deve remover produto se quantidade chegar a 0', () => {
    const store = useCartStore()
    store.addItem(mockProduct,)
    store.decrementItemQuantity(mockProduct.id,)

    expect(store.items,).toHaveLength(0,)
  },)
  it('Deve incrementar quantidade em 1', () => {
    const store = useCartStore()
    store.addItem(mockProduct,)
    store.incrementItemQuantity(mockProduct.id,)

    expect(store.items[0]?.quantity,).toBe(2,)
  },)
  it('Deve decrementar quantidade em 1', () => {
    const store = useCartStore()
    store.addItem(mockProduct,)
    store.addItem(mockProduct,)
    store.decrementItemQuantity(mockProduct.id,)

    expect(store.items[0]?.quantity,).toBe(1,)
  },)
  it('deve remover produto se quantidade for 0 ou negativa', () => {
    const store = useCartStore()
    store.addItem(mockProduct,)
    store.updateItemQuantity(mockProduct.id, 0,)

    expect(store.items,).toHaveLength(0,)
  },)
  it('Deve remover um produto do carrinho', () => {
    const store = useCartStore()
    store.addItem(mockProduct,)
    store.removeItem(mockProduct.id,)

    expect(store.items,).toHaveLength(0,)
    expect(store.isEmpty,).toBe(true,)
  },)
  it('Deve atualizar lastUpdated ao adicionar', () => {
    const store = useCartStore()
    const beforeAdd = new Date()

    store.addItem(mockProduct,)

    // Verificar se lastUpdated foi definido (não é null)
    expect(store.lastUpdated,).not.toBeNull()
    expect(store.lastUpdated,).toBeInstanceOf(Date,)
    expect(store.lastUpdated!.getTime(),).toBeGreaterThanOrEqual(beforeAdd.getTime(),)
  },)
  it('Deve carregar carrinho do localStorage', () => {
    const savedData = {
      items: [{ ...mockProduct, quantity: 2, },],
      lastUpdated: new Date().toISOString(),
    }
    localStorageMock.setItem('smarti-cart', JSON.stringify(savedData,),)

    const store = useCartStore()
    store.loadCart()

    expect(store.items,).toHaveLength(1,)
    expect(store.items[0]?.quantity,).toBe(2,)
  },)
  it('Deve persistir carrinho no localStorage', () => {
    const store = useCartStore()
    store.addItem(mockProduct,)

    const stored = localStorageMock.getItem('smarti-cart',)
    expect(stored,).toBeTruthy()

    const parsed = JSON.parse(stored!,)
    expect(parsed.items,).toHaveLength(1,)
    expect(parsed.items[0].id,).toBe(mockProduct.id,)
  },)
},)
