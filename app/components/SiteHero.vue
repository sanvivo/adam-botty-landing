<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'

const founders = ['Sanvivo', 'Nordlicht Labs', 'Kassenwerk', 'Briefkasten', 'Volta Health']

function scrollToHow() {
  const el = document.getElementById('how')
  if (el) window.scrollTo({ top: el.offsetTop - 40, behavior: 'smooth' })
}
</script>

<template>
  <header id="top" class="hero section-ink" data-ink-section>
    <div class="hero-grid" />
    <div class="hero-glow" />
    <div class="wrap hero-cols" style="position: relative; display: grid; grid-template-columns: 1.08fr 0.92fr; gap: 72px; align-items: center">
      <div>
        <span class="eyebrow">Your new team member</span>
        <h1 class="display-xl" style="margin: 24px 0 0">
          The AI employee that gets it done<span class="dot-green">.</span>
        </h1>
        <p class="lede" style="margin: 26px 0 36px; max-width: 480px">
          Adam knows your entire business, connects to all your tools, and handles
          the work that's been eating your week — while you focus on what actually
          grows the company. Or while you sleep.
        </p>
        <div style="display: flex; gap: 14px; align-items: center; flex-wrap: wrap">
          <AbButton size="lg">
            <template #icon><ArrowRight :size="18" /></template>
            Hire Adam
          </AbButton>
          <AbButton variant="secondary" size="lg" @click="scrollToHow">See how it works</AbButton>
        </div>
        <p class="hero-meta" style="margin: 22px 0 0">
          <strong>€250 / month</strong> · No contracts · Cancel anytime
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
