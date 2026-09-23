// Site content data — loaded from content/*.json (edited via the CMS at
// /admin/, or by hand) rather than hardcoded, so a content change never
// requires touching a template.
//
// Each require() below is a straight load of the matching content file;
// anything reshaped for a template's convenience happens right after.

const services = require('../content/services.json').items;
const teachers = require('../content/teachers.json').items;
const testimonials = require('../content/testimonials.json').items;
const successStories = require('../content/success-stories.json').items;
const tutoringSubjects = require('../content/tutoring-subjects.json').items;
const apSubjects = require('../content/ap-subjects.json').items;
const counselingPrograms = require('../content/counseling-programs.json').items;
const partners = require('../content/partners.json').items;
const notableVisitors = require('../content/notable-visitors.json').items; // [{src, caption}]
const newsVideos = require('../content/news-videos.json').items;
const newsRadio = require('../content/news-radio.json').items;

// honor-roll.json stores {name, grade, school} objects (CMS-friendly);
// templates consume the original [name, grade, school] tuple shape.
const honorRoll = require('../content/honor-roll.json').items.map((r) => [r.name, r.grade, r.school]);

const { top26: topColleges, liberalArts10: liberalArts } = require('../content/top-colleges.json');

const galleryImages = require('../content/gallery.json').items;

// University logos on the success-stories cards — keyed by student name so
// the image path never has to be re-typed in content/success-stories.json.
const successLogos = {
  Albert: 'georgetown.jpg', Jonathan: 'nyu.png', Wesley: 'uc-berkeley.png',
  Patrick: 'uc-berkeley.png', Mary: 'otis.jpg', Yiwei: 'indiana.jpg',
  Yoitsu: 'uc-berkeley.png', John: 'illinois.png', Shike: 'uc-san-diego.jpg',
  Cyrus: 'usc.png', Ming: 'uc-berkeley.png',
};
for (const s of successStories) {
  if (successLogos[s.name]) s.logo = `/assets/images/colleges/${successLogos[s.name]}`;
}

module.exports = {
  partners, notableVisitors,
  services, teachers, honorRoll, testimonials, successStories, topColleges,
  liberalArts, tutoringSubjects, apSubjects, counselingPrograms, galleryImages,
  newsVideos, newsRadio,
};
