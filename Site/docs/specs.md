# Spécifications du Projet - Site Vitrine Distributeur de Bonbons

## Contexte
Nom du projet: Coco Bonbons :)
Projet dans le cadre du cours "Usine du futur". Création d'un site web pour la commercialisation d'un produit modélisé en 3D (un distributeur de bonbons). Les modèles sources sont sur Solidworks (à exporter au format `.GLB` ou `.GLTF` pour l'intégration web).

## Objectifs Visuels et Expérience Utilisateur (UX/UI)
- **Format** : Site "One-Page" immersif.
- **Design** : Moderne, très épuré, "Light Mode". Esthétique "Usine du futur" avec des matériaux propres (verre dépoli / glassmorphism, aluminium brossé).
- **Animations** : Smooth scroll (ex: Lenis) pour une navigation fluide.
- **Intégration 3D** : Affichage interactif du modèle 3D du distributeur. Le modèle tourne et se déplace sur l'écran en fonction du défilement de la page (effet de parallaxe/scroll-jacking élégant).

## E-commerce & Panier
- **Catalogue** : Produit unique. Pas de variantes, une seule référence d'article.
- **Panier** : UI en "Side Drawer" (tiroir latéral) semi-transparent, permettant de toujours garder le modèle 3D et le site visibles en arrière-plan.
- **Checkout (Paiement simulé)** : Le processus de commande s'arrête à la simulation de paiement (projet d'exemple). Un clic sur "Payer" bypass la transaction et affiche le message de succès : *"Commande bien reçue, vous recevrez une confirmation par mail"*.

## Fonctionnalités Backend & Emails
- **Base de données** : Sauvegarde locale/légère des commandes générées pour avoir un vrai workflow backend.
- **Emails de confirmation** : Envoi d'un email automatique au client après la commande comprenant un design HTML propre, le récapitulatif de l'article, et un numéro de commande unique généré.

## Stack Technique Validée
- **Framework Core** : Next.js (Fullstack / React).
- **Base de données** : SQLite (couplé à un ORM comme Prisma ou Drizzle pour la simplicité).
- **3D & Animations** : Three.js (via React Three Fiber) et GSAP (avec ScrollTrigger) pour lier la 3D à la barre de scroll.
- **Gestion d'état** : Zustand (idéal pour gérer l'ouverture du panier et la scène 3D).
- **Mailing** : Envoi de mails via les Server Actions / API Routes de Next.js (avec Resend ou Nodemailer).

