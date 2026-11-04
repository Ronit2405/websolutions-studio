import { Search, Lightbulb, Hammer, LifeBuoy, Camera } from "lucide-react";

const STEPS = [
  { icon: Search, title: "Understand", text: "We learn your requirements and current process." },
  { icon: Lightbulb, title: "Recommend", text: "We identify the right, practical solution." },
  { icon: Hammer, title: "Build", text: "We develop and deliver with care." },
  { icon: LifeBuoy, title: "Support", text: "We stay available for ongoing support." },
];

export default function About() {
  return (
    <section id="about" className="bg-[#F8FAFC] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          {/* Copy */}
          <div className="reveal">
            <p className="text-[12px] font-bold tracking-[0.14em] text-[#2563EB] uppercase">About Us</p>
            <h2 className="mt-3 font-[Manrope] text-[30px] font-extrabold tracking-tight text-[#0B1220] sm:text-[38px] sm:leading-[1.15]">
              About WebSolutions Studio
            </h2>
            <div className="mt-6 space-y-4 text-[15.5px] leading-relaxed text-slate-600">
              <p>
                <strong className="font-semibold text-[#0B1220]">Hello, I&apos;m Ronit Sundrani, founder of WebSolutions Studio.</strong>
              </p>
              <p>I started WebSolutions Studio with a simple vision: helping businesses simplify their work through technology.</p>
              <p>
                We focus on building professional websites, digitizing business processes and developing AI-powered solutions that make everyday business operations more efficient.
              </p>
              <p>
                Our approach is simple. We first understand your requirements, identify the right solution and then work towards delivering something practical and valuable for your business.
              </p>
              <p className="border-l-[3px] border-[#2563EB] pl-4 font-medium text-slate-700">
                At WebSolutions Studio, we believe technology should make business easier, not more complicated.
              </p>
            </div>

            {/* Approach steps */}
            <div className="mt-10">
              <p className="text-[12px] font-bold tracking-[0.12em] text-slate-400 uppercase">How we work</p>
              <ol className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
                {STEPS.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <li key={s.title} className="rounded-xl border border-slate-200 bg-white p-4">
                      <div className="flex items-center justify-between">
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-[#2563EB]">
                          <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                        </span>
                        <span className="text-[11px] font-bold text-slate-300">Step {i + 1}</span>
                      </div>
                      <p className="mt-3 text-[14px] font-bold text-[#0B1220]">{s.title}</p>
                      <p className="mt-1 text-[12.5px] leading-relaxed text-slate-500">{s.text}</p>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>

          {/* Founder placeholder */}
          <div className="reveal">
            <figure className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="relative flex aspect-[4/5] flex-col items-center justify-center bg-[#0B1220] px-8 text-center sm:aspect-[5/5]">
                <div className="bg-grid-dark pointer-events-none absolute inset-0" aria-hidden="true" />
                <div className="relative">
                  <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border-2 border-dashed border-white/30 bg-white/5">
                    <span className="font-[Manrope] text-[34px] font-extrabold tracking-tight text-white">RS</span>
                  </div>
                  <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-[12px] font-semibold text-slate-200 ring-1 ring-white/15">
                    <Camera className="h-3.5 w-3.5" aria-hidden="true" />
                    Founder photo placeholder
                  </div>
                  <p className="mt-4 text-[13px] leading-relaxed text-slate-400">
                    Replace this placeholder with an actual photograph when available.
                  </p>
                </div>
              </div>
              <figcaption className="flex items-center justify-between gap-4 px-6 py-5">
                <div>
                  <p className="font-[Manrope] text-[16px] font-extrabold text-[#0B1220]">Ronit Sundrani</p>
                  <p className="text-[13px] text-slate-500">Founder, WebSolutions Studio</p>
                </div>
                <span className="rounded-md bg-blue-50 px-2.5 py-1 text-[11px] font-bold tracking-wide text-[#2563EB] uppercase">Founder</span>
              </figcaption>
            </figure>
            <p className="mt-3 text-center text-[12.5px] text-slate-400">
              Smart Digital Solutions for Growing Businesses.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
