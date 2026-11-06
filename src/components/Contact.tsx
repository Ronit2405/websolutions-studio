import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import emailjs from "@emailjs/browser";
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
  ShieldCheck,
  ArrowRight,
  Mic,
} from "lucide-react";
import {
  OWNER_EMAIL,
  OWNER_PHONE_DISPLAY,
  OWNER_PHONE_TEL,
  SERVICE_OPTIONS,
  whatsappLink,
} from "../data/content";
import { useLanguage } from "../i18n";
import VoiceNoteField from "./VoiceNoteField";
import { formatDuration, useVoiceRecorder } from "../utils/useVoiceRecorder";

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
  consent: false,
  website: "",
};

// EmailJS identifiers and the Public Key are client-side values by design.
// The EmailJS private key is never used or included in the website.
const EMAILJS_SERVICE_ID = (import.meta as any).env?.VITE_EMAILJS_SERVICE_ID || "service_g2uzvof";
const EMAILJS_TEMPLATE_ID = (import.meta as any).env?.VITE_EMAILJS_TEMPLATE_ID || "template_6w31t7g";
const EMAILJS_PUBLIC_KEY = (import.meta as any).env?.VITE_EMAILJS_PUBLIC_KEY || "E6u57ecGMZwvhwvEQ";

type Status = "idle" | "submitting" | "success" | "error";

