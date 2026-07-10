<script setup lang="ts">
import { UserCheck, ScrollText, Server, Cpu, ChevronDown } from 'lucide-vue-next'

const trustCards = [
  {
    icon: UserCheck,
    title: 'Permissions per employee',
    body: 'Every person in your company has a role — and Adam enforces it, on every single request. An employee without access to your financials can\u2019t get them out of Adam. Not by asking nicely, not by accident. Adam never leaks data across roles, and never takes orders from someone without the rights to give them.',
  },
  {
    icon: ScrollText,
    title: 'Full audit trail',
    body: 'Every action Adam takes is logged. You can see exactly what he did, when, and why — at any time, in plain language. No black boxes. No guessing. Full visibility into everything, and anything consequential goes through your approval first.',
  },
  {
    icon: Server,
    title: 'Your data, your servers',
    body: 'Your data is stored where you choose — our EU cloud or your own infrastructure. GDPR compliance is built into the core, a data processing agreement is standard, and your data is never used to train external models. Revoke any access at any moment.',
  },
  {
    icon: Cpu,
    title: 'Your AI, your rules',
    body: 'Choose the AI behind Adam: Anthropic, OpenAI, or Google — or run models fully locally, hosted inside your own environment. In that setup, not a single bit of your data ever leaves your company. Switch anytime.',
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
    q: 'Do my employees need training?',
    a: 'No. If they can send a Slack or Teams message, they can work with Adam. He introduces himself in your channels, and people simply ask him for things — the way they\u2019d ask a colleague. There is nothing to learn.',
  },
  {
    q: 'Which AI models does Adam use?',
    a: 'Your choice: top-tier models from Anthropic, OpenAI, or Google — or models hosted fully locally in your own environment, where no data ever leaves your company. You can switch anytime.',
  },
  {
    q: 'What can\u2019t Adam do?',
    a: 'Adam can\u2019t shake hands, and he won\u2019t make the calls you reserve for yourself — he brings you the analysis and waits for your decision. He also never acts outside the permissions you gave him. Everything digital inside your tools, though, is fair game.',
  },
  {
    q: 'What happens when I use more than 30,000 credits?',
    a: 'Consumption-based pricing kicks in automatically. You\u2019re always in control of usage. No surprise invoices.',
  },
  {
    q: 'Is there a free trial?',
    a: 'Better: the One Real Task Test. Give Adam one real task from your actual week. If he doesn\u2019t deliver, you don\u2019t pay a cent. You judge him on real work, not a demo.',
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
      <div class="two-col" style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 56px">
        <div v-for="(c, i) in trustCards" :key="c.title" :class="`trust-card reveal reveal-d${(i % 2) + 1}`">
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
