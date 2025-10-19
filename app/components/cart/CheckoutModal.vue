<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="isOpen"
        class="modal-overlay"
        @click="handleClose"
      >
        <div
          class="modal-content"
          @click.stop
        >
          <button
            aria-label="Fechar modal"
            class="modal-close"
            @click="handleClose"
          >
            ✕
          </button>

          <h2 class="modal-title">
            Finalizar Compra
          </h2>

          <div class="order-summary">
            <p class="order-total">
              Total: {{ formatCurrency(cartTotal,) }}
            </p>
            <p class="order-items">
              {{ cartItems.length }} {{ cartItems.length === 1 ? 'item' : 'itens' }}
            </p>
          </div>

          <form
            class="checkout-form"
            @submit.prevent="handleSubmit"
          >
            <div class="form-group">
              <label for="name">Nome completo *</label>
              <Input
                id="name"
                v-model="form.name"
                type="text"
                required
                placeholder="Seu nome"
                class="form-input"
              />
            </div>

            <div class="form-group">
              <label for="address">Endereço completo *</label>
              <textarea
                id="address"
                v-model="form.address"
                required
                placeholder="Rua, número, bairro, cidade, estado"
                rows="3"
                class="form-input"
              />
            </div>

            <Button
              type="submit"
              :disabled="isSubmitting"
              class="submit-button"
            >
              {{ isSubmitting ? 'Processando...' : 'Finalizar Compra' }}
            </Button>
          </form>
        </div>
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

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 1rem;
}

.modal-content {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  max-width: 500px;
  width: 100%;
  position: relative;
  max-height: 90vh;
  overflow-y: auto;
}

:global(.dark) .modal-content {
  background: #1f2937;
  color: white;
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  cursor: pointer;
  color: #6b7280;
  transition: color 0.2s;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-close:hover {
  color: #ef4444;
}

.modal-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #111827;
}

:global(.dark) .modal-title {
  color: white;
}

.order-summary {
  background: #f3f4f6;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
}

:global(.dark) .order-summary {
  background: #374151;
}

.order-total {
  font-size: 1.25rem;
  font-weight: 700;
  color: #059669;
  margin-bottom: 0.25rem;
}

.order-items {
  font-size: 0.875rem;
  color: #6b7280;
}

.checkout-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 600;
  font-size: 0.875rem;
  color: #374151;
}

:global(.dark) .form-group label {
  color: #e5e7eb;
}

.form-input {
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;
  font-family: inherit;
}

.form-input:focus {
  outline: none;
  border-color: #059669;
}

:global(.dark) .form-input {
  background: #374151;
  border-color: #4b5563;
  color: white;
}

.submit-button {
  margin-top: 0.5rem;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-content,
.modal-leave-active .modal-content {
  transition: transform 0.3s;
}

.modal-enter-from .modal-content,
.modal-leave-to .modal-content {
  transform: scale(0.9);
}

@media (max-width: 640px) {
  .modal-content {
    padding: 1.5rem;
  }

  .modal-title {
    font-size: 1.25rem;
  }
}
</style>
