"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Routes that have an Italian counterpart under /it. Anything else falls
// back to the Italian home when switching to IT.
const IT_ROUTES = new Set([
  "/",
  "/picker",
  "/models",
  "/frontier",
  "/trending",
  "/tools",
  "/guides",
  "/blog",
  "/glossary",
  "/opensuse"
]);

export default function LanguageSwitcher() {
  const pathname = usePathname() || "/";
  const isItalian = pathname === "/it" || pathname.startsWith("/it/");

  // Compute the counterpart URL.
  let target: string;
  if (isItalian) {
    const enPath = pathname.replace(/^\/it/, "") || "/";
    target = enPath;
  } else {
    target = IT_ROUTES.has(pathname) ? (pathname === "/" ? "/it" : `/it${pathname}`) : "/it";
  }

  return (
    <Link
      href={target}
      aria-label={isItalian ? "Switch to English" : "Passa all'italiano"}
      title={isItalian ? "English version" : "Versione italiana"}
      className="inline-flex items-center gap-1 rounded-md border border-slate-200 dark:border-slate-700 px-2 py-1 text-sm hover:border-brand transition"
    >
      <span aria-hidden>{isItalian ? "🇬🇧" : "🇮🇹"}</span>
      <span className="hidden sm:inline text-xs font-medium text-slate-600 dark:text-slate-300">
        {isItalian ? "EN" : "IT"}
      </span>
    </Link>
  );
}
