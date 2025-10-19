import type { CartItem, } from '../../types'

export const useCheckoutModal = () => {
  const isOpen = useState('checkoutModalOpen', () => false,)
  const cartItems = useState<CartItem[]>('checkoutItems', () => [],)
  const cartTotal = useState('checkoutTotal', () => 0,)

  const open = (items: CartItem[], total: number,) => {
    cartItems.value = items
    cartTotal.value = total
    isOpen.value = true
  }

  const close = () => {
    isOpen.value = false
  }

  return {
    isOpen: readonly(isOpen,),
    cartItems: readonly(cartItems,),
    cartTotal: readonly(cartTotal,),
    open,
    close,
  }
}
