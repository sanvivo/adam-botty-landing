<script setup lang="ts">
const entries = [
  {
    day: 'Mon', time: '08:02', role: 'Operations',
    text: 'Entered 38 wholesaler order items into the ERP — from an order pasted into Teams.',
    tools: ['Teams', 'ERP'],
    quote: '\u201CDone before I finish my morning coffee.\u201D — Nikolai, pharmacy ops',
  },
  {
    day: 'Mon', time: '09:00', role: 'Finance',
    text: 'Sent the weekly finance report: bank and accounting reconciled, 2 unusual charges flagged.',
    tools: ['Bank', 'DATEV', 'Outlook'],
    quote: 'Runs every Monday — Adam scheduled it himself.',
  },
  {
    day: 'Tue', time: '11:34', role: 'Support',
    text: 'Built the CSV export Laureen asked for in Slack — live on staging 10 minutes later.',
    tools: ['Slack', 'GitHub'],
    quote: '\u201CI didn\u2019t explain the codebase. I just told Adam what I needed.\u201D — Laureen, support lead',
  },
  {
    day: 'Wed', time: '14:10', role: 'Marketing',
    text: 'Analyzed the last 4 newsletters, drafted Friday\u2019s edition in brand voice — images included.',
    tools: ['Customer.io', 'Canva'],
    quote: 'Beat the last edition\u2019s open rate by 12%.',
  },
  {
    day: 'Thu', time: '16:45', role: 'Sales',
    text: 'Updated 27 CRM deals from call notes and drafted follow-ups for 6 that went quiet.',
    tools: ['HubSpot', 'Gmail'],
    quote: 'Every follow-up waiting in drafts for approval.',
  },
  {
    day: 'Fri', time: '07:30', role: 'SEO',
    text: 'Re-checked rankings from last week\u2019s SEO fixes — 11 of 14 pages moved up. Next check scheduled.',
    tools: ['Search Console'],
    quote: 'Nobody asked. Adam set his own reminder a week ago.',
  },
]
</script>

<template>
  <section id="results" class="section section-ink" data-ink-section>
    <div class="wrap">
      <h2 class="display-lg reveal" style="text-align: center; max-width: 620px; margin: 0 auto">
        What Adam got done this week
      </h2>
      <p class="lede reveal reveal-d1" style="text-align: center; margin: 18px auto 0; max-width: 500px">
        Not demos. Pulled from real work logs — operations, finance, support,
        marketing, sales.
      </p>
      <div class="worklog reveal reveal-d2" style="margin: 56px auto 0; max-width: 860px">
        <div v-for="e in entries" :key="e.day + e.time" class="log-row">
          <div class="log-when">
            <span class="log-day">{{ e.day }}</span>
            <span class="log-time">{{ e.time }}</span>
          </div>
          <div class="log-main">
            <div class="log-head">
              <span class="log-role">{{ e.role }}</span>
              <span class="log-tools">
                <span v-for="t in e.tools" :key="t" class="log-tool">
                  <img v-if="toolLogo(t)" :src="toolLogo(t)!" alt="" width="12" height="12" loading="lazy">
                  {{ t }}
                </span>
              </span>
            </div>
            <p class="log-text">{{ e.text }}</p>
            <p class="log-quote">{{ e.quote }}</p>
          </div>
        </div>
        <div class="log-foot">
          <span class="log-count">+ 1,240 smaller tasks this week</span>
          <span>— every one logged in the audit trail.</span>
        </div>
      </div>
      <p class="display-md reveal reveal-d3" style="text-align: center; margin: 72px 0 0">
        &ldquo;You describe the goal. Adam handles the how.&rdquo;
      </p>
    </div>
  </section>
</template>
