/**
 * WebSolutions Studio — Contact form email endpoint (Vercel Serverless Function)
 *
 * Sends a "New Project Inquiry" notification email to the business owner
 * using the Resend transactional email API, plus an optional confirmation
 * email to the customer.
 *
 * Required environment variables (set in Vercel → Project → Settings → Environment Variables):
 *   RESEND_API_KEY        — your Resend API key (never expose in frontend code)
 *   OWNER_EMAIL           — where inquiry notifications are delivered
 *   FROM_EMAIL            — verified sender address in Resend (e.g. inquiries@yourdomain.com)
 * Optional:
 *   SEND_CUSTOMER_CONFIRMATION — "true" to also email the customer a confirmation
 *
 * Security:
 *   - All fields are validated server-side.
 *   - Honeypot field ("website") silently drops spam bots.
 *   - Simple in-memory rate limiting per IP.
 *   - No secrets are ever returned to the client.
 *
 * NOTE: This file is deployed by Vercel as /api/contact. It is NOT bundled
 * into the Vite frontend build, so the Resend key stays server-side.
 */

type Req = {
  method?: string;
  body?: any;
  headers?: Record<string, string | string[] | undefined>;
  socket?: { remoteAddress?: string };
};

type Res = {
  status: (code: number) => Res;
  json: (obj: any) => void;
};

const ALLOWED_SERVICES = [
  "Website Development",
  "Digital Document Management",
  "Business Workflow Automation",
  "AI Agents",
  "AI Calling Solutions",
  "Custom Business Software",
  "Appointment / Consultation",
  "Other",
];

// Very small in-memory rate limiter (per serverless instance)
const hits = new Map<string, number[]>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60_000;
  const max = 5;
  const list = (hits.get(ip) || []).filter((t) => now - t < windowMs);
  if (list.length >= max) return true;
  list.push(now);
  hits.set(ip, list);
  return false;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function isValidEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
}

