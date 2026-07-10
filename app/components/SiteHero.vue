<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'

const founders = ['Sanvivo', 'MindReach', 'CovidBadge', 'HealGreen']

/* Rotating department word — breadth proof, right in the headline */
const words = [
  'operations', 'growth', 'accounting', 'taxes', 'customer service', 'development',
  'design', 'marketing', 'reporting', 'SEO', 'social media', 'ads', 'finance', 'HR',
  'bookkeeping', 'support', 'sourcing', 'supply chain', 'outreach', 'analytics',
  'compliance', 'research', 'content', 'company',
]

const idx = ref(0)
const prevIdx = ref(-1)
let timer: ReturnType<typeof setTimeout> | undefined

function tick() {
  // Pause longer on the closing "company"
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

function scrollToHow() {
  const el = document.getElementById('how')
  if (el) window.scrollTo({ top: el.offsetTop - 40, behavior: 'smooth' })
}

const hireOpen = useHireModal()
const openHire = () => (hireOpen.value = true)
</script>

<template>
  <header id="top" class="hero section-ink" data-ink-section>
    <div class="hero-grid" />
    <div class="hero-glow" />
    <div class="wrap hero-cols" style="position: relative; display: grid; grid-template-columns: 1.08fr 0.92fr; gap: 72px; align-items: center">
      <div>
        <span class="eyebrow">Not another tool. An employee.</span>
        <h1 class="display-xl hero-headline" style="margin: 24px 0 0">
          Adam runs your
          <span class="claim-word hero-word">
            <!-- All words share one grid cell so the layout never shifts -->
            <span
              v-for="(w, i) in words"
              :key="w"
              class="claim-word-item"
              :class="{ active: i === idx, leaving: i === prevIdx }"
              :aria-hidden="i !== idx"
            >{{ w }}</span>
          </span>
          <span class="hero-tail">while you sleep<span class="dot-green">.</span></span>
        </h1>
        <p class="lede" style="margin: 26px 0 36px; max-width: 480px">
          Zero technical knowledge needed. Adam is an AI employee who lives in your
          Slack or Microsoft Teams — message him like a colleague, and he gets it
          done.
        </p>
        <div style="display: flex; gap: 14px; align-items: center; flex-wrap: wrap">
          <AbButton size="lg" @click="openHire">
            <template #icon><ArrowRight :size="18" /></template>
            Hire Adam
          </AbButton>
          <AbButton variant="secondary" size="lg" @click="scrollToHow">See how it works</AbButton>
        </div>
        <p class="hero-meta" style="margin: 22px 0 0">
          <strong>Starts today</strong> · No onboarding · Cancel anytime
        </p>
        <div style="margin-top: 52px">
          <div style="font-size: 13px; color: var(--gray-500); margin-bottom: 16px">Trusted by founders at</div>
          <div class="logo-strip">
            <span v-for="n in founders" :key="n" class="founder-logo">{{ n }}</span>
          </div>
        </div>
      </div>
      <HeroSlack />
    </div>
  </header>
</template>
