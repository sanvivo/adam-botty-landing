<script setup lang="ts">
import { Check, Loader2, ExternalLink } from 'lucide-vue-next'
import showcase from '~/data/integrations-showcase.json'

const wallAll = (showcase as { items: { name: string; logo: string }[] }).items
const logoByName: Record<string, string> = Object.fromEntries(wallAll.map((w) => [w.name, w.logo]))
const grafanaLogo = logoByName['Grafana']

// Each step maps to a real integration that lights up + gets a live connection.
const bsSteps = [
  { text: "Pulled this morning's transactions from the bank account", label: 'QuickBooks', match: 'Quickbooks' },
  { text: 'Searched OneDrive for the missing invoices — found 7', label: 'OneDrive', match: 'Microsoft OneDrive' },
  { text: "Emailed the tax firm about 3 receipts he couldn't find", label: 'Outlook', match: 'Outlook' },
  { text: 'No reply by 4pm — called the tax firm and confirmed', label: 'Twilio', match: 'Twilio' },
  { text: 'Pulled May refunds from Shopify and reconciled them', label: 'Shopify', match: 'Shopify' },
  { text: 'Built a revenue dashboard for the growth team', label: 'Grafana', match: 'Grafana' },
]

// Scatter the connected tools across the grid (not a 1-2-3 line).
const DEMO_SLOTS = [34, 9, 52, 20, 44, 15]
const demoNames = new Set(bsSteps.map((s) => s.match))
const wallRest = wallAll.filter((w) => !demoNames.has(w.name))

interface Tile { name: string; logo: string; step: number | null }
const tiles: Tile[] = (() => {
  const arr: (Tile | null)[] = new Array(bsSteps.length + wallRest.length).fill(null)
  DEMO_SLOTS.forEach((slot, step) => {
    const s = bsSteps[step]!
    arr[slot] = { name: s.match, logo: logoByName[s.match]!, step }
  })
  let r = 0
  for (let i = 0; i < arr.length; i++) {
    if (!arr[i]) arr[i] = { ...wallRest[r++]!, step: null }
  }
  return arr as Tile[]
})()

/* Timeline (one frame per entry, looping):
   0        Eva's message pops in
   1..6     the six steps run on the right — Adam is "typing" on the left
   7        all done → Adam posts "Done…"
   8        Adam delivers the Grafana dashboard link (a real result, not text)
   9        Adam proactively offers to share it
   10,11    hold, then loop */
const FRAMES = [1200, 950, 950, 950, 950, 950, 950, 850, 1150, 1350, 2600, 1500]
const LAST = FRAMES.length - 1

const frame = ref(0)
const cycle = ref(0)
const reduced = ref(false)
const stageRef = ref<HTMLElement | null>(null)
const tilePaths = ref<(string | null)[]>(new Array(bsSteps.length).fill(null))

let timer: ReturnType<typeof setTimeout> | undefined
let measureTimer: ReturnType<typeof setTimeout> | undefined
let io: IntersectionObserver | undefined
let started = false

function tickLoop() {
  timer = setTimeout(() => {
    if (frame.value >= LAST) {
      frame.value = 0
      cycle.value += 1
    } else {
      frame.value += 1
    }
    tickLoop()
  }, FRAMES[frame.value])
}

function measure() {
  const stage = stageRef.value
  if (!stage) return
  const wr = stage.getBoundingClientRect()
  const card = stage.querySelector('.backstage-card')
  const els = stage.querySelectorAll<HTMLElement>('.bs-demo')
  if (!card || !els.length) return
  const cr = card.getBoundingClientRect()
  const cx = cr.left + cr.width / 2 - wr.left
  const cb = cr.bottom - wr.top
  const paths: (string | null)[] = new Array(bsSteps.length).fill(null)
  els.forEach((el) => {
    const step = Number(el.dataset.step)
    const r = el.getBoundingClientRect()
    const tx = r.left + r.width / 2 - wr.left
    const ty = r.top - wr.top - 2
    paths[step] = `M ${cx} ${cb} C ${cx} ${cb + (ty - cb) * 0.55}, ${tx} ${cb + (ty - cb) * 0.4}, ${tx} ${ty}`
  })
  tilePaths.value = paths
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    reduced.value = true
    frame.value = 9
  } else {
    // The replay only starts once the section scrolls into view
    io = new IntersectionObserver(
      (entries) => {
        // Initial callbacks report isIntersecting for any overlap — enforce the
        // 30% visibility gate via the ratio as well
        if (started || !entries.some((e) => e.isIntersecting && e.intersectionRatio >= 0.3)) return
        started = true
        io?.disconnect()
        tickLoop()
      },
      { threshold: 0.3 },
    )
    if (stageRef.value) io.observe(stageRef.value)
  }
  measureTimer = setTimeout(measure, 350)
  window.addEventListener('resize', measure)
  if (document.fonts?.ready) document.fonts.ready.then(measure)
})
onUnmounted(() => {
  clearTimeout(timer)
  clearTimeout(measureTimer)
  io?.disconnect()
  window.removeEventListener('resize', measure)
})

