import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Install Ollama and run your first local model",
  description:
    "From zero to a working local LLM in about ten minutes. Install Ollama, pull a model, chat from the terminal, and expose an OpenAI-compatible API."
};

export default function OllamaGuide() {
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12 prose-content">
      <p className="text-sm font-medium text-brand-dark dark:text-brand-light tracking-wide uppercase mb-2">
        Install guide · Beginner · 10 min
      </p>
      <h1 className="text-4xl font-bold tracking-tight">
        Install Ollama and run your first local model
      </h1>
      <p className="mt-4 text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
        Ollama is the shortest path to a local large language model. It handles
        downloading, quantization, GPU offloading, and exposes an
        OpenAI-compatible API on <code>localhost:11434</code>. This guide takes
        you from a clean machine to a working setup in roughly ten minutes.
      </p>

      <h2>What you need before starting</h2>
      <p>
        Ollama runs on macOS, Linux and Windows. The amount of RAM you have is
        the main thing that decides which models you can realistically load.
        A short reference: an 8B model in 4-bit quantization needs about 5 GB
        of memory, a 14B around 9 GB, a 32B around 20 GB, a 70B around 42 GB.
        Apple Silicon Macs benefit from unified memory; on a discrete-GPU PC
        the model needs to fit in VRAM for full speed, otherwise Ollama spills
        to system RAM at a substantial speed cost.
      </p>

      <h2>Step 1. Install Ollama</h2>
      <p>
        On <strong>macOS and Windows</strong>, download the installer from{" "}
        <Link href="https://ollama.com/download" target="_blank" rel="noopener noreferrer">
          ollama.com/download
        </Link>
        . The macOS build runs as a menu-bar app, the Windows build adds a
        system tray icon. Both expose the <code>ollama</code> command on your
        path.
      </p>
      <p>
        On <strong>Linux</strong>, the official script does the right thing on
        most distributions:
      </p>
      <pre><code>{`curl -fsSL https://ollama.com/install.sh | sh`}</code></pre>
      <p>
        The script registers a systemd service named <code>ollama.service</code>{" "}
        and starts the daemon. Check that everything is wired up:
      </p>
      <pre><code>{`ollama --version
systemctl status ollama   # Linux only`}</code></pre>

      <h2>Step 2. Pull a first model</h2>
      <p>
        For a first run, pick a small model so you can see Ollama working
        before tying up bandwidth on something larger. Llama 3.1 8B or Qwen
        3.5 7B are sensible defaults; both run well on 16 GB of memory and
        finish their downloads in a few minutes on a normal connection.
      </p>
      <pre><code>{`ollama pull llama3.1:8b`}</code></pre>
      <p>
        Ollama caches models under <code>~/.ollama/models</code> on macOS and
        Linux, and under <code>%USERPROFILE%\\.ollama\\models</code> on
        Windows. If your home volume is small, set the{" "}
        <code>OLLAMA_MODELS</code> environment variable before starting the
        service to point at a larger disk.
      </p>

      <h2>Step 3. Chat with the model from the terminal</h2>
      <pre><code>{`ollama run llama3.1:8b`}</code></pre>
      <p>
        You will get an interactive prompt. Try a question and watch the
        tokens stream back. To exit, type <code>/bye</code>. To list local
        models, run <code>ollama list</code>. To remove one, run{" "}
        <code>ollama rm llama3.1:8b</code>.
      </p>

      <h2>Step 4. Use the OpenAI-compatible API</h2>
      <p>
        Ollama exposes an HTTP API on <code>http://localhost:11434</code>. The
        OpenAI-compatible endpoint lives at <code>/v1</code>, which means most
        clients written for the OpenAI Python or JavaScript SDKs work with a
        two-line change. Set the base URL and a placeholder API key:
      </p>
      <pre><code>{`# Python
from openai import OpenAI

client = OpenAI(
    base_url="http://localhost:11434/v1",
    api_key="ollama",
)

response = client.chat.completions.create(
    model="llama3.1:8b",
    messages=[{"role": "user", "content": "Explain MoE in two sentences."}],
)
print(response.choices[0].message.content)`}</code></pre>
      <p>
        The same trick works in any tool that lets you override the API base
        URL: VS Code AI extensions, LangChain, LlamaIndex, OpenWebUI, and most
        chat clients on the desktop.
      </p>

      <h2>Step 5. Tune for your hardware</h2>
      <p>
        Two environment variables matter on day one. <code>OLLAMA_NUM_PARALLEL</code>{" "}
        sets how many concurrent requests Ollama serves; the default is fine
        for personal use, but raise it for shared developer servers.{" "}
        <code>OLLAMA_KEEP_ALIVE</code> controls how long Ollama keeps a model
        in memory after the last request; the default of five minutes is wasted
        time if you are using the same model all day.
      </p>
      <pre><code>{`# Linux
sudo systemctl edit ollama
# add the following under [Service]
Environment="OLLAMA_NUM_PARALLEL=4"
Environment="OLLAMA_KEEP_ALIVE=24h"
sudo systemctl restart ollama`}</code></pre>

      <h2>Step 6. Pick a real model for your workload</h2>
      <p>
        Once the plumbing works, the right model depends on what you do with
        it. For everyday writing and chat, Llama 3.1 8B or Qwen 3.5 14B are
        sensible. For coding, try Qwen 2.5 Coder, DeepSeek Coder, or Codestral.
        For long documents and retrieval, look at Llama 4 Scout if you have
        the hardware. The{" "}
        <Link href="/models">model directory</Link> covers what each family
        is actually good at.
      </p>

      <h2>Troubleshooting the most common issues</h2>
      <h3>The model loads but answers are extremely slow</h3>
      <p>
        Almost always a sign that the model has spilled out of VRAM into
        system RAM. Either pick a smaller quantization (the <code>:q4_K_M</code>{" "}
        tag is a good middle ground) or a smaller model. On Apple Silicon,
        check that Ollama is using the Metal backend — recent versions do this
        automatically.
      </p>
      <h3>Ollama cannot find your GPU</h3>
      <p>
        On Linux with NVIDIA cards, install a current driver and the CUDA
        toolkit before installing Ollama. On Windows, recent NVIDIA drivers
        include CUDA support out of the box. AMD ROCm support is present but
        less smooth; the project tracks compatibility on its GitHub.
      </p>
      <h3>The API returns 404 on /v1/chat/completions</h3>
      <p>
        You are probably on an older Ollama version. The OpenAI-compatible
        layer arrived in 2024 and has been stable since. Update with{" "}
        <code>brew upgrade ollama</code> on macOS, the installer on Windows,
        or the install script on Linux.
      </p>

      <h2>Where to go next</h2>
      <p>
        With Ollama running, two natural next steps. Add{" "}
        <Link href="/tools">Open WebUI</Link> for a chat interface that other
        people on your network can use, or wire Ollama into a coding workflow
        with Continue.dev in VS Code. For maximum performance on a single
        machine, the{" "}
        <Link href="/guides/llama-cpp">llama.cpp guide</Link> walks through
        a from-source build with hand-tuned quantization.
      </p>
    </article>
  );
}
