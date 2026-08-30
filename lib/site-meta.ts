// The date the footer shows, resolved once at build time.
//
// It is recomputed on every build, which on this repo means every push: Vercel
// rebuilds from main, so the footer can no longer drift the way a hardcoded
// "May 2026" did.
//
// SITE_LAST_UPDATED overrides it. Set it to YYYY-MM when the date should stand
// for something a person did — a pass over the model data, a licence re-read —
// rather than for the last deploy. A typo fix is a deploy, not a review.
//
// Only the ISO string crosses into the Footer, which is a client component:
// evaluating `new Date()` there would print the visitor's clock instead of the
// build's. Formatting happens on the other side, where the locale is known.

const OVERRIDE = process.env.SITE_LAST_UPDATED;

function resolve(): Date {
  if (OVERRIDE && /^\d{4}-\d{2}$/.test(OVERRIDE)) {
    return new Date(`${OVERRIDE}-01T00:00:00Z`);
  }
  return new Date();
}

/** "2026-08-30" — build date, or the first of the overridden month. */
export const lastUpdatedIso = resolve().toISOString().slice(0, 10);

/**
 * The year in the copyright line. Deliberately not derived from
 * `lastUpdatedIso`: pinning SITE_LAST_UPDATED to an editorial pass in a past
 * year would otherwise backdate the copyright along with it.
 */
export const buildYear = new Date().getUTCFullYear();
