<script setup lang="ts">
import { ArrowRight, Check, ShieldCheck } from 'lucide-vue-next'

const hireOpen = useHireModal()

const mathRows = [
  ['Monthly cost', '€3,000–5,000', '€495'],
  ['Social contributions', '+€800 and up', '—'],
  ['Sick days', '~12 per year', '0'],
  ['Onboarding time', '4–8 weeks', '0'],
  ['\u201CLet me give you context\u2026\u201D', 'Every conversation', 'Never'],
  ['Works at 3 a.m.', 'No', 'Yes'],
  ['Forgets things', 'Yes', 'No'],
  ['Needs managing', 'Yes', 'No'],
]

const features = [
  '30,000 credits included',
  'Up to 30 integrations',
  'Full company brain setup',
  'Proactive monitoring active',
  'Audit trail — every action logged',
  'Cancel anytime',
]
</script>

<template>
  <section id="pricing" class="section" style="background: var(--gray-0)">
    <div class="wrap">
      <h2 class="display-lg reveal" style="text-align: center">
        The math is obvious<span class="dot-green">.</span>
      </h2>
      <div class="reveal reveal-d1" style="max-width: 760px; margin: 56px auto 0">
        <table class="compare">
          <thead>
            <tr>
              <th></th>
              <th>Real employee</th>
              <th class="adam-col">Adam</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="[k, a, b] in mathRows" :key="k">
              <td>{{ k }}</td>
              <td>{{ a }}</td>
              <td class="adam-col">{{ b }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="display-md reveal reveal-d2" style="text-align: center; max-width: 640px; margin: 72px auto 0">
        That's not a software subscription. That's the best hire-to-cost ratio
        in your company's history.
      </p>
      <div class="reveal reveal-d2" style="max-width: 520px; margin: 64px auto 0">
        <div class="price-card">
          <div class="hero-glow" style="opacity: 0.7" />
          <div style="position: relative">
            <div style="font-size: 15px; font-weight: 600; color: var(--green-400)">Hire Adam</div>
            <div class="price-old" style="margin-top: 14px"><span class="amount">€3,900</span><span class="unit"> / month</span></div>
            <div class="price-num">from €495<span class="unit"> / month</span></div>
            <div class="price-list">
              <span v-for="f in features" :key="f" class="row">
                <span class="check"><Check :size="16" /></span>
                {{ f }}
              </span>
            </div>
            <AbButton size="lg" aria-haspopup="dialog" :aria-expanded="hireOpen" @click="hireOpen = true">
              <template #icon><ArrowRight :size="18" /></template>
              Hire Adam
            </AbButton>
            <p style="margin: 20px 0 0; font-size: 13.5px; color: var(--gray-500)">
              Need more? Volume pricing available.
            </p>
          </div>
        </div>
        <div class="guarantee-card reveal reveal-d3">
          <span class="pillar-icon" style="margin-bottom: 0; flex: none"><ShieldCheck :size="20" /></span>
          <div>
            <h3 style="margin: 0 0 8px; font-size: 18px; font-weight: 600; letter-spacing: var(--tracking-tight); color: var(--text-display)">
              30-Day Money-Back Guarantee
            </h3>
            <p style="margin: 0; font-size: 15px; line-height: 1.6; color: var(--text-secondary); text-wrap: pretty">
              Try Adam for a full month on your real work. If he hasn't saved you
              more time than he costs, tell us within 30 days and we'll refund
              every euro — no questions asked.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
