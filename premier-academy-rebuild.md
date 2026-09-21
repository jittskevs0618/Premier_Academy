# Premier Academy — Static Site Rebuild Instructions

> **Goal:** Build a 1:1 static copy of premier-academy.com (currently WordPress) so it can be deployed to a new server and pointed at the same domain.

---

## 1. Project Setup

```
premier-academy/
├── index.html                    # Homepage
├── css/
│   └── styles.css                # Global stylesheet
├── js/
│   └── main.js                   # Navigation, mobile menu, sliders, form handling
├── assets/
│   ├── images/                   # All site images (see Section 12 for download)
│   │   ├── logo.png
│   │   ├── logo-footer.png
│   │   ├── hero/
│   │   ├── services/
│   │   ├── gallery/
│   │   ├── teachers/
│   │   ├── testimonials/
│   │   └── partners/
│   └── qr/
│       ├── wechat-qr.png
│       └── whatsapp-qr.png
├── about/
│   ├── index.html                # About Premier Academy
│   ├── message-from-director.html
│   ├── testimonials.html
│   ├── honor-roll.html
│   ├── news-press.html
│   ├── gallery.html
│   └── faculty/
│       ├── teachers.html
│       └── job-opportunities.html
├── private-tutoring/
│   └── index.html
├── college-counseling/
│   ├── index.html                # Our Programs
│   ├── success-stories.html
│   ├── top-colleges.html
│   └── transfer.html
├── services/
│   ├── sat-act.html
│   ├── advance-placement-ap.html
│   ├── study-abroad.html
│   ├── summer-winter-programs.html
│   ├── homework-assistance.html
│   └── payment-options.html
├── partners/
│   └── index.html
├── contact/
│   └── index.html
├── privacy-policy.html
├── terms-conditions.html
└── 404.html
```

**Tech stack:** Plain HTML + CSS + vanilla JS. No framework needed — the content is static. Use a CSS reset or normalize, and a modern responsive grid (CSS Grid / Flexbox). If you want a build step for convenience, use Vite with vanilla HTML mode.

---

## 2. Global Layout & Branding

### Color Palette (extract from the live site, these are approximate — verify from screenshots)

| Token            | Value (approx)       | Usage                          |
| ---------------- | -------------------- | ------------------------------ |
| `--primary`      | `#1a3c6e` (dark navy)| Nav background, headings       |
| `--accent`       | `#e8a93a` (gold)     | Buttons, highlights, CTAs      |
| `--text`         | `#333333`            | Body text                      |
| `--text-light`   | `#666666`            | Secondary text                 |
| `--bg`           | `#ffffff`            | Page background                |
| `--bg-alt`       | `#f5f7fa`            | Alternating section backgrounds|
| `--footer-bg`    | `#1a2a3a`            | Footer dark background         |

### Typography
- Headings: A clean sans-serif (the site uses something like Poppins or Montserrat — check the live CSS `font-family`)
- Body: System sans-serif stack or the same Google Font at regular weight
- Chinese text: Ensure the font stack includes `"Noto Sans SC", "PingFang SC", "Microsoft YaHei"` for bilingual support

### Shared Components (build these as reusable partials or just consistent HTML blocks)

**Header:**
- Top bar: Phone number `(626) 765-3519` on the left
- Logo: Centered or left-aligned Premier Academy logo
- Navigation: Sticky/fixed nav with dropdown menus
- Language toggle: EN / 简体中文 (right side of nav)
- Mobile: Hamburger menu that slides in

**Footer (3-column + bottom bar):**
- Column 1: About blurb — "Premier Academy is dedicated to provide an enriching and well-rounded experience to enhance our students' intellect. The Academy emphasizes fundamental preparation in academic skills in order to achieve elementary excellence, middle school mastery, and college preparation."
- Column 2: Quick Links — Home, About Us, Private Tutoring, College Counseling, Partners, Contact Us, Privacy Policy, Terms & Conditions
- Column 3: Contact info + social icons
  - 7220 Rosemead Blvd. STE 104, San Gabriel, CA 91775
  - (626) 765-3519
  - info@premier-academy.com
  - Social icons: Facebook, Instagram, LinkedIn, Twitter
  - WeChat QR code
  - WhatsApp QR code
