<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'

const hireOpen = useHireModal()
</script>

<template>
  <section class="section section-ink final-cta" data-ink-section style="padding-bottom: 140px">
    <div class="hero-grid" />
    <div class="hero-glow" />
    <div class="wrap-narrow" style="position: relative">
      <div class="reveal" style="display: inline-block; filter: drop-shadow(0 12px 48px rgba(118, 251, 145, 0.4))">
        <AbAvatar bot :size="64" />
      </div>
      <h2 class="display-xl reveal reveal-d1" style="margin: 28px auto 0; max-width: 600px">
        Ready to make your best hire<span class="dot-green">?</span>
      </h2>
      <p class="lede reveal reveal-d2" style="margin: 22px auto 0; max-width: 440px">
        No job posting. No interviews. No onboarding week.
        Adam is ready to work from day one.
      </p>
      <p class="reveal reveal-d2" style="margin: 26px auto 0; max-width: 420px; font-size: 17px; line-height: 1.6; color: var(--gray-100); font-weight: 500">
        From €495/month. Every tool in your stack connected. Every task remembered.
        Working while you sleep.
      </p>
      <div class="reveal reveal-d3" style="margin-top: 40px; display: flex; justify-content: center">
        <AbButton size="lg" @click="hireOpen = true">
          <template #icon><ArrowRight :size="18" /></template>
          Hire Adam
        </AbButton>
      </div>
      <p class="reveal reveal-d3" style="margin: 22px 0 0; font-size: 14px; color: var(--gray-500)">
        30-day money-back guarantee · Cancel anytime · GDPR compliant
      </p>
    </div>
  </section>
</template>
