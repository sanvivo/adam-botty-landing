<script setup lang="ts">
const stats = [
  {
    num: '$8.5T',
    text: 'in annual revenue will go unrealized by 2030 because of talent shortages.',
    src: 'Korn Ferry',
  },
  {
    num: '44 days',
    text: 'to fill a single role, on average — before onboarding even starts.',
    src: 'Josh Bersin Company / SHRM',
  },
  {
    num: '89%',
    text: 'of small businesses trying to hire found few or no qualified applicants.',
    src: 'NFIB',
  },
]

const fixes = [
  { q: 'Raise salaries?', a: 'The giants outbid you. Every time.' },
  { q: 'Hire recruiters?', a: '$4,683 and 44 days per hire — if you find anyone at all.' },
]
</script>

<template>
  <section class="section">
    <div class="wrap">
      <div style="text-align: center">
        <span class="eyebrow reveal">The global talent shortage</span>
        <h2 class="display-lg reveal reveal-d1" style="margin: 18px auto 0; max-width: 760px">
          <span class="stat-hero">72%</span> of employers
          <mark class="mark-green">can't find the people they need</mark>
        </h2>
        <p class="lede reveal reveal-d2" style="margin: 20px auto 0; max-width: 560px">
          ManpowerGroup asked 39,000+ employers across 41 countries. That number
          has doubled since 2014 — and small companies feel it first. How do you
          outgrow your competitors when you can't even staff the work you already have?
        </p>
        <p class="stat-source reveal reveal-d2">ManpowerGroup · Talent Shortage Survey 2026</p>
      </div>

      <div class="stat-cards reveal reveal-d2" style="margin: 56px auto 0; max-width: 900px">
        <div v-for="s in stats" :key="s.num" class="stat-card">
          <span class="stat-num">{{ s.num }}</span>
          <p class="stat-text">{{ s.text }}</p>
          <span class="stat-src">{{ s.src }}</span>
        </div>
      </div>

      <div style="max-width: 860px; margin: 72px auto 0">
        <p class="lede reveal" style="text-align: center; margin: 0 0 24px">
          So you've tried closing the gap:
        </p>
        <div class="fix-row reveal reveal-d1" style="grid-template-columns: 1fr 1fr">
          <div v-for="f in fixes" :key="f.q" class="fix-card">
            <span class="fix-q">{{ f.q }}</span>
            <span class="fix-a">{{ f.a }}</span>
          </div>
        </div>
        <div class="fix-card fix-card--wide reveal reveal-d2">
          <span class="fix-q">Tried ChatGPT?</span>
          <span class="fix-a">
            It talks. It doesn't <em>do</em>. Chatting with an AI all day is its own
            full-time job: prompt it, copy it, paste it, fix it, explain it all again
            tomorrow. Answers aren't outcomes — the work is still sitting there,
            and it's still yours.
          </span>
        </div>
      </div>

      <div class="reveal" style="margin: 88px auto 0; max-width: 680px; text-align: center">
        <p class="display-md" style="margin: 0">
          Big companies were never smarter.
          They had <mark class="mark-green">more leverage.</mark>
        </p>
        <p class="lede" style="margin: 24px auto 0; max-width: 600px">
          Apple generates ~$2.4M in revenue per employee. A typical small business:
          a tenth of that. The difference was always headcount and infrastructure —
          until now. Adam doesn't compete in the labor market: he can't be poached,
          never relocates, and scales the second you need more hands. Your five
          people run like fifty.
        </p>
        <p class="reveal reveal-d1" style="margin: 22px auto 0; max-width: 520px; font-size: 19px; line-height: 1.6; font-weight: 500; color: var(--text-display)">
          More revenue per human employee than ever.
          That's the new small-company math.
        </p>
        <p class="stat-source reveal reveal-d1">
          Sources: ManpowerGroup 2026 · Korn Ferry · NFIB · SHRM · Stanford &amp; MIT (Brynjolfsson et al.)
        </p>
      </div>

      <div class="reveal reveal-d3" style="margin: 80px auto 0; max-width: 640px; text-align: center">
        <p class="display-md" style="margin: 0">
          If you can hire a human to do it,
          <mark class="mark-green">you should hire Adam.</mark>
        </p>
        <p class="lede" style="margin: 22px 0 0">
          The one hire the talent shortage can't touch. Same job, same tools,
          same Slack message — from €495 a month, and he starts today.
        </p>
      </div>
    </div>
  </section>
</template>
