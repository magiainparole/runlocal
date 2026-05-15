import Link from "next/link";

export default function Footer() {
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
          <p className="text-slate-600 dark:text-slate-400 max-w-xs">
            Independent coverage of the open source AI ecosystem, with hands-on
            guides for running models on your own hardware.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Explore</h4>
          <ul className="space-y-1.5 text-slate-600 dark:text-slate-400">
            <li><Link href="/models" className="hover:text-brand-dark dark:hover:text-brand-light">Models</Link></li>
            <li><Link href="/tools" className="hover:text-brand-dark dark:hover:text-brand-light">Tools</Link></li>
            <li><Link href="/guides" className="hover:text-brand-dark dark:hover:text-brand-light">Install guides</Link></li>
            <li><Link href="/blog" className="hover:text-brand-dark dark:hover:text-brand-light">Blog</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">About</h4>
          <ul className="space-y-1.5 text-slate-600 dark:text-slate-400">
            <li>Editorially independent.</li>
            <li>No affiliate links on tool pages.</li>
            <li>Last reviewed: May 2026.</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-200/60 dark:border-slate-800/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 text-xs text-slate-500 flex flex-wrap items-center justify-between gap-2">
          <span>&copy; {new Date().getFullYear()} RunLocal. All content licensed CC BY 4.0 unless noted.</span>
          <span>Built with Next.js and Tailwind. No tracking, no ads.</span>
        </div>
      </div>
    </footer>
  );
}
