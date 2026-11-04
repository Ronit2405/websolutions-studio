import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { NAV_LINKS } from "../data/content";

function Logo() {
  return (
    <a href="#home" className="flex items-center gap-2.5 shrink-0" aria-label="WebSolutions Studio — Home">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#2563EB] text-white shadow-sm">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3 6 L8 18 L12 9 L16 18 L21 6" />
        </svg>
      </span>
      <span className="leading-tight">
        <span className="block font-[Manrope] text-[15px] font-extrabold tracking-tight text-[#0B1220]">
          WebSolutions <span className="text-[#2563EB]">Studio</span>
        </span>
        <span className="hidden sm:block text-[10.5px] font-medium tracking-wide text-slate-500 uppercase">
          Smart Digital Solutions
        </span>
      </span>
    </a>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = ["home", "services", "about", "contact"];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-200 ${
        scrolled ? "border-b border-slate-200 bg-white/95 shadow-[0_1px_12px_rgba(11,18,32,0.06)] backdrop-blur" : "bg-white/80 backdrop-blur border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {NAV_LINKS.map((l) => {
            const id = l.href.replace("#", "");
            const isActive = active === id;
            return (
              <a
                key={l.href}
                href={l.href}
                className={`relative rounded-md px-4 py-2 text-[14px] font-semibold transition-colors ${
                  isActive ? "text-[#2563EB]" : "text-slate-600 hover:text-[#0B1220]"
                }`}
              >
                {l.label}
                <span
                  className={`absolute inset-x-4 -bottom-[1px] h-[2px] rounded-full bg-[#2563EB] transition-opacity ${isActive ? "opacity-100" : "opacity-0"}`}
                />
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center gap-2 rounded-lg bg-[#2563EB] px-4 py-2.5 text-[13.5px] font-semibold text-white shadow-sm transition-colors hover:bg-[#1D4ED8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2"
          >
            Let&apos;s Discuss Your Project
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white px-4 pb-5 pt-2 md:hidden">
          <nav className="flex flex-col" aria-label="Mobile">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-[15px] font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#0B1220]"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-3 inline-flex items-center justify-center gap-2 rounded-lg bg-[#2563EB] px-4 py-3 text-[14px] font-semibold text-white"
            >
              Let&apos;s Discuss Your Project
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
