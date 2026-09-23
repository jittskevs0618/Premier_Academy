const { site } = require('../site');
const { icons } = require('../icons');
const { rel } = require('../layout');
const {
  pageHero, section, ctaBand, prose, newsletter, accordion,
} = require('../components');
const { apSubjects } = require('../data');

// content/pages/service-*.json and content/*.json — all edited via the CMS
// at /admin/.
const cSatAct = require('../../content/pages/service-sat-act.json');
const cAp = require('../../content/pages/service-ap.json');
const cStudyAbroad = require('../../content/pages/service-study-abroad.json');
const studyAbroadFaq = require('../../content/study-abroad-faq.json').items;
const cSummerWinter = require('../../content/pages/service-summer-winter.json');
const cHomework = require('../../content/pages/service-homework.json');
const cPayment = require('../../content/pages/service-payment.json');
const paymentMethods = require('../../content/payment-methods.json').items;

const crumbServices = { label: 'Other Services' };

module.exports = [
  {
    url: '/services/sat-act.html',
    out: 'services/sat-act.html',
    title: 'SAT / ACT Preparation',
    description:
      'One-on-one SAT English and Math, SAT II subject tests and ACT preparation, plus weekend courses and a summer intensive online bootcamp.',
    body: (depth) => `
${pageHero({
  title: cSatAct.hero.title,
  lead: cSatAct.hero.lead,
  crumbs: [crumbServices, { label: 'SAT/ACT' }],
  depth,
})}

${section({
  tone: 'white',
  narrow: true,
  body: prose(`
    <p class="lead">${cSatAct.intro.lead}</p>
    <p>${cSatAct.intro.body}</p>
  `),
})}

${section({
  tone: 'alt',
  eyebrow: cSatAct.weekend.eyebrow,
  title: cSatAct.weekend.title,
  narrow: true,
  body: `<div class="grid grid--2">
    ${cSatAct.weekend.cards.map((c) => `<article class="card"><div class="card__body">
      <h3 class="card__title">${c.title}</h3>
      <p class="card__text">${c.text}</p>
    </div></article>`).join('\n    ')}
  </div>
  <ul class="ticks mt-lg">
    ${cSatAct.weekend.ticks.map((t) => `<li>${icons.check({ size: 16 })}<span>${t}</span></li>`).join('\n    ')}
  </ul>`,
})}

${section({
  tone: 'white',
  eyebrow: cSatAct.summer.eyebrow,
  title: cSatAct.summer.title,
  lead: cSatAct.summer.lead,
  narrow: true,
  body: `<p class="center"><a class="btn btn--primary" href="${rel('/contact/', depth)}">${cSatAct.summer.linkLabel} ${icons.arrow({ size: 16 })}</a></p>`,
})}

${section({
  tone: 'alt',
  eyebrow: cSatAct.registration.eyebrow,
  title: cSatAct.registration.title,
  lead: cSatAct.registration.lead,
  narrow: true,
  body: `<div class="grid grid--3">
    <a class="card card--link" href="https://satsuite.collegeboard.org/sat/dates-deadlines" target="_blank" rel="noopener noreferrer"><div class="card__body">
      <h3 class="card__title">SAT main test dates</h3>
      <p class="card__text">College Board registration and deadlines.</p>
      <span class="card__link">collegeboard.org ${icons.arrow({ size: 16 })}</span>
    </div></a>
    <a class="card card--link" href="https://satsuite.collegeboard.org/" target="_blank" rel="noopener noreferrer"><div class="card__body">
      <h3 class="card__title">SAT subject test dates</h3>
      <p class="card__text">Subject test schedule and registration information.</p>
      <span class="card__link">collegeboard.org ${icons.arrow({ size: 16 })}</span>
    </div></a>
    <a class="card card--link" href="https://www.act.org/content/act/en/products-and-services/the-act/registration.html" target="_blank" rel="noopener noreferrer"><div class="card__body">
      <h3 class="card__title">ACT test schedule</h3>
      <p class="card__text">ACT national test dates and registration.</p>
      <span class="card__link">act.org ${icons.arrow({ size: 16 })}</span>
    </div></a>
  </div>`,
})}

${ctaBand({
  title: cSatAct.cta.title,
  text: `Call ${site.phone} for a diagnostic and a realistic score target.`,
  buttonLabel: cSatAct.cta.buttonLabel,
  depth,
})}
`,
  },

  {
    url: '/services/advance-placement-ap.html',
    out: 'services/advance-placement-ap.html',
    title: 'Advance Placement (AP)',
    description:
      'An official College Board testing center offering preparation in 18 AP subjects, one-on-one or in small classes, online and in person.',
    body: (depth) => `
${pageHero({
  title: cAp.hero.title,
  lead: cAp.hero.lead,
  crumbs: [crumbServices, { label: 'Advance Placement (AP)' }],
  depth,
})}

${section({
  tone: 'white',
  narrow: true,
  body: `<div class="grid grid--3">
    ${cAp.features.map((f) => `<article class="card"><div class="card__body">
      <h3 class="card__title">${f.title}</h3>
      <p class="card__text">${f.text}</p>
    </div></article>`).join('\n    ')}
  </div>`,
})}

${section({
  tone: 'alt',
  eyebrow: cAp.curriculum.eyebrow,
  title: cAp.curriculum.titleTemplate.replace('{count}', apSubjects.length),
  lead: cAp.curriculum.lead,
  narrow: true,
  body: `<ul class="taglist">
    ${apSubjects.map((s) => `<li>${icons.check({ size: 14 })}<span>${s}</span></li>`).join('\n    ')}
  </ul>`,
})}

${ctaBand({
  title: cAp.cta.title,
  text: cAp.cta.text,
  depth,
})}
`,
  },

  {
    url: '/services/study-abroad.html',
    out: 'services/study-abroad.html',
    title: 'Study Abroad (LIUXUE)',
    description:
      'Middle school and high school boarding school placement in the USA: application guidance, visa support, home stay families and school tours.',
    body: (depth) => `
${pageHero({
  title: cStudyAbroad.hero.title,
  lead: cStudyAbroad.hero.lead,
  crumbs: [crumbServices, { label: 'Study Abroad (LIUXUE)' }],
  depth,
})}

<section class="section section--white">
  <div class="container">
    <div class="split">
      <div class="split__media">
        <img class="rounded" src="${rel(cStudyAbroad.intro.image, depth)}" alt="${cStudyAbroad.intro.imageAlt}" width="800" height="500" loading="lazy">
      </div>
      <div class="split__body">
        ${prose(`
        <p class="lead">${cStudyAbroad.intro.lead}</p>
        <p>${cStudyAbroad.intro.body}</p>
        `)}
        <ul class="ticks">
          ${cStudyAbroad.intro.ticks.map((t) => `<li>${icons.check({ size: 16 })}<span>${t}</span></li>`).join('\n          ')}
        </ul>
        <a class="btn btn--accent" href="${rel('/contact/', depth)}">${cStudyAbroad.intro.ctaLabel} ${icons.arrow({ size: 16 })}</a>
      </div>
    </div>
  </div>
</section>

${section({
  tone: 'alt',
  eyebrow: cStudyAbroad.faq.eyebrow,
  title: cStudyAbroad.faq.title,
  narrow: true,
  body: accordion(studyAbroadFaq.map((f) => ({ title: f.question, body: `<p>${f.answer}</p>` }))),
})}

${ctaBand({
  title: cStudyAbroad.cta.title,
  text: `Consultations are available in English or Chinese. Call ${site.phone}.`,
  depth,
})}
`,
  },

  {
    url: '/services/summer-winter-programs.html',
    out: 'services/summer-winter-programs.html',
    title: 'Summer and Winter Programs',
    description:
      'Summer and winter programs for international students visiting the US: morning English instruction and afternoon sightseeing across Greater Los Angeles.',
    body: (depth) => `
${pageHero({
  title: cSummerWinter.hero.title,
  lead: cSummerWinter.hero.lead,
  crumbs: [crumbServices, { label: 'Summer/Winter Programs' }],
  depth,
})}

${section({
  tone: 'white',
  narrow: true,
  body: prose(`
    <p class="lead">${cSummerWinter.intro.lead}</p>
    <p>${cSummerWinter.intro.body}</p>
  `),
})}

${section({
  tone: 'alt',
  eyebrow: cSummerWinter.schedule.eyebrow,
  title: cSummerWinter.schedule.title,
  narrow: true,
  body: `<div class="grid grid--2">
    ${cSummerWinter.schedule.cards.map((c) => `<article class="card"><div class="card__body">
      <h3 class="card__title">${c.title}</h3>
      <p class="card__text">${c.text}</p>
    </div></article>`).join('\n    ')}
  </div>`,
})}

${section({
  tone: 'white',
  eyebrow: cSummerWinter.included.eyebrow,
  title: cSummerWinter.included.title,
  narrow: true,
  body: `<ul class="ticks ticks--grid">
    ${cSummerWinter.included.items.map((i) => `<li>${icons.check({ size: 16 })}<span>${i}</span></li>`).join('\n    ')}
  </ul>`,
})}

${ctaBand({
  title: cSummerWinter.cta.title,
  text: cSummerWinter.cta.text,
  buttonLabel: cSummerWinter.cta.buttonLabel,
  depth,
})}
${newsletter()}
`,
  },

  {
    url: '/services/homework-assistance.html',
    out: 'services/homework-assistance.html',
    title: 'After School Homework Assistance',
    description:
      'After school homework assistance running August through mid-June, Monday through Friday, one-on-one in person or online.',
    body: (depth) => `
${pageHero({
  title: cHomework.hero.title,
  lead: cHomework.hero.lead,
  crumbs: [crumbServices, { label: 'Homework Assistance' }],
  depth,
})}

<section class="section section--white">
  <div class="container">
    <div class="split">
      <div class="split__media">
        <img class="rounded" src="${rel(cHomework.intro.image, depth)}" alt="${cHomework.intro.imageAlt}" width="640" height="480" loading="lazy">
      </div>
      <div class="split__body">
        ${prose(`
        <p class="lead">${cHomework.intro.lead}</p>
        <p>${cHomework.intro.body}</p>
        `)}
        <ul class="ticks">
          ${cHomework.intro.ticks.map((t) => `<li>${icons.check({ size: 16 })}<span>${t}</span></li>`).join('\n          ')}
        </ul>
        <a class="btn btn--primary" href="${rel('/contact/', depth)}">${cHomework.intro.ctaLabel} ${icons.arrow({ size: 16 })}</a>
      </div>
    </div>
  </div>
</section>

${ctaBand({
  title: cHomework.cta.title,
  text: `We are open Monday to Friday 10 AM to 7 PM and Saturday 10 AM to 5 PM. Call ${site.phone}.`,
  buttonLabel: cHomework.cta.buttonLabel,
  depth,
})}
`,
  },

  {
    url: '/services/payment-options.html',
    out: 'services/payment-options.html',
    title: 'Payment Options',
    description:
      'Premier Academy accepts credit cards, debit cards, PayPal, Venmo and wire transfer.',
    body: (depth) => `
${pageHero({
  title: cPayment.hero.title,
  lead: cPayment.hero.lead,
  crumbs: [crumbServices, { label: 'Payment Options' }],
  depth,
})}

${section({
  tone: 'white',
  narrow: true,
  body: `<div class="grid grid--3 payments">
    ${paymentMethods
      .map(
        (m) => `<article class="card"><div class="card__body">
      <h3 class="card__title">${m.title}</h3>
      <p class="card__text">${m.text}</p>
    </div></article>`
      )
      .join('\n    ')}
  </div>
  <p class="note center">For invoicing details, PayPal and Venmo handles, or wire instructions, contact the front desk at <a href="${site.phoneHref}">${site.phone}</a> or <a href="mailto:${site.email}">${site.email}</a>.</p>`,
})}

${ctaBand({
  title: cPayment.cta.title,
  text: cPayment.cta.text,
  buttonLabel: cPayment.cta.buttonLabel,
  depth,
})}
`,
  },
];
