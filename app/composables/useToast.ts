import type { ToastType, ToastOptions, Toast, } from '~~/types/toast'

const DEFAULT_DURATION = 5000

export const useToast = () => {
  const toasts = useState<Toast[]>('toasts', () => [],)

  const addToast = (type: ToastType, options: ToastOptions,) => {
    const toast = {
      id: `toast-${Date.now()}-${Math.random().toString(36,).substring(2, 9,)}`,
      type,
      title: options.title,
      message: options.message,
      duration: options.duration || DEFAULT_DURATION,
      progress: 100,
    }

    toasts.value.push(toast,)

    // Auto-cleanup: remover após duração
    setTimeout(() => {
      toasts.value = toasts.value.filter(t => t.id !== toast.id,)
    }, toast.duration,)
  }

  return {
    success: (options: ToastOptions,) => addToast('success', options,),
    error: (options: ToastOptions,) => addToast('error', options,),
    warning: (options: ToastOptions,) => addToast('warning', options,),
    info: (options: ToastOptions,) => addToast('info', options,),
  }
}
