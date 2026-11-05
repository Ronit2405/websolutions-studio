import type { ReactNode } from "react";
import { ArrowUpRight, Check, ClipboardList, Factory, Home, MapPin, Package, Truck } from "lucide-react";
import { useLanguage } from "../i18n";

const RICE_MILL_FEATURES = [
  "Truck Entry & Exit Management",
  "Live Truck Status",
  "Stock Management",
  "Organized Operational Records",
];

interface ProjectCardProps {
  preview: ReactNode;
  title: string;
  description: string;
  tags: string[];
  href: string;
  actionLabel: string;
  linkLabel: string;
  features?: string[];
}

function ProjectCard({ preview, title, description, tags, href, actionLabel, linkLabel, features }: ProjectCardProps) {
  const { t } = useLanguage();

  return (
    <article className="reveal flex min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-lg">
      <div className="p-3 sm:p-4">
        <div className="overflow-hidden rounded-xl">{preview}</div>
      </div>
      <div className="flex min-w-0 flex-1 flex-col px-4 pb-5 sm:px-6 sm:pb-6">
        <div className="flex flex-wrap items-center gap-2">
          {tags.map((tag) => (
            <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-[11.5px] font-semibold text-slate-600">
              {t(tag)}
            </span>
          ))}
        </div>
        <h2 className="mt-3 break-words font-[Manrope] text-[21px] font-extrabold leading-snug tracking-tight text-[#0B1220] [overflow-wrap:anywhere] sm:text-[24px]">
          {t(title)}
        </h2>
        <p className="mt-2 break-words text-[14.5px] leading-relaxed text-slate-600 sm:text-[15px]">
          {t(description)}
        </p>
        {features && (
          <ul className="mt-4 grid min-w-0 gap-2 sm:grid-cols-2">
            {features.map((feature) => (
              <li key={feature} className="flex min-w-0 items-start gap-2 text-[12.5px] font-medium leading-relaxed text-slate-700">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#2563EB]" strokeWidth={2.5} aria-hidden="true" />
                <span className="min-w-0 [overflow-wrap:anywhere]">{t(feature)}</span>
              </li>
            ))}
          </ul>
        )}
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t(linkLabel)}
          className="mt-auto inline-flex min-h-11 w-fit max-w-full items-center gap-2 pt-5 text-[14px] font-bold text-[#2563EB] transition-colors hover:text-[#1D4ED8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-4"
        >
          <span className="break-words">{t(actionLabel)}</span>
          <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}

