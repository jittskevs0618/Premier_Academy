// Old WordPress slugs -> new static paths. 301 permanent.
// Section 10 / Section 14 of the rebuild spec: external links and search
// results still point at the WordPress URL patterns.

const redirects = [
  // Verified against the live WordPress menu and page list.
  ['/home/', '/'],
  ['/about-us/', '/about/'],
  ['/about-us-2/', '/about/'],
  ['/message-from-director/', '/about/message-from-director.html'],
  ['/testimonials/', '/about/testimonials.html'],
  ['/honor-roll/', '/about/honor-roll.html'],
  ['/news-press/', '/about/news-press.html'],
  ['/gallery-2/', '/about/gallery.html'],
  ['/gallery/', '/about/gallery.html'],
  ['/faculty/', '/about/faculty/teachers.html'],
  ['/teachers/', '/about/faculty/teachers.html'],
  ['/job-opportunities/', '/about/faculty/job-opportunities.html'],
  ['/become-a-teacher/', '/about/faculty/job-opportunities.html'],

  ['/our-programs/', '/college-counseling/'],
  ['/about-college-counseling/', '/college-counseling/'],
  ['/success-stories-testimonials/', '/college-counseling/success-stories.html'],
  ['/success-story/', '/college-counseling/success-stories.html'],
  ['/top-colleges/', '/college-counseling/top-colleges.html'],
  ['/transfer-services/', '/college-counseling/transfer.html'],

  ['/sat-act/', '/services/sat-act.html'],
  ['/key-test-dates/', '/services/sat-act.html'],
  ['/contact-us/advance-placement-ap/', '/services/advance-placement-ap.html'],
  ['/study-abroad-usa/', '/services/study-abroad.html'],
  ['/faq/', '/services/study-abroad.html'],
  ['/frequently-asked-questions/', '/services/study-abroad.html'],
  ['/esl-eld-toefl/', '/private-tutoring/'],
  ['/summer-winter-programs/', '/services/summer-winter-programs.html'],
  ['/homework-assistance/', '/services/homework-assistance.html'],
  ['/payment-options/', '/services/payment-options.html'],
  ['/contact-us/payment-options/', '/services/payment-options.html'],

  ['/our-partners/', '/partners/'],
  ['/contact-us/', '/contact/'],
  ['/privacy-policy/', '/privacy-policy.html'],
  ['/about-us-2/privacypolicy/', '/privacy-policy.html'],
  ['/terms-conditions/', '/terms-conditions.html'],
  ['/terms-and-conditions/', '/terms-conditions.html'],
];

/** Netlify / Cloudflare Pages `_redirects`. */
function netlify() {
  const width = Math.max(...redirects.map(([from]) => from.length)) + 2;
  return (
    '# Legacy WordPress URLs -> static paths\n' +
    redirects.map(([from, to]) => `${from.padEnd(width)}${to}  301`).join('\n') +
    '\n\n# WordPress admin and feeds no longer exist\n' +
    '/wp-admin/*   /404.html  404\n' +
    '/wp-login.php /404.html  404\n' +
    '/feed         /          301\n' +
    '\n# Generator source — published alongside the site, but not part of it\n' +
    '/build/*                        /404.html  404\n' +
    '/scripts/*                      /404.html  404\n' +
    '/premier-academy-rebuild.md     /404.html  404\n'
  );
}

/** Vercel `vercel.json`. */
function vercel() {
  return JSON.stringify(
    {
      // The site is the repo root, and `npm run build` regenerates it in place.
      framework: null,
      outputDirectory: '.',
      // Canonicals and the sitemap use a trailing slash (/about/), so Vercel must
      // too — otherwise it 308s /about/ to /about and contradicts every canonical.
      cleanUrls: false,
      trailingSlash: true,
      // Sources keep their trailing slash: with trailingSlash:true Vercel
      // normalises /our-partners to /our-partners/ BEFORE matching redirects,
      // so a slash-less source never matches and the URL 404s instead.
      redirects: redirects.map(([source, destination]) => ({
        source,
        destination,
        permanent: true,
      })),
      headers: [
        {
          source: '/assets/(.*)',
          headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
        },
        {
          source: '/(css|js)/(.*)',
          headers: [{ key: 'Cache-Control', value: 'public, max-age=604800' }],
        },
      ],
    },
    null,
    2
  ) + '\n';
}

/** Nginx server-block snippet, for a VPS deploy. */
function nginx() {
  return `# Premier Academy — include inside your server { } block.
# Legacy WordPress URLs -> static paths.

${redirects.map(([from, to]) => `rewrite ^${from.replace(/\/$/, '')}/?$ ${to} permanent;`).join('\n')}

# WordPress endpoints that no longer exist
location ^~ /wp-admin  { return 404; }
location = /wp-login.php { return 404; }
location ^~ /wp-content { return 404; }

# Generator source — present in the repo, not part of the public site
location ^~ /build   { return 404; }
location ^~ /scripts { return 404; }
location = /premier-academy-rebuild.md { return 404; }

# Serve directory indexes and the styled 404
index index.html;
error_page 404 /404.html;

# Long cache on fingerprint-free assets
location ~* \\.(?:jpg|jpeg|png|gif|svg|webp|ico|woff2?)$ {
  expires 1y;
  add_header Cache-Control "public, immutable";
}
location ~* \\.(?:css|js)$ {
  expires 7d;
  add_header Cache-Control "public";
}
`;
}

module.exports = { redirects, netlify, vercel, nginx };
