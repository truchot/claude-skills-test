---
name: ux-ui-design
description: >-
  Expert UX/UI Design pour recherche utilisateur, wireframes, prototypes et branding. TRIGGER when: design/, maquettes, Figma detected in project.
---

## Domaines d'expertise

- **Wireframing & Architecture** : wireframes low/mid/hi-fi, zoning, sitemap, arborescence (voir [wireframing.md](./wireframing.md))
- **Accessibilite (a11y)** : WCAG 2.1/2.2, ARIA, navigation clavier, contraste, lecteurs d'ecran (voir [accessibility.md](./accessibility.md))
- **UX Research** : personas, interviews utilisateurs, journey mapping, analyse concurrentielle
- **Visual Design** : maquettes UI, style guides, design tokens, export d'assets
- **Prototyping** : prototypes interactifs, animations, micro-interactions, motion design
- **Testing** : tests A/B, tests d'utilisabilite, heatmaps, analyse de feedback
- **Branding** : direction artistique, identite visuelle, moodboards, charte graphique

## Patterns essentiels

### Workflow UX/UI
```
Research -> Wireframe -> Visual -> Prototype -> Testing
    ^                                              |
    +------------- Iteration ---------------------+
```

### UX Research
- 5 personas minimum par projet (demographie, objectifs, frustrations, comportements)
- Journey map pour chaque persona principal
- Interviews semi-structurees (15-20 questions ouvertes)
- Benchmark concurrentiel (3-5 concurrents directs)
- Empathy maps pour valider les insights

### Wireframing
- Low-fi pour l'exploration rapide (papier ou outil simple)
- Mid-fi pour validation structure avec le client
- Hi-fi pour le handoff developpeur (composants detailles)
- Toujours inclure : etats vides, erreurs, chargement, responsive
- Annoter chaque wireframe avec le comportement interactif

### Visual Design
- Design System : tokens (couleurs, typo, spacing) avant les ecrans
- Mobile-first : concevoir mobile puis adapter desktop
- Grille de 8px pour l'espacement (4px pour les details fins)
- Hierarchie visuelle : taille > couleur > position > forme
- Coherence : meme composant = meme apparence partout

### Prototyping
- Prototype lo-fi pour valider les flux (cliquable simple)
- Prototype hi-fi pour tester les micro-interactions
- Animations : easing naturel, duree 200-500ms, purpose-driven
- Tester avec 5 utilisateurs pour decouvrir 85% des problemes

### Branding
- Moodboard avant toute creation visuelle
- Direction artistique : 2-3 pistes, presentation argumentee
- Charte graphique : logo, couleurs, typographies, do/don't
- Assets : formats vectoriels (SVG), grille de construction logo
- Motion identity : animations de marque coherentes

## Anti-patterns critiques

- **Ne jamais** commencer les maquettes sans recherche utilisateur
- **Ne jamais** designer uniquement pour desktop (mobile-first obligatoire)
- **Ne jamais** ignorer l'accessibilite (WCAG AA minimum)
- **Ne jamais** creer de composants visuels sans les documenter
- **Ne jamais** valider un design sans test utilisateur (meme informel)
- **Ne jamais** utiliser plus de 2-3 familles de polices
- **Ne jamais** ignorer les etats d'erreur, vides et de chargement dans les maquettes
- **Ne jamais** utiliser du texte Lorem Ipsum pour les contenus principaux

## Escalation

- **Design System code** : deleguer a `frontend-developer` pour l'implementation des composants
- **SEO** : deleguer a `seo-expert` pour les contraintes de contenu et de structure
- **Faisabilite technique** : escalader vers la direction technique pour valider les animations complexes
- **Validation client** : escalader vers le project manager pour les presentations et validations
- **WordPress integration** : deleguer a `wordpress-expert` pour la conversion maquettes Figma vers themes
- **Performance** : deleguer a `devops` pour l'optimisation des assets (images, fonts)
