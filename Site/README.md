# Coco Bonbons

Site vitrine e-commerce one-page pour le **Coco Bonbons MK1** — distributeur de bonbons en aluminium brossé et verre borosilicate.  
Projet pédagogique du cours **Usine du futur** à l'ENSIM.

## Démarrage rapide

### Option 1 — Docker (recommandé)

```bash
cp .env.local.example .env.local   # puis renseigner RESEND_API_KEY
docker compose up
```

→ [http://localhost:3000](http://localhost:3000)

### Option 2 — Node.js en local

```bash
npm install
cp .env.local.example .env.local   # puis renseigner RESEND_API_KEY
npx prisma migrate dev
npm run dev
```

## Variables d'environnement

Copier `.env.local.example` en `.env.local` et renseigner :

| Variable | Valeur | Description |
|----------|--------|-------------|
| `DATABASE_URL` | `file:./prisma/dev.db` | Chemin SQLite (local) |
| `RESEND_API_KEY` | `re_xxxx` | Clé API Resend pour les emails |

## Commandes utiles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Dev server (localhost:3000) |
| `npm run build` | Build production |
| `npm run lint` | ESLint |
| `npx prisma studio` | UI base de données |
| `npx prisma migrate dev` | Appliquer les migrations |
| `npx prisma generate` | Régénérer le client |

## Stack technique

- **Next.js 16** (App Router, TypeScript)
- **Tailwind CSS v4** — design system via CSS vars dans `globals.css`
- **Prisma 7 + SQLite** — client adaptatif `@prisma/adapter-better-sqlite3`
- **Zustand 5** — état panier et UI
- **Lenis + GSAP** — smooth scroll et animations au scroll
- **React Three Fiber** — scaffold 3D (activer avec `NEXT_PUBLIC_USE_3D=true`)
- **Resend + React Email** — emails de confirmation

## Activer le modèle 3D (GLB SolidWorks)

1. Exporter le modèle depuis SolidWorks en `.glb`
2. Poser le fichier dans `public/models/distributor.glb`
3. Ajouter `NEXT_PUBLIC_USE_3D=true` dans `.env.local`
4. Redémarrer le serveur

## Structure du projet

```
app/                    layout, page, API routes, globals.css
components/sections/    Hero, Specs, Demo, Gallery, About, Order, Faq, Footer
components/cart/        CartDrawer (side drawer 3 étapes)
components/distributor/ DistributorCSS (actif) + Distributor3D (scaffold)
design/                 Prototype HTML/CSS original (référence design)
docs/                   Spécifications du projet
emails/                 Templates React Email
lib/                    Prisma, Resend, generateOrderId
prisma/                 Schema, migrations, dev.db
public/models/          Emplacement du GLB (à venir)
store/                  Zustand store
```
