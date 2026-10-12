"use client";

import { useLang } from "./LanguageProvider";
import { CameraIcon } from "./Icons";

// When you have real photos, put them in /public/gallery/ (e.g. 1.jpg ... 6.jpg)
// and set `photos` below, e.g. ["/gallery/1.jpg", ...]. Until then, placeholders show.
const photos: string[] = [];

const tones = [
  "from-ink-700 to-ink-900",
  "from-gold-500 to-gold-600",
  "from-ink-600 to-ink-800",
  "from-gold-400 to-gold-500",
  "from-ink-800 to-ink-950",
  "from-gold-300 to-gold-500",
];
const spans = ["sm:row-span-2", "", "", "", "sm:row-span-2", ""];

export default function Gallery() {
  const { t } = useLang();

  return (
    <section id="gallery" className="section">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">{t.gallery.eyebrow}</span>
          <h2 className="mt-4 font-display text-3xl font-bold sm:text-5xl">{t.gallery.title}</h2>
          <p className="mt-4 text-ink-700/80">{t.gallery.subtitle}</p>
        </div>

        <div className="mt-14 grid auto-rows-[11rem] grid-cols-2 gap-4 sm:auto-rows-[12rem] sm:grid-cols-3">
          {t.gallery.captions.map((cap, i) => (
            <figure
              key={cap}
              className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${tones[i]} ${spans[i]}`}
            >
              {photos[i] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={photos[i]} alt={cap} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              ) : (
                <div className="grid h-full w-full place-items-center text-white/40">
                  <CameraIcon className="h-10 w-10" />
                </div>
              )}
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-950/80 to-transparent p-4 text-sm font-semibold text-white">
                {cap}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
