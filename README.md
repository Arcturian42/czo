# [NOM DE MARQUE] — Réparation & formation en électronique

Site vitrine moderne, orienté conversion, pour un atelier de **réparation** et de
**formation** en électronique. Il présente trois piliers — **Réparer · Transmettre ·
Élever les standards** — et prépare l'évolution vers un futur réseau de réparateurs
partenaires (sans jamais prétendre qu'il existe déjà).

> Promesse : **Le bon diagnostic. La bonne pièce. La bonne décision.**

---

## Sommaire

- [Stack technique](#stack-technique)
- [Démarrage rapide](#démarrage-rapide)
- [Variables d'environnement](#variables-denvironnement)
- [Valeurs à remplacer (placeholders)](#valeurs-à-remplacer-placeholders)
- [Routes](#routes)
- [Architecture du code](#architecture-du-code)
- [Formulaires & intégrations](#formulaires--intégrations)
- [SEO, GEO & données structurées](#seo-geo--données-structurées)
- [Accessibilité](#accessibilité)
- [Performance](#performance)
- [Tests & QA](#tests--qa)
- [Déploiement](#déploiement)
- [Éléments encore manquants](#éléments-encore-manquants)
- [Vers la future marketplace](#vers-la-future-marketplace)

---

## Stack technique

| Domaine | Choix |
| --- | --- |
| Framework | **Next.js 16** (App Router, React Server Components par défaut) |
| Langage | **TypeScript strict** |
| Styles | **Tailwind CSS v4** (design system par variables `@theme`) |
| Polices | **Geist** (auto-hébergée, aucune dépendance réseau au build) |
| Icônes | **lucide-react** |
| Formulaires | **React Hook Form** + **Zod** (validation client **et** serveur) |
| Actions | **Server Actions** (Next.js) |
| Emails | **Resend** (activable, sinon fallback console) |
| Stockage | **Supabase Storage** (activable, sinon ignoré proprement) |
| Tests E2E | **Playwright** |

Choix guidés par la robustesse et l'absence de dépendances superflues. Les intégrations
externes (Resend, Supabase) sont **pluggables et activées par variables
d'environnement** : le site fonctionne et se build sans aucune configuration.

## Démarrage rapide

```bash
pnpm install
cp .env.example .env.local   # facultatif : à remplir pour activer emails/uploads
pnpm dev                     # http://localhost:3000
```

Scripts disponibles :

```bash
pnpm dev         # serveur de développement
pnpm build       # build de production
pnpm start       # sert le build de production
pnpm lint        # ESLint
pnpm typecheck   # TypeScript (tsc --noEmit)
pnpm test:e2e    # tests Playwright (build + start automatiques)
```

## Variables d'environnement

Voir [`.env.example`](./.env.example). **Toutes optionnelles en développement.**

| Variable | Rôle |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | URL canonique (métadonnées, sitemap, JSON-LD) |
| `RESEND_API_KEY` | Active l'envoi d'emails (sinon journalisé) |
| `EMAIL_FROM` | Expéditeur vérifié Resend |
| `EMAIL_ADMIN` | Destinataire des notifications internes |
| `SUPABASE_URL` | Active le stockage des photos de diagnostic |
| `SUPABASE_SERVICE_ROLE_KEY` | Clé serveur secrète Supabase |
| `SUPABASE_UPLOAD_BUCKET` | Bucket de stockage (déf. `diagnostic-uploads`) |

## Valeurs à remplacer (placeholders)

Toutes les données de marque sont **centralisées** dans
[`src/config/site.ts`](./src/config/site.ts). Remplacez les valeurs entre crochets :
elles se propagent partout (en-tête, pied de page, SEO, JSON-LD, formulaires, mentions).

`[NOM DE MARQUE]` · `[RAISON SOCIALE]` · `[VILLE]` · `[TÉLÉPHONE]` · `[EMAIL]` ·
`[ADRESSE]` · `[CODE POSTAL]` · `[DÉLAI DE RÉPONSE]` · `[DURÉE DE GARANTIE]` ·
`[HORAIRES]`

Les chiffres de réassurance (`repairsCount`, `googleRating`, …) valent `null` par
défaut et **restent masqués** tant qu'aucune donnée réelle n'est fournie —
conformément à la règle « ne jamais inventer de chiffres, d'avis ou de certifications ».

Un composant [`PendingNote`](./src/components/ui/pending-note.tsx) signale visiblement,
dans les pages, les contenus qui dépendent du document source (études de cas, bio du
fondateur, mentions légales).

## Routes

| Route | Type | Contenu |
| --- | --- | --- |
| `/` | statique | Page d'accueil (14 sections) |
| `/methode` | statique | La Méthode Juste (6 étapes, engagements) |
| `/reparer` | statique | Services, délais, pièces, processus, formulaire |
| `/se-former` | statique | Formations (4 profils), compétences, demande |
| `/realisations` | statique | Études de cas détaillées |
| `/a-propos` | statique | Fondateur, valeurs |
| `/professionnels` | statique | Futur réseau + liste d'attente pro |
| `/diagnostic` | dynamique | Formulaire de diagnostic multi-étapes |
| `/demande-formation` | dynamique | Formulaire de demande de formation |
| `/faq` | statique | Foire aux questions (FAQPage) |
| `/contact` | statique | Coordonnées + formulaire de contact |
| `/mentions-legales` | statique (noindex) | Mentions légales |
| `/politique-confidentialite` | statique (noindex) | Confidentialité |
| `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest`, `/opengraph-image` | générés | SEO |

> Les pages `diagnostic` et `demande-formation` sont dynamiques car elles lisent des
> paramètres d'URL (`?appareil=`, `?profil=`) pour préremplir le formulaire.

### Prévu pour l'avenir (architecture prête)

`/trouver-un-reparateur` · `/reparateurs/[slug]` · `/espace-professionnel` ·
`/charte-qualite` · `/formations/[slug]` · `/services/[slug]`

Le type [`TrainingProgram`](./src/types/index.ts) et le contenu de
[`src/content/trainings.ts`](./src/content/trainings.ts) sont déjà modélisés pour des
routes `/formations/[slug]`.

## Architecture du code

```txt
src/
├── app/                    # App Router (pages, actions, SEO)
│   ├── actions/            # Server Actions (diagnostic, formation, pro, contact)
│   ├── <route>/page.tsx    # Pages
│   ├── layout.tsx          # Shell (Header, Footer, StickyMobileActions)
│   ├── sitemap.ts · robots.ts · manifest.ts · opengraph-image.tsx
│   ├── icon.svg · not-found.tsx · error.tsx · loading.tsx
├── components/
│   ├── layout/             # Header, MobileNavigation, Footer, PageHeader, Logo…
│   ├── marketing/          # Hero, TrustBar, MethodSteps, ProcessTimeline…
│   ├── services/           # ServiceExplorer, RepairCategoryCard
│   ├── training/           # TrainingAudienceCard
│   ├── case-studies/       # CaseStudyCard, CaseStudyGallery
│   ├── forms/              # DiagnosticForm, FileUploader, champs, form-ui…
│   ├── seo/                # JsonLd (LocalBusiness, Service, Course, WebSite)
│   └── ui/                 # Button, Card, Badge, Accordion, Reveal, Section…
├── config/                 # site.ts (marque + placeholders), nav.ts
├── content/                # method, services, parts, cases, trainings, faq, process
├── lib/                    # seo, email, storage, rate-limit, analytics, form, utils
├── schemas/                # forms.ts (Zod, partagé client/serveur)
├── types/                  # types de contenu (dont TrainingProgram)
└── app/globals.css         # design system (tokens @theme, base, primitives)
```

## Formulaires & intégrations

Quatre formulaires, chacun avec **validation Zod côté client (React Hook Form) et côté
serveur (Server Action)** :

- **Diagnostic** — multi-étapes (7 écrans), upload de photos, préremplissage par appareil.
- **Demande de formation** — profil, niveau, objectifs, préremplissage par profil.
- **Liste d'attente professionnelle** — futur réseau.
- **Contact** — message général.

Sécurité intégrée : **honeypot**, **limitation de débit** (en mémoire, best-effort),
**validation serveur des uploads** (type JPEG/PNG/WebP, taille, nombre), messages
d'erreur non techniques, consentement explicite. Les emails (admin + client) partent via
Resend si configuré, sinon sont journalisés. Les photos sont stockées via Supabase si
configuré, sinon leurs métadonnées sont transmises dans la notification.

> ⚠️ La limitation de débit est en mémoire : en environnement serverless multi-instances,
> complétez-la par une solution distribuée (Upstash Redis, etc.) pour un trafic élevé.

## SEO, GEO & données structurées

- `title` unique + `meta description` + **canonical** par page ; Open Graph & Twitter Card.
- Image Open Graph générée dynamiquement (`app/opengraph-image.tsx`).
- **JSON-LD** : `LocalBusiness`/`ProfessionalService`, `WebSite`, `Service`, `Course`,
  `FAQPage`, `BreadcrumbList`, `ItemList`. Les champs placeholders sont **omis** (jamais
  de fausses coordonnées, notes ou certifications).
- `sitemap.xml`, `robots.txt`, `manifest`.
- **GEO / recherche par IA** : réponses directes (FAQ), définitions claires, tableau
  comparatif des pièces, études de cas structurées, limites documentées.
- Ciblage local : mots-clés `réparation … à [VILLE]`, `microsoudure [VILLE]`,
  `formation réparation smartphone`, etc.

## Accessibilité

Cible **WCAG 2.2 AA** :

- HTML sémantique, **un seul `H1`** par page, hiérarchie `H2`/`H3` cohérente.
- Lien d'évitement, focus visible systématique, navigation clavier complète.
- Formulaires : labels liés, erreurs `role="alert"` + `aria-describedby`, consentement.
- Accordéons natifs (`<details>`), menu mobile en `role="dialog"` + fermeture Échap.
- Zones tactiles ≥ 44×44 px, contrastes soignés, jamais d'information par la seule couleur.
- Respect de `prefers-reduced-motion` ; les animations sont une amélioration progressive
  (contenu entièrement lisible sans JavaScript).

## Performance

- Composants serveur par défaut, JavaScript client limité aux îlots interactifs.
- Police auto-hébergée (aucun fetch réseau), placeholders à ratio fixe (pas de CLS).
- Aucune vidéo auto, aucun carrousel automatique, aucune dépendance lourde inutile.
- Pour les vraies photos : utiliser `next/image` (WebP/AVIF, dimensions définies, lazy).

## Visuels & images

Le composant [`Figure`](./src/components/ui/figure.tsx) affiche une image via
`next/image` (optimisation AVIF/WebP), avec **repli automatique** vers un
placeholder élégant si la source est absente ou échoue au chargement — aucune
image cassée n'apparaît jamais.

Les visuels illustratifs sont centralisés dans `siteConfig.media`
(hero, atelier, formation). ⚠️ Ce sont des images **illustratives** (aucune
personne, aucune réparation réelle identifiable), hébergées temporairement sur
un CDN externe.

**Avant la mise en production :** remplacez-les par de vraies photographies de
l'atelier, de préférence **auto-hébergées** dans `public/images/` (mettez alors
à jour `siteConfig.media` avec les chemins locaux, ex. `/images/hero.webp`).
Les emplacements « fondateur » et « études de cas » restent volontairement des
placeholders : ne jamais y placer d'image générée présentée comme réelle.

## Tests & QA

```bash
pnpm lint        # 0 erreur
pnpm typecheck   # 0 erreur
pnpm build       # build de production
pnpm test:e2e    # 6 parcours Playwright
```

Parcours E2E couverts : soumission d'un diagnostic, demande de formation, inscription
professionnelle, navigation mobile, barre d'actions fixe, affichage d'une étude de cas.

## Déploiement

Optimisé pour **Vercel** :

1. Importez le dépôt sur Vercel.
2. Renseignez les variables d'environnement (voir ci-dessus). Au minimum
   `NEXT_PUBLIC_SITE_URL` ; ajoutez Resend/Supabase pour activer emails et uploads.
3. Build : `pnpm build` (détecté automatiquement). Déploiement à chaque push.

Compatible avec tout hébergeur supportant Next.js (Node 20+). Pensez à créer le bucket
Supabase (`diagnostic-uploads`) si vous activez le stockage.

## Éléments encore manquants

À fournir depuis le **document source** (non disponible au moment du build) :

- **Identité** : nom de marque, ville, coordonnées, horaires, garanties, délais.
- **Fondateur** : parcours détaillé, spécialités, années d'expérience vérifiées.
- **Études de cas** : détails techniques (composants, pièces, résultats) — cf. `PendingNote`.
- **Photographies** réelles (technicien, appareils, avant/pendant/après).
- **Mentions légales** : SIRET, TVA, hébergeur, directeur de publication.
- **Confidentialité** : durées de conservation, sous-traitants — à valider juridiquement.
- Éventuels avis / notes **réels** (jamais inventés).

## Vers la future marketplace

L'architecture prépare l'évolution sans rien promettre prématurément :

- **Modèle de données** typé (`TrainingProgram`, catégories, cas) prêt à s'étendre.
- **Discours de marque** déjà tourné vers « un réseau en préparation ».
- **Liste d'attente professionnelle** opérationnelle (collecte des futurs partenaires).
- Routes futures identifiées (`/trouver-un-reparateur`, `/reparateurs/[slug]`, etc.).

Voir [`ROADMAP.md`](./ROADMAP.md) pour les étapes V1 → V4.
