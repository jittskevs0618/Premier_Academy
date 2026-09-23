// Page shell: <head>, skip link, header + nav, footer, GTM.
// Pages supply only their <main> content; everything shared lives here.

const { posix } = require('path');
const { site } = require('./site');
const { nav, footerLinks } = require('./nav');
const { icons } = require('./icons');

// The build renders one locale at a time; rel() prefixes page links with the
// locale directory so the Chinese site links to Chinese pages.
let currentLocale = 'en';
const setLocale = (l) => { currentLocale = l; };
const getLocale = () => currentLocale;

// css/js/assets are shared by every locale and never get the prefix.
const SHARED_PATH = /^\/(css|js|assets)\//;

// Set per page so links can be resolved from the page's own directory rather
// than from the site root — otherwise a Chinese page links to "../zh/about/"
// instead of the equivalent, shorter "about/".
let currentOut = '';
const setOutputPath = (out) => { currentOut = out; };

/** Site-root URL -> a clean path relative to the page being rendered. */
function rel(url, depth) {
  let target = url === '/' ? 'index.html' : url.replace(/^\//, '');
  if (target.endsWith('/')) target += 'index.html';
  if (currentLocale !== 'en' && !SHARED_PATH.test(url)) {
    target = `${currentLocale}/${target}`;
  }
  if (!currentOut) return depth === 0 ? target : '../'.repeat(depth) + target;

  const fromDir = posix.dirname(currentOut);
  const out = posix.relative(fromDir === '.' ? '' : fromDir, target);
  return out || posix.basename(target);
}

/** Resolve a site-root path verbatim, without adding a locale prefix. */
function relRaw(url, depth) {
  let target = url === '/' ? 'index.html' : url.replace(/^\//, '');
  if (target.endsWith('/')) target += 'index.html';
  if (!currentOut) return depth === 0 ? target : '../'.repeat(depth) + target;
  const fromDir = posix.dirname(currentOut);
  const out = posix.relative(fromDir === '.' ? '' : fromDir, target);
  return out || posix.basename(target);
}

/** The same page in the other locale, as a site-root path. */
const otherLocaleUrl = (url, locale) =>
  locale === 'en' ? url : `/${locale}${url === '/' ? '/' : url}`;

const isActive = (item, current) =>
  item.url === current ||
  (item.children || []).some((c) => isActive(c, current));

function navItem(item, current, depth) {
  const active = isActive(item, current) ? ' is-active' : '';
  if (!item.children) {
    return `<li class="nav__item${active}"><a class="nav__link" href="${rel(item.url, depth)}"${
      item.url === current ? ' aria-current="page"' : ''
    }>${item.label}</a></li>`;
  }

  const level = item.children.some((c) => c.children) ? 1 : 2;
  const kids = item.children
    .map((child) => {
      if (!child.children) {
        return `<li class="nav__subitem"><a class="nav__sublink" href="${rel(child.url, depth)}">${child.label}</a></li>`;
      }
      const grandkids = child.children
        .map(
          (g) =>
            `<li class="nav__subitem"><a class="nav__sublink" href="${rel(g.url, depth)}">${g.label}</a></li>`
        )
        .join('');
      return `<li class="nav__subitem nav__subitem--parent">
              <a class="nav__sublink" href="${rel(child.url, depth)}">${child.label}${icons.chevron({ size: 16, cls: 'nav__flyout-caret' })}</a>
              <button class="nav__toggle nav__toggle--sub" type="button" aria-expanded="false" aria-label="Toggle ${child.label} menu">${icons.chevron({ size: 16 })}</button>
              <ul class="nav__flyout">${grandkids}</ul>
            </li>`;
    })
    .join('');

  return `<li class="nav__item nav__item--has-children${active}" data-level="${level}">
          <a class="nav__link" href="${rel(item.url, depth)}">${item.label}${icons.chevron({ size: 16, cls: 'nav__caret' })}</a>
          <button class="nav__toggle" type="button" aria-expanded="false" aria-label="Toggle ${item.label} menu">${icons.chevron({ size: 18 })}</button>
          <ul class="nav__dropdown">${kids}</ul>
        </li>`;
}

/**
 * Language toggle. Rendered twice: `topbar` shows at >=992px, `nav` below it.
 * Real links rather than buttons, so it works without JS and search engines
 * can follow it to the other locale.
 */
function langSwitch(place, url, depth) {
  const here = currentLocale;
  const link = (locale, label) => {
    const active = locale === here ? ' is-active' : '';
    const target = locale === here
      ? '#'
      : relRaw(otherLocaleUrl(url, locale), depth);
    return `<a class="langswitch__btn${active}" href="${target}" hreflang="${locale === 'en' ? 'en' : 'zh-Hans'}"${
      locale === here ? ' aria-current="true"' : ''
    } data-lang="${locale}">${label}</a>`;
  };
  return `<div class="langswitch langswitch--${place}" role="group" aria-label="Language">
          ${link('en', 'EN')}
          ${link('zh', '简体中文')}
        </div>`;
}

function header(current, depth) {
  return `<header class="header" id="site-header">
  <div class="topbar">
    <div class="container topbar__inner">
      <a class="topbar__link" href="${site.phoneHref}">${icons.phone({ size: 16 })}<span>${site.phone}</span></a>
      <a class="topbar__link topbar__link--hide-sm" href="mailto:${site.email}">${icons.mail({ size: 16 })}<span>${site.email}</span></a>
      <span class="topbar__spacer"></span>
      <span class="topbar__link topbar__link--hide-sm">${icons.clock({ size: 16 })}<span>Mon–Fri 10AM–7PM · Sat 10AM–5PM</span></span>
      ${langSwitch('topbar', current, depth)}
    </div>
  </div>

  <div class="container header__inner">
    <a class="brand" href="${rel('/', depth)}" aria-label="${site.name} home">
      <img class="brand__logo" src="${rel('/assets/images/logo.png', depth)}" alt="${site.name}" width="190" height="56">
    </a>

    <button class="hamburger" id="nav-toggle" type="button" aria-expanded="false" aria-controls="primary-nav" aria-label="Open menu">
      <span></span><span></span><span></span>
    </button>

    <nav class="nav" id="primary-nav" aria-label="Primary">
      <div class="nav__mobile-head">
        <span class="nav__mobile-title">Menu</span>
        <button class="nav__close" id="nav-close" type="button" aria-label="Close menu">${icons.close({ size: 22 })}</button>
      </div>
      <ul class="nav__list">
        ${nav.map((item) => navItem(item, current, depth)).join('\n        ')}
      </ul>
      <div class="nav__actions">
        ${langSwitch('nav', current, depth)}
        <a class="btn btn--accent btn--sm nav__cta" href="${rel('/contact/', depth)}">Free Consultation</a>
      </div>
    </nav>
  </div>
  <div class="nav__scrim" id="nav-scrim" hidden></div>
</header>`;
}

function footer(depth) {
  const social = [
    ['facebook', 'Facebook', site.social.facebook],
    ['instagram', 'Instagram', site.social.instagram],
    ['linkedin', 'LinkedIn', site.social.linkedin],
    ['twitter', 'X (Twitter)', site.social.twitter],
  ]
    .filter(([, , url]) => url)
    .map(
      ([key, label, url]) =>
        `<a class="social__link" href="${url}" aria-label="${label}" target="_blank" rel="noopener noreferrer">${icons[key]}</a>`
    )
    .join('');

  return `<footer class="footer">
  ${wave('footer')}
  <div class="container footer__grid">
    <div class="footer__col">
      <img class="footer__logo" src="${rel('/assets/images/logo-footer.png', depth)}" alt="${site.name}" width="180" height="54">
      <p class="footer__about">${site.about}</p>
      <p class="footer__since">Serving the San Gabriel Valley since ${site.founded}.</p>
    </div>

    <div class="footer__col">
      <h2 class="footer__heading">Quick Links</h2>
      <ul class="footer__links">
        ${footerLinks.map((l) => `<li><a href="${rel(l.url, depth)}">${l.label}</a></li>`).join('\n        ')}
      </ul>
    </div>

    <div class="footer__col">
      <h2 class="footer__heading">Contact</h2>
      <ul class="footer__contact">
        <li>${icons.pin({ size: 18 })}<span>${site.address.street}<br>${site.address.city}, ${site.address.state} ${site.address.zip}</span></li>
        <li>${icons.phone({ size: 18 })}<a href="${site.phoneHref}">${site.phone}</a></li>
        <li>${icons.mail({ size: 18 })}<a href="mailto:${site.email}">${site.email}</a></li>
      </ul>
      <div class="social">${social}</div>
      <div class="qr">
        <figure class="qr__item">
          <img src="${rel('/assets/qr/wechat-qr.png', depth)}" alt="Premier Academy WeChat QR code" width="96" height="96" loading="lazy">
          <figcaption>WeChat</figcaption>
        </figure>
        <figure class="qr__item">
          <img src="${rel('/assets/qr/whatsapp-qr.png', depth)}" alt="Premier Academy WhatsApp QR code" width="96" height="96" loading="lazy">
          <figcaption>WhatsApp</figcaption>
        </figure>
      </div>
    </div>
  </div>

  <div class="footer__bar">
    <div class="container footer__bar-inner">
      <p>Copyright &copy; <span id="year">${new Date().getFullYear()}</span> ${site.name}. All rights reserved.</p>
      <p class="footer__bar-links">
        <a href="${rel('/privacy-policy.html', depth)}">Privacy Policy</a>
        <a href="${rel('/terms-conditions.html', depth)}">Terms &amp; Conditions</a>
      </p>
    </div>
  </div>
</footer>`;
}

/** Decorative wave divider. `variant` selects the fill colour via CSS. */
function wave(variant = 'light', flip = false) {
  return `<div class="wave wave--${variant}${flip ? ' wave--flip' : ''}" aria-hidden="true">
    <svg viewBox="0 0 1440 90" preserveAspectRatio="none"><path d="M0,40 C180,86 360,86 540,58 C720,30 900,-14 1080,6 C1200,19 1320,44 1440,62 L1440,90 L0,90 Z"/></svg>
  </div>`;
}

const LOCALES = { en: { lang: 'en', hreflang: 'en' }, zh: { lang: 'zh-Hans', hreflang: 'zh-Hans' } };

function page({ title, description, url, body, depth, bodyClass = '', extraHead = '' }) {
  const loc = LOCALES[currentLocale] || LOCALES.en;
  const canonical = site.domain + otherLocaleUrl(url, currentLocale);
  const ogImage = `${site.domain}/assets/images/og-image.jpg`;

  // Every page declares both locales plus x-default, so search engines serve
  // the right one and never treat the two as duplicates.
  const alternates = Object.keys(LOCALES)
    .map((l) => `<link rel="alternate" hreflang="${LOCALES[l].hreflang}" href="${site.domain}${otherLocaleUrl(url, l)}">`)
    .concat(`<link rel="alternate" hreflang="x-default" href="${site.domain}${otherLocaleUrl(url, 'en')}">`)
    .join('\n');

  return `<!DOCTYPE html>
<html lang="${loc.lang}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title} – ${site.name}</title>
<meta name="description" content="${description}">
<link rel="canonical" href="${canonical}">
${alternates}

<meta property="og:title" content="${title} – ${site.name}">
<meta property="og:description" content="${description}">
<meta property="og:image" content="${ogImage}">
<meta property="og:url" content="${canonical}">
<meta property="og:locale" content="${currentLocale === 'zh' ? 'zh_CN' : 'en_US'}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${site.name}">
<meta name="twitter:card" content="summary_large_image">

<link rel="icon" href="${rel('/assets/images/favicon.svg', depth)}" type="image/svg+xml">
<link rel="apple-touch-icon" href="${rel('/assets/images/apple-touch-icon.png', depth)}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Noto+Sans+SC:wght@400;500;700&display=swap">
<link rel="stylesheet" href="${rel('/css/styles.css', depth)}">
${extraHead}
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${site.gtmId}');</script>
<!-- End Google Tag Manager -->
</head>
<body${bodyClass ? ` class="${bodyClass}"` : ''}>
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${site.gtmId}"
title="Google Tag Manager" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->

<a class="skip-link" href="#main">Skip to content</a>
${header(url, depth)}
<main id="main">
${body}
</main>
${footer(depth)}
<script src="${rel('/js/main.js', depth)}" defer></script>
</body>
</html>
`;
}

module.exports = { page, wave, rel, setLocale, getLocale, setOutputPath, otherLocaleUrl };
