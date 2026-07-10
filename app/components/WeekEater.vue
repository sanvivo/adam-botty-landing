<script setup lang="ts">
/* "Your week. Actual size." — a Mon–Fri calendar where gray busywork blocks
   flood in one by one and squeeze the real work down to a sliver. */
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
const greens = ['Build the product', 'Talk to customers', 'Grow the business', 'Improve things', 'Think. Plan. Lead.']

/* Arrival order is global (round-robin across days) so the whole week
   fills up gradually. size = relative share of the day column. */
const grays: Array<{ day: number; label: string; size: number }> = [
  { day: 0, label: 'Copy orders into the ERP', size: 2.2 },
  { day: 2, label: '“Where’s the report?”', size: 1.8 },
  { day: 4, label: 'Export → Excel → import', size: 2.4 },
  { day: 1, label: 'Chase invoice — 3rd time', size: 2.0 },
  { day: 3, label: 'Write the status update', size: 1.8 },
  { day: 0, label: 'Update the CRM after every call', size: 2.4 },
  { day: 2, label: 'Follow-ups nobody tracked', size: 2.2 },
  { day: 4, label: 'Re-explain the same context', size: 2.0 },
  { day: 1, label: 'Sync data between tools', size: 2.4 },
  { day: 3, label: 'Copy-paste between tabs', size: 2.6 },
  { day: 2, label: 'Fix the spreadsheet', size: 1.9 },
  { day: 0, label: 'Answer the same question. Again', size: 2.0 },
  { day: 4, label: 'Find that one email', size: 1.7 },
  { day: 1, label: 'The report nobody reads', size: 1.9 },
  { day: 3, label: 'Chase the missing numbers', size: 2.0 },
]
const TOTAL_HOURS = 19

const landed = ref(0)
const reduced = ref(false)
const rootRef = ref<HTMLElement | null>(null)
let timer: ReturnType<typeof setTimeout> | undefined
let started = false
let io: IntersectionObserver | undefined

function step() {
  if (landed.value < grays.length) {
    landed.value += 1
    timer = setTimeout(step, 620)
  } else {
    // Hold the fully-eaten week, then reset and loop
    timer = setTimeout(() => {
      landed.value = 0
      timer = setTimeout(step, 900)
    }, 4600)
  }
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    reduced.value = true
    landed.value = grays.length
    return
  }
  io = new IntersectionObserver(
    (entries) => {
      if (started || !entries.some((e) => e.isIntersecting)) return
      started = true
      io?.disconnect()
      timer = setTimeout(step, 700)
    },
    { threshold: 0.35 },
  )
  if (rootRef.value) io.observe(rootRef.value)
})
onUnmounted(() => {
  clearTimeout(timer)
  io?.disconnect()
})

const hours = computed(() => Math.round((landed.value / grays.length) * TOTAL_HOURS))
const grayIndex = (b: (typeof grays)[number]) => grays.indexOf(b)
const byDay = (d: number) => grays.filter((b) => b.day === d)
</script>

<template>
  <div ref="rootRef" class="week-card">
    <div class="week-top">
      <span class="week-title">Your week. Actual size.</span>
      <span class="week-count" :class="{ hot: hours > 0 }">− {{ hours }}h this week</span>
    </div>
    <div class="week-grid">
      <div v-for="(g, d) in greens" :key="d" class="wk-day">
        <span class="wk-head">{{ days[d] }}</span>
        <div class="wk-stack">
          <div class="wk-block green"><span>{{ g }}</span></div>
          <div
            v-for="b in byDay(d)"
            :key="b.label"
            class="wk-block gray"
            :class="{ on: grayIndex(b) < landed }"
            :style="{ '--sz': b.size }"
          >
            <span>{{ b.label }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="week-legend">
      <span><i class="dot dot-work" /> The work that matters</span>
      <span><i class="dot dot-busy" /> The busywork</span>
    </div>
  </div>
</template>
