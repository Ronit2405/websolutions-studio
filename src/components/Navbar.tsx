import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { NAV_LINKS } from "../data/content";
import { useLanguage } from "../i18n";

function Logo() {
  const { t } = useLanguage();
  return (
    <a href="#/home" className="flex shrink-0 items-center gap-2 sm:gap-2.5" aria-label={t("WebSolutions Studio — Home")}>
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#2563EB] text-white shadow-sm sm:h-9 sm:w-9">
        <svg viewBox="0 0 24 24" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3 6 L8 18 L12 9 L16 18 L21 6" />
        </svg>
      </span>
      <span className="leading-tight">
        <span className="block whitespace-nowrap font-[Manrope] text-[12px] font-extrabold tracking-tight text-[#0B1220] sm:text-[15px]">
          WebSolutions <span className="text-[#2563EB]">Studio</span>
        </span>
        <span className="hidden text-[10.5px] font-medium tracking-wide text-slate-500 uppercase sm:block">
          {t("Smart Digital Solutions")}
        </span>
      </span>
    </a>
  );
}

interface NavbarProps {
  activePage: string;
}

export default function Navbar({ activePage }: NavbarProps) {
  const { language, toggleLanguage, t } = useLanguage();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [activePage]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200 bg-white/95 shadow-[0_1px_12px_rgba(11,18,32,0.06)] backdrop-blur">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-1 px-2 sm:gap-4 sm:px-6 lg:px-8">
        <Logo />

        <nav className="hidden min-w-0 items-center gap-1 lg:flex xl:gap-1.5" aria-label={t("Primary navigation")}>
          {NAV_LINKS.map((link) => {
            const page = link.href.replace("#/", "");
            const isActive = activePage === page || (page === "work" && activePage === "portfolio");
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`whitespace-nowrap rounded-lg px-2.5 py-2.5 text-[14px] font-bold tracking-[-0.01em] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 xl:px-3.5 xl:text-[15px] ${
                  isActive ? "bg-blue-50 text-[#1D4ED8]" : "text-slate-700 hover:bg-slate-100 hover:text-[#2563EB]"
                }`}
              >
                {t(link.label)}
              </a>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <button
            type="button"
            onClick={toggleLanguage}
            aria-label={language === "en" ? t("Switch to Hindi") : t("Switch to English")}
            className="inline-flex min-h-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 px-1.5 text-[12px] font-bold text-slate-700 transition-colors hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 sm:px-3 sm:text-[13px]"
          >
            {language === "en" ? (
              <><span className="max-[359px]:hidden">हिंदी</span><span className="hidden max-[359px]:inline">हि</span></>
            ) : (
              <><span className="max-[359px]:hidden">English</span><span className="hidden max-[359px]:inline">EN</span></>
            )}
          </button>
          <a
            href="#/contact"
            className="hidden items-center gap-2 rounded-lg bg-[#2563EB] px-4 py-2.5 text-[13.5px] font-semibold text-white shadow-sm transition-colors hover:bg-[#1D4ED8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 xl:inline-flex"
          >
            {t("Let's Discuss Your Project")}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? t("Close menu") : t("Open menu")}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 transition-colors hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 lg:hidden"
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div id="mobile-navigation" hidden={!open} className="max-h-[calc(100dvh-72px)] overflow-y-auto border-t border-slate-200 bg-white px-3 pb-5 pt-2 sm:px-6 lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col" aria-label={t("Mobile navigation")}>
            {NAV_LINKS.map((link) => {
              const page = link.href.replace("#/", "");
              const isActive = activePage === page;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  className={`rounded-lg px-3 py-3 text-[15px] font-bold tracking-[-0.01em] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-inset ${
                    isActive ? "bg-blue-50 text-[#1D4ED8]" : "text-slate-700 hover:bg-slate-100 hover:text-[#2563EB]"
                  }`}
                >
                  {t(link.label)}
                </a>
              );
            })}
            <a
              href="#/contact"
              onClick={() => setOpen(false)}
              className="mt-3 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#2563EB] px-4 py-3 text-[14px] font-semibold text-white"
            >
              {t("Let's Discuss Your Project")}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </nav>
      </div>
    </header>
  );
}
