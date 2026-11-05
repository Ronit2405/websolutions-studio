import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { SERVICES } from "../data/content";
import { useLanguage } from "../i18n";

interface Props {
  onSelectService: (formValue: string) => void;
}

export default function Services({ onSelectService }: Props) {
  const { t } = useLanguage();
  const [activeId, setActiveId] = useState(SERVICES[0].id);
  const active = SERVICES.find((service) => service.id === activeId) ?? SERVICES[0];
  const ActiveIcon = active.icon;

  return (
    <section id="services" className="bg-white pt-24 pb-16 sm:pt-32 sm:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="reveal max-w-2xl">
          <p className="text-[12px] font-bold tracking-[0.14em] text-[#2563EB] uppercase">{t("Our Services")}</p>
          <h1 className="mt-3 break-words font-[Manrope] text-[28px] font-extrabold tracking-tight text-[#0B1220] sm:text-[38px] sm:leading-[1.15]">
            {t("Digital Solutions Designed for Your Business")}
          </h1>
          <p className="mt-4 text-[16px] leading-relaxed text-slate-600">
            {t("From building your online presence to automating everyday business operations, we provide practical digital solutions that help businesses work smarter.")}
          </p>
        </div>

        <div className="mt-8 grid min-w-0 gap-5 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:gap-8">
          <div className="reveal grid min-w-0 grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-1" role="group" aria-label={t("Choose a service")}>
            {SERVICES.map((service, index) => {
              const Icon = service.icon;
              const selected = service.id === activeId;
              return (
                <button
                  key={service.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setActiveId(service.id)}
                  className={`flex min-w-0 w-full items-start gap-3 rounded-xl border p-3 text-left transition-colors sm:p-4 ${
                    selected
                      ? "border-[#2563EB] bg-blue-50/60 shadow-sm"
                      : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <span
                    className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors ${
                      selected ? "bg-[#2563EB] text-white" : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex min-w-0 items-start gap-2">
                      <span className="shrink-0 pt-0.5 text-[11px] font-bold tracking-widest text-slate-400">0{index + 1}</span>
                      <span className={`min-w-0 break-words text-[14px] font-bold leading-snug [overflow-wrap:anywhere] sm:text-[14.5px] ${selected ? "text-[#0B1220]" : "text-slate-700"}`}>
                        {t(service.title)}
                      </span>
                    </span>
                    <span className="mt-1 block break-words text-[12px] leading-snug text-slate-500 sm:text-[12.5px]">
                      {t(service.short)}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="reveal min-w-0 rounded-2xl border border-slate-200 bg-[#F8FAFC] p-4 sm:p-6 lg:p-8" aria-live="polite">
            <div className="flex min-w-0 items-start gap-4">
              <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#2563EB] text-white sm:flex">
                <ActiveIcon className="h-6 w-6" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <h2 className="break-words font-[Manrope] text-[21px] font-extrabold tracking-tight text-[#0B1220] [overflow-wrap:anywhere] sm:text-[24px]">
                  {t(active.title)}
                </h2>
                <p className="mt-2 max-w-xl break-words text-[15px] leading-relaxed text-slate-600 sm:text-[15.5px]">
                  {t(active.description)}
                </p>
              </div>
            </div>

            <p className="mt-6 text-[12px] font-bold tracking-[0.12em] text-slate-400 uppercase">{t("What's included")}</p>
            <ul className="mt-3 grid min-w-0 gap-x-6 gap-y-2.5 sm:grid-cols-2">
              {active.includes.map((item) => (
                <li key={item} className="flex min-w-0 items-start gap-2.5 break-words text-[14px] font-medium leading-relaxed text-slate-700 sm:text-[14.5px]">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-[#2563EB]">
                    <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                  </span>
                  <span className="min-w-0 [overflow-wrap:anywhere]">{t(item)}</span>
                </li>
              ))}
            </ul>

            <div className="mt-7 flex min-w-0 flex-col gap-4 border-t border-slate-200 pt-5 xl:flex-row xl:items-center xl:justify-between">
              <p className="min-w-0 text-[13.5px] leading-relaxed text-slate-500">
                {t("Not sure which fits your business? Tell us your requirement.")}
              </p>
              <button
                type="button"
                onClick={() => onSelectService(active.formValue)}
                className="inline-flex min-h-11 w-full shrink-0 items-center justify-center gap-2 rounded-lg bg-[#2563EB] px-5 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-[#1D4ED8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 xl:w-auto"
              >
                {t("Learn More — Enquire Now")}
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
