<script setup lang="ts">
withDefaults(
  defineProps<{
    adam?: boolean
    name: string
    initials?: string
    time: string
  }>(),
  { adam: false, initials: '' },
)
</script>

<template>
  <div class="sl-msg">
    <AbAvatar v-if="adam" bot :size="36" />
    <span v-else class="sl-avatar">{{ initials }}</span>
    <div class="sl-msg-body">
      <div class="sl-msg-head">
        <span class="sl-name">{{ name }}</span>
        <span v-if="adam" class="sl-app-badge">app</span>
        <span class="sl-time">{{ time }}</span>
      </div>
      <div class="sl-text"><slot /></div>
    </div>
  </div>
</template>
