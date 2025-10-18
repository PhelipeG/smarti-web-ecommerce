import type { Product, } from '~~/types'

export const useCart = () => {
  const cartStore = useCartStore()
  const toast = useToast()

  const addToCart = (product: Product,) => {
    cartStore.addItem(product,)
    toast.success({
      title: 'Sucesso!',
      message: `${product.title} adicionado ao carrinho.`,
    },)
  }

  const removeFromCart = (productId: number, productTitle?: string,) => {
    cartStore.removeItem(productId,)
    toast.info({
      title: 'Item removido',
      message: productTitle ? `${productTitle} foi removido do carrinho.` : 'Item removido do carrinho.',
    },)
  }

  const updateQuantity = (productId: number, action: 'increment' | 'decrement',) => {
    if (action === 'increment') {
      cartStore.incrementItemQuantity(productId,)
    }
    else {
      cartStore.decrementItemQuantity(productId,)
    }
  }

  const increment = (productId: number,) => updateQuantity(productId, 'increment',)
  const decrement = (productId: number,) => updateQuantity(productId, 'decrement',)

  const clearCart = (showToast = true,) => {
    cartStore.clearCart()
    if (showToast) {
      toast.success({
        title: 'Carrinho limpo!',
        message: 'Todos os itens foram removidos.',
      },)
    }
  }

  const toggleCart = (product: Product,) => {
    if (cartStore.isInCart(product.id,)) {
      removeFromCart(product.id, product.title,)
    }
    else {
      addToCart(product,)
    }
  }

  return {
    // Estado computado
    items: computed(() => cartStore.items,),
    totalItems: computed(() => cartStore.totalItems,),
    totalPrice: computed(() => cartStore.totalPrice,),
    isEmpty: computed(() => cartStore.isEmpty,),
    lastUpdated: computed(() => cartStore.lastUpdated,),

    // Ações
    addToCart,
    removeFromCart,
    clearCart,
    increment,
    decrement,
    toggleCart,

    // Helpers
    isInCart: cartStore.isInCart,
    getItemQuantity: cartStore.getItemQuantity,
  }
}
