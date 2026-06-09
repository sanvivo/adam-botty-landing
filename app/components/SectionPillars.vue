<script setup lang="ts">
import { Brain, PlugZap, Radar } from 'lucide-vue-next'

const pillars = [
  {
    icon: Brain,
    title: 'Company brain',
    body: 'Adam doesn\u2019t start from scratch every time you message him. He holds deep context about your business — your team, your products, your processes, your decisions. Tell him something once. He knows it forever. No more \u201Cjust to give you some background\u2026\u201D',
  },
  {
    icon: PlugZap,
    title: 'Connected to everything',
    body: 'Adam works inside your actual stack — Slack, Teams, your CRM, your dev tools, your ERP, your databases. He doesn\u2019t just answer questions in a chat window; he takes real actions in real systems. An employee does things. So does Adam.',
  },
  {
    icon: Radar,
    title: 'Proactive, not passive',
    body: 'Most tools wait for a command. Adam doesn\u2019t. He monitors patterns, spots what needs doing, and acts — often before you\u2019ve thought to ask. Think of the best employee you\u2019ve ever had. That\u2019s Adam. Every day. Without fail.',
  },
]
</script>

<template>
  <section class="section" style="background: var(--surface-page)">
    <div class="wrap">
      <h2 class="display-lg reveal" style="text-align: center; max-width: 720px; margin: 0 auto">
        How Adam is different from every AI tool you've already tried and abandoned
      </h2>
      <div class="two-col" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 64px">
        <div v-for="(p, i) in pillars" :key="p.title" :class="`pillar-card reveal reveal-d${i + 1}`">
          <span class="pillar-icon"><component :is="p.icon" :size="20" /></span>
          <h3 style="margin: 0 0 10px; font-size: 20px; font-weight: 600; letter-spacing: var(--tracking-tight); color: var(--text-display)">
            {{ p.title }}
          </h3>
          <p style="margin: 0; font-size: 15px; line-height: 1.6; color: var(--text-secondary); text-wrap: pretty">
            {{ p.body }}
          </p>
        </div>
      </div>
      <div class="reveal" style="display: flex; justify-content: center; margin-top: 80px">
        <IsoStack :tools="['Slack', 'Teams', 'HubSpot', 'GitHub', 'DATEV', 'Notion', 'Zendesk', 'Stripe']" :size="460" />
      </div>
    </div>
  </section>
</template>
