<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    name?: string
    bot?: boolean
    size?: number
    online?: boolean
    /** Eyes track the mouse cursor (bot only) */
    follow?: boolean
  }>(),
  { name: '', bot: false, size: 36, online: false, follow: false },
)

const initials = computed(() =>
  props.name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase(),
)

/* ── Idle micro-gestures — a blink or glance every 7–10s on a per-instance
   random clock, so multiple Adams on screen never move in sync. ── */
const gesture = ref('')
let waitTimer: ReturnType<typeof setTimeout> | undefined
let playTimer: ReturnType<typeof setTimeout> | undefined

// [name, weight] — blinking dominates, like it does for humans.
// When the eyes follow the mouse, glances are dropped (they'd fight the tracking).
const gestures = computed<Array<[string, number]>>(() =>
  props.follow
    ? [['blink', 4], ['blink-double', 1.5], ['tilt', 1.5]]
    : [['blink', 4], ['blink-double', 1.5], ['look-left', 1.5], ['look-right', 1.5], ['tilt', 1.5]],
)

function pickGesture(): string {
  const pool = gestures.value
  let r = Math.random() * pool.reduce((s, [, w]) => s + w, 0)
  for (const [name, w] of pool) {
    r -= w
    if (r <= 0) return name
  }
  return 'blink'
}

function schedule() {
  waitTimer = setTimeout(() => {
    gesture.value = pickGesture()
    playTimer = setTimeout(() => {
      gesture.value = ''
      schedule()
    }, 1300)
  }, 7000 + Math.random() * 3000)
}

/* ── Mouse tracking — eyes deflect toward the cursor, saturating so they
   always stay inside the face. Runs through rAF, one frame per move batch. ── */
const rootRef = ref<HTMLElement | null>(null)
const eyesRef = ref<SVGGElement | null>(null)
let raf = 0
let mx = 0
let my = 0

function onMove(e: MouseEvent) {
  mx = e.clientX
  my = e.clientY
  if (!raf) raf = requestAnimationFrame(applyFollow)
}

function applyFollow() {
  raf = 0
  const root = rootRef.value
  const g = eyesRef.value
  if (!root || !g) return
  const r = root.getBoundingClientRect()
  const dx = mx - (r.left + r.width / 2)
  const dy = my - (r.top + r.height / 2)
  const dist = Math.hypot(dx, dy) || 1
  // Full deflection once the cursor is ~160px away; proportional inside that
  const f = Math.min(1, dist / 160) * 8
  g.style.transform = `translate(${(dx / dist) * f}px, ${(dy / dist) * f}px)`
}

onMounted(() => {
  if (!props.bot) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  schedule()
  if (props.follow) window.addEventListener('mousemove', onMove, { passive: true })
})
onUnmounted(() => {
  clearTimeout(waitTimer)
  clearTimeout(playTimer)
  cancelAnimationFrame(raf)
  window.removeEventListener('mousemove', onMove)
})
</script>

<template>
  <span
    ref="rootRef"
    class="ab-avatar"
    :class="[{ 'ab-avatar--bot': bot }, gesture ? `ab-gesture-${gesture}` : '']"
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
        style="overflow: visible"
      >
        <g ref="eyesRef" class="ab-eyes">
          <rect class="ab-eye" x="20" y="30" width="14" height="30" rx="7" fill="currentColor" />
          <rect class="ab-eye" x="62" y="30" width="14" height="30" rx="7" fill="currentColor" />
        </g>
      </svg>
      <template v-else>{{ initials }}</template>
    </span>
    <i v-if="online" class="ab-avatar__dot" />
  </span>
</template>
