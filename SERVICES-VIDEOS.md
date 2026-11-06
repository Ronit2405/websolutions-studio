# Services Page — Video & Content Guide

Har service ka **apna video slot** services page par already reserved hai (16:9 box).
Abhi `video: null` hai, isliye wahan ek clean "Video coming soon" frame dikhta hai.
Video ready ho, to sirf neeche diya hua step follow karo — layout, styling kuch
change karne ki zaroorat nahi.

## 1. Video add karna (per service)

File: `src/data/content.ts` → `SERVICES` array.

```ts
{
  id: "website-development",
  ...
  video: null, // 👈 yahi badalna hai
}
```

Supported links:

| Type | Example |
|---|---|
| YouTube (watch / shorts / live / youtu.be) | `"https://youtu.be/dQw4w9WgXcQ"` |
| Vimeo | `"https://vimeo.com/76979871"` |
| Direct file (mp4 / webm / ogg / mov) | `"/videos/website-development.mp4"` |

Example:

```ts
video: "https://youtu.be/dQw4w9WgXcQ",
```

- Video embed automatically 16:9 par fit ho jata hai, mobile par tap karke play hota hai.
- Video `null` rehne par reserved placeholder dikhta hai (page blank ya adhoora nahi lagta).
- Direct mp4 ke liye file `public/videos/` folder me rakho aur path `/videos/naam.mp4` do.
- YouTube settings me video ko **Public ya Unlisted** rakho (Private embed nahi chalega).

## 2. Naya service add karna

Agar future me 6th service add karni ho, to `SERVICES` array me ek object add karo —
ye fields zaroori hain:

```ts
{
  id: "new-service-id",        // URL: #/services/new-service-id
  icon: Globe,                 // import from lucide-react
  title: "Service Name",
  short: "One-line summary",
  tagline: "Catchy hook (card/video ke neeche dikhta hai)",
  quickPoints: ["Point 1", "Point 2", "Point 3"], // video ke neeche
  bestFor: "Kis business ke liye sahi hai",
  video: null,                 // ya link
  description: "2-3 line description",
  includes: ["Item 1", "Item 2"],
  formValue: "Service Name",   // contact form me is naam se pre-select hota hai
}
```

Services page list, chips, prev/next navigation, counter — sab automatically update ho jate hain.

## 3. Deep link (direct kisi service ka video)

`https://websolutions-studio-ten.vercel.app/#/services/ai-agents`

Ye link services page kholta hai aur seedha usi service ka video dikhata hai.
Video ke saath share karne ya WhatsApp par bhejne ke liye useful hai.

## 4. Content edit karna

- Hook (tagline), quick points, best-for, description → `src/data/content.ts`
- English text jaisa hi likhna hai; Hindi translation `src/i18n.tsx` me
  `HINDI_TRANSLATIONS` object me add karo (key = exact English sentence).

## 5. Design kaise socha gaya hai (why it works)

- **Video-first viewer**: service ka naam click → video turant upar dikhta hai, plus
  usi card me short description, 3 quick points, enquiry button.
- **Chhota scroll, kam mehnat**: pehle sirf essentials, "See full details" par
  "What's included" + "Best for" expand hota hai.
- **Hamesha navigation**: upar chips (quick jump), side/niche service list,
  aur prev/next buttons — user kabhi atakta nahi.
- **Mobile-first**: chips horizontally scroll hote hain, video full width, buttons
  full width (44px+ tap targets), desktop par side playlist sticky rehti hai.
- **Load halka**: video tab tak load nahi hota jab tak us iFrame ko render na ho
  (`loading="lazy"`), aur single-file build bhi bana rehta hai.
