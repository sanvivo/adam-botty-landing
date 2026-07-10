<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'

const overInk = ref(true)

function onScroll() {
  const marks = document.querySelectorAll('[data-ink-section]')
  let ink = false
  marks.forEach((m) => {
    const r = m.getBoundingClientRect()
    if (r.top <= 64 && r.bottom >= 64) ink = true
  })
  overInk.value = ink
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onUnmounted(() => window.removeEventListener('scroll', onScroll))

const hireOpen = useHireModal()
</script>

<template>
  <nav class="site-nav" :class="overInk ? 'over-ink' : 'over-light'">
    <div class="nav-inner">
      <a href="#top" style="display: flex; align-items: center; gap: 10px; flex: 1; text-decoration: none">
        <AbAvatar bot :size="32" />
        <span class="wordmark">adambotty</span>
      </a>
      <a class="nav-link" href="#how">How Adam works</a>
      <a class="nav-link" href="#results">Results</a>
      <a class="nav-link" href="#pricing">Pricing</a>
      <a class="nav-link" href="#faq">FAQ</a>
      <AbButton :variant="overInk ? 'primary' : 'ink'" size="sm" aria-haspopup="dialog" :aria-expanded="hireOpen" @click="hireOpen = true">
        <template #icon><ArrowRight :size="16" /></template>
        Hire Adam
      </AbButton>
    </div>
  </nav>
</template>
