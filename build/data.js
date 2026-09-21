// Site content data pulled from the rebuild spec (Section 4).

const services = [
  {
    title: 'Private Tutoring',
    text: 'One-on-one online and in-person tutoring across math, English, science, history and test prep — matched to each student.',
    url: '/private-tutoring/',
    image: '/assets/images/services/private-tutoring.jpg',
  },
  {
    title: 'College Counseling',
    text: 'Comprehensive counseling from curriculum planning through essays, interviews and financial aid.',
    url: '/college-counseling/',
    image: '/assets/images/services/college-counseling.jpg',
  },
  {
    title: 'SAT / ACT',
    text: 'Personalized SAT English and Math, SAT II subject tests and ACT preparation with weekly graded practice exams.',
    url: '/services/sat-act.html',
    image: '/assets/images/services/sat-act.jpg',
  },
  {
    title: 'Advance Placement (AP)',
    text: 'An official College Board testing center. The majority of our students score 5s and 4s on their AP exams.',
    url: '/services/advance-placement-ap.html',
    image: '/assets/images/services/ap.jpg',
  },
  {
    title: 'After School Homework Assistance',
    text: 'Year-round homework help running August through mid-June, Monday through Friday, in person or online.',
    url: '/services/homework-assistance.html',
    image: '/assets/images/services/homework.jpg',
  },
  {
    title: 'Study Abroad (LIUXUE)',
    text: 'Placement, transition and academic support for international students studying in the United States.',
    url: '/services/study-abroad.html',
    image: '/assets/images/services/study-abroad.jpg',
  },
];

const teachers = [
  { name: 'Mr. Wuu', degrees: 'B.A. Indiana University (MIS, Psychology)', subjects: 'College Counseling' },
  { name: 'Mr. Evans', degrees: 'M.A. Fuller Seminary; B.A. Houghton College', subjects: 'SAT II English, SAT, AP English, PSAT, College Essay' },
  { name: 'Mr. Moussawi', degrees: 'BSEE UTA Arlington; M.S. CSLA Physics; Ph.D. UCR Physics', subjects: 'General/AP/College Physics, SAT II' },
  { name: 'Ms. Wong', degrees: 'B.A. Tunghai University', subjects: 'Chinese, English, Language, Literature, College Essays' },
  { name: 'Ms. Yang', degrees: 'M.S. & B.S. Oxford University (Mathematics)', subjects: 'Mathematics, AP Statistics, AP Calculus' },
  { name: 'Mr. Wu', degrees: 'B.S. UCLA', subjects: 'Mathematics, SAT, AP Calculus' },
  { name: 'Ms. Borzoni', degrees: 'U. of Massachusetts; Jones International University', subjects: 'SAT English, Writing, Reading, PSAT, College Essays' },
  { name: 'Ms. Takano', degrees: 'M.S. Western University; B.S. U. of San Diego', subjects: 'AP Chemistry, Biology, Math, SAT, Environmental Science' },
  { name: 'Ms. Wang', degrees: 'B.S. Caltech; M.A. Harvard University', subjects: 'Chemistry, Math, Physics' },
  { name: 'Mr. Chang', degrees: 'B.S. UC Santa Barbara', subjects: 'Math, English, Homework Help' },
  { name: 'Mr. Lam', degrees: 'B.S. UC Berkeley', subjects: 'ISEE, SSAT, English, History, SAT' },
  { name: 'Mr. Jones', degrees: 'B.A. Cal State Northridge', subjects: 'ISEE, SSAT, English, History, SAT' },
  { name: 'Mr. McGee', degrees: 'B.A. Michigan State University', subjects: 'English, Language, Literature, Western' },
  { name: 'Mr. Kuykendall', degrees: 'B.A. Occidental College (Philosophy)', subjects: 'ESL, SAT, TOEFL, IELTS, History' },
  { name: 'Mr. Lac', degrees: 'B.S. UC Davis', subjects: 'Math, Biology, History, SAT II, AP Calculus' },
];

