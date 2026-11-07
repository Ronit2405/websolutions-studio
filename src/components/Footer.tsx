import { Mail, User } from "lucide-react";
import { OWNER_EMAIL } from "../data/content";
import { useLanguage } from "../i18n";

const QUICK = [
  { label: "Home", href: "#/home" },
  { label: "Services", href: "#/services" },
  { label: "About", href: "#/about" },
  { label: "Our Work", href: "#/work" },
  { label: "Contact", href: "#/contact" },
];

const SERVICES_FOOTER = [
  { label: "Website Development", href: "#/services" },
  { label: "App Development", href: "#/services/app-development" },
  { label: "AI Automation", href: "#/services" },
  { label: "AI Calling Solutions", href: "#/services" },
  { label: "Custom Software", href: "#/services" },
  { label: "Digital Management", href: "#/services" },
];

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="bg-[#0B1220] text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <a href="#/home" className="flex items-center gap-2.5" aria-label={t("WebSolutions Studio — Home")}>
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#2563EB] text-white">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3 6 L8 18 L12 9 L16 18 L21 6" />
                </svg>
              </span>
              <span className="font-[Manrope] text-[15px] font-extrabold tracking-tight text-white">
                WebSolutions <span className="text-[#38BDF8]">Studio</span>
              </span>
            </a>
            <p className="mt-4 max-w-xs text-[14px] leading-relaxed">
              {t("Smart Digital Solutions for Growing Businesses.")}
            </p>
            <p className="mt-3 max-w-xs text-[13px] leading-relaxed text-slate-500">
              {t("Professional websites, mobile apps, AI automation, intelligent communication and digital workflow management.")}
            </p>
          </div>

          <nav aria-label={t("Quick Links")}>
            <p className="text-[12px] font-bold tracking-[0.14em] text-white uppercase">{t("Quick Links")}</p>
            <ul className="mt-4 space-y-2.5">
              {QUICK.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-[14px] transition-colors hover:text-white">{t(l.label)}</a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={t("Services")}>
            <p className="text-[12px] font-bold tracking-[0.14em] text-white uppercase">{t("Services")}</p>
            <ul className="mt-4 space-y-2.5">
              {SERVICES_FOOTER.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-[14px] transition-colors hover:text-white">{t(l.label)}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-[12px] font-bold tracking-[0.14em] text-white uppercase">{t("Contact")}</p>
            <ul className="mt-4 space-y-3 text-[14px]">
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#38BDF8]" aria-hidden="true" />
                <span>
                  {t("Email:")}{" "}
                  <a href={`mailto:${OWNER_EMAIL}`} className="break-all font-medium text-slate-200 hover:text-white hover:underline">
                    {OWNER_EMAIL}
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <User className="mt-0.5 h-4 w-4 shrink-0 text-[#38BDF8]" aria-hidden="true" />
                <span>{t("Founder:")} Ronit Sundrani</span>
              </li>
            </ul>
            <a
              href="#/contact"
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#2563EB] px-4 py-2.5 text-[13.5px] font-semibold text-white transition-colors hover:bg-[#1D4ED8]"
            >
              {t("Start a Project")}
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px]">{t("Copyright © 2026 WebSolutions Studio. All Rights Reserved.")}</p>
          <div className="flex items-center gap-5 text-[13px]">
            <a href="#/privacy" className="transition-colors hover:text-white">{t("Privacy Policy")}</a>
            <a href="#/terms" className="transition-colors hover:text-white">{t("Terms & Conditions")}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
