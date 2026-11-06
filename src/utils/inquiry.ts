/**
 * Shared contact-form payload types and builders.
 *
 * These functions are the single source of truth for what the website sends
 * to EmailJS. Every value below comes from a real field on the contact form —
 * no placeholder or invented fields are added.
 */

export interface FormState {
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

/**
 * Variables sent to the EmailJS template.
 *
 * The names here are the exact names used in `EMAILJS-TEMPLATE.html`.
 * `reply_to` is always a valid mailbox (customer email, or the studio inbox
 * when the visitor did not provide one), so the template's Reply-To setting
 * never points at an empty address.
 */
export interface InquiryTemplateParams {
  fullName: string;
  business: string;
  email: string;
  phone: string;
  city: string;
  service: string;
  description: string;
  contactMethod: string;
  submittedAt: string;
  reply_to: string;
  message: string;
}

/** Build the complete plain-text inquiry body (also used by the mailto fallback). */
export function buildInquiryText(
  form: FormState,
  descriptionText: string,
  submittedAt: Date
): string {
  return [
    "New Project Inquiry – WebSolutions Studio",
    "",
    `Name: ${form.fullName.trim() || "—"}`,
    `Phone: ${form.phone.trim() || "—"}`,
    `Email: ${form.email.trim() || "Not provided"}`,
    `City: ${form.city.trim() || "Not provided"}`,
    `Business: ${form.business.trim() || "Not provided"}`,
    `Service: ${form.service || "—"}`,
    `Preferred contact: ${form.contactMethod}`,
    `Submitted: ${submittedAt.toLocaleString()}`,
    "",
    "Project description:",
    descriptionText,
  ].join("\n");
}

/**
 * Map the submitted form to the exact variables used by the EmailJS template.
 * Optional fields fall back to a readable "Not provided" instead of blank.
 */
export function buildInquiryTemplateParams(
  form: FormState,
  descriptionText: string,
  submittedAt: Date,
  submittedEmail: string,
  replyTo: string
): InquiryTemplateParams {
  const inquiryText = buildInquiryText(form, descriptionText, submittedAt);

  return {
    fullName: form.fullName.trim(),
    business: form.business.trim() || "Not provided",
    email: submittedEmail || "Not provided",
    phone: form.phone.trim(),
    city: form.city.trim() || "Not provided",
    service: form.service,
    description: descriptionText,
    contactMethod: form.contactMethod,
    submittedAt: submittedAt.toLocaleString(),
    reply_to: replyTo,
    message: [
      submittedEmail
        ? ""
        : "CUSTOMER DID NOT PROVIDE AN EMAIL → please reply on the phone / WhatsApp number below.",
      inquiryText,
    ]
      .filter(Boolean)
      .join("\n\n"),
  };
}
