import { Search, Lightbulb, Hammer, LifeBuoy } from "lucide-react";
import { useLanguage } from "../i18n";

const STEPS = [
  { icon: Search, title: "Understand", text: "We learn your requirements and current process." },
  { icon: Lightbulb, title: "Recommend", text: "We identify the right, practical solution." },
  { icon: Hammer, title: "Build", text: "We develop and deliver with care." },
  { icon: LifeBuoy, title: "Support", text: "We stay available for ongoing support." },
];

export default function About() {
  const { t } = useLanguage();
  return (
    <section id="about" className="bg-[#F8FAFC] pt-24 pb-16 sm:pt-32 sm:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid min-w-0 gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
          {/* Copy */}
          <div className="reveal">
            <p className="text-[12px] font-bold tracking-[0.14em] text-[#2563EB] uppercase">{t("About Us")}</p>
            <h1 className="mt-3 break-words font-[Manrope] text-[28px] font-extrabold tracking-tight text-[#0B1220] sm:text-[38px] sm:leading-[1.15]">
              {t("About WebSolutions Studio")}
            </h1>
            <div className="mt-6 space-y-4 text-[15.5px] leading-relaxed text-slate-600">
              <p>
                <strong className="font-semibold text-[#0B1220]">{t("Hello, I'm Ronit Sundrani, founder of WebSolutions Studio.")}</strong>
              </p>
              <p>{t("I started WebSolutions Studio with a simple vision: helping businesses simplify their work through technology.")}</p>
              <p>
                {t("We focus on building professional websites, mobile apps and AI-powered solutions, and digitizing business processes to make everyday operations more efficient.")}
              </p>
              <p>
                {t("Our approach is simple. We first understand your requirements, identify the right solution and then work towards delivering something practical and valuable for your business.")}
              </p>
              <p className="border-l-[3px] border-[#2563EB] pl-4 font-medium text-slate-700">
                {t("At WebSolutions Studio, we believe technology should make business easier, not more complicated.")}
              </p>
            </div>

            {/* Approach steps */}
            <div className="mt-10">
              <p className="text-[12px] font-bold tracking-[0.12em] text-slate-400 uppercase">{t("How we work")}</p>
              <ol className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
                {STEPS.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <li key={s.title} className="rounded-xl border border-slate-200 bg-white p-4">
                      <div className="flex items-center justify-between">
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-[#2563EB]">
                          <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                        </span>
                        <span className="text-[11px] font-bold text-slate-300">{t(`Step ${i + 1}`)}</span>
                      </div>
                      <p className="mt-3 text-[14px] font-bold text-[#0B1220]">{t(s.title)}</p>
                      <p className="mt-1 text-[12.5px] leading-relaxed text-slate-500">{t(s.text)}</p>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>

          {/* Founder portrait */}
          <div className="reveal order-first lg:order-none">
            <figure className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="aspect-[3/4] overflow-hidden bg-[#0B1220]">
                <img
                  src="/images/ronit-sundrani.jpg"
                  alt={t("Ronit Sundrani, founder of WebSolutions Studio")}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <figcaption className="flex items-center justify-between gap-4 px-6 py-5">
                <div>
                  <p className="font-[Manrope] text-[16px] font-extrabold text-[#0B1220]">Ronit Sundrani</p>
                  <p className="text-[13px] text-slate-500">{t("Founder, WebSolutions Studio")}</p>
                </div>
                <span className="rounded-md bg-blue-50 px-2.5 py-1 text-[11px] font-bold tracking-wide text-[#2563EB] uppercase">{t("Founder")}</span>
              </figcaption>
            </figure>
            <p className="mt-3 text-center text-[12.5px] text-slate-400">
              {t("Smart Digital Solutions for Growing Businesses.")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
