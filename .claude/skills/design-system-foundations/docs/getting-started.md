# Getting Started with Design System Foundations

Ce guide explique comment utiliser le skill Design System Foundations pour créer ou auditer un design system industriel.

## Prérequis

- Compréhension de base des design systems
- Accès à une maquette (Figma, Sketch, Adobe XD)
- Projet frontend initialisé (React, Vue, Angular, ou vanilla)

## Workflow Recommandé

### 1. Extraction des Foundations

Commencer par les primitives du design system :

```
1. Colors    → Extraire la palette depuis la maquette
2. Typography → Définir les familles et l'échelle
3. Spacing   → Établir le système 8pt
4. Shadows   → Créer les niveaux d'élévation
```

**Questions à poser au skill :**
- "Comment extraire les couleurs de ma maquette Figma ?"
- "Quelle échelle typographique utiliser ?"
- "Comment créer un système d'espacement 8pt ?"

### 2. Création des Atoms

Les éléments de base indivisibles :

```
1. Buttons   → Définir variants (primary, secondary, ghost)
2. Inputs    → Créer les champs de formulaire
3. Labels    → Tags, chips, badges
4. Icons     → Système d'icônes avec tailles
5. Badges    → Indicateurs de statut
```

**Questions à poser au skill :**
- "Quels variants de bouton créer ?"
- "Comment structurer mes inputs pour l'accessibilité ?"

### 3. Assemblage des Molecules

Combiner les atomes en composants fonctionnels :

```
1. Forms     → Groupes de champs avec validation
2. Cards     → Conteneurs structurés
3. Navigation → Navbar, sidebar, tabs
4. Modals    → Dialogs avec gestion du focus
5. Alerts    → Notifications et toasts
```

**Questions à poser au skill :**
- "Comment structurer un formulaire multi-step ?"
- "Comment gérer le focus dans une modal ?"

### 4. Construction des Templates

Assembler les molécules en structures de pages :

```
1. Hero Sections → Landing page blocks
2. Layouts      → Dashboard, auth, marketing
3. Pages        → Templates de pages types
```

**Questions à poser au skill :**
- "Comment créer un dashboard layout responsive ?"
- "Quel template pour une page de liste ?"

## Structure de Fichiers Recommandée

```
design-system/
├── tokens/
│   ├── colors.css
│   ├── typography.css
│   ├── spacing.css
│   └── shadows.css
├── components/
│   ├── atoms/
│   │   ├── Button/
│   │   ├── Input/
│   │   └── ...
│   ├── molecules/
│   │   ├── Card/
│   │   ├── Form/
│   │   └── ...
│   └── templates/
│       ├── DashboardLayout/
│       └── ...
└── docs/
    └── storybook/
```

## Tokens CSS Minimum

```css
:root {
  /* Colors */
  --color-primary: #2563eb;
  --color-secondary: #64748b;
  --color-success: #22c55e;
  --color-warning: #eab308;
  --color-error: #ef4444;

  /* Typography */
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-size-base: 1rem;

  /* Spacing */
  --space-unit: 0.25rem;
  --space-4: 1rem;

  /* Shadows */
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);

  /* Radius */
  --radius-md: 0.5rem;
}
```

## Prochaines Étapes

1. Configurer Storybook pour la documentation
2. Mettre en place les tests d'accessibilité
3. Créer un changelog par composant
4. Définir le versioning sémantique
