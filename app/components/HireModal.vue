<script setup lang="ts">
import { X, ArrowRight, Check } from 'lucide-vue-next'

const open = useHireModal()
const sent = ref(false)
const sending = ref(false)
const sendError = ref(false)

const form = reactive({
  name: '',
  email: '',
  company: '',
  platform: 'Slack',
  task: '',
  website: '', // honeypot — stays empty for humans
})
const platforms = ['Slack', 'Microsoft Teams', 'Other']

function close() {
  open.value = false
  sendError.value = false
  // Reset the thank-you state a beat after the fade-out.
  // Form fields are deliberately kept so an accidental close loses nothing.
  setTimeout(() => (sent.value = false), 300)
}

/* Focus management: move focus into the dialog on open, trap Tab inside,
   and restore focus to the trigger on close. */
const cardRef = ref<HTMLElement | null>(null)
let lastFocused: HTMLElement | null = null

const FOCUSABLE = 'a[href], button:not([disabled]), textarea, input:not([tabindex="-1"])'

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') return close()
  if (e.key !== 'Tab' || !cardRef.value) return
  const els = [...cardRef.value.querySelectorAll<HTMLElement>(FOCUSABLE)]
  if (!els.length) return
  const first = els[0]!
  const last = els[els.length - 1]!
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault()
    last.focus()
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault()
    first.focus()
  }
}

watch(open, async (v) => {
  document.body.style.overflow = v ? 'hidden' : ''
  if (v) {
    lastFocused = document.activeElement as HTMLElement | null
    window.addEventListener('keydown', onKey)
    await nextTick()
    cardRef.value?.querySelector<HTMLElement>('input:not([tabindex="-1"])')?.focus()
  } else {
    window.removeEventListener('keydown', onKey)
    lastFocused?.focus?.()
    lastFocused = null
  }
})
onUnmounted(() => {
  document.body.style.overflow = ''
  window.removeEventListener('keydown', onKey)
})

async function submit() {
  if (sending.value) return
  sending.value = true
  sendError.value = false
  try {
    await $fetch('/api/hire', { method: 'POST', body: { ...form }, timeout: 15000 })
    sent.value = true
  } catch {
    sendError.value = true
  } finally {
    sending.value = false
  }
}
</script>

<template>
  <Teleport to="body">
    <Transition name="hm">
      <div v-if="open" class="hm-scrim" @click.self="close">
        <div ref="cardRef" class="hm-card" role="dialog" aria-modal="true" aria-label="Hire Adam">
          <button class="hm-close" aria-label="Close" @click="close"><X :size="18" /></button>

          <template v-if="!sent">
            <div style="display: flex; align-items: center; gap: 14px">
              <AbAvatar bot :size="44" />
              <div>
                <h3 style="margin: 0; font-size: 24px; font-weight: 600; letter-spacing: var(--tracking-tight); color: var(--text-display)">
                  Hire Adam
                </h3>
                <p style="margin: 2px 0 0; font-size: 14px; color: var(--text-secondary)">
                  Shortest job interview you'll ever run.
                </p>
              </div>
            </div>

            <form style="margin-top: 28px; display: flex; flex-direction: column; gap: 18px" @submit.prevent="submit">
              <div class="hm-grid">
                <label class="ab-field">
                  <span class="ab-field__label">Your name</span>
                  <span class="ab-input"><input v-model="form.name" required autocomplete="name" placeholder="Eva Beispiel"></span>
                </label>
                <label class="ab-field">
                  <span class="ab-field__label">Work email</span>
                  <span class="ab-input"><input v-model="form.email" required type="email" autocomplete="email" placeholder="eva@company.com"></span>
                </label>
              </div>
              <label class="ab-field">
                <span class="ab-field__label">Company</span>
                <span class="ab-input"><input v-model="form.company" required autocomplete="organization" placeholder="Company GmbH"></span>
              </label>
              <div class="ab-field">
                <span class="ab-field__label">Where does your team talk?</span>
                <div style="display: flex; gap: 8px; flex-wrap: wrap">
                  <button
                    v-for="p in platforms"
                    :key="p"
                    type="button"
                    class="hm-pill"
                    :class="{ on: form.platform === p }"
                    :aria-pressed="form.platform === p"
                    @click="form.platform = p"
                  >
                    <Check v-if="form.platform === p" :size="14" />
                    {{ p }}
                  </button>
                </div>
              </div>
              <label class="ab-field">
                <span class="ab-field__label">What would Adam's first task be?</span>
                <textarea
                  v-model="form.task"
                  class="hm-textarea"
                  rows="3"
                  placeholder="The annoying one you keep postponing…"
                />
              </label>
              <!-- Honeypot: invisible to humans, tempting for bots -->
              <input
                v-model="form.website"
                type="text"
                name="website"
                tabindex="-1"
                autocomplete="off"
                aria-hidden="true"
                style="position: absolute; left: -9999px; height: 0; width: 0; opacity: 0"
              >
              <AbButton size="lg" type="submit" style="width: 100%; margin-top: 4px" :disabled="sending">
                <template #icon><ArrowRight :size="18" /></template>
                {{ sending ? 'Sending…' : 'Send & meet Adam' }}
              </AbButton>
              <p v-if="sendError" role="status" style="margin: 0; font-size: 13.5px; color: var(--status-danger, #C2410C); text-align: center">
                Something went wrong sending your request. Please try again — or
                email us directly at hire@adambotty.com.
              </p>
              <p v-else style="margin: 0; font-size: 13px; color: var(--text-tertiary); text-align: center">
                Our team gets back to you within one business day.
              </p>
            </form>
          </template>

          <template v-else>
            <div style="text-align: center; padding: 24px 0 8px">
              <AbAvatar bot :size="56" style="filter: drop-shadow(0 8px 32px rgba(118, 251, 145, 0.4))" />
              <h3 style="margin: 20px 0 0; font-size: 24px; font-weight: 600; letter-spacing: var(--tracking-tight); color: var(--text-display)">
                Application received<span class="dot-green">.</span>
              </h3>
              <p style="margin: 12px auto 0; max-width: 340px; font-size: 15px; line-height: 1.6; color: var(--text-secondary)">
                Well — his application to work for you. We'll be in touch within
                one business day to set up Adam's first task.
              </p>
              <AbButton variant="secondary" style="margin-top: 24px" @click="close">Done</AbButton>
            </div>
          </template>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
