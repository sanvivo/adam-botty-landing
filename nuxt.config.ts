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
            'Adam knows your entire business, connects to all your tools, and handles the work that has been eating your week. The AI employee for founders and teams. €250/month.',
        },
        { property: 'og:title', content: 'adambotty — The AI employee that gets it done' },
        {
          property: 'og:description',
          content:
            'Not a chatbot. Not a SaaS subscription. An employee. Adam connects to your stack, remembers everything, and works while you sleep.',
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: '/og-image.png' },
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

  // Fully prerendered static site for Azure Static Web Apps
  nitro: {
    prerender: {
      routes: ['/'],
      crawlLinks: true,
    },
  },
})
