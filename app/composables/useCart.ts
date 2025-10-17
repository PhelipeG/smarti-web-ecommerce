import type { Product, } from '~~/types'

/**
 * Composable para gerenciar ações do carrinho de compras
 * Centraliza toda a lógica de manipulação do carrinho
 */
export const useCart = () => {
  const cartStore = useCartStore()

  /**
   * Adiciona um produto ao carrinho
   * Se já existir, incrementa a quantidade
   */
  const addToCart = (product: Product,) => {
    cartStore.addItem(product,)
    alert(`${product.title} adicionado ao carrinho!`,)
  }

  /**
   * Remove um produto do carrinho
   */
  const removeFromCart = (productId: number, productTitle?: string,) => {
    cartStore.removeItem(productId,)
    alert(productTitle ? `${productTitle} removido do carrinho` : 'Item removido do carrinho',)
  }

  /**
   * Incrementa a quantidade de um item
   */
  const increment = (productId: number,) => {
    cartStore.incrementItemQuantity(productId,)
  }

  /**
   * Decrementa a quantidade de um item
   */
  const decrement = (productId: number,) => {
    cartStore.decrementItemQuantity(productId,)
  }

  /**
   * Limpa todo o carrinho após confirmação
   */
  const clearCart = () => {
    if (confirm('Tem certeza que deseja limpar o carrinho?',)) {
      cartStore.clearCart()
      alert('Carrinho limpo!',)
    }
  }

  /**
   * Toggle: adiciona se não está no carrinho, remove se está
   * Útil para botões de add/remove
   */
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
