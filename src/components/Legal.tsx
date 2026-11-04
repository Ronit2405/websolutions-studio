import type { ReactNode } from "react";
import { ArrowLeft, FileQuestion } from "lucide-react";
import { OWNER_EMAIL } from "../data/content";

function Shell({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <main className="bg-white pt-[72px]">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <a href="#home" className="inline-flex items-center gap-2 text-[13.5px] font-semibold text-[#2563EB] hover:underline">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to home
        </a>
        <h1 className="mt-6 font-[Manrope] text-[32px] font-extrabold tracking-tight text-[#0B1220]">{title}</h1>
        <p className="mt-2 text-[13.5px] text-slate-500">Last updated: {updated}</p>
        <div className="mt-8 space-y-6 text-[15px] leading-relaxed text-slate-600 [&_h2]:font-[Manrope] [&_h2]:text-[18px] [&_h2]:font-bold [&_h2]:text-[#0B1220] [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5">
          {children}
        </div>
      </div>
    </main>
  );
}

export function PrivacyPage() {
  return (
    <Shell title="Privacy Policy" updated="2026">
      <section>
        <h2>1. Who we are</h2>
        <p>
          WebSolutions Studio is a digital solutions studio founded by Ronit Sundrani. This policy explains what personal information we collect through this website, why we collect it, and how it is handled.
        </p>
      </section>
      <section>
        <h2>2. Information we collect</h2>
        <p>When you submit a project inquiry through our contact form, we collect the details you provide, which may include:</p>
        <ul>
          <li>Your full name and business / company name</li>
          <li>Your email address and phone number</li>
          <li>Your city</li>
          <li>The service you are interested in and your project description</li>
          <li>Your preferred contact method and preferred appointment date / time (if provided)</li>
          <li>The date and time of your submission</li>
        </ul>
      </section>
      <section>
        <h2>3. How we use your information</h2>
        <p>We use your information solely to respond to your inquiry, discuss your project, schedule consultations, and provide the services you request. We do not sell, rent, or trade your personal information to third parties for marketing purposes.</p>
      </section>
      <section>
        <h2>4. Email delivery</h2>
        <p>
          Inquiry submissions are delivered to the studio by email using a transactional email provider (Resend). Your inquiry details are transmitted to that provider only for the purpose of delivering the notification email. No email API keys or secrets are stored in the browser.
        </p>
      </section>
      <section>
        <h2>5. Data retention</h2>
        <p>Inquiry emails are retained only as long as necessary to manage the enquiry and any resulting business relationship. You may request deletion of your information at any time by emailing us.</p>
      </section>
      <section>
        <h2>6. Your rights</h2>
        <p>You may request access to, correction of, or deletion of the personal information we hold about you by contacting us at <a className="font-semibold text-[#2563EB] underline underline-offset-2" href={`mailto:${OWNER_EMAIL}`}>{OWNER_EMAIL}</a>.</p>
      </section>
      <section>
        <h2>7. Contact</h2>
        <p>For any privacy-related questions, contact WebSolutions Studio (Founder: Ronit Sundrani) at <a className="font-semibold text-[#2563EB] underline underline-offset-2" href={`mailto:${OWNER_EMAIL}`}>{OWNER_EMAIL}</a>.</p>
      </section>
    </Shell>
  );
}

export function TermsPage() {
  return (
    <Shell title="Terms & Conditions" updated="2026">
      <section>
        <h2>1. About these terms</h2>
        <p>These terms govern your use of the WebSolutions Studio website. By using this website, you agree to these terms. If you do not agree, please do not use the website.</p>
      </section>
      <section>
        <h2>2. Services</h2>
        <p>
          WebSolutions Studio provides website development, digital document and workflow management, AI agents and automation, AI calling solutions, and custom digital solutions. Service scope, timelines, and pricing are agreed individually for each project and are not binding until confirmed in writing.
        </p>
      </section>
      <section>
        <h2>3. Project inquiries</h2>
        <p>Submitting an inquiry through the contact form does not create a contract. Any engagement begins only after both parties confirm scope, deliverables, and commercial terms in writing.</p>
      </section>
      <section>
        <h2>4. Intellectual property</h2>
        <p>All content on this website — including text, design, and branding — belongs to WebSolutions Studio unless otherwise stated. You may not reproduce or reuse it without permission.</p>
      </section>
      <section>
        <h2>5. Accuracy of information</h2>
        <p>We aim to keep website content accurate and up to date, but we do not guarantee that all information is complete or error-free. Service descriptions may change as our offerings evolve.</p>
      </section>
      <section>
        <h2>6. Limitation of liability</h2>
        <p>To the extent permitted by law, WebSolutions Studio is not liable for any loss arising from your use of this website or reliance on its content.</p>
      </section>
      <section>
        <h2>7. Contact</h2>
        <p>Questions about these terms can be sent to <a className="font-semibold text-[#2563EB] underline underline-offset-2" href={`mailto:${OWNER_EMAIL}`}>{OWNER_EMAIL}</a>.</p>
      </section>
    </Shell>
  );
}

export function NotFoundPage() {
  return (
    <main className="flex min-h-[70vh] items-center bg-[#F8FAFC] pt-[72px]">
      <div className="mx-auto max-w-xl px-4 py-20 text-center sm:px-6">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-[#2563EB] shadow-sm ring-1 ring-slate-200">
          <FileQuestion className="h-8 w-8" aria-hidden="true" />
        </span>
        <p className="mt-6 font-[Manrope] text-[56px] font-extrabold leading-none text-[#0B1220]">404</p>
        <h1 className="mt-3 font-[Manrope] text-[22px] font-extrabold text-[#0B1220]">Page not found</h1>
        <p className="mt-3 text-[15px] leading-relaxed text-slate-600">
          The page you are looking for does not exist or may have been moved.
        </p>
        <a
          href="#home"
          className="mt-7 inline-flex items-center gap-2 rounded-lg bg-[#2563EB] px-6 py-3 text-[14px] font-semibold text-white hover:bg-[#1D4ED8]"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Return to Home
        </a>
      </div>
    </main>
  );
}
