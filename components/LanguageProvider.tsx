"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { content, type Lang } from "@/lib/content";

type Ctx = {
  lang: Lang;
  t: (typeof content)["en"];
  toggle: () => void;
};

const LanguageContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  // Restore the visitor's last choice
  useEffect(() => {
    try {
      const saved = localStorage.getItem("brainics-lang");
      if (saved === "en" || saved === "ur") setLang(saved);
    } catch {}
  }, []);

  // Keep <html lang> and text direction in sync (Urdu is right-to-left)
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ur" ? "rtl" : "ltr";
    try {
      localStorage.setItem("brainics-lang", lang);
    } catch {}
  }, [lang]);

  const toggle = useCallback(() => setLang((l) => (l === "en" ? "ur" : "en")), []);

  return <LanguageContext.Provider value={{ lang, t: content[lang], toggle }}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used inside LanguageProvider");
  return ctx;
}
