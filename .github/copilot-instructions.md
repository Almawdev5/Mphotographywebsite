# Photo Mengie - Copilot Instructions

## Project
A futuristic, cinematic photography portfolio and booking platform built for a professional photographer in Ethiopia offering photography, videography, and basic tech support services.

## Tech Stack
- Next.js 14 with App Router (NEVER use Pages Router)
- TypeScript 5 — always add explicit return types
- Tailwind CSS — all styling via utility classes only, no CSS modules, no inline styles
- Supabase — for database, auth, and storage (@supabase/ssr for server-side)
- Framer Motion — for animations and transitions
- Resend — for transactional emails
- next-intl — for English/Amharic multi-language support
- Zod — for all form validation and API input schemas

## Brand Colors
- Black: #111111 (--color-black)
- White: #F5F5F5 (--color-white)
- Gold: #D4AF37 (--color-gold)
- Deep Gray: #2B2B2B (--color-gray)

## Fonts
- Headings: Montserrat
- Body: Poppins

## Coding Rules
- Always use named exports (never default exports for components)
- Prefer async/await over .then() chains
- Always add try/catch to any async function that calls Supabase or an API
- Use early returns for guard clauses — avoid deep nesting
- Never install new npm packages without asking first
- All form inputs must be validated with Zod before submission
- Images: always use next/image with proper width/height/alt
- Server Components by default — add 'use client' only when needed

## File Structure
- UI components: /components/ui/
- Feature components: /components/features/
- Page sections: /components/sections/
- Admin components: /components/admin/
- Types: /types/index.ts
- Server Actions: /app/actions/
- API routes: /app/api/
- i18n messages: /messages/en.json and /messages/am.json

## Services
Wedding Photography: 12,000-35,000 ETB
Portrait Photography: 2,000-5,000 ETB
Normal Photography: 1,500-3,500 ETB
4x3 Photo Service: 80-200 ETB
Graduation Photography: 3,000-8,000 ETB
Event Coverage: 4,000-15,000 ETB
Product Photography: 2,000-7,000 ETB
Photo Editing: 300-2,000 ETB
Videography: 5,000-18,000 ETB
Drone Photography: 8,000-35,000 ETB
Tech Support Services: 500-3,000 ETB

## Do NOT
- Do not use Pages Router
- Do not use default exports for React components
- Do not use inline styles
- Do not use any CSS-in-JS library
- Do not install axios — use native fetch
- Do not hardcode any API keys — use environment variables only