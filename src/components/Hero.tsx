import { ArrowRight, CheckCircle2 } from "lucide-react";
import { IMAGES } from "../data/content";
import { useLanguage } from "../i18n";

const trustPoints = ["Custom-built solutions", "Business-first approach", "Long-term support"];

export default function Hero() {
  const { language, t } = useLanguage();
  return (
    <section id="home" className="relative overflow-hidden bg-[#F8FAFC] pt-[72px]">
      <div className="bg-grid-light pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid min-w-0 items-center gap-8 py-10 sm:gap-10 sm:py-14 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-12 lg:py-20">
          {/* Copy */}
          <div className="reveal min-w-0">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-3.5 py-1.5 text-[12px] font-semibold tracking-wide text-[#2563EB] uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-[#38BDF8]" aria-hidden="true" />
              {t("Digital Solutions Studio")}
            </span>
            <h1 className="mt-5 break-words font-[Manrope] text-[34px] font-extrabold leading-[1.1] tracking-tight text-[#0B1220] sm:text-[46px] lg:text-[52px]">
              {language === "en" ? (
                <>Build <span className="text-[#2563EB]">Smarter.</span> Work Better. Grow Faster.</>
              ) : (
                <><span className="text-[#2563EB]">{t("Build Smarter.")}</span> {t("Work Better. Grow Faster.")}</>
              )}
            </h1>
            <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-slate-600 sm:text-[17.5px]">
              {t("We help businesses go digital with professional websites, intelligent automation and custom AI-powered solutions.")}
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:items-center">
              <a
                href="#/services"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#2563EB] px-6 py-3.5 text-[15px] font-semibold text-white shadow-sm transition-colors hover:bg-[#1D4ED8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2"
              >
                {t("Explore Our Services")}
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
              </a>
              <a
                href="#/contact"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3.5 text-[15px] font-semibold text-[#0B1220] transition-colors hover:border-slate-400 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2"
              >
                {t("Discuss Your Project")}
              </a>
            </div>
            <ul className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 sm:mt-8">
              {trustPoints.map((point) => (
                <li key={point} className="flex items-center gap-1.5 text-[13.5px] font-medium text-slate-600">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#2563EB]" aria-hidden="true" />
                  {t(point)}
                </li>
              ))}
            </ul>
          </div>

          {/* Visual — clean standalone workspace image without any overlay */}
          <div className="reveal min-w-0">
            <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-[#0B1220] shadow-[0_22px_50px_-18px_rgba(11,18,32,0.3)]">
              <picture>
                <source srcSet={IMAGES.hero} type="image/webp" />
                <img
                  src={IMAGES.heroFallback}
                  alt={t("Digital solutions workspace showing Website Development, AI Agents & Automation, AI Calling Solutions, Digital Document & Workflow Management, and Custom Digital Solutions")}
                  width={1672}
                  height={941}
                  className="block h-auto w-full"
                  loading="eager"
                  fetchPriority="high"
                />
              </picture>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
