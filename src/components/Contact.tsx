import { useEffect, useMemo, useState, type FormEvent } from "react";
import {
  Mail,
  User,
  Clock3,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  Send,
  Phone,
  MessageCircle,
  AtSign,
  CalendarClock,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { OWNER_EMAIL, SERVICE_OPTIONS } from "../data/content";

interface Props {
  selectedService: string;
  onServiceChange: (v: string) => void;
}

interface FormState {
  fullName: string;
  business: string;
  email: string;
  phone: string;
  city: string;
  service: string;
  description: string;
  contactMethod: string;
  date: string;
  time: string;
  consent: boolean;
  website: string; // honeypot
}

type Errors = Partial<Record<keyof FormState, string>>;

const INITIAL: FormState = {
  fullName: "",
  business: "",
  email: "",
  phone: "",
  city: "",
  service: "",
  description: "",
  contactMethod: "Phone Call",
  date: "",
  time: "",
  consent: false,
  website: "",
};

type Status = "idle" | "submitting" | "success" | "error" | "not-configured";

function validate(f: FormState): Errors {
  const e: Errors = {};
  if (!f.fullName.trim()) e.fullName = "Please enter your full name.";
  if (!f.email.trim()) e.email = "Please enter your email address.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = "Please enter a valid email address.";
  if (!f.phone.trim()) e.phone = "Please enter your phone number.";
  else if (f.phone.replace(/\D/g, "").length < 7) e.phone = "Please enter a valid phone number.";
  if (!f.service) e.service = "Please select what you are interested in.";
  if (!f.description.trim()) e.description = "Please briefly describe your requirement.";
  else if (f.description.trim().length < 10) e.description = "Please add a little more detail (at least 10 characters).";
  if (!f.consent) e.consent = "Please confirm you agree to the Privacy Policy.";
  return e;
}

export default function Contact({ selectedService, onServiceChange }: Props) {
  const [form, setForm] = useState<FormState>({ ...INITIAL, service: selectedService });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState("");
  const [emailConfigured, setEmailConfigured] = useState<boolean | null>(null);
  const [submittedAt, setSubmittedAt] = useState<string>("");

  // Keep form service in sync when user clicks "Learn More" on a service
  useEffect(() => {
    if (selectedService) {
      setForm((f) => ({ ...f, service: selectedService }));
    }
  }, [selectedService]);

  // Check whether the email backend is configured (does not leak secrets)
  useEffect(() => {
    let cancelled = false;
    fetch("/api/contact", { method: "GET" })
      .then((r) => r.json())
      .then((d) => { if (!cancelled) setEmailConfigured(Boolean(d?.configured)); })
      .catch(() => { if (!cancelled) setEmailConfigured(false); });
    return () => { cancelled = true; };
  }, []);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent("New Project Inquiry – WebSolutions Studio");
    const body = encodeURIComponent(
      [
        `Name: ${form.fullName || "—"}`,
        `Business: ${form.business || "—"}`,
        `Email: ${form.email || "—"}`,
        `Phone: ${form.phone || "—"}`,
        `City: ${form.city || "—"}`,
        `Interested in: ${form.service || "—"}`,
        `Preferred contact: ${form.contactMethod}`,
        `Appointment: ${form.date || "—"} ${form.time || "—"}`,
        "",
        "Project description:",
        form.description || "—",
      ].join("\n")
    );
    return `mailto:${OWNER_EMAIL}?subject=${subject}&body=${body}`;
  }, [form]);

  async function handleSubmit(ev: FormEvent) {
    ev.preventDefault();
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      const first = document.querySelector<HTMLElement>("[data-error-field]");
      first?.focus();
      return;
    }

    // Honeypot: bots that fill the hidden field get a fake success, nothing is sent.
    if (form.website.trim()) {
      setStatus("success");
      setSubmittedAt(new Date().toLocaleString());
      return;
    }

    // Duplicate-submission guard (same payload within 60 seconds)
    const fingerprint = [form.email, form.phone, form.service, form.description].join("|");
    try {
      const last = sessionStorage.getItem("wss_last_inquiry");
      if (last) {
        const parsed = JSON.parse(last);
        if (parsed.fingerprint === fingerprint && Date.now() - parsed.at < 60000) {
          setStatus("error");
          setServerMessage("This inquiry looks like a duplicate of one you just sent. Please wait a moment before submitting again.");
          return;
        }
      }
    } catch { /* storage unavailable — continue */ }

    setStatus("submitting");
    setServerMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName.trim(),
          business: form.business.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          city: form.city.trim(),
          service: form.service,
          description: form.description.trim(),
          contactMethod: form.contactMethod,
          date: form.date,
          time: form.time,
          consent: form.consent,
          website: form.website,
        }),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok && data?.ok) {
        try {
          sessionStorage.setItem("wss_last_inquiry", JSON.stringify({ fingerprint, at: Date.now() }));
        } catch { /* ignore */ }
        setSubmittedAt(new Date().toLocaleString());
        setStatus("success");
        return;
      }

      if (res.status === 503 || res.status === 404) {
        setStatus("not-configured");
        setServerMessage(
          data?.error ||
            "Email delivery is not configured yet. Your inquiry was not sent. Please email us directly using the button below, or try again once the email service is connected."
        );
        return;
      }

      setStatus("error");
      setServerMessage(data?.error || "Something went wrong while sending your inquiry. Please try again, or email us directly.");
    } catch {
      setStatus("not-configured");
      setServerMessage(
        "We could not reach the email service, so your inquiry was not sent. Please email us directly using the button below."
      );
    }
  }

  function resetForm() {
    setForm({ ...INITIAL, service: "" });
    onServiceChange("");
    setErrors({});
    setStatus("idle");
    setServerMessage("");
  }

  const inputCls = (hasError?: string) => `field ${hasError ? "field-error" : ""}`;

  return (
    <section id="contact" className="bg-[#F8FAFC] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="reveal max-w-2xl">
          <p className="text-[12px] font-bold tracking-[0.14em] text-[#2563EB] uppercase">Contact / Approach Us</p>
          <h2 className="mt-3 font-[Manrope] text-[30px] font-extrabold tracking-tight text-[#0B1220] sm:text-[38px] sm:leading-[1.15]">
            Let&apos;s Build Something Together
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-slate-600">
            Have a business requirement or looking for a digital solution? Tell us what you need. We&apos;ll get back to you to discuss your project.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[380px_1fr] lg:gap-8">
          {/* Info panel */}
          <aside className="reveal relative overflow-hidden rounded-2xl bg-[#0B1220] p-7 text-white sm:p-8">
            <div className="bg-grid-dark pointer-events-none absolute inset-0" aria-hidden="true" />
            <div className="relative">
              <h3 className="font-[Manrope] text-[20px] font-extrabold">What happens next</h3>
              <ol className="mt-5 space-y-4">
                {[
                  { icon: Mail, title: "We review your inquiry", text: "Every submission is read personally — no automated sales funnel." },
                  { icon: Clock3, title: "We get back to you", text: "We respond via your preferred contact method to discuss your requirement." },
                  { icon: CalendarClock, title: "We plan together", text: "If needed, we schedule a consultation or appointment at your preferred time." },
                ].map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <li key={s.title} className="flex gap-3.5">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/5 text-[#38BDF8] ring-1 ring-white/10">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block text-[14px] font-bold">
                          <span className="mr-1.5 text-slate-500">0{i + 1}</span> {s.title}
                        </span>
                        <span className="mt-0.5 block text-[13px] leading-relaxed text-slate-400">{s.text}</span>
                      </span>
                    </li>
                  );
                })}
              </ol>

              <div className="mt-8 border-t border-white/10 pt-6">
                <p className="flex items-center gap-2 text-[12px] font-bold tracking-widest text-slate-400 uppercase">
                  <AtSign className="h-3.5 w-3.5" aria-hidden="true" /> Email us directly
                </p>
                <a href={`mailto:${OWNER_EMAIL}`} className="mt-2 block break-all text-[15px] font-semibold text-[#38BDF8] hover:underline">
                  {OWNER_EMAIL}
                </a>
                <p className="mt-4 flex items-center gap-2 text-[13px] text-slate-400">
                  <User className="h-4 w-4" aria-hidden="true" /> Founder: Ronit Sundrani
                </p>
                <p className="mt-2 flex items-start gap-2 text-[12.5px] leading-relaxed text-slate-500">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  Your details are only used to respond to your inquiry. We never share them with third parties for marketing.
                </p>
              </div>
            </div>
          </aside>

          {/* Form card */}
          <div className="reveal rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            {status === "success" ? (
              <div className="flex min-h-[420px] flex-col items-center justify-center py-10 text-center" role="status">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                  <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-[Manrope] text-[22px] font-extrabold text-[#0B1220]">Inquiry received</h3>
                <p className="mt-3 max-w-md text-[15px] leading-relaxed text-slate-600">
                  Thank you for contacting WebSolutions Studio! Your inquiry has been submitted successfully. We&apos;ll get in touch with you soon.
                </p>
                <dl className="mt-6 w-full max-w-md rounded-xl border border-slate-200 bg-slate-50 px-5 py-4 text-left text-[13.5px]">
                  <div className="flex justify-between gap-4 py-1"><dt className="text-slate-500">Name</dt><dd className="font-semibold text-slate-800">{form.fullName}</dd></div>
                  <div className="flex justify-between gap-4 py-1"><dt className="text-slate-500">Interested in</dt><dd className="font-semibold text-slate-800">{form.service}</dd></div>
                  <div className="flex justify-between gap-4 py-1"><dt className="text-slate-500">Preferred contact</dt><dd className="font-semibold text-slate-800">{form.contactMethod}</dd></div>
                  <div className="flex justify-between gap-4 py-1"><dt className="text-slate-500">Submitted</dt><dd className="font-semibold text-slate-800">{submittedAt}</dd></div>
                </dl>
                <button
                  type="button"
                  onClick={resetForm}
                  className="mt-7 inline-flex items-center gap-2 rounded-lg border border-slate-300 px-5 py-3 text-[14px] font-semibold text-[#0B1220] hover:border-slate-400"
                >
                  Send another inquiry
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate aria-label="Project inquiry form">
                {/* Config notice */}
                {emailConfigured === false && (
                  <div className="mb-6 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3.5" role="alert">
                    <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" aria-hidden="true" />
                    <p className="text-[13.5px] leading-relaxed text-amber-800">
                      <strong>Email sending is temporarily unavailable.</strong> This form is ready, but the studio&apos;s email provider still needs to be connected. Your message will not be delivered by this form yet. Please use the direct email option in this section for now.
                    </p>
                  </div>
                )}

                {status === "error" && (
                  <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3.5" role="alert">
                    <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" aria-hidden="true" />
                    <p className="text-[13.5px] leading-relaxed text-red-800">{serverMessage}</p>
                  </div>
                )}
                {status === "not-configured" && (
                  <div className="mb-6 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3.5" role="alert">
                    <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" aria-hidden="true" />
                    <div>
                      <p className="text-[13.5px] leading-relaxed text-amber-800">{serverMessage}</p>
                      <a href={mailtoHref} className="mt-2 inline-flex items-center gap-2 rounded-lg bg-[#0B1220] px-4 py-2 text-[13px] font-semibold text-white hover:bg-slate-800">
                        <Mail className="h-4 w-4" aria-hidden="true" /> Email us directly instead
                      </a>
                    </div>
                  </div>
                )}

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="fullName" className="mb-1.5 block text-[13.5px] font-semibold text-slate-700">Full Name <span className="text-red-600" aria-hidden="true">*</span></label>
                    <input id="fullName" data-error-field={errors.fullName ? "" : undefined} className={inputCls(errors.fullName)} value={form.fullName} onChange={(e) => set("fullName", e.target.value)} autoComplete="name" aria-invalid={Boolean(errors.fullName)} aria-describedby={errors.fullName ? "err-fullName" : undefined} />
                    {errors.fullName && <p id="err-fullName" className="mt-1.5 text-[12.5px] font-medium text-red-600">{errors.fullName}</p>}
                  </div>
                  <div>
                    <label htmlFor="business" className="mb-1.5 block text-[13.5px] font-semibold text-slate-700">Business / Company Name</label>
                    <input id="business" className="field" value={form.business} onChange={(e) => set("business", e.target.value)} autoComplete="organization" />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-1.5 block text-[13.5px] font-semibold text-slate-700">Email Address <span className="text-red-600" aria-hidden="true">*</span></label>
                    <input id="email" data-error-field={errors.email ? "" : undefined} type="email" className={inputCls(errors.email)} value={form.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "err-email" : undefined} />
                    {errors.email && <p id="err-email" className="mt-1.5 text-[12.5px] font-medium text-red-600">{errors.email}</p>}
                  </div>
                  <div>
                    <label htmlFor="phone" className="mb-1.5 block text-[13.5px] font-semibold text-slate-700">Phone Number <span className="text-red-600" aria-hidden="true">*</span></label>
                    <input id="phone" data-error-field={errors.phone ? "" : undefined} type="tel" className={inputCls(errors.phone)} value={form.phone} onChange={(e) => set("phone", e.target.value)} autoComplete="tel" aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "err-phone" : undefined} />
                    {errors.phone && <p id="err-phone" className="mt-1.5 text-[12.5px] font-medium text-red-600">{errors.phone}</p>}
                  </div>
                  <div>
                    <label htmlFor="city" className="mb-1.5 block text-[13.5px] font-semibold text-slate-700">City</label>
                    <input id="city" className="field" value={form.city} onChange={(e) => set("city", e.target.value)} autoComplete="address-level2" />
                  </div>
                  <div>
                    <label htmlFor="service" className="mb-1.5 block text-[13.5px] font-semibold text-slate-700">What are you interested in? <span className="text-red-600" aria-hidden="true">*</span></label>
                    <select id="service" data-error-field={errors.service ? "" : undefined} className={inputCls(errors.service)} value={form.service} onChange={(e) => { set("service", e.target.value); onServiceChange(e.target.value); }} aria-invalid={Boolean(errors.service)} aria-describedby={errors.service ? "err-service" : undefined}>
                      <option value="">Select a service…</option>
                      {SERVICE_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                    {errors.service && <p id="err-service" className="mt-1.5 text-[12.5px] font-medium text-red-600">{errors.service}</p>}
                  </div>
                </div>

                <div className="mt-5">
                  <label htmlFor="description" className="mb-1.5 block text-[13.5px] font-semibold text-slate-700">Project Description <span className="text-red-600" aria-hidden="true">*</span></label>
                  <textarea
                    id="description"
                    data-error-field={errors.description ? "" : undefined}
                    rows={4}
                    className={`${inputCls(errors.description)} resize-y`}
                    placeholder="Briefly describe what you need or what problem you want to solve..."
                    value={form.description}
                    onChange={(e) => set("description", e.target.value)}
                    aria-invalid={Boolean(errors.description)}
                    aria-describedby={errors.description ? "err-description" : undefined}
                  />
                  {errors.description && <p id="err-description" className="mt-1.5 text-[12.5px] font-medium text-red-600">{errors.description}</p>}
                </div>

                <fieldset className="mt-5">
                  <legend className="mb-2 text-[13.5px] font-semibold text-slate-700">Preferred Contact Method</legend>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { v: "Phone Call", icon: Phone },
                      { v: "WhatsApp", icon: MessageCircle },
                      { v: "Email", icon: Mail },
                    ].map(({ v, icon: Icon }) => {
                      const checked = form.contactMethod === v;
                      return (
                        <label
                          key={v}
                          className={`flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2.5 text-[13.5px] font-semibold transition-colors ${
                            checked ? "border-[#2563EB] bg-blue-50 text-[#2563EB]" : "border-slate-300 text-slate-600 hover:border-slate-400"
                          }`}
                        >
                          <input type="radio" name="contactMethod" value={v} checked={checked} onChange={() => set("contactMethod", v)} className="sr-only" />
                          <Icon className="h-4 w-4" aria-hidden="true" />
                          {v}
                        </label>
                      );
                    })}
                  </div>
                </fieldset>

                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="date" className="mb-1.5 block text-[13.5px] font-semibold text-slate-700">Preferred Appointment Date <span className="font-normal text-slate-400">(optional)</span></label>
                    <input id="date" type="date" className="field" value={form.date} onChange={(e) => set("date", e.target.value)} />
                  </div>
                  <div>
                    <label htmlFor="time" className="mb-1.5 block text-[13.5px] font-semibold text-slate-700">Preferred Appointment Time <span className="font-normal text-slate-400">(optional)</span></label>
                    <input id="time" type="time" className="field" value={form.time} onChange={(e) => set("time", e.target.value)} />
                  </div>
                </div>

                {/* Honeypot — hidden from humans */}
                <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
                  <label htmlFor="website">Leave this field empty</label>
                  <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => set("website", e.target.value)} />
                </div>

                <div className="mt-6">
                  <label className={`flex cursor-pointer items-start gap-3 rounded-xl border px-4 py-3.5 ${errors.consent ? "border-red-300 bg-red-50/50" : "border-slate-200 bg-slate-50"}`}>
                    <input
                      type="checkbox"
                      checked={form.consent}
                      onChange={(e) => set("consent", e.target.checked)}
                      className="mt-0.5 h-4.5 w-4.5 shrink-0 accent-[#2563EB]"
                      aria-invalid={Boolean(errors.consent)}
                      aria-describedby={errors.consent ? "err-consent" : undefined}
                    />
                    <span className="text-[13.5px] leading-relaxed text-slate-600">
                      I agree to the <a href="#/privacy" className="font-semibold text-[#2563EB] underline underline-offset-2">Privacy Policy</a> and consent to WebSolutions Studio contacting me about my inquiry. <span className="text-red-600" aria-hidden="true">*</span>
                    </span>
                  </label>
                  {errors.consent && <p id="err-consent" className="mt-1.5 text-[12.5px] font-medium text-red-600">{errors.consent}</p>}
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#2563EB] px-6 py-4 text-[15px] font-semibold text-white transition-colors hover:bg-[#1D4ED8] disabled:cursor-not-allowed disabled:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 sm:w-auto sm:min-w-[260px]"
                >
                  {status === "submitting" ? (
                    <><Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" /> Sending…</>
                  ) : (
                    <><Send className="h-4.5 w-4.5" aria-hidden="true" /> Send Project Inquiry</>
                  )}
                </button>
                <p className="mt-3 text-[12.5px] text-slate-400">
                  Protected against spam. Submitting sends an email notification to the studio — you will only see a success message once delivery is confirmed.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
