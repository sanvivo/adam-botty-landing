import dataset from '~/data/integrations.json'

export interface Integration {
  name: string
  slug: string
  logo: string | null
  /** Canonical topic labels, e.g. ["CRM", "Marketing"]. */
  topics: string[]
  /** Topics joined for display, e.g. "CRM, Marketing". */
  topic: string
  /** Which vendor catalog(s) this integration came from. */
  sources: string[]
}

export interface IntegrationsDataset {
  generated_at: string
  sources: Record<string, { url: string; count: number; fetched_at: string }>
  count: number
  topics: string[]
  integrations: Integration[]
}

/**
 * Access to the full merged integrations catalog (Nango + Pipedream).
 * Note: importing this pulls the full ~1MB dataset into the consuming chunk,
 * so use it on a dedicated integrations page — not the home hero.
 */
export function useIntegrations() {
  const data = dataset as IntegrationsDataset

  const byTopic = (topic: string) =>
    data.integrations.filter((i) => i.topics.includes(topic))

  const search = (query: string) => {
    const q = query.trim().toLowerCase()
    if (!q) return data.integrations
    return data.integrations.filter(
      (i) => i.name.toLowerCase().includes(q) || i.topic.toLowerCase().includes(q),
    )
  }

  return {
    all: data.integrations,
    topics: data.topics,
    count: data.count,
    sources: data.sources,
    generatedAt: data.generated_at,
    byTopic,
    search,
  }
}
