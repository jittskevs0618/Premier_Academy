const { site } = require('../site');
const { icons } = require('../icons');
const { wave, rel } = require('../layout');
const { section, cardGrid, quoteGrid, newsletter, ctaBand } = require('../components');
const { services, testimonials } = require('../data');

// content/hero-slides.json and content/pages/home.json — both edited via the
// CMS at /admin/.
const slides = require('../../content/hero-slides.json').items.map((s) => ({
  image: s.image,
  eyebrow: s.eyebrow.replace('{founded}', site.founded),
  title: s.title,
  text: s.text,
  cta: { label: s.ctaLabel, url: s.ctaUrl },
}));
const content = require('../../content/pages/home.json');

function hero(depth) {
  // Only the first slide carries the page's <h1>; the rest are <h2> so the
  // document has a single top-level heading. Both share .slide__title styling.
  const slideHtml = slides
    .map(
      (s, i) => `<article class="slide${i === 0 ? ' is-active' : ''}" role="group" aria-roledescription="slide" aria-label="Slide ${i + 1} of ${slides.length}"${i === 0 ? '' : ' aria-hidden="true"'}>
      <img class="slide__bg" src="${rel(s.image, depth)}" alt="" ${i === 0 ? '' : 'loading="lazy" '}width="1600" height="900">
      <div class="slide__overlay"></div>
      <div class="container slide__content">
        <p class="slide__eyebrow">${s.eyebrow}</p>
        ${i === 0 ? `<h1 class="slide__title">${s.title}</h1>` : `<h2 class="slide__title">${s.title}</h2>`}
        <p class="slide__text">${s.text}</p>
        <div class="slide__actions">
          <a class="btn btn--accent btn--lg" href="${rel(s.cta.url, depth)}">${s.cta.label}</a>
          <a class="btn btn--outline btn--lg" href="${site.phoneHref}">${icons.phone({ size: 18 })} ${site.phone}</a>
        </div>
      </div>
    </article>`
    )
    .join('\n    ');

  const dots = slides
    .map(
      (_, i) =>
        `<button class="slider__dot${i === 0 ? ' is-active' : ''}" type="button" data-slide="${i}" aria-label="Go to slide ${i + 1}"></button>`
    )
    .join('');

  return `<section class="slider" id="hero" aria-roledescription="carousel" aria-label="Premier Academy highlights">
  <div class="slider__track">
    ${slideHtml}
  </div>
  <button class="slider__arrow slider__arrow--prev" type="button" aria-label="Previous slide">${icons.prev({ size: 24 })}</button>
  <button class="slider__arrow slider__arrow--next" type="button" aria-label="Next slide">${icons.next({ size: 24 })}</button>
  <div class="slider__dots" role="tablist" aria-label="Choose slide">${dots}</div>
  ${wave('white')}
</section>`;
}

function stats() {
  return `<div class="stats">
    ${content.stats
      .map(
        (s) => `<div class="stat"><span class="stat__num">${s.number}</span><span class="stat__label">${s.label}</span></div>`
      )
      .join('\n    ')}
  </div>`;
}

module.exports = [
  {
    url: '/',
    out: 'index.html',
    title: 'Test Prep, College Counseling & Private Tutoring in San Gabriel',
    description:
      'Premier Academy offers special academic support with test prep, college counseling and private tutoring programs in San Gabriel, CA. Serving families since 1991.',
    body: (depth) => `
${hero(depth)}

${section({
  tone: 'white',
  eyebrow: content.whatWeDo.eyebrow,
  title: content.whatWeDo.title,
  lead: content.whatWeDo.lead,
  narrow: true,
  body: cardGrid(services, depth) + stats(),
})}

<section class="section section--alt">
  <div class="container">
    <div class="split">
      <div class="split__media">
        <img class="rounded" src="${rel(content.homework.image, depth)}" alt="${content.homework.imageAlt}" width="640" height="460" loading="lazy">
      </div>
      <div class="split__body">
        <p class="eyebrow">${content.homework.eyebrow}</p>
        <h2 class="section__title">${content.homework.title}</h2>
        <p>${content.homework.body}</p>
        <ul class="ticks">
          ${content.homework.ticks.map((t) => `<li>${icons.check({ size: 16 })}<span>${t}</span></li>`).join('\n          ')}
        </ul>
        <a class="btn btn--primary" href="${rel('/services/homework-assistance.html', depth)}">Learn More ${icons.arrow({ size: 16 })}</a>
      </div>
    </div>
  </div>
</section>

${ctaBand({ depth })}

${section({
  tone: 'white',
  eyebrow: content.testimonials.eyebrow,
  title: content.testimonials.title,
  lead: content.testimonials.lead,
  narrow: true,
  body:
    // The live homepage features these two specifically.
    quoteGrid(
      testimonials
        .filter((t) => ['Mary Ann Huang', 'Anthony Tsang'].includes(t.name))
        .map((t) => ({ ...t, meta: 'Premier Academy parent' })),
      { cols: 2 }
    ) +
    `<p class="center mt-lg"><a class="btn btn--outline-primary" href="${rel('/about/testimonials.html', depth)}">Read all testimonials ${icons.arrow({ size: 16 })}</a></p>`,
})}

${newsletter()}
`,
  },
];