- Bottom bar: Copyright © Premier Academy. All rights reserved.

**Decorative SVG waves:** The site uses wave-shaped SVG section dividers between content blocks. Recreate these as inline SVGs in the CSS or HTML.

---

## 3. Navigation Structure

Build the nav exactly as follows (nested items are dropdowns):

```
Home
About Us ▾
  ├── About Premier Academy        → /about/
  ├── Message from Director         → /about/message-from-director.html
  ├── Testimonials                  → /about/testimonials.html
  ├── Honor Roll                    → /about/honor-roll.html
  ├── News/Press                    → /about/news-press.html
  ├── Faculty ▸
  │     ├── Teachers                → /about/faculty/teachers.html
  │     └── Job Opportunities       → /about/faculty/job-opportunities.html
  └── Gallery                       → /about/gallery.html
Private Tutoring                    → /private-tutoring/
College Counseling ▾
  ├── Our Programs                  → /college-counseling/
  ├── Success Stories/Testimonials  → /college-counseling/success-stories.html
  ├── Top Colleges                  → /college-counseling/top-colleges.html
  └── Transfer                     → /college-counseling/transfer.html
Other Services ▾
  ├── SAT/ACT                      → /services/sat-act.html
  ├── Advance Placement (AP)       → /services/advance-placement-ap.html
  ├── Study Abroad (LIUXUE)        → /services/study-abroad.html
  ├── Summer/Winter Programs       → /services/summer-winter-programs.html
  ├── Homework Assistance          → /services/homework-assistance.html
  └── Payment Options              → /services/payment-options.html
Partners                            → /partners/
Contact Us                          → /contact/
[EN | 简体中文]                      → language toggle
```

---

## 4. Page-by-Page Content

### 4.1 Homepage (`index.html`)

**Hero Section (full-width slider/carousel):**
- Background image with overlay
- Headline: "We at Premier Academy offer special academic support with our test prep, college counseling, and private tutoring programs"
- CTA button (e.g., "Learn More" or "Contact Us")
- Note: The WordPress site uses Slider Revolution — replace with a lightweight CSS/JS carousel or a single hero image

**Section: Services Grid (6 cards)**
Each card has an image, title, short description, and "Learn More" link:

1. **Private Tutoring** — Online and in-person tutoring. → /private-tutoring/
2. **College Counseling** — Comprehensive counseling services. → /college-counseling/
3. **SAT/ACT** — Test prep programs. → /services/sat-act.html
4. **Advance Placement (AP)** — AP exam preparation. → /services/advance-placement-ap.html
5. **After School Homework Assistance** — Year-round homework help. → /services/homework-assistance.html
6. **Study Abroad (LIUXUE)** — International student programs. → /services/study-abroad.html

**Section: After School Homework Assistance promo**
- Highlight that the program runs August through June
- CTA to learn more

**Section: College Counseling promo**
- Free one-hour college counseling session offered (in-person or online, English/Chinese)
- Phone: (626) 765-3519

**Section: Testimonials (2 featured)**
- Pull two parent quotes (see Section 4.8 for full list)
- Show name and a brief excerpt

**Section: Newsletter Signup**
- Heading: "Subscribe for our latest news and special discounts"
- Email input + Subscribe button

---

### 4.2 About Premier Academy (`about/index.html`)

- Heading: "About Premier Academy"
- Body: "Since it was founded in 1991, Premier Academy has stood by its goal to create a challenging and stimulating learning environment." The institution aims to develop student intellect while fostering self-confidence and discipline.
- Mission: "The Academy emphasizes fundamental preparation in academic skills in order to achieve elementary excellence, middle school mastery, and college preparation."
- Faculty note: Professional instructors provide "academic and college counseling shaped to fit each student's needs for them to gain entrance into the most prestigious universities."

