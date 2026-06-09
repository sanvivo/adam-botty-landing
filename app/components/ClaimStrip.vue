<script setup lang="ts">
/* Section 1B — full-width rotating statement. Breadth proof, pattern interrupt. */
const words = [
  'operations', 'growth', 'accounting', 'taxes', 'customer service', 'development',
  'design', 'marketing', 'reporting', 'SEO', 'social media', 'ads', 'finance', 'HR',
  'bookkeeping', 'support', 'sourcing', 'supply chain', 'outreach', 'analytics',
  'compliance', 'research', 'content', '... everything',
]

const idx = ref(0)
const prevIdx = ref(-1)
let timer: ReturnType<typeof setTimeout> | undefined

function tick() {
  // Pause longer on the closing "... everything"
  const isLast = idx.value === words.length - 1
  timer = setTimeout(() => {
    prevIdx.value = idx.value
    idx.value = (idx.value + 1) % words.length
    tick()
  }, isLast ? 4000 : 2200)
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    idx.value = words.length - 1
    return
  }
  tick()
})
onUnmounted(() => clearTimeout(timer))
</script>

<template>
  <section class="claim-strip" data-ink-section>
    <div class="wrap">
      <p class="claim-line">
        The AI employee that runs your
        <span class="claim-word">
          <!-- All words occupy the same grid cell: the container is always as
               wide as the longest word, so the static text never shifts. -->
          <span
            v-for="(w, i) in words"
            :key="w"
            class="claim-word-item"
            :class="{ active: i === idx, leaving: i === prevIdx }"
            :aria-hidden="i !== idx"
          >{{ w }}</span>
        </span>
      </p>
    </div>
  </section>
</template>
