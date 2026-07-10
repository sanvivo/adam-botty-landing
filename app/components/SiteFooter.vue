<script setup lang="ts">
import { Linkedin, Twitter } from 'lucide-vue-next'

const footerCols = [
  { title: 'Product', links: ['How it works', 'Integrations', 'Pricing', 'Changelog'] },
  { title: 'Company', links: ['About', 'Contact', 'Stories'] },
  { title: 'Legal', links: ['Privacy Policy', 'Terms of Service', 'Data Processing Agreement', 'GDPR Information', 'Imprint'] },
]
</script>

<template>
  <footer class="site-footer" data-ink-section>
    <div class="wrap" style="padding: 64px 40px 0">
      <div class="two-col" style="display: grid; grid-template-columns: 1.4fr 1fr 1fr 1fr; gap: 40px; padding-bottom: 56px; border-bottom: 1px solid rgba(255, 255, 255, 0.07)">
        <div>
          <span style="display: flex; align-items: center; gap: 10px">
            <AbAvatar bot :size="30" />
            <span style="font-size: 18px; font-weight: 600; letter-spacing: -0.02em; color: #fff">adambotty</span>
          </span>
          <p style="margin: 16px 0 0; font-size: 14.5px; line-height: 1.55; color: var(--gray-500); max-width: 240px">
            The employee your startup has been missing.
          </p>
          <div style="display: flex; gap: 14px; margin-top: 20px">
            <a href="#" aria-label="LinkedIn" @click.prevent><Linkedin :size="17" /></a>
            <a href="#" aria-label="X" @click.prevent><Twitter :size="17" /></a>
          </div>
        </div>
        <div v-for="c in footerCols" :key="c.title">
          <div class="col-title">{{ c.title }}</div>
          <div style="display: flex; flex-direction: column; gap: 11px">
            <a v-for="l in c.links" :key="l" href="#" @click.prevent>{{ l }}</a>
          </div>
        </div>
      </div>
      <div style="display: flex; align-items: center; padding: 24px 0 32px; font-size: 13px; color: var(--gray-600)">
        <span style="flex: 1">© 2026 adambotty. All rights reserved.</span>
        <span>Made in the EU</span>
      </div>
    </div>
  </footer>
</template>
