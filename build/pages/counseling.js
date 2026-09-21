const { site } = require('../site');
const { icons } = require('../icons');
const { rel } = require('../layout');
const {
  pageHero, section, featureList, quoteGrid, ctaBand, prose, topicGroups, newsletter,
} = require('../components');
const { counselingPrograms, successStories, topColleges, liberalArts, tutoringSubjects } = require('../data');

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
  title: 'Private Tutoring at Premier Academy',
  lead: 'A highly personalized learning experience, tailored to each student’s individual academic needs.',
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
        <p class="lead">Every tutoring plan starts with the student, not the syllabus.</p>
        <p>Our tutors undergo rigorous screening before they ever meet a student, and sessions can be held online from home using modern conferencing technology or in person at our San Gabriel campus.</p>
        <p>Students who prefer to work alongside friends may form <strong>small groups of two or three</strong> for a more cost-efficient arrangement, without losing the individual attention that makes tutoring work.</p>
        `)}
        <ul class="ticks">
          <li>${icons.check({ size: 16 })}<span>Rigorously screened, subject-specialist tutors</span></li>
          <li>${icons.check({ size: 16 })}<span>Online or in person, whichever suits the family</span></li>
          <li>${icons.check({ size: 16 })}<span>Small groups of 2&ndash;3 available for cost efficiency</span></li>
        </ul>
        <a class="btn btn--primary" href="${rel('/contact/', depth)}">Request a tutor ${icons.arrow({ size: 16 })}</a>
      </div>
    </div>
  </div>
</section>

${section({
  tone: 'alt',
  eyebrow: 'Subjects',
  title: 'What we tutor',
  lead: 'From basic math through AP coursework and standardized test preparation.',
  narrow: true,
  body: topicGroups(tutoringSubjects),
})}

${ctaBand({
  title: 'Not sure which subject to start with?',
  text: `Call ${site.phone} and we will match your student to the right tutor.`,
  buttonLabel: 'Get Matched',
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
  title: 'College Counseling',
  lead: 'Over 20 years successfully preparing and sending students to the best universities in the United States.',
  crumbs: [{ label: 'College Counseling' }],
  depth,
})}

${section({
  tone: 'white',
  narrow: true,
  body: prose(`
    <p class="lead">We specialize in assisting students prepare for the college application process and are committed to help students gain admission to the nation's top universities.</p>
    <p>Counseling is a multi-year relationship, not a senior-year scramble. We work with families from course selection in the early high school years all the way through financial aid awards.</p>
  `),
})}

${section({
  tone: 'alt',
  eyebrow: 'The Program',
  title: 'Seven components, start to finish',
  narrow: true,
  body: featureList(counselingPrograms),
})}

${section({
  tone: 'white',
  eyebrow: 'Where Our Students Go',
  title: 'Admissions results',
  lead: 'Berkeley, USC, Georgetown, NYU, Carnegie Mellon, the University of Chicago and more — many with substantial scholarships.',
  narrow: true,
  body: `<p class="center">
    <a class="btn btn--primary" href="${rel('/college-counseling/success-stories.html', depth)}">Read success stories ${icons.arrow({ size: 16 })}</a>
    <a class="btn btn--outline-primary" href="${rel('/college-counseling/top-colleges.html', depth)}">See top colleges</a>
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
  title: 'Success Stories',
  lead: 'Students, the universities that accepted them, and what made the difference.',
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
  title: 'Top Colleges',
  lead: 'The universities we help students prepare for, and the ones they go on to attend.',
  crumbs: [crumbCC, { label: 'Top Colleges' }],
  depth,
})}

${section({
  tone: 'white',
  eyebrow: 'National Universities',
  title: 'Top 26 colleges',
  narrow: true,
  body: `<ol class="ranklist">
    ${topColleges.map((c) => `<li><span class="ranklist__num"></span><span class="ranklist__name">${c}</span></li>`).join('\n    ')}
  </ol>`,
})}

${section({
  tone: 'alt',
  eyebrow: 'Liberal Arts',
  title: 'Top 10 liberal arts colleges',
  narrow: true,
  body: `<ol class="ranklist ranklist--alt">
    ${liberalArts.map((c) => `<li><span class="ranklist__num"></span><span class="ranklist__name">${c}</span></li>`).join('\n    ')}
  </ol>`,
})}

${ctaBand({
  title: 'Build a plan for your list',
  text: 'A free one-hour session covers where your student stands and what the next twelve months should look like.',
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
  title: 'As a transfer student, how can I get into my dream university?',
  lead: 'Transfer admission rewards a clear story. We help students build one.',
  crumbs: [crumbCC, { label: 'Transfer' }],
  depth,
})}

${section({
  tone: 'white',
  narrow: true,
  body: prose(`
    <p class="lead">Transfer applications are judged differently from freshman applications. Committees want to know why you are moving, what you have already accomplished, and why their program is the right destination.</p>
    <p>Premier Academy works with transfer applicants from community colleges and four-year universities alike, on both the written materials and the strategy behind them.</p>
  `),
})}

${section({
  tone: 'alt',
  eyebrow: 'Strategy',
  title: 'What a strong transfer application does',
  narrow: true,
  body: featureList([
    { title: 'Personal positioning', text: 'Identify what distinguishes the applicant academically and personally, and make that the spine of the application.' },
    { title: 'Articulation of purpose', text: 'State clearly why this university and this major, with specifics that could not be copied into another application.' },
    { title: 'Academic transition justification', text: 'Explain the move in a way that reads as progress and intent rather than escape.' },
  ]),
})}

${section({
  tone: 'white',
  eyebrow: 'Services',
  title: 'How we help',
  narrow: true,
  body: `<div class="grid grid--2">
    <article class="card"><div class="card__body">
      <h3 class="card__title">Professional editing</h3>
      <p class="card__text">Personal statements, brainstorming sessions, essay revision, and grammar and structure review.</p>
    </div></article>
    <article class="card"><div class="card__body">
      <h3 class="card__title">University counseling</h3>
      <p class="card__text">Major selection, university analysis, and strategic planning across the full transfer timeline.</p>
    </div></article>
  </div>`,
})}

${ctaBand({ depth })}
`,
  },
];
