const { site } = require('../site');
const { icons } = require('../icons');
const { rel } = require('../layout');
const {
  pageHero, section, featureList, quoteGrid, ctaBand, prose, topicGroups, newsletter,
} = require('../components');
const { counselingPrograms, successStories, topColleges, liberalArts, tutoringSubjects } = require('../data');

// content/pages/*.json — all edited via the CMS at /admin/.
const cTutoring = require('../../content/pages/private-tutoring.json');
const cCounseling = require('../../content/pages/college-counseling.json');
const cSuccess = require('../../content/pages/college-success-stories.json');
const cTopColleges = require('../../content/pages/college-top-colleges.json');
const cTransfer = require('../../content/pages/college-transfer.json');

const crumbCC = { label: 'College Counseling', url: '/college-counseling/' };

module.exports = [
  {
    url: '/private-tutoring/',
    out: 'private-tutoring/index.html',
    title: 'Private Tutoring',
    description:
      'Highly personalized one-on-one tutoring in math, English, science, history, AP subjects, SAT and ISEE — online or in person in San Gabriel, CA.',
    body: (depth) => `
${pageHero({
  title: cTutoring.hero.title,
  lead: cTutoring.hero.lead,
  crumbs: [{ label: 'Private Tutoring' }],
  depth,
})}

<section class="section section--white">
  <div class="container">
    <div class="split">
      <div class="split__media">
        <img class="rounded" src="${rel('/assets/images/services/private-tutoring.jpg', depth)}" alt="A Premier Academy tutor working one-on-one with a student" width="640" height="480" loading="lazy">
      </div>
      <div class="split__body">
        ${prose(`
        <p class="lead">${cTutoring.intro.lead}</p>
        <p>${cTutoring.intro.body}</p>
        <p>${cTutoring.intro.groups}</p>
        `)}
        <ul class="ticks">
          ${cTutoring.intro.ticks.map((t) => `<li>${icons.check({ size: 16 })}<span>${t}</span></li>`).join('\n          ')}
        </ul>
        <a class="btn btn--primary" href="${rel('/contact/', depth)}">${cTutoring.intro.ctaLabel} ${icons.arrow({ size: 16 })}</a>
      </div>
    </div>
  </div>
</section>

${section({
  tone: 'alt',
  eyebrow: cTutoring.subjects.eyebrow,
  title: cTutoring.subjects.title,
  lead: cTutoring.subjects.lead,
  narrow: true,
  body: topicGroups(tutoringSubjects),
})}

${ctaBand({
  title: cTutoring.cta.title,
  text: `Call ${site.phone} and we will match your student to the right tutor.`,
  buttonLabel: cTutoring.cta.buttonLabel,
  depth,
})}
`,
  },

  {
    url: '/college-counseling/',
    out: 'college-counseling/index.html',
    title: 'College Counseling — Our Programs',
    description:
      'Over 20 years preparing students for admission to the nation’s top universities: curriculum planning, essays, interviews, financial aid and scholarships.',
    body: (depth) => `
${pageHero({
  title: cCounseling.hero.title,
  lead: cCounseling.hero.lead,
  crumbs: [{ label: 'College Counseling' }],
  depth,
})}

${section({
  tone: 'white',
  narrow: true,
  body: prose(`
    <p class="lead">${cCounseling.intro.lead}</p>
    <p>${cCounseling.intro.body}</p>
  `),
})}

${section({
  tone: 'alt',
  eyebrow: cCounseling.program.eyebrow,
  title: cCounseling.program.title,
  narrow: true,
  body: featureList(counselingPrograms),
})}

${section({
  tone: 'white',
  eyebrow: cCounseling.results.eyebrow,
  title: cCounseling.results.title,
  lead: cCounseling.results.lead,
  narrow: true,
  body: `<p class="center">
    <a class="btn btn--primary" href="${rel('/college-counseling/success-stories.html', depth)}">${cCounseling.results.successStoriesLabel} ${icons.arrow({ size: 16 })}</a>
    <a class="btn btn--outline-primary" href="${rel('/college-counseling/top-colleges.html', depth)}">${cCounseling.results.topCollegesLabel}</a>
  </p>`,
})}

${ctaBand({ depth })}
`,
  },

  {
    url: '/college-counseling/success-stories.html',
    out: 'college-counseling/success-stories.html',
    title: 'Success Stories',
    description:
      'Premier Academy students accepted to UC Berkeley, USC, Georgetown, NYU, Carnegie Mellon, Indiana University and more — in their own words.',
    body: (depth) => `
${pageHero({
  title: cSuccess.hero.title,
  lead: cSuccess.hero.lead,
  crumbs: [crumbCC, { label: 'Success Stories' }],
  depth,
})}

${section({
  tone: 'white',
  body: quoteGrid(
    successStories.map((s) => ({
      text: s.text,
      name: s.name,
      meta: s.school,
      logo: s.logo ? rel(s.logo, depth) : null,
    }))
  ),
})}

${ctaBand({ depth })}
${newsletter()}
`,
  },

  {
    url: '/college-counseling/top-colleges.html',
    out: 'college-counseling/top-colleges.html',
    title: 'Top Colleges',
    description:
      'The top 26 national universities and top 10 liberal arts colleges Premier Academy students target and attend.',
    body: (depth) => `
${pageHero({
  title: cTopColleges.hero.title,
  lead: cTopColleges.hero.lead,
  crumbs: [crumbCC, { label: 'Top Colleges' }],
  depth,
})}

${section({
  tone: 'white',
  eyebrow: cTopColleges.national.eyebrow,
  title: cTopColleges.national.title,
  narrow: true,
  body: `<ol class="ranklist">
    ${topColleges.map((c) => `<li><span class="ranklist__num"></span><span class="ranklist__name">${c}</span></li>`).join('\n    ')}
  </ol>`,
})}

${section({
  tone: 'alt',
  eyebrow: cTopColleges.liberalArts.eyebrow,
  title: cTopColleges.liberalArts.title,
  narrow: true,
  body: `<ol class="ranklist ranklist--alt">
    ${liberalArts.map((c) => `<li><span class="ranklist__num"></span><span class="ranklist__name">${c}</span></li>`).join('\n    ')}
  </ol>`,
})}

${ctaBand({
  title: cTopColleges.cta.title,
  text: cTopColleges.cta.text,
  depth,
})}
`,
  },

  {
    url: '/college-counseling/transfer.html',
    out: 'college-counseling/transfer.html',
    title: 'Transfer Admissions',
    description:
      'Transfer counseling for community college and university students: positioning, personal statements, major selection and strategic planning.',
    body: (depth) => `
${pageHero({
  title: cTransfer.hero.title,
  lead: cTransfer.hero.lead,
  crumbs: [crumbCC, { label: 'Transfer' }],
  depth,
})}

${section({
  tone: 'white',
  narrow: true,
  body: prose(`
    <p class="lead">${cTransfer.intro.lead}</p>
    <p>${cTransfer.intro.body}</p>
  `),
})}

${section({
  tone: 'alt',
  eyebrow: cTransfer.strategy.eyebrow,
  title: cTransfer.strategy.title,
  narrow: true,
  body: featureList(cTransfer.strategy.items),
})}

${section({
  tone: 'white',
  eyebrow: cTransfer.services.eyebrow,
  title: cTransfer.services.title,
  narrow: true,
  body: `<div class="grid grid--2">
    ${cTransfer.services.cards.map((c) => `<article class="card"><div class="card__body">
      <h3 class="card__title">${c.title}</h3>
      <p class="card__text">${c.text}</p>
    </div></article>`).join('\n    ')}
  </div>`,
})}

${ctaBand({ depth })}
`,
  },
];
