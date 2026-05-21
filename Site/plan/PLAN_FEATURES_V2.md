# Plan — Chatbot Mistral + Palette couleurs + Section SAV

> **🤖 INSTRUCTIONS POUR L'ASSISTANT IA QUI EXÉCUTE CE PLAN :**
> 1. Ne fais **qu'une seule phase à la fois**.
> 2. Pour chaque étape, cherche la prochaine case `[ ]` vide.
> 3. Exécute strictement l'action demandée.
> 4. Coche la case `[x]` une fois l'étape terminée et vérifiée.
> 5. À la fin d'une phase, exécute la commande de la section `✓ Vérification`.
> 6. **Arrête-toi et attends confirmation** avant de passer à la phase suivante.

## Contexte

Le site Coco Bonbons (Next.js 16, Tailwind v4, Zustand 5, Resend) est un one-pager e-commerce. Trois features à ajouter sur la V1 existante :

1. **Sélecteur de palette de couleurs** dans la Gallery (4 candy colors + défaut aluminium) qui swap les URLs des 4 photos de la machine
2. **Chatbot Mistral AI** accessible via un bouton flottant bas-droite, ouvrant un drawer latéral (même pattern glassmorphique que CartDrawer)
3. **Section SAV** avec formulaire de contact (type info/SAV + nom + email + message) → email via Resend

## Variables d'environnement requises

Ajouter dans `.env.local` :

```
MISTRAL_API_KEY=your_key_here   # https://console.mistral.ai/
SAV_EMAIL=sav@cocobonbons.fr    # adresse de réception SAV
```

## Fichiers à créer

| Fichier | Rôle |
|---------|------|
| `store/chat.ts` | Zustand : isOpen, messages, isLoading + actions |
| `components/chat/ChatDrawer.tsx` | Bouton flottant bas-droite + drawer chat glassmorphique |
| `components/sections/Sav.tsx` | Section "08 Contact & SAV" |
| `app/api/chat/route.ts` | Proxy Mistral AI (`open-mistral-nemo`) |
| `app/api/contact/route.ts` | Soumission formulaire contact → Resend |
| `emails/ContactEmail.tsx` | Template React Email pour les demandes contact |

## Fichiers à modifier

| Fichier | Changement |
|---------|-----------|
| `components/sections/Gallery.tsx` | Palette picker + logique URL + fallback onError |
| `app/page.tsx` | Ajouter `<Sav />` avant Footer, `<ChatDrawer />` en overlay |
| `components/Navbar.tsx` | Ajouter lien "Contact" → `#contact` |
| `app/globals.css` | Styles : chat drawer, palette swatches, SAV section |
| `env.example` | Ajouter `MISTRAL_API_KEY`, `SAV_EMAIL` |

---

## Phase A — Palette de couleurs (Gallery)

### Décisions
- **4 swatches** : Rose (`#FD5F9F`), Menthe (`#5dd6a8`), Violet (`#7c5cff`), Orange (`#ff7043`)
- **URL pattern** : `{BASE_URL}{view}-{palette}.jpg` (ex: `front-rose.jpg`)
- **Fallback** : `onError` sur `<Image>` → revient à `{BASE_URL}{view}.jpg` si le fichier coloré n'existe pas encore
- **State** : `useState<string | null>(null)` (null = aucune palette sélectionnée, images originales)

### Étapes

- [ ] 1. Modifier `components/sections/Gallery.tsx` :
  - Passer en `"use client"`
  - Ajouter `useState<string>("default")` pour la palette sélectionnée
  - Ajouter `useState<Set<string>>` pour les variantes manquantes (fallback)
  - Définir `PALETTES` array avec key, label, color
  - Créer `getImageUrl(view, palette)` avec logique de fallback
  - Ajouter le bloc UI des swatches au-dessus du `.gallery` grid
  - Passer `key={palette}` sur chaque `<Image>` pour forcer le rechargement
  - Ajouter `onError` handler sur chaque `<Image>`

- [ ] 2. Ajouter dans `app/globals.css` :
  - `.palette-picker` — flex row, gap 10px, margin-bottom 32px
  - `.palette-swatch` — cercle 28px, cursor pointer, transition scale/ring
  - `.palette-swatch.active` — ring 2px solid accent, scale(1.15)

### ✓ Vérification Phase A
Action manuelle : section Gallery → cliquer "Rose" → les 4 images changent d'URL (ou restent identiques sans erreur si variantes non uploadées)

---

## Phase B — Store et API Chatbot

### Étapes

- [ ] 1. Créer `store/chat.ts` (Zustand) :
  ```ts
  interface Message { role: "user" | "assistant"; content: string }
  interface ChatStore {
    isOpen: boolean
    messages: Message[]
    isLoading: boolean
    open: () => void
    close: () => void
    addMessage: (msg: Message) => void
    setLoading: (v: boolean) => void
    clearMessages: () => void
  }
  ```

- [ ] 2. Créer `app/api/chat/route.ts` :
  - POST `{ messages: Message[] }`
  - Injecter system prompt Coco Bonbons (prix, specs, FAQ, guidage SAV vers `#contact`)
  - Appel `fetch` natif vers `https://api.mistral.ai/v1/chat/completions`
  - Model : `open-mistral-nemo`
  - Retourne `{ message: string }` (réponse complète, pas streaming)
  - Valider `MISTRAL_API_KEY` présent, sinon 500

