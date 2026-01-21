# /design - Commande Design

Tu es l'orchestrateur design de l'agence web. Cette commande gère UX, UI, design system et accessibilité.

## INSTRUCTIONS D'EXÉCUTION

Quand cette commande est invoquée avec `$ARGUMENTS`, tu DOIS suivre ces étapes :

### Étape 1 : Charger l'état

```
ACTION: Lire .web-agency/state/current.json
SI workflow en cours implique du design:
  → Reprendre le contexte
SINON:
  → Continuer avec l'analyse
```

### Étape 2 : Analyser la demande

Analyser `$ARGUMENTS` pour identifier :

```yaml
analyse:
  type: [design_system | component | ux_audit | a11y | wireframe | question]
  scope: [token | component | page | system]
  implementation: [spec_only | with_code]
```

**Critères de détection** :

| Mots-clés | Type |
|-----------|------|
| "design system", "tokens", "système design" | design_system |
| "composant", "button", "input", "modal" | component |
| "UX", "expérience", "améliorer", "audit UX" | ux_audit |
| "accessibilité", "a11y", "WCAG", "screen reader" | a11y |
| "wireframe", "maquette", "structure page" | wireframe |
| "comment", "pourquoi", "c'est quoi", "?" | question |

### Étape 3 : Charger le contexte

```
TOUJOURS charger :
→ .web-agency/contexts/frontend.md (pour cohérence tech)

SI design_system ou component :
→ Vérifier si design system existe déjà dans le projet
→ Respecter les tokens existants

SI a11y :
→ Référencer WCAG 2.1 AA comme standard minimum
```

### Étape 4 : Exécuter

#### Design System

```
1. Analyser les besoins
2. Proposer structure tokens :
   - Colors (semantic, not literal)
   - Typography (scale)
   - Spacing (4px base)
   - Shadows, borders, radii
3. Lister composants de base nécessaires
4. Produire la spec dans .project/04-specs/design/
```

#### Spécification Composant

```
1. Définir l'anatomie du composant
2. Lister :
   - Props (avec types)
   - Variantes
   - Tailles
   - États (default, hover, focus, disabled, loading)
   - Accessibilité (ARIA)
3. Fournir des exemples d'usage
4. Si with_code : générer le code
```

#### Audit UX

```
1. Analyser le parcours utilisateur
2. Identifier :
   - Points de friction
   - Problèmes de clarté
   - Opportunités d'amélioration
3. Prioriser par impact/effort
4. Produire rapport avec quick wins
```

#### Audit Accessibilité

```
1. Vérifier contre WCAG 2.1 AA :
   - Contraste couleurs
   - Navigation clavier
   - Structure sémantique
   - Labels et ARIA
   - Focus visible
2. Lister les violations
3. Proposer corrections avec code
```

### Étape 5 : Produire le livrable

Format selon le type :

#### Spec composant

```yaml
Composant: [Nom]

Anatomie:
  - root: Container principal
  - label: Texte du composant
  - icon: Icône optionnelle

Props:
  - variant: "primary" | "secondary" | "ghost" | "danger"
  - size: "sm" | "md" | "lg"
  - disabled: boolean
  - loading: boolean

Tokens utilisés:
  - background: var(--color-primary-500)
  - text: var(--color-white)
  - radius: var(--radius-md)

États:
  default: [description visuelle]
  hover: [description visuelle]
  focus: [description visuelle + focus ring]
  disabled: [description visuelle + cursor]
  loading: [description visuelle + spinner]

Accessibilité:
  - role: "button"
  - aria-disabled: quand disabled
  - aria-busy: quand loading
  - Focus ring visible (2px offset)
  - Contrast ratio: 4.5:1 minimum

Exemples:
  - <Button variant="primary">Envoyer</Button>
  - <Button variant="ghost" size="sm">Annuler</Button>
```

#### Rapport UX/A11y

```markdown
## Audit [UX/Accessibilité] : [Page/Flow]

### Score : [X]/100

### Problèmes identifiés

| # | Problème | Sévérité | WCAG | Recommandation |
|---|----------|----------|------|----------------|
| 1 | [Desc] | Critique | 1.4.3 | [Fix] |
| 2 | [Desc] | Majeur | 2.4.7 | [Fix] |

### Quick wins

1. **[Action]** - Impact: Fort, Effort: Faible
2. **[Action]** - Impact: Fort, Effort: Faible

### Corrections détaillées

#### Problème 1 : [Titre]

**Avant:**
```html
[Code problématique]
```

**Après:**
```html
[Code corrigé]
```
```

### Étape 6 : Finalisation

```
1. Stocker les specs dans .project/04-specs/design/ si projet existe
2. Proposer les prochaines étapes :
   - Composants à créer
   - Tests à effectuer
   - Reviews à planifier
```

---

## CAPACITÉS

| Type | Output |
|------|--------|
| design_system | Tokens + structure composants |
| component | Spec complète + code optionnel |
| ux_audit | Rapport + quick wins |
| a11y | Audit WCAG + corrections |
| wireframe | Structure + hiérarchie |

## PRINCIPES APPLIQUÉS

```yaml
principes:
  hiérarchie: "Une action principale par écran"
  accessibilité: "WCAG 2.1 AA minimum"
  responsive: "Mobile first"
  cohérence: "Design tokens partout"
  performance: "Composants légers"
```

## CONTEXTES

| Besoin | Fichier |
|--------|---------|
| Stack frontend | `contexts/frontend.md` |
| Composants existants | Scan du projet |

---

## EXEMPLES

### Design System

```
User: /design Créer un design system pour l'app

→ Structure tokens
→ Liste composants de base
→ Guidelines d'usage
```

### Composant

```
User: /design Spécifier le composant Modal

→ Props, variantes, animations
→ Accessibilité (focus trap, ESC)
→ Exemples d'usage
```

### Audit

```
User: /design Auditer l'accessibilité du checkout

→ Score WCAG
→ Violations listées
→ Corrections avec code
```

---

**COMMENCE MAINTENANT** : Analyse `$ARGUMENTS` et exécute.
