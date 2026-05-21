# Plan d'implémentation — Coco Bonbons

> **🤖 INSTRUCTIONS POUR L'ASSISTANT IA QUI EXÉCUTE CE PLAN :**
> 1. Ne fais **qu'une seule phase à la fois**.
> 2. Pour chaque étape, cherche la prochaine case `[ ]` vide.
> 3. Exécute strictement l'action demandée (commande bash ou modification de fichier).
> 4. Modifie ce fichier `PLAN_INITIAL.md` pour cocher la case `[x]` une fois l'étape terminée et vérifiée.
> 5. À la fin d'une phase, exécute la commande de la section `✓ Vérification`.
> 6. **Arrête-toi et attends ma confirmation** avant de passer à la phase suivante.

## Contexte projet
- **Description** : Site vitrine e-commerce one-page pour le distributeur de bonbons Coco Bonbons MK1
- **Type** : Web fullstack / SPA
- **Stack** : Next.js 16 · React 19 · Tailwind v4 · Prisma 7 (SQLite) · Zustand 5 · Lenis · GSAP · R3F · Resend
- **Date** : 2026-05-19

## ⚠️ Notes techniques importantes (Next.js 16 + Prisma 7)
- Tailwind v4 : config via `@theme` dans CSS, **pas de tailwind.config.ts**
- Prisma 7 : requiert `@prisma/adapter-better-sqlite3` pour SQLite, client généré dans `app/generated/prisma/`
- Import Prisma : `import { PrismaClient } from "@/app/generated/prisma/client"`
- Le bin `.bin/next` doit être un **symlink** vers `../next/dist/bin/next` (cassé par `cp -r`)

## Architecture & Structure de fichiers

```
Site/
├── app/
│   ├── layout.tsx             # Fonts Google (Instrument Serif, Manrope, JetBrains Mono), LenisProvider
│   ├── page.tsx               # Composition one-page : toutes les sections + CartDrawer
│   ├── globals.css            # Design system complet : CSS vars, glassmorphism, tous les composants
│   └── api/
│       └── orders/
│           └── route.ts       # POST — insert Prisma + email Resend → { orderId }
├── components/
│   ├── Navbar.tsx             # Nav glassmorphique fixe avec compteur Zustand
│   ├── LenisProvider.tsx      # Smooth scroll Lenis + GSAP ticker sync
│   ├── sections/
│   │   ├── Hero.tsx           # Titre + distributeur CSS + CTA
│   │   ├── Specs.tsx          # 7 fiches techniques
│   │   ├── SectionMarquee.tsx # Texte défilant CSS
│   │   ├── Demo.tsx           # 3 étapes avec SVG animés
│   │   ├── Gallery.tsx        # Grille asymétrique 2fr/1fr/1fr
│   │   ├── About.tsx          # Cards glassmorphiques, contexte ENSIM
│   │   ├── Order.tsx          # Prix 149€, features, CTA panier
│   │   ├── Faq.tsx            # 5 items collapsibles
│   │   └── Footer.tsx         # 4 colonnes, fond --ink
│   ├── distributor/
│   │   ├── DistributorCSS.tsx # Modèle CSS 3D (actif) — 18 bonbons déterministes, levier
│   │   ├── Distributor3D.tsx  # Scaffold R3F (placeholder, GLB pas encore dispo)
│   │   └── index.tsx          # Switch CSS/3D via NEXT_PUBLIC_USE_3D
│   └── cart/
│       └── CartDrawer.tsx     # Drawer 440px : panier → form → succès (Zustand)
├── emails/
│   └── OrderEmail.tsx         # Template React Email, récapitulatif commande
├── lib/
│   ├── prisma.ts              # Singleton PrismaClient + adapter better-sqlite3
│   ├── resend.ts              # Instance Resend
│   └── order-id.ts            # Générateur CB-XXXXX-XXX
├── store/
│   └── cart.ts                # Zustand : qty, isOpen, step, orderId
├── prisma/
│   ├── schema.prisma          # Modèle Order
│   ├── dev.db                 # Base SQLite locale (ignorée par git)
│   └── migrations/
├── public/
│   └── models/                # Emplacement futur du .glb SolidWorks
├── design/                    # Prototype HTML/CSS de référence (ne pas modifier)
├── docs/
│   └── specs.md               # Spécifications du projet
├── plan/
│   └── PLAN_INITIAL.md        # Ce fichier
├── prisma.config.ts           # Config Prisma 7 (datasource URL)
├── CLAUDE.md                  # Guide pour les IA qui travaillent sur ce projet
└── README.md                  # Guide développeur
```

