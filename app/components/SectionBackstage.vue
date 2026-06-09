<script setup lang="ts">
import { Check, Loader2, Brain, Landmark, Cloud, Mail, AlarmClock, ShoppingBag, ChartLine } from 'lucide-vue-next'

const bsSteps = [
  { text: "Pulled this morning's transactions from the bank account", tool: 'Bank' },
  { text: 'Searched OneDrive for the missing invoices — found 7', tool: 'OneDrive' },
  { text: "Emailed the tax firm about 3 receipts he couldn't find", tool: 'Outlook' },
  { text: 'No reply by 4pm — called the tax firm and confirmed', tool: 'Phone' },
  { text: 'Pulled May refunds from Shopify and reconciled them', tool: 'Shopify' },
  { text: 'Built a revenue dashboard for the growth team', tool: 'Grafana' },
]

const bsNodes = [
  { icon: Landmark, label: 'Bank', x: 42, y: 78 },
  { icon: Cloud, label: 'OneDrive', x: 79, y: 8 },
  { icon: Mail, label: 'Outlook', x: 11, y: 34 },
  { icon: AlarmClock, label: 'Phone', x: 61, y: 104 },
  { icon: ShoppingBag, label: 'Shopify', x: 91, y: 86 },
  { icon: ChartLine, label: 'Grafana', x: 26, y: 118 },
]

const active = ref(0)
const reduced = ref(false)
const wrapRef = ref<HTMLElement | null>(null)
const wires = ref<string[]>([])
const brainWire = ref<string | null>(null)

let interval: ReturnType<typeof setInterval> | undefined
let measureTimer: ReturnType<typeof setTimeout> | undefined

function measure() {
  const wrap = wrapRef.value
  if (!wrap) return
  const wr = wrap.getBoundingClientRect()
  const card = wrap.querySelector('.backstage-card')
  const items = wrap.querySelectorAll('.bs-item')
  const nodes = wrap.querySelectorAll('.bs-node:not(.bs-brain)')
  if (!card || !items.length || !nodes.length) return
  const cardRect = card.getBoundingClientRect()
  const cb = cardRect.bottom - wr.top
  const cx = cardRect.left + cardRect.width / 2 - wr.left
  const ws: string[] = []
  items.forEach((_, i) => {
    const node = nodes[i]
    if (!node) return
    const nr = node.getBoundingClientRect()
    const nx = nr.left + nr.width / 2 - wr.left
    const ny = nr.top - wr.top - 4
    ws.push(`M ${cx} ${cb} C ${cx} ${cb + (ny - cb) * 0.6}, ${nx} ${cb + (ny - cb) * 0.35}, ${nx} ${ny}`)
  })
  wires.value = ws
  const brain = wrap.querySelector('.bs-brain')
  if (brain) {
    const br = brain.getBoundingClientRect()
    const bx = br.left + br.width / 2 - wr.left
    const by = br.top - wr.top - 4
    brainWire.value = `M ${cx} ${cb} C ${cx} ${cb + (by - cb) * 0.6}, ${bx} ${cb + (by - cb) * 0.4}, ${bx} ${by}`
  }
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    reduced.value = true
    active.value = bsSteps.length
  } else {
    interval = setInterval(() => {
      active.value = active.value >= bsSteps.length + 2 ? 0 : active.value + 1
    }, 1300)
  }
  measureTimer = setTimeout(measure, 350)
  window.addEventListener('resize', measure)
  if (document.fonts?.ready) document.fonts.ready.then(() => measure())
})
onUnmounted(() => {
  clearInterval(interval)
  clearTimeout(measureTimer)
  window.removeEventListener('resize', measure)
})

const saving = computed(() => !reduced.value && active.value >= bsSteps.length)

const itemState = (i: number) => (i < active.value ? 'done' : i === active.value ? 'live' : '')
const nodeState = (i: number) =>
  reduced.value ? 'still' : i === active.value ? 'live' : i < active.value ? 'gone' : 'idle'
</script>

<template>
  <section class="section">
    <div class="wrap">
      <h2 class="display-lg reveal" style="text-align: center; max-width: 680px; margin: 0 auto">
        One message in Slack. Two hundred moves behind it
      </h2>
      <p class="lede reveal reveal-d1" style="text-align: center; margin: 18px auto 0; max-width: 520px">
        You see a &ldquo;Done.&rdquo; Behind it, Adam works across every interface your
        company runs on — pulling data, chasing people, building things.
      </p>
      <div class="reveal reveal-d2" style="margin: 56px auto 0; max-width: 980px">
        <div ref="wrapRef" style="position: relative">
          <svg class="bs-wires" aria-hidden="true">
            <g v-if="brainWire && !reduced" :class="['brain', { saving }]">
              <path class="bs-wire-brain" :d="brainWire" />
            </g>
            <g
              v-for="(d, i) in wires"
              :key="i"
              :class="reduced ? '' : i === active ? 'live' : i < active ? 'gone' : 'idle'"
            >
              <path class="bs-wire-glow" :d="d" />
            </g>
          </svg>
          <div class="backstage-card">
            <div class="bs-left sl-window" style="border-radius: 0; box-shadow: none; border: none">
              <span class="bs-col-label" style="font-family: var(--font-sans)">What you see</span>
              <SlackMsg name="Eva" initials="E" time="9:02 AM">
                <span class="sl-mention">@Adam</span> close out May and get the growth team their numbers.
              </SlackMsg>
              <SlackMsg adam name="Adam" time="9:16 AM">
                Done. Books closed — 2 receipts still open with the tax firm, chased by email and phone.
                The growth dashboard is live.
              </SlackMsg>
            </div>
            <div class="bs-right">
              <span class="bs-col-label">What Adam did in those 14 minutes</span>
              <div class="bs-feed" style="margin-top: 12px">
                <div v-for="(s, i) in bsSteps" :key="s.text" class="bs-item" :class="itemState(i)">
                  <span class="bs-status">
                    <span v-if="itemState(i) === 'done'" style="display: flex"><Check :size="14" /></span>
                    <span v-else class="bs-spin"><Loader2 :size="14" /></span>
                  </span>
                  <span class="bs-text">{{ s.text }}</span>
                  <span class="bs-tool">{{ s.tool }}</span>
                </div>
              </div>
              <div class="bs-foot">
                <span class="bs-count">+ 187 smaller steps</span>
                <span>— every one logged in the audit trail.</span>
              </div>
            </div>
          </div>
          <div class="bs-nodes">
            <div class="bs-node bs-brain" :class="{ saving }" style="--x: 50%; --y: 150px">
              <div class="bs-node-float">
                <span class="bs-node-tile"><Brain :size="24" /></span>
                <span class="bs-node-label">{{ saving ? 'Saving what he learned…' : 'Company brain' }}</span>
              </div>
            </div>
            <div
              v-for="(n, i) in bsNodes"
              :key="n.label"
              class="bs-node"
              :class="nodeState(i)"
              :style="{ '--x': `${n.x}%`, '--y': `${n.y}px` }"
            >
              <div
                class="bs-node-float"
                :style="{ animationDuration: `${4.6 + i * 0.9}s`, animationDelay: `${-i * 1.4}s` }"
              >
                <span class="bs-node-tile"><component :is="n.icon" :size="21" /></span>
                <span class="bs-node-label">{{ n.label }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