function validate(f: FormState, hasVoiceNote: boolean): Errors {
  const e: Errors = {};
  if (!f.fullName.trim()) e.fullName = "Please enter your name.";
  // Email is optional — not everyone has an email address.
  if (f.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = "Please enter a valid email address.";
  if (!f.phone.trim()) e.phone = "Please enter your phone number.";
  else if (f.phone.replace(/\D/g, "").length < 7) e.phone = "Please enter a valid phone number.";
  if (!f.service) e.service = "Please select what you are interested in.";
  // A voice message is an equally valid way to tell us the requirement.
  if (!hasVoiceNote) {
    if (!f.description.trim()) e.description = "Please describe your requirement, or record a voice message.";
    else if (f.description.trim().length < 10) e.description = "Please add a little more detail (at least 10 characters).";
  }
  if (!f.consent) e.consent = "Please confirm you agree to the Privacy Policy.";
  return e;
}

export default function Contact({ selectedService, onServiceChange }: Props) {
  const { t } = useLanguage();
  const [form, setForm] = useState<FormState>({ ...INITIAL, service: selectedService });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState("");
  const [submittedAt, setSubmittedAt] = useState<string>("");
  const [lastVoiceNote, setLastVoiceNote] = useState<{ seconds: number; fileName: string; url: string; blob: Blob } | null>(null);
  const [shareFallback, setShareFallback] = useState(false);
  const isSubmittingRef = useRef(false);
  const recorder = useVoiceRecorder();

  // Keep form service in sync when user clicks "Learn More" on a service
  useEffect(() => {
    if (selectedService) {
      setForm((f) => ({ ...f, service: selectedService }));
    }
  }, [selectedService]);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent(t("New Project Inquiry – WebSolutions Studio"));
    const body = encodeURIComponent(
      [
        `${t("Name:")} ${form.fullName || "—"}`,
        `${t("Business:")} ${form.business || "—"}`,
        `${t("Email:")} ${form.email || "—"}`,
        `${t("Phone:")} ${form.phone || "—"}`,
        `${t("City:")} ${form.city || "—"}`,
        `${t("Interested in:")} ${form.service ? t(form.service) : "—"}`,
        `${t("Preferred contact:")} ${t(form.contactMethod)}`,
        "",
        t("Project description:"),
        form.description || "—",
      ].join("\n")
    );
    return `mailto:${OWNER_EMAIL}?subject=${subject}&body=${body}`;
  }, [form, t]);

  async function handleSubmit(ev: FormEvent) {
    ev.preventDefault();
    if (isSubmittingRef.current) return;

    const hasVoiceNote = Boolean(recorder.note);
    const errs = validate(form, hasVoiceNote);
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

    const descriptionText = form.description.trim() || "No typed description — the customer recorded a voice message instead.";

    // Avoid duplicate sends within 60 seconds.
    const fingerprint = [
      form.fullName.trim().toLowerCase(),
      form.email.trim().toLowerCase(),
      form.phone.trim(),
      form.service,
      descriptionText,
      hasVoiceNote ? "voice" : "text",
    ].join("|");
    try {
      const last = sessionStorage.getItem("wss_last_emailjs_submission");
      if (last) {
        const parsed = JSON.parse(last);
        if (parsed.fingerprint === fingerprint && Date.now() - parsed.at < 60000) {
          setStatus("error");
          setServerMessage("This inquiry looks like a duplicate of one you just sent. Please wait a moment before submitting again.");
          return;
        }
      }
    } catch { /* storage unavailable — continue */ }

    isSubmittingRef.current = true;
    setStatus("submitting");
    setServerMessage("");

    const submittedEmail = form.email.trim();
    // The EmailJS template's Reply-To must always be a valid mailbox, so when a
    // customer has no email we fall back to the studio inbox and ask for a
    // phone / WhatsApp reply instead (stated clearly inside the message).
    const replyTo = submittedEmail || OWNER_EMAIL;
    const templateParams = {
      name: form.fullName.trim(),
      email: replyTo,
      reply_to: replyTo,
      phone: form.phone.trim(),
      message: [
        submittedEmail
          ? ""
          : "CUSTOMER DID NOT PROVIDE AN EMAIL → please reply on the phone / WhatsApp number below.",
        descriptionText,
        "",
        `Business / Company: ${form.business.trim() || "Not provided"}`,
        `City: ${form.city.trim() || "Not provided"}`,
        `Customer email: ${submittedEmail || "Not provided"}`,
        `Phone / WhatsApp: ${form.phone.trim()}`,
        `Service: ${form.service}`,
        `Preferred contact method: ${form.contactMethod}`,
        hasVoiceNote
          ? `VOICE MESSAGE: Yes — the customer recorded a ${formatDuration(recorder.note?.seconds || 0)} voice message here and is being taken to the studio's WhatsApp (${OWNER_PHONE_DISPLAY}) to send it. Please check WhatsApp for the voice note.`
          : "VOICE MESSAGE: No",
      ].join("\n"),
    };

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        { publicKey: EMAILJS_PUBLIC_KEY }
      );
      try {
        sessionStorage.setItem("wss_last_emailjs_submission", JSON.stringify({ fingerprint, at: Date.now() }));
      } catch { /* ignore */ }
      setLastVoiceNote(
        hasVoiceNote && recorder.note
          ? {
              seconds: recorder.note.seconds,
              fileName: recorder.note.fileName,
              url: recorder.note.url,
              blob: recorder.note.blob,
            }
          : null
      );
      setSubmittedAt(new Date().toLocaleString());
      setStatus("success");
      onServiceChange("");
      if (!hasVoiceNote) recorder.discardNote();
    } catch {
      setStatus("error");
      setServerMessage("We could not deliver your inquiry right now. Please try again in a moment, or email us directly.");
    } finally {
      isSubmittingRef.current = false;
    }
  }

  function resetForm() {
    setForm({ ...INITIAL, service: "" });
    onServiceChange("");
    setErrors({});
    setStatus("idle");
    setServerMessage("");
    setLastVoiceNote(null);
    recorder.discardNote();
  }

  const whatsAppVoiceHref = useMemo(() => {
    const lines = [
      `${t("Hello WebSolutions Studio! I just submitted the contact form.")}`,
      `${t("Name:")} ${form.fullName.trim() || "—"}`,
      `${t("Phone:")} ${form.phone.trim() || "—"}`,
      `${t("Interested in:")} ${form.service ? t(form.service) : "—"}`,
    ];
    // Only mention the voice note when the email was actually confirmed sent.
    if (lastVoiceNote) {
      lines.push("", t("Sending my voice message in the next step."));
    }
    return whatsappLink(lines.join("\n"));
  }, [form.fullName, form.phone, form.service, lastVoiceNote, t]);

  async function shareVoiceOnWhatsApp() {
    if (!lastVoiceNote) return;
    const file = new File([lastVoiceNote.blob], lastVoiceNote.fileName, {
      type: lastVoiceNote.blob.type || "audio/webm",
    });
    const nav = navigator as Navigator & {
      canShare?: (data?: ShareData) => boolean;
      share?: (data?: ShareData) => Promise<void>;
    };
    if (nav.share && nav.canShare?.({ files: [file] })) {
      try {
        await nav.share({ files: [file], text: t("Voice message for WebSolutions Studio") });
        return;
      } catch (err) {
        if ((err as { name?: string })?.name === "AbortError") return;
      }
    }
    setShareFallback(true);
    window.open(whatsAppVoiceHref, "_blank", "noopener,noreferrer");
  }

  const voiceNoteHref = useMemo(
    () =>
      whatsappLink(
        [
          t("Hello WebSolutions Studio! I would like to send a voice message about my requirement."),
          `${t("Name:")} ${form.fullName.trim() || "—"}`,
          `${t("Interested in:")} ${form.service ? t(form.service) : "—"}`,
        ].join("\n")
      ),
    [form.fullName, form.service, t]
  );

  const inputCls = (hasError?: string) => `field ${hasError ? "field-error" : ""}`;

  return (
    <section id="contact" className="bg-[#F8FAFC] pt-24 pb-16 sm:pt-32 sm:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="reveal max-w-2xl">
          <p className="text-[12px] font-bold tracking-[0.14em] text-[#2563EB] uppercase">{t("Contact / Approach Us")}</p>
          <h1 className="mt-3 break-words font-[Manrope] text-[28px] font-extrabold tracking-tight text-[#0B1220] sm:text-[38px] sm:leading-[1.15]">
            {t("Let's Build Something Together")}
          </h1>
          <p className="mt-4 text-[16px] leading-relaxed text-slate-600">
            {t("Have a business requirement or looking for a digital solution? Tell us what you need. We'll get back to you to discuss your project.")}
          </p>
        </div>

        {/* Talk to us right now — direct call & WhatsApp */}
        <div className="reveal mt-6 grid gap-3 sm:grid-cols-2 lg:max-w-2xl">
          <a
            href={`tel:${OWNER_PHONE_TEL}`}
            className="group flex min-w-0 items-center gap-3 rounded-xl bg-[#0B1220] px-4 py-3.5 text-white transition-colors hover:bg-[#1D4ED8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15">
              <Phone className="h-[18px] w-[18px]" aria-hidden="true" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[14px] font-bold">{t("Call us now")}</span>
              <span className="block break-all text-[12.5px] text-slate-300 group-hover:text-blue-100">{OWNER_PHONE_DISPLAY}</span>
            </span>
            <ArrowRight className="h-4 w-4 shrink-0 opacity-70" aria-hidden="true" />
          </a>
          <a
            href={whatsappLink(t("Hello WebSolutions Studio! I have an inquiry."))}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex min-w-0 items-center gap-3 rounded-xl bg-[#25D366] px-4 py-3.5 text-[#05321A] transition-colors hover:bg-[#1EBE5A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/25">
              <MessageCircle className="h-[18px] w-[18px]" aria-hidden="true" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[14px] font-bold">{t("Chat on WhatsApp")}</span>
              <span className="block text-[12.5px] font-medium opacity-80">{t("Reply usually within minutes")}</span>
            </span>
            <ArrowRight className="h-4 w-4 shrink-0 opacity-70" aria-hidden="true" />
          </a>
          <p className="text-[12px] leading-relaxed text-slate-500 sm:col-span-2">
            {t("Any inquiry — a website, an app, automation or something else — talk to us directly.")}
          </p>
        </div>

        <div className="mt-8 grid min-w-0 gap-5 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:gap-8">
          {/* Info panel */}
          <aside className="reveal relative min-w-0 overflow-hidden rounded-2xl bg-[#0B1220] p-5 text-white sm:p-8">
            <div className="bg-grid-dark pointer-events-none absolute inset-0" aria-hidden="true" />
            <div className="relative">
              <h3 className="font-[Manrope] text-[20px] font-extrabold">{t("What happens next")}</h3>
              <ol className="mt-5 space-y-4">
                {[
                  { icon: Mail, title: "We review your inquiry", text: "Every submission is read personally — no automated sales funnel." },
                  { icon: Mic, title: "Voice message? We listen", text: "If you leave a voice message, it reaches us on WhatsApp and we listen to it before replying." },
                  { icon: Clock3, title: "We get back to you", text: "We respond via your preferred contact method to discuss your requirement." },
                ].map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <li key={s.title} className="flex min-w-0 gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/5 text-[#38BDF8] ring-1 ring-white/10">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block break-words text-[14px] font-bold">
                          <span className="mr-1.5 text-slate-500">0{i + 1}</span> {t(s.title)}
                        </span>
                        <span className="mt-0.5 block text-[13px] leading-relaxed text-slate-400">{t(s.text)}</span>
                      </span>
                    </li>
                  );
                })}
              </ol>

              <div className="mt-8 border-t border-white/10 pt-6">
                <p className="flex items-center gap-2 text-[12px] font-bold tracking-widest text-slate-400 uppercase">
                  <Phone className="h-3.5 w-3.5" aria-hidden="true" /> {t("Talk to us directly")}
                </p>
                <div className="mt-2 space-y-1.5">
                  <a href={`tel:${OWNER_PHONE_TEL}`} className="block break-all text-[15px] font-semibold text-white hover:underline">
                    {OWNER_PHONE_DISPLAY}
                  </a>
                  <a
                    href={whatsappLink(t("Hello WebSolutions Studio! I have an inquiry."))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#25D366] hover:underline"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" /> {t("Chat on WhatsApp")}
                  </a>
                </div>
                <p className="mt-4 flex items-center gap-2 text-[12px] font-bold tracking-widest text-slate-400 uppercase">
                  <AtSign className="h-3.5 w-3.5" aria-hidden="true" /> {t("Email us directly")}
                </p>
                <a href={`mailto:${OWNER_EMAIL}`} className="mt-2 block break-all text-[15px] font-semibold text-[#38BDF8] hover:underline">
                  {OWNER_EMAIL}
                </a>
                <p className="mt-4 flex items-center gap-2 text-[13px] text-slate-400">
                  <User className="h-4 w-4" aria-hidden="true" /> {t("Founder:")} Ronit Sundrani
                </p>
                <p className="mt-2 flex items-start gap-2 text-[12.5px] leading-relaxed text-slate-500">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  {t("Your details are only used to respond to your inquiry. We never share them with third parties for marketing.")}
                </p>
              </div>
            </div>
          </aside>

          {/* Form card */}
          <div className="reveal min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6 lg:p-8">
            {status === "success" ? (
              <div className="flex min-h-[420px] flex-col items-center justify-center py-10 text-center" role="status">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                  <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-[Manrope] text-[22px] font-extrabold text-[#0B1220]">{t("Inquiry received")}</h3>
                <p className="mt-3 max-w-md text-[15px] leading-relaxed text-slate-600">
                  {lastVoiceNote
                    ? t("Thank you for contacting WebSolutions Studio! Your inquiry has been submitted successfully. One last step: tap the WhatsApp button below to send your voice message.")
                    : t("Thank you for contacting WebSolutions Studio! Your inquiry has been submitted successfully. We'll get in touch with you soon.")}
                </p>

                {lastVoiceNote && (
                  <div className="mt-5 w-full max-w-md min-w-0 rounded-xl border border-emerald-200 bg-emerald-50/60 p-4 text-left">
                    <p className="flex items-center gap-2 text-[13px] font-bold text-emerald-800">
                      <Mic className="h-4 w-4 shrink-0" aria-hidden="true" />
                      {t("Your voice message")} · {formatDuration(lastVoiceNote.seconds)}
                    </p>
                    <audio
                      controls
                      preload="metadata"
                      src={lastVoiceNote.url}
                      aria-label={t("Voice message preview")}
                      className="voice-player mt-2"
                    />
                    <button
                      type="button"
                      onClick={shareVoiceOnWhatsApp}
                      className="mt-3 inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] px-5 py-3 text-[14px] font-bold text-[#05321A] transition-colors hover:bg-[#1EBE5A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
                    >
                      <MessageCircle className="h-5 w-5" aria-hidden="true" />
                      {t("Send my voice message on WhatsApp")}
                    </button>
                    <p className="mt-2 text-[12px] leading-relaxed text-emerald-900/80">
                      {t("One tap sends your recording to WhatsApp with our chat open — just press send.")}
                    </p>
                    {shareFallback ? (
                      <p className="mt-2 text-[12px] leading-relaxed text-emerald-900">
                        {t("This browser cannot attach the recording automatically. In the WhatsApp chat that opened, press and hold the microphone and speak your message once more.")}{" "}
                        <a
                          href={whatsAppVoiceHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold underline underline-offset-2"
                        >
                          {t("Open WhatsApp chat")}
                        </a>
                      </p>
                    ) : (
                      <p className="mt-1 text-[12px] leading-relaxed text-emerald-900/70">
                        {t("If the share sheet does not appear, our WhatsApp chat opens instead — you can record there in one tap.")}{" "}
                        <a
                          href={whatsAppVoiceHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-emerald-900 underline underline-offset-2"
                        >
                          {t("Open WhatsApp chat")}
                        </a>
                      </p>
                    )}
                  </div>
                )}

                <dl className="mt-6 w-full max-w-md rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 text-left text-[13.5px] sm:px-5">
                  <div className="flex min-w-0 justify-between gap-3 py-1"><dt className="shrink-0 text-slate-500">{t("Name")}</dt><dd className="min-w-0 break-words text-right font-semibold text-slate-800">{form.fullName}</dd></div>
                  <div className="flex min-w-0 justify-between gap-3 py-1"><dt className="shrink-0 text-slate-500">{t("Interested in")}</dt><dd className="min-w-0 break-words text-right font-semibold text-slate-800">{t(form.service)}</dd></div>
                  <div className="flex min-w-0 justify-between gap-3 py-1"><dt className="shrink-0 text-slate-500">{t("Preferred contact")}</dt><dd className="min-w-0 break-words text-right font-semibold text-slate-800">{t(form.contactMethod)}</dd></div>
                  {lastVoiceNote && (
                    <div className="flex min-w-0 justify-between gap-3 py-1"><dt className="shrink-0 text-slate-500">{t("Voice message")}</dt><dd className="min-w-0 break-words text-right font-semibold text-slate-800">{formatDuration(lastVoiceNote.seconds)}</dd></div>
                  )}
                  <div className="flex min-w-0 justify-between gap-3 py-1"><dt className="shrink-0 text-slate-500">{t("Submitted")}</dt><dd className="min-w-0 break-words text-right font-semibold text-slate-800">{submittedAt}</dd></div>
                </dl>
                <button
                  type="button"
                  onClick={resetForm}
                  className="mt-7 inline-flex items-center gap-2 rounded-lg border border-slate-300 px-5 py-3 text-[14px] font-semibold text-[#0B1220] hover:border-slate-400"
                >
                  {t("Send another inquiry")}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate aria-label={t("Project inquiry form")}>
                {status === "error" && (
                  <div className="mb-6 flex min-w-0 items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3.5" role="alert">
                    <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" aria-hidden="true" />
                    <div className="min-w-0">
                      <p className="text-[13.5px] leading-relaxed text-red-800">{t(serverMessage)}</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <a href={mailtoHref} className="inline-flex items-center gap-2 rounded-lg bg-[#0B1220] px-4 py-2 text-[13px] font-semibold text-white hover:bg-slate-800">
                          <Mail className="h-4 w-4" aria-hidden="true" /> {t("Email us directly instead")}
                        </a>
                        <a href={whatsappLink(t("Hello WebSolutions Studio! I have an inquiry."))} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-4 py-2 text-[13px] font-semibold text-[#05321A] hover:bg-[#1EBE5A]">
                          <MessageCircle className="h-4 w-4" aria-hidden="true" /> {t("Chat on WhatsApp")}
                        </a>
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="fullName" className="mb-1.5 block text-[13.5px] font-semibold text-slate-700">{t("Name")} <span className="text-red-600" aria-hidden="true">*</span></label>
                    <input id="fullName" data-error-field={errors.fullName ? "" : undefined} className={inputCls(errors.fullName)} value={form.fullName} onChange={(e) => set("fullName", e.target.value)} autoComplete="name" aria-invalid={Boolean(errors.fullName)} aria-describedby={errors.fullName ? "err-fullName" : undefined} />
                    {errors.fullName && <p id="err-fullName" className="mt-1.5 text-[12.5px] font-medium text-red-600">{t(errors.fullName || "")}</p>}
                  </div>
                  <div>
                    <label htmlFor="business" className="mb-1.5 block text-[13.5px] font-semibold text-slate-700">{t("Business / Company Name")}</label>
                    <input id="business" className="field" value={form.business} onChange={(e) => set("business", e.target.value)} autoComplete="organization" />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-1.5 block text-[13.5px] font-semibold text-slate-700">
                      {t("Email Address")} <span className="font-normal text-slate-400">{t("(optional)")}</span>
                    </label>
                    <input id="email" data-error-field={errors.email ? "" : undefined} type="email" inputMode="email" className={inputCls(errors.email)} value={form.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "err-email" : "hint-email"} />
                    {errors.email ? (
                      <p id="err-email" className="mt-1.5 text-[12.5px] font-medium text-red-600">{t(errors.email || "")}</p>
                    ) : (
                      <p id="hint-email" className="mt-1 text-[11.5px] leading-relaxed text-slate-400">{t("Not everyone has an email — leave it blank if you prefer a call or WhatsApp.")}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="phone" className="mb-1.5 block text-[13.5px] font-semibold text-slate-700">{t("Phone Number")} <span className="text-red-600" aria-hidden="true">*</span></label>
                    <input id="phone" data-error-field={errors.phone ? "" : undefined} type="tel" inputMode="tel" className={inputCls(errors.phone)} value={form.phone} onChange={(e) => set("phone", e.target.value)} autoComplete="tel" aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "err-phone" : undefined} />
                    {errors.phone && <p id="err-phone" className="mt-1.5 text-[12.5px] font-medium text-red-600">{t(errors.phone || "")}</p>}
                  </div>
                  <div>
                    <label htmlFor="city" className="mb-1.5 block text-[13.5px] font-semibold text-slate-700">{t("City")}</label>
                    <input id="city" className="field" value={form.city} onChange={(e) => set("city", e.target.value)} autoComplete="address-level2" />
                  </div>
                  <div>
                    <label htmlFor="service" className="mb-1.5 block text-[13.5px] font-semibold text-slate-700">{t("What are you interested in?")} <span className="text-red-600" aria-hidden="true">*</span></label>
                    <select id="service" data-error-field={errors.service ? "" : undefined} className={inputCls(errors.service)} value={form.service} onChange={(e) => { set("service", e.target.value); onServiceChange(e.target.value); }} aria-invalid={Boolean(errors.service)} aria-describedby={errors.service ? "err-service" : undefined}>
                      <option value="">{t("Select a service…")}</option>
                      {SERVICE_OPTIONS.map((o) => <option key={o} value={o}>{t(o)}</option>)}
                    </select>
                    {errors.service && <p id="err-service" className="mt-1.5 text-[12.5px] font-medium text-red-600">{t(errors.service || "")}</p>}
                  </div>
                </div>

                <div className="mt-5">
                  <label htmlFor="description" className="mb-1.5 block text-[13.5px] font-semibold text-slate-700">
                    {t("Project Description")} {recorder.note ? (
                      <span className="font-normal text-slate-400">{t("(optional — we have your voice message)")}</span>
                    ) : (
                      <><span className="text-red-600" aria-hidden="true">*</span> <span className="font-normal text-slate-400">{t("(or record a voice message below)")}</span></>
                    )}
                  </label>
                  <textarea
                    id="description"
                    data-error-field={errors.description ? "" : undefined}
                    rows={4}
                    className={`${inputCls(errors.description)} resize-y`}
                    placeholder={t("Briefly describe what you need or what problem you want to solve...")}
                    value={form.description}
                    onChange={(e) => set("description", e.target.value)}
                    aria-invalid={Boolean(errors.description)}
                    aria-describedby={errors.description ? "err-description" : undefined}
                  />
                  {errors.description && <p id="err-description" className="mt-1.5 text-[12.5px] font-medium text-red-600">{t(errors.description || "")}</p>}

                  <VoiceNoteField
                    supported={recorder.supported}
                    status={recorder.status}
                    seconds={recorder.seconds}
                    note={recorder.note}
                    error={recorder.error}
                    onStart={recorder.startRecording}
                    onStop={recorder.stopRecording}
                    onDiscard={recorder.discardNote}
                  />

                  <p className="mt-2 flex items-start gap-1.5 text-[11.5px] leading-relaxed text-slate-500">
                    <Mic className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    <span className="min-w-0">
                      {t("Typing feels like a task?")}{" "}
                      <a href={voiceNoteHref} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#2563EB] underline underline-offset-2">
                        {t("Send a voice message directly on WhatsApp")}
                      </a>{" "}
                      {t("and tell us in your own words.")}
                    </span>
                  </p>
                </div>

                <fieldset className="mt-5">
                  <legend className="mb-2 text-[13.5px] font-semibold text-slate-700">{t("Preferred Contact Method")}</legend>
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
                          {t(v)}
                        </label>
                      );
                    })}
                  </div>
                </fieldset>

                {/* Honeypot — hidden from humans */}
                <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
                  <label htmlFor="website">{t("Leave this field empty")}</label>
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
                      {t("I agree to the")} <a href="#/privacy" className="font-semibold text-[#2563EB] underline underline-offset-2">{t("Privacy Policy")}</a> {t("and consent to WebSolutions Studio contacting me about my inquiry.")} <span className="text-red-600" aria-hidden="true">*</span>
                    </span>
                  </label>
                  {errors.consent && <p id="err-consent" className="mt-1.5 text-[12.5px] font-medium text-red-600">{t(errors.consent || "")}</p>}
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#2563EB] px-6 py-4 text-[15px] font-semibold text-white transition-colors hover:bg-[#1D4ED8] disabled:cursor-not-allowed disabled:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 sm:w-auto sm:min-w-[260px]"
                >
                  {status === "submitting" ? (
                    <><Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" /> {t("Sending…")}</>
                  ) : (
                    <><Send className="h-4.5 w-4.5" aria-hidden="true" /> {t("Send Project Inquiry")}</>
                  )}
                </button>
                <p className="mt-3 text-[12.5px] leading-relaxed text-slate-400">
                  {recorder.note
                    ? t("Protected against spam. Submitting sends your details to the studio, then opens WhatsApp so you can send your voice message in one tap.")
                    : t("Protected against spam. Submitting sends an email notification to the studio — you will only see a success message once delivery is confirmed.")}
                </p>
              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