## Stack technique

| Couche | Technologie | Version | Rôle |
|--------|-------------|---------|------|
| Framework | Next.js | 16.2.6 | App Router fullstack |
| UI | React + TypeScript | 19.x | Composants |
| Styles | Tailwind CSS | 4.x | Utilitaires + globals.css |
| ORM | Prisma | 7.8.0 | Accès SQLite |
| Adapter DB | @prisma/adapter-better-sqlite3 | — | Requis par Prisma 7 |
| DB locale | SQLite (better-sqlite3) | — | `prisma/dev.db` |
| State | Zustand | 5.x | Panier + UI |
| Scroll | Lenis | 1.x | Smooth scroll |
| Animation | GSAP + ScrollTrigger | 3.x | Animations au scroll |
| 3D (futur) | R3F + drei + three.js | 9.x / 10.x / 0.184.x | Chargement GLB |
| Email | Resend | 6.x | Envoi emails |
| Template | React Email | 3.x | HTML email |
| Deploy | Vercel | — | CI/CD (ou Docker) |

## Conventions
- App Router : `"use client"` seulement si nécessaire
- Commits : Conventional Commits sur `main`
- Langue du code : anglais
- Design system : CSS vars uniquement, jamais de valeurs hardcodées inline

---

## Phase 1 — Scaffolding & dépendances ✅

- [x] 1. Scaffolder Next.js dans `Site/` via `/tmp/cocobonbon` (contournement restriction npm sur majuscules)
- [x] 2. Installer deps principales : `zustand lenis gsap @gsap/react resend @react-email/components`
- [x] 3. Installer deps 3D : `@react-three/fiber @react-three/drei three @types/three`
- [x] 4. Installer Prisma 7 : `prisma @prisma/client @prisma/adapter-better-sqlite3 better-sqlite3`
- [x] 5. Configurer `prisma/schema.prisma` avec le modèle `Order`
- [x] 6. Créer `.env.local` et `.env` avec `DATABASE_URL`
- [x] 7. Lancer `prisma migrate dev --name init` → `prisma/dev.db` créé avec table `Order`
- [x] 8. Fixer symlink `.bin/next` cassé après `cp -r`

### ✓ Vérification Phase 1
```bash
npx tsc --noEmit
```
Résultat attendu : aucune erreur TypeScript

---

## Phase 2 — Design System (globals.css) ✅

- [x] 1. Porter `design/ensim/project/styles.css` → `app/globals.css` :
   - Variables CSS root (--bg, --paper, --ink, --hair, --accent, --candy-1..6, --glass-*, --alu)
   - Direction `[data-direction="confiserie"]`
   - Tous les composants CSS : nav, hero, specs, demo, gallery, about, order, faq, footer, drawer, distributor, marquee
- [x] 2. Configurer `@theme` Tailwind v4 avec les fonts custom (`--font-display`, `--font-body`, `--font-mono`)
- [x] 3. Imports Google Fonts dans `layout.tsx` (Instrument Serif 400, Manrope 300–700, JetBrains Mono 400–700)

### ✓ Vérification Phase 2
```bash
npm run dev
curl -s http://localhost:3000 | grep -c "Coco Bonbons"
```
Résultat attendu : `>= 1`, fond beige `#f4f3ee` visible dans le navigateur

