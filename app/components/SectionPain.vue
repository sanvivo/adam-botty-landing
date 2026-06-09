<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'

const painLines = [
  "You're the only one who knows where everything lives",
  'Things fall through the cracks the moment you look away',
  'Good employees are expensive, rare, and need constant context',
  'You repeat yourself. Every week. To everyone.',
  'Every Sunday night: \u201CThis week I\u2019ll finally focus on the big stuff.\u201D',
]
</script>

<template>
  <section class="section">
    <div class="wrap-narrow">
      <h2 class="display-lg reveal" style="text-align: center">
        You didn't start a company to spend your week in micro-task hell
      </h2>
      <div class="reveal reveal-d1" style="margin: 36px auto 0; max-width: 540px; text-align: center">
        <p class="lede" style="margin: 0">
          You had a vision. A real one. But somewhere between the recurring admin,
          the follow-ups nobody tracked, and the third time this week you explained
          the same context to someone who still got it wrong — your vision is losing ground.
        </p>
        <p style="margin: 20px 0 0; font-size: 19px; font-weight: 600; color: var(--text-display)">
          You're not building the company anymore. You're managing the noise.
        </p>
      </div>
      <div class="pain-list reveal reveal-d2" style="margin-top: 64px">
        <div v-for="l in painLines" :key="l" class="pain-row">
          <span class="arrow"><ArrowRight :size="18" /></span>
          <span>{{ l }}</span>
        </div>
      </div>
      <p class="reveal reveal-d3" style="margin: 40px 0 0; text-align: center; font-size: 22px; font-weight: 500; color: var(--text-secondary)">
        That week never comes.
      </p>
    </div>
  </section>
</template>
