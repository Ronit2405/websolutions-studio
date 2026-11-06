# EmailJS contact form setup

The website contact form sends inquiries through the EmailJS browser SDK
(`@emailjs/browser`). The EmailJS Service ID, Template ID and **Public Key** are
public client-side values, configured in `src/components/Contact.tsx` with
optional `VITE_EMAILJS_*` environment overrides. **Never use or expose an
EmailJS Private Key.**

## Template variables

`src/utils/inquiry.ts` is the source of truth for the EmailJS payload, and
[`EMAILJS-TEMPLATE.html`](./EMAILJS-TEMPLATE.html) is the matching template
markup. The form sends these exact variables:

| EmailJS variable | Value |
| --- | --- |
| `{{fullName}}` | Customer name |
| `{{business}}` | Business name, or `Not provided` |
| `{{email}}` | Customer email, or `Not provided` |
| `{{phone}}` | Customer phone number |
| `{{city}}` | City, or `Not provided` |
| `{{service}}` | Selected service |
| `{{description}}` | Project description |
| `{{contactMethod}}` | Customer's preferred contact method |
| `{{submittedAt}}` | Submission date and time |
| `{{reply_to}}` | Customer email, or the studio inbox if no email was supplied |
| `{{message}}` | Complete plain-text inquiry, including the no-email reply instruction when applicable |

In the EmailJS dashboard, paste the contents of `EMAILJS-TEMPLATE.html` into
the template's HTML body. Set **To Email** to the studio inbox
`ronitsundrani0104@gmail.com` and **Reply-To** to `{{reply_to}}`. The user email
is optional; when omitted, the message prominently asks the studio to reply via
the submitted phone / WhatsApp number. The phone number is always collected.

## EmailJS dashboard checklist

1. Confirm the Service ID is `service_g2uzvof` and the Template ID is
   `template_6w31t7g` (or use the optional Vercel overrides below).
2. Update the template to use all exact variable names in the table above. In
   particular, do not use the legacy `name` variable in place of `fullName`.
3. Set **To Email** to `ronitsundrani0104@gmail.com` and **Reply-To** to
   `{{reply_to}}`.
4. Confirm the template's HTML body contains the mapping in
   `EMAILJS-TEMPLATE.html` and save it in EmailJS.
5. In EmailJS security settings, restrict allowed origins to the production
   website domain (and preview domain only if you need to test previews).

## Vercel configuration

The current Service ID, Template ID and Public Key are code defaults, so no
additional Vercel variables are required. To override them, add these under the
Vercel project → **Settings → Environment Variables**:

- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID`
- `VITE_EMAILJS_PUBLIC_KEY`
- `VITE_OWNER_EMAIL` (public email link / fallback only)
- `VITE_WHATSAPP_NUMBER` (public business number, digits with country code;
  default `917470383241`)

`VITE_*` values are bundled into the browser. Only use EmailJS's **Public Key**
here—never a Private Key. Redeploy after changing build environment variables.
No serverless email endpoint is used; the form sends directly through EmailJS.

## Form behavior and testing

- Client-side validation, optional email, selected-service handoff, and the
  hidden honeypot field remain in place.
- A synchronous guard blocks rapid double-clicks, and a successful identical
  submission is blocked for 60 seconds in the current browser session.
- Success is shown only after EmailJS confirms the send. Failures show an error
  and a direct-email fallback link.
- The contact page includes direct **Call us now** (`tel:`) and **Chat on
  WhatsApp** (`wa.me`) links for instant enquiries.

After deployment, submit a test inquiry with every form field filled in, then
submit another with the optional email, business, and city fields empty. Confirm
both messages arrive at the template's **To Email** address, every populated
field renders in its corresponding template section, optional values show a
readable fallback, and the Reply-To is valid in both cases. Check Spam if an
email is missing.
