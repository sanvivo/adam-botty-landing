/* Real tool logos for chips/receipts across the site.
   Same Nango logo set the integrations catalog uses. Unknown tools
   gracefully fall back to a text-only chip. */
const LOGOS = 'https://app.nango.dev/images/template-logos'

const MAP: Record<string, string> = {
  'Slack': `${LOGOS}/slack.svg`,
  'Teams': `${LOGOS}/microsoft-teams.svg`,
  'Microsoft Teams': `${LOGOS}/microsoft-teams.svg`,
  'GitHub': `${LOGOS}/github.svg`,
  'DATEV': `${LOGOS}/datev.svg`,
  'Gmail': `${LOGOS}/google-mail.svg`,
  'Outlook': `${LOGOS}/outlook.svg`,
  'Customer.io': `${LOGOS}/customer-io.svg`,
  'Canva': `${LOGOS}/canva.svg`,
  'HubSpot': `${LOGOS}/hubspot.svg`,
  'Shopify': `${LOGOS}/shopify.svg`,
  'Grafana': `${LOGOS}/grafana.svg`,
  'Search Console': `${LOGOS}/google-search-console.svg`,
  'Figma': `${LOGOS}/figma.svg`,
  'Notion': `${LOGOS}/notion.svg`,
  'ClickUp': `${LOGOS}/clickup.svg`,
  'Zendesk': `${LOGOS}/zendesk.svg`,
  'Stripe': `${LOGOS}/stripe-api-key.svg`,
}

export const toolLogo = (name: string): string | null => MAP[name] ?? null
