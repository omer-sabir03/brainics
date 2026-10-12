"use client";

import { useLang } from "./LanguageProvider";
import { StarIcon } from "./Icons";

export default function Results() {
  const { t } = useLang();

  return (
    <section id="results" className="section relative overflow-hidden bg-ink-900 text-white">
      <div className="pointer-events-none absolute -top-24 start-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-gold-500/15 blur-3xl" aria-hidden />
      <div className="container-x relative">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow !bg-gold-400/15 !text-gold-300">{t.results.eyebrow}</span>
          <h2 className="mt-4 font-display text-3xl font-bold sm:text-5xl">{t.results.title}</h2>
          <p className="mt-4 text-white/60">{t.results.subtitle}</p>
        </div>

        <dl className="mx-auto mt-12 grid max-w-3xl grid-cols-3 gap-4 text-center">
          {t.results.stats.map((s) => (
            <div key={s.label} className="rounded-2xl border border-white/10 bg-white/5 px-3 py-6">
              <dt className="font-display text-3xl font-bold text-gold-400 sm:text-4xl" dir="ltr">
                {s.value}
              </dt>
              <dd className="mt-1 text-xs text-white/60 sm:text-sm">{s.label}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {t.results.items.map((r, i) => (
            <figure key={i} className="flex flex-col rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/[0.03] p-7">
              <div className="flex gap-1 text-gold-400" aria-label="5 stars">
                {Array.from({ length: 5 }).map((_, k) => (
                  <StarIcon key={k} className="h-4 w-4" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-white/85">“{r.quote}”</blockquote>
              <figcaption className="mt-6 border-t border-white/10 pt-4">
                <p className="text-sm font-semibold">{r.name}</p>
                <p className="text-xs text-white/50">{r.meta}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
