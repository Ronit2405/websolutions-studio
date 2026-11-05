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
| `{{name}}` | Full name |
| `{{email}}` | Customer email |
| `{{phone}}` | Phone number |
| `{{date}}` | Preferred appointment date, or `Not provided` |
| `{{time}}` | Preferred appointment time, or `Not provided` |
| `{{message}}` | Project/appointment description plus business, city, selected service, and preferred contact method |

The EmailJS template's **To Email** setting controls which Gmail inbox receives
the notification. Keep that destination configured in EmailJS; it is not sent
from a private key in the website.

## EmailJS dashboard checklist

1. Confirm the Service ID is `service_g2uzvof` and the Template ID is
   `template_6w31t7g` (or set overrides in Vercel).
2. In the template, use the exact variable names above: `name`, `email`,
   `phone`, `date`, `time`, and `message`.
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
- A form with an appointment service or date/time uses the subject
  **New Appointment Request** in the direct-email fallback.

After deployment, submit a test appointment with a date and time. Confirm the
email arrives at the template's To Email address, includes all six mapped
variables and the extra details in `message`, and check Spam if it is missing.
