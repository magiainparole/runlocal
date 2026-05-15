import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Analysis and editorial coverage of the open source AI ecosystem. Models, tools, policy, infrastructure."
};

export default function BlogIndex() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <header className="mb-10">
        <p className="text-sm font-medium text-brand-dark dark:text-brand-light tracking-wide uppercase mb-3">
          Editorial
        </p>
        <h1 className="text-4xl font-bold tracking-tight">
          Notes on an ecosystem that moves faster than the press releases.
        </h1>
        <p className="mt-4 text-slate-700 dark:text-slate-300 leading-relaxed">
          Long-form coverage of open source AI, written for readers who already
          know the basics and want the part the announcement omitted.
        </p>
      </header>

      <ul className="space-y-6">
        {posts.map((p) => (
          <li
            key={p.slug}
            className="rounded-xl border border-slate-200 dark:border-slate-800 p-6 hover:border-brand transition"
          >
            <Link href={`/blog/${p.slug}`} className="block">
              <h2 className="text-2xl font-semibold">{p.title}</h2>
              <p className="mt-2 text-slate-700 dark:text-slate-300 leading-relaxed">
                {p.subtitle}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                <span>
                  {new Date(p.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                  })}
                </span>
                <span aria-hidden>·</span>
                <span>{p.readingTime} read</span>
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
