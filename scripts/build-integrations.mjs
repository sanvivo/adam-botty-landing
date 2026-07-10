#!/usr/bin/env node
/*
 * Builds the unified integrations dataset used by the website.
 *
 * Inputs  (fetched by the per-vendor jobs, committed as source-of-truth):
 *   data/integration-sources/nango.json      — Nango provider catalog
 *   data/integration-sources/pipedream.json  — Pipedream app registry
 *
 * Output:
 *   app/data/integrations.json  — merged, de-duplicated, topic-normalized
 *
 * Refresh the raw inputs:
 *   Nango:      curl -s https://raw.githubusercontent.com/NangoHQ/nango/master/packages/providers/providers.yaml
 *               → key = slug, display_name, categories[]; logo = app.nango.dev/images/template-logos/<slug>.svg
 *   Pipedream:  POST https://api.pipedream.com/graphql  {"query":"{apps{name nameSlug imgSrc id category{name}}}"}
 *               → logo = imgSrc || https://pipedream.com/s.v0/<id>/logo/orig
 *
 * Run: node scripts/build-integrations.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')

/* Canonical topic labels. Maps both vendors' raw category vocabularies to one
   consistent, human-readable set. `null` = drop this category (not a real topic). */
const TOPIC_MAP = {
  // Nango category slugs
  productivity: 'Productivity',
  'dev-tools': 'Developer Tools',
  marketing: 'Marketing',
  crm: 'CRM',
  communication: 'Communication',
  hr: 'HR',
  analytics: 'Analytics',
  'e-commerce': 'E-Commerce',
  support: 'Support',
  other: 'Other',
  accounting: 'Accounting',
  ticketing: 'Ticketing',
  payment: 'Payments',
  popular: null,
  ats: 'Recruiting',
  erp: 'ERP',
  social: 'Social',
  design: 'Design',
  mcp: 'MCP',
  legal: 'Legal',
  iam: 'Identity & Access',
  'knowledge-base': 'Knowledge Base',
  storage: 'Storage',
  video: 'Video',
  invoicing: 'Invoicing',
  surveys: 'Surveys & Forms',
  cms: 'CMS',
  banking: 'Banking',
  sports: 'Sports',
  gaming: 'Gaming',
  search: 'Search',
  // Pipedream category names
  Marketing: 'Marketing',
  'Artificial Intelligence (AI)': 'AI',
  'Business Management': 'Business Management',
  Productivity: 'Productivity',
  Commerce: 'E-Commerce',
  Communication: 'Communication',
  'Web & App Development': 'Developer Tools',
  'Data Analytics': 'Analytics',
  'Developer Tools': 'Developer Tools',
  CRM: 'CRM',
  'Infrastructure & Cloud': 'Infrastructure',
  'File Storage': 'Storage',
  'Surveys & Forms': 'Surveys & Forms',
  'Human Resources': 'HR',
  'Help Desk & Support': 'Support',
  'Learning & Education': 'Education',
  Entertainment: 'Entertainment',
  Security: 'Security',
  Databases: 'Databases',
  'Language Tools': 'Language Tools',
  'Smart Home Automation': 'Smart Home',
  Travel: 'Travel',
  'Social Media': 'Social',
  'Control Flow': null,
  Testing: null,
}

/* Pipedream ships workflow primitives as "apps" — exclude them, they are not
   integrations a customer would connect. */
const PIPEDREAM_PRIMITIVE_SLUGS = new Set([
  'node', 'python', 'go', 'bash', 'http', 'schedule', 'filter', 'ifelse',
  'switch', 'delay', 'data_stores', 'pipedream', 'pipedream_utils',
  'formatting', 'end', 'return_http_response', 'sql', 'rss', 'zoho_notebook',
])

const readJson = (p) => JSON.parse(readFileSync(resolve(root, p), 'utf8'))

function topicsFor(rawCategories) {
  const out = []
  for (const c of rawCategories || []) {
    if (!(c in TOPIC_MAP)) {
      // Unknown category → title-case the slug so nothing silently vanishes.
      const label = c.replace(/[-_]/g, ' ').replace(/\b\w/g, (m) => m.toUpperCase())
      if (!out.includes(label)) out.push(label)
      continue
    }
    const label = TOPIC_MAP[c]
    if (label && !out.includes(label)) out.push(label)
  }
  return out
}

/* Merge key: strip trailing "(qualifier)" and non-alphanumerics so that
   "OpenAI (ChatGPT)" (Pipedream) and "OpenAI" (Nango) collapse to one entry. */
function mergeKey(name) {
  return name
    .replace(/\s*\([^)]*\)\s*$/, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '')
}

function cleanName(name) {
  return name.replace(/\s*\([^)]*\)\s*$/, '').trim() || name.trim()
}

const nango = readJson('data/integration-sources/nango.json')
const pipedream = readJson('data/integration-sources/pipedream.json')

