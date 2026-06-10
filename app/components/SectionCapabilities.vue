<script setup lang="ts">
import {
  Code, Database, Inbox, PenLine, Search, FileChartColumn,
  BellRing, Repeat, Link, Brain, CalendarClock, ShoppingCart,
} from 'lucide-vue-next'

const caps = [
  { icon: Code, label: 'Build & ship code changes' },
  { icon: Database, label: 'Enter & manage ERP / CRM records' },
  { icon: Inbox, label: 'Customer support tasks & follow-ups' },
  { icon: PenLine, label: 'Draft & send communications' },
  { icon: Search, label: 'Research & summarize anything' },
  { icon: FileChartColumn, label: 'Reports & documents' },
  { icon: BellRing, label: 'Monitor & alert on what matters' },
  { icon: Repeat, label: 'Run recurring workflows automatically' },
  { icon: Link, label: 'Sync data across tools & platforms' },
  { icon: Brain, label: 'Remember context, decisions, preferences' },
  { icon: CalendarClock, label: 'Schedule & coordinate' },
  { icon: ShoppingCart, label: 'Process orders & operations' },
]
</script>

<template>
  <section class="section section-ink" data-ink-section>
    <div class="wrap">
      <h2 class="display-lg reveal" style="text-align: center; max-width: 660px; margin: 0 auto">
        Here's what Adam's been doing for other founders this week
      </h2>
      <p class="lede reveal reveal-d1" style="text-align: center; margin: 18px auto 0; max-width: 460px">
        If it can be done inside a business tool or browser, Adam can do it.
      </p>
      <div class="cap-grid reveal reveal-d2" style="margin-top: 56px">
        <div v-for="c in caps" :key="c.label" class="cap-tile">
          <span class="cap-icon"><component :is="c.icon" :size="17" /></span>
          <span class="cap-label">{{ c.label }}</span>
        </div>
      </div>
      <p class="display-md reveal reveal-d3" style="text-align: center; margin: 72px 0 0">
        &ldquo;You describe the goal. Adam handles the how.&rdquo;
      </p>
    </div>
  </section>
</template>
