export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface ToastOptions {
  title?: string
  message: string
  duration?: number
}

export interface Toast extends ToastOptions {
  id: string
  type: ToastType
  progress?: number
}