// Right-side (Adam's work log) — driven by the frame.
const rightActive = computed(() => {
  if (reduced.value) return bsSteps.length
  if (frame.value === 0) return -1
  if (frame.value <= 6) return frame.value - 1
  return bsSteps.length
})
const liveIndex = computed(() =>
  rightActive.value >= 0 && rightActive.value < bsSteps.length ? rightActive.value : -1,
)
const itemState = (i: number) => {
  const a = rightActive.value
  if (a < 0) return 'pending'
  return i < a ? 'done' : i === a ? 'live' : 'pending'
}
const tileOn = (step: number) => reduced.value || step === liveIndex.value

// Left-side (the Slack thread) phases.
const adamTyping = computed(() => !reduced.value && frame.value >= 1 && frame.value <= 6)
const showDone = computed(() => reduced.value || frame.value >= 7)
const showDash = computed(() => reduced.value || frame.value >= 8)
const showAsk = computed(() => reduced.value || frame.value >= 9)

const wireList = computed(() => {
  if (reduced.value) return []
  const out: { i: number; d: string; state: string }[] = []
  const upto = Math.min(rightActive.value, bsSteps.length - 1)
  for (let i = 0; i <= upto; i++) {
    const d = tilePaths.value[i]
    if (!d) continue
    out.push({ i, d, state: i === liveIndex.value ? 'live' : 'gone' })
  }
  return out
})
</script>

<template>
  <section class="section">
    <div class="wrap">
      <h2 class="display-lg reveal" style="text-align: center; max-width: 680px; margin: 0 auto">
        One message in Slack. Hundreds of steps done for you
      </h2>
      <p class="lede reveal reveal-d1" style="text-align: center; margin: 18px auto 0; max-width: 520px">
        You send one line. Adam wires himself into every tool your company runs on, does the work,
        and hands you the result.
      </p>

      <div class="reveal reveal-d2" style="margin: 56px auto 0; max-width: 980px">
        <div ref="stageRef" class="bs-stage">
          <svg class="bs-wires" aria-hidden="true">
            <g v-for="w in wireList" :key="w.i" :class="w.state">
              <path class="bs-wire-glow" :d="w.d" />
            </g>
          </svg>

          <div class="backstage-card">
            <div class="bs-left sl-window" style="border-radius: 0; box-shadow: none; border: none">
              <span class="bs-col-label" style="font-family: var(--font-sans)">What you see</span>
              <div :key="cycle" class="bs-slackfeed">
                <SlackMsg name="Eva" avatar="/eva.png" time="9:02 AM" class="bs-pop">
                  <span class="sl-mention">@Adam</span> close out May and get the growth team their numbers.
                </SlackMsg>

                <div v-if="adamTyping" class="sl-typing bs-pop">
                  <AbAvatar bot :size="26" />
                  <span class="typing-dots"><i /><i /><i /></span>
                  Adam is working…
                </div>

                <SlackMsg v-if="showDone" adam name="Adam" time="9:16 AM" class="bs-pop">
                  Done. Books closed — 2 receipts still open with the tax firm, chased by email and
                  phone. The growth dashboard is live.
                  <a v-if="showDash" class="bs-deliverable bs-pop" href="#" @click.prevent>
                    <span class="bs-deliv-icon"><img :src="grafanaLogo" alt="Grafana" /></span>
                    <span class="bs-deliv-main">
                      <span class="bs-deliv-title">May Growth Dashboard</span>
                      <span class="bs-deliv-sub">Grafana · MRR, pipeline &amp; refunds</span>
                      <svg class="bs-deliv-spark" viewBox="0 0 120 30" preserveAspectRatio="none" aria-hidden="true">
                        <path
                          class="bs-spark-area"
                          d="M0 24 L13 21 L26 23 L40 15 L53 18 L66 11 L80 13 L93 7 L106 9 L120 4 L120 30 L0 30 Z"
                        />
                        <path
                          class="bs-spark-line"
                          d="M0 24 L13 21 L26 23 L40 15 L53 18 L66 11 L80 13 L93 7 L106 9 L120 4"
                        />
                      </svg>
                    </span>
                    <ExternalLink :size="15" class="bs-deliv-ext" />
                  </a>
                </SlackMsg>

                <SlackMsg v-if="showAsk" adam name="Adam" time="9:16 AM" class="bs-pop">
                  Should I send this dashboard to the growth team for you?
                  <!-- Decorative demo buttons: not real controls -->
                  <span class="bs-cta-row" aria-hidden="true">
                    <button class="bs-cta bs-cta--primary" type="button" tabindex="-1">Send to #growth</button>
                    <button class="bs-cta" type="button" tabindex="-1">Not yet</button>
                  </span>
                </SlackMsg>
              </div>
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
                  <span class="bs-tool">
                    <img v-if="logoByName[s.match]" :src="logoByName[s.match]" :alt="`${s.label} logo`" />
                    {{ s.label }}
                  </span>
                </div>
              </div>
              <div class="bs-foot">
                <span class="bs-count">+ 187 smaller steps</span>
                <span>— every one logged in the audit trail.</span>
              </div>
            </div>
          </div>

          <div class="bs-wall" aria-hidden="true">
            <div
              v-for="(t, idx) in tiles"
              :key="idx"
              class="bs-tilew"
              :class="{
                'bs-demo': t.step !== null,
                on: t.step !== null && tileOn(t.step),
                live: t.step !== null && !reduced && t.step === liveIndex,
              }"
              :data-step="t.step ?? undefined"
              :title="t.name"
            >
              <img :src="t.logo" :alt="t.name" loading="lazy" decoding="async" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
