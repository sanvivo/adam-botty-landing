<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'neutral' | 'success' | 'brand' | 'warning' | 'danger' | 'ink'
    dot?: boolean
  }>(),
  { variant: 'neutral', dot: false },
)
</script>

<template>
  <span :class="`ab-badge ab-badge--${variant}`">
    <i v-if="dot" class="ab-badge__dot" />
    <slot />
  </span>
</template>
