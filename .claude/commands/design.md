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

## Logique de Routage

```
SI demande concerne branding/identité/vision créative
  → direction-artistique (Niveau 2)

SI demande concerne stratégie UX/guidelines
  → direction-artistique (Niveau 2)

SI demande concerne wireframes/maquettes/prototypes
  → ux-ui-design (Niveau 3)

SI demande concerne parcours utilisateur/tests UX
  → ux-ui-design (Niveau 3)

SI demande concerne composants/design system
  → design-system-foundations (Niveau 4)

SI demande concerne les deux (stratégie + exécution)
  → Commencer par direction-artistique pour cadrer
  → Puis déléguer pour exécuter
```

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