---

### 4.3 Message from Director (`about/message-from-director.html`)

- Director: **Allison Huang**, Premier Academy Director
- Photo: Director portrait (225×300px)
- Key quotes from her message:
  - On faculty: "The key to our success lies in our teachers. We take great care in selecting and retaining the most highly skilled teachers who show a passion for both the learning and the teaching process."
  - On philosophy: "At Premier we believe it is our responsibility to strive for excellence in all aspects of our students' development."
  - On holistic development: A comprehensive education requires "a broad range of extracurricular and social activities" alongside academics
  - Closing: "you can be certain to receive the best quality service, education, and guidance toward achieving your educational goals."

---

### 4.4 Teachers (`about/faculty/teachers.html`)

Faculty directory — display as a grid of cards. Each card has name, degrees, and subjects:

| Name           | Degrees                                                     | Subjects                                                   |
| -------------- | ----------------------------------------------------------- | ---------------------------------------------------------- |
| Mr. Wuu        | B.A. Indiana University (MIS, Psychology)                   | College Counseling                                         |
| Mr. Evans      | M.A. Fuller Seminary; B.A. Houghton College                 | SAT II English, SAT, AP English, PSAT, College Essay       |
| Mr. Moussawi   | BSEE UTA Arlington; M.S. CSLA Physics; Ph.D. UCR Physics   | General/AP/College Physics, SAT II                         |
| Ms. Wong       | B.A. Tunghai University                                     | Chinese, English, Language, Literature, College Essays      |
| Ms. Yang       | M.S. & B.S. Oxford University (Mathematics)                 | Mathematics, AP Statistics, AP Calculus                     |
| Mr. Wu         | B.S. UCLA                                                   | Mathematics, SAT, AP Calculus                              |
| Ms. Borzoni    | U. of Massachusetts; Jones International University         | SAT English, Writing, Reading, PSAT, College Essays        |
| Ms. Takano     | M.S. Western University; B.S. U. of San Diego               | AP Chemistry, Biology, Math, SAT, Environmental Science    |
| Ms. Wang       | B.S. Caltech; M.A. Harvard University                       | Chemistry, Math, Physics                                   |
| Mr. Chang      | B.S. UC Santa Barbara                                       | Math, English, Homework Help                               |
| Mr. Lam        | B.S. UC Berkeley                                            | ISEE, SSAT, English, History, SAT                          |
| Mr. Jones      | B.A. Cal State Northridge                                   | ISEE, SSAT, English, History, SAT                          |
| Mr. McGee      | B.A. Michigan State University                              | English, Language, Literature, Western                     |
| Mr. Kuykendall | B.A. Occidental College (Philosophy)                        | ESL, SAT, TOEFL, IELTS, History                            |
| Mr. Lac        | B.S. UC Davis                                               | Math, Biology, History, SAT II, AP Calculus                |

---

### 4.5 Job Opportunities (`about/faculty/job-opportunities.html`)

**Featured Position: Campus Director**
- Location: Los Angeles County
- Organization: PLW Education, Inc. dba Premier Academy
- Responsibilities: Education Program Management (75%) — develop program schedules; Operations Optimization (25%) — analyze efficiency
- Qualifications: Master's degree in economics or related; 1 year experience; R programming proficiency
- Apply: Send resume to Pierre Wuu at 3355 Yorkshire Rd, Pasadena

**General Faculty Positions:**
- Disciplines: English, Math, Science, Chinese, SAT/ACT, all AP categories
- Requirements: Bachelor's degree minimum, experience teaching grades 1–12
- Apply: Email resume to info@premier-academy.com with subject "Job Application"

---

### 4.6 Honor Roll (`about/honor-roll.html`)

Display as a styled table or card grid:

