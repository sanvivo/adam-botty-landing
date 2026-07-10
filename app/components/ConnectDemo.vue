<script setup lang="ts">
import { ChevronDown, Check, Figma } from 'lucide-vue-next'

/* Replays the one-click connect flow:
   ask → Adam requests access → button clicks itself → connected → done */
const script = [
  { t: 'user', delay: 600 },
  { t: 'adam-ask', delay: 1500 },
  { t: 'click', delay: 1600 },
  { t: 'connected', delay: 900 },
  { t: 'done', delay: 1100 },
]

const step = ref(0)
const rootRef = ref<HTMLElement | null>(null)
let timer: ReturnType<typeof setTimeout> | undefined
let io: IntersectionObserver | undefined
let started = false

function play() {
  let i = 0
  const next = () => {
    if (i >= script.length) return
    timer = setTimeout(() => {
      i += 1
      step.value = i
      next()
    }, script[i]!.delay)
  }
  next()
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    step.value = script.length
    return
  }
  io = new IntersectionObserver(
    (entries) => {
      if (started || !entries.some((e) => e.isIntersecting)) return
      started = true
      io?.disconnect()
      play()
    },
    { threshold: 0.4 },
  )
  if (rootRef.value) io.observe(rootRef.value)
})
onUnmounted(() => {
  clearTimeout(timer)
  io?.disconnect()
})

const at = (k: string) => step.value > script.findIndex((s) => s.t === k)
const clicking = computed(() => at('click') && !at('connected'))
</script>

<template>
  <div ref="rootRef" class="connect-demo sl-window">
    <div class="sl-topbar">
      <span class="sl-channel"># design <ChevronDown :size="14" /></span>
    </div>
    <div class="sl-feed" style="min-height: 250px">
      <SlackMsg v-if="at('user')" name="Lisa" avatar="/lisa.png" time="10:04 AM">
        <span class="sl-mention">@Adam</span> build the new version of our landing page
        from the Figma designs and get it ready for review.
      </SlackMsg>
      <SlackMsg v-if="at('adam-ask')" adam name="Adam" time="10:04 AM">
        On it. I don't have access to Figma yet — one click and I'm in:
        <button class="connect-btn" :class="{ pressed: clicking, ok: at('connected') }" type="button" tabindex="-1">
          <span class="connect-btn-icon">
            <Check v-if="at('connected')" :size="15" />
            <Figma v-else :size="15" />
          </span>
          {{ at('connected') ? 'Figma connected' : 'Connect Figma' }}
        </button>
      </SlackMsg>
      <SlackMsg v-if="at('done')" adam name="Adam" time="10:31 AM">
        Done. You can check the new landing page here:
        <span class="sl-link">preview.acme.dev/landing-v2</span> —
        and here's the pull request for the team:
        <span class="sl-link">PR #142 · Ready for review</span>
      </SlackMsg>
    </div>
  </div>
</template>
