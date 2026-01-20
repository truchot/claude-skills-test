# Workflow : Développement Feature

Chaîne de production pour l'ajout d'une nouvelle fonctionnalité.

## Déclencheurs

- Demande de nouvelle fonctionnalité
- User story à implémenter
- Évolution demandée par le client
- Amélioration identifiée

## Étapes

```
┌─────────────────────────────────────────────────────────────────┐
│  1. SPECIFICATION                                                │
│     Clarifier le besoin, définir les critères d'acceptation     │
│     Agent: skills/strategy/specification.md                      │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  2. ARCHITECTURE                                                 │
│     Concevoir la solution technique, identifier les impacts     │
│     Agent: skills/strategy/architecture.md                       │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  3. DEVELOPMENT                                                  │
│     Implémenter la fonctionnalité                               │
│     Agents: skills/development/[frontend|backend|...].md        │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  4. TESTING                                                      │
│     Écrire et exécuter les tests                                │
│     Agent: skills/quality/testing.md                             │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  5. CODE REVIEW                                                  │
│     Revue de code, corrections                                  │
│     Agent: skills/quality/code-review.md                         │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  6. DEPLOYMENT                                                   │
│     Déployer en staging puis production                         │
│     Agent: skills/operations/deployment.md                       │
└─────────────────────────────────────────────────────────────────┘
```

## Détail des étapes

### 1. Specification

**Agent** : `skills/strategy/specification.md`

**Input** :
- Description de la demande
- Contexte projet

**Actions** :
- Clarifier le besoin avec des questions
- Identifier les cas d'usage
- Définir les critères d'acceptation
- Identifier les edge cases

**Output** :
```yaml
feature:
  title: "Titre de la feature"
  description: "Description détaillée"
  user_story: "En tant que [qui], je veux [quoi] afin de [pourquoi]"

acceptance_criteria:
  - "Critère 1"
  - "Critère 2"
  - "Critère 3"

edge_cases:
  - case: "Cas limite 1"
    expected: "Comportement attendu"

out_of_scope:
  - "Ce qui n'est PAS inclus"

questions_resolved:
  - question: "Question posée"
    answer: "Réponse obtenue"
```

### 2. Architecture

**Agent** : `skills/strategy/architecture.md`

**Input** :
- Spécification validée
- Codebase existante

**Actions** :
- Analyser l'impact sur l'existant
- Choisir l'approche technique
- Identifier les composants à créer/modifier
- Estimer la complexité

**Output** :
```yaml
approach:
  summary: "Résumé de l'approche"
  rationale: "Justification du choix"

components:
  create:
    - path: "src/components/NewFeature.tsx"
      purpose: "Composant principal"
  modify:
    - path: "src/pages/dashboard.tsx"
      changes: "Ajouter le nouveau composant"

dependencies:
  add: ["package-name@version"]

database:
  migrations: true|false
  changes: "Description des changements DB"

risks:
  - risk: "Risque identifié"
    mitigation: "Mitigation proposée"
```

### 3. Development

**Agents** : `skills/development/[frontend|backend|integration].md`

**Input** :
- Architecture validée
- Spécification

**Actions** :
- Créer la branche feature
- Implémenter le code
- Respecter les conventions du projet
- Commenter si nécessaire

**Output** :
- Code implémenté
- Branche prête pour review

**Règles** :
```
✓ Commits atomiques et descriptifs
✓ Pas de code commenté
✓ Pas de console.log en prod
✓ Types TypeScript stricts
✓ Gestion des erreurs
```

### 4. Testing

**Agent** : `skills/quality/testing.md`

**Input** :
- Code implémenté
- Critères d'acceptation

**Actions** :
- Écrire les tests unitaires
- Écrire les tests d'intégration
- Écrire les tests E2E si nécessaire
- Vérifier la couverture

**Output** :
```yaml
tests:
  unit:
    files: ["feature.test.ts"]
    coverage: "95%"
  integration:
    files: ["feature.integration.test.ts"]
  e2e:
    files: ["feature.e2e.ts"]

all_passing: true
coverage_delta: "+2%"
```

### 5. Code Review

**Agent** : `skills/quality/code-review.md`

**Input** :
- PR/MR avec le code
- Tests passants

**Actions** :
- Analyser le code
- Vérifier la qualité
- Identifier les améliorations
- Valider ou demander des corrections

**Output** :
```yaml
review:
  status: approved|changes_requested

feedback:
  critical: []  # Bloquant
  suggestions: []  # Améliorations
  nitpicks: []  # Détails mineurs

security_check: passed
performance_check: passed
```

### 6. Deployment

**Agent** : `skills/operations/deployment.md`

**Input** :
- Code reviewé et approuvé
- Tests passants

**Actions** :
- Merge dans la branche principale
- Déployer en staging
- Smoke tests
- Déployer en production
- Vérifier le monitoring

**Output** :
```yaml
deployment:
  staging:
    url: "https://staging.example.com"
    deployed_at: "2024-01-15T10:00:00Z"
    smoke_tests: passed

  production:
    url: "https://example.com"
    deployed_at: "2024-01-15T11:00:00Z"
    smoke_tests: passed

rollback_ready: true
```

## Raccourcis

Pour les features simples (< 1h de dev) :

```
Specification → Development → Testing → Deployment
(skip Architecture et Code Review formels)
```

## Critères de sortie

```
□ Tous les critères d'acceptation validés
□ Tests passants (unit, integration)
□ Code review approuvé
□ Déployé en production
□ Aucune régression détectée
□ Documentation mise à jour (si nécessaire)
```