function RiceMillPreview() {
  const { t } = useLanguage();
  const tiles = [
    { icon: Truck, label: "Truck Movement" },
    { icon: Package, label: "Stock Monitoring" },
    { icon: ClipboardList, label: "Digital Records" },
  ];

  return (
    <div className="relative aspect-[16/10] min-h-[220px] overflow-hidden bg-[#10233F] p-3 sm:p-5" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(56,189,248,0.24),transparent_45%)]" />
      <div className="relative mx-auto flex h-full max-w-xl flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl">
        <div className="flex min-w-0 items-center gap-2.5 border-b border-slate-100 px-3 py-2.5 sm:gap-3 sm:px-4 sm:py-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#2563EB] sm:h-9 sm:w-9">
            <Factory className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="break-words text-[11.5px] font-extrabold leading-tight text-[#0B1220] sm:text-[13px]">{t("Rice Mill Operations")}</p>
            <p className="mt-0.5 text-[9.5px] font-medium text-slate-400 sm:text-[10.5px]">{t("Operations Management System")}</p>
          </div>
          <span className="hidden shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-[9px] font-bold text-slate-500 sm:inline-flex">{t("Project preview")}</span>
        </div>
        <div className="min-w-0 flex-1 p-3 sm:p-4">
          <div className="flex items-center justify-between gap-2">
            <p className="text-[10.5px] font-bold text-slate-700 sm:text-[12px]">{t("Operations Overview")}</p>
            <span className="inline-flex items-center gap-1.5 text-[9px] font-semibold text-slate-400 sm:text-[10px]">
              <MapPin className="h-3 w-3" />{t("Rice mill")}
            </span>
          </div>
          <div className="mt-2.5 grid grid-cols-3 gap-2">
            {tiles.map(({ icon: Icon, label }) => (
              <div key={label} className="min-w-0 rounded-lg border border-slate-100 bg-slate-50 p-2 sm:p-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-50 text-[#2563EB] sm:h-7 sm:w-7">
                  <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </span>
                <p className="mt-2 break-words text-[9px] font-semibold leading-tight text-slate-600 [overflow-wrap:anywhere] sm:text-[10.5px]">{t(label)}</p>
                <span className="mt-2 block h-1 w-2/3 rounded-full bg-blue-100" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function HomestayPreview() {
  const { t } = useLanguage();

  return (
    <div className="relative aspect-[16/10] min-h-[220px] overflow-hidden bg-[#19454A]" aria-hidden="true">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="bastar-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#9BC6BF" />
            <stop offset="100%" stopColor="#E8D9B5" />
          </linearGradient>
          <linearGradient id="bastar-hills" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#527968" />
            <stop offset="100%" stopColor="#173F3D" />
          </linearGradient>
        </defs>
        <rect width="800" height="500" fill="url(#bastar-sky)" />
        <circle cx="615" cy="125" r="54" fill="#F7E8B7" opacity="0.9" />
        <path d="M0 292 118 218l88 59 105-112 119 142 98-83 116 90 87-55 69 47v194H0Z" fill="#78927A" opacity="0.85" />
        <path d="M0 350 123 286l106 58 121-73 108 87 123-76 104 70 115-56v204H0Z" fill="url(#bastar-hills)" />
        <path d="M0 408c106-42 172-17 263 13s155 28 237-4 187-43 300-3v86H0Z" fill="#102E30" opacity="0.9" />
        <path d="M565 500c20-47 45-83 71-99 25 16 47 52 65 99M674 500c13-63 37-111 69-133 31 22 54 70 68 133" fill="none" stroke="#203E34" strokeWidth="12" />
      </svg>
      <div className="absolute inset-0 bg-gradient-to-t from-[#071A1C]/85 via-[#071A1C]/10 to-[#071A1C]/15" />
      <div className="relative flex h-full min-h-[220px] flex-col justify-between p-4 text-white sm:p-6">
        <div className="flex min-w-0 items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/35 bg-white/15 backdrop-blur-sm">
              <Home className="h-4 w-4" />
            </span>
            <span className="min-w-0">
              <span className="block break-words font-[Manrope] text-[14px] font-extrabold leading-tight sm:text-[16px]">Dhurwadera</span>
              <span className="mt-0.5 block text-[9px] font-semibold tracking-[0.12em] text-white/75 uppercase sm:text-[10px]">{t("Homestay website preview")}</span>
            </span>
          </div>
          <span className="hidden shrink-0 items-center gap-1 rounded-full border border-white/35 bg-white/15 px-2 py-1 text-[9px] font-semibold text-white backdrop-blur-sm sm:inline-flex sm:px-2.5 sm:text-[10px]">
            <MapPin className="h-3 w-3" />{t("Bastar, Chhattisgarh")}
          </span>
        </div>
        <div className="max-w-md">
          <p className="text-[19px] font-extrabold leading-tight sm:text-[25px]">{t("Homestay in Bastar")}</p>
          <p className="mt-1.5 max-w-sm text-[11px] leading-relaxed text-white/85 sm:text-[13px]">{t("A warm homestay experience in the heart of Bastar.")}</p>
        </div>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const { t } = useLanguage();

  return (
    <section id="work" className="bg-white pt-24 pb-16 sm:pt-32 sm:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="reveal max-w-2xl">
          <p className="text-[12px] font-bold tracking-[0.14em] text-[#2563EB] uppercase">{t("Our Work")}</p>
          <h1 className="mt-3 break-words font-[Manrope] text-[28px] font-extrabold tracking-tight text-[#0B1220] sm:text-[38px] sm:leading-[1.15]">
            {t("Selected Projects")}
          </h1>
          <p className="mt-4 text-[16px] leading-relaxed text-slate-600">
            {t("A look at two projects we've built: a custom rice-mill operations system and a website for a homestay in Bastar district.")}
          </p>
        </div>

        <div className="mt-10 grid min-w-0 gap-5 lg:grid-cols-2 lg:gap-6">
          <ProjectCard
            preview={<RiceMillPreview />}
            title="Rice Mill Operations Management System"
            description="A digital system for rice mill operations that brings truck entry and exit, live vehicle status, stock information and daily operational records into one place."
            tags={["Rice Mill", "Operations System", "Custom Software"]}
            features={RICE_MILL_FEATURES}
            href="https://rice-mill-operations-system-ib6d.vercel.app/trash"
            actionLabel="Open Rice Mill System"
            linkLabel="Open Rice Mill Operations Management System in a new tab"
          />
          <ProjectCard
            preview={<HomestayPreview />}
            title="Dhurwadera Homestay Website"
            description="A website created for Dhurwadera, a homestay in Bastar district, to introduce the stay and help visitors learn more about the destination."
            tags={["Homestay", "Hospitality", "Website Design"]}
            href="https://dhurwadera.com/"
            actionLabel="Visit Dhurwadera Website"
            linkLabel="Open Dhurwadera Homestay Website in a new tab"
          />
        </div>
      </div>
    </section>
  );
}
