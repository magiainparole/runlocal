import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "openSUSE: free distributions and resources for local AI",
  description:
    "A practical map of the openSUSE project's free products, documentation, community resources, and the line where SUSE's paid enterprise offerings begin."
};

type Distro = {
  name: string;
  tagline: string;
  releaseModel: string;
  bestFor: string;
  url: string;
};

const distros: Distro[] = [
  {
    name: "openSUSE Leap",
    tagline: "The stable point-release distribution.",
    releaseModel: "Annual major release with long-term updates",
    bestFor:
      "Servers, workstations and AI labs that want predictability over the latest packages. Shares a binary heritage with SUSE Linux Enterprise Server.",
    url: "https://www.opensuse.org/#Leap"
  },
  {
    name: "openSUSE Tumbleweed",
    tagline: "The rolling release for people who want everything current.",
    releaseModel: "Rolling, daily snapshots, fully tested before release",
    bestFor:
      "Developer machines and bleeding-edge AI experimentation. Tumbleweed often gets new CUDA, ROCm and Python releases days after upstream.",
    url: "https://www.opensuse.org/#Tumbleweed"
  },
  {
    name: "openSUSE Slowroll",
    tagline: "Tumbleweed, paced.",
    releaseModel: "Tumbleweed snapshots, slowed to roughly monthly batches",
    bestFor:
      "People who like rolling releases but find Tumbleweed too fast for production workstations. A middle path between Leap and Tumbleweed.",
    url: "https://en.opensuse.org/Portal:Slowroll"
  },
  {
    name: "openSUSE Leap Micro",
    tagline: "Immutable container host built on Leap.",
    releaseModel: "Atomic updates, transactional rollback",
    bestFor:
      "Running containers, Kubernetes nodes, or edge inference servers. Pairs naturally with K3s for self-hosted AI clusters.",
    url: "https://get.opensuse.org/leapmicro/"
  },
  {
    name: "openSUSE MicroOS",
    tagline: "Immutable desktop and server, atomic by design.",
    releaseModel: "Rolling, transactional, automatic rollback on failure",
    bestFor:
      "Anyone who wants the Tumbleweed package set with snapshot-based safety. Good base for a dedicated AI inference appliance.",
    url: "https://microos.opensuse.org/"
  },
  {
    name: "openSUSE Kalpa",
    tagline: "Immutable KDE desktop on top of MicroOS.",
    releaseModel: "Rolling, atomic, Flatpak-first",
    bestFor:
      "Desktop users who want an OS that updates without breaking. A modern alternative to the traditional Tumbleweed workstation install.",
    url: "https://kalpa.opensuse.org/"
  }
];

