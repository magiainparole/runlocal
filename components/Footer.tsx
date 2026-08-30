"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const MONTHS_EN = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const MONTHS_IT = [
  "gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno",
  "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre"
];

const linksEn = [
  { href: "/models", label: "Models" },
  { href: "/tools", label: "Tools" },
  { href: "/guides", label: "Install guides" },
  { href: "/blog", label: "Blog" }
];

const linksIt = [
  { href: "/it/models", label: "Modelli" },
  { href: "/it/tools", label: "Strumenti" },
  { href: "/it/guides", label: "Guide di installazione" },
  { href: "/it/blog", label: "Blog" }
];

// Split rather than parsed: "2026-08-30" through `new Date()` would drag a
// timezone into a value that only ever needs its month and year.
function monthYear(iso: string, months: string[]): string {
  const [year, month] = iso.split("-");
  return `${months[Number(month) - 1]} ${year}`;
}

export default function Footer({
  lastUpdatedIso,
  buildYear
}: {
  lastUpdatedIso: string;
  buildYear: number;
}) {
  const pathname = usePathname() || "/";
  const isItalian = pathname === "/it" || pathname.startsWith("/it/");

  const t = isItalian
    ? {
        tagline:
          "Copertura indipendente dell'ecosistema AI open source, con guide pratiche per far girare i modelli sul tuo hardware.",
        exploreHeading: "Esplora",
        aboutHeading: "Il progetto",
        independent: "Indipendenza editoriale.",
        noAffiliate: "Nessun link affiliato nelle pagine degli strumenti.",
        lastUpdated: "Ultimo aggiornamento:",
        licence: "Contenuti sotto licenza CC BY 4.0 salvo diversa indicazione.",
        madeBy: "Fatto da",
        builtWith: "Costruito con Next.js e Tailwind. Nessun tracciamento, nessuna pubblicità."
      }
    : {
        tagline:
          "Independent coverage of the open source AI ecosystem, with hands-on guides for running models on your own hardware.",
        exploreHeading: "Explore",
        aboutHeading: "About",
        independent: "Editorially independent.",
        noAffiliate: "No affiliate links on tool pages.",
        lastUpdated: "Last updated:",
        licence: "All content licensed CC BY 4.0 unless noted.",
        madeBy: "Made by",
        builtWith: "Built with Next.js and Tailwind. No tracking, no ads."
      };

  const links = isItalian ? linksIt : linksEn;
  const updated = monthYear(lastUpdatedIso, isItalian ? MONTHS_IT : MONTHS_EN);

  return (
    <footer className="mt-24 border-t border-slate-200/60 dark:border-slate-800/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 grid sm:grid-cols-3 gap-8 text-sm">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-block h-6 w-6 rounded-md bg-brand text-white grid place-items-center font-bold text-xs">
              R
            </span>
            <span className="font-semibold">RunLocal</span>
          </div>
          <p className="text-slate-600 dark:text-slate-400 max-w-xs">{t.tagline}</p>
        </div>
        <div>
          <h4 className="font-semibold mb-3">{t.exploreHeading}</h4>
          <ul className="space-y-1.5 text-slate-600 dark:text-slate-400">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-brand-dark dark:hover:text-brand-light">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">{t.aboutHeading}</h4>
          <ul className="space-y-1.5 text-slate-600 dark:text-slate-400">
            <li>{t.independent}</li>
            <li>{t.noAffiliate}</li>
            <li>
              {t.lastUpdated} <time dateTime={lastUpdatedIso}>{updated}</time>.
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-200/60 dark:border-slate-800/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 text-xs text-slate-500 flex flex-wrap items-center justify-between gap-2">
          <span>
            &copy; {buildYear} RunLocal. {t.licence}
          </span>
          <span>
            {t.madeBy}{" "}
            <a
              href="https://www.ballerano.com/vibe-coder"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-brand-dark dark:hover:text-brand-light"
            >
              Luciano Ballerano
            </a>
            . {t.builtWith}
          </span>
        </div>
      </div>
    </footer>
  );
}
