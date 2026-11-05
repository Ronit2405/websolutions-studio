import type { ReactNode } from "react";
import { ArrowLeft, FileQuestion } from "lucide-react";
import { OWNER_EMAIL } from "../data/content";
import { useLanguage } from "../i18n";

function Shell({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  const { t } = useLanguage();
  return (
    <section className="bg-white pt-[72px]">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <a href="#/home" className="inline-flex items-center gap-2 text-[13.5px] font-semibold text-[#2563EB] hover:underline">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> {t("Back to home")}
        </a>
        <h1 className="mt-6 font-[Manrope] text-[32px] font-extrabold tracking-tight text-[#0B1220]">{title}</h1>
        <p className="mt-2 text-[13.5px] text-slate-500">{t("Last updated:")} {updated}</p>
        <div className="mt-8 space-y-6 text-[15px] leading-relaxed text-slate-600 [&_h2]:font-[Manrope] [&_h2]:text-[18px] [&_h2]:font-bold [&_h2]:text-[#0B1220] [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5">
          {children}
        </div>
      </div>
    </section>
  );
}

export function PrivacyPage() {
  const { t } = useLanguage();
  return (
    <Shell title={t("Privacy Policy")} updated="2026">
      <section>
        <h2>{t("1. Who we are")}</h2>
        <p>{t("WebSolutions Studio is a digital solutions studio founded by Ronit Sundrani. This policy explains what personal information we collect through this website, why we collect it, and how it is handled.")}</p>
      </section>
      <section>
        <h2>{t("2. Information we collect")}</h2>
        <p>{t("When you submit a project inquiry through our contact form, we collect the details you provide, which may include:")}</p>
        <ul>
          <li>{t("Your full name and business / company name")}</li>
          <li>{t("Your email address and phone number")}</li>
          <li>{t("Your city")}</li>
          <li>{t("The service you are interested in and your project description")}</li>
          <li>{t("Your preferred contact method and preferred appointment date / time (if provided)")}</li>
          <li>{t("The date and time of your submission")}</li>
        </ul>
      </section>
      <section>
        <h2>{t("3. How we use your information")}</h2>
        <p>{t("We use your information solely to respond to your inquiry, discuss your project, schedule consultations, and provide the services you request. We do not sell, rent, or trade your personal information to third parties for marketing purposes.")}</p>
      </section>
      <section>
        <h2>{t("4. Email delivery")}</h2>
        <p>{t("Inquiry submissions are sent through EmailJS to deliver the notification email configured for the studio. The form uses EmailJS's browser SDK and a Public Key; no EmailJS Private Key or server secret is included in the browser.")}</p>
      </section>
      <section>
        <h2>{t("5. Data retention")}</h2>
        <p>{t("Inquiry emails are retained only as long as necessary to manage the enquiry and any resulting business relationship. You may request deletion of your information at any time by emailing us.")}</p>
      </section>
      <section>
        <h2>{t("6. Your rights")}</h2>
        <p>
          {t("You may request access to, correction of, or deletion of the personal information we hold about you by contacting us at")} {" "}
          <a className="font-semibold text-[#2563EB] underline underline-offset-2" href={`mailto:${OWNER_EMAIL}`}>{OWNER_EMAIL}</a>.
        </p>
      </section>
      <section>
        <h2>{t("7. Contact")}</h2>
        <p>
          {t("For any privacy-related questions, contact WebSolutions Studio (Founder: Ronit Sundrani) at")} {" "}
          <a className="font-semibold text-[#2563EB] underline underline-offset-2" href={`mailto:${OWNER_EMAIL}`}>{OWNER_EMAIL}</a>.
        </p>
      </section>
    </Shell>
  );
}

export function TermsPage() {
  const { t } = useLanguage();
  return (
    <Shell title={t("Terms & Conditions")} updated="2026">
      <section>
        <h2>{t("1. About these terms")}</h2>
        <p>{t("These terms govern your use of the WebSolutions Studio website. By using this website, you agree to these terms. If you do not agree, please do not use the website.")}</p>
      </section>
      <section>
        <h2>{t("2. Services")}</h2>
        <p>{t("WebSolutions Studio provides website development, digital document and workflow management, AI agents and automation, AI calling solutions, and custom digital solutions. Service scope, timelines, and pricing are agreed individually for each project and are not binding until confirmed in writing.")}</p>
      </section>
      <section>
        <h2>{t("3. Project inquiries")}</h2>
        <p>{t("Submitting an inquiry through the contact form does not create a contract. Any engagement begins only after both parties confirm scope, deliverables, and commercial terms in writing.")}</p>
      </section>
      <section>
        <h2>{t("4. Intellectual property")}</h2>
        <p>{t("All content on this website — including text, design, and branding — belongs to WebSolutions Studio unless otherwise stated. You may not reproduce or reuse it without permission.")}</p>
      </section>
      <section>
        <h2>{t("5. Accuracy of information")}</h2>
        <p>{t("We aim to keep website content accurate and up to date, but we do not guarantee that all information is complete or error-free. Service descriptions may change as our offerings evolve.")}</p>
      </section>
      <section>
        <h2>{t("6. Limitation of liability")}</h2>
        <p>{t("To the extent permitted by law, WebSolutions Studio is not liable for any loss arising from your use of this website or reliance on its content.")}</p>
      </section>
      <section>
        <h2>{t("7. Contact")}</h2>
        <p>
          {t("Questions about these terms can be sent to")} {" "}
          <a className="font-semibold text-[#2563EB] underline underline-offset-2" href={`mailto:${OWNER_EMAIL}`}>{OWNER_EMAIL}</a>.
        </p>
      </section>
    </Shell>
  );
}

export function NotFoundPage() {
  const { t } = useLanguage();
  return (
    <section className="flex min-h-[70vh] items-center bg-[#F8FAFC] pt-[72px]">
      <div className="mx-auto max-w-xl px-4 py-20 text-center sm:px-6">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-[#2563EB] shadow-sm ring-1 ring-slate-200">
          <FileQuestion className="h-8 w-8" aria-hidden="true" />
        </span>
        <p className="mt-6 font-[Manrope] text-[56px] font-extrabold leading-none text-[#0B1220]">404</p>
        <h1 className="mt-3 font-[Manrope] text-[22px] font-extrabold text-[#0B1220]">{t("Page not found")}</h1>
        <p className="mt-3 text-[15px] leading-relaxed text-slate-600">{t("The page you are looking for does not exist or may have been moved.")}</p>
        <a
          href="#/home"
          className="mt-7 inline-flex items-center gap-2 rounded-lg bg-[#2563EB] px-6 py-3 text-[14px] font-semibold text-white hover:bg-[#1D4ED8]"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> {t("Return to Home")}
        </a>
      </div>
    </section>
  );
}
