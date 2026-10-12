"use client";

import { useLang } from "./LanguageProvider";
import { site } from "@/lib/site";
import { WhatsAppIcon } from "./Icons";

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="bg-ink-950 py-10 text-white/60">
      <div className="container-x flex flex-col items-center justify-between gap-4 text-center text-sm sm:flex-row sm:text-start">
        <div>
          <p className="font-display text-lg font-bold tracking-wide text-white" dir="ltr">
            BRAINICS
          </p>
          <p className="mt-1">{t.footer.tagline}</p>
        </div>
        <p>
          © {new Date().getFullYear()} Brainics. {t.footer.rights}
        </p>
      </div>

      {/* Floating WhatsApp button */}
      <a
        href={`https://wa.me/${site.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-5 end-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-xl transition hover:scale-110"
      >
        <WhatsAppIcon className="h-7 w-7" />
      </a>
    </footer>
  );
}
