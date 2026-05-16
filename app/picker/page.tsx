import type { Metadata } from "next";
import PickerForm from "@/components/PickerForm";

export const metadata: Metadata = {
  title: "Find the right local LLM for your hardware",
  description:
    "Interactive recommender. Tell us your GPU, memory and use case; we suggest open weight models that will actually run well, with install commands ready to paste."
};

export default function PickerPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <header className="mb-10">
        <p className="text-sm font-medium text-brand-dark dark:text-brand-light tracking-wide uppercase mb-3">
          Picker · Hardware-aware recommender
        </p>
        <h1 className="text-4xl font-bold tracking-tight">
          Which AI model can your computer actually run?
        </h1>
        <p className="mt-4 text-slate-700 dark:text-slate-300 max-w-3xl leading-relaxed">
          Different AI models need different amounts of memory. A small
          model fits on a phone, a frontier-grade model needs a workstation.
          Tell us what hardware you have and what you want to do, and the
          tool will suggest the best options that will actually run on your
          machine. The form updates as you type. Nothing is sent to a
          server.
        </p>
        <details className="mt-4 max-w-3xl text-sm">
          <summary className="cursor-pointer text-brand-dark dark:text-brand-light font-medium">
            How do I find my specs?
          </summary>
          <div className="mt-3 rounded-md border border-slate-200 dark:border-slate-800 p-4 space-y-2 text-slate-700 dark:text-slate-300 leading-relaxed">
            <p>
              <strong>On a Mac:</strong> click the Apple menu → About This
              Mac. The number next to &quot;Memory&quot; is your unified
              memory. Pick &quot;Apple Silicon&quot; in the form below.
            </p>
            <p>
              <strong>On Windows with an NVIDIA GPU:</strong> open Task
              Manager → Performance → GPU. The number next to
              &quot;Dedicated GPU memory&quot; is your VRAM. Pick
              &quot;NVIDIA GPU&quot; in the form below.
            </p>
            <p>
              <strong>On Windows or Linux without a discrete GPU:</strong>{" "}
              pick &quot;CPU only&quot; and enter your system RAM. AI will
              run slowly, but it will run.
            </p>
            <p>
              Not sure which terms apply? Open the{" "}
              <a href="/glossary" className="text-brand-dark dark:text-brand-light hover:underline">
                glossary
              </a>
              {" "}in a new tab.
            </p>
          </div>
        </details>
      </header>

      <PickerForm />

      <section className="mt-16 rounded-xl border border-slate-200 dark:border-slate-800 p-6 text-sm leading-relaxed">
        <h2 className="text-lg font-semibold mb-3">How the tool decides</h2>
        <p className="text-slate-700 dark:text-slate-300 mb-3">
          Every model in the catalog is paired with realistic memory
          estimates per quantization (Q4_K_M, Q5_K_M, Q8_0) at a moderate
          8k context. The recommender computes your usable memory by
          subtracting a small system overhead (six gigabytes on Apple
          Silicon, two gigabytes on a discrete GPU, four gigabytes on
          CPU-only setups), then requires the chosen model to fit with a
          fifteen percent safety margin. Anything that does not fit lands
          in the excluded list below the results, with the reason printed
          out. The ranking that follows weights use-case fit most heavily,
          then quantization quality, then recency of the release, with a
          modest bonus for models that leave breathing room rather than
          filling the memory to the brim.
        </p>
        <p className="text-slate-700 dark:text-slate-300">
          Memory estimates are rounded for clarity. Actual usage depends on
          context length, batch size, and which inference engine you run.
          If a model is on the edge of fitting, give it a try at a smaller
          context first.
        </p>
      </section>
    </div>
  );
}
