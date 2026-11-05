# WebSolutions Studio — Deployment & Email Setup Guide

This document explains how to deploy the website on Vercel and connect the
contact form to a real email notification system using **Resend**.

> **Important:** The contact form does not fake success. Until the email
> service below is configured, submissions return an honest "not configured"
> message and the visitor is offered a direct-email fallback. This is by design.

---

## 1. How the email system works

```
Visitor submits form
        │
        ▼
Frontend (React) ──POST /api/contact──► Vercel Serverless Function (api/contact.ts)
                                              │ validates fields server-side
                                              │ honeypot + rate limiting
                                              ▼
                                         Resend API ──► OWNER_EMAIL inbox
                                              │
                                              └─► (optional) confirmation email to customer
```

- The Resend API key lives **only** in server environment variables — it is
  never shipped to the browser.
- The frontend only shows the success message after the server confirms
  delivery (HTTP 200 with `ok: true`).

## 2. Set up Resend (free tier is enough to start)

1. Create an account at https://resend.com
2. Add and verify a sending domain you own in Resend → Domains, following
   Resend's DNS instructions. A personal `@gmail.com` address cannot be used
   as the verified sender.
3. Create an API key in Resend → API Keys with email-sending permission.
4. Choose a sender on that verified domain, e.g.
   `inquiries@your-verified-domain.com`.

## 3. Configure environment variables

Use `.env.example` as a template and enter real values in **Vercel → Project
→ Settings → Environment Variables** (Production; add Preview too if you want
to test preview deployments). Do not copy placeholder values or commit a real
`.env` file:

| Variable | Value | Required |
|---|---|---|
| `RESEND_API_KEY` | Your Resend API key (`re_...`) | Yes |
| `FROM_EMAIL` | Sender address on a domain verified in Resend | Yes |
| `OWNER_EMAIL` | Inbox for inquiry and appointment notifications; defaults to `ronitsundrani0104@gmail.com` | Optional, but set it explicitly in Vercel |
| `VITE_OWNER_EMAIL` | Public contact email shown on the website; defaults to `ronitsundrani0104@gmail.com` | Optional, but set it explicitly in Vercel |
| `SEND_CUSTOMER_CONFIRMATION` | `true` to also email the customer | Optional |

At minimum, set `RESEND_API_KEY` and `FROM_EMAIL`. Set both `OWNER_EMAIL` and
`VITE_OWNER_EMAIL` to `ronitsundrani0104@gmail.com` in the existing Vercel
project so notifications and the site's direct-email links use the same inbox.
If either variable is already set to an older address, update or remove that
old value; an existing environment variable overrides the code default.

`FROM_EMAIL` must use a domain you own and have verified in Resend; it is the
**sender** address, not your Gmail inbox. The Gmail address above is the
**recipient**.

## 4. Deploy on Vercel

This repository is already connected to Vercel through GitHub. Use the existing
Vercel project that serves the live site:

1. Open **Project → Settings → Environment Variables**.
2. Add the variables from section 3. Set `RESEND_API_KEY` and `FROM_EMAIL` for
   Production; also select Preview if you want to test branch preview URLs.
3. Save the variables, then redeploy the latest deployment so the new settings
   take effect. Do not put the Resend API key in frontend variables (`VITE_*`)
   or in the Git repository.
4. Vercel deploys `api/contact.ts` automatically as `/api/contact` — no extra
   routing configuration is needed.

## 5. Verify it works

1. Visit your deployed site and open the contact form.
2. If email is not configured, an amber notice appears at the top of the form.
3. Submit a test inquiry — you should see the success message **only** after
   the owner email arrives in your inbox.
4. Check the email contains: name, business, email, phone, service, project
   description, contact method, appointment date/time, and submission time.
   Appointment requests are labeled **New Appointment Request** in the subject.
5. Test validation: empty required fields, invalid email, and unchecked
   consent must all be blocked with clear messages.
6. Test on mobile (375px), tablet (768px), and desktop (1280px+).

## 6. Local development

```bash
npm install
npm run dev        # frontend only — email endpoint is not available in Vite dev
npm run build      # production build
```

For local email testing, run the function with Vercel CLI:

```bash
npx vercel dev     # serves frontend + /api/contact locally
```

## 7. Security checklist

- [ ] `RESEND_API_KEY` is set only as a server-side Vercel variable
- [ ] No API keys exist anywhere in `src/` (frontend code)
- [ ] `.env` is git-ignored; only `.env.example` is committed
- [ ] Resend domain is verified before going live
- [ ] Honeypot + rate limiting are active in `api/contact.ts`

## 8. Project structure

```
src/
  components/   Navbar, Hero, Services, WhyUs, About, Portfolio, Contact, Footer, Legal
  data/         content.ts (services, images, owner email)
api/
  contact.ts    Serverless email endpoint (Resend)
public/
  favicon.svg
.env.example    All required variables (no secrets)
DEPLOYMENT.md   This guide
```
