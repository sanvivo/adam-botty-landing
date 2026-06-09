<script setup lang="ts">
const tools = [
  'Slack', 'Microsoft Teams', 'GitHub', 'Notion', 'HubSpot', 'Salesforce', 'Jira',
  'Linear', 'Stripe', 'Shopify', 'Google Workspace', 'Microsoft 365', 'Zapier',
  'Airtable', 'Intercom', 'Zendesk', 'DATEV', 'WhatsApp',
]
</script>

<template>
  <section class="section">
    <div class="wrap" style="text-align: center">
      <h2 class="display-lg reveal" style="max-width: 680px; margin: 0 auto">
        Adam connects to the tools you already use
      </h2>
      <p class="lede reveal reveal-d1" style="margin: 18px auto 0; max-width: 480px">
        No migration. No new stack. No &ldquo;we don't support that.&rdquo;
      </p>
      <div class="logo-grid reveal reveal-d2" style="margin: 48px auto 0; max-width: 880px">
        <span v-for="t in tools" :key="t" class="tool-chip">
          <span class="tool-letter">{{ t[0] }}</span>
          {{ t }}
        </span>
      </div>
      <p class="reveal reveal-d3" style="margin: 32px 0 0; font-size: 15px; color: var(--text-secondary)">
        Don't see your tool? Adam connects to anything with an API.
      </p>
    </div>
  </section>
</template>
