import type { Metadata } from "next";
import Link from "next/link";
import { postsIt } from "@/lib/posts-it";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Analisi e copertura editoriale dell'ecosistema AI open source. Modelli, strumenti, hardware, licenze.",
  alternates: {
    canonical: "https://runlocal.blog/it/blog",
    languages: {
      en: "https://runlocal.blog/blog",
      it: "https://runlocal.blog/it/blog"
    }
  }
};

export default function BlogIndexIt() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <header className="mb-10">
        <p className="text-sm font-medium text-brand-dark dark:text-brand-light tracking-wide uppercase mb-3">
          Editoriale
        </p>
        <h1 className="text-4xl font-bold tracking-tight">
          Note su un ecosistema che si muove più veloce dei comunicati stampa.
        </h1>
        <p className="mt-4 text-slate-700 dark:text-slate-300 leading-relaxed">
          Copertura long-form dell&apos;AI open source, scritta per lettori
          che conoscono già le basi e vogliono la parte che l&apos;annuncio ha
          omesso.
        </p>
      </header>

      <ul className="space-y-6">
        {postsIt.map((p) => (
          <li
            key={p.slug}
            className="rounded-xl border border-slate-200 dark:border-slate-800 p-6 hover:border-brand transition"
          >
            <Link href={`/it/blog/${p.slug}`} className="block">
              <h2 className="text-2xl font-semibold">{p.title}</h2>
              <p className="mt-2 text-slate-700 dark:text-slate-300 leading-relaxed">
                {p.subtitle}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                <span>
                  {new Date(p.date).toLocaleDateString("it-IT", {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                  })}
                </span>
                <span aria-hidden>·</span>
                <span>{p.readingTime} di lettura</span>
                <span aria-hidden>·</span>
                <span>{p.tags.join(" · ")}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
