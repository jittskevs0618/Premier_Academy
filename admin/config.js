// Decap CMS configuration. Every collection below maps to a file under
// content/ — the same files build/*.js reads to generate the site. Saving a
// change here commits straight to GitHub; Vercel rebuilds and deploys
// automatically within about a minute.
//
// This file is the CMS's editing surface, not the source of truth for what
// pages exist: adding a genuinely new page (not editing an existing one)
// still needs a developer, since that means adding a template in build/pages/.

window.CMS_CONFIG = {
  backend: {
    name: 'github',
    repo: 'jittskevs0618/Premier_Academy',
    branch: 'main',
    // This site hosts its own OAuth handshake (api/auth.js, api/callback.js)
    // rather than using Netlify's — works on whatever domain the editor is
    // visiting right now, the .vercel.app URL today or premier-academy.com
    // once DNS is switched, with nothing here to update either way.
    base_url: window.location.origin,
  },

  // New/replaced images land here by default; most image fields below point
  // at the specific folder that image already lives in instead.
  media_folder: 'assets/images/uploads',
  public_folder: '/assets/images/uploads',

  collections: [
    {
      name: 'site',
      label: 'Site Settings',
      files: [
        {
          name: 'settings',
          label: 'Contact Info, Hours & Social Links',
          file: 'content/site.json',
          fields: [
            { label: 'Business Name', name: 'name', widget: 'string' },
            { label: 'Campus Name (shown on Contact page)', name: 'campus', widget: 'string' },
            { label: 'Founded (year)', name: 'founded', widget: 'number', value_type: 'int' },
            { label: 'Phone (displayed)', name: 'phone', widget: 'string' },
            { label: 'Phone (dial link, e.g. tel:+16267653519)', name: 'phoneHref', widget: 'string' },
            { label: 'Email', name: 'email', widget: 'string' },
            {
              label: 'Address', name: 'address', widget: 'object',
              fields: [
                { label: 'Street', name: 'street', widget: 'string' },
                { label: 'City', name: 'city', widget: 'string' },
                { label: 'State', name: 'state', widget: 'string' },
                { label: 'ZIP', name: 'zip', widget: 'string' },
              ],
            },
            {
              label: 'Hours', name: 'hours', widget: 'list',
              fields: [
                { label: 'Day(s)', name: 'label', widget: 'string' },
                { label: 'Time', name: 'time', widget: 'string' },
              ],
            },
            { label: 'Footer "About" Blurb', name: 'about', widget: 'text' },
            {
              label: 'Social Links', name: 'social', widget: 'object',
              fields: [
                { label: 'Facebook URL', name: 'facebook', widget: 'string', required: false },
                { label: 'Instagram URL', name: 'instagram', widget: 'string', required: false },
                { label: 'Twitter/X URL', name: 'twitter', widget: 'string', required: false },
                { label: 'LinkedIn URL (blank = icon hidden)', name: 'linkedin', widget: 'string', required: false },
              ],
            },
            { label: 'Logo (header)', name: 'logo', widget: 'image', media_folder: '/assets/images', public_folder: '/assets/images' },
            { label: 'Logo (footer, light version)', name: 'logoFooter', widget: 'image', media_folder: '/assets/images', public_folder: '/assets/images' },
            { label: 'Contact Form Endpoint (Formspree/Web3Forms URL)', name: 'formEndpoint', widget: 'string' },
            { label: 'Newsletter Form Endpoint', name: 'newsletterEndpoint', widget: 'string' },
            { label: 'SMS Consent Checkbox Text', name: 'smsConsent', widget: 'text' },
            { label: 'SMS Compliance Disclosure', name: 'smsDisclosure', widget: 'text' },
            { label: 'Google Maps Embed URL', name: 'mapEmbed', widget: 'string' },
          ],
        },
      ],
    },

    {
      name: 'homepage',
      label: 'Homepage',
      files: [
        {
          name: 'hero',
          label: 'Hero Slideshow (3 slides)',
          file: 'content/hero-slides.json',
          fields: [
            {
              label: 'Slides', name: 'items', widget: 'list', min: 1, max: 3,
              fields: [
                { label: 'Background Image', name: 'image', widget: 'image', media_folder: '/assets/images/hero', public_folder: '/assets/images/hero' },
                { label: 'Eyebrow (small text above headline; use {founded} for the year)', name: 'eyebrow', widget: 'string' },
                { label: 'Headline', name: 'title', widget: 'text' },
                { label: 'Supporting Text', name: 'text', widget: 'text' },
                { label: 'Button Text', name: 'ctaLabel', widget: 'string' },
                { label: 'Button Link (internal path, e.g. /contact/)', name: 'ctaUrl', widget: 'string' },
              ],
            },
          ],
        },
        {
          name: 'body',
          label: 'Homepage Sections',
          file: 'content/pages/home.json',
          fields: [
            {
              label: '"What We Do" Section', name: 'whatWeDo', widget: 'object',
              fields: [
                { label: 'Eyebrow', name: 'eyebrow', widget: 'string' },
                { label: 'Title', name: 'title', widget: 'string' },
                { label: 'Lead Text', name: 'lead', widget: 'text' },
              ],
            },
            {
              label: '"Homework Assistance" Section', name: 'homework', widget: 'object',
              fields: [
                { label: 'Eyebrow', name: 'eyebrow', widget: 'string' },
                { label: 'Title', name: 'title', widget: 'string' },
                { label: 'Body Text', name: 'body', widget: 'text' },
                { label: 'Checklist Items', name: 'ticks', widget: 'list', field: { label: 'Item', name: 'item', widget: 'string' } },
                { label: 'Image', name: 'image', widget: 'image', media_folder: '/assets/images/services', public_folder: '/assets/images/services' },
                { label: 'Image Alt Text', name: 'imageAlt', widget: 'string' },
              ],
            },
            {
              label: '"Testimonials" Section Heading', name: 'testimonials', widget: 'object',
              fields: [
                { label: 'Eyebrow', name: 'eyebrow', widget: 'string' },
                { label: 'Title', name: 'title', widget: 'string' },
                { label: 'Lead Text', name: 'lead', widget: 'text' },
              ],
            },
            {
              label: 'Stat Counters', name: 'stats', widget: 'list', min: 1, max: 4,
              fields: [
                { label: 'Number', name: 'number', widget: 'string' },
                { label: 'Label', name: 'label', widget: 'string' },
              ],
            },
          ],
        },
      ],
    },

    {
      name: 'about_pages',
      label: 'About Us Pages',
      files: [
        {
          name: 'about',
          label: 'About Premier Academy',
          file: 'content/pages/about.json',
          fields: [
            { label: 'Page Heading', name: 'hero', widget: 'object', fields: [
              { label: 'Title', name: 'title', widget: 'string' },
              { label: 'Lead Text', name: 'lead', widget: 'text' },
            ] },
            { label: 'Introduction', name: 'intro', widget: 'object', fields: [
              { label: 'Lead Paragraph', name: 'lead', widget: 'text' },
              { label: 'Body Paragraph', name: 'body', widget: 'text' },
              { label: 'Mission Heading', name: 'missionTitle', widget: 'string' },
              { label: 'Mission Text', name: 'missionBody', widget: 'text' },
              { label: 'Faculty Heading', name: 'facultyTitle', widget: 'string' },
              { label: 'Faculty Text', name: 'facultyBody', widget: 'text' },
              { label: 'Link Button Text', name: 'ctaLabel', widget: 'string' },
              { label: 'Image', name: 'image', widget: 'image', media_folder: '/assets/images', public_folder: '/assets/images' },
              { label: 'Image Alt Text', name: 'imageAlt', widget: 'string' },
            ] },
            { label: '"Our Approach" Section', name: 'approach', widget: 'object', fields: [
              { label: 'Eyebrow', name: 'eyebrow', widget: 'string' },
              { label: 'Title', name: 'title', widget: 'string' },
              { label: 'Cards', name: 'cards', widget: 'list', fields: [
                { label: 'Title', name: 'title', widget: 'string' },
                { label: 'Text', name: 'text', widget: 'text' },
              ] },
            ] },
          ],
        },
        {
          name: 'director',
          label: 'Message from the Director',
          file: 'content/pages/about-director.json',
          fields: [
            { label: 'Page Heading', name: 'hero', widget: 'object', fields: [{ label: 'Title', name: 'title', widget: 'string' }] },
            { label: 'Director Name', name: 'name', widget: 'string' },
            { label: 'Director Title', name: 'role', widget: 'string' },
            { label: 'Photo', name: 'image', widget: 'image', media_folder: '/assets/images', public_folder: '/assets/images' },
            { label: 'Photo Alt Text', name: 'imageAlt', widget: 'string' },
            { label: 'Message', name: 'message', widget: 'object', fields: [
              { label: 'Greeting', name: 'greeting', widget: 'string' },
              { label: 'On Teachers', name: 'teachers', widget: 'text' },
              { label: 'On Philosophy', name: 'philosophy', widget: 'text' },
              { label: 'Closing', name: 'closing', widget: 'text' },
            ] },
            { label: 'Call to Action', name: 'cta', widget: 'object', fields: [
              { label: 'Title', name: 'title', widget: 'string' },
              { label: 'Button Text', name: 'buttonLabel', widget: 'string' },
            ] },
          ],
        },
        {
          name: 'testimonials_page',
          label: 'Testimonials Page Heading',
          file: 'content/pages/about-testimonials.json',
          fields: [
            { label: 'Page Heading', name: 'hero', widget: 'object', fields: [
              { label: 'Title', name: 'title', widget: 'string' },
              { label: 'Lead Text', name: 'lead', widget: 'text' },
            ] },
          ],
        },
        {
          name: 'honor_roll_page',
          label: 'Honor Roll Page Heading',
          file: 'content/pages/about-honor-roll.json',
          fields: [
            { label: 'Page Heading', name: 'hero', widget: 'object', fields: [
              { label: 'Title', name: 'title', widget: 'string' },
              { label: 'Lead Text', name: 'lead', widget: 'text' },
            ] },
            { label: 'Table Caption', name: 'tableCaption', widget: 'string' },
            { label: 'Call to Action', name: 'cta', widget: 'object', fields: [
              { label: 'Title', name: 'title', widget: 'string' },
              { label: 'Button Text', name: 'buttonLabel', widget: 'string' },
            ] },
          ],
        },
        {
          name: 'news_press_page',
          label: 'News & Press Page',
          file: 'content/pages/about-news-press.json',
          fields: [
            { label: 'Page Heading', name: 'hero', widget: 'object', fields: [
              { label: 'Title', name: 'title', widget: 'string' },
              { label: 'Lead Text', name: 'lead', widget: 'text' },
            ] },
            { label: 'Video Section', name: 'video', widget: 'object', fields: [
              { label: 'Eyebrow', name: 'eyebrow', widget: 'string' },
              { label: 'Title', name: 'title', widget: 'string' },
            ] },
          ],
        },
        {
          name: 'gallery_page',
          label: 'Gallery Page',
          file: 'content/pages/about-gallery.json',
          fields: [
            { label: 'Page Heading', name: 'hero', widget: 'object', fields: [
              { label: 'Title', name: 'title', widget: 'string' },
              { label: 'Lead Text', name: 'lead', widget: 'text' },
            ] },
            { label: 'Bottom Call to Action', name: 'cta', widget: 'object', fields: [
              { label: 'Eyebrow', name: 'eyebrow', widget: 'string' },
              { label: 'Title', name: 'title', widget: 'string' },
              { label: 'Lead Text', name: 'lead', widget: 'text' },
              { label: 'Link Text', name: 'linkLabel', widget: 'string' },
            ] },
          ],
        },
        {
          name: 'teachers_page',
          label: 'Teachers Page Heading',
          file: 'content/pages/about-teachers.json',
          fields: [
            { label: 'Page Heading', name: 'hero', widget: 'object', fields: [
              { label: 'Title', name: 'title', widget: 'string' },
              { label: 'Lead Text', name: 'lead', widget: 'text' },
            ] },
            { label: 'Call to Action', name: 'cta', widget: 'object', fields: [
              { label: 'Title', name: 'title', widget: 'string' },
              { label: 'Text', name: 'text', widget: 'text' },
              { label: 'Button Text', name: 'buttonLabel', widget: 'string' },
            ] },
          ],
        },
        {
          name: 'jobs_page',
          label: 'Job Opportunities Page',
          file: 'content/pages/about-jobs.json',
          fields: [
            { label: 'Page Heading', name: 'hero', widget: 'object', fields: [
              { label: 'Title', name: 'title', widget: 'string' },
              { label: 'Lead Text', name: 'lead', widget: 'text' },
            ] },
            { label: 'Featured Position', name: 'featured', widget: 'object', fields: [
              { label: 'Eyebrow', name: 'eyebrow', widget: 'string' },
              { label: 'Job Title', name: 'title', widget: 'string' },
              { label: 'Location', name: 'location', widget: 'string' },
              { label: 'Organization', name: 'organization', widget: 'string' },
              { label: 'Responsibilities', name: 'responsibilities', widget: 'list', field: { label: 'Item', name: 'item', widget: 'string' } },
              { label: 'Qualifications', name: 'qualifications', widget: 'list', field: { label: 'Item', name: 'item', widget: 'string' } },
              { label: 'How to Apply', name: 'howToApply', widget: 'text' },
            ] },
            { label: 'General Hiring', name: 'general', widget: 'object', fields: [
              { label: 'Eyebrow', name: 'eyebrow', widget: 'string' },
              { label: 'Title', name: 'title', widget: 'string' },
              { label: 'Disciplines Heading', name: 'disciplinesTitle', widget: 'string' },
              { label: 'Disciplines Text', name: 'disciplinesText', widget: 'text' },
              { label: 'Requirements Heading', name: 'requirementsTitle', widget: 'string' },
              { label: 'Requirements Text', name: 'requirementsText', widget: 'text' },
              { label: 'Apply Blurb (before subject line)', name: 'applyBlurb', widget: 'string' },
              { label: 'Email Subject Line', name: 'subjectLine', widget: 'string' },
              { label: 'Apply Button Text', name: 'applyButtonLabel', widget: 'string' },
            ] },
          ],
        },
      ],
    },

    {
      name: 'tutoring_counseling_pages',
      label: 'Private Tutoring & College Counseling Pages',
      files: [
        {
          name: 'private_tutoring',
          label: 'Private Tutoring',
          file: 'content/pages/private-tutoring.json',
          fields: [
            { label: 'Page Heading', name: 'hero', widget: 'object', fields: [
              { label: 'Title', name: 'title', widget: 'string' },
              { label: 'Lead Text', name: 'lead', widget: 'text' },
            ] },
            { label: 'Introduction', name: 'intro', widget: 'object', fields: [
              { label: 'Lead Paragraph', name: 'lead', widget: 'text' },
              { label: 'Body Paragraph', name: 'body', widget: 'text' },
              { label: 'Small Groups Paragraph', name: 'groups', widget: 'text' },
              { label: 'Checklist Items', name: 'ticks', widget: 'list', field: { label: 'Item', name: 'item', widget: 'string' } },
              { label: 'Link Button Text', name: 'ctaLabel', widget: 'string' },
              { label: 'Image', name: 'image', widget: 'image', media_folder: '/assets/images/services', public_folder: '/assets/images/services' },
              { label: 'Image Alt Text', name: 'imageAlt', widget: 'string' },
            ] },
            { label: '"What We Tutor" Section', name: 'subjects', widget: 'object', fields: [
              { label: 'Eyebrow', name: 'eyebrow', widget: 'string' },
              { label: 'Title', name: 'title', widget: 'string' },
              { label: 'Lead Text', name: 'lead', widget: 'text' },
            ] },
            { label: 'Call to Action', name: 'cta', widget: 'object', fields: [
              { label: 'Title', name: 'title', widget: 'string' },
              { label: 'Button Text', name: 'buttonLabel', widget: 'string' },
            ] },
          ],
        },
        {
          name: 'college_counseling',
          label: 'College Counseling — Our Programs',
          file: 'content/pages/college-counseling.json',
          fields: [
            { label: 'Page Heading', name: 'hero', widget: 'object', fields: [
              { label: 'Title', name: 'title', widget: 'string' },
              { label: 'Lead Text', name: 'lead', widget: 'text' },
            ] },
            { label: 'Introduction', name: 'intro', widget: 'object', fields: [
              { label: 'Lead Paragraph', name: 'lead', widget: 'text' },
              { label: 'Body Paragraph', name: 'body', widget: 'text' },
            ] },
            { label: '"The Program" Section Heading', name: 'program', widget: 'object', fields: [
              { label: 'Eyebrow', name: 'eyebrow', widget: 'string' },
              { label: 'Title', name: 'title', widget: 'string' },
            ] },
            { label: '"Admissions Results" Section', name: 'results', widget: 'object', fields: [
              { label: 'Eyebrow', name: 'eyebrow', widget: 'string' },
              { label: 'Title', name: 'title', widget: 'string' },
              { label: 'Lead Text', name: 'lead', widget: 'text' },
              { label: '"Success Stories" Link Text', name: 'successStoriesLabel', widget: 'string' },
              { label: '"Top Colleges" Link Text', name: 'topCollegesLabel', widget: 'string' },
            ] },
          ],
        },
        {
          name: 'success_stories_page',
          label: 'Success Stories Page Heading',
          file: 'content/pages/college-success-stories.json',
          fields: [
            { label: 'Page Heading', name: 'hero', widget: 'object', fields: [
              { label: 'Title', name: 'title', widget: 'string' },
              { label: 'Lead Text', name: 'lead', widget: 'text' },
            ] },
          ],
        },
        {
          name: 'top_colleges_page',
          label: 'Top Colleges Page',
          file: 'content/pages/college-top-colleges.json',
          fields: [
            { label: 'Page Heading', name: 'hero', widget: 'object', fields: [
              { label: 'Title', name: 'title', widget: 'string' },
              { label: 'Lead Text', name: 'lead', widget: 'text' },
            ] },
            { label: 'National Universities Section', name: 'national', widget: 'object', fields: [
              { label: 'Eyebrow', name: 'eyebrow', widget: 'string' },
              { label: 'Title', name: 'title', widget: 'string' },
            ] },
            { label: 'Liberal Arts Section', name: 'liberalArts', widget: 'object', fields: [
              { label: 'Eyebrow', name: 'eyebrow', widget: 'string' },
              { label: 'Title', name: 'title', widget: 'string' },
            ] },
            { label: 'Call to Action', name: 'cta', widget: 'object', fields: [
              { label: 'Title', name: 'title', widget: 'string' },
              { label: 'Text', name: 'text', widget: 'text' },
            ] },
          ],
        },
        {
          name: 'transfer_page',
          label: 'Transfer Admissions Page',
          file: 'content/pages/college-transfer.json',
          fields: [
            { label: 'Page Heading', name: 'hero', widget: 'object', fields: [
              { label: 'Title', name: 'title', widget: 'text' },
              { label: 'Lead Text', name: 'lead', widget: 'text' },
            ] },
            { label: 'Introduction', name: 'intro', widget: 'object', fields: [
              { label: 'Lead Paragraph', name: 'lead', widget: 'text' },
              { label: 'Body Paragraph', name: 'body', widget: 'text' },
            ] },
            { label: 'Strategy Section', name: 'strategy', widget: 'object', fields: [
              { label: 'Eyebrow', name: 'eyebrow', widget: 'string' },
              { label: 'Title', name: 'title', widget: 'string' },
              { label: 'Items', name: 'items', widget: 'list', fields: [
                { label: 'Title', name: 'title', widget: 'string' },
                { label: 'Text', name: 'text', widget: 'text' },
              ] },
            ] },
            { label: 'Services Section', name: 'services', widget: 'object', fields: [
              { label: 'Eyebrow', name: 'eyebrow', widget: 'string' },
              { label: 'Title', name: 'title', widget: 'string' },
              { label: 'Cards', name: 'cards', widget: 'list', fields: [
                { label: 'Title', name: 'title', widget: 'string' },
                { label: 'Text', name: 'text', widget: 'text' },
              ] },
            ] },
          ],
        },
      ],
    },

    {
      name: 'service_pages',
      label: 'Other Services Pages',
      files: [
        {
          name: 'sat_act',
          label: 'SAT / ACT',
          file: 'content/pages/service-sat-act.json',
          fields: [
            { label: 'Page Heading', name: 'hero', widget: 'object', fields: [
              { label: 'Title', name: 'title', widget: 'string' },
              { label: 'Lead Text', name: 'lead', widget: 'text' },
            ] },
            { label: 'Introduction', name: 'intro', widget: 'object', fields: [
              { label: 'Lead Paragraph', name: 'lead', widget: 'text' },
              { label: 'Body Paragraph', name: 'body', widget: 'text' },
            ] },
            { label: 'Weekend Courses Section', name: 'weekend', widget: 'object', fields: [
              { label: 'Eyebrow', name: 'eyebrow', widget: 'string' },
              { label: 'Title', name: 'title', widget: 'string' },
              { label: 'Cards', name: 'cards', widget: 'list', fields: [
                { label: 'Title', name: 'title', widget: 'string' },
                { label: 'Text', name: 'text', widget: 'text' },
              ] },
              { label: 'Checklist Items', name: 'ticks', widget: 'list', field: { label: 'Item', name: 'item', widget: 'string' } },
            ] },
            { label: 'Summer Section', name: 'summer', widget: 'object', fields: [
              { label: 'Eyebrow', name: 'eyebrow', widget: 'string' },
              { label: 'Title', name: 'title', widget: 'string' },
              { label: 'Lead Text', name: 'lead', widget: 'text' },
              { label: 'Link Text', name: 'linkLabel', widget: 'string' },
            ] },
            { label: 'Registration Section', name: 'registration', widget: 'object', fields: [
              { label: 'Eyebrow', name: 'eyebrow', widget: 'string' },
              { label: 'Title', name: 'title', widget: 'string' },
              { label: 'Lead Text', name: 'lead', widget: 'text' },
            ] },
            { label: 'Call to Action', name: 'cta', widget: 'object', fields: [
              { label: 'Title', name: 'title', widget: 'string' },
              { label: 'Button Text', name: 'buttonLabel', widget: 'string' },
            ] },
          ],
        },
        {
          name: 'ap',
          label: 'Advance Placement (AP)',
          file: 'content/pages/service-ap.json',
          fields: [
            { label: 'Page Heading', name: 'hero', widget: 'object', fields: [
              { label: 'Title', name: 'title', widget: 'string' },
              { label: 'Lead Text', name: 'lead', widget: 'text' },
            ] },
            { label: 'Feature Cards', name: 'features', widget: 'list', fields: [
              { label: 'Title', name: 'title', widget: 'string' },
              { label: 'Text', name: 'text', widget: 'text' },
            ] },
            { label: 'Curriculum Section', name: 'curriculum', widget: 'object', fields: [
              { label: 'Eyebrow', name: 'eyebrow', widget: 'string' },
              { label: 'Title (use {count} for the subject count)', name: 'titleTemplate', widget: 'string' },
              { label: 'Lead Text', name: 'lead', widget: 'text' },
            ] },
            { label: 'Call to Action', name: 'cta', widget: 'object', fields: [
              { label: 'Title', name: 'title', widget: 'string' },
              { label: 'Text', name: 'text', widget: 'text' },
            ] },
          ],
        },
        {
          name: 'study_abroad',
          label: 'Study Abroad (LIUXUE)',
          file: 'content/pages/service-study-abroad.json',
          fields: [
            { label: 'Page Heading', name: 'hero', widget: 'object', fields: [
              { label: 'Title', name: 'title', widget: 'string' },
              { label: 'Lead Text', name: 'lead', widget: 'text' },
            ] },
            { label: 'Introduction', name: 'intro', widget: 'object', fields: [
              { label: 'Lead Paragraph', name: 'lead', widget: 'text' },
              { label: 'Body Paragraph', name: 'body', widget: 'text' },
              { label: 'Checklist Items', name: 'ticks', widget: 'list', field: { label: 'Item', name: 'item', widget: 'string' } },
              { label: 'Link Button Text', name: 'ctaLabel', widget: 'string' },
              { label: 'Image', name: 'image', widget: 'image', media_folder: '/assets/images/services', public_folder: '/assets/images/services' },
              { label: 'Image Alt Text', name: 'imageAlt', widget: 'string' },
            ] },
            { label: 'FAQ Section Heading', name: 'faq', widget: 'object', fields: [
              { label: 'Eyebrow', name: 'eyebrow', widget: 'string' },
              { label: 'Title', name: 'title', widget: 'string' },
            ] },
            { label: 'Call to Action', name: 'cta', widget: 'object', fields: [
              { label: 'Title', name: 'title', widget: 'string' },
            ] },
          ],
        },
        {
          name: 'study_abroad_faq_data',
          label: 'Study Abroad — FAQ Questions',
          file: 'content/study-abroad-faq.json',
          fields: [
            { label: 'Questions', name: 'items', widget: 'list', fields: [
              { label: 'Question', name: 'question', widget: 'string' },
              { label: 'Answer', name: 'answer', widget: 'text' },
            ] },
          ],
        },
        {
          name: 'summer_winter',
          label: 'Summer and Winter Programs',
          file: 'content/pages/service-summer-winter.json',
          fields: [
            { label: 'Page Heading', name: 'hero', widget: 'object', fields: [
              { label: 'Title', name: 'title', widget: 'string' },
              { label: 'Lead Text', name: 'lead', widget: 'text' },
            ] },
            { label: 'Introduction', name: 'intro', widget: 'object', fields: [
              { label: 'Lead Paragraph', name: 'lead', widget: 'text' },
              { label: 'Body Paragraph', name: 'body', widget: 'text' },
            ] },
            { label: 'Schedule Section', name: 'schedule', widget: 'object', fields: [
              { label: 'Eyebrow', name: 'eyebrow', widget: 'string' },
              { label: 'Title', name: 'title', widget: 'string' },
              { label: 'Cards', name: 'cards', widget: 'list', fields: [
                { label: 'Title', name: 'title', widget: 'string' },
                { label: 'Text', name: 'text', widget: 'text' },
              ] },
            ] },
            { label: '"Included" Section', name: 'included', widget: 'object', fields: [
              { label: 'Eyebrow', name: 'eyebrow', widget: 'string' },
              { label: 'Title', name: 'title', widget: 'string' },
              { label: 'Items', name: 'items', widget: 'list', field: { label: 'Item', name: 'item', widget: 'string' } },
            ] },
            { label: 'Call to Action', name: 'cta', widget: 'object', fields: [
              { label: 'Title', name: 'title', widget: 'string' },
              { label: 'Text', name: 'text', widget: 'text' },
              { label: 'Button Text', name: 'buttonLabel', widget: 'string' },
            ] },
          ],
        },
        {
          name: 'homework_assistance',
          label: 'Homework Assistance',
          file: 'content/pages/service-homework.json',
          fields: [
            { label: 'Page Heading', name: 'hero', widget: 'object', fields: [
              { label: 'Title', name: 'title', widget: 'string' },
              { label: 'Lead Text', name: 'lead', widget: 'text' },
            ] },
            { label: 'Introduction', name: 'intro', widget: 'object', fields: [
              { label: 'Lead Paragraph', name: 'lead', widget: 'text' },
              { label: 'Body Paragraph', name: 'body', widget: 'text' },
              { label: 'Checklist Items', name: 'ticks', widget: 'list', field: { label: 'Item', name: 'item', widget: 'string' } },
              { label: 'Link Button Text', name: 'ctaLabel', widget: 'string' },
              { label: 'Image', name: 'image', widget: 'image', media_folder: '/assets/images/services', public_folder: '/assets/images/services' },
              { label: 'Image Alt Text', name: 'imageAlt', widget: 'string' },
            ] },
            { label: 'Call to Action', name: 'cta', widget: 'object', fields: [
              { label: 'Title', name: 'title', widget: 'string' },
              { label: 'Button Text', name: 'buttonLabel', widget: 'string' },
            ] },
          ],
        },
        {
          name: 'payment_options',
          label: 'Payment Options',
          file: 'content/pages/service-payment.json',
          fields: [
            { label: 'Page Heading', name: 'hero', widget: 'object', fields: [
              { label: 'Title', name: 'title', widget: 'string' },
              { label: 'Lead Text', name: 'lead', widget: 'text' },
            ] },
            { label: 'Call to Action', name: 'cta', widget: 'object', fields: [
              { label: 'Title', name: 'title', widget: 'string' },
              { label: 'Text', name: 'text', widget: 'text' },
              { label: 'Button Text', name: 'buttonLabel', widget: 'string' },
            ] },
          ],
        },
        {
          name: 'payment_methods_data',
          label: 'Payment Methods List',
          file: 'content/payment-methods.json',
          fields: [
            { label: 'Methods', name: 'items', widget: 'list', fields: [
              { label: 'Title', name: 'title', widget: 'string' },
              { label: 'Text', name: 'text', widget: 'text' },
            ] },
          ],
        },
      ],
    },

    {
      name: 'other_pages',
      label: 'Partners, Contact & Legal Pages',
      files: [
        {
          name: 'partners_page',
          label: 'Partners Page',
          file: 'content/pages/partners.json',
          fields: [
            { label: 'Page Heading', name: 'hero', widget: 'object', fields: [
              { label: 'Title', name: 'title', widget: 'string' },
              { label: 'Lead Text', name: 'lead', widget: 'text' },
            ] },
            { label: 'Introduction', name: 'intro', widget: 'object', fields: [
              { label: 'Lead Paragraph', name: 'lead', widget: 'text' },
              { label: 'Body Paragraph', name: 'body', widget: 'text' },
            ] },
            { label: 'Organizations Section Heading', name: 'orgs', widget: 'object', fields: [
              { label: 'Eyebrow', name: 'eyebrow', widget: 'string' },
              { label: 'Title', name: 'title', widget: 'string' },
            ] },
            { label: '"Friends of the Academy" Section', name: 'friends', widget: 'object', fields: [
              { label: 'Eyebrow', name: 'eyebrow', widget: 'string' },
              { label: 'Title', name: 'title', widget: 'string' },
              { label: 'Lead Text', name: 'lead', widget: 'text' },
            ] },
            { label: 'Call to Action', name: 'cta', widget: 'object', fields: [
              { label: 'Title', name: 'title', widget: 'string' },
              { label: 'Button Text', name: 'buttonLabel', widget: 'string' },
            ] },
          ],
        },
        {
          name: 'contact_page',
          label: 'Contact Page Heading',
          file: 'content/pages/contact.json',
          fields: [
            { label: 'Page Heading', name: 'hero', widget: 'object', fields: [
              { label: 'Title', name: 'title', widget: 'string' },
              { label: 'Lead Text', name: 'lead', widget: 'text' },
            ] },
            { label: 'Form Section Title', name: 'infoTitle', widget: 'string' },
          ],
        },
        {
          name: 'notfound_page',
          label: '404 (Page Not Found)',
          file: 'content/pages/notfound.json',
          fields: [
            { label: 'Title', name: 'title', widget: 'string' },
            { label: 'Lead Text', name: 'lead', widget: 'text' },
          ],
        },
        {
          name: 'privacy_policy',
          label: 'Privacy Policy',
          file: 'content/pages/privacy-policy.json',
          fields: [
            { label: 'Last Updated Date', name: 'lastUpdated', widget: 'string' },
            {
              label: 'Full Policy Text (HTML — leave tags like <h2>, <p>, <ul><li> in place)',
              name: 'bodyHtml', widget: 'text',
              hint: 'Placeholders {street} {city} {state} {zip} {phone} {phoneHref} {email} pull live from Site Settings — leave them as-is rather than typing the actual values.',
            },
          ],
        },
        {
          name: 'terms_conditions',
          label: 'Terms & Conditions',
          file: 'content/pages/terms-conditions.json',
          fields: [
            { label: 'Last Updated Date', name: 'lastUpdated', widget: 'string' },
            {
              label: 'Full Terms Text (HTML — leave tags like <h2>, <p>, <ul><li> in place)',
              name: 'bodyHtml', widget: 'text',
              hint: 'Placeholders {email} {phoneHref} {phone} pull live from Site Settings — leave them as-is rather than typing the actual values.',
            },
          ],
        },
      ],
    },

    {
      name: 'lists',
      label: 'Lists (Teachers, Testimonials, Honor Roll, ...)',
      files: [
        {
          name: 'teachers_data',
          label: 'Teachers',
          file: 'content/teachers.json',
          fields: [
            { label: 'Teachers', name: 'items', widget: 'list', fields: [
              { label: 'Name (e.g. "Mr. Evans")', name: 'name', widget: 'string' },
              { label: 'Degrees', name: 'degrees', widget: 'string' },
              { label: 'Subjects Taught', name: 'subjects', widget: 'string' },
            ] },
          ],
        },
        {
          name: 'testimonials_data',
          label: 'Testimonials',
          file: 'content/testimonials.json',
          fields: [
            { label: 'Testimonials', name: 'items', widget: 'list', fields: [
              { label: 'Parent Name', name: 'name', widget: 'string' },
              { label: 'Quote', name: 'text', widget: 'text' },
            ] },
          ],
        },
        {
          name: 'honor_roll_data',
          label: 'Honor Roll',
          file: 'content/honor-roll.json',
          fields: [
            { label: 'Students', name: 'items', widget: 'list', fields: [
              { label: 'Student Name', name: 'name', widget: 'string' },
              { label: 'Grade', name: 'grade', widget: 'string' },
              { label: 'School', name: 'school', widget: 'string' },
            ] },
          ],
        },
        {
          name: 'success_stories_data',
          label: 'Success Stories',
          file: 'content/success-stories.json',
          fields: [
            { label: 'Stories', name: 'items', widget: 'list', fields: [
              { label: 'Student Name', name: 'name', widget: 'string' },
              { label: 'University', name: 'school', widget: 'string' },
              { label: 'Story', name: 'text', widget: 'text' },
              { label: 'University Logo Path (optional, e.g. /assets/images/colleges/nyu.png)', name: 'logo', widget: 'string', required: false },
            ] },
          ],
        },
        {
          name: 'gallery_data',
          label: 'Gallery Photos',
          file: 'content/gallery.json',
          fields: [
            { label: 'Photos', name: 'items', widget: 'list', fields: [
              { label: 'Photo', name: 'src', widget: 'image', media_folder: '/assets/images/gallery', public_folder: '/assets/images/gallery' },
              { label: 'Alt Text (describe the photo)', name: 'alt', widget: 'string' },
            ] },
          ],
        },
        {
          name: 'partners_data',
          label: 'Partner Organizations',
          file: 'content/partners.json',
          fields: [
            { label: 'Partners', name: 'items', widget: 'list', fields: [
              { label: 'Organization Name', name: 'name', widget: 'string' },
              { label: 'Logo Filename (in assets/images/partners/)', name: 'file', widget: 'string' },
            ] },
          ],
        },
        {
          name: 'notable_visitors_data',
          label: '"Friends of the Academy" Photos',
          file: 'content/notable-visitors.json',
          fields: [
            { label: 'Photos', name: 'items', widget: 'list', fields: [
              { label: 'Photo', name: 'src', widget: 'image', media_folder: '/assets/images/partners', public_folder: '/assets/images/partners' },
              { label: 'Caption', name: 'caption', widget: 'string' },
            ] },
          ],
        },
        {
          name: 'news_videos_data',
          label: 'News/Press Videos',
          file: 'content/news-videos.json',
          fields: [
            { label: 'Videos', name: 'items', widget: 'list', fields: [
              { label: 'Title', name: 'title', widget: 'string' },
              { label: 'YouTube Video ID (the part after v= in the URL)', name: 'youtube', widget: 'string' },
              { label: 'Description', name: 'desc', widget: 'text' },
            ] },
          ],
        },
        {
          name: 'services_data',
          label: 'Homepage Service Cards',
          file: 'content/services.json',
          fields: [
            { label: 'Services', name: 'items', widget: 'list', fields: [
              { label: 'Title', name: 'title', widget: 'string' },
              { label: 'Description', name: 'text', widget: 'text' },
              { label: 'Link (internal path)', name: 'url', widget: 'string' },
              { label: 'Card Image', name: 'image', widget: 'image', media_folder: '/assets/images/services', public_folder: '/assets/images/services' },
            ] },
          ],
        },
        {
          name: 'tutoring_subjects_data',
          label: 'Private Tutoring — Subject Groups',
          file: 'content/tutoring-subjects.json',
          fields: [
            { label: 'Subject Groups', name: 'items', widget: 'list', fields: [
              { label: 'Group Title (e.g. "Math")', name: 'title', widget: 'string' },
              { label: 'Subjects', name: 'items', widget: 'list', field: { label: 'Subject', name: 'subject', widget: 'string' } },
            ] },
          ],
        },
        {
          name: 'counseling_programs_data',
          label: 'College Counseling — Seven Program Components',
          file: 'content/counseling-programs.json',
          fields: [
            { label: 'Components', name: 'items', widget: 'list', fields: [
              { label: 'Title', name: 'title', widget: 'string' },
              { label: 'Description', name: 'text', widget: 'text' },
            ] },
          ],
        },
        {
          name: 'top_colleges_data',
          label: 'Top Colleges Lists',
          file: 'content/top-colleges.json',
          fields: [
            { label: 'Top 26 National Universities', name: 'top26', widget: 'list', field: { label: 'University', name: 'university', widget: 'string' } },
            { label: 'Top 10 Liberal Arts Colleges', name: 'liberalArts10', widget: 'list', field: { label: 'College', name: 'college', widget: 'string' } },
          ],
        },
        {
          name: 'ap_subjects_data',
          label: 'AP Subjects List',
          file: 'content/ap-subjects.json',
          fields: [
            { label: 'AP Subjects', name: 'items', widget: 'list', field: { label: 'Subject', name: 'subject', widget: 'string' } },
          ],
        },
      ],
    },
  ],
};