const honorRoll = [
  ['Sydney Wuu', '5th', 'High Point Academy'],
  ['David Lin', '5th', 'Arcadia'],
  ['Fred Chen', '5th', 'Clairbourne School'],
  ['Madison Liu', '7th', 'Huntington Middle School'],
  ['Justin Campbell', '9th', 'Temple City High School'],
  ['Edwin Tong', '10th', 'Mark Keppel High School'],
  ['William Luochen', '10th', 'Gabrielino High School'],
  ['Carol Kang', '10th', 'Flintridge Prep'],
  ['Emily Wu', '11th', 'San Marino High School'],
  ['Kitty Lin', '12th', 'Mark Keppel'],
  ['Jeffery Lin', '12th', 'San Gabriel High School'],
  ['Yoitsu Kamijo', '12th', 'Arcadia High School'],
  ['Cyrus Jia', '12th', 'Arcadia High School'],
];

const testimonials = [
  { name: 'Mary Ann Huang', text: 'My high schooler had a wonderful experience &mdash; both services really made a difference in getting him accepted into 5 top-schools.' },
  { name: 'Mary Zheng', text: 'She simply loves it! Within a month, I noticed her math grade had significantly improved and she begun to love math!' },
  { name: 'Anthony Tsang', text: "The instructors were always attentive to the student's needs, gentle but firm, and overall great teachers." },
  { name: 'Helen Chai', text: 'Premier Academy has done wonders for my children. Their tutors were top notch in all the key subjects.' },
  { name: 'Edith Chang', text: 'The remarkable improvement was not only in the critical thinking ability of our children but also their confidence level.' },
  { name: 'Melanie Wang', text: "The best investment I ever made. Kyle's grades have steadily improved to the point where anything except an 'A' would be hard to accept." },
  { name: 'Kiley Liu', text: 'Thanks to their endless support, my kids were accepted to all of their top colleges and are planning to head to their dream school next year.' },
  { name: 'Andy Yang', text: "Both has been phenomenal &mdash; the SAT prep really boosted my kid's score over 150 points after only 6 weeks." },
  { name: 'Christine Zhou', text: 'The tutoring was really effective and my son took his grades to another level.' },
];

const successStories = [
  { name: 'Albert', school: 'Georgetown University', logo: '/assets/images/colleges/georgetown.jpg', text: 'Credits Premier Academy for the assistance that helped secure his entrance to Georgetown.' },
  { name: 'Jonathan', school: 'New York University', logo: '/assets/images/colleges/nyu.png', text: 'Grateful for the guidance and mentoring he received throughout all four years of high school.' },
  { name: 'Wesley', school: 'UC Berkeley', logo: '/assets/images/colleges/uc-berkeley.png', text: 'Junior-year guidance, SAT planning and essay writing support carried him through to Berkeley.' },
  { name: 'Patrick', school: 'UC Berkeley', logo: '/assets/images/colleges/uc-berkeley.png', text: 'The customized guidance he received here was second to none.' },
  { name: 'Mary', school: 'Otis College of Art and Design', logo: '/assets/images/colleges/otis.jpg', text: 'The counselors here are very encouraging and responsible.' },
  { name: 'Yiwei', school: 'Indiana University', logo: '/assets/images/colleges/indiana.jpg', text: 'English tutoring, Statistics, AP Environmental Science and private SAT tutoring built the whole application.' },
  { name: 'Yoitsu', school: 'UC Berkeley (full scholarship)', logo: '/assets/images/colleges/uc-berkeley.png', text: 'Also accepted to USC, the University of Chicago, Emory and others — a full sweep of top-school offers.' },
  { name: 'John', school: 'University of Illinois', logo: '/assets/images/colleges/illinois.png', text: 'Arrived from Shanghai with minimal English and received the transition support to thrive here.' },
  { name: 'Shike', school: 'UC San Diego', logo: '/assets/images/colleges/uc-san-diego.jpg', text: 'A student from China whose overall application the Academy helped strengthen and shape.' },
  { name: 'Cyrus', school: 'USC (near-full scholarship)', logo: '/assets/images/colleges/usc.png', text: 'Also accepted to UC San Diego, NYU and Carnegie Mellon, with multiple scholarship offers.' },
  { name: 'Ming', school: 'UC System (transfer)', logo: '/assets/images/colleges/uc-berkeley.png', text: 'Transitioned successfully from Glendale Community College into the UC system.' },
];

