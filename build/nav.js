// Navigation tree — mirrors Section 3 of the rebuild spec exactly.
// `url` values are site-root-absolute; the layout rewrites them to relative paths per page.

const nav = [
  { label: 'Home', url: '/' },
  {
    label: 'About Us',
    url: '/about/',
    children: [
      { label: 'About Premier Academy', url: '/about/' },
      { label: 'Message from Director', url: '/about/message-from-director.html' },
      { label: 'Testimonials', url: '/about/testimonials.html' },
      { label: 'Honor Roll', url: '/about/honor-roll.html' },
      { label: 'News/Press', url: '/about/news-press.html' },
      {
        label: 'Faculty',
        url: '/about/faculty/teachers.html',
        children: [
          { label: 'Teachers', url: '/about/faculty/teachers.html' },
          { label: 'Job Opportunities', url: '/about/faculty/job-opportunities.html' },
        ],
      },
      { label: 'Gallery', url: '/about/gallery.html' },
    ],
  },
  { label: 'Private Tutoring', url: '/private-tutoring/' },
  {
    label: 'College Counseling',
    url: '/college-counseling/',
    children: [
      { label: 'Our Programs', url: '/college-counseling/' },
      { label: 'Success Stories / Testimonials', url: '/college-counseling/success-stories.html' },
      { label: 'Top Colleges', url: '/college-counseling/top-colleges.html' },
      { label: 'Transfer', url: '/college-counseling/transfer.html' },
    ],
  },
  {
    label: 'Other Services',
    url: '/services/sat-act.html',
    children: [
      { label: 'SAT/ACT', url: '/services/sat-act.html' },
      { label: 'Advance Placement (AP)', url: '/services/advance-placement-ap.html' },
      { label: 'Study Abroad (LIUXUE)', url: '/services/study-abroad.html' },
      { label: 'Summer/Winter Programs', url: '/services/summer-winter-programs.html' },
      { label: 'Homework Assistance', url: '/services/homework-assistance.html' },
      { label: 'Payment Options', url: '/services/payment-options.html' },
    ],
  },
  { label: 'Partners', url: '/partners/' },
  { label: 'Contact Us', url: '/contact/' },
];

const footerLinks = [
  { label: 'Home', url: '/' },
  { label: 'About Us', url: '/about/' },
  { label: 'Private Tutoring', url: '/private-tutoring/' },
  { label: 'College Counseling', url: '/college-counseling/' },
  { label: 'Partners', url: '/partners/' },
  { label: 'Contact Us', url: '/contact/' },
  { label: 'Privacy Policy', url: '/privacy-policy.html' },
  { label: 'Terms & Conditions', url: '/terms-conditions.html' },
];

module.exports = { nav, footerLinks };