export default function OpenSusePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <header className="mb-12">
        <p className="text-sm font-medium text-brand-dark dark:text-brand-light tracking-wide uppercase mb-3">
          openSUSE · Free and community-driven
        </p>
        <h1 className="text-4xl font-bold tracking-tight">
          openSUSE: a community Linux that runs AI workloads honestly.
        </h1>
        <p className="mt-4 text-slate-700 dark:text-slate-300 leading-relaxed max-w-3xl">
          openSUSE is the community side of the SUSE family. It ships fully free
          distributions, public documentation, an open build service and a
          welcoming forum. For people running local AI, openSUSE is one of the
          most pragmatic options on Linux: the rolling Tumbleweed branch keeps
          CUDA, ROCm and Python stacks current, the immutable variants like
          MicroOS and Leap Micro make excellent container hosts, and the
          enterprise offerings of SUSE (paid) live cleanly alongside without
          forcing you to upgrade.
        </p>
      </header>

      {/* Section 1: Distributions */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-2">Free distributions</h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 max-w-3xl">
          Six distributions, all free as in price and as in code. Pick by
          release model first, by use case second.
        </p>
        <div className="grid sm:grid-cols-2 gap-5">
          {distros.map((d) => (
            <article
              key={d.name}
              className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-ink-soft p-5 hover:border-brand transition"
            >
              <h3 className="text-lg font-semibold">{d.name}</h3>
              <p className="text-sm text-brand-dark dark:text-brand-light mt-0.5">
                {d.tagline}
              </p>
              <dl className="mt-3 text-sm space-y-2">
                <div>
                  <dt className="text-[10px] uppercase tracking-wide text-slate-500">
                    Release model
                  </dt>
                  <dd>{d.releaseModel}</dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-wide text-slate-500">
                    Best for
                  </dt>
                  <dd className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    {d.bestFor}
                  </dd>
                </div>
              </dl>
              <Link
                href={d.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-sm text-brand-dark dark:text-brand-light hover:underline"
              >
                Get it from opensuse.org →
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* Section 2: Documentation */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-3">Documentation and guides</h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed max-w-3xl mb-5">
          openSUSE keeps its documentation public, current and translated. Most
          guides exist in English, German and Italian, with partial coverage in
          a dozen other languages. The wiki is the main entry point; the
          handbook is what you actually print and keep.
        </p>
        <ul className="space-y-3 text-sm">
          <li className="rounded-lg border border-slate-200 dark:border-slate-800 p-4">
            <Link
              href="https://doc.opensuse.org"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:text-brand-dark dark:hover:text-brand-light"
            >
              doc.opensuse.org →
            </Link>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              The official documentation portal. Handbooks for Leap and
              Tumbleweed, system administration guides, AutoYaST and Salt
              references. PDF and HTML formats.
            </p>
          </li>
          <li className="rounded-lg border border-slate-200 dark:border-slate-800 p-4">
            <Link
              href="https://en.opensuse.org/Portal:Documentation"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:text-brand-dark dark:hover:text-brand-light"
            >
              wiki.opensuse.org →
            </Link>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              Community wiki. Faster to find specific how-tos here than in the
              handbook: GPU drivers, NVIDIA CUDA setup, virtualization, network
              configuration, package management edge cases.
            </p>
          </li>
          <li className="rounded-lg border border-slate-200 dark:border-slate-800 p-4">
            <Link
              href="https://en.opensuse.org/openSUSE:Documentation_team_wiki"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:text-brand-dark dark:hover:text-brand-light"
            >
              Documentation team →
            </Link>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              How to contribute documentation. Useful for anyone who wants to
              see a specific topic better covered: the team accepts pull
              requests directly.
            </p>
          </li>
        </ul>
      </section>

      {/* Section 3: Community */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-3">Community, forum and infrastructure</h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed max-w-3xl mb-5">
          openSUSE has three pillars of community infrastructure, all free to
          use. The forum is where most user-level questions get answered; the
          Open Build Service is where packages are built for every supported
          architecture; the bug tracker is the place to file real issues that
          benefit from being public.
        </p>
        <ul className="space-y-3 text-sm">
          <li className="rounded-lg border border-slate-200 dark:border-slate-800 p-4">
            <Link
              href="https://forums.opensuse.org"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:text-brand-dark dark:hover:text-brand-light"
            >
              forums.opensuse.org →
            </Link>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              Long-running community forum. Searchable history of installation
              questions, hardware compatibility, driver issues. Often faster
              than Stack Exchange for SUSE-specific problems.
            </p>
          </li>
          <li className="rounded-lg border border-slate-200 dark:border-slate-800 p-4">
            <Link
              href="https://build.opensuse.org"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:text-brand-dark dark:hover:text-brand-light"
            >
              build.opensuse.org (OBS) →
            </Link>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              The Open Build Service. Public infrastructure for building Linux
              packages for openSUSE, SLE, Fedora, Debian and others from the
              same sources. Free to use for community projects.
            </p>
          </li>
          <li className="rounded-lg border border-slate-200 dark:border-slate-800 p-4">
            <Link
              href="https://bugzilla.opensuse.org"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:text-brand-dark dark:hover:text-brand-light"
            >
              bugzilla.opensuse.org →
            </Link>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              The bug tracker. Faster than expected for triage on Tumbleweed
              regressions and AI-stack packaging issues.
            </p>
          </li>
          <li className="rounded-lg border border-slate-200 dark:border-slate-800 p-4">
            <Link
              href="https://www.suse.com/c/category/webinar/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:text-brand-dark dark:hover:text-brand-light"
            >
              SUSE webinars and webcasts →
            </Link>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              The commercial side of the project runs free webinars covering
              Linux, Kubernetes, DevOps, AI deployment. Some are sales-flavoured
              but the technical ones are useful. Registration required, no
              charge.
            </p>
          </li>
        </ul>
      </section>

      {/* Section 4: What stays paid */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-3">What stays paid (and why that is fine)</h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed max-w-3xl mb-5">
          SUSE, the company that sponsors openSUSE, sells enterprise products
          on top of the same upstream code. The line is honest and well
          marked: openSUSE is free, complete and fully usable in production;
          SUSE enterprise products add long-term support contracts,
          certifications, and integration packages that customers in regulated
          industries are willing to pay for. None of the paid features are
          paywalls on top of openSUSE, they are different products.
        </p>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5 bg-slate-50/50 dark:bg-slate-900/30 text-sm leading-relaxed">
          <ul className="space-y-2 text-slate-700 dark:text-slate-300">
            <li>
              <strong>SUSE Linux Enterprise Server (SLES)</strong> — paid LTS
              counterpart of Leap, with long-term support and certifications
              for SAP, public sector, finance.
            </li>
            <li>
              <strong>SUSE Rancher Prime</strong> — paid Kubernetes platform
              with the Liz agentic AI assistant for cluster operations. The
              open-source Rancher project remains free.
            </li>
            <li>
              <strong>SUSE AI</strong> — paid sovereign AI stack on top of
              Rancher Prime, with zero-trust security, observability and
              private-model deployment patterns.
            </li>
            <li>
              <strong>SUSE Sovereign Premium Support</strong> — paid premium
              support tier with EU-based engineers and EU-hosted support data,
              relevant for organisations bound by EU jurisdiction
              requirements.
            </li>
          </ul>
          <p className="mt-4 text-slate-600 dark:text-slate-400">
            If you want the openSUSE community side without the enterprise
            footprint, none of the above is required. The free distributions
            run the same kernel, libraries and tooling. The paid line exists
            for the organisations that need to write a contract against it.
          </p>
        </div>
      </section>

      <aside className="rounded-xl bg-brand/5 border border-brand/30 p-5 text-sm leading-relaxed">
        <h3 className="font-semibold mb-2">Where to start, depending on what you want to do</h3>
        <ul className="space-y-1.5 text-slate-700 dark:text-slate-300">
          <li>
            <strong>Run local LLMs on a workstation:</strong> install
            Tumbleweed, add the NVIDIA repository, install CUDA drivers, then
            follow the{" "}
            <Link href="/guides/ollama" className="text-brand-dark dark:text-brand-light hover:underline">
              Ollama guide
            </Link>{" "}
            or the{" "}
            <Link href="/guides/llama-cpp" className="text-brand-dark dark:text-brand-light hover:underline">
              llama.cpp guide
            </Link>
            .
          </li>
          <li>
            <strong>Build a home inference server:</strong> install MicroOS or
            Leap Micro, deploy K3s for container orchestration, run an
            OpenAI-compatible server like vLLM in a pod.
          </li>
          <li>
            <strong>Daily-driver desktop with AI workloads:</strong> Kalpa for
            immutability and atomic rollback, or Tumbleweed if you want full
            control over the package set.
          </li>
        </ul>
      </aside>
    </div>
  );
}
