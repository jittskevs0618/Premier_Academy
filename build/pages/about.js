const { site } = require('../site');
const { icons } = require('../icons');
const { rel } = require('../layout');
const {
  pageHero, section, quoteGrid, dataTable, newsletter, ctaBand, prose, accordion,
} = require('../components');
const { teachers, honorRoll, testimonials, galleryImages, newsVideos, newsRadio } = require('../data');

// content/pages/about*.json — all edited via the CMS at /admin/.
const cAbout = require('../../content/pages/about.json');
const cDirector = require('../../content/pages/about-director.json');
const cTestimonials = require('../../content/pages/about-testimonials.json');
const cHonorRoll = require('../../content/pages/about-honor-roll.json');
const cNews = require('../../content/pages/about-news-press.json');
const cGallery = require('../../content/pages/about-gallery.json');
const cTeachers = require('../../content/pages/about-teachers.json');
const cJobs = require('../../content/pages/about-jobs.json');

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
  title: cAbout.hero.title,
  lead: cAbout.hero.lead,
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
        <p class="lead">${cAbout.intro.lead}</p>
        <p>${cAbout.intro.body}</p>
        <h2>${cAbout.intro.missionTitle}</h2>
        <p>${cAbout.intro.missionBody}</p>
        <h2>${cAbout.intro.facultyTitle}</h2>
        <p>${cAbout.intro.facultyBody}</p>
        <p><a class="btn btn--primary" href="${rel('/about/faculty/teachers.html', depth)}">${cAbout.intro.ctaLabel} ${icons.arrow({ size: 16 })}</a></p>
        `)}
      </div>
    </div>
  </div>
</section>

${section({
  tone: 'alt',
  eyebrow: cAbout.approach.eyebrow,
  title: cAbout.approach.title,
  narrow: true,
  body: `<div class="grid grid--3">
    ${cAbout.approach.cards.map((c) => `<article class="card"><div class="card__body"><h3 class="card__title">${c.title}</h3><p class="card__text">${c.text}</p></div></article>`).join('\n    ')}
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
  title: cDirector.hero.title,
  crumbs: [crumbAbout, { label: 'Message from Director' }],
  depth,
})}

<section class="section section--white">
  <div class="container">
    <div class="split split--narrow-media">
      <div class="split__media">
        <figure class="portrait">
          <img src="${rel('/assets/images/director.jpg', depth)}" alt="Allison Huang, Director of Premier Academy" width="225" height="300">
          <figcaption><strong>${cDirector.name}</strong><span>${cDirector.role}</span></figcaption>
        </figure>
      </div>
      <div class="split__body">
        ${prose(`
        <p class="lead">${cDirector.message.greeting}</p>
        <p>${cDirector.message.teachers}</p>
        <p>${cDirector.message.philosophy}</p>
        <p>${cDirector.message.closing}</p>
        <p class="signature">${cDirector.name}<br><span>${cDirector.role}</span></p>
        `)}
      </div>
    </div>
  </div>
</section>

${ctaBand({
  title: cDirector.cta.title,
  text: `Visit us at ${site.address.full}, or call ${site.phone} to arrange a time.`,
  buttonLabel: cDirector.cta.buttonLabel,
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
  title: cTestimonials.hero.title,
  lead: cTestimonials.hero.lead,
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
  title: cHonorRoll.hero.title,
  lead: cHonorRoll.hero.lead,
  crumbs: [crumbAbout, { label: 'Honor Roll' }],
  depth,
})}

${section({
  tone: 'white',
  body: dataTable(['Student', 'Grade', 'School'], honorRoll, {
    caption: cHonorRoll.tableCaption,
    cls: 'table--honor',
  }),
})}

${ctaBand({
  title: cHonorRoll.cta.title,
  text: `Call ${site.phone} or send us a message to find the right program for your student.`,
  buttonLabel: cHonorRoll.cta.buttonLabel,
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
  title: cNews.hero.title,
  lead: cNews.hero.lead,
  crumbs: [crumbAbout, { label: 'News/Press' }],
  depth,
})}

${section({
  tone: 'white',
  eyebrow: cNews.video.eyebrow,
  title: cNews.video.title,
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
  title: cGallery.hero.title,
  lead: cGallery.hero.lead,
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
  eyebrow: cGallery.cta.eyebrow,
  title: cGallery.cta.title,
  lead: cGallery.cta.lead,
  narrow: true,
  body: `<p class="center"><a class="btn btn--primary" href="${rel('/contact/', depth)}">${cGallery.cta.linkLabel} ${icons.arrow({ size: 16 })}</a></p>`,
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
  title: cTeachers.hero.title,
  lead: cTeachers.hero.lead,
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
  title: cTeachers.cta.title,
  text: cTeachers.cta.text,
  buttonLabel: cTeachers.cta.buttonLabel,
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
  title: cJobs.hero.title,
  lead: cJobs.hero.lead,
  crumbs: [crumbAbout, { label: 'Faculty' }, { label: 'Job Opportunities' }],
  depth,
})}

${section({
  tone: 'white',
  eyebrow: cJobs.featured.eyebrow,
  title: cJobs.featured.title,
  narrow: true,
  body: `<article class="job">
    <ul class="job__meta">
      <li><span class="label">Location</span>${cJobs.featured.location}</li>
      <li><span class="label">Organization</span>${cJobs.featured.organization}</li>
    </ul>
    ${accordion([
      {
        title: 'Responsibilities',
        body: `<ul class="ticks">
          ${cJobs.featured.responsibilities.map((r) => `<li>${icons.check({ size: 16 })}<span>${r}</span></li>`).join('\n          ')}
        </ul>`,
      },
      {
        title: 'Qualifications',
        body: `<ul class="ticks">
          ${cJobs.featured.qualifications.map((q) => `<li>${icons.check({ size: 16 })}<span>${q}</span></li>`).join('\n          ')}
        </ul>`,
      },
      {
        title: 'How to apply',
        body: `<p>${cJobs.featured.howToApply}</p>`,
      },
    ])}
  </article>`,
})}

${section({
  tone: 'alt',
  eyebrow: cJobs.general.eyebrow,
  title: cJobs.general.title,
  narrow: true,
  body: `<div class="grid grid--2">
    <article class="card"><div class="card__body">
      <h3 class="card__title">${cJobs.general.disciplinesTitle}</h3>
      <p class="card__text">${cJobs.general.disciplinesText}</p>
    </div></article>
    <article class="card"><div class="card__body">
      <h3 class="card__title">${cJobs.general.requirementsTitle}</h3>
      <p class="card__text">${cJobs.general.requirementsText}</p>
    </div></article>
  </div>
  <p class="center mt-lg">Email your resume to <a href="mailto:${site.email}?subject=Job%20Application"><strong>${site.email}</strong></a> ${cJobs.general.applyBlurb} <strong>&ldquo;${cJobs.general.subjectLine}&rdquo;</strong>.</p>
  <p class="center"><a class="btn btn--primary" href="mailto:${site.email}?subject=Job%20Application">${cJobs.general.applyButtonLabel} ${icons.arrow({ size: 16 })}</a></p>`,
})}
`,
  },
];
