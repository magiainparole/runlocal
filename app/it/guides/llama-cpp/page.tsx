import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Compilare ed eseguire llama.cpp dai sorgenti",
  description:
    "Come compilare llama.cpp con il backend giusto per il tuo hardware, scegliere una quantizzazione GGUF che stia nella RAM e servire un endpoint compatibile OpenAI.",
  alternates: {
    canonical: "https://runlocal.blog/it/guides/llama-cpp",
    languages: {
      en: "https://runlocal.blog/guides/llama-cpp",
      it: "https://runlocal.blog/it/guides/llama-cpp"
    }
  }
};

export default function LlamaCppGuideIt() {
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12 prose-content">
      <p className="text-sm font-medium text-brand-dark dark:text-brand-light tracking-wide uppercase mb-2">
        Guida all&apos;installazione · Intermedio · 20 min
      </p>
      <h1 className="text-4xl font-bold tracking-tight">
        Compilare ed eseguire llama.cpp dai sorgenti
      </h1>

      <aside className="mt-5 rounded-md border border-amber-300/60 bg-amber-50 dark:bg-amber-950/30 p-4 text-sm leading-relaxed">
        <strong className="text-slate-900 dark:text-slate-100">Attenzione:</strong>{" "}
        questa guida è pensata per chi ha dimestichezza con la riga di
        comando ed è disposto a compilare software dai sorgenti. Se vuoi
        solo eseguire AI in locale senza complicazioni, installa{" "}
        <Link href="/it/guides/ollama">Ollama</Link>. Torna qui quando
        cercherai il massimo delle prestazioni o le funzionalità più
        recenti.
      </aside>

      <p className="mt-5 text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
        llama.cpp è l&apos;implementazione di riferimento in C e C++ alla base
        della maggior parte degli strumenti per LLM locali, inclusi Ollama e
        LM Studio. Compilarlo dai sorgenti ti dà un controllo più fine su
        quantizzazione, sampling e backend di accelerazione da usare. Su
        Apple Silicon tende anche a essere la via più veloce.
      </p>

      <h2>Quando usare llama.cpp direttamente</h2>
      <p>
        Usa i binari upstream quando vuoi le ottimizzazioni più recenti
        (le release spesso precedono di settimane i pacchetti delle
        distribuzioni), quando ti serve uno schema di quantizzazione che i
        wrapper a valle non espongono, o quando vuoi scriptare un flusso di
        inferenza ad alto throughput senza un daemon in più. Per chattare
        ogni tanto la compilazione non vale la fatica; per quello esiste
        Ollama.
      </p>

      <h2>Passo 1. Installa la toolchain di compilazione</h2>
      <h3>macOS</h3>
      <pre><code>{`xcode-select --install
brew install cmake`}</code></pre>
      <h3>Linux (Debian / Ubuntu)</h3>
      <pre><code>{`sudo apt update
sudo apt install build-essential cmake git
# For NVIDIA acceleration:
sudo apt install nvidia-cuda-toolkit`}</code></pre>
      <h3>Windows</h3>
      <p>
        Installa Visual Studio Build Tools (con il workload C++), CMake e
        Git. Il CUDA toolkit è facoltativo ma consigliato su GPU NVIDIA.
        Con questi strumenti nel path, compilare da PowerShell è lineare.
      </p>

      <h2>Passo 2. Clona e compila</h2>
      <pre><code>{`git clone https://github.com/ggml-org/llama.cpp
cd llama.cpp

# Pick exactly one backend below.

# Apple Silicon (Metal):
cmake -B build -DGGML_METAL=ON
cmake --build build --config Release -j

# NVIDIA (CUDA):
cmake -B build -DGGML_CUDA=ON
cmake --build build --config Release -j

# AMD (ROCm):
cmake -B build -DGGML_HIP=ON -DAMDGPU_TARGETS=gfx1100
cmake --build build --config Release -j

# Vulkan (cross-vendor GPU, less mature):
cmake -B build -DGGML_VULKAN=ON
cmake --build build --config Release -j

# CPU-only:
cmake -B build
cmake --build build --config Release -j`}</code></pre>
      <p>
        La compilazione produce diversi binari in <code>build/bin/</code>. I
        due che userai di più sono <code>llama-cli</code> (chat interattiva) e{" "}
        <code>llama-server</code> (il server HTTP compatibile OpenAI).
      </p>

      <h2>Passo 3. Scegli una quantizzazione GGUF</h2>
      <p>
        llama.cpp usa il formato GGUF. Il suffisso di quantizzazione che
        scegli è il compromesso tra spazio su disco, uso di memoria e qualità.
        Tre varianti valgono come punto di partenza.
      </p>
      <ul>
        <li>
          <code>Q4_K_M</code> — la variante a 4 bit più diffusa. Buona
          qualità, ingombro contenuto, il default sensato per la maggior parte
          dell&apos;uso desktop.
        </li>
        <li>
          <code>Q5_K_M</code> — un miglioramento percepibile rispetto a Q4 con
          circa il 25% di memoria in più. Ne vale la pena quando hai margine.
        </li>
        <li>
          <code>Q8_0</code> — quantizzazione a 8 bit. Qualità molto vicina ai
          pesi originali, utile per benchmark o produzione dove la dimensione
          conta meno.
        </li>
      </ul>
      <p>
        I modelli già quantizzati si trovano su Hugging Face sotto account
        come <code>TheBloke</code>, <code>bartowski</code> e <code>unsloth</code>.
        Scegli il file GGUF che corrisponde alla quantizzazione che hai deciso.
      </p>
      <pre><code>{`# Example: Qwen 2.5 7B Instruct, Q4_K_M
huggingface-cli download bartowski/Qwen2.5-7B-Instruct-GGUF \\
  Qwen2.5-7B-Instruct-Q4_K_M.gguf \\
  --local-dir ./models --local-dir-use-symlinks False`}</code></pre>

      <h2>Passo 4. Prima inferenza</h2>
      <pre><code>{`./build/bin/llama-cli \\
  --model ./models/Qwen2.5-7B-Instruct-Q4_K_M.gguf \\
  --ctx-size 8192 \\
  --n-gpu-layers 999 \\
  --prompt "Explain how PagedAttention reduces KV cache memory."`}</code></pre>
      <p>
        Il flag <code>--n-gpu-layers</code> scarica sulla GPU tutti i layer
        che ci stanno. Impostarlo a un numero grande equivale a dire &ldquo;tutto
        quello che riesci&rdquo;. Se la VRAM non basta, llama.cpp si rifiuta
        di caricare e ti dice quanti layer è riuscito a gestire; abbassa il
        numero finché il modello non entra, oppure scegli una quantizzazione
        più piccola.
      </p>

      <h2>Passo 5. Servi un&apos;API compatibile OpenAI</h2>
      <pre><code>{`./build/bin/llama-server \\
  --model ./models/Qwen2.5-7B-Instruct-Q4_K_M.gguf \\
  --ctx-size 8192 \\
  --n-gpu-layers 999 \\
  --host 0.0.0.0 \\
  --port 8080 \\
  --parallel 4 \\
  --cont-batching`}</code></pre>
      <p>
        Il server ascolta su <code>http://localhost:8080</code> con un
        endpoint chat completions compatibile OpenAI su{" "}
        <code>/v1/chat/completions</code>. <code>--parallel</code> definisce
        quante richieste concorrenti gestisce, e <code>--cont-batching</code>{" "}
        attiva il continuous batching per un throughput maggiore quando c&apos;è
        più di una richiesta in volo.
      </p>

      <h2>Passo 6. Quantizza un modello per conto tuo</h2>
      <p>
        Se vuoi convertire e quantizzare un modello appena uscito su Hugging
        Face, il flusso è chiaro ma richiede più passaggi. Prima converti in
        GGUF, poi quantizza.
      </p>
      <pre><code>{`# Convert from a Hugging Face snapshot to FP16 GGUF
python convert_hf_to_gguf.py ./snapshots/some-model \\
  --outfile ./models/some-model.f16.gguf \\
  --outtype f16

# Quantize to Q4_K_M
./build/bin/llama-quantize \\
  ./models/some-model.f16.gguf \\
  ./models/some-model.Q4_K_M.gguf \\
  Q4_K_M`}</code></pre>

      <h2>Risoluzione degli errori più comuni</h2>
      <h3>La build CUDA fallisce per un compilatore incompatibile</h3>
      <p>
        Il CUDA toolkit è esigente sul compilatore host che accetta. Su
        Ubuntu 24.04 con una versione CUDA recente può servire installare{" "}
        <code>g++-12</code> e indicarlo esplicitamente a CMake:{" "}
        <code>cmake -B build -DGGML_CUDA=ON -DCMAKE_CUDA_HOST_COMPILER=g++-12</code>.
      </p>
      <h3>Il server si blocca alla prima richiesta dopo il riavvio</h3>
      <p>
        Quasi sempre è il warm-up del modello. La prima generazione dopo il
        caricamento spende tempo a costruire la KV cache. Le richieste
        successive sono veloci.
      </p>
      <h3>I token al secondo sembrano pochi per la tua GPU</h3>
      <p>
        Verifica che la GPU sia davvero in uso (<code>nvidia-smi</code> su
        Linux). Controlla che <code>--n-gpu-layers</code> sia abbastanza alto
        da tenere l&apos;intero modello sulla GPU. Conferma che la flash
        attention risulti attiva nel banner di avvio del server.
      </p>

      <h2>Prossimi passi</h2>
      <p>
        Con <code>llama-server</code> in funzione puoi collegarci qualsiasi
        client compatibile OpenAI. Abbinalo a <Link href="/it/tools">Open WebUI</Link>{" "}
        per un&apos;interfaccia di chat, oppure integralo in VS Code tramite
        Continue.dev. Per carichi multi-GPU o multi-tenant llama.cpp non
        basta; in quel caso passa a{" "}
        <Link href="/it/tools">vLLM</Link>.
      </p>
    </article>
  );
}