---

## Phase 3 — Layout, Navbar & Store Zustand ✅

- [x] 1. Créer `store/cart.ts` : `qty`, `isOpen`, `step`, `orderId` + actions `increment/decrement/open/close/setStep/setOrderId`
- [x] 2. Créer `components/LenisProvider.tsx` : Lenis + GSAP ticker synchronisé
- [x] 3. Mettre à jour `app/layout.tsx` : fonts, `data-direction="atelier"`, `LenisProvider`
- [x] 4. Créer `components/Navbar.tsx` : glass pill fixe, logo, liens, bouton panier avec compteur

### ✓ Vérification Phase 3
```bash
curl -s http://localhost:3000 | grep -c "Coco Bonbons"
```
Résultat attendu : `>= 1`

---

## Phase 4 — Distributeur CSS/SVG ✅

- [x] 1. Créer `components/distributor/DistributorCSS.tsx` — portage de `design/ensim/project/distributor.jsx` :
   - `generateCandies(seed)` : 18 bonbons déterministes avec collision avoidance
   - Composants CSS 3D : cap, dome (glass), collar, neck, base (slot + window + lever), pedestal
   - Animation idle `stageIdle` rotateY 0→8°
   - Levier interactif au clic (animation `dispense`)
   - Labels `stage-label-tl/mr/bl`
- [x] 2. Créer `components/distributor/Distributor3D.tsx` : scaffold R3F vide (placeholder GLB)
- [x] 3. Créer `components/distributor/index.tsx` : switch `NEXT_PUBLIC_USE_3D` → CSS ou R3F

### ✓ Vérification Phase 4
Visuel : distributeur CSS 3D visible dans Hero, animation idle active, clic = dispense

---

## Phase 5 — Sections one-page ✅

- [x] 1. `Hero.tsx` — titre serif animé, distributeur inline 620px, CTA → ouvre panier, hero-meta
- [x] 2. `Specs.tsx` — 7 lignes spec-row avec idx mono, name + subtitle, val mono
- [x] 3. `SectionMarquee.tsx` — CSS marquee 28s, 6 mots, séparateur ✦ accent
- [x] 4. `Demo.tsx` — 3 étapes avec SVGs animés SVG (fill/turn/collect)
- [x] 5. `Gallery.tsx` — grille 2fr/1fr/1fr, 4 tiles (t1 full-height alu, t4 gradient bonbons)
- [x] 6. `About.tsx` — glass card gauche + texte droit, tags tech mono
- [x] 7. `Order.tsx` — prix 149€ + card features + CTA → ouvre panier
- [x] 8. `Faq.tsx` — 5 items `useState` open/close, animation max-height 320ms
- [x] 9. `Footer.tsx` — 4 colonnes, `foot-mark` 64px, `foot-bot` mono 11px
- [x] 10. `app/page.tsx` — composition complète : Navbar + toutes sections + CartDrawer

### ✓ Vérification Phase 5
```bash
npm run build 2>&1 | tail -5
```
Résultat attendu : build sans erreur TypeScript

---

## Phase 6 — Cart Drawer + flux commande ✅

- [x] 1. `components/cart/CartDrawer.tsx` :
   - Scrim + drawer 440px glassmorphique
   - **Step "cart"** : line-item (thumb alu + candies), qty +/−, notice paiement simulé
   - **Step "form"** : crumbs, form-grid (email, prénom, nom, adresse, ville, CP, carte pré-remplie)
   - **Step "success"** : ✓ cercle accent, numéro commande, message confirmation
   - Pied : totals (sous-total + livraison offerte + total), bouton CTA contextuel
   - POST `/api/orders` → `setOrderId` → `setStep("success")`

### ✓ Vérification Phase 6
Action manuelle : ouvrir le drawer → ajouter 1 bonbon → Continuer → remplir form → Payer → succès affiché avec numéro CB-XXXXX-XXX

