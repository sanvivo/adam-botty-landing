<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary' | 'ink' | 'ghost'
    size?: 'sm' | 'md' | 'lg'
  }>(),
  { variant: 'primary', size: 'md' },
)
</script>

<template>
  <button :class="`ab-btn ab-btn--${variant} ab-btn--${size}`">
    <slot name="icon" />
    <slot />
  </button>
</template>
