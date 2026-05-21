# Plan : Section Équipe / Portfolios

## Contexte

Chaque membre du groupe peut exposer son portfolio personnel via le site, sans gestion de comptes. Les fichiers HTML sont committés dans `Portfolios/` à la racine du monorepo. Le site lit ces fichiers dynamiquement depuis GitHub à chaque visite.

---

## Architecture

| Décision | Choix |
|---|---|
| URLs | `/equipe` (liste) · `/equipe/[slug]` (portfolio) |
| Stockage | `Portfolios/prenom-nom.html` dans le repo (racine monorepo) |
| Rendu | `<iframe srcdoc>` — fetch server-side depuis GitHub Raw |
| Découverte membres | GitHub API `/contents/Portfolios` |
| Stratégie Next.js | SSR dynamique avec `revalidate` |
| Style index | Cards glassmorphiques (design system existant) |
| Navigation | Bandeau overlay "← Revenir au site" sur la page portfolio |

---

## Fichiers à créer

### `app/equipe/page.tsx` — Page index
Server Component.
1. Fetch `https://api.github.com/repos/ArthurBr02/bonbons-ensim-usine-du-futur/contents/Portfolios` avec `next: { revalidate: 60 }`
2. Filtrer les `.html`, dériver nom d'affichage (`arthur-berger.html` → `Arthur Berger`)
3. Grille de cards glassmorphiques (`--glass-bg`, `--accent`) → lien vers `/equipe/[slug]`
4. Gestion d'erreur si le fetch GitHub échoue

### `app/equipe/[slug]/page.tsx` — Page portfolio
Server Component.
1. Fetch `https://raw.githubusercontent.com/ArthurBr02/bonbons-ensim-usine-du-futur/main/Portfolios/[slug].html` avec `next: { revalidate: 300 }`
2. Si 404 → `notFound()`
3. Layout :
   - Bandeau fixe en haut : logo + lien `← Revenir au site` vers `/`
   - `<iframe srcdoc={htmlContent} style="width:100%;height:calc(100dvh - hauteur-bandeau);border:none" />`

### `app/equipe/[slug]/layout.tsx` — Layout sans Navbar
Layout dédié qui omet la Navbar du site principal.

---

## Fichiers à modifier

### `components/Navbar.tsx`
Ajouter un lien `Équipe` pointant vers `/equipe`.

---

## Variable d'environnement (optionnel)

```
GITHUB_TOKEN="ghp_..."   # augmente la limite API de 60 → 5 000 req/h
```
Dans les fetch, injecter `Authorization: Bearer ${process.env.GITHUB_TOKEN}` si défini.

---

## Convention pour les membres du groupe

Chaque membre commit `Portfolios/prenom-nom.html` à la racine du repo (kebab-case, sans accents, minuscule). Le portfolio apparaît automatiquement sur `/equipe/prenom-nom` sans modification du site.

---

## Vérification

1. Ajouter `Portfolios/test-user.html` dans le repo
2. `npm run dev` → `http://localhost:3000/equipe` → card "Test User" visible
3. Clic → rendu iframe + bandeau retour correct
4. `/equipe/slug-inexistant` → 404
5. Navbar du site absente sur `/equipe/[slug]`