| Student           | Grade | School                        |
| ----------------- | ----- | ----------------------------- |
| Sydney Wuu        | 5th   | High Point Academy            |
| David Lin         | 5th   | Arcadia                       |
| Fred Chen         | 5th   | Clairbourne School            |
| Madison Liu       | 7th   | Huntington Middle School      |
| Justin Campbell   | 9th   | Temple City High School       |
| Edwin Tong        | 10th  | Mark Keppel High School       |
| William Luochen   | 10th  | Gabrielino High School        |
| Carol Kang        | 10th  | Flintridge Prep               |
| Emily Wu          | 11th  | San Marino High School        |
| Kitty Lin         | 12th  | Mark Keppel                   |
| Jeffery Lin       | 12th  | San Gabriel High School       |
| Yoitsu Kamijo     | 12th  | Arcadia High School           |
| Cyrus Jia         | 12th  | Arcadia High School           |

---

### 4.7 News/Press (`about/news-press.html`)

Media hub page with embedded videos and audio. Include:

**Videos (embed as YouTube/iframe or host locally):**
- Premier Academy Commercial
- Summer camp selection guidance
- College planning lecture for top university admissions
- College planning seminar
- "LA 18.8" — Summer camp selection advice (TV segment)
- "LA Living Premier Academy 01282014" Parts 1 & 2 (TV feature)
- Americans Broadcast segment

**Radio Interviews (audio embeds):**
- Multiple AM 1300 radio interview segments (Chinese language), including interview with Tina

> **Note:** You'll need to grab the actual YouTube embed URLs or video files from the WordPress media library or the page source. Check the `<iframe>` src attributes on the live page.

---

### 4.8 Testimonials (`about/testimonials.html`)

Display as a styled quote grid or list:

1. **Mary Ann Huang** — "My high schooler had a wonderful experience...both services really made a difference in getting him accepted into 5 top-schools."
2. **Mary Zheng** — "She simply loves it! Within a month, I noticed her math grade had significantly improved and she begun to love math!"
3. **Anthony Tsang** — "The instructors...were always attentive to the student's needs, gentle but firm, and overall great teachers."
4. **Helen Chai** — "Premier Academy has done wonders for my children...Their tutors were top notch in all the key subjects."
5. **Edith Chang** — "The remarkable improvement...in the critical thinking ability of our children but also their confidence level."
6. **Melanie Wang** — "The best investment I ever made...Kyle's grades have steadily improved to the point where anything except an 'A' would be hard to accept."
7. **Kiley Liu** — "Thanks to their endless support, my kids were accepted to all of their top colleges and are planning to head to their dream school next year."
8. **Andy Yang** — "Both has been phenomenal...the SAT prep really boosted my kid's score over 150 points after only 6 weeks."
9. **Christine Zhou** — "The tutoring...was really effective and my son took his grades to another level."

---

### 4.9 Gallery (`about/gallery.html`)

- 12 images in a responsive grid (lightbox on click)
- Images are from `/wp-content/uploads/2020/05/course-img1.jpg` through `course-img17.jpg` (not all numbers used)
- Include a CTA section: "Go At Your Own Pace" with newsletter signup

---

### 4.10 Private Tutoring (`private-tutoring/index.html`)

- Heading: "Private Tutoring at Premier Academy"
- Intro: Highly personalized learning experience tailored to individual academic needs. Tutors undergo rigorous screening. Sessions online from home using modern technology.
- Small groups: Students may form groups of 2–3 for cost-efficient tutoring.

**Subject categories (display as organized lists or tabbed sections):**

- **Math:** Calculus, Trigonometry, Algebra, Geometry, Basic Math
- **English:** ESL/ELD, Reading, Writing, Grammar
- **Science:** Basic Science, Physics, Chemistry, Biology, Life Science, Earth Science
- **AP Subjects:** AP Chemistry, AP Physics, AP Calculus (AB & BC), AP Economics, AP Psychology, AP Computer Science, AP Statistics, AP Biology
- **History & Social Studies:** Social Studies, World History, US History, European History, AP US History, AP World History, AP European History, AP US Government
- **SAT:** SAT Reading and Writing, SAT Math
- **ISEE:** All levels — ISEE Math, ISEE English

