const { site } = require('../site');
const { icons } = require('../icons');
const { rel } = require('../layout');
const { pageHero, section, prose, ctaBand, newsletter } = require('../components');
const { partners, notableVisitors } = require('../data');

const legalProse = (updated, blocks) => prose(`
  <p class="legal__updated"><strong>Last updated:</strong> ${updated}</p>
  ${blocks}
`);

module.exports = [
  {
    url: '/partners/',
    out: 'partners/index.html',
    title: 'Our Partners',
    description:
      'Premier Academy partners with the College Board, JESIE, Hillside School, Toastmasters International and others across the United States and China.',
    body: (depth) => `
${pageHero({
  title: 'Our Partners',
  lead: 'Schools and organizations we work with across the United States and China.',
  crumbs: [{ label: 'Partners' }],
  depth,
})}

${section({
  tone: 'white',
  narrow: true,
  body: prose(`
    <p class="lead">Premier Academy has many partners throughout the United States. These include regular private schools, boarding schools, and host families.</p>
    <p>Premier Academy prides itself on knowing all key admissions personnel at our partner schools, which is a significant factor in successful placement.</p>
  `),
})}

${section({
  tone: 'alt',
  eyebrow: 'Partner Organizations',
  title: 'Who we work with',
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
  eyebrow: 'Over Three Decades',
  title: 'Friends of the Academy',
  lead: 'Figures from business, science, sport and the arts who have crossed paths with Premier Academy and the Wuu family.',
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
  title: 'Interested in partnering with us?',
  text: `Email ${site.email} or call ${site.phone} to discuss a program for your school or organization.`,
  buttonLabel: 'Start a Conversation',
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
  title: 'Contact Us',
  lead: 'Questions about a program, a schedule or a price? We answer quickly.',
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
        <h2 class="section__title">Send us a message</h2>
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
  body: legalProse(
    'April 16, 2026',
    `
    <p>Premier Academy ("we", "us", "our") respects your privacy. This policy explains what information we collect, why we collect it, and what choices you have.</p>

    <h2>Information we collect</h2>
    <p>We collect information you give us directly when you contact us, enroll a student, or subscribe to our newsletter. This may include:</p>
    <ul>
      <li>Name and the name of the student</li>
      <li>Email address</li>
      <li>Phone number</li>
      <li>Demographic information such as grade level, school and academic interests</li>
    </ul>

    <h2>How we use your information</h2>
    <ul>
      <li>To respond to enquiries and schedule consultations or sessions</li>
      <li>To administer enrollment, billing and program logistics</li>
      <li>To send program announcements, test-date reminders and discounts, where you have asked to receive them</li>
      <li>To improve our programs and our website</li>
    </ul>

    <h2>Sharing with third parties</h2>
    <p><strong>We do not sell your personal information.</strong> We share information only with service providers who help us operate — for example payment processors, email delivery services and analytics providers — and only to the extent needed to perform that service. We may also disclose information where required by law.</p>

    <h2>SMS communications</h2>
    <p>If you opt in to SMS, we may send messages about appointments, enrollment updates, billing reminders and customer support. Message frequency varies. Message and data rates may apply. Reply <strong>STOP</strong> to opt out or <strong>HELP</strong> for assistance. Mobile opt-in data and consent are never shared with third parties for marketing purposes.</p>

    <h2>Cookies and analytics</h2>
    <p>This website uses cookies and Google Tag Manager to understand how visitors use the site. You can disable cookies in your browser settings; some parts of the site may then work differently.</p>

    <h2>Your rights</h2>
    <p>You may ask us to access, correct or delete the personal information we hold about you, and you may withdraw consent for marketing communications at any time.</p>

    <h2>Children's privacy</h2>
    <p>Our services are arranged by parents and guardians. We do not knowingly collect personal information directly from children under 13 without parental involvement.</p>

    <h2>Contact us about your data</h2>
    <p>
      Premier Academy<br>
      ${site.address.street}<br>
      ${site.address.city}, ${site.address.state} ${site.address.zip}<br>
      Phone: <a href="${site.phoneHref}">${site.phone}</a><br>
      Email: <a href="mailto:${site.email}">${site.email}</a>
    </p>
    `
  ),
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
  body: legalProse(
    'January 1, 2020',
    `
    <p>These terms govern your use of the Premier Academy website. By using the site, you accept them.</p>

    <h2>About this website</h2>
    <p>This website provides information about Premier Academy's tutoring, test preparation and college counseling programs. Content is provided for general information and may change without notice.</p>

    <h2>Data collection</h2>
    <p>We collect information you submit through forms on this site, including name, email address, phone number and any message content. See our <a href="privacy-policy.html">Privacy Policy</a> for the full detail.</p>

    <h2>SMS policy</h2>
    <p>By providing a mobile number and opting in, you consent to receive SMS messages from Premier Academy regarding appointments, enrollment updates, billing reminders and customer support. Message and data rates may apply. Reply STOP to unsubscribe.</p>

    <h2>Data collection methods</h2>
    <ul>
      <li><strong>Cookies</strong> — small files stored by your browser that help the site function and remember preferences.</li>
      <li><strong>Analytics</strong> — aggregate usage data collected through Google Tag Manager and associated tools.</li>
      <li><strong>Forms</strong> — information you choose to submit directly.</li>
    </ul>

    <h2>How we use collected data</h2>
    <p>To respond to enquiries, deliver and administer our programs, improve the website, and — where you have opted in — send relevant announcements and offers.</p>

    <h2>User preferences</h2>
    <p>You may opt out of marketing email at any time using the unsubscribe link, opt out of SMS by replying STOP, and control cookies through your browser settings.</p>

    <h2>Children's privacy</h2>
    <p>Children under the age of 13 should not use this website's services directly. Enrollment and communication are handled with a parent or legal guardian.</p>

    <h2>Contact</h2>
    <p>Questions about these terms: <a href="mailto:${site.email}">${site.email}</a> or <a href="${site.phoneHref}">${site.phone}</a>.</p>
    `
  ),
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
    <h1 class="section__title">We couldn’t find that page</h1>
    <p class="section__lead">The link may be out of date, or the page may have moved during our site update. Here are some places to try instead.</p>
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
