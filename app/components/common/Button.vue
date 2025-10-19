<template>
  <button
    :type="type"
    :disabled="disabled"
    :aria-label="ariaLabel"
    :aria-pressed="ariaPressed"
    :class="buttonClasses"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed, } from 'vue'

interface Props {
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'ghost' | 'outline'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  disabled?: boolean
  fullWidth?: boolean
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  ariaLabel?: string
  ariaPressed?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'button',
  variant: 'primary',
  size: 'md',
  disabled: false,
  fullWidth: false,
  rounded: 'lg',
  ariaPressed: undefined,
},)

const emit = defineEmits<{
  click: [event: MouseEvent,]
}>()

const handleClick = (event: MouseEvent,) => {
  if (!props.disabled) {
    emit('click', event,)
  }
}

const variants = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 dark:focus:ring-blue-400 active:scale-95 disabled:bg-blue-400 disabled:cursor-not-allowed disabled:hover:bg-blue-400',
  secondary: 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed',
  success: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 cursor-not-allowed disabled:opacity-100',
  danger: 'text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed',
  ghost: 'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed',
  outline: 'border-2 border-gray-300 dark:border-gray-600 bg-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed',
}

const sizes = {
  xs: 'px-2.5 py-1.5 text-xs',
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-2.5 text-sm sm:text-base',
  lg: 'px-6 py-3 text-base',
  xl: 'px-8 py-4 text-lg',
}

const roundedStyles = {
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  full: 'rounded-full',
}

const buttonClasses = computed(() => [
  'inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-900',
  variants[props.variant],
  sizes[props.size],
  roundedStyles[props.rounded],
  props.fullWidth && 'w-full',
].filter(Boolean,).join(' ',),)
</script>
