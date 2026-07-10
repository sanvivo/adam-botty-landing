<script setup lang="ts">
import { Brain, PlugZap, CalendarClock, KeyRound } from 'lucide-vue-next'

const parts = [
  {
    icon: Brain,
    num: '01',
    title: 'A memory — the company brain',
    body: 'Every tool forgets you the moment you close the tab. Adam remembers everything: your products, your decisions, your customers, that thing you told him in March. Tell him once. He knows it forever. No more \u201Cjust to give you some background\u2026\u201D',
  },
  {
    icon: PlugZap,
    num: '02',
    title: 'Hands — real access to your tools',
    body: 'ChatGPT gives you text you still have to act on. Adam acts. He writes to your CRM, ships code to GitHub, reconciles your books, sends the emails. You read the summary — he did the work.',
  },
  {
    icon: CalendarClock,
    num: '03',
    title: 'Initiative — he follows up on himself',
    body: 'Adam optimized your SEO today? He\u2019ll check the rankings next week — without being asked. Your Monday finance report arrives every Monday because Adam scheduled himself to do it. Employees who need constant prodding are bad employees. Adam isn\u2019t one.',
  },
  {
    icon: KeyRound,
    num: '04',
    title: 'Judgment about who\u2019s asking',
    body: 'Adam knows what each person in your company is allowed to see and do — and he enforces it. An intern can\u2019t ask Adam for payroll data. Ever. Every employee gets their role, their access, their boundaries. That\u2019s what makes him safe to let loose.',
  },
]
</script>

<template>
  <section class="section" style="background: var(--surface-page)">
    <div class="wrap">
      <h2 class="display-lg reveal" style="text-align: center; max-width: 720px; margin: 0 auto">
        &ldquo;Sounds too good. Why hasn't anyone built this before?&rdquo;
      </h2>
      <p class="lede reveal reveal-d1" style="text-align: center; margin: 18px auto 0; max-width: 520px">
        Fair question. An employee needs four things no chatbot has ever had.
        Adam is the first to have all four.
      </p>
      <div class="two-col" style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 64px">
        <div v-for="(p, i) in parts" :key="p.title" :class="`pillar-card reveal reveal-d${(i % 2) + 1}`">
          <div style="display: flex; align-items: center; justify-content: space-between">
            <span class="pillar-icon"><component :is="p.icon" :size="20" /></span>
            <span class="mech-num">{{ p.num }}</span>
          </div>
          <h3 style="margin: 0 0 10px; font-size: 20px; font-weight: 600; letter-spacing: var(--tracking-tight); color: var(--text-display)">
            {{ p.title }}
          </h3>
          <p style="margin: 0; font-size: 15px; line-height: 1.6; color: var(--text-secondary); text-wrap: pretty">
            {{ p.body }}
          </p>
        </div>
      </div>
      <p class="display-md reveal" style="text-align: center; max-width: 680px; margin: 72px auto 0">
        Memory, hands, initiative, boundaries. Take one away, you have a chatbot.
        Put them together — <span class="dot-green">you have an employee.</span>
      </p>
      <div class="reveal" style="display: flex; justify-content: center; margin-top: 80px">
        <IsoStack :tools="['Slack', 'Teams', 'HubSpot', 'GitHub', 'DATEV', 'Notion', 'Zendesk', 'Stripe']" :size="460" />
      </div>
    </div>
  </section>
</template>
