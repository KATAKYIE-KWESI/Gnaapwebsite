# GNAAP Website — Next.js Frontend

> Ghana National Authors & Publishers Association — Modern website redesign built with Next.js 14, Tailwind CSS, and deployed to Vercel.

---

## 🗂️ Project Structure

```
gnaap-website/
├── app/                        ← Next.js App Router pages
│   ├── layout.js               ← Root layout (Navbar + Footer, fonts, metadata)
│   ├── globals.css             ← Global styles + Tailwind
│   ├── page.js                 ← Home page
│   ├── about/page.js           ← About page
│   ├── membership/page.js      ← Membership page
│   ├── news/page.js            ← News page (with search + filter)
│   ├── bookstore/page.js       ← Bookstore page
│   └── contact/page.js         ← Contact page (with form)
├── components/
│   ├── Navbar.js               ← Sticky responsive navbar
│   ├── Footer.js               ← Footer with links & socials
│   └── sections/               ← Home page section components
│       ├── Hero.js
│       ├── MissionPillars.js
│       ├── AboutPreview.js
│       ├── NewsPreview.js
│       └── CTABanner.js
├── lib/
│   └── useAnimateOnScroll.js   ← Scroll-triggered animation hook
├── public/                     ← Static assets (add images here)
├── package.json
├── tailwind.config.js
├── next.config.mjs
└── vercel.json
```

---

## 🎨 Design System

| Token        | Value            | Usage                        |
|-------------|-----------------|------------------------------|
| Forest Green | `#1B3A2D`       | Primary brand colour         |
| Gold         | `#C9983B`       | Accent / CTA colour          |
| Cream        | `#FDFAF5`       | Page background              |
| Ink          | `#111111`       | Body text                    |
| Font Display | Cormorant Garamond | Headings, hero text       |
| Font Body    | Plus Jakarta Sans  | Body, UI, labels           |

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js 18+ installed ([download here](https://nodejs.org))
- A code editor (VS Code recommended)

### Steps

```bash
# 1. Navigate into the project folder
cd gnaap-website

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev

# 4. Open your browser
# → http://localhost:3000
```

That's it! The site will hot-reload as you make changes.

---

## ☁️ Deploy to Vercel (Step-by-Step)

### Option A — Vercel CLI (fastest)

```bash
# Install Vercel CLI globally (one-time)
npm install -g vercel

# Inside the project folder
vercel

# Follow the prompts:
# - Link to your Vercel account (or create one free at vercel.com)
# - Select project name
# - Confirm settings
# Vercel will give you a live URL instantly! 🎉
```

### Option B — GitHub + Vercel Dashboard (recommended for teams)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial GNAAP website"
   git remote add origin https://github.com/YOUR_USERNAME/gnaap-website.git
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com) → Sign in
   - Click **"Add New Project"**
   - Import your GitHub repository
   - Click **"Deploy"** — done! ✅

3. **Every push to `main` automatically redeploys** — perfect for iterating!

---

## 📄 Pages Overview

| Page         | Route          | Description                              |
|-------------|---------------|------------------------------------------|
| Home         | `/`           | Hero, pillars, about preview, news, CTA  |
| About        | `/about`      | History, vision/mission, team, partners  |
| Membership   | `/membership` | Benefits, tiers (pricing), application   |
| News         | `/news`       | Articles with search & category filter   |
| Bookstore    | `/bookstore`  | Books grid with search & category filter |
| Contact      | `/contact`    | Contact info + working form (mock)       |

---

## 🔌 Connecting the Backend (Next Phase)

When your Node.js backend is ready, replace the **mock data** in each page with real API calls:

```js
// Example: fetching news from your Node.js API
const res = await fetch('https://your-api.com/api/news');
const articles = await res.json();
```

Pages to update:
- `app/news/page.js` — replace `allNews` array with API data
- `app/bookstore/page.js` — replace `books` array with API data
- `app/contact/page.js` — replace `setTimeout` mock with real `fetch` POST

---

## 🛠️ Common Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Run production build locally
npm run lint     # Check for code issues
```

---

## 💡 Tips for Beginners

- **`'use client'`** at the top of a file = interactive page (uses React state/hooks)
- **No `'use client'`** = server component (faster, good for static content)
- **`@/`** is a shortcut for the project root (set up in `jsconfig.json`)
- Edit `tailwind.config.js` to change colours or add new design tokens
- Add real images to `/public` and use `<Image src="/your-image.jpg" ... />` from `next/image`

---

Built with ❤️ for GNAAP — Ghana National Authors & Publishers
