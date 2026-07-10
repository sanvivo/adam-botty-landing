<template>
  <section id="how" class="section section-ink" data-ink-section style="position: relative; overflow: hidden">
    <div class="hero-glow" style="transform: scaleY(-1)" />
    <div class="wrap" style="position: relative; text-align: center">
      <div class="reveal" style="display: inline-block; filter: drop-shadow(0 12px 48px rgba(118, 251, 145, 0.35))">
        <AbAvatar bot follow :size="84" />
      </div>
      <div class="reveal reveal-d1" style="margin-top: 28px">
        <span class="eyebrow">Meet your new hire</span>
      </div>
      <h2 class="display-lg reveal reveal-d1" style="margin: 18px auto 0; max-width: 680px">
        Meet Adam. He doesn't chat.
        <span style="color: var(--green-400)">He works.</span>
      </h2>
      <p class="lede reveal reveal-d2" style="margin: 18px auto 0; max-width: 520px">
        Chatbots give you answers you still have to act on. Adam hands you
        finished work — the report built, the emails sent, the feature shipped.
      </p>
      <div class="reveal reveal-d2" style="margin: 44px auto 0; max-width: 620px; text-align: left">
        <p class="lede" style="margin: 0">
          Adam knows your products, your processes, your customers, your preferences.
          You don't repeat yourself with Adam — he already knows. You message him the
          way you'd message a colleague. He gets it done the way a great colleague would.
        </p>
        <p class="lede" style="margin: 18px 0 0">
          The difference: Adam is available 24/7, never loses context, connects to
          every tool in your stack, and costs a fraction of anyone else you could hire.
          He's not a tool waiting for commands — he monitors, flags, and acts before
          you even realize something needs doing.
        </p>
        <p style="margin: 18px 0 0; font-size: 19px; line-height: 1.6; font-weight: 500; color: #fff">
          This is what a perfect first employee looks like.
        </p>
      </div>
      <div class="stat-trio reveal reveal-d3" style="margin: 64px auto 0; max-width: 760px">
        <div><div class="num">24<em>/</em>7</div><div class="lbl">Available always</div></div>
        <div><div class="num"><em>0</em></div><div class="lbl">Forgotten tasks</div></div>
        <div><div class="num">100<em>%</em></div><div class="lbl">Context retained</div></div>
      </div>
    </div>
  </section>
</template>
