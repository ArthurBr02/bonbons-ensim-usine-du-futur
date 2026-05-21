# Coco Bonbons

## Description
Site vitrine e-commerce one-page pour le distributeur de bonbons Coco Bonbons MK1. Projet ENSIM "Usine du futur".

## Stack
- Next.js 16 (App Router, TypeScript)
- Tailwind CSS v4 + design system custom dans `app/globals.css` (CSS vars, pas de tailwind.config.ts)
- Prisma 7 + SQLite (dev) — client généré dans `app/generated/prisma/`
- Zustand 5 (état panier + UI) dans `store/cart.ts`
- Lenis (smooth scroll) + GSAP ScrollTrigger (animations au scroll)
- React Three Fiber + drei (scaffold 3D, fallback CSS actuellement)
- Resend + React Email (confirmation de commande)

## Structure du projet
```
app/                    — layout, page, API routes, globals.css
app/generated/prisma/   — client Prisma généré (ne pas éditer)
components/sections/    — Hero, Specs, Demo, Gallery, About, Order, Faq, Footer, SectionMarquee
components/cart/        — CartDrawer (side drawer glassmorphique, 3 steps)
components/distributor/ — DistributorCSS (fallback CSS/SVG), Distributor3D (scaffold R3F)
components/Navbar.tsx   — nav fixed glassmorphique
components/LenisProvider.tsx — smooth scroll + GSAP ticker sync
store/cart.ts           — Zustand : qty, isOpen, step, orderId
lib/prisma.ts           — singleton Prisma client
lib/resend.ts           — instance Resend
lib/order-id.ts         — générateur CB-XXXXX-XXX
emails/OrderEmail.tsx   — template React Email
prisma/schema.prisma    — modèle Order (SQLite)
```

## Commandes clés

| Commande | Description |
|----------|-------------|
| `npm run dev` | Démarrer en développement |
| `npm run build` | Build de production |
| `npm run lint` | ESLint |
| `npx prisma studio` | Interface DB SQLite |
| `npx prisma migrate dev` | Appliquer les migrations |
| `npx prisma generate` | Régénérer le client Prisma |

## Variables d'environnement (.env.local)
```
DATABASE_URL="file:./prisma/dev.db"
RESEND_API_KEY="your_key_here"
```

## Conventions
- App Router Next.js 16 : `"use client"` seulement si nécessaire (interactivité, hooks browser)
- Tailwind v4 : configuration via `@theme` dans globals.css, pas de tailwind.config.ts
- Design system : tout via CSS vars (--bg, --ink, --accent, --candy-1..6, --glass-bg, etc.)
- Commits : Conventional Commits sur `main`
- Langue du code : anglais

## Contraintes importantes
- Modèle GLB SolidWorks pas encore disponible — `DistributorCSS` comme fallback
- SQLite ne persiste pas sur Vercel serverless → migrer vers Turso pour la prod
- Paiement simulé : bouton "Payer" → POST /api/orders → email de confirmation → succès
- Prisma 7 : client dans `app/generated/prisma/`, importer depuis `@/generated/prisma/client`
