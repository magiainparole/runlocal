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
          The software you need to actually run an AI model.
        </h1>
        <p className="mt-4 text-slate-700 dark:text-slate-300 max-w-3xl leading-relaxed">
          A model is just a file. To use it, you need software that loads
          the file and lets you talk to it. The tools below cover everything
          from one-click chat apps for beginners to industrial servers for
          teams, and a few that need a workstation with more memory than
          most laptops have disk. Pick by category: a Runtime is the engine,
          a GUI is the friendly app on top, a Server is for sharing it with
          multiple users at once. Where an entry has a hardware floor, its
          trade-offs say so first. If you are just starting,{" "}
          <a href="/guides/ollama" className="text-brand-dark dark:text-brand-light hover:underline">
            Ollama
          </a>
          {" "}is the easiest entry point.
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
