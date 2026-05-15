import Link from "next/link";
import Image from "next/image";

const nav = [
  { href: "/picker", label: "Picker" },
  { href: "/models", label: "Models" },
  { href: "/tools", label: "Tools" },
  { href: "/guides", label: "Guides" },
  { href: "/opensuse", label: "openSUSE" },
  { href: "/blog", label: "Blog" }
];

export default function Header() {
  return (
    <header className="sticky top-0 z-30 backdrop-blur bg-white/80 dark:bg-ink/80 border-b border-slate-200/60 dark:border-slate-800/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-20">
        <Link href="/" className="flex items-center gap-2" aria-label="RunLocal home">
          <Image
            src="/logo.png"
            alt="RunLocal"
            width={320}
            height={72}
            priority
            className="h-12 sm:h-14 w-auto"
          />
        </Link>
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
        <Link
          href="/guides/ollama"
          className="hidden sm:inline-flex items-center gap-2 rounded-md bg-ink text-white dark:bg-brand-light dark:text-ink px-3.5 py-1.5 text-sm font-medium hover:bg-brand-dark dark:hover:bg-brand transition"
        >
          Start with Ollama
        </Link>
      </div>
    </header>
  );
}
