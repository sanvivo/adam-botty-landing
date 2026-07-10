<script setup lang="ts">
import { ChevronDown, Plus, SendHorizontal } from 'lucide-vue-next'

/* Interactive: the visitor sends Eva's pre-typed message themselves,
   then watches Adam do the newsletter end-to-end. */
const sent = ref(false)
const step = ref(0)
const timers: Array<ReturnType<typeof setTimeout>> = []

function send() {
  if (sent.value) return
  sent.value = true
  const seq = [400, 1600, 700, 700, 900, 900]
  let acc = 0
  seq.forEach((d, i) => {
    acc += d
    timers.push(setTimeout(() => (step.value = i + 1), acc))
  })
}
onUnmounted(() => timers.forEach(clearTimeout))
</script>

<template>
  <div class="ease-chat-wrap reveal reveal-d2">
    <div class="ease-demo sl-window" style="text-align: left">
      <div class="sl-topbar">
        <span class="sl-channel"># marketing <ChevronDown :size="14" /></span>
      </div>
      <div class="sl-feed" style="min-height: 150px" aria-live="polite">
        <div class="sl-day"><span>Today</span></div>
        <div class="sl-system">
          <AbAvatar bot :size="22" />
          <span>Adam joined #marketing</span>
        </div>
        <SlackMsg v-if="sent" name="Eva" avatar="/eva.png" time="2:14 PM">
          <span class="sl-mention">@Adam</span> the newsletter for Friday — check what
          worked last time and make this one better.
        </SlackMsg>
        <div v-if="step === 1" class="sl-typing">
          <span class="typing-dots"><i /><i /><i /></span>
          Adam is typing
        </div>
        <SlackMsg v-if="step >= 2" adam name="Adam" time="2:16 PM">
          Done — I analyzed your last 4 newsletters. &ldquo;Quick tips&rdquo; subject
          lines beat product news by 22%, so Friday leads with one.
          <ActionReceipt
            v-if="step >= 3"
            title="Pulled the numbers from your last 4 campaigns"
            :tools="['Customer.io']"
            time="2:14"
            style="margin-top: 10px"
          />
          <ActionReceipt
            v-if="step >= 4"
            title="Wrote the copy in your brand voice · generated 3 header images"
            :tools="['Customer.io', 'Canva']"
            time="2:15"
            style="margin-top: 8px"
          />
          <ActionReceipt
            v-if="step >= 5"
            title="Scheduled for Friday 9:00 — as a draft, waiting for your OK"
            :tools="['Customer.io']"
            time="2:16"
            pending
            style="margin-top: 8px"
          />
          <span v-if="step >= 6" style="display: block; margin-top: 10px">
            Review the draft here →
            <span class="sl-link">app.customer.io/drafts/friday-newsletter</span>
          </span>
        </SlackMsg>
      </div>
      <div class="sl-composer">
        <span class="sl-plus"><Plus :size="15" /></span>
        <span v-if="!sent" class="ease-draft">
          <span class="sl-mention">@Adam</span> the newsletter for Friday — check what
          worked last time and make this one better.
        </span>
        <span v-else class="sl-placeholder">Message #marketing</span>
        <button
          class="ease-send"
          :class="{ pulse: !sent }"
          type="button"
          aria-label="Send the message to Adam"
          @click="send"
        >
          <SendHorizontal :size="16" />
        </button>
      </div>
    </div>
  </div>
</template>
