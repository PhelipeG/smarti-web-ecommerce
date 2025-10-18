import type { ToastType, ToastOptions, Toast, } from '~~/types/toast'

export const useToast = () => {
  const toasts = useState<Toast[]>('toasts', () => [],)

  const addToast = (type: ToastType, options: ToastOptions,) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36,).substr(2, 9,)}`
    const duration = options.duration || 5000

    const toast: Toast = {
      id,
      type,
      title: options.title,
      message: options.message,
      duration,
      progress: 100,
    }

    toasts.value.push(toast,)

    // Auto remover após a duração
    setTimeout(() => {
      removeToast(id,)
    }, duration,)
  }

  const removeToast = (id: string,) => {
    toasts.value = toasts.value.filter(t => t.id !== id,)
  }

  return {
    success: (options: ToastOptions,) => addToast('success', options,),
    error: (options: ToastOptions,) => addToast('error', options,),
    warning: (options: ToastOptions,) => addToast('warning', options,),
    info: (options: ToastOptions,) => addToast('info', options,),
  }
}
