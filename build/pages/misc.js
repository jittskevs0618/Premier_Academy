const { site } = require('../site');
const { icons } = require('../icons');
const { rel } = require('../layout');
const { pageHero, section, prose, ctaBand, newsletter } = require('../components');
const { partners, notableVisitors } = require('../data');

// content/pages/*.json — all edited via the CMS at /admin/.
const cPartners = require('../../content/pages/partners.json');
const cContact = require('../../content/pages/contact.json');
const cPrivacy = require('../../content/pages/privacy-policy.json');
const cTerms = require('../../content/pages/terms-conditions.json');
const cNotFound = require('../../content/pages/notfound.json');

const legalProse = (updated, blocks) => prose(`
  <p class="legal__updated"><strong>Last updated:</strong> ${updated}</p>
  ${blocks}
`);

// {token} placeholders in the legal bodies resolve against live site data, so
// the address/phone/email never drift out of sync with the rest of the site.
const fillTokens = (html) =>
  html
    .replace(/\{street\}/g, site.address.street)
    .replace(/\{city\}/g, site.address.city)
    .replace(/\{state\}/g, site.address.state)
    .replace(/\{zip\}/g, site.address.zip)
    .replace(/\{phone\}/g, site.phone)
    .replace(/\{phoneHref\}/g, site.phoneHref)
    .replace(/\{email\}/g, site.email);

