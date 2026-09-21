// Reusable content blocks shared across pages.

const { site } = require('./site');
const { icons } = require('./icons');
const { wave, rel } = require('./layout');

const esc = (s) =>
  String(s).replace(/&(?!\w+;|#\d+;)/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Inner-page banner with breadcrumb trail. */
function pageHero({ title, lead = '', crumbs = [], depth }) {
  const trail = [{ label: 'Home', url: '/' }, ...crumbs];
  const items = trail
    .map((c, i) =>
      i === trail.length - 1 || !c.url
        ? `<li aria-current="page">${c.label}</li>`
        : `<li><a href="${rel(c.url, depth)}">${c.label}</a></li>`
    )
    .join('');

  return `<section class="pagehero">
  <div class="container">
    <nav class="crumbs" aria-label="Breadcrumb"><ol>${items}</ol></nav>
    <h1 class="pagehero__title">${title}</h1>
    ${lead ? `<p class="pagehero__lead">${lead}</p>` : ''}
  </div>
  ${wave('white')}
</section>`;
}

/** Standard content section. `tone` = white | alt | navy. */
function section({ tone = 'white', eyebrow = '', title = '', lead = '', body = '', id = '', narrow = false }) {
  const head =
    eyebrow || title || lead
      ? `<div class="section__head${narrow ? ' section__head--narrow' : ''}">
      ${eyebrow ? `<p class="eyebrow">${eyebrow}</p>` : ''}
      ${title ? `<h2 class="section__title">${title}</h2>` : ''}
      ${lead ? `<p class="section__lead">${lead}</p>` : ''}
    </div>`
      : '';

  return `<section class="section section--${tone}"${id ? ` id="${id}"` : ''}>
  <div class="container">
    ${head}
    ${body}
  </div>
</section>`;
}

/** Grid of linked cards with optional image. */
function cardGrid(cards, depth, { cols = 3 } = {}) {
  const items = cards
    .map((c) => {
      const media = c.image
        ? `<div class="card__media"><img src="${rel(c.image, depth)}" alt="${esc(c.imageAlt || c.title)}" loading="lazy" width="480" height="300"></div>`
        : '';
      // The whole card is the link, so the "Learn More" affordance is a span:
      // a nested <a> would make the browser close the outer anchor early.
      const link = c.url
        ? `<span class="card__link">Learn More ${icons.arrow({ size: 16 })}</span>`
        : '';
      const open = c.url ? `<a class="card card--link" href="${rel(c.url, depth)}">` : '<article class="card">';
      const close = c.url ? '</a>' : '</article>';
      return `${open}
      ${media}
      <div class="card__body">
        <h3 class="card__title">${c.title}</h3>
        ${c.text ? `<p class="card__text">${c.text}</p>` : ''}
        ${link}
      </div>
    ${close}`;
    })
    .join('\n    ');

  return `<div class="grid grid--${cols}">\n    ${items}\n  </div>`;
}

/** Numbered / icon feature list rendered as accordion-free panels. */
function featureList(items) {
  return `<ol class="features">
    ${items
      .map(
        (f, i) => `<li class="feature">
      <span class="feature__num">${String(i + 1).padStart(2, '0')}</span>
      <div class="feature__body">
        <h3 class="feature__title">${f.title}</h3>
        <p class="feature__text">${f.text}</p>
      </div>
    </li>`
      )
      .join('\n    ')}
  </ol>`;
}

/** Collapsible panels. First item open by default. */
function accordion(items) {
  return `<div class="accordion">
    ${items
      .map(
        (it, i) => `<details class="accordion__item"${i === 0 ? ' open' : ''}>
      <summary class="accordion__summary">${it.title}${icons.chevron({ size: 18, cls: 'accordion__caret' })}</summary>
      <div class="accordion__panel">${it.body}</div>
    </details>`
      )
      .join('\n    ')}
  </div>`;
}

/** Subject / topic groups rendered as tagged lists. */
function topicGroups(groups) {
  return `<div class="grid grid--3 topics">
    ${groups
      .map(
        (g) => `<article class="topic">
      <h3 class="topic__title">${g.title}</h3>
      <ul class="topic__list">${g.items.map((i) => `<li>${icons.check({ size: 15 })}<span>${i}</span></li>`).join('')}</ul>
    </article>`
      )
      .join('\n    ')}
  </div>`;
}

function dataTable(headers, rows, { caption = '', cls = '' } = {}) {
  return `<div class="table-wrap">
    <table class="table ${cls}">
      ${caption ? `<caption>${caption}</caption>` : ''}
      <thead><tr>${headers.map((h) => `<th scope="col">${h}</th>`).join('')}</tr></thead>
      <tbody>
        ${rows
          .map((r) => `<tr>${r.map((cell, i) => (i === 0 ? `<th scope="row">${cell}</th>` : `<td>${cell}</td>`)).join('')}</tr>`)
          .join('\n        ')}
      </tbody>
    </table>
  </div>`;
}

function quoteGrid(quotes, { cols = 3 } = {}) {
  return `<div class="grid grid--${cols}">
    ${quotes
      .map(
        (q) => `<figure class="quote">
      ${q.logo ? `<img class="quote__logo" src="${q.logo}" alt="${esc(q.meta || '')}" loading="lazy">` : icons.quote({ size: 26, cls: 'quote__mark' })}
      <blockquote><p>${q.text}</p></blockquote>
      <figcaption>
        <span class="quote__name">${q.name}</span>
        ${q.meta ? `<span class="quote__meta">${q.meta}</span>` : ''}
      </figcaption>
    </figure>`
      )
      .join('\n    ')}
  </div>`;
}

/** Newsletter signup band — appears on the homepage, gallery and several inner pages. */
function newsletter({
  title = 'Subscribe for our latest news and special discounts',
  text = 'Program announcements, test-date reminders and seasonal discounts — a few times a year, never spam.',
} = {}) {
  return `<section class="section section--navy newsletter">
  <div class="container newsletter__inner">
    <div class="newsletter__copy">
      <h2 class="section__title">${title}</h2>
      <p class="section__lead">${text}</p>
    </div>
    <form class="newsletter__form" action="${site.newsletterEndpoint}" method="POST" data-form="newsletter" novalidate>
      <label class="sr-only" for="newsletter-email">Email address</label>
      <input class="input" id="newsletter-email" name="email" type="email" placeholder="you@example.com" autocomplete="email" required>
      <input class="hp" type="text" name="_gotcha" tabindex="-1" autocomplete="off" aria-hidden="true">
      <button class="btn btn--accent" type="submit">Subscribe</button>
      <p class="form__status" role="status" aria-live="polite"></p>
    </form>
  </div>
</section>`;
}

/** Full-width call-to-action band with phone + contact button. */
function ctaBand({
  title = 'Free one-hour college counseling session',
  text = `Available in person or online, in English or Chinese. Call ${site.phone} to reserve a time.`,
  depth = 0,
  buttonLabel = 'Book Your Session',
} = {}) {
  return `<section class="cta">
  <div class="container cta__inner">
    <div>
      <h2 class="cta__title">${title}</h2>
      <p class="cta__text">${text}</p>
    </div>
    <div class="cta__actions">
      <a class="btn btn--accent" href="${rel('/contact/', depth)}">${buttonLabel}</a>
      <a class="btn btn--ghost" href="${site.phoneHref}">${icons.phone({ size: 16 })} ${site.phone}</a>
    </div>
  </div>
</section>`;
}

/** Two-column prose + aside layout. */
function split({ media, body, reverse = false }) {
  return `<div class="split${reverse ? ' split--reverse' : ''}">
    <div class="split__media">${media}</div>
    <div class="split__body">${body}</div>
  </div>`;
}

const prose = (html) => `<div class="prose">${html}</div>`;

module.exports = {
  esc,
  pageHero,
  section,
  cardGrid,
  featureList,
  accordion,
  topicGroups,
  dataTable,
  quoteGrid,
  newsletter,
  ctaBand,
  split,
  prose,
};
