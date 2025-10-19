<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-300"
      leave-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4"
        @click="handleClose"
      >
        <Transition
          enter-active-class="transition-transform duration-300"
          leave-active-class="transition-transform duration-300"
          enter-from-class="scale-90"
          leave-to-class="scale-90"
        >
          <div
            v-if="isOpen"
            class="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 sm:p-8"
            @click.stop
          >
            <button
              aria-label="Fechar modal"
              class="absolute top-4 right-4 p-2 text-2xl text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
              @click="handleClose"
            >
              ✕
            </button>

            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Finalizar Compra
            </h2>

            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 mb-6">
              <p class="text-xl font-bold text-green-600 dark:text-green-400 mb-1">
                Total: {{ formatCurrency(cartTotal,) }}
              </p>
              <p class="text-sm text-gray-600 dark:text-gray-300">
                {{ cartItems.length }} {{ cartItems.length === 1 ? 'item' : 'itens' }}
              </p>
            </div>

            <form
              class="space-y-5"
              @submit.prevent="handleSubmit"
            >
              <div class="space-y-2">
                <label
                  for="name"
                  class="block text-sm font-semibold text-gray-700 dark:text-gray-200"
                >
                  Nome completo *
                </label>
                <Input
                  id="name"
                  v-model="form.name"
                  type="text"
                  required
                  placeholder="Seu nome"
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent transition"
                />
              </div>

              <div class="space-y-2">
                <label
                  for="address"
                  class="block text-sm font-semibold text-gray-700 dark:text-gray-200"
                >
                  Endereço completo *
                </label>
                <textarea
                  id="address"
                  v-model="form.address"
                  required
                  placeholder="Rua, número, bairro, cidade, estado"
                  rows="3"
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent transition resize-none"
                />
              </div>

              <Button
                type="submit"
                :disabled="isSubmitting"
                class="w-full mt-6"
              >
                {{ isSubmitting ? 'Processando...' : 'Finalizar Compra' }}
              </Button>
            </form>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import type { CartItem, } from '../../../types'

const { isOpen, cartItems, cartTotal, close, } = useCheckoutModal()
const { saveOrder, } = useOrders()
const { clearCart, } = useCart()
const toast = useToast()

const form = reactive({
  name: '',
  address: '',
},)

const isSubmitting = ref(false,)

const handleSubmit = async () => {
  isSubmitting.value = true

  try {
    const items: CartItem[] = JSON.parse(JSON.stringify(cartItems.value,),)

    const orderId = saveOrder(
      form.name,
      form.address,
      items,
      cartTotal.value,
    )

    toast.success({ message: `Pedido ${orderId} finalizado com sucesso!`, },)

    clearCart()
    handleClose()

    await navigateTo('/products',)
  }
  catch {
    toast.error({ message: 'Erro ao finalizar pedido. Tente novamente.', },)
  }
  finally {
    isSubmitting.value = false
  }
}

const handleClose = () => {
  form.name = ''
  form.address = ''
  close()
}
</script>
