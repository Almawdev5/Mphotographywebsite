
# Photo Mengie

>A futuristic, cinematic photography portfolio and booking platform for a professional photographer in Ethiopia.

---

## Overview

Photo Mengie is a modern web platform for showcasing photography, booking sessions, and managing a creative business. It features a cinematic gallery, multi-language support (English/Amharic), and a robust admin dashboard for managing photos, appointments, and blog content.

**Key Features:**
- Cinematic photo & video gallery
- Online appointment booking
- Service listings with pricing
- Blog for tips, events, and updates
- Contact form with email notifications
- Admin dashboard for content management
- Multi-language (English/Amharic)
- Supabase integration for database, auth, and storage
- Responsive, modern UI with Tailwind CSS & Framer Motion

## Tech Stack
- **Next.js 14** (App Router, TypeScript)
- **Tailwind CSS** (utility-first styling)
- **Supabase** (database, auth, storage)
- **Framer Motion** (animations)
- **Resend** (transactional emails)
- **next-intl** (i18n)
- **Zod** (form validation)

## Project Structure

```
app/
	├─ page.tsx           # Home page
	├─ about/             # About the brand
	├─ services/          # Service listings
	├─ gallery/           # Photo gallery
	├─ appointments/      # Booking form
	├─ blog/              # Blog posts
	├─ contact/           # Contact form
	├─ admin/             # Admin dashboard (photos, appointments, blog)
	├─ api/               # API routes (booking, email, auth)
components/
	├─ sections/          # Page sections (Hero, Services, CTA)
	├─ ui/                # UI elements (Navbar, Footer, ThemeToggle)
lib/
	└─ supabase/          # Supabase client/server helpers
types/
	└─ database.ts        # TypeScript types for DB
```

## Main Features

- **Gallery:** Browse categorized photos (weddings, portraits, events, commercial, drone, etc.)
- **Services:** Detailed service descriptions and transparent pricing
- **Booking:** Book appointments for any service, with email notifications
- **Blog:** Tips, event highlights, and photography insights
- **Contact:** Direct contact form with email delivery
- **Admin:** Secure dashboard for managing photos, appointments, and blog posts

## Getting Started

1. **Install dependencies:**
	 ```bash
	 npm install
	 ```
2. **Set up environment variables:**
	 - `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` (from Supabase)
	 - `RESEND_API_KEY` and `ADMIN_EMAIL` (for email notifications)
3. **Run the development server:**
	 ```bash
	 npm run dev
	 ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Customization & Extensibility

- **Styling:** All styles use Tailwind CSS utility classes
- **Validation:** All forms use Zod for input validation
- **Images:** Use `next/image` for optimized loading
- **Internationalization:** Add translations in `/messages/en.json` and `/messages/am.json`

## License

This project is for portfolio and client use. Contact the author for commercial licensing or collaboration.
