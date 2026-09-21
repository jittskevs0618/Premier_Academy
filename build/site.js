// Global site constants — single source of truth for contact details, branding, analytics.

const site = {
  name: 'Premier Academy',
  campus: 'Premier Academy Arcadia Campus',
  tagline: 'Elementary excellence. Middle school mastery. College preparation.',
  founded: 1991,
  domain: 'https://premier-academy.com',
  gtmId: 'GTM-KCWVX5P4',

  phone: '(626) 765-3519',
  phoneHref: 'tel:+16267653519',
  email: 'info@premier-academy.com',

  address: {
    street: '7220 Rosemead Blvd. STE 104',
    city: 'San Gabriel',
    state: 'CA',
    zip: '91775',
    get full() {
      return `${this.street}, ${this.city}, ${this.state} ${this.zip}`;
    },
  },

  hours: [
    ['Monday – Friday', '10:00 AM – 7:00 PM'],
    ['Saturday', '10:00 AM – 5:00 PM'],
    ['Sunday', 'Closed'],
  ],

  about:
    "Premier Academy is dedicated to provide an enriching and well-rounded experience to enhance our students' intellect. The Academy emphasizes fundamental preparation in academic skills in order to achieve elementary excellence, middle school mastery, and college preparation.",

  // Verified against the live site footer. LinkedIn is deliberately absent:
  // the live footer's LinkedIn icon links to "#", so there is no account to link.
  social: {
    facebook: 'https://www.facebook.com/OfficialPremierAcademy',
    instagram: 'https://www.instagram.com/premieracademyofficial/',
    twitter: 'https://twitter.com/RealPremierAcad',
    linkedin: '',
  },

  // Swap for your own endpoint (Formspree / Web3Forms / Netlify Forms).
  formEndpoint: 'https://formspree.io/f/YOUR_FORM_ID',
  newsletterEndpoint: 'https://formspree.io/f/YOUR_NEWSLETTER_ID',

  smsConsent:
    '(Optional) I agree to receive SMS communications from Premier Academy regarding ' +
    'appointments, enrollment updates, billing reminders, and customer support.',
  smsDisclosure:
    'Message frequency may vary. Message and data rates may apply. You can opt out at any ' +
    'time by texting STOP. For assistance, text HELP or visit our website at ' +
    'https://premier-academy.com/. Consent is not a condition of purchase. We do not share ' +
    'or sell SMS opt-in information or phone numbers for the purpose of SMS.',

  mapEmbed:
    'https://www.google.com/maps?q=7220+Rosemead+Blvd+STE+104,+San+Gabriel,+CA+91775&output=embed',
};

module.exports = { site };
