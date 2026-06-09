<template>
  <section id="results" class="section">
    <div class="wrap">
      <h2 class="display-lg reveal" style="text-align: center; max-width: 620px; margin: 0 auto">
        Real founders. Real results
      </h2>
      <p class="lede reveal reveal-d1" style="text-align: center; margin: 18px auto 0; max-width: 460px">
        Not demos. Not screenshots. Things Adam did this week.
      </p>
      <div class="two-col" style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-top: 56px; align-items: start">
        <article class="story-card reveal reveal-d1">
          <div style="display: flex; align-items: center; gap: 14px">
            <AbAvatar name="Laureen M." :size="44" />
            <div style="flex: 1">
              <div style="font-size: 15.5px; font-weight: 600; color: var(--text-display)">Laureen M.</div>
              <div style="font-size: 13.5px; color: var(--text-secondary)">Customer support team lead · Sanvivo</div>
            </div>
            <AbBadge variant="success" dot>This week</AbBadge>
          </div>
          <h3 class="story-quote">&ldquo;Built in 10 minutes. From a single Slack message.&rdquo;</h3>
          <div class="story-body">
            <p>
              Laureen needed a small feature in her support tool. In the old world:
              write a spec, open a Jira ticket, wait three days for the next sprint,
              explain it twice.
            </p>
            <p>
              With Adam: she sent a Slack message. Adam asked exactly the right
              questions, built it, and sent her a staging link to test.
              Ten minutes. No spec. No ticket. No waiting.
            </p>
            <ActionReceipt title="Shipped CSV export to staging for Laureen" :tools="['Slack', 'GitHub']" time="11:34" />
            <p class="story-attr" style="margin-top: 14px">
              &ldquo;I didn't explain the codebase. I didn't write documentation. I just told Adam what I needed.&rdquo;
            </p>
          </div>
        </article>
        <article class="story-card reveal reveal-d2">
          <div style="display: flex; align-items: center; gap: 14px">
            <AbAvatar name="Nikolai" :size="44" />
            <div style="flex: 1">
              <div style="font-size: 15.5px; font-weight: 600; color: var(--text-display)">Nikolai</div>
              <div style="font-size: 13.5px; color: var(--text-secondary)">Operations · Pharmacist</div>
            </div>
            <AbBadge variant="success" dot>This week</AbBadge>
          </div>
          <h3 class="story-quote">&ldquo;Done before I finish my morning coffee.&rdquo;</h3>
          <div class="story-body">
            <p>
              Every week: new wholesaler orders to enter into the ERP system.
              In the old world, that was 45 minutes of manual data entry.
              Every. Single. Week.
            </p>
            <p>
              With Adam: Nikolai copies the order into Teams. Adam reads it and
              creates every item in the ERP automatically. Zero minutes. Zero errors.
              Zero Mondays dreading the task.
            </p>
            <ActionReceipt title="Created 38 order items in the ERP from Monday's wholesaler list" :tools="['Teams', 'ERP']" time="08:02" />
            <p class="story-attr" style="margin-top: 14px">
              &ldquo;I just paste it in and it's done. I don't think about it anymore.&rdquo;
            </p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
