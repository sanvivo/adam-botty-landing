<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    tools?: string[]
    size?: number
    animated?: boolean
  }>(),
  {
    tools: () => ['HubSpot', 'Slack', 'Gmail', 'Stripe', 'Notion', 'Zendesk', 'DATEV', 'Teams'],
    size: 420,
    animated: true,
  },
)

const c = computed(() => props.size / 2)
const r = computed(() => props.size * 0.36)
const tile = computed(() => props.size * 0.155)
const adam = computed(() => props.size * 0.21)
const shown = computed(() => props.tools.slice(0, 8))

const lineStyle = (i: number) => ({
  left: `${c.value}px`,
  top: `${c.value}px`,
  width: `${r.value}px`,
  transform: `rotate(${(i * 360) / shown.value.length - 90}deg)`,
  '--ab-iso-len': `${r.value - tile.value * 0.7}px`,
})

const tileStyle = (i: number) => {
  const angle = ((i * 360) / shown.value.length - 90) * (Math.PI / 180)
  return {
    left: `${c.value + r.value * Math.cos(angle) - tile.value / 2}px`,
    top: `${c.value + r.value * Math.sin(angle) - tile.value / 2}px`,
    width: `${tile.value}px`,
    height: `${tile.value}px`,
    fontSize: `${Math.max(10, props.size * 0.026)}px`,
  }
}
</script>

<template>
  <div class="ab-iso" :style="{ width: `${size * 1.42}px`, height: `${size * 0.8}px` }">
    <div class="ab-iso-plane" :style="{ width: `${size}px`, height: `${size}px` }">
      <div v-for="(t, i) in shown" :key="`l-${t}`" class="ab-iso-line" :style="lineStyle(i)">
        <i v-if="animated" class="ab-iso-dot" :style="{ animationDelay: `${i * 0.55}s` }" />
      </div>
      <div
        class="ab-iso-under"
        :style="{
          left: `${c - adam * 0.55}px`,
          top: `${c - adam * 0.55}px`,
          width: `${adam * 1.1}px`,
          height: `${adam * 1.1}px`,
        }"
      />
      <div v-for="(t, i) in shown" :key="t" class="ab-iso-tile" :style="tileStyle(i)">
        {{ t }}
      </div>
      <div
        class="ab-iso-adam"
        :style="{
          left: `${c - adam / 2}px`,
          top: `${c - adam / 2}px`,
          width: `${adam}px`,
          height: `${adam}px`,
          transform: `translateZ(${size * 0.085}px)`,
        }"
      >
        <svg :width="adam * 0.5" :height="adam * 0.5" viewBox="0 0 96 96" fill="none" aria-hidden="true">
          <rect x="22" y="31" width="13" height="28" rx="6.5" fill="#131514" />
          <rect x="61" y="31" width="13" height="28" rx="6.5" fill="#131514" />
        </svg>
      </div>
    </div>
  </div>
</template>
