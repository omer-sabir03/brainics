"use client";

import { useState, type FormEvent } from "react";
import { useLang } from "./LanguageProvider";
import { ClockIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "./Icons";
import { site } from "@/lib/site";

export default function Contact() {
  const { t, lang } = useLang();
  const f = t.contact.form;
  const [form, setForm] = useState({ name: "", phone: "", cls: "", message: "" });

  const update = (k: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((s) => ({ ...s, [k]: e.target.value }));

  const waDirect = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(f.msgIntro)}`;

  // Static site → no server. The form opens WhatsApp with the details pre-filled.
  // (Later we can replace this with a Spring Boot endpoint.)
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const lines = [
      f.msgIntro,
      "",
      `${f.lblName}: ${form.name}`,
      `${f.lblPhone}: ${form.phone}`,
      `${f.lblClass}: ${form.cls}`,
      form.message ? `${f.lblMsg}: ${form.message}` : "",
    ].filter((l, i, a) => l !== "" || (i > 0 && a[i - 1] !== ""));
    window.open(`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank", "noopener");
  };

  const input =
    "mt-1.5 w-full rounded-xl border border-ink-900/10 bg-white px-4 py-3 text-sm outline-none transition focus:border-gold-500 focus:ring-2 focus:ring-gold-400/40";

  const address = lang === "ur" ? site.addressUr : site.addressEn;

  return (
    <section id="contact" className="section bg-white">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">{t.contact.eyebrow}</span>
          <h2 className="mt-4 font-display text-3xl font-bold sm:text-5xl">{t.contact.title}</h2>
          <p className="mt-4 text-ink-700/80">{t.contact.subtitle}</p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Details */}
          <div className="flex flex-col gap-5 rounded-3xl bg-ink-900 p-8 text-white">
            <div className="flex flex-wrap gap-3">
              <a href={waDirect} target="_blank" rel="noopener noreferrer" className="btn btn-gold">
                <WhatsAppIcon /> {t.contact.whatsapp}
              </a>
              <a href={`tel:${site.phoneTel}`} className="btn btn-ghost">
                <PhoneIcon /> {t.contact.call}
              </a>
            </div>

            <ul className="mt-2 space-y-5 text-sm">
              <li className="flex gap-4">
                <PinIcon className="mt-0.5 shrink-0 text-gold-400" />
                <div>
                  <p className="font-semibold">{t.contact.address}</p>
                  <p className="text-white/65">{address}</p>
                </div>
              </li>
              <li className="flex gap-4">
                <PhoneIcon className="mt-0.5 shrink-0 text-gold-400" />
                <div>
                  <p className="font-semibold">{t.contact.phone}</p>
                  <p className="text-white/65" dir="ltr">
                    {site.phoneDisplay}
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <ClockIcon className="mt-0.5 shrink-0 text-gold-400" />
                <div>
                  <p className="font-semibold">{t.contact.hours}</p>
                  <p className="text-white/65">{site.hours}</p>
                </div>
              </li>
            </ul>

            {site.mapEmbedUrl ? (
              <iframe
                src={site.mapEmbedUrl}
                title="Brainics location"
                loading="lazy"
                className="mt-2 h-48 w-full rounded-2xl border-0"
              />
            ) : (
              <div className="mt-2 grid h-40 place-items-center rounded-2xl border border-dashed border-white/20 text-xs text-white/40">
                Map placeholder
              </div>
            )}
          </div>

          {/* Form */}
          <form onSubmit={onSubmit} className="rounded-3xl border border-ink-900/5 bg-cream p-8 shadow-card">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block text-sm font-semibold">
                {f.name}
                <input required value={form.name} onChange={update("name")} className={input} autoComplete="name" />
              </label>
              <label className="block text-sm font-semibold">
                {f.phone}
                <input
                  required
                  type="tel"
                  inputMode="tel"
                  value={form.phone}
                  onChange={update("phone")}
                  className={input}
                  autoComplete="tel"
                  dir="ltr"
                />
              </label>
            </div>
            <label className="mt-5 block text-sm font-semibold">
              {f.cls}
              <select required value={form.cls} onChange={update("cls")} className={input}>
                <option value="">{f.classPlaceholder}</option>
                {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={String(n)}>
                    {lang === "ur" ? `جماعت ${n}` : `Class ${n}`}
                  </option>
                ))}
              </select>
            </label>
            <label className="mt-5 block text-sm font-semibold">
              {f.message}
              <textarea rows={4} value={form.message} onChange={update("message")} className={input} />
            </label>
            <button type="submit" className="btn btn-dark mt-6 w-full">
              <WhatsAppIcon /> {f.submit}
            </button>
            <p className="mt-3 text-center text-xs text-ink-700/60">{f.hint}</p>
          </form>
        </div>
      </div>
    </section>
  );
}