### System prompt Mistral (contenu)
```
Tu es l'assistant de Coco Bonbons, le distributeur de bonbons MK1.
Projet ENSIM "Usine du futur", fait en France par des étudiants.
Prix : 149€ TTC. Paiement simulé (pas de vrai achat).
Matériaux : aluminium brossé, dôme verre borosilicate, socle impression 3D.
Capacité : 300g. Bonbons compatibles : petits ronds (M&Ms, Skittles, Maltesers).
Couleurs disponibles : Rose, Menthe, Violet, Orange (rendus à venir).
Pour toute demande SAV ou réclamation, redirige vers le formulaire section #contact.
Réponds en français, de façon concise et sympathique.
```

### ✓ Vérification Phase B
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"Quel est le prix ?"}]}' \
  | grep -i "149"
```

---

## Phase C — ChatDrawer (composant)

### Étapes

- [ ] 1. Créer `components/chat/ChatDrawer.tsx` :
  - `"use client"`
  - Bouton flottant : `position: fixed; bottom: 24px; right: 24px; z-index: 200`
    - Rond 52px, fond `--ink`, icône bulle de chat (SVG inline)
    - Pas de conflit avec CartDrawer (CartDrawer est `right: 0`, panel 440px)
  - Drawer panel : même pattern que CartDrawer
    - Scrim backdrop
    - Panel 440px depuis la droite, slide-in
    - Head : "Assistant Coco Bonbons" + bouton fermer
    - Body scrollable : liste des bulles messages
    - Foot : input texte + bouton envoi
  - Bulles : `user` (droite, bg accent, text paper) / `assistant` (gauche, bg glass)
  - Indicateur de chargement : 3 points animés dans une bulle assistant
  - Logique : `handleSend()` → `addMessage(user)` → `setLoading(true)` → `POST /api/chat` → `addMessage(assistant)` → `setLoading(false)`

- [ ] 2. Ajouter dans `app/globals.css` :
  - `.chat-btn` — bouton flottant
  - `.chat-panel` / `.chat-head` / `.chat-body` / `.chat-foot` — structure drawer
  - `.chat-msg` / `.chat-msg-user` / `.chat-msg-bot` — bulles
  - `.chat-typing` — animation 3 points (keyframe dots)

- [ ] 3. Modifier `app/page.tsx` : importer et ajouter `<ChatDrawer />` en bas (à côté de `<CartDrawer />`)

### ✓ Vérification Phase C
Action manuelle : clic bouton flottant → drawer s'ouvre → poser une question → réponse Mistral arrive → drawer se ferme avec ×

---

## Phase D — Section SAV + API Contact

### Étapes

- [ ] 1. Créer `emails/ContactEmail.tsx` :
  - Template React Email similaire à `OrderEmail.tsx`
  - Affiche : type de demande, nom, email, message
  - Sujet : `[{TYPE}] Nouvelle demande — {nom}`

- [ ] 2. Créer `app/api/contact/route.ts` :
  - POST `{ type: "info" | "sav", name: string, email: string, message: string }`
  - Valider les 4 champs
  - Resend vers `process.env.SAV_EMAIL`
  - From : `"Coco Bonbons <noreply@resend.dev>"` (ou domaine vérifié)
  - Retourne `{ success: true }` ou `{ error: string }`

- [ ] 3. Créer `components/sections/Sav.tsx` :
  - `"use client"`
  - Divider "08 Contact & SAV"
  - Section head : titre + description
  - Layout 2 colonnes (comme About.tsx) :
    - **Gauche** : glass card avec le formulaire
      - Type : 2 boutons radio stylisés ("Information générale" / "Service après-vente")
      - Nom, Email (inputs)
      - Message (textarea, 5 lignes)
      - Bouton "Envoyer"
      - Note mono : "Une réponse par email sous 48h"
      - État succès : remplace le formulaire (message de confirmation + icône ✓)
      - État erreur : banner rouge inline
    - **Droite** : glass card info process
      - Titre "Comment ça marche ?"
      - 3 étapes numérotées (01 · Soumission → 02 · Confirmation email → 03 · Réponse 48h)
      - Note : "Pour une réponse immédiate, utilisez le chatbot ↘"

- [ ] 4. Modifier `app/page.tsx` : ajouter `<Sav />` avant `<Footer />`

- [ ] 5. Modifier `components/Navbar.tsx` : ajouter `<a href="#contact">Contact</a>` dans les liens

- [ ] 6. Ajouter dans `app/globals.css` :
  - Styles section SAV si nécessaire (radio boutons stylisés, etc.)

- [ ] 7. Mettre à jour `env.example` : ajouter `MISTRAL_API_KEY` et `SAV_EMAIL`

### ✓ Vérification Phase D
1. Remplir formulaire type "SAV" → cliquer Envoyer → message de confirmation affiché
2. Email reçu à `SAV_EMAIL` (si clé Resend configurée)
3. Navbar : clic "Contact" → scroll vers section SAV

---

## Checklist finale

- [ ] Palette Gallery : swatches visibles, clic change les images (ou fallback sans erreur)
- [ ] Chatbot : bouton flottant visible sur tout le site, drawer glassmorphique, réponses Mistral
- [ ] SAV : section visible, formulaire fonctionnel, confirmation après envoi
- [ ] Navbar : lien "Contact" scroll vers #contact
- [ ] Build sans erreur TypeScript : `npm run build`
