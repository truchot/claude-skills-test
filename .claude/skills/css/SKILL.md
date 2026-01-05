---
name: css
description: CSS moderne - Grid, Flexbox, variables, cascade
tags: [css, grid, flexbox, variables, layout, responsive]
sub-skills: [grid, flexbox, variables]
---

# CSS

## Quand Utiliser

- Créer des layouts (Grid, Flexbox)
- Définir un système de design tokens
- Gérer la cascade et spécificité
- Utiliser les fonctionnalités CSS modernes

## Principes Clés

- Mobile-first
- Variables CSS pour les tokens
- Grid pour layouts 2D, Flexbox pour 1D
- Éviter `!important`

## Grid vs Flexbox

| Flexbox | Grid |
|---------|------|
| 1 dimension | 2 dimensions |
| Contenu détermine la taille | Layout détermine la taille |
| Navigation, toolbars | Page layouts, galleries |

## Grid - Layouts

```css
/* Grid responsive auto-fit */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

/* Grid avec zones nommées */
.page {
  display: grid;
  grid-template-areas:
    "header header"
    "nav    main"
    "footer footer";
  grid-template-columns: 200px 1fr;
}

.header { grid-area: header; }
.nav    { grid-area: nav; }
.main   { grid-area: main; }
.footer { grid-area: footer; }
```

## Flexbox - Patterns

```css
/* Centrage */
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Navigation espacée */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

/* Sidebar + contenu */
.layout {
  display: flex;
  gap: 2rem;
}
.sidebar { flex: 0 0 250px; }
.content { flex: 1; min-width: 0; }
```

## Variables CSS

```css
:root {
  /* Couleurs */
  --color-primary: #3b82f6;
  --color-text: #1f2937;

  /* Espacements */
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 2rem;

  /* Bordures */
  --radius-md: 0.5rem;

  /* Transitions */
  --transition-fast: 150ms ease;
}

.button {
  background: var(--color-primary);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-md);
  transition: background var(--transition-fast);
}
```

## Fonctions Modernes

```css
/* clamp() - valeur responsive */
.title {
  font-size: clamp(1.5rem, 5vw, 3rem);
}

/* min() / max() */
.container {
  width: min(90%, 1200px);
}

/* Container queries */
.card-container {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card { display: flex; }
}

/* :has() selector */
.form-group:has(:invalid) {
  border-color: red;
}
```

## Spécificité (ordre croissant)

1. Type : `div` (0,0,1)
2. Classe : `.card` (0,1,0)
3. ID : `#main` (1,0,0)
4. Inline : `style=""` (1,0,0,0)
5. `!important` (à éviter)

## Anti-patterns

- ❌ `!important` partout
- ❌ Sélecteurs trop spécifiques
- ❌ Valeurs magiques (`margin: 17px`)
- ❌ Tout mettre dans un seul fichier

## Checklist

- [ ] Variables CSS pour les tokens
- [ ] Pas de `!important` (sauf utilities)
- [ ] Mobile-first
- [ ] Nommage cohérent (BEM, etc.)
