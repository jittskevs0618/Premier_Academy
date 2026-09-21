const { site } = require('../site');
const { icons } = require('../icons');
const { rel } = require('../layout');
const {
  pageHero, section, featureList, ctaBand, prose, newsletter, accordion,
} = require('../components');
const { apSubjects } = require('../data');

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
  title: 'SAT / ACT',
  lead: 'Private, personalized preparation for the SAT, SAT II subject tests and the ACT.',
  crumbs: [crumbServices, { label: 'SAT/ACT' }],
  depth,
})}

${section({
  tone: 'white',
  narrow: true,
  body: prose(`
    <p class="lead">Private and personalized one-on-one tutoring for SAT English and Math, SAT II subject tests, and ACT exam preparation.</p>
    <p>Online sessions are prioritized so students can work from home on a schedule that fits around school; small group options are available for students who prefer to prepare alongside classmates.</p>
  `),
})}

${section({
  tone: 'alt',
  eyebrow: 'Weekend Courses',
  title: 'Weekend SAT prep',
  narrow: true,
  body: `<div class="grid grid--2">
    <article class="card"><div class="card__body">
      <h3 class="card__title">4.5-hour Saturday sessions</h3>
      <p class="card__text">Three 90-minute instructional blocks covering Critical Reading, Writing and Math — the full test in one sitting each week.</p>
    </div></article>
    <article class="card"><div class="card__body">
      <h3 class="card__title">Weekly practice exams</h3>
      <p class="card__text">Full-length practice exams on Tuesdays or Fridays, 4:00&ndash;7:30 PM, with graded assessments so progress is measured, not guessed at.</p>
    </div></article>
  </div>
  <ul class="ticks mt-lg">
    <li>${icons.check({ size: 16 })}<span>Critical Reading, Writing and Math in every session</span></li>
    <li>${icons.check({ size: 16 })}<span>Graded assessments for week-over-week progress tracking</span></li>
    <li>${icons.check({ size: 16 })}<span>Available online and in person</span></li>
  </ul>`,
})}

${section({
  tone: 'white',
  eyebrow: 'Summer',
  title: 'Summer intensive SAT/ACT online bootcamp',
  lead: 'A concentrated summer program for students testing in the fall — the full curriculum, compressed and taught online.',
  narrow: true,
  body: `<p class="center"><a class="btn btn--primary" href="${rel('/contact/', depth)}">Ask about bootcamp dates ${icons.arrow({ size: 16 })}</a></p>`,
})}

${section({
  tone: 'alt',
  eyebrow: 'Registration',
  title: 'Official test dates',
  lead: 'Register directly with the testing organizations — we will help you choose which date to sit for.',
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
  title: 'Start test prep',
  text: `Call ${site.phone} for a diagnostic and a realistic score target.`,
  buttonLabel: 'Book a Diagnostic',
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
  title: 'Advance Placement (AP)',
  lead: 'An official College Board testing center — the majority of our students score 5s and 4s on their AP exams.',
  crumbs: [crumbServices, { label: 'Advance Placement (AP)' }],
  depth,
})}

${section({
  tone: 'white',
  narrow: true,
  body: `<div class="grid grid--3">
    <article class="card"><div class="card__body">
      <h3 class="card__title">Official testing center</h3>
      <p class="card__text">Premier Academy is an official College Board testing center, so students prepare and test in a familiar place.</p>
    </div></article>
    <article class="card"><div class="card__body">
      <h3 class="card__title">Flexible format</h3>
      <p class="card__text">Online and in person, one-on-one or in small classes — whichever suits the subject and the student.</p>
    </div></article>
    <article class="card"><div class="card__body">
      <h3 class="card__title">Proven results</h3>
      <p class="card__text">The majority of our students score 5s and 4s on their AP exams.</p>
    </div></article>
  </div>`,
})}

${section({
  tone: 'alt',
  eyebrow: 'Curriculum',
  title: `${apSubjects.length} AP subjects`,
  lead: 'Preparation across the sciences, mathematics, humanities, economics and the arts.',
  narrow: true,
  body: `<ul class="taglist">
    ${apSubjects.map((s) => `<li>${icons.check({ size: 14 })}<span>${s}</span></li>`).join('\n    ')}
  </ul>`,
})}

