<script setup lang="ts">
import { ShieldCheck, ScrollText, Lock, ChevronDown } from 'lucide-vue-next'

const trustCards = [
  {
    icon: ShieldCheck,
    title: 'You define the boundaries',
    body: 'Adam only touches what you give him permission to touch. You define which tools he can access, which actions he can take, and which data he can see. Nothing more. You\u2019re the employer. Adam follows your rules.',
  },
  {
    icon: ScrollText,
    title: 'Full audit trail',
    body: 'Every action Adam takes is logged. You can see exactly what he did, when, and why — at any time, in plain language. No black boxes. No guessing. Full visibility into everything.',
  },
  {
    icon: Lock,
    title: 'GDPR compliant',
    body: 'Your data stays in the EU. A data processing agreement is available, and your data is never used to train external models. You can revoke Adam\u2019s access to any tool at any moment.',
  },
]

const faqs = [
  {
    q: 'What if Adam makes a mistake?',
    a: 'Anything consequential goes through your approval queue first — you review before it ships. Every action is logged and reversible where the underlying tool allows it, and you can tighten what Adam may do alone at any time.',
  },
  {
    q: 'Can I pause or stop Adam?',
    a: 'Yes. Anytime. No complex offboarding. You\u2019re in full control of access at all times.',
  },
  {
    q: 'Do I need to change my tools or workflows?',
    a: 'No. Adam connects to what you already use — Slack, Teams, your existing stack. You don\u2019t change how you work. Adam adapts to you.',
  },
  {
    q: 'How long does setup take?',
    a: 'Most teams are up and running the same day: connect your tools, Adam introduces himself in your Slack or Teams, and you give him his first task. The company brain fills in as he works.',
  },
  {
    q: 'What happens when I use more than 30,000 credits?',
    a: 'Consumption-based pricing kicks in automatically. You\u2019re always in control of usage. No surprise invoices.',
  },
  {
    q: 'Is there a free trial?',
    a: 'Talk to us — we\u2019ll set Adam up on one real task from your week so you can judge him on actual work, not a demo.',
  },
]

const open = ref(0)
const toggle = (i: number) => (open.value = open.value === i ? -1 : i)
</script>

<template>
  <section id="faq" class="section" style="background: var(--gray-100)">
    <div class="wrap">
      <h2 class="display-lg reveal" style="text-align: center; max-width: 680px; margin: 0 auto">
        &ldquo;Can I actually trust Adam with my business data?&rdquo;
      </h2>
      <p class="lede reveal reveal-d1" style="text-align: center; margin: 18px auto 0; max-width: 480px">
        The most important question a founder can ask. Here's the full answer.
      </p>
      <div class="two-col" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 56px">
        <div v-for="(c, i) in trustCards" :key="c.title" :class="`trust-card reveal reveal-d${i + 1}`">
          <span class="pillar-icon"><component :is="c.icon" :size="20" /></span>
          <h3 style="margin: 0 0 10px; font-size: 18px; font-weight: 600; letter-spacing: var(--tracking-tight); color: var(--text-display)">
            {{ c.title }}
          </h3>
          <p style="margin: 0; font-size: 14.5px; line-height: 1.6; color: var(--text-secondary); text-wrap: pretty">
            {{ c.body }}
          </p>
        </div>
      </div>
      <div class="reveal" style="max-width: 760px; margin: 72px auto 0">
        <div v-for="(f, i) in faqs" :key="f.q" class="faq-item" :class="{ open: open === i }">
          <button class="faq-q" :aria-expanded="open === i" @click="toggle(i)">
            {{ f.q }}
            <span class="chev"><ChevronDown :size="18" /></span>
          </button>
          <div class="faq-a"><p>{{ f.a }}</p></div>
        </div>
      </div>
    </div>
  </section>
</template>
