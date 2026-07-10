<script setup lang="ts">
import { Search } from 'lucide-vue-next'
import catalog from '~/data/integrations-web.json'

interface Item {
  name: string
  logo: string | null
  topics: string[]
}
const data = catalog as { total: number; topics: string[]; items: Item[] }

// Honest, rounded-down headline number: 3566 -> "3,500".
const toolsLabel = (Math.floor(data.total / 100) * 100).toLocaleString('en-US')

const VISIBLE_LIMIT = 60
const active = ref(data.topics[0]) // "Popular"
const query = ref('')
const showAll = ref(false)

const filtered = computed<Item[]>(() => {
  const q = query.value.trim().toLowerCase()
  if (q) {
    return data.items.filter(
      (i) => i.name.toLowerCase().includes(q) || i.topics.some((t) => t.toLowerCase().includes(q)),
    )
  }
  return data.items.filter((i) => i.topics.includes(active.value))
})

const visible = computed(() =>
  showAll.value ? filtered.value : filtered.value.slice(0, VISIBLE_LIMIT),
)

watch([active, query], () => {
  showAll.value = false
})

function selectTopic(t: string) {
  query.value = ''
  active.value = t
}

/** Display topics for a card: drop the synthetic "Popular" tag. */
function cardTopics(i: Item) {
  return i.topics.filter((t) => t !== 'Popular').join(', ')
}
</script>

<template>
  <section class="section" id="integrations">
    <div class="wrap" style="text-align: center">
      <h2 class="display-lg reveal" style="max-width: 820px; margin: 0 auto">
        Finally &mdash; an employee who uses over {{ toolsLabel }} tools like a real pro
      </h2>
      <p class="lede reveal reveal-d1" style="margin: 18px auto 0; max-width: 540px">
        No migration. No new stack. Browse {{ data.topics.length - 1 }} categories &mdash; from CRM
        and support to accounting, dev tools and marketing.
      </p>
    </div>

    <div class="wrap reveal reveal-d2" style="margin-top: 44px">
      <div class="ig-panel">
        <label class="ig-search">
          <Search :size="18" class="ig-search-icon" aria-hidden="true" />
          <input
            v-model="query"
            type="search"
            placeholder="Search 3,500+ integrations…"
            aria-label="Search integrations"
          />
        </label>

        <div class="ig-body">
          <aside class="ig-cats" aria-label="Integration categories">
            <div class="ig-cats-scroll">
              <button
                v-for="t in data.topics"
                :key="t"
                class="ig-cat"
                :class="{ 'ig-cat--active': !query && t === active }"
                type="button"
                @click="selectTopic(t)"
              >
                {{ t }}
              </button>
            </div>
          </aside>

          <div class="ig-main">
            <div class="ig-main-head">
              <h3 class="ig-main-title">{{ query ? 'Search results' : active }}</h3>
              <span class="ig-main-count">{{ filtered.length.toLocaleString('en-US') }} tools</span>
            </div>

            <div v-if="filtered.length" class="ig-grid">
              <div
                v-for="i in visible"
                :key="i.name"
                class="ig-card"
                :title="cardTopics(i)"
              >
                <img
                  v-if="i.logo"
                  class="ig-logo"
                  :src="i.logo"
                  :alt="`${i.name} logo`"
                  loading="lazy"
                  decoding="async"
                  width="28"
                  height="28"
                />
                <span v-else class="ig-logo ig-logo--fallback">{{ i.name[0] }}</span>
                <span class="ig-name">{{ i.name }}</span>
              </div>
            </div>

            <p v-else class="ig-empty">
              No tools match &ldquo;{{ query }}&rdquo; &mdash; but Adam connects to anything with an
              API.
            </p>

            <button
              v-if="!showAll && filtered.length > VISIBLE_LIMIT"
              class="ig-more"
              type="button"
              @click="showAll = true"
            >
              Show all {{ filtered.length.toLocaleString('en-US') }}
            </button>
          </div>
        </div>
      </div>

      <p
        class="reveal reveal-d3"
        style="margin: 28px 0 0; text-align: center; font-size: 15px; color: var(--text-secondary)"
      >
        Don't see your tool? Adam connects to anything with an API.
      </p>
    </div>
  </section>
</template>
