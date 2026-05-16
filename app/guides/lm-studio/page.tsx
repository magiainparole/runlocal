import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "LM Studio setup and side-by-side model evaluation",
  description:
    "A practical walkthrough for using LM Studio to download, compare and serve local models, plus when LM Studio is the wrong tool."
};

export default function LmStudioGuide() {
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12 prose-content">
      <p className="text-sm font-medium text-brand-dark dark:text-brand-light tracking-wide uppercase mb-2">
        Install guide · Beginner · 12 min
      </p>
      <h1 className="text-4xl font-bold tracking-tight">
        LM Studio setup and side-by-side model evaluation
      </h1>

      <aside className="mt-5 rounded-md border border-brand/30 bg-brand/5 p-4 text-sm leading-relaxed">
        <strong className="text-slate-900 dark:text-slate-100">Before you start:</strong>{" "}
        LM Studio is a free desktop app with a nice chat interface. It
        works on Mac, Windows and Linux. Unlike Ollama, which is best for
        running one model you have already chosen, LM Studio is best when
        you want to try a few models and compare them. You need at least
        16 GB of RAM for a useful experience.
      </aside>

      <p className="mt-5 text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
        LM Studio is the most polished desktop client for running open weights
        on your machine. It uses llama.cpp underneath, adds a model browser
        wired to Hugging Face, a chat UI, and a one-click OpenAI-compatible
        server. The shortest way to describe its niche: it is the tool you
        reach for when you want to evaluate three or four models against the
        same prompts before committing to one.
      </p>

      <h2>When LM Studio is the right tool</h2>
      <p>
        LM Studio earns its disk space when you are still deciding which model
        to run. The chat UI with side-by-side comparison makes it trivial to
        run the same prompt against several models and watch their answers
        appear in parallel. For one-shot &ldquo;just run a chat against this
        model&rdquo; workflows, Ollama is faster; for production serving with
        concurrent users, vLLM is a different category of tool. LM Studio sits
        in the middle, intentionally.
      </p>

      <h2>Step 1. Install</h2>
      <p>
        Download the installer from{" "}
        <Link href="https://lmstudio.ai" target="_blank" rel="noopener noreferrer">
          lmstudio.ai
        </Link>
        . Builds exist for macOS (Apple Silicon and Intel), Windows, and
        Linux (AppImage). The free tier covers personal use and most business
        scenarios; check the license page if you plan a large internal
        deployment.
      </p>

      <h2>Step 2. Pick a first model</h2>
      <p>
        Open the app, head to the Discover tab, and search Hugging Face from
        inside LM Studio. A few sensible defaults to start with:
      </p>
      <ul>
        <li>
          <strong>Llama 3.1 8B Instruct</strong> for general chat on machines
          with at least 16 GB of memory.
        </li>
        <li>
          <strong>Qwen 2.5 14B Instruct</strong> if you have 24 GB or more and
          want noticeably better reasoning.
        </li>
        <li>
          <strong>Phi-5 7B</strong> for fast inference on lighter hardware.
        </li>
      </ul>
      <p>
        For each model, LM Studio lists the available GGUF quantizations from
        community uploaders. Look for files tagged <code>Q4_K_M</code> as a
        starting point and check the &ldquo;Compatible with your hardware&rdquo;
        indicator before downloading.
      </p>

      <h2>Step 3. Configure the chat</h2>
      <p>
        Open the Chat tab and load your downloaded model. Three knobs to know:
      </p>
      <ul>
        <li>
          <strong>GPU offload layers.</strong> Setting it as high as your VRAM
          allows is almost always right. LM Studio shows an estimate of how
          much memory each setting will use.
        </li>
        <li>
          <strong>Context length.</strong> Larger contexts use more memory.
          Start at the model&apos;s training length, lower it if you are tight
          on VRAM.
        </li>
        <li>
          <strong>System prompt.</strong> Leave it empty unless you have a
          reason to constrain the model; many UI templates apply their own
          system prompts that interact badly with custom ones.
        </li>
      </ul>

      <h2>Step 4. Run side-by-side comparisons</h2>
      <p>
        The Multi-Model session lets you load two or three models and send the
        same prompt to all of them. This is where LM Studio earns its keep.
        Set up a prompt set that represents the kind of work you actually do
        (a coding task, a summarization, a reasoning question), then watch the
        answers stream in parallel. Decisions made this way tend to hold up
        better than benchmark numbers from leaderboards.
      </p>
      <p>
        A useful evaluation kit, kept small on purpose:
      </p>
      <ol>
        <li>One factual question that has a wrong-sounding correct answer.</li>
        <li>One short coding task with a tricky edge case.</li>
        <li>One summarization of a passage longer than 1,500 words.</li>
        <li>One follow-up question that tests whether the model retained the prior turn.</li>
        <li>One refusal-test prompt to see how each model handles boundaries.</li>
      </ol>

      <h2>Step 5. Start the local server</h2>
      <p>
        Head to the Developer tab, load a model, and click Start Server. LM
        Studio exposes an OpenAI-compatible API on{" "}
        <code>http://localhost:1234/v1</code>. Any client that lets you
        override the API base URL works against it. Toggle CORS in the server
        settings if you plan to call it from a browser.
      </p>
      <pre><code>{`# Test it from the terminal
curl http://localhost:1234/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "loaded-model-id",
    "messages": [{"role": "user", "content": "Hello in 5 words."}]
  }'`}</code></pre>

      <h2>Tips that save time</h2>
      <ul>
        <li>
          Store models on the largest drive you have. LM Studio has a setting
          for the model directory; pointing it at an external SSD avoids
          filling the boot disk.
        </li>
        <li>
          Use the &ldquo;Estimate&rdquo; column in the model browser. The
          numbers are usually accurate within 10% on Apple Silicon and within
          15% on NVIDIA.
        </li>
        <li>
          For coding, set the chat template explicitly. LM Studio auto-detects
          it most of the time, but a wrong template silently degrades quality
          and is hard to debug.
        </li>
      </ul>

      <h2>When to graduate from LM Studio</h2>
      <p>
        Two natural exits. If you settle on a single model and want it
        permanently available with a small footprint, move it to{" "}
        <Link href="/guides/ollama">Ollama</Link>. If you want maximum speed
        on Apple Silicon or fine quantization control, build{" "}
        <Link href="/guides/llama-cpp">llama.cpp</Link> from source. LM Studio
        is a good evaluation environment; it is not the best long-term home
        for either single-user productivity or multi-user serving.
      </p>
    </article>
  );
}
