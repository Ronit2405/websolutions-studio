import { Target, SlidersHorizontal, Cpu, HeartHandshake } from "lucide-react";

const POINTS = [
  {
    n: "01",
    icon: Target,
    title: "Business-Focused Approach",
    text: "We focus on understanding your business requirements before suggesting a digital solution.",
  },
  {
    n: "02",
    icon: SlidersHorizontal,
    title: "Customized Solutions",
    text: "Every solution is designed around your specific business needs.",
  },
  {
    n: "03",
    icon: Cpu,
    title: "Modern Technology",
    text: "We use modern web technologies and AI tools to develop efficient digital solutions.",
  },
  {
    n: "04",
    icon: HeartHandshake,
    title: "Long-Term Support",
    text: "We aim to build long-term professional relationships through reliable communication and support.",
  },
];

export default function WhyUs() {
  return (
    <section className="relative overflow-hidden bg-[#0B1220] py-16 sm:py-24" aria-label="Why choose us">
      <div className="bg-grid-dark pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="reveal flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-[12px] font-bold tracking-[0.14em] text-[#38BDF8] uppercase">Why Choose Us</p>
            <h2 className="mt-3 font-[Manrope] text-[30px] font-extrabold tracking-tight text-white sm:text-[38px] sm:leading-[1.15]">
              Why Work With WebSolutions Studio?
            </h2>
          </div>
          <p className="max-w-md text-[15px] leading-relaxed text-slate-400">
            We keep things practical: understand first, recommend honestly, build carefully and support consistently.
          </p>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2">
          {POINTS.map((p) => {
            const Icon = p.icon;
            return (
              <article key={p.n} className="reveal group bg-[#0B1220] p-7 transition-colors hover:bg-[#101a2e] sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-white/5 text-[#38BDF8] ring-1 ring-white/10">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="font-[Manrope] text-[13px] font-extrabold tracking-widest text-slate-600">{p.n}</span>
                </div>
                <h3 className="mt-5 font-[Manrope] text-[18px] font-bold text-white">{p.title}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-slate-400">{p.text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