${ctaBand({
  title: 'Plan your AP year',
  text: 'We will map which exams to take, and when, against your college list.',
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
  title: 'Study Abroad (LIUXUE)',
  lead: 'Middle school and high school boarding school applications in the United States.',
  crumbs: [crumbServices, { label: 'Study Abroad (LIUXUE)' }],
  depth,
})}

<section class="section section--white">
  <div class="container">
    <div class="split">
      <div class="split__media">
        <img class="rounded" src="${rel('/assets/images/services/study-abroad.jpg', depth)}" alt="International students studying in the United States" width="800" height="500" loading="lazy">
      </div>
      <div class="split__body">
        ${prose(`
        <p class="lead">Premier Academy can help you apply to a school in the USA early, before college starts.</p>
        <p>We have connections with, and knowledge of, the best private and boarding schools in America. The earlier your child enters school in the United States, the stronger their position when college applications come around.</p>
        `)}
        <ul class="ticks">
          <li>${icons.check({ size: 16 })}<span>Online application guidance</span></li>
          <li>${icons.check({ size: 16 })}<span>Extracurricular guidance</span></li>
          <li>${icons.check({ size: 16 })}<span>School tour coordination</span></li>
        </ul>
        <a class="btn btn--accent" href="${rel('/contact/', depth)}">Talk to us about placement ${icons.arrow({ size: 16 })}</a>
      </div>
    </div>
  </div>
</section>

${section({
  tone: 'alt',
  eyebrow: 'Frequently Asked Questions',
  title: 'What families ask us most',
  narrow: true,
  body: accordion([
    {
      title: 'Are students guaranteed to get successfully placed?',
      body: '<p>Yes. We guarantee at least one successful placement minimum or your money back. Our company will only accept students we feel have a high probability of successful placement.</p>',
    },
    {
      title: 'My student&rsquo;s English level is very low. Can they come to America for study?',
      body: '<p>Yes. Premier Academy has relationships with many schools across the country which take students at a very beginning English level. We would most likely place your student into a school with a special ELD/ESL curriculum.</p>',
    },
    {
      title: 'Will you consult for the US visa application, including the I-20 invitation letter and F-1 Student Visa?',
      body: '<p>Yes. Part of our service is ensuring that both the I-20 invitation letter and F-1 Student Visa are correctly issued. We also help prepare you for the US Embassy interview.</p>',
    },
    {
      title: 'What cities in the United States do you place students to?',
      body: '<p>We cover Los Angeles, San Francisco and New York as the main three cities. Secondary cities include Chicago, Houston, Seattle and Atlanta.</p>',
    },
    {
      title: 'How do you select the home stay sponsor families?',
      body: '<p>Premier Academy interviews many prospective families who want to be a sponsor family. Full background checks are performed and preference is given to those families with experience and a proven track record. Premier Academy also works directly with each school, many of which already perform their own pre-screening of families.</p>',
    },
    {
      title: 'What is the cost of schooling vs. boarding?',
      body: '<p>School tuition ranges from as little as $15,000 USD per year to as high as $75,000 per year for boarding schools that include housing and meals where students live on campus. Home stay students can expect to pay anywhere from $1,800 to $2,500 each month for housing and meals. All prices vary depending on the school, family and location in the United States.</p>',
    },
  ]),
})}

${ctaBand({
  title: 'Planning a move to the US?',
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
  title: 'Summer and Winter Programs',
  lead: 'English instruction in the morning, Southern California in the afternoon.',
  crumbs: [crumbServices, { label: 'Summer/Winter Programs' }],
  depth,
})}

${section({
  tone: 'white',
  narrow: true,
  body: prose(`
    <p class="lead">Our summer and winter programs are built for international students from China visiting the United States, often through partnerships with Chinese schools that let us tailor the experience to a specific group.</p>
    <p>Mornings are spent on English instruction and American culture. Afternoons are spent seeing Greater Los Angeles — Disneyland, Universal Studios, Magic Mountain, Hollywood, Santa Monica Beach, and the campuses of UCLA, USC and UC Irvine.</p>
  `),
})}

