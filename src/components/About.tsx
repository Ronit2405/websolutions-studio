import { Search, Lightbulb, Hammer, LifeBuoy, Camera, ShieldCheck } from "lucide-react";
import { FOUNDERS } from "../data/content";

const STEPS = [
  { icon: Search, title: "Understand", text: "We learn your requirements and current process." },
  { icon: Lightbulb, title: "Recommend", text: "We identify the right, practical solution." },
  { icon: Hammer, title: "Build", text: "We develop and deliver with care." },
  { icon: LifeBuoy, title: "Support", text: "We stay available for ongoing support." },
];

function FounderCard({ founder }: { founder: (typeof FOUNDERS)[number] }) {
  return (
    <figure className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Image section */}
      <div className="relative flex aspect-[4/5] flex-col items-center justify-center bg-[#0B1E3A] px-6 text-center sm:aspect-square">
        <div className="bg-grid-dark pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border-2 border-dashed border-white/30 bg-white/5 sm:h-28 sm:w-28">
            <span className="font-[Manrope] text-[30px] font-extrabold tracking-tight text-white sm:text-[34px]">
              {founder.initials}
            </span>
          </div>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-[12px] font-semibold text-slate-200 ring-1 ring-white/15">
            <Camera className="h-3.5 w-3.5" aria-hidden="true" />
            Photo coming soon
          </div>
        </div>
      </div>
      <figcaption className="px-5 py-5 sm:px-6">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="font-[Manrope] text-[16px] font-extrabold text-[#0B1E3A]">{founder.name}</p>
            <p className="mt-0.5 text-[13px] text-slate-500">{founder.role}</p>
          </div>
          <span className="shrink-0 rounded-md bg-blue-50 px-2.5 py-1 text-[11px] font-bold tracking-wide text-[#1E5CC8] uppercase">
            {founder.tag}
          </span>
        </div>
        <p className="mt-3 text-[13px] leading-relaxed text-slate-500">{founder.bio}</p>
      </figcaption>
    </figure>
  );
}

export default function About() {
  return (
    <section id="about" className="bg-[#F3F7FB] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="reveal max-w-2xl">
          <p className="text-[12px] font-bold tracking-[0.14em] text-[#1E5CC8] uppercase">About Us</p>
          <h2 className="mt-3 font-[Manrope] text-[30px] font-extrabold tracking-tight text-[#0B1E3A] sm:text-[38px] sm:leading-[1.15]">
            About WebSolutions Studio
          </h2>
          <div className="mt-6 space-y-4 text-[15.5px] leading-relaxed text-slate-600">
            <p>
              <strong className="font-semibold text-[#0B1E3A]">Hello, we&apos;re Ronit Sundrani and Harsh Barmeda, founders of WebSolutions Studio.</strong>
            </p>
            <p>We started WebSolutions Studio with a simple vision: helping businesses simplify their work through technology.</p>
            <p>
              We focus on building professional websites, digitizing business processes and developing AI-powered solutions that make everyday business operations more efficient.
            </p>
            <p>
              Our approach is simple. We first understand your requirements, identify the right solution and then work towards delivering something practical and valuable for your business — and we actually deliver what we promise.
            </p>
            <p className="flex items-start gap-2.5 border-l-[3px] border-[#1E5CC8] pl-4 font-medium text-slate-700">
              <ShieldCheck className="mt-0.5 h-4.5 w-4.5 shrink-0 text-[#1E5CC8]" aria-hidden="true" />
              At WebSolutions Studio, we believe technology should make business easier, not more complicated — and trust is earned by completing the work.
            </p>
          </div>

          {/* Approach steps */}
          <div className="mt-10">
            <p className="text-[12px] font-bold tracking-[0.12em] text-slate-400 uppercase">How we work</p>
            <ol className="mt-4 grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 lg:grid-cols-4">
              {STEPS.map((s, i) => {
                const Icon = s.icon;
                return (
                  <li key={s.title} className="rounded-xl border border-slate-200 bg-white p-4">
                    <div className="flex items-center justify-between">
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-[#1E5CC8]">
                        <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                      </span>
                      <span className="text-[11px] font-bold text-slate-300">Step {i + 1}</span>
                    </div>
                    <p className="mt-3 text-[14px] font-bold text-[#0B1E3A]">{s.title}</p>
                    <p className="mt-1 text-[12.5px] leading-relaxed text-slate-500">{s.text}</p>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>

        {/* Founders */}
        <div className="mt-14">
          <div className="reveal">
            <p className="text-[12px] font-bold tracking-[0.14em] text-[#1E5CC8] uppercase">Our Founders</p>
            <h3 className="mt-3 font-[Manrope] text-[24px] font-extrabold tracking-tight text-[#0B1E3A] sm:text-[28px]">
              Meet the People Behind the Studio
            </h3>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:gap-8">
            {FOUNDERS.map((f) => (
              <div key={f.name} className="reveal">
                <FounderCard founder={f} />
              </div>
            ))}
          </div>
          <p className="mt-4 text-center text-[12.5px] text-slate-400">
            Smart Digital Solutions for Growing Businesses — delivered with trust.
          </p>
        </div>
      </div>
    </section>
  );
}
