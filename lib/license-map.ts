// Maps Hugging Face license slugs to human-readable labels and openness tier.
// The tier is used in the UI to colour-code how permissive a license actually is.
// "permissive" = MIT, Apache 2.0, BSD: deploy anywhere.
// "open-weight" = restricted but generally usable: Llama, Gemma, custom commercial-friendly.
// "non-commercial" = CC-BY-NC, research-only, etc.
// "unknown" = no license tag.

export type LicenseTier = "permissive" | "open-weight" | "non-commercial" | "unknown";

export type LicenseInfo = {
  label: string;
  tier: LicenseTier;
};

const map: Record<string, LicenseInfo> = {
  "mit": { label: "MIT", tier: "permissive" },
  "apache-2.0": { label: "Apache 2.0", tier: "permissive" },
  "bsd": { label: "BSD", tier: "permissive" },
  "bsd-2-clause": { label: "BSD-2-Clause", tier: "permissive" },
  "bsd-3-clause": { label: "BSD-3-Clause", tier: "permissive" },
  "cc-by-4.0": { label: "CC BY 4.0", tier: "permissive" },
  "cc-by-sa-4.0": { label: "CC BY-SA 4.0", tier: "permissive" },
  "openrail": { label: "OpenRAIL", tier: "open-weight" },
  "openrail++": { label: "OpenRAIL++", tier: "open-weight" },
  "creativeml-openrail-m": { label: "CreativeML OpenRAIL-M", tier: "open-weight" },
  "llama2": { label: "Llama 2 Community License", tier: "open-weight" },
  "llama3": { label: "Llama 3 Community License", tier: "open-weight" },
  "llama3.1": { label: "Llama 3.1 Community License", tier: "open-weight" },
  "llama3.2": { label: "Llama 3.2 Community License", tier: "open-weight" },
  "llama3.3": { label: "Llama 3.3 Community License", tier: "open-weight" },
  "llama4": { label: "Llama 4 Community License", tier: "open-weight" },
  "gemma": { label: "Gemma Terms of Use", tier: "open-weight" },
  "qwen": { label: "Qwen License", tier: "open-weight" },
  "deepseek": { label: "DeepSeek License", tier: "open-weight" },
  "yi-license": { label: "Yi Series License", tier: "open-weight" },
  "cc-by-nc-4.0": { label: "CC BY-NC 4.0", tier: "non-commercial" },
  "cc-by-nc-sa-4.0": { label: "CC BY-NC-SA 4.0", tier: "non-commercial" },
  "cc-by-nc-nd-4.0": { label: "CC BY-NC-ND 4.0", tier: "non-commercial" },
  "other": { label: "Custom license", tier: "open-weight" }
};

export function resolveLicense(raw: string | undefined | null): LicenseInfo {
  if (!raw) return { label: "Not specified", tier: "unknown" };
  const key = raw.toLowerCase().trim();
  if (map[key]) return map[key];
  // Heuristic fallback: anything containing "nc" we treat as non-commercial.
  if (/\bnc\b/.test(key)) return { label: raw, tier: "non-commercial" };
  return { label: raw, tier: "open-weight" };
}

export function tierBadgeClass(tier: LicenseTier): string {
  switch (tier) {
    case "permissive":
      return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200";
    case "open-weight":
      return "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200";
    case "non-commercial":
      return "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200";
    case "unknown":
    default:
      return "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300";
  }
}

export function tierLabel(tier: LicenseTier): string {
  switch (tier) {
    case "permissive":
      return "Permissive";
    case "open-weight":
      return "Open weight";
    case "non-commercial":
      return "Non-commercial";
    case "unknown":
    default:
      return "Unknown";
  }
}
