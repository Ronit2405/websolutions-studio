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
2. Add and verify your sending domain (e.g. `websolutionsstudio.com`) in
   Resend → Domains, following their DNS instructions.
3. Create an API key in Resend → API Keys (sending permission).
4. Note your verified sender address, e.g. `inquiries@websolutionsstudio.com`.

## 3. Configure environment variables

Copy `.env.example` values into **Vercel → Project → Settings → Environment
Variables** (Production + Preview):

| Variable | Value | Required |
|---|---|---|
| `RESEND_API_KEY` | Your Resend API key (`re_...`) | Yes |
| `OWNER_EMAIL` | Inbox that receives inquiry notifications | Yes |
| `FROM_EMAIL` | Verified sender in Resend | Yes |
| `SEND_CUSTOMER_CONFIRMATION` | `true` to also email the customer | Optional |
| `VITE_OWNER_EMAIL` | Public email shown on the site | Optional |

> The public contact address is `rontisundrani0104@gmail.com`. Set the same
> address as `OWNER_EMAIL` in Vercel so inquiry notifications reach the studio
> inbox. `OWNER_EMAIL` is the single source of truth for notifications; the
> Resend API key and verified sender address are still required to enable delivery.

## 4. Deploy on Vercel

1. Push this project to a Git repository (GitHub/GitLab/Bitbucket).
2. In Vercel, **Add New → Project** and import the repository.
3. Framework preset: **Vite**. Build command: `npm run build`. Output: `dist`.
4. Add the environment variables from step 3.
5. Deploy. The `api/contact.ts` function is deployed automatically as
   `/api/contact` — no extra configuration needed.

## 5. Verify it works

1. Visit your deployed site and open the contact form.
2. If email is not configured, an amber notice appears at the top of the form.
3. Submit a test inquiry — you should see the success message **only** after
   the owner email arrives in your inbox.
4. Check the email contains: name, business, email, phone, service, project
   description, contact method, appointment date/time, and submission time.
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
