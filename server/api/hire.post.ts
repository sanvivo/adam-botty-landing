/* Lead-form endpoint: validates the submission and emails it to sales
   via Resend. Runs as an Azure Static Web Apps managed function in prod. */
export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // Honeypot: real users never fill this hidden field
  if (body?.website) return { ok: true }

  const name = String(body?.name ?? '').trim()
  const email = String(body?.email ?? '').trim()
  const company = String(body?.company ?? '').trim()
  const platform = String(body?.platform ?? '').trim()
  const task = String(body?.task ?? '').trim()

  if (!name || !company || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw createError({ statusCode: 400, statusMessage: 'Missing or invalid fields' })
  }

  const config = useRuntimeConfig(event)
  if (!config.hireWebhookUrl) {
    console.error('[hire] NUXT_HIRE_WEBHOOK_URL is not configured — lead lost:', { name, email, company })
    throw createError({ statusCode: 503, statusMessage: 'Lead delivery not configured' })
  }

  // Azure Logic App: DMs the sales team on Teams with the lead details
  await $fetch(config.hireWebhookUrl, {
    method: 'POST',
    body: { name, email, company, platform, task },
  }).catch((err) => {
    console.error('[hire] Logic App delivery failed:', err?.data ?? err)
    throw createError({ statusCode: 502, statusMessage: 'Lead delivery failed' })
  })

  return { ok: true }
})
