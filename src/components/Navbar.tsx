import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { NAV_LINKS } from "../data/content";

function Logo() {
  return (
    <a href="#/home" className="flex shrink-0 items-center gap-2.5" aria-label="WebSolutions Studio — Home">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#2563EB] text-white shadow-sm">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3 6 L8 18 L12 9 L16 18 L21 6" />
        </svg>
      </span>
      <span className="leading-tight">
        <span className="block whitespace-nowrap font-[Manrope] text-[14px] font-extrabold tracking-tight text-[#0B1220] sm:text-[15px]">
          WebSolutions <span className="text-[#2563EB]">Studio</span>
        </span>
        <span className="hidden text-[10.5px] font-medium tracking-wide text-slate-500 uppercase sm:block">
          Smart Digital Solutions
        </span>
      </span>
    </a>
  );
}

interface NavbarProps {
  activePage: string;
}

export default function Navbar({ activePage }: NavbarProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [activePage]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200 bg-white/95 shadow-[0_1px_12px_rgba(11,18,32,0.06)] backdrop-blur">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-2 px-3 sm:gap-4 sm:px-6 lg:px-8">
        <Logo />

        <nav className="hidden min-w-0 items-center gap-0.5 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => {
            const page = link.href.replace("#/", "");
            const isActive = activePage === page || (page === "work" && activePage === "portfolio");
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`relative whitespace-nowrap rounded-md px-3 py-2 text-[13.5px] font-semibold transition-colors xl:px-3.5 xl:text-[14px] ${
                  isActive ? "text-[#2563EB]" : "text-slate-600 hover:text-[#0B1220]"
                }`}
              >
                {link.label}
                <span
                  className={`absolute inset-x-3.5 -bottom-[1px] h-[2px] rounded-full bg-[#2563EB] transition-opacity ${isActive ? "opacity-100" : "opacity-0"}`}
                />
              </a>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <a
            href="#/contact"
            className="hidden items-center gap-2 rounded-lg bg-[#2563EB] px-4 py-2.5 text-[13.5px] font-semibold text-white shadow-sm transition-colors hover:bg-[#1D4ED8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 xl:inline-flex"
          >
            Let&apos;s Discuss Your Project
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 transition-colors hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 lg:hidden"
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div id="mobile-navigation" hidden={!open} className="max-h-[calc(100dvh-72px)] overflow-y-auto border-t border-slate-200 bg-white px-3 pb-5 pt-2 sm:px-6 lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col" aria-label="Mobile">
            {NAV_LINKS.map((link) => {
              const page = link.href.replace("#/", "");
              const isActive = activePage === page;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  className={`rounded-md px-3 py-3 text-[15px] font-semibold transition-colors ${
                    isActive ? "bg-blue-50 text-[#2563EB]" : "text-slate-700 hover:bg-slate-50 hover:text-[#0B1220]"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
            <a
              href="#/contact"
              onClick={() => setOpen(false)}
              className="mt-3 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#2563EB] px-4 py-3 text-[14px] font-semibold text-white"
            >
              Let&apos;s Discuss Your Project
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </nav>
      </div>
    </header>
  );
}
