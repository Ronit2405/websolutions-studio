import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { SERVICES } from "../data/content";

interface Props {
  onSelectService: (formValue: string) => void;
}

export default function Services({ onSelectService }: Props) {
  const [activeId, setActiveId] = useState(SERVICES[0].id);
  const active = SERVICES.find((s) => s.id === activeId) ?? SERVICES[0];
  const ActiveIcon = active.icon;

  return (
    <section id="services" className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="reveal max-w-2xl">
          <p className="text-[12px] font-bold tracking-[0.14em] text-[#2563EB] uppercase">Our Services</p>
          <h2 className="mt-3 font-[Manrope] text-[30px] font-extrabold tracking-tight text-[#0B1220] sm:text-[38px] sm:leading-[1.15]">
            Digital Solutions Designed for Your Business
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-slate-600">
            From building your online presence to automating everyday business operations, we provide practical digital solutions that help businesses work smarter.
          </p>
        </div>

        <div className="mt-10 grid min-w-0 gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-8">
          {/* Selector */}
          <div className="reveal" role="tablist" aria-label="Services">
            <div className="grid min-w-0 grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1">
              {SERVICES.map((s, i) => {
                const Icon = s.icon;
                const selected = s.id === activeId;
                return (
                  <button
                    key={s.id}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setActiveId(s.id)}
                    className={`flex min-w-0 items-center gap-3 rounded-xl border p-3 text-left transition-all sm:p-4 ${
                      selected
                        ? "border-[#2563EB] bg-blue-50/60 shadow-sm"
                        : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg transition-colors ${
                        selected ? "bg-[#2563EB] text-white" : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="flex items-center gap-2">
                        <span className="text-[11px] font-bold tracking-widest text-slate-400">0{i + 1}</span>
                        <span className={`block whitespace-normal break-words text-[14px] font-bold leading-snug sm:text-[14.5px] ${selected ? "text-[#0B1220]" : "text-slate-700"}`}>
                          {s.title}
                        </span>
                      </span>
                      <span className="mt-0.5 block text-[12.5px] text-slate-500">{s.short}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detail panel */}
          <div className="reveal min-w-0 rounded-2xl border border-slate-200 bg-[#F8FAFC] p-5 sm:p-8" role="tabpanel" aria-live="polite">
            <div className="flex items-start gap-4">
              <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#2563EB] text-white sm:flex">
                <ActiveIcon className="h-6 w-6" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-[Manrope] text-[22px] font-extrabold tracking-tight text-[#0B1220] sm:text-[24px]">{active.title}</h3>
                <p className="mt-2 max-w-xl text-[15.5px] leading-relaxed text-slate-600">{active.description}</p>
              </div>
            </div>

            <p className="mt-7 text-[12px] font-bold tracking-[0.12em] text-slate-400 uppercase">What&apos;s included</p>
            <ul className="mt-3 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
              {active.includes.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[14.5px] font-medium text-slate-700">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-[#2563EB]">
                    <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[13.5px] text-slate-500">Not sure which fits your business? Tell us your requirement.</p>
              <button
                type="button"
                onClick={() => onSelectService(active.formValue)}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#2563EB] px-5 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-[#1D4ED8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2"
              >
                Learn More — Enquire Now
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
