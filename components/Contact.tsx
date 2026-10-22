"use client";

import { useState } from "react";
import { useLang } from "./LanguageProvider";
import { ClockIcon, MailIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "./Icons";
import EnquiryForm from "./EnquiryForm";
import { site } from "@/lib/site";

export default function Contact() {
  const { t, lang } = useLang();
  const f = t.contact.form;

  const waDirect = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(f.msgIntro)}`;

  // mailto: does nothing on computers without a mail app, so also offer the address to copy
  const [copied, setCopied] = useState(false);
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

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
              <a href={`mailto:${site.email}`} className="btn btn-ghost">
                <MailIcon /> {t.contact.email}
              </a>
              <button type="button" onClick={copyEmail} className="btn btn-ghost" aria-label="Copy email address">
                <span dir="ltr">{site.email}</span> <span className="text-xs text-white/60">{copied ? "Copied" : "Copy"}</span>
              </button>
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

          {/* Short enquiry form, submitted to the backend */}
          <EnquiryForm />
        </div>
      </div>
    </section>
  );
}
