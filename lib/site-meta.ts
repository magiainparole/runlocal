// The date the footer shows.
//
// It is recomputed on every build, which on this repo means every push: Vercel
// rebuilds from main, so the footer can no longer drift the way a hardcoded
// "May 2026" did.
//
// SITE_LAST_UPDATED overrides it. Set it to YYYY-MM when the date should stand
// for something a person did — a pass over the model data, a licence re-read —
// rather than for the last deploy. A typo fix is a deploy, not a review.

const OVERRIDE = process.env.SITE_LAST_UPDATED;

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function resolve(): Date {
  if (OVERRIDE && /^\d{4}-\d{2}$/.test(OVERRIDE)) {
    return new Date(`${OVERRIDE}-01T00:00:00Z`);
  }
  return new Date();
}

const resolved = resolve();

/** "August 2026" — formatted by hand so the output does not depend on the ICU data present at build time. */
export const lastUpdatedLabel = `${MONTHS[resolved.getUTCMonth()]} ${resolved.getUTCFullYear()}`;

/** Machine-readable counterpart for the <time> element. */
export const lastUpdatedIso = resolved.toISOString().slice(0, 10);
