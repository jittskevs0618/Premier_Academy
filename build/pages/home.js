const { site } = require('../site');
const { icons } = require('../icons');
const { wave, rel } = require('../layout');
const { section, cardGrid, quoteGrid, newsletter, ctaBand } = require('../components');
const { services, testimonials } = require('../data');

const slides = [
  {
    image: '/assets/images/hero/hero-1.jpg',
    eyebrow: `Since ${site.founded} · San Gabriel, CA`,
    title:
      'We at Premier Academy offer special academic support with our test prep, college counseling, and private tutoring programs',
    text: 'A challenging and stimulating learning environment built to develop intellect, self-confidence and discipline.',
    cta: { label: 'Explore Our Programs', url: '/college-counseling/' },
  },
  {
    image: '/assets/images/hero/hero-2.jpg',
    eyebrow: 'College Counseling',
    title: 'Over 20 years sending students to the nation’s top universities',
    text: 'Curriculum planning, essays, interviews, financial aid and scholarship searches — start with a free one-hour session.',
    cta: { label: 'Book a Free Session', url: '/contact/' },
  },
  {
    image: '/assets/images/hero/hero-3.jpg',
    eyebrow: 'After School Homework Assistance',
    title: 'Support every school day, August through mid-June',
    text: 'One-on-one help Monday through Friday, in person at our San Gabriel campus or online from home.',
    cta: { label: 'See the Program', url: '/services/homework-assistance.html' },
  },
];

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
  const items = [
    ['1991', 'Founded in the San Gabriel Valley'],
    ['20+', 'Years of college counseling'],
    ['15', 'Instructors across every core subject'],
    ['26', 'Top universities our students attend'],
  ];
  return `<div class="stats">
    ${items
      .map(
        ([n, l]) => `<div class="stat"><span class="stat__num">${n}</span><span class="stat__label">${l}</span></div>`
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
  eyebrow: 'What We Do',
  title: 'Programs built around each student',
  lead: 'Six core services, delivered one-on-one or in small groups, online and at our San Gabriel campus.',
  narrow: true,
  body: cardGrid(services, depth) + stats(),
})}

<section class="section section--alt">
  <div class="container">
    <div class="split">
      <div class="split__media">
        <img class="rounded" src="${rel('/assets/images/services/homework.jpg', depth)}" alt="Students working through homework with an instructor" width="640" height="460" loading="lazy">
      </div>
      <div class="split__body">
        <p class="eyebrow">After School Homework Assistance</p>
        <h2 class="section__title">Help every school day, August through mid-June</h2>
        <p>Our after school program runs in parallel with the school year so students never fall behind. Sessions are one-on-one, available Monday through Friday, and can be taken in person or online.</p>
        <ul class="ticks">
          <li>${icons.check({ size: 16 })}<span>Runs August through mid-June alongside the school calendar</span></li>
          <li>${icons.check({ size: 16 })}<span>One-on-one attention, in person or online</span></li>
          <li>${icons.check({ size: 16 })}<span>Monday through Friday availability</span></li>
        </ul>
        <a class="btn btn--primary" href="${rel('/services/homework-assistance.html', depth)}">Learn More ${icons.arrow({ size: 16 })}</a>
      </div>
    </div>
  </div>
</section>

${ctaBand({ depth })}

${section({
  tone: 'white',
  eyebrow: 'Testimonials',
  title: 'What parents say',
  lead: 'Families across the San Gabriel Valley have trusted us with their children for three decades.',
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
