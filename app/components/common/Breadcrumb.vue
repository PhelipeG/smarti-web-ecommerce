<template>
  <nav
    class="flex flex-wrap items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400"
    aria-label="Breadcrumb"
  >
    <template
      v-for="(item, index) in items"
      :key="index"
    >
      <NuxtLink
        v-if="item.to"
        :to="item.to"
        class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors truncate max-w-[120px] sm:max-w-none"
        :aria-current="index === items.length - 1 ? 'page' : undefined"
      >
        {{ item.label }}
      </NuxtLink>
      <span
        v-else
        class="text-gray-900 dark:text-gray-100 font-medium truncate max-w-[120px] sm:max-w-none"
        :aria-current="index === items.length - 1 ? 'page' : undefined"
      >
        {{ item.label }}
      </span>

      <LucideChevronRight
        v-if="index < items.length - 1"
        class="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0"
        aria-hidden="true"
      />
    </template>
  </nav>
</template>

<script setup lang="ts">
export interface BreadcrumbItem {
  label: string
  to?: string
}

defineProps<{
  items: BreadcrumbItem[]
}>()
</script>
