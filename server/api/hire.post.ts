/* Lead-form endpoint: validates the submission and forwards it to the
   LA-AdambottyLead Azure Logic App, which DMs sales on Microsoft Teams.
   Runs as an Azure Static Web Apps managed function in prod. */
const PLATFORMS = new Set(['Slack', 'Microsoft Teams', 'Other'])

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // Honeypot: real users never fill this hidden field
  if (body?.website) return { ok: true }

  const field = (v: unknown, max: number) => String(v ?? '').trim().slice(0, max)
  const name = field(body?.name, 120)
  const email = field(body?.email, 254)
  const company = field(body?.company, 120)
  const platform = field(body?.platform, 40)
  const task = field(body?.task, 2000)

  if (
    !name || !company
    || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    || !PLATFORMS.has(platform)
  ) {
    throw createError({ statusCode: 400, statusMessage: 'Missing or invalid fields' })
  }

  const config = useRuntimeConfig(event)
  if (!config.hireWebhookUrl) {
    // No lead details in logs: user PII must not end up in log storage
    console.error('[hire] NUXT_HIRE_WEBHOOK_URL is not configured — lead could not be delivered')
    throw createError({ statusCode: 503, statusMessage: 'Lead delivery not configured' })
  }

  await $fetch(config.hireWebhookUrl, {
    method: 'POST',
    body: { name, email, company, platform, task },
    timeout: 8000,
    retry: 2,
    retryDelay: 500,
    retryStatusCodes: [408, 429, 500, 502, 503, 504],
  }).catch((err) => {
    // Never log the raw error: FetchError messages embed the full request URL,
    // which contains the Logic App's sig= shared-access secret
    console.error('[hire] Logic App delivery failed', {
      status: err?.response?.status ?? err?.statusCode ?? 'network',
    })
    throw createError({ statusCode: 502, statusMessage: 'Lead delivery failed' })
  })

  return { ok: true }
})