/* One product may appear as several vendor entries (Nango ships auth/feature
   variants like `hubspot`, `hubspot-mcp`, `salesforce-sandbox`). We collapse
   them by mergeKey and, per source, keep only the "base" representative — the
   shortest slug — so logos, slugs and topics come from the canonical product
   and not from a variant (avoids e.g. HubSpot being tagged "MCP"). */
/** @type {Map<string, {names:string[], reps:Record<string,{slug:string,logo:string|null,categories:string[]}>}>} */
const merged = new Map()

function ingest(items, source) {
  for (const item of items) {
    if (source === 'pipedream' && PIPEDREAM_PRIMITIVE_SLUGS.has(item.slug)) continue
    const key = mergeKey(item.name)
    if (!key) continue
    let entry = merged.get(key)
    if (!entry) {
      entry = { names: [], reps: {} }
      merged.set(key, entry)
    }
    entry.names.push(cleanName(item.name))
    const rep = entry.reps[source]
    // Keep the shortest slug as the canonical representative for this source.
    if (!rep || item.slug.length < rep.slug.length) {
      entry.reps[source] = {
        slug: item.slug,
        logo: item.logo || null,
        categories: item.categories || [],
      }
    }
  }
}

ingest(nango.integrations, 'nango')
ingest(pipedream.integrations, 'pipedream')

const integrations = [...merged.values()]
  .map((e) => {
    const nangoRep = e.reps.nango
    const pdRep = e.reps.pipedream
    const sources = Object.keys(e.reps).sort()
    // Shortest clean name reads best ("OpenAI" over "OpenAI (ChatGPT)").
    const name = e.names.sort((a, b) => a.length - b.length)[0]
    // Prefer Nango's canonical base slug + consistent SVG logo.
    const slug = (nangoRep || pdRep).slug
    const logo = (nangoRep && nangoRep.logo) || (pdRep && pdRep.logo) || null
    const topics = topicsFor([
      ...(nangoRep ? nangoRep.categories : []),
      ...(pdRep ? pdRep.categories : []),
    ]).sort()
    return { name, slug, logo, topics, topic: topics.join(', '), sources }
  })
  .filter((e) => e.logo)
  .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))

const allTopics = [...new Set(integrations.flatMap((i) => i.topics))].sort()

const output = {
  generated_at: new Date().toISOString(),
  sources: {
    nango: { url: nango.url, count: nango.count, fetched_at: nango.fetched_at },
    pipedream: { url: pipedream.url, count: pipedream.count, fetched_at: pipedream.fetched_at },
  },
  count: integrations.length,
  topics: allTopics,
  integrations,
}

writeFileSync(resolve(root, 'app/data/integrations.json'), JSON.stringify(output, null, 2) + '\n')

/* Curated, recognizable brands that seed the "Popular" virtual category.
   Resolved against the merged set by mergeKey; unknowns are skipped. */
const POPULAR_NAMES = [
  'Slack', 'Microsoft Teams', 'Gmail', 'Google Calendar', 'Google Sheets',
  'Google Drive', 'Outlook', 'Notion', 'HubSpot', 'Salesforce', 'Stripe',
  'Shopify', 'GitHub', 'GitLab', 'Linear', 'Jira', 'Asana', 'Trello',
  'ClickUp', 'Zendesk', 'Intercom', 'Airtable', 'Zoom', 'Dropbox', 'Box',
  'Mailchimp', 'OpenAI', 'Anthropic', 'Twilio', 'WhatsApp', 'QuickBooks',
  'Xero', 'Calendly', 'Typeform', 'Discord', 'PayPal', 'DocuSign', 'Monday',
  'Google Ads', 'Facebook', 'LinkedIn', 'Klaviyo', 'Google Analytics',
  'WordPress', 'Zoho CRM', 'Pipedrive', 'ActiveCampaign', 'WooCommerce',
  'Webflow', 'Zapier', 'Google BigQuery', 'Snowflake', 'Twilio SendGrid',
]
const lookup = new Map(integrations.map((i) => [mergeKey(i.name), i]))
const popularSet = new Set()
const popularOrder = new Map() // name -> curated rank
POPULAR_NAMES.forEach((n, rank) => {
  const hit = lookup.get(mergeKey(n))
  if (hit) {
    popularSet.add(hit.name)
    popularOrder.set(hit.name, rank)
  }
})

/* Compact catalog for the website browser: only display + filter fields.
   "Popular" is a synthetic topic prepended to curated items so the sidebar
   filter treats it like any other category. */
const POPULAR = 'Popular'
const items = integrations.map((i) => ({
  name: i.name,
  logo: i.logo,
  topics: popularSet.has(i.name) ? [POPULAR, ...i.topics] : i.topics,
}))
// Popular items first (curated order), then everything alphabetical.
items.sort((a, b) => {
  const ap = popularOrder.has(a.name), bp = popularOrder.has(b.name)
  if (ap && bp) return popularOrder.get(a.name) - popularOrder.get(b.name)
  if (ap) return -1
  if (bp) return 1
  return a.name.toLowerCase().localeCompare(b.name.toLowerCase())
})

