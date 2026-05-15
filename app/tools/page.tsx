import type { Metadata } from "next";
import ToolCard from "@/components/ToolCard";
import { tools } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Tools for running AI locally",
  description:
    "Runtimes, GUIs, inference servers and orchestration tools for running open source AI on your own hardware."
};

const categories = ["Runtime", "GUI", "Server", "Orchestrator", "Framework"] as const;

export default function ToolsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <header className="mb-10">
        <p className="text-sm font-medium text-brand-dark dark:text-brand-light tracking-wide uppercase mb-3">
          Tool catalog
        </p>
        <h1 className="text-4xl font-bold tracking-tight">
          The software stack for running open weights at home or in production.
        </h1>
        <p className="mt-4 text-slate-700 dark:text-slate-300 max-w-3xl leading-relaxed">
          Picking an inference tool is mostly about matching your workload to
          its strengths. A single user on a laptop wants something different
          from a team serving requests at scale. The categories below cover the
          full path from one-line install to multi-GPU production.
        </p>
      </header>

      {categories.map((cat) => {
        const list = tools.filter((t) => t.category === cat);
        if (list.length === 0) return null;
        return (
          <section key={cat} className="mb-10">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-3">
              <span>{cat}</span>
              <span className="text-xs text-slate-500 font-normal">
                {list.length} entr{list.length > 1 ? "ies" : "y"}
              </span>
            </h2>
            <div className="grid sm:grid-cols-2 gap-5">
              {list.map((t) => (
                <ToolCard key={t.slug} tool={t} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
