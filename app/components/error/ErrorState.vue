<template>
  <div class="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
    <svg
      class="w-16 h-16 text-red-400 mx-auto mb-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>

    <h3 class="text-xl font-semibold text-red-800 mb-2">
      {{ title }}
    </h3>

    <p class="text-red-600 mb-4">
      {{ message }}
    </p>

    <button
      v-if="showRetry"
      class="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold"
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
