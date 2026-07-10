<script setup lang="ts">
const fixes = [
  { q: 'Bought another tool?', a: 'Now you manage the tool.' },
  { q: 'Hired someone?', a: 'Three months to find. Three more to train.' },
  { q: 'Tried ChatGPT?', a: 'It talks. It doesn\u2019t do.' },
]
</script>

<template>
  <section class="section">
    <div class="wrap">
      <h2 class="display-lg reveal" style="text-align: center">
        Copy. Paste. Chase. Repeat<span class="dot-green">.</span>
      </h2>
      <p class="lede reveal reveal-d1" style="text-align: center; margin: 20px auto 0; max-width: 460px">
        Half your week goes to work that doesn't need <em>you</em>.
        It just needs doing.
      </p>
      <div class="reveal reveal-d2" style="margin: 56px auto 0; max-width: 860px">
        <WeekEater />
      </div>
      <div class="fix-row reveal reveal-d2" style="margin: 56px auto 0; max-width: 860px">
        <div v-for="f in fixes" :key="f.q" class="fix-card">
          <span class="fix-q">{{ f.q }}</span>
          <span class="fix-a">{{ f.a }}</span>
        </div>
      </div>
      <div class="reveal reveal-d3" style="margin: 80px auto 0; max-width: 640px; text-align: center">
        <p class="display-md" style="margin: 0">
          If you can hire a human to do it,
          <mark class="mark-green">you can hire Adam.</mark>
        </p>
        <p class="lede" style="margin: 22px 0 0">
          Same job. Same tools. Same Slack message. For €250 a month — and he starts today.
        </p>
      </div>
    </div>
  </section>
</template>