---

## Phase 7 — Backend : API + Prisma + Resend ✅

- [x] 1. `lib/order-id.ts` : `generateOrderId()` → `CB-XXXXX-XXX` (base36 random uppercase)
- [x] 2. `lib/prisma.ts` : singleton `PrismaClient` avec `PrismaBetterSqlite3({ url: dbPath })`
- [x] 3. `lib/resend.ts` : instance `Resend(process.env.RESEND_API_KEY)`
- [x] 4. `emails/OrderEmail.tsx` : template React Email — header noir, recap article, totaux, numéro commande, footer
- [x] 5. `app/api/orders/route.ts` : validation → `generateOrderId` → `prisma.order.create` → `resend.emails.send` → `{ orderId }`

### ✓ Vérification Phase 7
```bash
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","name":"Test","address":"1 rue","city":"Paris","postcode":"75001","quantity":1}' \
  | grep -o 'CB-[A-Z0-9-]*'
```
Résultat attendu : `CB-XXXXX-XXX`

```bash
sqlite3 prisma/dev.db "SELECT orderId, email, quantity FROM 'Order';"
```
Résultat attendu : la commande apparaît en DB

---

## Phase 8 — GSAP ScrollTrigger (parallaxe distributeur) ⬜ À FAIRE

- [ ] 1. Dans `components/sections/Hero.tsx`, ajouter un `useRef` sur le `.stage-inner`
- [ ] 2. Utiliser `useGSAP` de `@gsap/react` pour enregistrer un ScrollTrigger :
   ```ts
   gsap.to(stageRef.current, {
     rotateY: 25,
     x: "15vw",
     ease: "none",
     scrollTrigger: {
       trigger: "#hero",
       start: "top top",
       end: "bottom top",
       scrub: 1.2,
     },
   })
   ```
- [ ] 3. Ajouter animations d'apparition fade + translateY sur les sections (stagger 0.1s) via `ScrollTrigger` `once: true`

### ✓ Vérification Phase 8
Action manuelle : scroller depuis la Hero → le distributeur pivote et se déplace sans saccades

---

## Phase 9 — Déploiement ⬜ À FAIRE

### Option A — Docker (local / VPS)
- [ ] 1. Vérifier `Dockerfile` et `docker-compose.yml` à la racine
- [ ] 2. Lancer `docker compose up --build`
- [ ] 3. Vérifier `http://localhost:3000`

### Option B — Vercel
- [ ] 1. Push sur GitHub
- [ ] 2. Importer sur vercel.com/new
- [ ] 3. Ajouter env vars : `RESEND_API_KEY`
- [ ] 4. **Note** : SQLite non persistant sur Vercel serverless → migrer vers **Turso** :
   ```bash
   npm install @prisma/adapter-libsql @libsql/client
   ```
   Adapter `lib/prisma.ts` pour utiliser `PrismaLibSQL`.

### ✓ Vérification Phase 9
```bash
curl -s https://<projet>.vercel.app | grep -c "Coco Bonbons"
```
Résultat attendu : `>= 1`

---

## Checklist finale end-to-end

- [x] Page s'affiche avec design system correct (fond beige, fonts serif/mono)
- [x] Distributeur CSS 3D visible dans Hero, animation idle active
- [x] Smooth scroll Lenis sans saccades
- [ ] Distributeur pivote au scroll (GSAP ScrollTrigger — Phase 8)
- [x] Clic "Commander" → ouvre CartDrawer
- [x] Parcours complet : panier → form → "Payer" → succès avec numéro CB-XXXXX-XXX
- [x] Commande persistée en SQLite (`sqlite3 prisma/dev.db "SELECT * FROM 'Order';"`)
- [ ] Email de confirmation reçu (nécessite clé Resend réelle dans `.env.local`)
- [ ] Déploiement accessible en ligne (Phase 9)
