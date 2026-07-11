<script setup lang="ts">
/* A field of empty "capacity" slots; Adams materialize center-outward
   as demand scenarios cycle, then stand back down to one. */
const COLS = 9
const ROWS = 5
const TOTAL = COLS * ROWS

/* Rank every cell by distance from the grid center so Adam #1 sits in the
   middle and the swarm grows outward. Rows weighted so growth looks radial
   despite the wide aspect ratio. */
const order: number[] = (() => {
  const cx = (COLS - 1) / 2
  const cy = (ROWS - 1) / 2
  const ranked = Array.from({ length: TOTAL }, (_, i) => {
    const x = i % COLS
    const y = Math.floor(i / COLS)
    return { i, d: Math.hypot(x - cx, (y - cy) * 1.7) }
  }).sort((a, b) => a.d - b.d)
  const ranks = new Array<number>(TOTAL)
  ranked.forEach((c, rank) => (ranks[c.i] = rank))
  return ranks
})()

const stages = [
  { n: 1, label: 'A quiet Tuesday — one Adam on duty', hold: 2800 },
  { n: 7, label: 'Month-end close — Adams spin up', hold: 2600 },
  { n: 21, label: 'Launch week — more Adams, instantly', hold: 2600 },
  { n: TOTAL, label: 'Sunday, 3 a.m. — the full swarm works while you sleep', hold: 3400 },
  { n: 7, label: 'Rush over — Adams stand down. You only pay for what runs', hold: 3000 },
]

const stage = ref(0)
const reduced = ref(false)
const rootRef = ref<HTMLElement | null>(null)
let timer: ReturnType<typeof setTimeout> | undefined
let io: IntersectionObserver | undefined
let started = false

function tick() {
  timer = setTimeout(() => {
    stage.value = (stage.value + 1) % stages.length
    tick()
  }, stages[stage.value]!.hold)
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    reduced.value = true
    stage.value = 3
    return
  }
  // Start the demand cycle only when the grid scrolls into view,
  // so visitors always see it from the "one quiet Adam" opening
  io = new IntersectionObserver(
    (entries) => {
      // Initial callbacks report isIntersecting for any overlap — enforce the
      // 30% visibility gate via the ratio as well
      if (started || !entries.some((e) => e.isIntersecting && e.intersectionRatio >= 0.3)) return
      started = true
      io?.disconnect()
      tick()
    },
    { threshold: 0.3 },
  )
  if (rootRef.value) io.observe(rootRef.value)
})
onUnmounted(() => {
  clearTimeout(timer)
  io?.disconnect()
})

const count = computed(() => stages[stage.value]!.n)
const label = computed(() =>
  reduced.value
    ? `${TOTAL} Adams on demand — and back to one when the rush is over`
    : stages[stage.value]!.label,
)
</script>

<template>
  <div ref="rootRef" class="scale-stage">
    <div class="scale-grid" role="img" :aria-label="`${count} Adams working in parallel`">
      <div
        v-for="(rank, i) in order"
        :key="i"
        class="scale-cell"
        :class="{ on: rank < count }"
        :style="{ transitionDelay: `${rank * 14}ms` }"
      >
        <span class="scale-slot" />
        <span class="scale-adam"><AbAvatar bot :size="30" /></span>
      </div>
    </div>
    <div class="scale-caption" aria-live="polite">
      <span class="scale-count">×{{ count }}</span>
      <span class="scale-label">{{ label }}</span>
    </div>
  </div>
</template>
