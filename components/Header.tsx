"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

const nav = [
  { href: "/picker", label: "Picker" },
  { href: "/models", label: "Models" },
  { href: "/tools", label: "Tools" },
  { href: "/guides", label: "Guides" },
  { href: "/opensuse", label: "openSUSE" },
  { href: "/blog", label: "Blog" },
  { href: "/glossary", label: "Glossary" }
];

export default function Header() {
  const [open, setOpen] = useState(false);

  // Lock body scroll when the mobile menu is open.
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-30 backdrop-blur bg-white/80 dark:bg-ink/80 border-b border-slate-200/60 dark:border-slate-800/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-20">
        <Link
          href="/"
          className="flex items-center gap-2"
          aria-label="RunLocal home"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/logo.png"
            alt="RunLocal"
            width={320}
            height={72}
            priority
            className="h-12 sm:h-14 w-auto"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="text-slate-700 dark:text-slate-300 hover:text-brand-dark dark:hover:text-brand-light transition"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <Link
          href="/guides/ollama"
          className="hidden md:inline-flex items-center gap-2 rounded-md bg-ink text-white dark:bg-brand-light dark:text-ink px-3.5 py-1.5 text-sm font-medium hover:bg-brand-dark dark:hover:bg-brand transition"
        >
          Start with Ollama
        </Link>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        >
          {open ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <div
          id="mobile-nav"
          className="md:hidden fixed inset-x-0 top-20 bottom-0 z-30 bg-white dark:bg-ink border-t border-slate-200 dark:border-slate-800 overflow-y-auto"
        >
          <nav className="max-w-6xl mx-auto px-4 sm:px-6 py-6 flex flex-col gap-1">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="block rounded-md px-3 py-3 text-base font-medium text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                {n.label}
              </Link>
            ))}

            <Link
              href="/guides/ollama"
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-md bg-ink text-white dark:bg-brand-light dark:text-ink px-4 py-3 text-base font-medium hover:bg-brand-dark dark:hover:bg-brand transition"
            >
              Start with Ollama
            </Link>

            <p className="mt-6 text-xs text-slate-500 dark:text-slate-400 text-center">
              runlocal.blog · Hardware-aware · Open source · Updated weekly
            </p>
          </nav>
        </div>
      )}
    </header>
  );
}
