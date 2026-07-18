import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Lo stato dei pesi aperti a maggio 2026",
  description:
    "Cinque rilasci di classe frontier negli ultimi trenta giorni, tre dei quali da laboratori cinesi. Un breve giro d’orizzonte su dove si trova davvero il campo degli open weight.",
  alternates: {
    canonical: "/it/blog/open-weights-state-of-play-2026",
    languages: {
      en: "/blog/open-weights-state-of-play-2026",
      it: "/it/blog/open-weights-state-of-play-2026"
    }
  }
};

export default function PostStateOfPlayIt() {
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12 prose-content">
      <p className="text-sm font-medium text-brand-dark dark:text-brand-light tracking-wide uppercase mb-2">
        Editoriale · 9 min · 12 maggio 2026
      </p>
      <h1 className="text-4xl font-bold tracking-tight">
        Lo stato dei pesi aperti a maggio 2026
      </h1>

      <aside className="mt-5 rounded-md border border-brand/30 bg-brand/5 p-4 text-sm leading-relaxed">
        <strong className="text-slate-900 dark:text-slate-100">In parole semplici:</strong>{" "}
        le aziende AI a volte pubblicano i “pesi” (i numeri interni che
        fanno funzionare un modello), così chiunque può scaricare il
        modello ed eseguirlo per conto proprio. Si chiama “open weight”.
        Di recente molte aziende ne hanno rilasciati di nuovi e grandi;
        questo articolo è un giro d’orizzonte su chi ha rilasciato cosa,
        chi è in testa e cosa permettono davvero di fare le licenze.{" "}
        <a href="/it/glossary#open-weight" className="text-brand-dark dark:text-brand-light hover:underline">
          Cos’è un open weight?
        </a>
      </aside>

      <p className="mt-5 text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
        Negli ultimi trenta giorni sono usciti cinque rilasci open weight
        di classe frontier. Tre venivano da laboratori cinesi. Un breve
        giro d’orizzonte su dove si trova davvero il campo, scritto per
        lettori che già sanno che “open weight” e “open source” hanno
        significati diversi.
      </p>

      <h2>Il calendario dei rilasci principali, senza decorazioni</h2>
      <p>
        Tra aprile e la prima metà di maggio 2026, il calendario degli open
        weight è stato questo. Meta ha rilasciato Llama 4 con le varianti
        Scout e Maverick, la prima delle quali spinge la finestra di
        contesto a 10 milioni di token dichiarati grazie a un’architettura
        mixture-of-experts. Alibaba ha rilasciato Qwen 3.5 lungo la solita
        scala di taglie, con le varianti più piccole che mantengono la
        licenza Apache 2.0. DeepSeek ha consegnato V4 nelle fasce Pro e
        Flash, e il core più piccolo con licenza MIT resta il modello di
        livello frontier più permissivo mai rilasciato. Google ha seguito
        con Gemma 4, puntando sul deployment on-device e su prestazioni
        curate per Apple Silicon. Mistral, l’unico laboratorio europeo
        nella fascia alta, ha pubblicato il 29 aprile Mistral Medium 3.5,
        con pesi Apache 2.0 e numeri su SWE-Bench Verified che lo mettono
        credibilmente in partita.
      </p>
      <p>
        Cinque rilasci in trenta giorni non sono una coincidenza. Lo
        schema, visibile ormai da almeno due cicli, è che il calendario
        degli open weight è diventato in pratica trimestrale. I laboratori
        rilasciano a grappoli perché il costo di arrivare ultimi in una
        finestra di trenta giorni è molto minore del costo di arrivare
        ultimi in una finestra di sei mesi.
      </p>

      <h2>I numeri dei benchmark, e cosa significano davvero</h2>
      <p>
        La stagione dei benchmark ha prodotto la prevedibile ondata di
        rivendicazioni. DeepSeek V4 Pro ha raggiunto 80,6 su SWE-Bench
        Verified e 90,1 su GPQA Diamond, con un contesto da 1 milione di
        token. Mistral Medium 3.5 si è fermato a 77,6 su SWE-Bench, il
        miglior risultato open weight del ciclo tra i modelli né cinesi né
        americani. Qwen 3.5 e Llama 4 si scambiano il primato a seconda
        della suite di valutazione, e Gemma 4 sta dietro la frontiera in
        capacità pura mentre vince in sordina la partita del deployment su
        laptop.
      </p>
      <p>
        I numeri dei laboratori valgono quanto vale di solito un benchmark
        di un vendor. Le classifiche indipendenti hanno recuperato più in
        fretta di un tempo, e il ranking è più stabile di un anno fa, ma il
        divario tra le prestazioni in classifica e quello che un modello fa
        davvero sul tuo carico di lavoro rimane. Far girare lo stesso set
        di prompt su tre candidati in{" "}
        <Link href="/it/guides/lm-studio">LM Studio</Link> ti dice più cose
        in un pomeriggio che una settimana passata a leggere paper di
        valutazione.
      </p>

      <h2>Lo strato delle licenze, dove abita la libertà vera</h2>
      <p>
        La capacità è un asse, la licenza è un altro, e i due non sono
        correlati come suggerisce il marketing. Se per ragioni legali ti
        serve una licenza approvata OSI, la rosa si accorcia molto in
        fretta: DeepSeek V4 (MIT) per la casella di fascia frontier, le
        taglie minori di Qwen (Apache 2.0) per la copertura di fascia
        media, OLMo dell’Allen Institute per la trasparenza completa, ed
        EuroLLM-22B per la rara combinazione di pesi Apache 2.0 con una
        pipeline di addestramento interamente pubblicata.
      </p>
      <p>
        La fascia intermedia di licenze (la Llama Community License, i
        Gemma Terms of Use, i vari documenti su misura pubblicati dai
        laboratori cinesi) copre comodamente la maggior parte dei contesti
        commerciali, ma tutte portano restrizioni che un ufficio legale
        prudente segnalerà: tetti sugli utenti attivi mensili, clausole che
        limitano il training, questioni di export, a volte ambiguità su
        quale giurisdizione governi. Il lavoro di leggere quei termini è
        poco affascinante e inevitabile.
      </p>

      <h2>La forma geografica del campo</h2>
      <p>
        Tre osservazioni che il ciclo di rilasci del 2026 ha reso
        inevitabili. I laboratori cinesi hanno smesso di essere
        l’alternativa di fascia economica. DeepSeek, Qwen, Kimi e GLM
        occupano posizioni in classifica che i laboratori americani non
        riescono a battere con costanza con pesi aperti. L’eccezione
        Mistral è reale e importante, ma non cambia la forma di fondo del
        campo. Gli appelli alla “sovranità europea sull’AI” che poggiano
        sull’assunto che i pesi aperti usati da tutti siano europei devono
        rifare i conti.
      </p>
      <p>
        I laboratori americani continuano a guidare sui modelli chiusi,
        sull’infrastruttura e su quello strato noioso ma essenziale di
        strumenti attorno ai pesi: valutazione, sicurezza, deployment. I
        pesi aperti che rilasciano sono sempre più, dal punto di vista
        strategico, un prodotto di seconda linea più che un contributo di
        prima linea. Meta è l’eccezione parziale. Google rilascia pesi
        aperti in un modo che sembra pensato per essere utile
        specificamente su hardware Pixel e Chromebook.
      </p>
      <p>
        L’Europa ha un laboratorio credibile di fascia frontier e un
        consorzio di ricerca che produce modelli genuinamente aperti come
        EuroLLM. Non è poco. E nemmeno è il tipo di presenza che giustifica
        la retorica delle policy. La lettura onesta è che la sovranità
        europea sull’AI, nella misura in cui è raggiungibile, sarà una
        sovranità di deployment, governance e residenza dei dati più che
        una sovranità sui pesi sottostanti.
      </p>

      <h2>Cosa vale la pena eseguire oggi</h2>
      <p>
        Tre raccomandazioni pratiche, calibrate sull’hardware che la
        maggior parte dei lettori ha davvero a disposizione.
      </p>
      <p>
        Per un portatile da 16 GB, Qwen 3.5 7B in Q4_K_M è la migliore
        scelta generalista. Gestisce chat, riassunti, coding leggero e la
        maggior parte dei carichi di retrieval. Phi-5 7B è la seconda
        scelta credibile se ti serve un’inferenza leggermente più veloce a
        un piccolo costo di qualità.
      </p>
      <p>
        Per una workstation da 24-32 GB, Qwen 3.5 14B o Llama 4 Scout a
        lunghezze di contesto moderate ti danno un vero assistente di
        lavoro per coding e analisi sostanziosi. Le varianti distillate di
        DeepSeek V4 meritano uno sguardo se fai lavoro a forte componente
        matematica.
      </p>
      <p>
        Per un server multi-GPU con VRAM seria (96 GB o più), DeepSeek V4
        Pro è oggi la scelta aperta di fascia frontier. Llama 4 Maverick
        compete sulla maggior parte dei compiti, e Mistral Medium 3.5 è
        quello da provare se il tuo ufficio legale preferisce pesi di
        origine europea.
      </p>

      <h2>Cosa osservare nel prossimo trimestre</h2>
      <p>
        Tre cose specifiche, nessuna speculativa. Il prossimo rilascio di
        OpenEuroLLM, che dovrebbe uscire addestrato sul sistema exascale
        Jupiter in Germania e che sarà la prima volta in cui un modello
        europeo finanziato con denaro pubblico compete su questa scala. Il
        primo rilascio Apache 2.0 con contesto da 1M da parte di un
        laboratorio occidentale, se avverrà. E il ritmo con cui i
        laboratori cinesi continueranno a rilasciare sotto MIT o Apache,
        perché la pressione politica per irrigidire quelle licenze è reale
        e finora i laboratori l’hanno ignorata.
      </p>
      <p>
        Il campo è più in salute che mai, il che è diverso dal dire che è
        assestato. Fra tre anni la classifica avrà un’altra faccia e
        almeno uno dei laboratori nella tabella qui sopra sarà scivolato
        indietro o avrà smesso. La buona notizia è che i pesi aperti non
        sono un abbonamento. Qualunque cosa scarichi oggi continuerà a
        funzionare.
      </p>
    </article>
  );
}
