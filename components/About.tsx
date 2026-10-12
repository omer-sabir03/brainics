"use client";

import { useLang } from "./LanguageProvider";
import { CheckIcon } from "./Icons";

export default function About() {
  const { t } = useLang();

  return (
    <section id="about" className="section bg-white">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2">
        {/* Founder card (swap with a real photo later) */}
        <div className="relative mx-auto w-full max-w-md">
          <div className="absolute -inset-3 rounded-[2.2rem] bg-gradient-to-br from-gold-400/40 to-transparent" aria-hidden />
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-ink-800 to-ink-900 p-8 text-white">
            <div className="grid aspect-[4/3] place-items-center rounded-2xl border border-dashed border-white/20 bg-white/5 text-center text-sm text-white/50">
              {/* TODO: replace with <img src="/founder.jpg" ... /> */}
              Photo placeholder
            </div>
            <h3 className="mt-6 font-display text-2xl font-bold">{t.about.founderName}</h3>
            <p className="text-sm font-semibold text-gold-400">{t.about.founderRole}</p>
            <p className="mt-3 text-sm leading-relaxed text-white/65">{t.about.founderNote}</p>
          </div>
        </div>

        <div>
          <span className="eyebrow">{t.about.eyebrow}</span>
          <h2 className="mt-4 font-display text-3xl font-bold sm:text-5xl">{t.about.title}</h2>
          <p className="mt-5 leading-relaxed text-ink-700/85">{t.about.text}</p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {t.about.points.map((p) => (
              <li key={p} className="flex items-start gap-3">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold-400 text-ink-900">
                  <CheckIcon className="h-3.5 w-3.5" />
                </span>
                <span className="text-sm font-medium leading-snug">{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