---

### 4.11 College Counseling — Our Programs (`college-counseling/index.html`)

- Heading: College Counseling
- Intro: "We specialize in assisting students prepare for the college application process and are committed to help students gain admission to the nation's top universities."
- Experience: "Over 20 years experience successfully preparing and sending students to the best universities in the United States."

**7 Program Components (display as expandable sections or icon cards):**

1. **Curriculum Planning & Extracurricular Guidance** — Course selection, extracurricular recommendations, planning calendars, admissions updates
2. **College Major & Career Search** — Personal assessments, 300+ courses of study exploration, career info with income/job forecasts
3. **College Search, Selection & Admission** — Transcript/GPA/SAT evaluation, college search criteria, school recommendations, application support
4. **College Essays** — Writing guidance, up to two edits per essay, assistance up to 21 days before deadlines, grammar/structure/authenticity focus
5. **College Interviews** — Interview preparation and coaching
6. **Financial Aid** — Scholarship eligibility, FAFSA/PROFILE guidance, merit and need-based strategy
7. **Private Scholarship Searches** — Individualized scholarship and grant identification

**Promo:** Free one-hour complimentary college counseling session (in-person or online, English/Chinese). Phone: (626) 765-3519

---

### 4.12 Success Stories (`college-counseling/success-stories.html`)

Display as testimonial cards with student name, university, and quote:

| Student  | University Accepted                                                | Highlight                                                                           |
| -------- | ------------------------------------------------------------------ | ----------------------------------------------------------------------------------- |
| Albert   | Georgetown University                                              | Credits Premier Academy for assistance with entrance                                |
| Jonathan | New York University                                                | Grateful for guidance/mentoring throughout high school                               |
| Wesley   | UC Berkeley                                                        | Junior year guidance, SAT planning, essay writing support                            |
| Patrick  | UC Berkeley                                                        | "Customized guidance...was second to none"                                          |
| Mary     | Otis College of Art and Design                                     | "Counselors here are very encouraging and responsible"                               |
| Yiwei    | Indiana University                                                 | English tutoring, Stats, AP Env Science, SAT private tutoring                       |
| Yoitsu   | UC Berkeley (full scholarship) + USC, U. of Chicago, Emory, others | Multiple top-school acceptances                                                     |
| John     | University of Illinois                                             | Arrived from Shanghai with minimal English — received transition support            |
| Shike    | UC San Diego                                                       | Student from China — Academy enhanced overall application                           |
| Cyrus    | USC (nearly 100% scholarship) + UCSD, NYU, Carnegie Mellon         | Multiple scholarships and acceptances                                               |
| Ming     | UC System (transfer)                                               | Transitioned from Glendale Community College                                        |

---

### 4.13 Top Colleges (`college-counseling/top-colleges.html`)

**Top 26 Colleges (display as a numbered list or logo grid):**
Harvard, Princeton, Yale, Columbia, Stanford, UPenn, Caltech, MIT, Dartmouth, Duke, University of Chicago, Northwestern, Johns Hopkins, Washington University in St. Louis, Brown, Cornell, Rice, Vanderbilt, Notre Dame, Emory, Georgetown, UC Berkeley, Carnegie Mellon, USC, UCLA, University of Virginia

**Top 10 Liberal Arts Colleges:**
Williams, Amherst, Swarthmore, Middlebury, Wellesley, Bowdoin, Pomona, Carleton, Davidson, Haverford

---

### 4.14 Transfer (`college-counseling/transfer.html`)

- Heading: "As a transfer student, how can I get into my dream university?"
- Content covers the transfer process and Premier Academy's assistance
- Key strategy elements: Personal positioning, articulation of purpose, academic transition justification
- Services: Professional editing (personal statements, brainstorming, essay revision, grammar) and university counseling (major selection, university analysis, strategic planning)

---

### 4.15 SAT/ACT (`services/sat-act.html`)