const webTopics = [POPULAR, ...allTopics]
const webOut = { total: integrations.length, topics: webTopics, items }
writeFileSync(
  resolve(root, 'app/data/integrations-web.json'),
  JSON.stringify(webOut) + '\n',
)
console.log(`Wrote app/data/integrations-web.json (popular: ${popularSet.size}/${POPULAR_NAMES.length}, ${(JSON.stringify(webOut).length / 1024).toFixed(0)}KB)`)

/* "Wall" of the most recognizable integrations for the backstage demo grid.
   Hand-curated famous brands first, then topped up with tools present in both
   vendor catalogs (a decent popularity proxy) until we hit the target size. */
const WALL_NAMES = [
  'Slack', 'Microsoft Teams', 'Discord', 'Zoom', 'Google Meet', 'Gmail', 'Outlook',
  'Google Calendar', 'Google Drive', 'Microsoft OneDrive', 'Dropbox', 'Box',
  'Notion', 'Confluence', 'Coda', 'Evernote', 'Airtable', 'Asana', 'Trello',
  'Monday', 'ClickUp', 'Jira', 'Linear', 'Basecamp', 'Todoist', 'Miro', 'Figma',
  'Canva', 'GitHub', 'GitLab', 'Bitbucket', 'Jenkins', 'CircleCI', 'Vercel',
  'Netlify', 'Cloudflare', 'AWS', 'Google Cloud', 'Microsoft Azure',
  'DigitalOcean', 'Heroku', 'Datadog', 'Grafana', 'Sentry', 'PagerDuty',
  'New Relic', 'Salesforce', 'HubSpot', 'Pipedrive', 'Zoho CRM', 'Zendesk',
  'Intercom', 'Freshdesk', 'Help Scout', 'Front', 'Stripe', 'PayPal', 'Square',
  'Braintree', 'Chargebee', 'Recurly', 'QuickBooks', 'Xero', 'FreshBooks',
  'Shopify', 'WooCommerce', 'BigCommerce', 'Magento', 'Squarespace', 'Wix',
  'Webflow', 'WordPress', 'Mailchimp', 'SendGrid', 'Klaviyo', 'ActiveCampaign',
  'ConvertKit', 'Marketo', 'Customer.io', 'Twilio', 'Vonage', 'Google Ads',
  'Facebook', 'Instagram', 'LinkedIn', 'TikTok', 'YouTube', 'Pinterest',
  'Reddit', 'Google Analytics', 'Mixpanel', 'Amplitude', 'Segment', 'Hotjar',
  'Looker', 'Tableau', 'Snowflake', 'Google BigQuery', 'Databricks',
  'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Supabase', 'Firebase', 'Typeform',
  'SurveyMonkey', 'Jotform', 'Calendly', 'DocuSign', 'PandaDoc', 'Zapier',
  'Make', 'OpenAI', 'Anthropic', 'Hugging Face', 'Perplexity', 'Cohere',
  'ElevenLabs', 'Workday', 'BambooHR', 'Gusto', 'Rippling', 'Deel', 'Greenhouse',
  'Lever', 'Ashby', 'Okta', 'Auth0', '1Password', 'ServiceNow', 'SAP', 'NetSuite',
  'Oracle', 'Braze', 'Iterable', 'Airtable', 'Google Sheets', 'Google Forms',
  'Microsoft Excel', 'Power BI', 'Snyk', 'Docker', 'Kubernetes', 'Airtable',
  'Airtable', 'Twitch', 'Spotify', 'Airtable',
]
const WALL_TARGET = 168
const wallSeen = new Set()
const wall = []
function pushWall(entry) {
  if (!entry || !entry.logo || wallSeen.has(entry.name)) return
  wallSeen.add(entry.name)
  wall.push({ name: entry.name, logo: entry.logo })
}
for (const n of WALL_NAMES) pushWall(lookup.get(mergeKey(n)))
const curatedCount = wall.length
for (const e of integrations) {
  if (wall.length >= WALL_TARGET) break
  if (e.sources.length === 2) pushWall(e)
}
const wallOut = { count: wall.length, curated: curatedCount, items: wall }
writeFileSync(
  resolve(root, 'app/data/integrations-showcase.json'),
  JSON.stringify(wallOut, null, 2) + '\n',
)
console.log(`Wrote app/data/integrations-showcase.json (${wall.length} logos, ${curatedCount} curated)`)

const bySource = { nango: 0, pipedream: 0, both: 0 }
for (const i of integrations) {
  if (i.sources.length === 2) bySource.both++
  else if (i.sources[0] === 'nango') bySource.nango++
  else bySource.pipedream++
}

console.log(`Wrote app/data/integrations.json`)
console.log(`  unique integrations: ${integrations.length}`)
console.log(`  from raw: nango ${nango.count} + pipedream ${pipedream.count} = ${nango.count + pipedream.count}`)
console.log(`  overlap (both vendors): ${bySource.both}  | nango-only: ${bySource.nango}  | pipedream-only: ${bySource.pipedream}`)
console.log(`  distinct topics: ${allTopics.length}`)
console.log(`  topics: ${allTopics.join(', ')}`)
