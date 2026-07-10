<script setup lang="ts">
import { Brain, Zap } from 'lucide-vue-next'

/* Sources feeding the company brain — thousands of memory blocks streaming
   in from every connected tool. Positions in %; logos from the shared map.
   mx/my = compact mobile layout (chips and wires share the same coords). */
const allFragments = [
  { label: 'Teams · every public channel', logo: toolLogo('Teams')!, x: 13, y: 14, mx: 26, my: 5 },
  { label: 'Notion · 3,120 pages', logo: toolLogo('Notion')!, x: 82, y: 11, mx: 76, my: 15 },
  { label: 'GitHub · 840 pull requests', logo: toolLogo('GitHub')!, x: 11, y: 52, mx: 22, my: 30 },
  { label: 'Zendesk · 12,400 tickets', logo: toolLogo('Zendesk')!, x: 87, y: 49, mx: 80, my: 44 },
  { label: 'ClickUp · every task', logo: toolLogo('ClickUp')!, x: 19, y: 90, mx: 20, my: 82 },
  { label: 'Outlook · email threads', logo: toolLogo('Outlook')!, x: 77, y: 88, mx: 78, my: 94 },
  { label: 'Slack · full scrollback', logo: toolLogo('Slack')!, x: 43, y: 7, mx: 68, my: 4 },
  { label: 'HubSpot · every deal', logo: toolLogo('HubSpot')!, x: 40, y: 98, mx: 30, my: 95 },
]

const isMobile = ref(false)
let mq: MediaQueryList | undefined
const onMq = () => (isMobile.value = mq?.matches ?? false)

const fragments = computed(() =>
  allFragments.map((f) => (isMobile.value ? { ...f, x: f.mx, y: f.my } : f)),
)

/* Second ring: unlabeled background sources — "and many more".
   Hidden on mobile via CSS, so desktop coords are the only ones needed. */
const minors = [
  { name: 'Stripe', logo: toolLogo('Stripe')!, x: 31, y: 27 },
  { name: 'Jira', logo: toolLogo('Jira')!, x: 67, y: 23 },
  { name: 'Google Drive', logo: toolLogo('Google Drive')!, x: 28, y: 74 },
  { name: 'Figma', logo: toolLogo('Figma')!, x: 70, y: 73 },
  { name: 'Salesforce', logo: toolLogo('Salesforce')!, x: 3, y: 28 },
  { name: 'Linear', logo: toolLogo('Linear')!, x: 96, y: 25 },
  { name: 'Shopify', logo: toolLogo('Shopify')!, x: 3, y: 76 },
  { name: 'Gmail', logo: toolLogo('Gmail')!, x: 96, y: 74 },
  { name: 'Asana', logo: toolLogo('Asana')!, x: 22, y: 44 },
  { name: 'Intercom', logo: toolLogo('Intercom')!, x: 79, y: 62 },
]

/* Live memory counter — big, plausible, always growing */
const memories = ref(2_417_806)
let counterTimer: ReturnType<typeof setInterval> | undefined
onMounted(() => {
  mq = window.matchMedia('(max-width: 700px)')
  onMq()
  mq.addEventListener('change', onMq)
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  counterTimer = setInterval(() => {
    memories.value += 2 + Math.floor(Math.random() * 12)
  }, 140)
})
onUnmounted(() => {
  clearInterval(counterTimer)
  mq?.removeEventListener('change', onMq)
})
const memoriesLabel = computed(() => memories.value.toLocaleString('en-US'))
</script>

