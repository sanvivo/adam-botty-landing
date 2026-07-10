<script setup lang="ts">
import { ChevronDown, User, Headphones, SquarePlus, Plus, SendHorizontal } from 'lucide-vue-next'

/* Replays Adam doing work: user message → typing → reply → receipts */
const script = [
  { t: 'user', delay: 600 },
  { t: 'typing', delay: 1400 },
  { t: 'adam', delay: 800 },
  { t: 'r1', delay: 700 },
  { t: 'r2', delay: 700 },
]

const step = ref(0)
let timer: ReturnType<typeof setTimeout> | undefined

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    step.value = script.length
    return
  }
  let i = 0
  const next = () => {
    if (i >= script.length) return
    timer = setTimeout(() => {
      i += 1
      step.value = i
      next()
    }, script[i]!.delay)
  }
  next()
})
onUnmounted(() => clearTimeout(timer))

const show = (k: string) => step.value > script.findIndex((s) => s.t === k)
const typing = computed(() => step.value === 2)
</script>

<template>
  <div class="hero-chat sl-window">
    <div class="sl-topbar">
      <span class="sl-channel"># operations <ChevronDown :size="14" /></span>
      <span style="flex: 1" />
      <span class="sl-pill"><User :size="14" /><b>8</b></span>
      <span class="sl-pill"><Headphones :size="14" /><span class="sl-pill-div" /><ChevronDown :size="12" /></span>
      <span class="sl-pill"><SquarePlus :size="14" /></span>
    </div>
    <div class="sl-feed">
      <div class="sl-day"><span>Today</span></div>
      <div class="sl-system">
        <AbAvatar bot :size="22" />
        <span>Adam joined #operations</span>
      </div>
      <SlackMsg v-if="show('user')" name="Eva" avatar="/eva.png" time="9:41 AM">
        <span class="sl-mention">@Adam</span> prep the May invoices and chase the late ones.
      </SlackMsg>
      <div v-if="typing" class="sl-typing">
        <span class="typing-dots"><i /><i /><i /></span>
        Adam is typing
      </div>
      <SlackMsg v-if="show('adam')" adam name="Adam" time="9:43 AM">
        Done. 28 invoices sent, 3 reminders out.
        <ActionReceipt
          v-if="show('r1')"
          title="Reconciled 96 transactions for May"
          :tools="['DATEV']"
          time="9:42"
          style="margin-top: 10px"
        />
        <ActionReceipt
          v-if="show('r2')"
          title="Sent reminder to Müller GmbH (€4,200)"
          :tools="['Gmail']"
          time="9:43"
          style="margin-top: 8px"
        />
      </SlackMsg>
    </div>
    <div class="sl-composer">
      <span class="sl-plus"><Plus :size="15" /></span>
      <span class="sl-placeholder">Message #operations</span>
      <span class="sl-send">
        <SendHorizontal :size="15" />
        <span class="sl-pill-div" />
        <ChevronDown :size="13" />
      </span>
    </div>
  </div>
</template>