module.exports = [
  {
    url: '/partners/',
    out: 'partners/index.html',
    title: 'Our Partners',
    description:
      'Premier Academy partners with the College Board, JESIE, Hillside School, Toastmasters International and others across the United States and China.',
    body: (depth) => `
${pageHero({
  title: cPartners.hero.title,
  lead: cPartners.hero.lead,
  crumbs: [{ label: 'Partners' }],
  depth,
})}

${section({
  tone: 'white',
  narrow: true,
  body: prose(`
    <p class="lead">${cPartners.intro.lead}</p>
    <p>${cPartners.intro.body}</p>
  `),
})}

${section({
  tone: 'alt',
  eyebrow: cPartners.orgs.eyebrow,
  title: cPartners.orgs.title,
  narrow: true,
  body: `<div class="logos">
    ${partners
      .map(
        (pt) => `<div class="logos__item"><img src="${rel('/assets/images/partners/' + pt.file, depth)}" alt="${pt.name}" width="330" height="140" loading="lazy"></div>`
      )
      .join('\n    ')}
  </div>`,
})}

${section({
  tone: 'white',
  eyebrow: cPartners.friends.eyebrow,
  title: cPartners.friends.title,
  lead: cPartners.friends.lead,
  narrow: true,
  body: `<div class="gallery gallery--captioned" id="notable">
    ${notableVisitors
      .map(
        (n, i) => `<figure class="gallery__fig">
      <a class="gallery__item" href="${rel(n.src, depth)}" data-lightbox data-index="${i}">
        <img src="${rel(n.src, depth)}" alt="${n.caption}" width="900" height="675" loading="lazy">
      </a>
      <figcaption>${n.caption}</figcaption>
    </figure>`
      )
      .join('\n    ')}
  </div>`,
})}

${ctaBand({
  title: cPartners.cta.title,
  text: `Email ${site.email} or call ${site.phone} to discuss a program for your school or organization.`,
  buttonLabel: cPartners.cta.buttonLabel,
  depth,
})}
`,
  },

  {
    url: '/contact/',
    out: 'contact/index.html',
    title: 'Contact Us',
    description:
      'Visit Premier Academy at 7220 Rosemead Blvd, Suite 104, San Gabriel, CA 91775. Call (626) 765-3519 or send us a message.',
    body: (depth) => `
${pageHero({
  title: cContact.hero.title,
  lead: cContact.hero.lead,
  crumbs: [{ label: 'Contact Us' }],
  depth,
})}

<section class="section section--white">
  <div class="container">
    <div class="contact">
      <div class="contact__info">
        <h2 class="section__title">${site.campus}</h2>
        <ul class="contact__list">
          <li>${icons.pin({ size: 20 })}<div><span class="label">Address</span>${site.address.street}<br>${site.address.city}, ${site.address.state} ${site.address.zip}</div></li>
          <li>${icons.phone({ size: 20 })}<div><span class="label">Phone</span><a href="${site.phoneHref}">${site.phone}</a></div></li>
          <li>${icons.mail({ size: 20 })}<div><span class="label">Email</span><a href="mailto:${site.email}">${site.email}</a></div></li>
          <li>${icons.clock({ size: 20 })}<div><span class="label">Hours</span>${site.hours
            .map(([d, h]) => `${d}: ${h}`)
            .join('<br>')}</div></li>
        </ul>
      </div>

      <div class="contact__form-wrap">
        <h2 class="section__title">${cContact.infoTitle}</h2>
        <form class="form" action="${site.formEndpoint}" method="POST" data-form="contact" novalidate>
          <div class="field">
            <label for="name">Name <span class="req" aria-hidden="true">*</span></label>
            <input class="input" id="name" name="name" type="text" autocomplete="name" required>
            <p class="field__error" data-error-for="name"></p>
          </div>

          <div class="field">
            <label for="phone">Phone</label>
            <input class="input" id="phone" name="phone" type="tel" autocomplete="tel" inputmode="tel">
            <p class="field__error" data-error-for="phone"></p>
          </div>

          <div class="field">
            <label for="email">Email Address <span class="req" aria-hidden="true">*</span></label>
            <input class="input" id="email" name="email" type="email" autocomplete="email" required>
            <p class="field__error" data-error-for="email"></p>
          </div>

          <div class="field">
            <label for="message">Message <span class="req" aria-hidden="true">*</span></label>
            <textarea class="input" id="message" name="message" rows="6" required></textarea>
            <p class="field__error" data-error-for="message"></p>
          </div>

          <div class="field field--check">
            <label class="check">
              <input type="checkbox" id="sms-consent" name="sms_consent" value="yes">
              <span>${site.smsConsent}</span>
            </label>
            <p class="check__note">${site.smsDisclosure} Visit our <a href="${rel('/privacy-policy.html', depth)}">Privacy Policy</a> and <a href="${rel('/terms-conditions.html', depth)}">Terms &amp; Conditions</a>.</p>
          </div>

          <!-- Honeypot: replaces the WordPress CAPTCHA. Bots fill it, people never see it. -->
          <input class="hp" type="text" name="_gotcha" tabindex="-1" autocomplete="off" aria-hidden="true">

          <button class="btn btn--accent btn--lg" type="submit">Send Message</button>
          <p class="form__status" role="status" aria-live="polite"></p>
        </form>
      </div>
    </div>
  </div>
</section>

<section class="section section--alt section--flush">
  <h2 class="sr-only">Our location on Google Maps</h2>
  <div class="map">
    <iframe
      src="${site.mapEmbed}"
      title="Map showing Premier Academy at ${site.address.full}"
      width="100%" height="450" style="border:0;"
      allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
  </div>
</section>

${newsletter()}
`,
  },

  {
    url: '/privacy-policy.html',
    out: 'privacy-policy.html',
    title: 'Privacy Policy',
    description:
      'How Premier Academy collects, uses, shares and protects personal information, including SMS communications and your rights over your data.',
    body: (depth) => `
${pageHero({ title: 'Privacy Policy', crumbs: [{ label: 'Privacy Policy' }], depth })}

${section({
  tone: 'white',
  narrow: true,
  body: legalProse(cPrivacy.lastUpdated, fillTokens(cPrivacy.bodyHtml)),
})}
`,
  },

  {
    url: '/terms-conditions.html',
    out: 'terms-conditions.html',
    title: 'Terms & Conditions',
    description:
      'Terms and conditions governing use of the Premier Academy website, including data collection, SMS policy and children’s privacy.',
    body: (depth) => `
${pageHero({ title: 'Terms &amp; Conditions', crumbs: [{ label: 'Terms & Conditions' }], depth })}

${section({
  tone: 'white',
  narrow: true,
  body: legalProse(cTerms.lastUpdated, fillTokens(cTerms.bodyHtml)),
})}
`,
  },

  {
    url: '/404.html',
    out: '404.html',
    title: 'Page Not Found',
    description: 'The page you were looking for could not be found on premier-academy.com.',
    body: (depth) => `
<section class="section section--white notfound">
  <div class="container">
    <p class="notfound__code">404</p>
    <h1 class="section__title">${cNotFound.title}</h1>
    <p class="section__lead">${cNotFound.lead}</p>
    <div class="notfound__actions">
      <a class="btn btn--accent btn--lg" href="${rel('/', depth)}">Back to Home</a>
      <a class="btn btn--outline-primary btn--lg" href="${rel('/contact/', depth)}">Contact Us</a>
    </div>
    <ul class="notfound__links">
      <li><a href="${rel('/private-tutoring/', depth)}">Private Tutoring</a></li>
      <li><a href="${rel('/college-counseling/', depth)}">College Counseling</a></li>
      <li><a href="${rel('/services/sat-act.html', depth)}">SAT / ACT</a></li>
      <li><a href="${rel('/services/advance-placement-ap.html', depth)}">Advance Placement (AP)</a></li>
      <li><a href="${rel('/about/', depth)}">About Premier Academy</a></li>
    </ul>
  </div>
</section>
`,
  },
];