${section({
  tone: 'alt',
  eyebrow: 'Schedule',
  title: 'Program lengths',
  narrow: true,
  body: `<div class="grid grid--2">
    <article class="card"><div class="card__body">
      <h3 class="card__title">Summer &mdash; 2 to 8 weeks</h3>
      <p class="card__text">Running through June, July and August, sized to the visiting group's schedule.</p>
    </div></article>
    <article class="card"><div class="card__body">
      <h3 class="card__title">Winter &mdash; 2 to 3 weeks</h3>
      <p class="card__text">Running through December, January and February around the Chinese school calendar.</p>
    </div></article>
  </div>`,
})}

${section({
  tone: 'white',
  eyebrow: 'Included',
  title: 'What the program covers',
  narrow: true,
  body: `<ul class="ticks ticks--grid">
    <li>${icons.check({ size: 16 })}<span>Transportation throughout the program</span></li>
    <li>${icons.check({ size: 16 })}<span>Classroom instruction</span></li>
    <li>${icons.check({ size: 16 })}<span>Instructor services</span></li>
    <li>${icons.check({ size: 16 })}<span>Attraction tickets</span></li>
    <li>${icons.check({ size: 16 })}<span>Meals</span></li>
    <li>${icons.check({ size: 16 })}<span>Additional locations: San Francisco and New York City</span></li>
  </ul>`,
})}

${ctaBand({
  title: 'Bringing a group?',
  text: 'We build tailored itineraries with partner schools. Tell us your dates and group size.',
  buttonLabel: 'Request a Proposal',
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
  title: 'Homework Assistance',
  lead: 'After school support that runs in parallel with the school year.',
  crumbs: [crumbServices, { label: 'Homework Assistance' }],
  depth,
})}

<section class="section section--white">
  <div class="container">
    <div class="split">
      <div class="split__media">
        <img class="rounded" src="${rel('/assets/images/services/homework.jpg', depth)}" alt="Students completing homework with instructor support" width="640" height="480" loading="lazy">
      </div>
      <div class="split__body">
        ${prose(`
        <p class="lead">Our after school homework assistance program runs from August through mid-June, following the school calendar so students have support on every day they have work due.</p>
        <p>Sessions are one-on-one and can be taken in person at our San Gabriel campus or online from home.</p>
        `)}
        <ul class="ticks">
          <li>${icons.check({ size: 16 })}<span>August through mid-June, parallel to the school year</span></li>
          <li>${icons.check({ size: 16 })}<span>One-on-one, in person or online</span></li>
          <li>${icons.check({ size: 16 })}<span>Monday through Friday availability</span></li>
        </ul>
        <a class="btn btn--primary" href="${rel('/contact/', depth)}">Enroll your student ${icons.arrow({ size: 16 })}</a>
      </div>
    </div>
  </div>
</section>

${ctaBand({
  title: 'Questions about scheduling?',
  text: `We are open Monday to Friday 10 AM to 7 PM and Saturday 10 AM to 5 PM. Call ${site.phone}.`,
  buttonLabel: 'Contact Us',
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
  title: 'Payment Options',
  lead: 'Our customers’ convenience is always our top priority.',
  crumbs: [crumbServices, { label: 'Payment Options' }],
  depth,
})}

${section({
  tone: 'white',
  narrow: true,
  body: `<div class="grid grid--3 payments">
    ${[
      ['Credit cards', 'All major credit cards accepted in person and over the phone.'],
      ['Debit cards', 'Debit payments accepted at the front desk.'],
      ['PayPal', 'Send payment to our PayPal account for online convenience.'],
      ['Venmo', 'Quick mobile payment for recurring session fees.'],
      ['Wire transfer', 'Available for international families and program groups.'],
    ]
      .map(
        ([t, d]) => `<article class="card"><div class="card__body">
      <h3 class="card__title">${t}</h3>
      <p class="card__text">${d}</p>
    </div></article>`
      )
      .join('\n    ')}
  </div>
  <p class="note center">For invoicing details, PayPal and Venmo handles, or wire instructions, contact the front desk at <a href="${site.phoneHref}">${site.phone}</a> or <a href="mailto:${site.email}">${site.email}</a>.</p>`,
})}

${ctaBand({
  title: 'Need an invoice or a payment plan?',
  text: 'The front desk can set up billing that works for your family.',
  buttonLabel: 'Contact the Front Desk',
  depth,
})}
`,
  },
];
