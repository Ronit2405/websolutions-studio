import { ArrowRight, CheckCircle2, Workflow, FileCheck2, PhoneCall } from "lucide-react";
import { IMAGES } from "../data/content";

const trustPoints = ["Custom-built solutions", "Business-first approach", "Long-term support"];

export default function Hero() {
  return (
    <section id="home" className="relative flex min-h-[100svh] items-center overflow-hidden bg-[#F8FAFC] pt-[72px]">
      <div className="bg-grid-light pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid min-w-0 items-center gap-10 py-14 sm:py-16 lg:grid-cols-2 lg:gap-14 lg:py-24">
          {/* Copy */}
          <div className="reveal min-w-0">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-3.5 py-1.5 text-[12px] font-semibold tracking-wide text-[#2563EB] uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-[#38BDF8]" aria-hidden="true" />
              Digital Solutions Studio
            </span>
            <h1 className="mt-5 break-words font-[Manrope] text-[36px] font-extrabold leading-[1.08] tracking-tight text-[#0B1220] sm:text-[48px] lg:text-[54px]">
              Build <span className="text-[#2563EB]">Smarter.</span> Work Better. Grow Faster.
            </h1>
            <p className="mt-5 max-w-xl text-[16.5px] leading-relaxed text-slate-600 sm:text-[17.5px]">
              We help businesses go digital with professional websites, intelligent automation and custom AI-powered solutions.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#/services"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#2563EB] px-6 py-3.5 text-[15px] font-semibold text-white shadow-sm transition-colors hover:bg-[#1D4ED8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2"
              >
                Explore Our Services
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="#/contact"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3.5 text-[15px] font-semibold text-[#0B1220] transition-colors hover:border-slate-400 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2"
              >
                Discuss Your Project
              </a>
            </div>
            <ul className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2">
              {trustPoints.map((t) => (
                <li key={t} className="flex items-center gap-1.5 text-[13.5px] font-medium text-slate-600">
                  <CheckCircle2 className="h-4 w-4 text-[#2563EB]" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* Visual */}
          <div className="reveal relative min-w-0">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_20px_50px_-20px_rgba(11,18,32,0.25)]">
              <img
                src={IMAGES.hero}
                alt="Professional team collaborating in a modern business workspace with laptops and documents"
                className="aspect-[4/3] w-full object-cover"
                loading="eager"
              />
            </div>

            {/* Floating capability card */}
            <div className="absolute -bottom-5 left-4 right-4 sm:left-6 sm:right-auto sm:w-[340px]">
              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-[0_12px_30px_-12px_rgba(11,18,32,0.25)]">
                <p className="text-[11px] font-bold tracking-widest text-slate-400 uppercase">What we build</p>
                <ul className="mt-2.5 space-y-2">
                  <li className="flex items-center gap-2.5 text-[13.5px] font-medium text-slate-700">
                    <span className="flex h-7 w-7 items-center justify-center rounded-md bg-blue-50 text-[#2563EB]"><Workflow className="h-4 w-4" aria-hidden="true" /></span>
                    Websites &amp; web applications
                  </li>
                  <li className="flex items-center gap-2.5 text-[13.5px] font-medium text-slate-700">
                    <span className="flex h-7 w-7 items-center justify-center rounded-md bg-blue-50 text-[#2563EB]"><FileCheck2 className="h-4 w-4" aria-hidden="true" /></span>
                    Digital workflow systems
                  </li>
                  <li className="flex items-center gap-2.5 text-[13.5px] font-medium text-slate-700">
                    <span className="flex h-7 w-7 items-center justify-center rounded-md bg-blue-50 text-[#2563EB]"><PhoneCall className="h-4 w-4" aria-hidden="true" /></span>
                    AI agents &amp; AI calling
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="h-10 sm:h-14" aria-hidden="true" />
      </div>
    </section>
  );
}
