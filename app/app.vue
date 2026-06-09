<script setup lang="ts">
/* Scroll reveal — WAAPI so content is never stuck hidden
   (print, capture, reduced motion all see the base visible state) */
let io: IntersectionObserver | undefined

onMounted(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (!e.isIntersecting) return
        const el = e.target as HTMLElement
        io?.unobserve(el)
        if (!reduced && el.animate) {
          const d = el.classList.contains('reveal-d1') ? 80
            : el.classList.contains('reveal-d2') ? 160
            : el.classList.contains('reveal-d3') ? 240 : 0
          el.animate(
            [{ opacity: 0, transform: 'translateY(22px)' }, { opacity: 1, transform: 'none' }],
            { duration: 650, delay: d, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'backwards' },
          )
        }
      }),
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
  )
  document.querySelectorAll('.reveal').forEach((el) => io!.observe(el))
})
onUnmounted(() => io?.disconnect())
</script>

<template>
  <div class="site" style="--glow-a: 0.18">
    <SiteNav />
    <SiteHero />
    <ClaimStrip />
    <SectionPain />
    <SectionReframe />
    <SectionMeetAdam />
    <SectionBackstage />
    <SectionPillars />
    <SectionProof />
    <SectionCapabilities />
    <SectionIntegrations />
    <SectionMath />
    <SectionTrust />
    <SectionFinalCta />
    <SiteFooter />
  </div>
</template>
