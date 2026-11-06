# Appointment Email Setup — EmailJS

The website appointment/contact form sends notifications through EmailJS using
the browser SDK (`@emailjs/browser`). The EmailJS Service ID, Template ID and
**Public Key** are configured in `src/components/Contact.tsx` with optional
`VITE_EMAILJS_*` environment overrides (see `.env.example`). These values are
intended to be public. **Do not use or expose an EmailJS Private Key.**

## Email template mapping

The form sends these exact template variables:

| EmailJS variable | Form value |
|---|---|
| `{{name}}` | Customer name |
| `{{email}}` | Customer email, or the studio inbox when the customer left email blank |
| `{{phone}}` | Phone number (always collected) |
| `{{message}}` | Project description (or the voice-message note) plus business, city, service, preferred contact method, and any voice-message notice |

The contact form no longer asks for an appointment date/time. **Email is optional**
— many customers only have a phone. EmailJS still needs a valid Reply-To, so when
the email field is empty the form sends `reply_to`/`email` as the studio inbox and
the message clearly says *"CUSTOMER DID NOT PROVIDE AN EMAIL → please reply on
the phone / WhatsApp number below."* The customer's phone number is always in the
message, so a reply by call or WhatsApp is always possible.

The EmailJS template's **To Email** setting controls which Gmail inbox receives
the notification. Keep that destination configured in EmailJS; it is not sent
from a private key in the website.

## EmailJS dashboard checklist

1. Confirm the Service ID is `service_g2uzvof` and the Template ID is
   `template_6w31t7g` (or set overrides in Vercel).
2. In the template, use the exact variable names above: `name`, `email`,
   `phone`, and `message`. The old `date` / `time` variables are no longer sent,
   so remove them from the template if they are still referenced.
3. Confirm the template's **To Email** points to the intended Gmail inbox.
4. In EmailJS security settings, restrict allowed origins to the production
   website domain (and preview domain only if you need to test previews).

## Vercel configuration

The provided EmailJS values are already the code defaults, so no additional
Vercel variables are required for the current Service ID, Template ID, and
Public Key. If you change them, add these optional overrides under the existing
Vercel project → **Settings → Environment Variables**:

- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID`
- `VITE_EMAILJS_PUBLIC_KEY`
- `VITE_OWNER_EMAIL` (public email link / fallback only)
- `VITE_WHATSAPP_NUMBER` (public business number, digits with country code,
  default `917470383241`) — powers the **Call us now** button (`tel:`), the
  **Chat on WhatsApp** buttons, and the voice-message WhatsApp links

`VITE_*` values are bundled into the browser. Only use EmailJS's **Public Key**
here—never a Private Key. Redeploy after changing build environment variables.
No serverless email endpoint is used; the form sends directly through EmailJS.

## Form behavior and testing

- Client-side validation and the existing selected-service handoff are kept.
- The submit button is disabled while EmailJS is sending; a synchronous guard
  blocks rapid double-clicks, and a successful identical submission is blocked
  for 60 seconds in the current browser session.
- Success is shown only after EmailJS confirms the send. Failures show an error
  and a direct-email fallback link.
- **Voice messages:** the customer can record a short voice note in the browser
  (optional, up to 2 minutes). Submitting the form sends the normal email, then
  the success screen offers **one tap** to send that same recording to the
  studio's WhatsApp (Web Share API). If the browser cannot attach the file, the
  WhatsApp chat opens and the customer can record there directly. The email
  message states clearly whether a voice message was recorded.
- The contact page also has direct **Call us now** (`tel:`) and **Chat on
  WhatsApp** (`wa.me`) buttons next to each other for instant enquiries.
- **Microphone permissions:** recording needs HTTPS (Vercel is fine) and user
  permission; every unsupported/denied case falls back to typing the
  requirement, so the form always remains submittable.

After deployment, submit a test appointment with a date and time. Confirm the
email arrives at the template's To Email address, includes all six mapped
variables and the extra details in `message`, and check Spam if it is missing.
