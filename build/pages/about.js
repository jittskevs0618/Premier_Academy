const { site } = require('../site');
const { icons } = require('../icons');
const { rel } = require('../layout');
const {
  pageHero, section, quoteGrid, dataTable, newsletter, ctaBand, prose, accordion,
} = require('../components');
const { teachers, honorRoll, testimonials, galleryImages, newsVideos, newsRadio } = require('../data');

const crumbAbout = { label: 'About Us', url: '/about/' };

module.exports = [
  {
    url: '/about/',
    out: 'about/index.html',
    title: 'About Premier Academy',
    description:
      'Founded in 1991, Premier Academy creates a challenging and stimulating learning environment that develops intellect, self-confidence and discipline.',
    body: (depth) => `
${pageHero({
  title: 'About Premier Academy',
  lead: 'A challenging and stimulating learning environment, built one student at a time since 1991.',
  crumbs: [{ label: 'About Us' }],
  depth,
})}

<section class="section section--white">
  <div class="container">
    <div class="split">
      <div class="split__media">
        <img class="rounded" src="${rel('/assets/images/about-campus.jpg', depth)}" alt="Premier Academy students" width="900" height="675" loading="lazy">
      </div>
      <div class="split__body">
        ${prose(`
        <p class="lead">Since it was founded in 1991, Premier Academy has stood by its goal to create a challenging and stimulating learning environment.</p>
        <p>The institution aims to develop student intellect while fostering self-confidence and discipline — the habits that carry a student long after a particular course or exam is behind them.</p>
        <h2>Our mission</h2>
        <p>The Academy emphasizes fundamental preparation in academic skills in order to achieve <strong>elementary excellence</strong>, <strong>middle school mastery</strong>, and <strong>college preparation</strong>.</p>
        <h2>Our faculty</h2>
        <p>Professional instructors provide academic and college counseling shaped to fit each student's needs for them to gain entrance into the most prestigious universities.</p>
        <p><a class="btn btn--primary" href="${rel('/about/faculty/teachers.html', depth)}">Meet our teachers ${icons.arrow({ size: 16 })}</a></p>
        `)}
      </div>
    </div>
  </div>
</section>

${section({
  tone: 'alt',
  eyebrow: 'Our Approach',
  title: 'Three stages, one continuous plan',
  narrow: true,
  body: `<div class="grid grid--3">
    <article class="card"><div class="card__body"><h3 class="card__title">Elementary excellence</h3><p class="card__text">Fundamental skills in reading, writing and mathematics, taught until they are genuinely secure rather than merely covered.</p></div></article>
    <article class="card"><div class="card__body"><h3 class="card__title">Middle school mastery</h3><p class="card__text">Deeper subject work, study habits and the confidence to take on honors and accelerated coursework in high school.</p></div></article>
    <article class="card"><div class="card__body"><h3 class="card__title">College preparation</h3><p class="card__text">Test preparation, AP coursework and counseling that positions each student for the most selective universities.</p></div></article>
  </div>`,
})}

${ctaBand({ depth })}
`,
  },

  {
    url: '/about/message-from-director.html',
    out: 'about/message-from-director.html',
    title: 'Message from the Director',
    description:
      'A message from Allison Huang, Director of Premier Academy, on faculty, philosophy and the whole student.',
    body: (depth) => `
${pageHero({
  title: 'Message from the Director',
  crumbs: [crumbAbout, { label: 'Message from Director' }],
  depth,
})}

<section class="section section--white">
  <div class="container">
    <div class="split split--narrow-media">
      <div class="split__media">
        <figure class="portrait">
          <img src="${rel('/assets/images/director.jpg', depth)}" alt="Allison Huang, Director of Premier Academy" width="225" height="300">
          <figcaption><strong>Allison Huang</strong><span>Director, Premier Academy</span></figcaption>
        </figure>
      </div>
      <div class="split__body">
        ${prose(`
        <p class="lead">Welcome to Premier Academy.</p>
        <p>The key to our success lies in our teachers. We take great care in selecting and retaining the most highly skilled teachers who show a passion for both the learning and the teaching process.</p>
        <p>At Premier we believe it is our responsibility to strive for excellence in all aspects of our students' development. A comprehensive education is not academics alone — it requires a broad range of extracurricular and social activities alongside coursework, so that students grow into capable and well-rounded adults.</p>
        <p>Whether your child joins us for a single subject, for test preparation, or for the full arc of college counseling, you can be certain to receive the best quality service, education, and guidance toward achieving your educational goals.</p>
        <p class="signature">Allison Huang<br><span>Director, Premier Academy</span></p>
        `)}
      </div>
    </div>
  </div>
</section>

${ctaBand({
  title: 'Come see the campus',
  text: `Visit us at ${site.address.full}, or call ${site.phone} to arrange a time.`,
  buttonLabel: 'Contact Us',
  depth,
})}
`,
  },

  {
    url: '/about/testimonials.html',
    out: 'about/testimonials.html',
    title: 'Testimonials',
    description:
      'Parents on tutoring, test preparation and college counseling at Premier Academy in San Gabriel, California.',
    body: (depth) => `
${pageHero({
  title: 'Testimonials',
  lead: 'In the words of the families who have trusted us with their children.',
  crumbs: [crumbAbout, { label: 'Testimonials' }],
  depth,
})}

${section({
  tone: 'white',
  body: quoteGrid(testimonials.map((t) => ({ ...t, meta: 'Premier Academy parent' }))),
})}

${ctaBand({ depth })}
${newsletter()}
`,
  },

  {
    url: '/about/honor-roll.html',
    out: 'about/honor-roll.html',
    title: 'Honor Roll',
    description:
      'Premier Academy students recognized for outstanding academic achievement across San Gabriel Valley schools.',
    body: (depth) => `
${pageHero({
  title: 'Honor Roll',
  lead: 'Students recognized for outstanding academic achievement.',
  crumbs: [crumbAbout, { label: 'Honor Roll' }],
  depth,
})}

${section({
  tone: 'white',
  body: dataTable(['Student', 'Grade', 'School'], honorRoll, {
    caption: 'Premier Academy Honor Roll',
    cls: 'table--honor',
  }),
})}

${ctaBand({
  title: 'Ready to join them?',
  text: `Call ${site.phone} or send us a message to find the right program for your student.`,
  buttonLabel: 'Get Started',
  depth,
})}
`,
  },

  {
    url: '/about/news-press.html',
    out: 'about/news-press.html',
    title: 'News & Press',
    description:
      'Television features, lectures and radio interviews with Premier Academy on college planning, test prep and summer programs.',
    body: (depth) => `
${pageHero({
  title: 'News &amp; Press',
  lead: 'Television features, seminars and radio interviews with the Premier Academy team.',
  crumbs: [crumbAbout, { label: 'News/Press' }],
  depth,
})}

${section({
  tone: 'white',
  eyebrow: 'Video',
  title: 'Features, commercials and lectures',
  narrow: true,
  body: `<div class="grid grid--3">
    ${newsVideos
      .map(
        (v) => `<article class="media-card">
      <div class="media-card__frame">
        <iframe src="https://www.youtube-nocookie.com/embed/${v.youtube}" title="${v.title}"
          loading="lazy" allowfullscreen
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          referrerpolicy="strict-origin-when-cross-origin"></iframe>
      </div>
      <div class="card__body">
        <h3 class="card__title">${v.title}</h3>
        <p class="card__text">${v.desc}</p>
      </div>
    </article>`
      )
      .join('\n    ')}
  </div>`,
})}

`,
  },

  {
    url: '/about/gallery.html',
    out: 'about/gallery.html',
    title: 'Gallery',
    description: 'Photographs of classes, students and campus life at Premier Academy in San Gabriel, California.',
    body: (depth) => `
${pageHero({
  title: 'Gallery',
  lead: 'Inside the classrooms, and the students who fill them.',
  crumbs: [crumbAbout, { label: 'Gallery' }],
  depth,
})}

${section({
  tone: 'white',
  body: `<div class="gallery" id="gallery">
    ${galleryImages
      .map(
        (g, i) => `<a class="gallery__item" href="${rel(g.src, depth)}" data-lightbox data-index="${i}">
      <img src="${rel(g.src, depth)}" alt="${g.alt}" width="1400" height="1050" loading="lazy">
    </a>`
      )
      .join('\n    ')}
  </div>`,
})}

${section({
  tone: 'alt',
  eyebrow: 'Go At Your Own Pace',
  title: 'Every student sets their own timeline',
  lead: 'Some students come for one subject, others for four years of planning. Both are welcome, and both get the same attention.',
  narrow: true,
  body: `<p class="center"><a class="btn btn--primary" href="${rel('/contact/', depth)}">Talk to us about your student ${icons.arrow({ size: 16 })}</a></p>`,
})}

${newsletter()}
`,
  },

  {
    url: '/about/faculty/teachers.html',
    out: 'about/faculty/teachers.html',
    title: 'Our Teachers',
    description:
      'Premier Academy faculty: instructors from Caltech, Harvard, Oxford, UC Berkeley, UCLA and more, teaching math, science, English, AP and test prep.',
    body: (depth) => `
${pageHero({
  title: 'Our Teachers',
  lead: 'The key to our success lies in our teachers — selected and retained for skill and for a genuine passion for teaching.',
  crumbs: [crumbAbout, { label: 'Faculty' }, { label: 'Teachers' }],
  depth,
})}

${section({
  tone: 'white',
  body: `<div class="grid grid--3 teachers">
    ${teachers
      .map(
        (t) => `<article class="teacher">
      <div class="teacher__avatar" aria-hidden="true">${t.name.replace(/^(Mr\.|Ms\.|Mrs\.|Dr\.)\s*/, '').charAt(0)}</div>
      <h3 class="teacher__name">${t.name}</h3>
      <p class="teacher__degrees">${t.degrees}</p>
      <p class="teacher__subjects"><span class="label">Teaches</span>${t.subjects}</p>
    </article>`
      )
      .join('\n    ')}
  </div>`,
})}

${ctaBand({
  title: 'Join our faculty',
  text: 'We hire across English, Math, Science, Chinese, SAT/ACT and every AP category.',
  buttonLabel: 'See Job Opportunities',
  depth,
})}
`,
  },

  {
    url: '/about/faculty/job-opportunities.html',
    out: 'about/faculty/job-opportunities.html',
    title: 'Job Opportunities',
    description:
      'Teaching and leadership openings at Premier Academy in San Gabriel, California, including the Campus Director position.',
    body: (depth) => `
${pageHero({
  title: 'Job Opportunities',
  lead: 'Openings for teachers and academic leadership at our San Gabriel campus.',
  crumbs: [crumbAbout, { label: 'Faculty' }, { label: 'Job Opportunities' }],
  depth,
})}

${section({
  tone: 'white',
  eyebrow: 'Featured Position',
  title: 'Campus Director',
  narrow: true,
  body: `<article class="job">
    <ul class="job__meta">
      <li><span class="label">Location</span>Los Angeles County, California</li>
      <li><span class="label">Organization</span>PLW Education, Inc. dba Premier Academy</li>
    </ul>
    ${accordion([
      {
        title: 'Responsibilities',
        body: `<ul class="ticks">
          <li>${icons.check({ size: 16 })}<span><strong>Education Program Management (75%)</strong> — develop program schedules across all academic offerings.</span></li>
          <li>${icons.check({ size: 16 })}<span><strong>Operations Optimization (25%)</strong> — analyze operational efficiency and recommend improvements.</span></li>
        </ul>`,
      },
      {
        title: 'Qualifications',
        body: `<ul class="ticks">
          <li>${icons.check({ size: 16 })}<span>Master's degree in economics or a related field.</span></li>
          <li>${icons.check({ size: 16 })}<span>One year of relevant experience.</span></li>
          <li>${icons.check({ size: 16 })}<span>Proficiency with the R programming language.</span></li>
        </ul>`,
      },
      {
        title: 'How to apply',
        body: `<p>Send your resume to <strong>Pierre Wuu</strong>, 3355 Yorkshire Rd, Pasadena, California.</p>`,
      },
    ])}
  </article>`,
})}

${section({
  tone: 'alt',
  eyebrow: 'Open Continuously',
  title: 'General faculty positions',
  narrow: true,
  body: `<div class="grid grid--2">
    <article class="card"><div class="card__body">
      <h3 class="card__title">Disciplines we hire</h3>
      <p class="card__text">English, Math, Science, Chinese, SAT/ACT preparation, and all AP categories.</p>
    </div></article>
    <article class="card"><div class="card__body">
      <h3 class="card__title">Requirements</h3>
      <p class="card__text">Bachelor's degree minimum, plus experience teaching students in grades 1&ndash;12.</p>
    </div></article>
  </div>
  <p class="center mt-lg">Email your resume to <a href="mailto:${site.email}?subject=Job%20Application"><strong>${site.email}</strong></a> with the subject line <strong>&ldquo;Job Application&rdquo;</strong>.</p>
  <p class="center"><a class="btn btn--primary" href="mailto:${site.email}?subject=Job%20Application">Apply by email ${icons.arrow({ size: 16 })}</a></p>`,
})}
`,
  },
];