const topColleges = [
  'Harvard University', 'Princeton University', 'Yale University', 'Columbia University',
  'Stanford University', 'University of Pennsylvania', 'California Institute of Technology',
  'Massachusetts Institute of Technology', 'Dartmouth College', 'Duke University',
  'University of Chicago', 'Northwestern University', 'Johns Hopkins University',
  'Washington University in St. Louis', 'Brown University', 'Cornell University',
  'Rice University', 'Vanderbilt University', 'University of Notre Dame', 'Emory University',
  'Georgetown University', 'UC Berkeley', 'Carnegie Mellon University',
  'University of Southern California', 'UCLA', 'University of Virginia',
];

const liberalArts = [
  'Williams College', 'Amherst College', 'Swarthmore College', 'Middlebury College',
  'Wellesley College', 'Bowdoin College', 'Pomona College', 'Carleton College',
  'Davidson College', 'Haverford College',
];

const tutoringSubjects = [
  { title: 'Math', items: ['Calculus', 'Trigonometry', 'Algebra', 'Geometry', 'Basic Math'] },
  { title: 'English', items: ['ESL / ELD', 'Reading', 'Writing', 'Grammar'] },
  { title: 'Science', items: ['Basic Science', 'Physics', 'Chemistry', 'Biology', 'Life Science', 'Earth Science'] },
  { title: 'AP Subjects', items: ['AP Chemistry', 'AP Physics', 'AP Calculus AB & BC', 'AP Economics', 'AP Psychology', 'AP Computer Science', 'AP Statistics', 'AP Biology'] },
  { title: 'History & Social Studies', items: ['Social Studies', 'World History', 'US History', 'European History', 'AP US History', 'AP World History', 'AP European History', 'AP US Government'] },
  { title: 'SAT & ISEE', items: ['SAT Reading and Writing', 'SAT Math', 'ISEE Math (all levels)', 'ISEE English (all levels)'] },
];

const apSubjects = [
  'Chinese Language', 'Calculus AB', 'Calculus BC', 'Chemistry', 'Biology',
  'Environmental Science', 'Physics 1', 'Physics 2', 'English Literature and Composition',
  'English Language and Composition', 'Statistics', 'US Government and Politics',
  'US History', 'World History', 'Microeconomics', 'Macroeconomics', 'Art History',
  'European History', 'Music Theory',
];

const counselingPrograms = [
  { title: 'Curriculum Planning & Extracurricular Guidance', text: 'Course selection year by year, extracurricular recommendations that build a coherent profile, planning calendars, and ongoing admissions updates.' },
  { title: 'College Major & Career Search', text: 'Personal assessments, exploration of 300+ courses of study, and career information including income and job-growth forecasts.' },
  { title: 'College Search, Selection & Admission', text: 'Transcript, GPA and SAT evaluation; search criteria; reach/match/safety recommendations; and hands-on application support.' },
  { title: 'College Essays', text: 'Writing guidance with up to two edits per essay, assistance up to 21 days before deadlines, and a focus on grammar, structure and authenticity.' },
  { title: 'College Interviews', text: 'Interview preparation and coaching, including mock interviews and feedback on presentation and content.' },
  { title: 'Financial Aid', text: 'Scholarship eligibility review, FAFSA and CSS PROFILE guidance, and a combined merit and need-based strategy.' },
  { title: 'Private Scholarship Searches', text: 'Individualized identification of private scholarships and grants matched to each student’s profile.' },
];

const galleryImages = [
  'Students collaborating in class',
  'After school homework session',
  'Student at Premier Academy',
  'Summer program group outing',
  'Students at Premier Academy',
  'Classroom activity',
  'Students at Premier Academy',
  'Students at Premier Academy',
  'Class in session',
  'Academy event',
  'Academy event',
  'Students at Premier Academy',
  'Evening class',
  'Students at Premier Academy',
  'Students at Premier Academy',
  'Evening class',
  'Student outing',
  'Student outing',
  'Student outing',
  'Academy event',
  'Campus visit to UCLA',
  'Campus visit to Stanford',
  'Birthday celebration \u2014 elementary group class',
  'Ice skating outing',
  'Inside a Premier Academy classroom',
  'Student outing',
  "Knott's Berry Farm trip",
].map((alt, i) => ({
  src: `/assets/images/gallery/gallery-${String(i + 1).padStart(2, '0')}.jpg`,
  alt,
}));

