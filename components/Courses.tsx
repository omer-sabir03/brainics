"use client";

import { useLang } from "./LanguageProvider";
import { ArrowIcon, BookIcon } from "./Icons";

export default function Courses() {
  const { t } = useLang();

  return (
    <section id="courses" className="section">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">{t.courses.eyebrow}</span>
          <h2 className="mt-4 font-display text-3xl font-bold sm:text-5xl">{t.courses.title}</h2>
          <p className="mt-4 text-ink-700/80">{t.courses.subtitle}</p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {t.courses.items.map((c, i) => (
            <article
              key={c.title}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-ink-900/5 bg-white p-8 shadow-card transition duration-300 hover:-translate-y-1.5 hover:shadow-glow"
            >
              <span className="absolute -end-4 -top-6 font-display text-[8rem] font-bold leading-none text-gold-400/10" aria-hidden dir="ltr">
                {i + 1}
              </span>
              <div className="relative grid h-12 w-12 place-items-center rounded-2xl bg-ink-900 text-gold-400">
                <BookIcon />
              </div>
              <p className="relative mt-6 text-sm font-semibold text-gold-600">{c.range}</p>
              <h3 className="relative mt-1 font-display text-2xl font-bold">{c.title}</h3>
              <p className="relative mt-3 flex-1 text-sm leading-relaxed text-ink-700/80">{c.desc}</p>
              <ul className="relative mt-6 flex flex-wrap gap-2">
                {c.tags.map((tag) => (
                  <li key={tag} className="rounded-full bg-cream px-3 py-1 text-xs font-medium text-ink-800">
                    {tag}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className="relative mt-8 inline-flex items-center gap-2 text-sm font-semibold text-ink-900 transition group-hover:text-gold-600"
              >
                {t.courses.cta} <ArrowIcon className="h-4 w-4 rtl:rotate-180" />
              </a>
            </article>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-ink-700/60">{t.courses.note}</p>
      </div>
    </section>
  );
}
