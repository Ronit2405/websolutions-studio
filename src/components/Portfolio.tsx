import { ArrowUpRight, Check, KeyRound } from "lucide-react";
import { useLanguage } from "../i18n";
import { PROJECT_VIDEOS } from "../data/content";
import VideoFrame from "./VideoFrame";

const RICE_MILL_FEATURES = [
  "Truck Entry & Exit Management",
  "Live Truck Status",
  "Stock Management",
  "Organized Operational Records",
];

interface ProjectCardProps {
  /** Reserved 16:9 video slot for the project walkthrough (null = placeholder). */
  video: string | null;
  title: string;
  description: string;
  tags: string[];
  href: string;
  actionLabel: string;
  linkLabel: string;
  features?: string[];
  /** Demo login details shown so visitors can test the live project. */
  credentials?: { id: string; password: string };
}

function ProjectCard({ video, title, description, tags, href, actionLabel, linkLabel, features, credentials }: ProjectCardProps) {
  const { t } = useLanguage();

  return (
    <article className="reveal flex min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-lg">
      <div className="p-3 sm:p-4">
        <VideoFrame
          video={video}
          title={t(title)}
          label={t("Project Video")}
          note={t("A short walkthrough video of this project will be added here soon.")}
        />
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
        {credentials && (
          <div className="mt-4 min-w-0 rounded-xl border border-slate-200 bg-slate-50 p-3 sm:p-4">
            <p className="flex min-w-0 items-center gap-1.5 text-[10.5px] font-bold tracking-[0.1em] text-slate-500 uppercase sm:text-[11px]">
              <KeyRound className="h-3.5 w-3.5 shrink-0 text-[#2563EB]" aria-hidden="true" />
              <span className="min-w-0 break-words">{t("Test Login Details")}</span>
            </p>
            <dl className="mt-2 grid min-w-0 gap-2 min-[400px]:grid-cols-2">
              <div className="min-w-0 rounded-lg border border-slate-200 bg-white px-2.5 py-2">
                <dt className="text-[10px] font-bold tracking-[0.08em] text-slate-400 uppercase">{t("Login ID")}</dt>
                <dd className="mt-0.5 break-words font-mono text-[13.5px] font-bold text-[#0B1220] [overflow-wrap:anywhere]">
                  {credentials.id}
                </dd>
              </div>
              <div className="min-w-0 rounded-lg border border-slate-200 bg-white px-2.5 py-2">
                <dt className="text-[10px] font-bold tracking-[0.08em] text-slate-400 uppercase">{t("Password")}</dt>
                <dd className="mt-0.5 break-words font-mono text-[13.5px] font-bold text-[#0B1220] [overflow-wrap:anywhere]">
                  {credentials.password}
                </dd>
              </div>
            </dl>
            <p className="mt-2 text-[11.5px] leading-relaxed text-slate-500">
              {t("Use these details to test the live system.")}
            </p>
          </div>
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
            video={PROJECT_VIDEOS["rice-mill"]}
            title="Rice Mill Operations Management System"
            description="A digital system for rice mill operations that brings truck entry and exit, live vehicle status, stock information and daily operational records into one place."
            tags={["Rice Mill", "Operations System", "Custom Software"]}
            features={RICE_MILL_FEATURES}
            credentials={{ id: "Admin", password: "Ronit0105" }}
            href="https://rice-mill-operations-system-ib6d.vercel.app/trash"
            actionLabel="Open Rice Mill System"
            linkLabel="Open Rice Mill Operations Management System in a new tab"
          />
          <ProjectCard
            video={PROJECT_VIDEOS["dhurwadera"]}
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