const partners = [
  { name: 'College Board', file: 'college-board.png' },
  { name: 'Southern California Council of Chinese Schools', file: 'southern-california-council-of-chinese-school.png' },
  { name: 'Toastmasters International', file: 'toast-masters-international.png' },
  { name: 'Jiangsu Education Services for International Exchange (JESIE)', file: 'jesie.png' },
  { name: 'Hillside School', file: 'hillside-school.png' },
  { name: 'TPR English', file: 'tpr-english.png' },
  { name: 'US Fine Art', file: 'us-fine-art.png' },
];

// Notable visitors and friends of the Academy, in the order the live page shows them.
const notableVisitors = [
  'Steve Chen, co-founder of YouTube',
  'Soong May-ling with the Wuu family at her 100th birthday',
  'Sammo Hung, film star',
  'Rupert Murdoch and Minister Tian',
  'Rihanna',
  'Quentin Tarantino and Donnie Yen',
  'President Bill Clinton',
  'Nobel Prize winner Yang Chen-Ning',
  'Maggie Q',
  'Lang Lang, pianist',
  'Lakers owner Jerry Buss',
  'Kenny G',
  'Jackie Chan',
  'Dr. David Ho, AIDS researcher',
  'Boxing champion Manny Pacquiao',
  'Chef Ming Tsai',
  'CoCo Lee',
  'Zhang Ziyi',
  'Yo-Yo Ma, cellist',
].map((caption, i) => ({
  src: `/assets/images/partners/notable-${String(i + 1).padStart(2, '0')}.jpg`,
  caption,
}));

// Verified playable via YouTube's oEmbed endpoint; titles taken from YouTube
// itself rather than the old WordPress captions, two of which were mismatched.
// Two embeds on the live site are dead and are deliberately omitted:
//   hFm9sTgracU ("Premier Academy Commercial") — removed
//   hmi_zrlxPZg ("College Planning Lecture")   — set to private
const newsVideos = [
  {
    title: 'Premier Academy',
    youtube: 'WQvFmnHBwpA',
    desc: 'A short introduction to the Academy, our faculty and our programs.',
  },
  {
    title: 'Summer Camp Selection — ETTV America',
    youtube: 'v8TI73feuXw',
    desc: '真正美國名校夏令營 — a television segment on choosing a summer program that genuinely strengthens a college application.',
  },
  {
    title: 'LA Living Premier Academy — Part 1',
    youtube: 'bS1N9p8QGKE',
    desc: 'Television feature on the Academy, broadcast 28 January 2014.',
  },
  {
    title: 'LA Living Premier Academy — Part 2',
    youtube: 'E-Y_MqgjNuc',
    desc: 'The second half of the 28 January 2014 television feature.',
  },
];

// The live site's radio players point at sanmarinopremier.com, a domain that no
// longer resolves — the recordings are already broken there. The segment list is
// kept so the section can be restored the moment the source files turn up; set
// `src` on each entry and re-enable the block in build/pages/about.js.
const newsRadio = [
  { title: 'Business Report — Premier Academy Fall Enrollment', desc: 'Broadcast 12 August 2016.', src: null },
  { title: 'AM 1300 Interview with Tina', desc: 'Chinese-language interview on the admissions process and family planning.', src: null },
  { title: 'AM 1300 Interview — 28 July 2014', desc: 'Chinese-language interview on college preparation for local families.', src: null },
  { title: 'AM 1300 Radio Segment', desc: 'Test preparation and summer program planning.', src: null },
  { title: 'AM 1300 Radio Segment', desc: 'College planning discussion.', src: null },
];

module.exports = {
  partners, notableVisitors,
  services, teachers, honorRoll, testimonials, successStories, topColleges,
  liberalArts, tutoringSubjects, apSubjects, counselingPrograms, galleryImages,
  newsVideos, newsRadio,
};
