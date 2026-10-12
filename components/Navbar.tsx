"use client";

import { useEffect, useState } from "react";
import { useLang } from "./LanguageProvider";
import { CloseIcon, MenuIcon } from "./Icons";

const links = [
  { id: "home", key: "home" },
  { id: "courses", key: "courses" },
  { id: "about", key: "about" },
  { id: "results", key: "results" },
  { id: "gallery", key: "gallery" },
  { id: "contact", key: "contact" },
] as const;

export default function Navbar() {
  const { t, lang, toggle } = useLang();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open ? "bg-ink-900/95 shadow-lg backdrop-blur" : "bg-transparent"
      }`}
    >
      <nav className="container-x flex h-16 items-center justify-between sm:h-20">
        <a href="#home" className="flex items-center gap-2.5" aria-label="Brainics home">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gold-400 font-display text-lg font-bold text-ink-900">
            B
          </span>
          <span className="font-display text-xl font-bold tracking-wide text-white" dir="ltr">
            BRAINICS
          </span>
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <li key={l.id}>
              <a href={`#${l.id}`} className="text-sm font-medium text-white/80 transition hover:text-gold-400">
                {t.nav[l.key]}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={toggle}
            className="rounded-full border border-white/25 px-3.5 py-1.5 text-xs font-semibold text-white transition hover:bg-white/10"
            aria-label={lang === "en" ? "اردو میں دیکھیں" : "View in English"}
          >
            {lang === "en" ? "اردو" : "English"}
          </button>
          <a href="#contact" className="btn btn-gold hidden !px-5 !py-2.5 sm:inline-flex">
            {t.nav.enquire}
          </a>
          <button
            className="grid h-10 w-10 place-items-center rounded-full text-white lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
            aria-expanded={open}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-white/10 bg-ink-900 lg:hidden">
          <ul className="container-x flex flex-col py-3">
            {links.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={() => setOpen(false)}
                  className="block border-b border-white/5 py-3.5 text-base font-medium text-white/90"
                >
                  {t.nav[l.key]}
                </a>
              </li>
            ))}
            <li className="py-4">
              <a href="#contact" onClick={() => setOpen(false)} className="btn btn-gold w-full">
                {t.nav.enquire}
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
