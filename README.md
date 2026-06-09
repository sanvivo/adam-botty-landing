# adambotty website

Marketing site for AdamBotty — the AI employee. Built with Nuxt 4, fully prerendered (SSG), deployed to Azure Static Web Apps.

Design source: `specs/AdamBotty Design System` (tokens, components) and `specs/Adam Botty Website` (section design handoff).

## Stack

- **Nuxt 4** (Vue 3, static generation via `nuxt generate`)
- **@nuxt/fonts** — self-hosts Outfit (brand) + Lato (Slack mock-up)
- **lucide-vue-next** — icons (stroke 2, per design system)
- Design system CSS ported 1:1 into `app/assets/css/` (tokens → components → site)

## Development

```bash
npm install
npm run dev        # http://localhost:3000
```

## Build & deploy

```bash
npm run generate   # static output in .output/public
```

Deploy to Azure Static Web Apps with the SWA CLI:

```bash
npx @azure/static-web-apps-cli deploy .output/public \
  --deployment-token "$SWA_DEPLOYMENT_TOKEN" --env production
```

`public/staticwebapp.config.json` configures caching for hashed assets and the 404 page.

## Structure

```
app/
  app.vue                 # section order + scroll-reveal observer
  assets/css/             # tokens.css, components.css, site.css
  components/             # Ab* primitives + Section* blocks
public/
  staticwebapp.config.json
  favicon.svg             # Adam logo mark
specs/                    # design handoff (source of truth, not shipped)
```