- Heading: "SAT / ACT"
- Intro: Private/personalized one-on-one tutoring for SAT English and Math, SAT II subject tests, and ACT exam prep. Online sessions prioritized; small group options available.

**Weekend SAT Prep Courses:**
- 4.5-hour sessions: Critical Reading, Writing, Math
- Three 90-minute instructional blocks
- Weekly practice exams (Tuesdays or Fridays, 4:00–7:30 PM)
- Graded assessments for progress tracking
- Online and in-person

**Summer Intensive SAT/ACT Online Bootcamp**

**Test Registration Links (external):**
- SAT Main Test Dates
- SAT Subject Test Dates
- ACT Test Schedule

---

### 4.16 Advance Placement (AP) (`services/advance-placement-ap.html`)

- Heading: "Advance Placement (AP)"
- Official College Board Testing Center
- Format: Online and in-person, one-on-one or small classes
- Success rate: "The majority of our students score 5's and 4's on their AP exams"

**18 AP Subjects:**
Chinese Language, Calculus AB/BC, Chemistry, Biology, Environmental Science, Physics 1 & 2, English Literature and Composition, English Language and Composition, Statistics, US Government and Politics, US History, World History, Microeconomics, Macroeconomics, Art History, European History, Music Theory

---

### 4.17 Study Abroad (LIUXUE) (`services/study-abroad.html`)

- This page returned a 404 on the live site — may be removed or under a different URL
- If it exists in the WordPress admin, pull the content from there
- Likely covers international student placement services

---

### 4.18 Summer/Winter Programs (`services/summer-winter-programs.html`)

- Heading: "Summer and Winter Programs"
- For international students from China visiting the US
- Partnerships with Chinese schools for tailored experiences
- Morning English instruction + American culture; afternoon sightseeing in Greater LA (Disneyland, Universal Studios, Magic Mountain, Hollywood, Santa Monica Beach, UCLA, USC, UC Irvine)
- Duration: Summer 2–8 weeks (Jun/Jul/Aug), Winter 2–3 weeks (Dec/Jan/Feb)
- Services: Transportation, classroom instruction, instructor services, attraction tickets, meals
- Additional locations: San Francisco and New York City

---

### 4.19 Homework Assistance (`services/homework-assistance.html`)

- Heading: "Homework Assistance"
- Program: After school homework assistance running August through mid-June (parallel to school year)
- Format: One-on-one, in-person or online
- Availability: Monday through Friday

---

### 4.20 Payment Options (`services/payment-options.html`)

- Heading with tagline: "Our customers convenience is always our top priority"
- Payment methods: Credit cards, Debit cards, PayPal, Venmo, Wire transfer

---

### 4.21 Partners (`partners/index.html`)

- This page returned a 404 — check if it exists in WordPress admin
- Likely a logo grid of partner organizations/schools

---

### 4.22 Contact Us (`contact/index.html`)

**Contact Info:**
- Address: 7220 Rosemead Blvd, Suite 104, San Gabriel, CA 91775
- Phone: (626) 765-3519
- Email: info@premier-academy.com
- Hours: Monday–Friday 10:00 AM – 7:00 PM, Saturday 10:00 AM – 5:00 PM

**Contact Form fields:**
- Name (required)
- Phone
- Email Address (required)
- Message (required)
- SMS Consent checkbox (optional) — consent text about appointments, enrollment updates, billing reminders, customer support
- CAPTCHA verification

**Embedded Google Map** showing the San Gabriel location

> **Form handling:** Since this is now static, you'll need a form backend. Options: Formspree, Netlify Forms, Web3Forms, or a simple serverless function. Pick one and wire up the form's `action` attribute.

---

### 4.23 Privacy Policy (`privacy-policy.html`)

