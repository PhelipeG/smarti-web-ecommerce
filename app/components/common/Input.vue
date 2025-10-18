<template>
  <div :class="wrapperClasses">
    <!-- Label -->
    <label
      v-if="label"
      :for="inputId"
      class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
    >
      {{ label }}
      <span
        v-if="required"
        class="text-red-500"
      >*</span>
    </label>

    <!-- Input container com ícone -->
    <div class="relative">
      <!-- Ícone à esquerda -->
      <div
        v-if="$slots.icon"
        class="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 dark:text-gray-500"
      >
        <slot name="icon" />
      </div>

      <!-- Input -->
      <input
        :id="inputId"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :min="min"
        :max="max"
        :step="step"
        :autocomplete="autocomplete"
        :aria-label="ariaLabel"
        :aria-describedby="errorMessage ? `${inputId}-error` : undefined"
        :aria-invalid="!!errorMessage"
        :class="inputClasses"
        @input="handleInput"
        @blur="handleBlur"
        @focus="handleFocus"
        @keydown.enter="handleEnter"
      >

      <!-- Ícone à direita (sufixo) -->
      <div
        v-if="$slots.suffix"
        class="absolute right-3 top-1/2 -translate-y-1/2"
      >
        <slot name="suffix" />
      </div>
    </div>

    <!-- Mensagem de erro -->
    <p
      v-if="errorMessage"
      :id="`${inputId}-error`"
      class="mt-1.5 text-sm text-red-600 dark:text-red-400"
      role="alert"
    >
      {{ errorMessage }}
    </p>

    <!-- Texto de ajuda -->
    <p
      v-if="helpText && !errorMessage"
      class="mt-1.5 text-sm text-gray-500 dark:text-gray-400"
    >
      {{ helpText }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, useId, useSlots, } from 'vue'

interface Props {
  modelValue?: string | number
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' | 'date'
  label?: string
  placeholder?: string
  disabled?: boolean
  required?: boolean
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  errorMessage?: string
  helpText?: string
  min?: number
  max?: number
  step?: number
  autocomplete?: string
  ariaLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  size: 'md',
  fullWidth: true,
  modelValue: '',
},)

const emit = defineEmits<{
  'update:modelValue': [value: string | number,]
  'blur': [event: FocusEvent,]
  'focus': [event: FocusEvent,]
  'enter': [event: KeyboardEvent,]
}>()

const slots = useSlots()

// ID único para acessibilidade
const inputId = props.ariaLabel ? undefined : `input-${useId()}`

const handleInput = (event: Event,) => {
  const target = event.target as HTMLInputElement
  const value = props.type === 'number' ? Number(target.value,) : target.value
  emit('update:modelValue', value,)
}

const handleBlur = (event: FocusEvent,) => {
  emit('blur', event,)
}

const handleFocus = (event: FocusEvent,) => {
  emit('focus', event,)
}

const handleEnter = (event: KeyboardEvent,) => {
  emit('enter', event,)
}

const wrapperClasses = computed(() => {
  return props.fullWidth ? 'w-full' : ''
},)

const inputClasses = computed(() => {
  const classes = [
    'border rounded-lg transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400',
    'focus:outline-none focus:ring-2',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 dark:disabled:bg-gray-800',
  ]

  // Padding baseado em ter ícone ou não
  const hasPrefixIcon = !!slots.icon
  const hasSuffixIcon = !!slots.suffix

  // Tamanhos
  const sizes = {
    sm: hasPrefixIcon ? 'px-3 py-2 pl-9 text-sm' : 'px-3 py-2 text-sm',
    md: hasPrefixIcon ? 'px-4 py-3 pl-10 text-base' : 'px-4 py-3 text-base',
    lg: hasPrefixIcon ? 'px-5 py-4 pl-12 text-lg' : 'px-5 py-4 text-lg',
  }

  classes.push(sizes[props.size],)

  if (hasSuffixIcon) {
    classes.push('pr-10',)
  }

  // Estados
  if (props.errorMessage) {
    classes.push('border-red-500 dark:border-red-400 focus:ring-red-500 focus:border-red-500',)
  }
  else {
    classes.push('border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-transparent',)
  }

  if (props.fullWidth) {
    classes.push('w-full',)
  }

  return classes.join(' ',)
},)
</script>
