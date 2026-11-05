import { useState } from "react";
import { Check, ChevronDown, Truck, Package, ClipboardList, Factory } from "lucide-react";
import { useLanguage } from "../i18n";

const FEATURES = [
  "Truck Entry & Exit Management",
  "Live Truck Status",
  "Stock Management",
  "Organized Operational Records",
];

const TAGS = ["Custom System", "Operations", "Multi-Mill"];

function DashboardMock() {
  const { t } = useLanguage();
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm" aria-hidden="true">
      {/* Window bar */}
      <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-50 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
        <span className="ml-3 hidden rounded-md bg-white px-2.5 py-1 text-[11px] font-medium text-slate-400 ring-1 ring-slate-200 sm:block">
          {t("rice-mill-operations / dashboard")}
        </span>
      </div>
      <div className="p-4 sm:p-5">
        <div className="flex items-center justify-between">
          <p className="text-[13px] font-bold text-[#0B1220]">{t("Operations Overview")}</p>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> {t("Live")}
          </span>
        </div>
        <div className="mt-3 grid min-w-0 grid-cols-3 gap-2">
          {[
            { icon: Truck, label: "Trucks Inside", value: "—" },
            { icon: Package, label: "Stock Level", value: "—" },
            { icon: ClipboardList, label: "Today's Entries", value: "—" },
          ].map((c) => {
            const Icon = c.icon;
            return (
              <div key={c.label} className="min-w-0 rounded-lg border border-slate-200 bg-slate-50 p-2 sm:p-3">
                <Icon className="h-4 w-4 text-[#2563EB]" />
                <p className="mt-2 text-[16px] font-extrabold text-slate-300">—</p>
                <p className="break-words text-[9px] font-medium leading-tight text-slate-400 sm:text-[10.5px]">{t(c.label)}</p>
              </div>
            );
          })}
        </div>
        <div className="mt-3 overflow-hidden rounded-lg border border-slate-200">
          <table className="w-full table-fixed text-left text-[10px] leading-snug sm:table-auto sm:text-[11.5px]">
            <thead>
              <tr className="bg-slate-50 text-slate-500">
                <th className="px-1 py-2 font-semibold sm:px-3">{t("Vehicle")}</th>
                <th className="px-1 py-2 font-semibold sm:px-3">{t("Mill")}</th>
                <th className="px-1 py-2 font-semibold sm:px-3">{t("Status")}</th>
              </tr>
            </thead>
            <tbody className="text-slate-500">
              <tr className="border-t border-slate-100"><td className="px-1 py-2 sm:px-3">{t("Entry record")}</td><td className="px-1 py-2 sm:px-3">{t("Mill A")}</td><td className="px-1 py-2 sm:px-3"><span className="rounded bg-blue-50 px-1 py-0.5 text-[10px] sm:px-1.5 font-semibold text-[#2563EB]">{t("Inside")}</span></td></tr>
              <tr className="border-t border-slate-100"><td className="px-1 py-2 sm:px-3">{t("Exit record")}</td><td className="px-1 py-2 sm:px-3">{t("Mill B")}</td><td className="px-1 py-2 sm:px-3"><span className="rounded bg-slate-100 px-1 py-0.5 text-[10px] sm:px-1.5 font-semibold text-slate-500">{t("Exited")}</span></td></tr>
              <tr className="border-t border-slate-100"><td className="px-1 py-2 sm:px-3">{t("Stock update")}</td><td className="px-1 py-2 sm:px-3">{t("Mill A")}</td><td className="px-1 py-2 sm:px-3"><span className="rounded bg-emerald-50 px-1 py-0.5 text-[10px] sm:px-1.5 font-semibold text-emerald-700">{t("Synced")}</span></td></tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-center text-[11px] text-slate-400">{t("Interface preview — replace with actual project screenshot.")}</p>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState(false);

  return (
    <section id="work" className="bg-white pt-24 pb-16 sm:pt-32 sm:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="reveal max-w-2xl">
          <p className="text-[12px] font-bold tracking-[0.14em] text-[#2563EB] uppercase">{t("Our Work")}</p>
          <h1 className="mt-3 break-words font-[Manrope] text-[28px] font-extrabold tracking-tight text-[#0B1220] sm:text-[38px] sm:leading-[1.15]">
            {t("Solutions We've Worked On")}
          </h1>
          <p className="mt-4 text-[16px] leading-relaxed text-slate-600">
            {t("A look at the kind of practical systems we build for real business operations.")}
          </p>
        </div>

        <article className="reveal mt-10 grid min-w-0 gap-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:gap-8 sm:p-6 lg:grid-cols-2 lg:gap-12 lg:p-8">
          <DashboardMock />
          <div className="flex flex-col">
            <div className="flex flex-wrap items-center gap-2">
              {TAGS.map((tag) => (
                <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-[11.5px] font-semibold text-slate-600">{t(tag)}</span>
              ))}
            </div>
            <h3 className="mt-4 flex items-start gap-2.5 font-[Manrope] text-[24px] font-extrabold leading-snug tracking-tight text-[#0B1220]">
              <Factory className="mt-1 h-6 w-6 shrink-0 text-[#2563EB]" aria-hidden="true" />
              {t("Rice Mill Operations Management System")}
            </h3>
            <p className="mt-3 text-[15.5px] leading-relaxed text-slate-600">
              {t("A customized digital management system designed to help rice mill operations manage truck entries, truck exits, vehicle status and stock information across different mills.")}
            </p>
            <p className="mt-6 text-[12px] font-bold tracking-[0.12em] text-slate-400 uppercase">{t("Key features")}</p>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {FEATURES.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-[14px] font-medium text-slate-700">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-[#2563EB]">
                    <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                  </span>
                  {t(feature)}
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-8">
              <a
                href="#/contact"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-5 py-3 text-[14px] font-semibold text-[#0B1220] transition-colors hover:border-[#2563EB] hover:text-[#2563EB]"
              >
                {t("Discuss a Similar System")}
              </a>
            </div>
          </div>
        </article>

        {/* Expandable note */}
        <div className="reveal mt-6 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-6 py-5">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            className="flex w-full items-center justify-between gap-4 text-left"
          >
            <span className="text-[14px] font-semibold text-slate-700">
              {t("More case studies will be added here as projects are completed.")}
            </span>
            <ChevronDown className={`h-5 w-5 shrink-0 text-slate-400 transition-transform ${expanded ? "rotate-180" : ""}`} aria-hidden="true" />
          </button>
          {expanded && (
            <p className="mt-3 max-w-2xl text-[13.5px] leading-relaxed text-slate-500">
              {t("This portfolio is intentionally kept honest — we only showcase work we have actually delivered. New projects, with screenshots and feature breakdowns, will appear here over time. If you would like to see examples relevant to your industry, please ask us during your consultation.")}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
