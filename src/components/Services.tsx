import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  CirclePlay,
  Sparkles,
} from "lucide-react";
import { SERVICES } from "../data/content";
import { useLanguage } from "../i18n";
import VideoFrame from "./VideoFrame";

interface Props {
  onSelectService: (formValue: string) => void;
}

const pad = (index: number) => `0${index + 1}`;

export default function Services({ onSelectService }: Props) {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const viewerRef = useRef<HTMLDivElement>(null);
  const total = SERVICES.length;
  const active = SERVICES[activeIndex];
  const ActiveIcon = active.icon;

  const goTo = (index: number) => {
    const next = (index + total) % total;
    setActiveIndex(next);
    setDetailsOpen(false);
    // Keep the viewer in view when switching from the list on small screens.
    if (window.innerWidth < 1024) {
      const el = viewerRef.current;
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 84;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }
  };

  // Deep link support: #/services/ai-agents opens that service directly.
  useEffect(() => {
    const applyHash = () => {
      const hash = window.location.hash;
      if (!hash.startsWith("#/services/")) return;
      const slug = hash.slice("#/services/".length).split(/[/?]/)[0];
      const index = SERVICES.findIndex((service) => service.id === slug);
      if (index >= 0) {
        setActiveIndex(index);
        setDetailsOpen(false);
      }
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  return (
    <section id="services" className="bg-white pt-20 pb-14 sm:pt-28 sm:pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ---------------- Header ---------------- */}
        <div className="reveal max-w-3xl">
          <p className="text-[11.5px] font-bold tracking-[0.14em] text-[#2563EB] uppercase sm:text-[12px]">
            {t("Our Services")}
          </p>
          <h1 className="mt-2.5 break-words font-[Manrope] text-[27px] font-extrabold leading-[1.16] tracking-tight text-[#0B1220] sm:text-[38px] sm:leading-[1.15]">
            {t("Digital Solutions — See Exactly How Each One Works")}
          </h1>
          <p className="mt-3.5 text-[15px] leading-relaxed text-slate-600 sm:text-[16px]">
            {t(
              "Pick a service, watch the short video, and understand it in under a minute. No jargon, no forms to fill just to look around."
            )}
          </p>
        </div>

        {/* Quick jump chips */}
        <div className="reveal mt-6 min-w-0 sm:mt-7">
          <p className="text-[11px] font-bold tracking-[0.12em] text-slate-400 uppercase">
            {t("Tap a service to jump straight in")}
          </p>
          <div className="-mx-1 mt-2.5 flex snap-x gap-2 overflow-x-auto px-1 pb-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {SERVICES.map((service, index) => {
              const Icon = service.icon;
              const selected = index === activeIndex;
              return (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => goTo(index)}
                  aria-pressed={selected}
                  className={`inline-flex min-h-10 shrink-0 snap-start items-center gap-2 rounded-full border px-3 py-1.5 text-[12.5px] font-semibold transition-colors sm:min-h-11 sm:px-3.5 sm:text-[13px] ${
                    selected
                      ? "border-[#2563EB] bg-[#2563EB] text-white shadow-sm"
                      : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span className="whitespace-nowrap">{t(service.title)}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ---------------- Viewer + playlists ---------------- */}
        <div className="mt-5 grid min-w-0 gap-5 lg:mt-7 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start lg:gap-7">
          {/* Player card */}
          <div
            ref={viewerRef}
            className="reveal min-w-0 scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_18px_50px_-32px_rgba(11,18,32,0.35)] sm:p-5 lg:p-6"
          >
            <div className="flex min-w-0 flex-wrap items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-[0.1em] text-[#2563EB] sm:text-[11px]">
                <Sparkles className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                {t("Watch how it works")}
              </span>
              <span className="text-[11.5px] font-semibold text-slate-400 sm:text-[12px]">
                {pad(activeIndex)} / 0{total}
                <span className="sr-only"> {t("service")}</span>
              </span>
            </div>

            <div className="mt-2.5">
              <VideoFrame
                key={active.id}
                video={active.video}
                title={t(active.title)}
                label={t("Explainer Video")}
              />
            </div>

            {/* Title + hook + short description (directly under the video) */}
            <div className="mt-4 min-w-0">
              <div className="flex min-w-0 items-start gap-3">
                <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#2563EB] text-white sm:h-11 sm:w-11">
                  <ActiveIcon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <h2 className="break-words font-[Manrope] text-[19px] font-extrabold leading-snug tracking-tight text-[#0B1220] sm:text-[23px]">
                    {t(active.title)}
                  </h2>
                  <p className="mt-0.5 break-words text-[13px] font-semibold text-[#2563EB] sm:text-[13.5px]">
                    {t(active.tagline)}
                  </p>
                </div>
              </div>

              <p className="mt-3 break-words text-[14px] leading-relaxed text-slate-600 sm:text-[15px]">
                {t(active.description)}
              </p>

              <ul className="mt-3.5 grid min-w-0 gap-2 sm:grid-cols-1">
                {active.quickPoints.map((point) => (
                  <li
                    key={point}
                    className="flex min-w-0 items-start gap-2 text-[13px] font-medium leading-snug text-slate-700 sm:text-[14px]"
                  >
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-blue-100 text-[#2563EB]">
                      <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                    </span>
                    <span className="min-w-0">{t(point)}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="mt-4 flex min-w-0 flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={() => onSelectService(active.formValue)}
                className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#2563EB] px-5 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-[#1D4ED8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 sm:w-auto"
              >
                {t("Enquire About This Service")}
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={() => setDetailsOpen((open) => !open)}
                aria-expanded={detailsOpen}
                aria-controls="service-full-details"
                className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-5 py-3 text-[14px] font-semibold text-[#0B1220] transition-colors hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 sm:w-auto"
              >
                {detailsOpen ? t("Hide full details") : t("See full details")}
                <ChevronDown
                  className={`h-4 w-4 shrink-0 transition-transform ${detailsOpen ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </button>
            </div>

            {/* Progressive disclosure: full details only when asked for */}
            <div
              id="service-full-details"
              hidden={!detailsOpen}
              className="mt-4 min-w-0 rounded-xl border border-slate-200 bg-[#F8FAFC] p-3.5 sm:p-5"
            >
              <p className="text-[11px] font-bold tracking-[0.12em] text-slate-400 uppercase">
                {t("What's included")}
              </p>
              <ul className="mt-2.5 grid min-w-0 gap-x-6 gap-y-2 sm:grid-cols-2">
                {active.includes.map((item) => (
                  <li
                    key={item}
                    className="flex min-w-0 items-start gap-2 text-[13px] font-medium leading-snug text-slate-700 sm:text-[13.5px]"
                  >
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#2563EB]" strokeWidth={3} aria-hidden="true" />
                    <span className="min-w-0">{t(item)}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3.5 rounded-lg bg-white p-3 text-[12.5px] leading-relaxed text-slate-600 ring-1 ring-slate-200 sm:text-[13px]">
                <span className="font-bold text-[#0B1220]">{t("Best for:")} </span>
                {t(active.bestFor)}
              </p>
            </div>

            {/* Previous / next service */}
            <div className="mt-4 flex min-w-0 items-stretch gap-2 border-t border-slate-100 pt-4">
              <button
                type="button"
                onClick={() => goTo(activeIndex - 1)}
                className="inline-flex min-h-11 min-w-0 flex-1 items-center gap-2 rounded-lg border border-slate-200 px-3 py-2.5 text-left text-[12.5px] font-semibold text-slate-700 transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-[#2563EB] sm:text-[13px]"
              >
                <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span className="min-w-0 truncate">{t(SERVICES[(activeIndex - 1 + total) % total].title)}</span>
              </button>
              <button
                type="button"
                onClick={() => goTo(activeIndex + 1)}
                className="inline-flex min-h-11 min-w-0 flex-1 items-center justify-end gap-2 rounded-lg border border-slate-200 px-3 py-2.5 text-right text-[12.5px] font-semibold text-slate-700 transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-[#2563EB] sm:text-[13px]"
              >
                <span className="min-w-0 truncate">{t(SERVICES[(activeIndex + 1) % total].title)}</span>
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Playlist: all services at a glance */}
          <div className="reveal min-w-0 rounded-2xl border border-slate-200 bg-[#F8FAFC] p-3 sm:p-4 lg:sticky lg:top-24">
            <div className="flex items-center justify-between gap-2 px-1">
              <p className="text-[11px] font-bold tracking-[0.12em] text-slate-500 uppercase">
                {t("All services")}
              </p>
              <span className="text-[11px] font-semibold text-slate-400">
                {total} {t("videos")}
              </span>
            </div>

            <ul className="mt-2.5 min-w-0 space-y-2" role="group" aria-label={t("Choose a service")}>
              {SERVICES.map((service, index) => {
                const Icon = service.icon;
                const selected = index === activeIndex;
                return (
                  <li key={service.id} className="min-w-0">
                    <a
                      href={`#/services/${service.id}`}
                      aria-current={selected ? "true" : undefined}
                      onClick={(event) => {
                        event.preventDefault();
                        goTo(index);
                      }}
                      className={`group flex min-w-0 items-center gap-3 rounded-xl border p-2.5 transition-colors sm:p-3 ${
                        selected
                          ? "border-[#2563EB] bg-white shadow-sm"
                          : "border-transparent bg-white/70 hover:border-slate-200 hover:bg-white"
                      }`}
                    >
                      {/* mini video thumb */}
                      <span
                        className={`relative flex aspect-video w-[68px] shrink-0 items-center justify-center overflow-hidden rounded-lg sm:w-[80px] ${
                          selected ? "bg-[#2563EB]" : "bg-[#0B1220]"
                        }`}
                        aria-hidden="true"
                      >
                        <span className="bg-grid-dark absolute inset-0 opacity-70" />
                        <CirclePlay className="relative h-5 w-5 text-white/90" />
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="flex min-w-0 items-center gap-1.5">
                          <Icon
                            className={`h-3.5 w-3.5 shrink-0 ${selected ? "text-[#2563EB]" : "text-slate-400"}`}
                            aria-hidden="true"
                          />
                          <span className="text-[10.5px] font-bold tracking-widest text-slate-400">
                            {pad(index)}
                          </span>
                        </span>
                        <span
                          className={`mt-0.5 block break-words text-[13px] font-bold leading-snug ${
                            selected ? "text-[#0B1220]" : "text-slate-700"
                          }`}
                        >
                          {t(service.title)}
                        </span>
                        <span className="mt-0.5 block truncate text-[11.5px] text-slate-500">
                          {t(service.video ? "Watch video" : "Video coming soon")}
                        </span>
                      </span>

                      <ArrowUpRight
                        className={`h-4 w-4 shrink-0 ${
                          selected ? "text-[#2563EB]" : "text-slate-300 group-hover:text-slate-400"
                        }`}
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="mt-3 rounded-xl bg-[#0B1220] p-3.5 text-white">
              <p className="text-[12.5px] font-semibold leading-snug sm:text-[13px]">
                {t("Still not sure which one you need?")}
              </p>
              <p className="mt-1 text-[11.5px] leading-relaxed text-slate-300 sm:text-[12px]">
                {t("Tell us your problem in one line — we will suggest the right service.")}
              </p>
              <button
                type="button"
                onClick={() => onSelectService("Appointment / Consultation")}
                className="mt-2.5 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-lg bg-white px-3 py-2 text-[12.5px] font-bold text-[#0B1220] transition-colors hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1220]"
              >
                {t("Ask us directly")}
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        {/* ---------------- Closing CTA ---------------- */}
        <div className="reveal relative mt-9 overflow-hidden rounded-2xl bg-[#0B1220] px-4 py-6 text-white sm:mt-12 sm:px-8 sm:py-8">
          <div className="bg-grid-dark pointer-events-none absolute" aria-hidden="true" />
          <div className="flex min-w-0 flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0">
              <p className="text-[11.5px] font-bold tracking-[0.14em] text-[#38BDF8] uppercase">
                {t("Next step")}
              </p>
              <h2 className="mt-2 break-words font-[Manrope] text-[20px] font-extrabold leading-snug tracking-tight sm:text-[26px]">
                {t("Found the service you need? Let's talk about your project.")}
              </h2>
              <p className="mt-2 max-w-2xl text-[13.5px] leading-relaxed text-slate-300 sm:text-[14.5px]">
                {t(
                  "Share your requirement and get a clear plan, timeline and next step — no obligation."
                )}
              </p>
            </div>
            <div className="flex min-w-0 flex-col gap-2.5 sm:flex-row">
              <button
                type="button"
                onClick={() => onSelectService(active.formValue)}
                className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#2563EB] px-5 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-[#1D4ED8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1220] sm:w-auto"
              >
                {t("Start a Project")}
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
              </button>
              <a
                href="#/contact"
                className="inline-flex min-h-11 w-full items-center justify-center rounded-lg border border-white/15 bg-white/5 px-5 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1220] sm:w-auto"
              >
                {t("Contact Us")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
