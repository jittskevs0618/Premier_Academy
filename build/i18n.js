// Locale machinery.
//
// Page copy lives inside the templates in build/pages/*.js, so rather than
// threading a t() call through every one, the English HTML is generated first
// and then re-rendered per locale by swapping translatable text.
//
// Only text nodes and a fixed set of attributes are touched; tags, URLs,
// classes and scripts are never rewritten. The dictionary is keyed by the
// exact English string, which also makes it a complete, human-editable
// inventory of every sentence on the site.

const SKIP_BLOCKS = /<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi;
const TRANSLATABLE_ATTRS = ['alt', 'title', 'placeholder', 'aria-label'];

// `content` is only prose on these meta tags. Translating it blindly would
// rewrite the viewport (`width=device-width…`), og:type (`website`) and
// twitter:card (`summary_large_image`) and break them.
const META_PROSE = /<meta[^>]*(?:name="description"|property="og:(?:title|description)")[^>]*>/gi;

// Strings that are names, codes or markup rather than prose.
const NOT_PROSE = [
  /^[\s\d.,:;/|—–-]*$/,                       // punctuation / numbers only
  /^[\w.+-]+@[\w.-]+$/,                        // email
  /^(https?:|tel:|mailto:|#|\/)/i,             // urls
  /^\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,     // phone
  /^[A-Z]{2,}-[\w-]+$/,                        // GTM-XXXX etc
  /^&[a-z]+;$/i,
];

const isProse = (s) => {
  const t = s.trim();
  if (t.length < 2) return false;
  if (NOT_PROSE.some((re) => re.test(t))) return false;
  return /[A-Za-z]{2}/.test(t);
};

/** Split HTML into segments, marking which are safe to translate. */
function segment(html) {
  const holes = [];
  const masked = html.replace(SKIP_BLOCKS, (m) => {
    holes.push(m);
    return `\u0000${holes.length - 1}\u0000`;
  });
  return { masked, holes };
}

const unmask = (s, holes) => s.replace(/\u0000(\d+)\u0000/g, (_, i) => holes[Number(i)]);

/** Every translatable string in a page, in document order, de-duplicated. */
function extract(html) {
  const { masked } = segment(html);
  const found = new Set();

  // Text between tags.
  masked.replace(/>([^<]+)</g, (_, text) => {
    const t = text.trim();
    if (isProse(t)) found.add(t);
    return '';
  });

  // Selected attributes.
  for (const attr of TRANSLATABLE_ATTRS) {
    const re = new RegExp(`\\b${attr}="([^"]*)"`, 'g');
    masked.replace(re, (_, v) => {
      const t = v.trim();
      if (isProse(t)) found.add(t);
      return '';
    });
  }

  // Prose-bearing meta tags only.
  masked.replace(META_PROSE, (tag) => {
    const v = tag.match(/content="([^"]*)"/);
    if (v && isProse(v[1].trim())) found.add(v[1].trim());
    return '';
  });

  // <title> sits outside the >text< pattern often enough to handle directly.
  const title = masked.match(/<title[^>]*>([^<]+)<\/title>/i);
  if (title && isProse(title[1].trim())) found.add(title[1].trim());

  return [...found];
}

/**
 * Re-render `html` with `dict` applied.
 * Strings absent from the dictionary are left in English and reported.
 */
function apply(html, dict, { onMissing } = {}) {
  const { masked, holes } = segment(html);
  const miss = new Set();

  const lookup = (raw) => {
    const t = raw.trim();
    if (!isProse(t)) return null;
    const hit = dict[t];
    if (hit === undefined || hit === '') {
      miss.add(t);
      return null;
    }
    return raw.replace(t, hit);
  };

  let out = masked.replace(/>([^<]+)</g, (m, text) => {
    const swapped = lookup(text);
    return swapped === null ? m : `>${swapped}<`;
  });

  for (const attr of TRANSLATABLE_ATTRS) {
    const re = new RegExp(`\\b(${attr}=")([^"]*)(")`, 'g');
    out = out.replace(re, (m, open, v, close) => {
      const swapped = lookup(v);
      return swapped === null ? m : `${open}${swapped}${close}`;
    });
  }

  out = out.replace(META_PROSE, (tag) =>
    tag.replace(/(content=")([^"]*)(")/, (m, open, v, close) => {
      const swapped = lookup(v);
      return swapped === null ? m : `${open}${swapped}${close}`;
    })
  );

  if (onMissing && miss.size) onMissing([...miss]);
  return unmask(out, holes);
}

module.exports = { extract, apply, isProse };
