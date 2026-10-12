"use client";

import { useLang } from "./LanguageProvider";
import { ArrowIcon, BookIcon, WhatsAppIcon } from "./Icons";
import { site } from "@/lib/site";

export default function Hero() {
  const { t } = useLang();
  const wa = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(t.contact.form.msgIntro)}`;

  return (
    <section id="home" className="relative overflow-hidden bg-ink-900 pb-24 pt-32 text-white sm:pb-32 sm:pt-44">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -top-32 end-[-8rem] h-[28rem] w-[28rem] rounded-full bg-gold-500/20 blur-3xl" />
        <div className="absolute -bottom-40 start-[-10rem] h-[30rem] w-[30rem] rounded-full bg-ink-600/60 blur-3xl" />
        <svg className="absolute inset-0 h-full w-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M48 0H0V48" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container-x relative grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="animate-rise">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold-400/40 bg-gold-400/10 px-4 py-1.5 text-xs font-semibold text-gold-300">
            <span className="h-2 w-2 rounded-full bg-gold-400" />
            {t.hero.badge}
          </span>

          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.1] sm:text-6xl">
            {t.hero.titleA}
            <br />
            <span className="bg-gradient-to-r from-gold-300 to-gold-500 bg-clip-text text-transparent">
              {t.hero.titleB}
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">{t.hero.subtitle}</p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-gold">
              <WhatsAppIcon /> {t.hero.cta1}
            </a>
            <a href="#courses" className="btn btn-ghost">
              {t.hero.cta2} <ArrowIcon className="h-4 w-4 rtl:rotate-180" />
            </a>
          </div>

          <dl className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-white/10 pt-8">
            {t.hero.stats.map((s) => (
              <div key={s.label}>
                <dt className="font-display text-2xl font-bold text-gold-400 sm:text-3xl">{s.value}</dt>
                <dd className="mt-1 text-xs text-white/60 sm:text-sm">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Visual card */}
        <div className="relative mx-auto w-full max-w-sm animate-rise [animation-delay:150ms]">
          <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-[2rem] bg-gold-400/20 rtl:-translate-x-4" />
          <div className="relative animate-floaty rounded-[2rem] border border-white/10 bg-gradient-to-br from-ink-700 to-ink-800 p-8 shadow-2xl">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gold-400 text-ink-900">
              <BookIcon className="h-7 w-7" />
            </div>
            <h3 className="mt-6 font-display text-2xl font-bold">{t.hero.cardTitle}</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/70">{t.hero.cardText}</p>
            <div className="mt-8 grid grid-cols-3 gap-2" aria-hidden>
              {["Maths", "Science", "English"].map((s, i) => (
                <div
                  key={s}
                  className="rounded-xl bg-white/5 px-2 py-3 text-center text-[11px] font-semibold text-white/80"
                  dir="ltr"
                  style={{ opacity: 1 - i * 0.12 }}
                >
                  {s}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