export default async function handler(req: Req, res: Res) {
  // Health / config check — never leaks secrets
  if (req.method === "GET") {
    const configured = Boolean(process.env.RESEND_API_KEY && process.env.OWNER_EMAIL && process.env.FROM_EMAIL);
    return res.status(200).json({ ok: true, configured });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed." });
  }

  const ip =
    (req.headers?.["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
    req.socket?.remoteAddress ||
    "unknown";
  if (rateLimited(ip)) {
    return res.status(429).json({ ok: false, error: "Too many requests. Please wait a minute and try again." });
  }

  const b = req.body || {};

  // Honeypot — bots fill this; pretend success without sending anything
  if (typeof b.website === "string" && b.website.trim().length > 0) {
    return res.status(200).json({ ok: true });
  }

  // ---- Server-side validation ----
  const fullName = String(b.fullName || "").trim();
  const business = String(b.business || "").trim();
  const email = String(b.email || "").trim();
  const phone = String(b.phone || "").trim();
  const city = String(b.city || "").trim();
  const service = String(b.service || "").trim();
  const description = String(b.description || "").trim();
  const contactMethod = String(b.contactMethod || "Phone Call").trim();
  const date = String(b.date || "").trim();
  const time = String(b.time || "").trim();
  const consent = b.consent === true;

  const errors: string[] = [];
  if (!fullName) errors.push("Full name is required.");
  if (!email || !isValidEmail(email)) errors.push("A valid email address is required.");
  if (!phone || phone.replace(/\D/g, "").length < 7) errors.push("A valid phone number is required.");
  if (!service || !ALLOWED_SERVICES.includes(service)) errors.push("Please select a valid service.");
  if (!description || description.length < 10) errors.push("Please provide a project description (at least 10 characters).");
  if (!["Phone Call", "WhatsApp", "Email"].includes(contactMethod)) errors.push("Please choose a valid contact method.");
  if (!consent) errors.push("Privacy consent is required.");

  if (errors.length > 0) {
    return res.status(400).json({ ok: false, error: errors.join(" ") });
  }

  // ---- Config check (honest failure — never fake success) ----
  const apiKey = process.env.RESEND_API_KEY;
  const ownerEmail = process.env.OWNER_EMAIL;
  const fromEmail = process.env.FROM_EMAIL;
  if (!apiKey || !ownerEmail || !fromEmail) {
    return res.status(503).json({
      ok: false,
      error:
        "Email delivery is not configured yet. Your inquiry was not sent. Please email us directly instead.",
    });
  }

  const submittedAt = new Date().toLocaleString("en-GB", { timeZone: "UTC" }) + " UTC";

  const rows: Array<[string, string]> = [
    ["Customer Name", fullName],
    ["Business Name", business || "—"],
    ["Email Address", email],
    ["Phone Number", phone],
    ["City", city || "—"],
    ["Selected Service", service],
    ["Project Description", description],
    ["Preferred Contact Method", contactMethod],
    ["Appointment Date", date || "—"],
    ["Appointment Time", time || "—"],
    ["Submission Date & Time", submittedAt],
  ];

  const textBody = rows.map(([k, v]) => `${k}: ${v}`).join("\n");
  const htmlBody = `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:640px;margin:0 auto;color:#1E293B;">
      <div style="background:#0B1220;padding:20px 24px;border-radius:10px 10px 0 0;">
        <h1 style="margin:0;color:#ffffff;font-size:18px;">New Project Inquiry – WebSolutions Studio</h1>
        <p style="margin:6px 0 0;color:#94A3B8;font-size:13px;">A new inquiry was submitted through the website contact form.</p>
      </div>
      <div style="border:1px solid #E2E8F0;border-top:none;padding:20px 24px;border-radius:0 0 10px 10px;">
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          ${rows
            .map(
              ([k, v]) =>
                `<tr><td style="padding:8px 0;color:#64748B;width:200px;vertical-align:top;">${escapeHtml(k)}</td><td style="padding:8px 0;font-weight:600;">${escapeHtml(v)}</td></tr>`
            )
            .join("")}
        </table>
        <p style="margin-top:16px;font-size:13px;color:#64748B;">
          Reply directly to this email to respond to the customer at <strong>${escapeHtml(email)}</strong>.
        </p>
      </div>
    </div>`;

  async function sendEmail(payload: Record<string, unknown>) {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = await r.json().catch(() => ({}));
    if (!r.ok) {
      throw new Error((data as any)?.message || `Resend responded with ${r.status}`);
    }
    return data;
  }

  try {
    await sendEmail({
      from: fromEmail,
      to: [ownerEmail],
      reply_to: email,
      subject: "New Project Inquiry – WebSolutions Studio",
      text: textBody,
      html: htmlBody,
    });

    // Optional automatic confirmation to the customer
    if (process.env.SEND_CUSTOMER_CONFIRMATION === "true") {
      await sendEmail({
        from: fromEmail,
        to: [email],
        subject: "We received your inquiry — WebSolutions Studio",
        text: `Hi ${fullName},\n\nThank you for contacting WebSolutions Studio. We have received your inquiry about "${service}" and will get in touch with you soon via ${contactMethod}.\n\nYour message:\n${description}\n\n— WebSolutions Studio (Ronit Sundrani)`,
        html: `<div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;color:#1E293B;">
          <p>Hi ${escapeHtml(fullName)},</p>
          <p>Thank you for contacting <strong>WebSolutions Studio</strong>. We have received your inquiry about <strong>${escapeHtml(service)}</strong> and will get in touch with you soon via ${escapeHtml(contactMethod)}.</p>
          <p style="color:#475569;">Your message: ${escapeHtml(description)}</p>
          <p style="color:#64748B;font-size:13px;">— WebSolutions Studio (Ronit Sundrani)</p>
        </div>`,
      });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    // Delivery failed — report honestly so the frontend does NOT show success
    return res.status(502).json({
      ok: false,
      error: "We could not deliver your inquiry right now. Please try again in a moment, or email us directly.",
    });
  }
}
