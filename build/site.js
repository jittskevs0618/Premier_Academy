// Global site constants — loaded from content/site.json (edited via the CMS
// at /admin/, or by hand) so a content change never requires touching code.

const raw = require('../content/site.json');

const site = {
  ...raw,
  hours: raw.hours.map((h) => [h.label, h.time]), // keep the [label, time] tuple shape templates expect
  address: {
    ...raw.address,
    get full() {
      return `${this.street}, ${this.city}, ${this.state} ${this.zip}`;
    },
  },
};

module.exports = { site };
