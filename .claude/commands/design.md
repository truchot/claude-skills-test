# /design - Commande Design

## Rôle

Point d'entrée pour toutes les tâches design : UX, UI, design system, accessibilité, prototypage.

## Architecture v2

```
/design [demande]
     │
     ▼
┌─────────────────────────────────────────┐
│           ORCHESTRATOR                   │
│  .web-agency/ORCHESTRATOR.md            │
└─────────────────────────────────────────┘
     │
     ▼
┌─────────────────────────────────────────┐
│           AGENTS DESIGN                  │
│                                          │
│  • UX Research                           │
│  • Wireframes                            │
│  • UI Design                             │
│  • Design System                         │
│  • Accessibilité                         │
└─────────────────────────────────────────┘
```

## Comportement

1. **Analyse ta demande** design
2. **Identifie le scope** : composant, page, système complet
3. **Charge le contexte** frontend si implémentation
4. **Produit des livrables** concrets

## Types de demandes

| Tu demandes... | Ce qui se passe |
|----------------|-----------------|
| Créer un design system | Structure tokens + composants |
| Spécifier un composant | Props, variantes, états, a11y |
| Auditer l'UX | Analyse + recommandations |
| Améliorer l'accessibilité | Audit WCAG + corrections |
| Wireframe d'une page | Structure + hiérarchie |

## Livrables types

### Spécification de composant

```yaml
Composant: Button
Variantes: primary, secondary, ghost, danger
Tailles: sm (h-8), md (h-10), lg (h-12)
États: default, hover, focus, disabled, loading
Accessibilité: aria-disabled, aria-busy, focus ring
```

### Structure Design System

```
tokens/
├── colors.css      # Palette
├── typography.css  # Échelle typo
├── spacing.css     # 4px base
└── shadows.css     # Élévations

components/
├── Button/
├── Input/
├── Card/
└── ...
```

### Audit UX

```markdown
## Points positifs
- ...

## Problèmes identifiés
| Problème | Sévérité | Recommandation |
|----------|----------|----------------|

## Quick wins
1. ...
```

## Utilisation

```
/design [description de ta demande]
```

## Exemples

```
/design Créer un design system pour l'app
→ Structure tokens + composants de base

/design Spécifier le composant Modal
→ Props, variantes, animations, a11y

/design Auditer l'accessibilité de la page checkout
→ Rapport WCAG AA + corrections

/design Améliorer le formulaire d'inscription
→ Analyse UX + recommandations
```

## Principes appliqués

- **Hiérarchie visuelle** : Une action principale par écran
- **Accessibilité** : WCAG 2.1 AA minimum
- **Responsive** : Mobile first, breakpoints standards
- **Cohérence** : Design tokens partout
