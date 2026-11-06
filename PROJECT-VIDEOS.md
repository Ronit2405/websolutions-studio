# Our Work Page — Project Video Guide

"Selected Projects" page (`#/work`) par ab **har project ki image ki jagah us project
ka video slot** hai. Dono cards me 16:9 video space reserved hai.

Abhi `null` hai, isliye wahan ek clean frame dikhta hai:
**"Video coming soon"** — page blank ya adhoora nahi lagta, aur jab video ready ho to
sirf ek line badalni hai.

## 1. Video add karna (per project)

File: `src/data/content.ts` → `PROJECT_VIDEOS`

```ts
export const PROJECT_VIDEOS: Record<"rice-mill" | "dhurwadera", string | null> = {
  "rice-mill": null,     // 👈 Rice Mill project ka video
  "dhurwadera": null,    // 👈 Dhurwadera homestay project ka video
};
```

Bas `null` ki jagah link daal do:

```ts
"rice-mill": "https://youtu.be/dQw4w9WgXcQ",
```

Supported links:

| Type | Example |
|---|---|
| YouTube (watch / shorts / live / youtu.be) | `"https://youtu.be/dQw4w9WgXcQ"` |
| Vimeo | `"https://vimeo.com/76979871"` |
| Direct file (mp4 / webm / ogg / mov) | `"/videos/rice-mill.mp4"` |

- Video 16:9 me automatically fit hota hai — mobile, tablet, desktop sab par.
- Mobile par tap karke play hota hai (`playsInline`), YouTube/Vimeo embed me controls
  built-in aate hain.
- Direct mp4 ke liye file `public/videos/` folder me rakho aur path `/videos/naam.mp4` do.
- YouTube video ko **Public ya Unlisted** rakho (Private embed nahi chalega).
- Link galat / khaali ho to wahi "coming soon" frame wapas dikh jata hai — page kabhi
  tootega nahi.

## 2. Doosre project ka video

Dono project ke apne alag fields hain — kisi ek project ka link doosre me mat daalna.
Sirf usi project ka video uske field me rakho.

## 3. Rice Mill test login details

`src/components/Portfolio.tsx` ke Rice Mill card par:

```tsx
credentials={{ id: "Admin", password: "Ronit0105" }}
```

Ye details card me "Test Login Details" box me dikhti hain (ID + Password), taaki koi bhi
system test kar sake. Badalna ho to yahin values update kar do; hatana ho to `credentials`
prop hata do — box apne aap gayab ho jayega.

## 4. Naya project add karna

1. `src/data/content.ts` ke `PROJECT_VIDEOS` me naya key + `null` add karo.
2. `src/components/Portfolio.tsx` me ek aur `<ProjectCard ... />` add karo.
3. Naya English text `src/i18n.tsx` ke `HINDI_TRANSLATIONS` me add karo
   (key = exact English sentence).

Grid automatically 2 columns (desktop) / 1 column (mobile) me adjust ho jata hai.
