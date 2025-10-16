import type { Product } from "~~/types";

export const useCart = () => {
  const cartStore = useCartStore();

  const addToCart = (product: Product) => {
    cartStore.addItem(product);
    alert(`${product.title} adicionado ao carrinho!`);
  };
   const removeFromCart = (productId: number, productTitle?: string) => {
    cartStore.removeItem(productId)
    alert(productTitle ? `${productTitle} removido do carrinho` : 'Item removido do carrinho')
  }
  const increment = (productId: number) => {
    cartStore.incrementItemQuantity(productId)
  }
  const decrement = (productId: number) => {
    cartStore.decrementItemQuantity(productId);
  };
  const clearCart = () => {
    if (confirm('Tem certeza que deseja limpar o carrinho?')) {
      cartStore.clearCart();
      alert('Carrinho limpo!');
    }
  };

  return{
    items: computed(() => cartStore.items),
    totalItems: computed(() => cartStore.totalItems),
    totalPrice: computed(() => cartStore.totalPrice),
    isEmpty: computed(() => cartStore.isEmpty),
    lastUpdated: computed(() => cartStore.lastUpdated),

    addToCart,
    removeFromCart,
    clearCart,
    isInCart: cartStore.isInCart,
    increment,
    decrement,
    getItemQuantity: cartStore.getItemQuantity,
  }
};
