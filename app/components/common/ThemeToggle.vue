<template>
  <button
    type="button"
    :aria-label="isDark ? 'Ativar modo claro' : 'Ativar modo escuro'"
    :aria-pressed="isDark"
    class="relative inline-flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
    @click="toggleTheme"
  >
    <Transition
      name="theme-icon"
      mode="out-in"
    >
      <LucideSun
        v-if="!isDark"
        key="sun"
        class="w-5 h-5 text-yellow-500"
        aria-hidden="true"
      />
      <LucideMoon
        v-else
        key="moon"
        class="w-5 h-5 text-blue-400"
        aria-hidden="true"
      />
    </Transition>
  </button>
</template>

<script setup lang="ts">
const { isDark, toggleTheme, } = useTheme()
</script>

<style scoped>
.theme-icon-enter-active,
.theme-icon-leave-active {
  transition: all 0.3s ease;
}

.theme-icon-enter-from {
  opacity: 0;
  transform: rotate(-180deg) scale(0);
}

.theme-icon-leave-to {
  opacity: 0;
  transform: rotate(180deg) scale(0);
}
</style>
