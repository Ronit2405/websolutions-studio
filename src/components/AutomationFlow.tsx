import { ArrowRight, Bot, CalendarCheck, Check, Clock3, PhoneCall, UserRound } from "lucide-react";

const steps = [
  { icon: PhoneCall, title: "A customer calls", text: "A new lead calls after hours or while your team is busy." },
  { icon: Bot, title: "Your AI answers", text: "It handles common questions, captures details, qualifies the lead and can book appointments." },
  { icon: CalendarCheck, title: "Work moves forward", text: "The customer gets a quick response; your team receives a clear summary and follows up when a human is needed." },
];

export default function AutomationFlow() {
  return (
    <section className="bg-white py-16 sm:py-20" aria-labelledby="automation-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid min-w-0 gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-14">
          <div className="reveal min-w-0">
            <p className="text-[12px] font-bold tracking-[0.14em] text-[#2563EB] uppercase">Less busywork, faster service</p>
            <h2 id="automation-heading" className="mt-3 max-w-xl font-[Manrope] text-[30px] font-extrabold leading-tight tracking-tight text-[#0B1220] sm:text-[38px]">
              Let automation handle the routine. Keep people focused on people.
            </h2>
            <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-slate-600">
              Imagine an AI calling assistant that answers routine calls, follows up with leads and books appointments, while your team handles the conversations that need a personal touch. We map the process to your business, connect the right tools and keep a human hand-off in place.
            </p>
            <div className="mt-6 flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50/70 p-4">
              <Clock3 className="mt-0.5 h-5 w-5 shrink-0 text-[#2563EB]" aria-hidden="true" />
              <p className="text-[14px] leading-relaxed text-slate-700">
                <strong className="text-[#0B1220]">A simple time-saving example:</strong> if an assistant takes 20 routine calls a day off your team&apos;s hands, at 4 minutes each, that is about 6.7 staff-hours a week returned to higher-value work (based on five workdays; actual savings depend on your call volume and workflow).
              </p>
            </div>
            <a href="#services" className="mt-6 inline-flex items-center gap-2 text-[14px] font-bold text-[#2563EB] hover:text-[#1D4ED8]">
              Explore AI and automation services <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          <ol className="reveal grid min-w-0 gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {steps.map(({ icon: Icon, title, text }, index) => (
              <li key={title} className="flex min-w-0 gap-4 rounded-xl border border-slate-200 bg-[#F8FAFC] p-5 sm:flex-col lg:flex-row lg:items-start">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#2563EB] shadow-sm ring-1 ring-slate-200">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="text-[11px] font-bold tracking-widest text-slate-400 uppercase">Step 0{index + 1}</p>
                  <h3 className="mt-1 font-[Manrope] text-[16px] font-extrabold text-[#0B1220]">{title}</h3>
                  <p className="mt-1 text-[13.5px] leading-relaxed text-slate-600">{text}</p>
                </div>
              </li>
            ))}
            <li className="flex items-start gap-3 rounded-xl bg-[#0B1220] p-4 text-white sm:col-span-3 lg:col-span-1">
              <UserRound className="mt-0.5 h-5 w-5 shrink-0 text-[#38BDF8]" aria-hidden="true" />
              <p className="text-[13px] leading-relaxed text-slate-300"><Check className="mr-1 inline h-4 w-4 text-[#38BDF8]" aria-hidden="true" />People stay in control: sensitive, complex or unusual requests can be passed to your team rather than left to automation.</p>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}
