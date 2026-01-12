# /design - Commande Design

## Rôle
Point d'entrée pour toutes les demandes liées au design, UX/UI et direction artistique.

## Comportement
1. **Analyse la demande** design
2. **Route vers le niveau** approprié (stratégie vs exécution)
3. **Coordonne** entre direction artistique et implémentation si nécessaire

## Hiérarchie Design

### Niveau 2 - Direction Artistique (POURQUOI)
Référence: `.web-agency/skills/direction-artistique/`
- Identité visuelle et branding
- Stratégie UX globale
- Guidelines et standards design
- Vision créative

### Niveau 3 - UX/UI Design (QUOI)
Référence: `.web-agency/skills/ux-ui-design/`
- Wireframes et prototypes
- Design d'interfaces
- Tests utilisateurs
- Parcours utilisateur

### Niveau 4 - Design System (COMMENT)
Référence: `.web-agency/skills/design-system-foundations/`
- Composants UI
- Tokens et variables
- Documentation design
- Implémentation patterns

## Algorithme de Routage

### 1. Analyse des mots-clés

| Mots-clés | Destination |
|-----------|-------------|
| branding, identité, logo, charte, vision créative | direction-artistique |
| guidelines, standards, principes design | direction-artistique |
| wireframe, maquette, prototype, Figma | ux-ui-design |
| parcours, user flow, test utilisateur, UX research | ux-ui-design |
| accessibilité, WCAG, a11y | ux-ui-design |
| composant, token, design system, Storybook | design-system-foundations |
| spacing, typography, color palette | design-system-foundations |

### 2. Analyse du contexte

- **Type de livrable**: Stratégique (guidelines) vs Tactique (maquettes) vs Technique (composants)
- **Phase projet**: Discovery → direction-artistique, Build → ux-ui-design/design-system
- **Fichiers mentionnés**: `.fig` → Figma/UX, `tokens.json` → Design System

### 3. Résolution d'ambiguïté

```
SI plusieurs skills possibles:
  → Privilégier direction-artistique (cadrage avant exécution)

SI demande transverse (ex: "refonte complète"):
  → Séquencer: DA → UX/UI → Design System
  → Proposer un plan d'action

SI demande floue:
  → Demander le livrable attendu (guidelines? maquettes? composants?)
```

### 4. Fallback

Si indétermination après analyse:
1. Demander le type de livrable souhaité
2. Identifier la phase projet actuelle
3. Router vers ux-ui-design par défaut (le plus polyvalent)

## Utilisation

```
/design [description de la demande]
```

## Exemples

- `/design refonte identité visuelle` → direction-artistique
- `/design wireframe page checkout` → ux-ui-design
- `/design créer composant Card` → design-system-foundations
- `/design améliorer UX onboarding` → ux-ui-design
- `/design guidelines couleurs` → direction-artistique
- `/design audit accessibilité` → ux-ui-design