<template>
  <section class="section section-ink" data-ink-section style="position: relative; overflow: hidden">
    <div class="hero-glow" style="transform: scaleY(-1)" />
    <div class="wrap" style="position: relative">
      <div style="text-align: center">
        <span class="eyebrow reveal">The company brain</span>
        <h2 class="display-lg reveal reveal-d1" style="margin: 18px auto 0; max-width: 720px">
          Adam knows your company better than anyone.
          <span style="color: var(--green-400)">Including you.</span>
        </h2>
        <p class="lede reveal reveal-d2" style="margin: 18px auto 0; max-width: 520px">
          Right now, your company's knowledge lives in heads, threads, and a wiki
          nobody updates. Getting the full picture takes a meeting. Or three.
        </p>
      </div>

      <div class="brain-stage reveal reveal-d2" aria-hidden="true">
        <svg class="brain-wires" viewBox="0 0 100 100" preserveAspectRatio="none">
          <line
            v-for="m in minors"
            :key="m.name"
            class="brain-wire brain-wire--minor"
            :x1="m.x" :y1="m.y" x2="50" y2="50"
          />
          <line
            v-for="f in fragments"
            :key="f.label"
            class="brain-wire"
            :x1="f.x" :y1="f.y" x2="50" y2="50"
          />
        </svg>
        <template v-for="(m, i) in minors" :key="m.name">
          <span
            class="brain-minor"
            :title="m.name"
            :style="{ '--x': `${m.x}%`, '--y': `${m.y}%`, animationDelay: `${-i * 1.7}s`, animationDuration: `${6 + (i % 4)}s` }"
          >
            <img :src="m.logo" :alt="m.name" loading="lazy" width="15" height="15">
          </span>
          <span
            class="brain-mem brain-mem--minor"
            :style="{
              '--x': `${m.x}%`, '--y': `${m.y}%`,
              animationDuration: `${3 + ((i * 11) % 7) * 0.3}s`,
              animationDelay: `${-((i * 19) % 26) * 0.4}s`,
            }"
          />
        </template>
        <template v-for="(f, i) in fragments" :key="f.label">
          <div
            class="brain-chip"
            :style="{ '--x': `${f.x}%`, '--y': `${f.y}%`, animationDelay: `${-i * 1.3}s`, animationDuration: `${5 + (i % 3)}s` }"
          >
            <img class="brain-chip-logo" :src="f.logo" alt="" loading="lazy" width="16" height="16">
            {{ f.label }}
          </div>
          <!-- Memory blocks streaming from this source into the brain -->
          <span
            v-for="p in 3"
            :key="`${f.label}-${p}`"
            class="brain-mem"
            :style="{
              '--x': `${f.x}%`, '--y': `${f.y}%`,
              animationDuration: `${2 + ((i * 7 + p * 5) % 9) * 0.22}s`,
              animationDelay: `${-((i * 13 + p * 17) % 22) * 0.35}s`,
            }"
          />
        </template>
        <div class="brain-core">
          <span class="brain-core-tile"><Brain :size="30" /></span>
          <span class="brain-core-label">The company brain</span>
          <span class="brain-counter">{{ memoriesLabel }}</span>
          <span class="brain-counter-label">memories connected · and counting</span>
        </div>
      </div>
      <!-- On phones the counter moves out of the crowded stage into normal flow -->
      <div class="brain-counter-flow" aria-hidden="true">
        <span class="brain-counter">{{ memoriesLabel }}</span>
        <span class="brain-counter-label">memories connected · and counting</span>
      </div>

      <div style="max-width: 620px; margin: 56px auto 0">
        <div class="reveal sl-window" style="background: var(--surface-card); box-shadow: var(--shadow-raised), 0 8px 64px rgba(118, 251, 145, 0.18)">
          <div class="sl-feed" style="min-height: 0; padding: 18px 18px 20px">
            <SlackMsg name="Jonas" avatar="/jonas.png" time="3:12 PM">
              <span class="sl-mention">@Adam</span> why did we switch payment providers last spring?
            </SlackMsg>
            <SlackMsg adam name="Adam" time="3:12 PM">
              Failed payments at 4.1% plus rising fees. Decided April 12 with finance —
              here's the <span class="sl-link">decision doc</span>, the
              <span class="sl-link">Slack thread</span>, and the
              <span class="sl-link">before/after numbers</span>.
              <span class="brain-answer-meta"><Zap :size="13" /> Answered in 0.4s · with sources</span>
            </SlackMsg>
          </div>
        </div>
        <p class="lede reveal reveal-d1" style="margin: 32px 0 0; text-align: center">
          Every ticket, task, pull request, page, and thread streams in as a memory
          block — millions of them, connected into one living picture of your company.
          And anyone on the team <span class="hand-underline">gets that picture in milliseconds.</span>
        </p>
        <p class="reveal reveal-d2" style="margin: 18px 0 0; text-align: center; font-size: 19px; line-height: 1.6; font-weight: 500; color: #fff">
          No wiki gardening. No &ldquo;ask Tom.&rdquo; No meeting to reconstruct what happened.
        </p>
      </div>
    </div>
  </section>
</template>
