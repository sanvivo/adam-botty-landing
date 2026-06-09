<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string
    tools?: string[]
    time?: string
    pending?: boolean
  }>(),
  { tools: () => [], time: '', pending: false },
)
</script>

<template>
  <div class="ab-receipt">
    <span class="ab-receipt__status" :class="{ pending }" aria-hidden="true">
      <svg
        v-if="pending"
        width="13"
        height="13"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
        stroke-linecap="round"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
      <svg
        v-else
        width="13"
        height="13"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M20 6 9 17l-5-5" />
      </svg>
    </span>
    <span style="flex: 1; min-width: 0">
      <span class="ab-receipt__title">{{ title }}</span>
      <span v-if="tools.length" class="ab-receipt__tools">
        <span v-for="t in tools" :key="t" class="ab-receipt__tool">{{ t }}</span>
      </span>
    </span>
    <span v-if="time" class="ab-receipt__time">{{ time }}</span>
  </div>
</template>

<style scoped>
.ab-receipt {
  display: flex; align-items: flex-start; gap: 12px;
  background: var(--surface-card); border-radius: var(--radius-lg);
  border: 1px solid var(--border-subtle); padding: 12px 14px;
}
.ab-receipt__status {
  width: 26px; height: 26px; border-radius: 50%; flex: none; margin-top: 1px;
  background: var(--green-400); color: var(--gray-900);
  display: flex; align-items: center; justify-content: center;
}
.ab-receipt__status.pending { background: var(--gray-100); color: var(--gray-500); }
.ab-receipt__title {
  display: block; font-size: 14.5px; font-weight: 500;
  color: var(--text-display); line-height: 1.35;
}
.ab-receipt__tools { display: flex; gap: 6px; margin-top: 7px; flex-wrap: wrap; }
.ab-receipt__tool {
  font-size: 11.5px; font-weight: 500; color: var(--gray-600);
  background: var(--gray-100); border-radius: 999px; padding: 3px 9px;
}
.ab-receipt__time { font-size: 11.5px; color: var(--text-tertiary); flex: none; }
</style>
