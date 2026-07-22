# Feuille de route

Évolution progressive, de l'atelier vers une plateforme et un réseau. Chaque version
s'appuie sur l'architecture déjà en place (modèle de données typé, discours de marque
tourné vers le réseau, composants modulaires) sans jamais prétendre qu'une étape
ultérieure existe déjà.

---

## V1 — Réparation et formation ✅ (version actuelle)

Le socle : présenter l'activité, convertir, installer la marque et la méthode.

- Page d'accueil complète (14 sections), pages Méthode, Réparer, Se former,
  Réalisations, À propos, Professionnels, FAQ, Contact.
- **La Méthode Juste** formalisée (6 étapes, engagements, pratiques refusées).
- Formulaires opérationnels : diagnostic (multi-étapes + photos), formation,
  liste d'attente professionnelle, contact.
- SEO local + données structurées, accessibilité WCAG 2.2 AA, performance mobile-first.
- Design system premium, contenu centralisé et facilement administrable.
- Liste d'attente professionnelle active (préparation du réseau).

## V2 — Contenus, formations et communauté

Approfondir l'expertise éditoriale et détailler l'offre de formation.

- Blog / ressources (`Article`, `BlogPosting`) : guides de diagnostic, comparatifs,
  actualités — renforce le SEO et le GEO (citations par les IA).
- Pages de formation dédiées `/formations/[slug]` (le type `TrainingProgram` est prêt) :
  objectifs, modules, prérequis, sessions, inscription.
- Pages de service `/services/[slug]` pour un ciblage SEO fin par prestation.
- Newsletter, premiers témoignages **réels** vérifiés, calendrier de sessions.
- Espace de contenus pédagogiques (extraits de méthode).

## V3 — Réseau de professionnels

Transformer la liste d'attente en réseau structuré autour d'un standard commun.

- **Charte / standard de qualité** publié (`/charte-qualite`).
- **Espace professionnel** `/espace-professionnel` : onboarding, ressources, méthode
  partagée, suivi de formation.
- Annuaire des réparateurs partenaires `/reparateurs/[slug]` (profils vérifiés).
- Processus d'adhésion, d'évaluation et de contrôle qualité.
- Authentification et rôles (particulier, réparateur, formateur, admin).

## V4 — Mise en relation et marketplace

Ouvrir la mise en relation clients ↔ réparateurs et la vérification de la qualité.

- `/trouver-un-reparateur` : recherche géolocalisée, filtres, prise de contact.
- Demandes de diagnostic routées vers les partenaires du réseau.
- Système d'avis et de vérification de la qualité des prestations.
- Tableau de bord partenaire (demandes, réputation, conformité à la charte).
- Éventuelle brique transactionnelle (devis, paiement, garantie réseau).

---

### Fondations déjà posées pour la suite

- Modèle de données typé et extensible (`src/types`, `src/content`).
- Configuration de marque centralisée (`src/config/site.ts`).
- Couches `email` / `storage` pluggables, prêtes à accueillir une base de données.
- Composants modulaires et routes futures déjà identifiées.
- Événements analytics prévus (sans données personnelles) pour piloter la conversion.
