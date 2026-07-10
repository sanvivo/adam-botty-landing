// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-06-09',
  modules: ['@nuxt/fonts'],

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      bodyAttrs: { class: 'ab-body' },
      title: 'adambotty — The AI employee that gets it done',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Adam knows your entire business, connects to all your tools, and handles the work that has been eating your week. The AI employee for founders and teams. From €495/month.',
        },
        { property: 'og:title', content: 'adambotty — The AI employee that gets it done' },
        {
          property: 'og:description',
          content:
            'Not a chatbot. Not a SaaS subscription. An employee. Adam connects to your stack, remembers everything, and works while you sleep.',
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: 'https://adambotty.com/og-image.png' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: 'adambotty — The AI employee that gets it done' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'adambotty — The AI employee that gets it done' },
        {
          name: 'twitter:description',
          content:
            'Not a chatbot. Not a SaaS subscription. An employee. Adam connects to your stack, remembers everything, and works while you sleep.',
        },
        { name: 'twitter:image', content: 'https://adambotty.com/og-image.png' },
      ],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    },
  },

  fonts: {
    families: [
      { name: 'Outfit', provider: 'google', weights: [300, 400, 500, 600, 700] },
      { name: 'Lato', provider: 'google', weights: [400, 700, 900] },
    ],
  },

  runtimeConfig: {
    // Azure Logic App callback URL (LA-AdambottyLead) — sends the lead as a
    // Teams DM. Set via NUXT_HIRE_WEBHOOK_URL (SWA app setting / .env locally).
    hireWebhookUrl: '',
  },

  // Prerendered marketing page; /api/hire runs as an SWA managed function
  // (deploy workflow builds with NITRO_PRESET=azure)
  nitro: {
    prerender: {
      routes: ['/'],
      crawlLinks: true,
    },
  },
})
