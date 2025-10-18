<template>
  <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 sm:p-8 text-center">
    <LucideAlertCircle class="w-10 h-10 sm:w-12 sm:h-12 text-red-600 dark:text-red-400 mx-auto mb-3 sm:mb-4" />

    <h3 class="text-lg sm:text-xl font-semibold text-red-800 dark:text-red-300 mb-2">
      {{ title }}
    </h3>

    <p class="text-sm sm:text-base text-red-600 dark:text-red-400 mb-4 px-2">
      {{ message }}
    </p>

    <button
      v-if="showRetry"
      class="bg-red-600 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold text-sm sm:text-base"
      @click="$emit('retry',)"
    >
      {{ retryText }}
    </button>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string
  message?: string
  error?: Error | null
  showRetry?: boolean
  retryText?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Erro ao carregar dados',
  message: '',
  error: null,
  showRetry: true,
  retryText: 'Tentar Novamente',
},)

defineEmits<{
  retry: []
}>()

const message = computed(() => {
  if (props.message) {
    return props.message
  }
  if (props.error?.message) {
    return props.error.message
  }
  return 'Ocorreu um erro inesperado'
},)
</script>
