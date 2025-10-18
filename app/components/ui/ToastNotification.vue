<template>
  <ClientOnly>
    <Teleport to="body">
      <div class="fixed top-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none">
        <TransitionGroup name="toast">
          <div
            v-for="toast in toasts"
            :key="toast.id"
            :class="[
              'pointer-events-auto min-w-[300px] max-w-md rounded-lg shadow-lg p-4 flex items-start gap-3 relative overflow-hidden',
              'transform transition-all duration-300 ease-out',
              toastStyles[toast.type]?.bg || '',
            ]"
            @mouseenter="pauseToast(toast.id,)"
            @mouseleave="resumeToast(toast.id,)"
          >
            <!-- Ícone -->
            <div
              :class="['flex-shrink-0 w-6 h-6', toastStyles[toast.type]?.icon || '',]"
            >
              <LucideCheckCircle
                v-if="toast.type === 'success'"
                class="w-6 h-6"
              />
              <LucideXCircle
                v-else-if="toast.type === 'error'"
                class="w-6 h-6"
              />
              <LucideAlertTriangle
                v-else-if="toast.type === 'warning'"
                class="w-6 h-6"
              />
              <LucideInfo
                v-else
                class="w-6 h-6"
              />
            </div>

            <!-- Conteúdo -->
            <div class="flex-1 min-w-0">
              <h4
                v-if="toast.title"
                class="font-semibold text-sm text-gray-900 mb-1"
              >
                {{ toast.title }}
              </h4>
              <p class="text-sm text-gray-700">
                {{ toast.message }}
              </p>
            </div>

            <!-- Botão fechar -->
            <button
              type="button"
              class="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
              @click="removeToast(toast.id,)"
            >
              <LucideX class="w-5 h-5" />
            </button>

            <!-- Progress bar -->
            <div
              v-if="toast.progress !== undefined"
              class="absolute bottom-0 left-0 h-1 rounded-b-lg transition-all duration-100 ease-linear"
              :class="toastStyles[toast.type]?.progress || ''"
              :style="{ width: `${toast.progress}%`, }"
            />
          </div>
        </TransitionGroup>
      </div>
    </Teleport>
  </ClientOnly>
</template>

<script setup lang="ts">
import type { ToastType, Toast, } from '~~/types/toast'

const toasts = useState<Toast[]>('toasts', () => [],)
const timers = new Map<string, NodeJS.Timeout>()
const progressIntervals = new Map<string, NodeJS.Timeout>()

const toastStyles: Record<ToastType, {
  bg: string
  icon: string
  progress: string
}> = {
  success: {
    bg: 'bg-green-50 border-l-4 border-green-500',
    icon: 'text-green-500',
    progress: 'bg-green-500',
  },
  error: {
    bg: 'bg-red-50 border-l-4 border-red-500',
    icon: 'text-red-500',
    progress: 'bg-red-500',
  },
  warning: {
    bg: 'bg-amber-50 border-l-4 border-amber-500',
    icon: 'text-amber-500',
    progress: 'bg-amber-500',
  },
  info: {
    bg: 'bg-blue-50 border-l-4 border-blue-500',
    icon: 'text-blue-500',
    progress: 'bg-blue-500',
  },
}

function removeToast(id: string,) {
  const timer = timers.get(id,)
  const progressInterval = progressIntervals.get(id,)

  if (timer) {
    clearTimeout(timer,)
    timers.delete(id,)
  }

  if (progressInterval) {
    clearInterval(progressInterval,)
    progressIntervals.delete(id,)
  }

  toasts.value = toasts.value.filter(t => t.id !== id,)
}

function pauseToast(id: string,) {
  const timer = timers.get(id,)
  const progressInterval = progressIntervals.get(id,)

  if (timer) {
    clearTimeout(timer,)
  }

  if (progressInterval) {
    clearInterval(progressInterval,)
  }
}

function resumeToast(id: string,) {
  const toast = toasts.value.find(t => t.id === id,)
  if (!toast || toast.progress === undefined) return

  const remainingTime = (toast.progress / 100) * (toast.duration || 5000)
  const remainingProgress = toast.progress

  startProgressBar(id, remainingTime, remainingProgress,)

  const timer = setTimeout(() => {
    removeToast(id,)
  }, remainingTime,)

  timers.set(id, timer,)
}

function startProgressBar(id: string, duration: number, startProgress = 100,) {
  const stepTime = 50
  const steps = duration / stepTime
  const progressDecrement = startProgress / steps

  const interval = setInterval(() => {
    const toast = toasts.value.find(t => t.id === id,)
    if (!toast || toast.progress === undefined) {
      clearInterval(interval,)
      progressIntervals.delete(id,)
      return
    }

    toast.progress -= progressDecrement

    if (toast.progress <= 0) {
      clearInterval(interval,)
      progressIntervals.delete(id,)
    }
  }, stepTime,)

  progressIntervals.set(id, interval,)
}

onUnmounted(() => {
  timers.forEach(timer => clearTimeout(timer,),)
  progressIntervals.forEach(interval => clearInterval(interval,),)
  timers.clear()
  progressIntervals.clear()
},)
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100px);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100px) scale(0.9);
}

.toast-move {
  transition: transform 0.3s ease;
}
</style>
