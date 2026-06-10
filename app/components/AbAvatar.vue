<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    name?: string
    bot?: boolean
    size?: number
    online?: boolean
  }>(),
  { name: '', bot: false, size: 36, online: false },
)

const initials = computed(() =>
  props.name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase(),
)
</script>

<template>
  <span
    class="ab-avatar"
    :class="{ 'ab-avatar--bot': bot }"
    :style="{ width: `${size}px`, height: `${size}px` }"
  >
    <span class="ab-avatar__core" :style="{ fontSize: `${size * 0.38}px` }">
      <svg
        v-if="bot"
        :width="size * 0.55"
        :height="size * 0.55"
        viewBox="0 0 96 96"
        fill="none"
        aria-hidden="true"
      >
        <rect x="20" y="30" width="14" height="30" rx="7" fill="currentColor" />
        <rect x="62" y="30" width="14" height="30" rx="7" fill="currentColor" />
      </svg>
      <template v-else>{{ initials }}</template>
    </span>
    <i v-if="online" class="ab-avatar__dot" />
  </span>
</template>