Last updated: April 16, 2026. Covers: information collection (name, email, phone, demographics), usage purposes, third-party sharing policy (they don't sell data), SMS communications, user rights, and contact info for data requests.

---

### 4.24 Terms & Conditions (`terms-conditions.html`)

Last updated: January 1, 2020. Covers: website info, data collection, SMS policy, data methods (cookies, analytics), data usage, user preferences, children's privacy (under 13 should not use services).

---

## 5. Interactive Elements to Implement

### 5.1 Homepage Carousel/Slider
Replace Slider Revolution with a lightweight solution:
- Option A: Pure CSS carousel (simplest)
- Option B: Swiper.js (~40kb, well-maintained, no jQuery)
- Option C: Single hero image with CSS animation (simplest if only 1-2 slides)

### 5.2 Mobile Navigation
- Hamburger icon that toggles a slide-in or dropdown menu
- All dropdowns should work on tap (mobile) and hover (desktop)
- Sub-menus (Faculty under About Us) need a second-level flyout or accordion on mobile

### 5.3 Gallery Lightbox
- Use a simple lightbox library (GLightbox, SimpleLightbox, or vanilla JS)
- Click image → full-screen overlay with close button, prev/next arrows

### 5.4 Contact Form
- HTML form with client-side validation
- Backend: Wire to Formspree (`https://formspree.io/f/YOUR_ID`) or similar
- Include honeypot field for spam prevention (replace CAPTCHA)

### 5.5 Newsletter Signup
- Simple email input + submit
- Wire to an email service (Mailchimp embed, ConvertKit, or same form backend)

### 5.6 Language Toggle
- Two options:
  - **Simple:** Duplicate every page as a `/zh/` version with Chinese content (if bilingual content exists in WordPress)
  - **Minimal:** Just toggle a `lang` attribute and swap visible text via JS (only if Chinese translations already exist)
  - Check the WordPress site's WPML or Polylang plugin to see how much Chinese content actually exists

---

## 6. Responsive Breakpoints

```css
/* Mobile first */
@media (min-width: 576px)  { /* Small devices  */ }
@media (min-width: 768px)  { /* Tablets        */ }
@media (min-width: 992px)  { /* Desktops       */ }
@media (min-width: 1200px) { /* Large desktops */ }
```

- Nav collapses to hamburger below 992px
- Service cards: 1 column mobile → 2 columns tablet → 3 columns desktop
- Footer: stacks to single column on mobile
- Hero: text resizes, image scales

---

## 7. SEO & Meta

Each page needs:
```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{Page Title} – Premier Academy</title>
<meta name="description" content="{page-specific description}">
<link rel="canonical" href="https://premier-academy.com/{path}">
<!-- Open Graph -->
<meta property="og:title" content="{title}">
<meta property="og:description" content="{description}">
<meta property="og:image" content="https://premier-academy.com/assets/images/og-image.jpg">
<meta property="og:url" content="https://premier-academy.com/{path}">
<meta property="og:type" content="website">
```

Also create:
- `/sitemap.xml` — list all pages
- `/robots.txt` — allow all, reference sitemap
- Favicon set (pull from current site)

---

## 8. Analytics & Tracking

The current site uses Google Tag Manager (`GTM-KCWVX5P4`). Add this to every page's `<head>`:

```html
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KCWVX5P4');</script>
```

And in `<body>`:
```html
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KCWVX5P4"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
```

---

## 9. Social Media Links

Use these in the footer and anywhere social icons appear:

| Platform  | URL                                                          |
| --------- | ------------------------------------------------------------ |
| Facebook  | https://www.facebook.com/PremierAcademyOfficial (verify)     |
| Instagram | https://www.instagram.com/premieracademyofficial (verify)    |
| Twitter   | https://twitter.com/RealPremierAcad (verify)                 |
| LinkedIn  | (grab from the current site footer's `<a>` href)             |
| WeChat    | QR code image                                                |
| WhatsApp  | QR code image                                                |

---

## 10. Deployment Checklist

- [ ] All images downloaded and optimized (WebP with JPEG fallback)
- [ ] All internal links work (no `/wp-content/` or `/?p=` WordPress URLs remaining)
- [ ] Contact form submits correctly to chosen backend
- [ ] Mobile nav works on iOS Safari and Android Chrome
- [ ] Google Maps embed loads on Contact page
- [ ] All meta tags and OG images in place
- [ ] Favicon renders
- [ ] 404 page styled
- [ ] SSL certificate configured on new server
- [ ] DNS pointed: premier-academy.com → new server IP
- [ ] Old WordPress redirects handled (if any external links point to old URL patterns like `/?page_id=X`, set up 301 redirects in your server config)
- [ ] Test bilingual toggle if Chinese content exists
- [ ] Performance: aim for <3s load on mobile (Lighthouse score 90+)

---

## 11. Hosting Recommendations

Since this is fully static:
- **Netlify** — Free tier, auto-SSL, form handling built in, easy deploys from Git
- **Vercel** — Same tier, great for static sites
- **Cloudflare Pages** — Free, fast global CDN
- **Traditional VPS** — If you want full control, a $5/mo DigitalOcean droplet with Nginx works fine

---

## 12. Asset Migration — How to Get Images

You need to download all images from the live WordPress site before it goes away. Run this in Claude Code or your terminal:

```bash
# 1. Download the full site with wget (images only)
wget -r -l 5 -A jpg,jpeg,png,gif,svg,webp,ico,pdf \
  --no-parent -P ./premier-assets \
  https://premier-academy.com/

# 2. Or use httrack for a more complete mirror
httrack https://premier-academy.com/ -O ./premier-mirror \
  "+*.premier-academy.com/*" -v

# 3. Check the wp-content/uploads folder specifically
wget -r -l 3 -A jpg,jpeg,png,gif,svg,webp \
  --no-parent -P ./premier-assets \
  https://premier-academy.com/wp-content/uploads/
```

After downloading, reorganize into the `/assets/images/` folder structure from Section 1.

> **Important:** Do this BEFORE taking down the WordPress site. The images are hosted on that server and won't exist once it's gone.

---

## 13. Build Order (Suggested Sequence for Claude Code)

1. **Set up project** — Init folder structure, install any dev tooling (Vite if desired)
2. **Build global CSS** — Colors, typography, reset, grid system, responsive utilities
3. **Build header + footer** — These appear on every page
4. **Build homepage** — Hero, services grid, testimonials, newsletter
5. **Build Contact page** — Form + map (test form submission)
6. **Build service pages** — Private Tutoring, SAT/ACT, AP, Homework, Summer/Winter, Study Abroad, Payment
7. **Build About pages** — About, Director message, Teachers, Honor Roll, Testimonials, News, Gallery, Jobs
8. **Build College Counseling pages** — Programs, Success Stories, Top Colleges, Transfer
9. **Build Partners page**
10. **Build legal pages** — Privacy Policy, Terms & Conditions
11. **Build 404 page**
12. **Add SEO** — Meta tags, sitemap, robots.txt, OG images
13. **Add analytics** — GTM snippet on all pages
14. **Test everything** — Links, forms, mobile, performance
15. **Deploy** — Push to hosting, configure DNS

---

## 14. Pages That Returned 404 (May Need WP Admin Check)

These URLs returned 404 during the crawl — they may be at different paths, renamed, or removed:

- `/about-premier-academy/` (About page — content was found at `/about-us/` instead)
- `/college-counseling/` (the main counseling page — content was found at `/our-programs/`)
- `/partners/` (partner page)
- `/study-abroad-liuxue/` (study abroad page)

**Action:** Log into the WordPress admin (`premier-academy.com/wp-admin`) and check Pages to confirm the actual slugs and whether these pages still exist. Update the file structure accordingly.

---

## 15. Quick Reference — Contact Info (Used on Every Page)

```
Premier Academy
7220 Rosemead Blvd. STE 104
San Gabriel, CA 91775
Phone: (626) 765-3519
Email: info@premier-academy.com
Hours: Mon–Fri 10 AM – 7 PM | Sat 10 AM – 5 PM
Founded: 1991
```
