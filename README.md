# Brainics — Tuition Institute Website

Static website built with **Next.js + TypeScript + Tailwind CSS**. English + Urdu (RTL), WhatsApp + enquiry form.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
```

## Where to edit things

| What | File |
| --- | --- |
| Phone, WhatsApp number, email, address, timings, map | `lib/site.ts` |
| All text (English + Urdu), courses, testimonials | `lib/content.ts` |
| Gallery photos | put images in `public/gallery/`, list them in `components/Gallery.tsx` |
| Colors and fonts | `tailwind.config.ts` |

Search for `TODO` to find every placeholder.

## Build the static site

```bash
npm run build      # outputs plain HTML/CSS/JS to the `out/` folder
```

## Deploy free on Vercel

1. Create a free account at https://github.com and create a new repository named `brainics`.
2. Push this project:
   ```bash
   git init
   git add .
   git commit -m "Initial Brainics website"
   git branch -M main
   git remote add origin https://github.com/<your-username>/brainics.git
   git push -u origin main
   ```
3. Go to https://vercel.com, sign in with GitHub, click **Add New → Project**, and import `brainics`.
4. Keep the defaults (Framework: Next.js) and click **Deploy**. You get a free `*.vercel.app` URL in about a minute.
5. Every future `git push` redeploys automatically.

## Later: Spring Boot backend

The enquiry form currently opens WhatsApp with the details pre-filled. When we add Spring Boot, the form will `POST` to an API instead (and save enquiries), with no redesign needed.
