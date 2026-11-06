import {
  ArrowRight,
  ArrowUpRight,
  Blocks,
  Bot,
  FolderSync,
  Globe,
  PhoneCall,
  type LucideIcon,
} from "lucide-react";
import { useLanguage } from "../i18n";

interface HomeServiceItem {
  id: string;
  icon: LucideIcon;
  title: string;
  tagline: string;
  summary: string;
  highlights: string[];
}

const HOME_SERVICES: HomeServiceItem[] = [
  {
    id: "website-development",
    icon: Globe,
    title: "Website Development",
    tagline: "Modern. Fast. Scalable.",
    summary:
      "Responsive, custom-built websites and web apps that build trust and grow your online presence.",
    highlights: ["Business Websites", "Landing Pages", "Custom Web Apps"],
  },
  {
    id: "document-workflow",
    icon: FolderSync,
    title: "Digital Document & Workflow Management",
    tagline: "Organize. Automate. Grow.",
    summary:
      "Move away from manual paperwork with organized digital records, forms, and smooth daily workflows.",
    highlights: ["Digital Records", "Smart Forms", "Workflow Automation"],
  },
  {
    id: "ai-agents",
    icon: Bot,
    title: "AI Agents & Automation",
    tagline: "Work Smarter, Not Harder.",
    summary:
      "Save hours on repetitive work using smart AI assistants for customer support, leads, and daily tasks.",
    highlights: ["AI Support Agents", "Lead Automation", "Business Assistants"],
  },
  {
    id: "ai-calling",
    icon: PhoneCall,
    title: "AI Calling Solutions",
    tagline: "Automate Your Calls.",
    summary:
      "Handle routine customer calls, appointment bookings, and lead follow-ups automatically with AI voice agents.",
    highlights: ["AI Voice Agents", "Appointment Calls", "Lead Follow-ups"],
  },
  {
    id: "custom-solutions",
    icon: Blocks,
    title: "Custom Digital Solutions",
    tagline: "Built Around Your Needs.",
    summary:
      "Tailor-made software, dashboards, and management systems built around how your business actually works.",
    highlights: ["Custom Software", "Management Systems", "Data Dashboards"],
  },
];

export default function HomeServices() {
  const { t } = useLanguage();

  return (
    <section
      aria-labelledby="home-services-heading"
      className="border-t border-slate-200/80 bg-white py-14 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="reveal flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl min-w-0">
            <p className="text-[12px] font-bold tracking-[0.14em] text-[#2563EB] uppercase">
              {t("What We Offer")}
            </p>
            <h2
              id="home-services-heading"
              className="mt-2.5 break-words font-[Manrope] text-[26px] font-extrabold leading-[1.15] tracking-tight text-[#0B1220] sm:text-[34px] lg:text-[38px]"
            >
              {t("Services We Provide to Grow Your Business")}
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-slate-600 sm:text-[16px]">
              {t(
                "A quick overview of how we help businesses go digital — visit our Services page for complete details."
              )}
            </p>
          </div>

          <a
            href="#/services"
            className="hidden shrink-0 items-center gap-2 rounded-lg border border-slate-200 bg-[#F8FAFC] px-4 py-2.5 text-[13.5px] font-semibold text-[#0B1220] transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-[#2563EB] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 lg:inline-flex"
          >
            {t("View Detailed Services")}
            <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
          </a>
        </div>

        {/* Scannable responsive grid: 1 col on mobile, 2 cols on tablet, 3 cols on desktop */}
        <div className="mt-8 grid min-w-0 grid-cols-1 gap-3.5 sm:mt-10 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
          {HOME_SERVICES.map((item, index) => {
            const Icon = item.icon;
            return (
              <a
                key={item.id}
                href="#/services"
                className="reveal group flex min-w-0 flex-col justify-between rounded-2xl border border-slate-200 bg-[#F8FAFC]/75 p-4 transition-all duration-200 hover:border-[#2563EB]/40 hover:bg-white hover:shadow-[0_16px_36px_-18px_rgba(37,99,235,0.28)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 sm:p-6"
              >
                <div className="min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3 sm:flex-col sm:items-start sm:gap-3.5">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#2563EB] ring-1 ring-blue-100 transition-colors group-hover:bg-[#2563EB] group-hover:text-white group-hover:ring-[#2563EB]">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div className="min-w-0">
                        <p className="flex flex-wrap items-center gap-1.5 text-[11.5px] font-semibold text-[#2563EB]">
                          <span className="font-[Manrope] font-extrabold text-slate-400">
                            0{index + 1}
                          </span>
                          <span className="text-slate-300" aria-hidden="true">
                            ·
                          </span>
                          <span>{t(item.tagline)}</span>
                        </p>
                        <h3 className="mt-0.5 break-words font-[Manrope] text-[16.5px] font-extrabold leading-snug tracking-tight text-[#0B1220] [overflow-wrap:anywhere] sm:text-[18.5px]">
                          {t(item.title)}
                        </h3>
                      </div>
                    </div>

                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200/90 bg-white text-slate-400 transition-colors group-hover:border-blue-200 group-hover:bg-blue-50 group-hover:text-[#2563EB]">
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </div>

                  <p className="mt-3 break-words text-[13.5px] leading-relaxed text-slate-600 sm:text-[14.5px]">
                    {t(item.summary)}
                  </p>
                </div>

                <ul className="mt-3.5 flex flex-wrap gap-1.5 pt-1 sm:mt-4">
                  {item.highlights.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-md border border-slate-200/90 bg-white px-2.5 py-1 text-[11.5px] font-medium text-slate-700"
                    >
                      {t(tag)}
                    </li>
                  ))}
                </ul>
              </a>
            );
          })}

          {/* 6th slot: Guidance & Services Page CTA card */}
          <div className="reveal relative flex min-w-0 flex-col justify-between overflow-hidden rounded-2xl bg-[#0B1220] p-5 text-white shadow-sm sm:p-6">
            <div className="bg-grid-dark pointer-events-none absolute inset-0" aria-hidden="true" />
            <div className="relative min-w-0">
              <p className="text-[11.5px] font-bold tracking-[0.14em] text-[#38BDF8] uppercase">
                {t("Explore Further")}
              </p>
              <h3 className="mt-2 break-words font-[Manrope] text-[19px] font-extrabold leading-snug tracking-tight text-white sm:text-[21px]">
                {t("Need Full Details or a Custom Plan?")}
              </h3>
              <p className="mt-2.5 text-[13.5px] leading-relaxed text-slate-300 sm:text-[14px]">
                {t(
                  "Visit our Services page for complete breakdowns, or share your requirement and we'll guide you personally."
                )}
              </p>
            </div>

            <div className="relative mt-5 flex flex-col gap-2.5">
              <a
                href="#/services"
                className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#2563EB] px-4 py-2.5 text-[13.5px] font-semibold text-white transition-colors hover:bg-[#1D4ED8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1220]"
              >
                {t("View Services Page")}
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
              </a>
              <a
                href="#/contact"
                className="inline-flex min-h-11 w-full items-center justify-center rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-[13.5px] font-semibold text-white transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1220]"
              >
                {t("Discuss Your Project")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
