<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary' | 'ink' | 'ghost'
    size?: 'sm' | 'md' | 'lg'
    type?: 'button' | 'submit'
  }>(),
  { variant: 'primary', size: 'md', type: 'button' },
)
</script>

<template>
  <button :type="type" :class="`ab-btn ab-btn--${variant} ab-btn--${size}`">
    <slot name="icon" />
    <slot />
  </button>
</template>
