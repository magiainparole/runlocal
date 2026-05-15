import type { Metadata } from "next";
import Link from "next/link";
import { guides } from "@/lib/guides";

export const metadata: Metadata = {
  title: "Install guides for local AI",
  description:
    "Hands-on guides for installing and running open source AI tools on macOS, Linux and Windows. Written for people who would rather understand than guess."
};

export default function GuidesIndex() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <header className="mb-10">
        <p className="text-sm font-medium text-brand-dark dark:text-brand-light tracking-wide uppercase mb-3">
          Install guides
        </p>
        <h1 className="text-4xl font-bold tracking-tight">
          Step-by-step guides for getting AI running on your own machine.
        </h1>
        <p className="mt-4 text-slate-700 dark:text-slate-300 leading-relaxed">
          Every guide is written from a real install, on real hardware, with
          the wrong turns kept in so you can avoid them. Commands assume a
          reasonably modern system. Where they do not, the page says so.
        </p>
      </header>

      <ul className="space-y-5">
        {guides.map((g) => (
          <li
            key={g.slug}
            className="rounded-xl border border-slate-200 dark:border-slate-800 p-6 hover:border-brand transition"
          >
            <Link href={`/guides/${g.slug}`} className="block">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold">{g.title}</h2>
                  <p className="mt-2 text-slate-700 dark:text-slate-300 leading-relaxed">
                    {g.excerpt}
                  </p>
                </div>
                <span className="shrink-0 text-xs rounded-full bg-brand/10 text-brand-dark dark:text-brand-light px-3 py-1">
                  {g.level}
                </span>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                <span>Updated {g.updated}</span>
                <span aria-hidden>·</span>
                <span>{g.readingTime} read</span>
                <span aria-hidden>·</span>
                <span>{g.os.join(", ")}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
