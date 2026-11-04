import { Mail, User } from "lucide-react";
import { OWNER_EMAIL } from "../data/content";

const QUICK = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const SERVICES_FOOTER = [
  { label: "Website Development", href: "#services" },
  { label: "Digital Management", href: "#services" },
  { label: "AI Automation", href: "#services" },
  { label: "AI Calling Solutions", href: "#services" },
  { label: "Custom Software", href: "#services" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0B1E3A] text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <a href="#/" className="flex items-center gap-2.5" aria-label="WebSolutions Studio — Home">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1E5CC8] text-white">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3 6 L8 18 L12 9 L16 18 L21 6" />
                </svg>
              </span>
                <span className="font-[Manrope] text-[15px] font-extrabold tracking-tight text-white">
                WebSolutions <span className="text-[#34D399]">Studio</span>
              </span>

            </a>
            <p className="mt-4 max-w-xs text-[14px] leading-relaxed">
              Smart Digital Solutions for Growing Businesses.
            </p>
            <p className="mt-3 max-w-xs text-[13px] leading-relaxed text-slate-500">
              Professional websites, digital workflow management, AI automation and intelligent communication solutions.
            </p>
          </div>

          <nav aria-label="Quick links">
            <p className="text-[12px] font-bold tracking-[0.14em] text-white uppercase">Quick Links</p>
            <ul className="mt-4 space-y-2.5">
              {QUICK.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-[14px] transition-colors hover:text-white">{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Services">
            <p className="text-[12px] font-bold tracking-[0.14em] text-white uppercase">Services</p>
            <ul className="mt-4 space-y-2.5">
              {SERVICES_FOOTER.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-[14px] transition-colors hover:text-white">{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-[12px] font-bold tracking-[0.14em] text-white uppercase">Contact</p>
            <ul className="mt-4 space-y-3 text-[14px]">
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#34D399]" aria-hidden="true" />
                <span>
                  Email:{" "}
                  <a href={`mailto:${OWNER_EMAIL}`} className="break-all font-medium text-slate-200 hover:text-white hover:underline">
                    {OWNER_EMAIL}
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <User className="mt-0.5 h-4 w-4 shrink-0 text-[#34D399]" aria-hidden="true" />
                <span>Founder: Ronit Sundrani</span>
              </li>
            </ul>
            <a
              href="#/contact"
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#1E5CC8] px-4 py-2.5 text-[13.5px] font-semibold text-white transition-colors hover:bg-[#16468F]"
            >
              Start a Project
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px]">Copyright © 2026 WebSolutions Studio. All Rights Reserved.</p>
          <div className="flex items-center gap-5 text-[13px]">
            <a href="#/privacy" className="transition-colors hover:text-white">Privacy Policy</a>
            <a href="#/terms" className="transition-colors hover:text-white">Terms &amp; Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
