# Handoff Protocol

Ce fichier définit comment les agents **communiquent** et **passent le relais**.

---

## Principe

Un handoff est un **transfert structuré** de contexte et de responsabilité entre :
- Deux agents
- Un agent et l'orchestrateur
- Un agent et l'humain

```
┌─────────────┐                    ┌─────────────┐
│   Agent A   │                    │   Agent B   │
│             │                    │             │
│  [Execute]  │                    │             │
│      │      │   ┌──────────┐    │             │
│      └──────┼──►│ HANDOFF  │────┼──► [Start]  │
│             │   │ PACKAGE  │    │             │
│             │   └──────────┘    │             │
└─────────────┘                    └─────────────┘
```

---

## Structure du Handoff Package

```yaml
handoff:
  # Métadonnées
  id: "HO-2024-001"
  timestamp: "2024-01-15T14:30:00Z"

  # Qui
  from:
    agent: "[agent-id]"
    step: "[workflow step si applicable]"
  to:
    agent: "[agent-id]"
    reason: "[pourquoi cet agent]"

  # Contexte transféré
  context:
    summary: |
      [Résumé en 2-3 phrases de ce qui a été fait]

    decisions:
      - id: "D-001"
        decision: "[décision prise]"
        rationale: "[pourquoi]"

    artifacts:
      - path: "[chemin vers fichier créé]"
        type: "[spec | code | doc | config]"
        description: "[ce que c'est]"

    open_questions:
      - question: "[question non résolue]"
        priority: "[high | medium | low]"
        context: "[contexte additionnel]"

  # Attentes
  expectations:
    deliverable: "[ce qu'on attend de l'agent suivant]"
    constraints:
      - "[contrainte 1]"
      - "[contrainte 2]"
    success_criteria:
      - "[critère 1 pour considérer la tâche réussie]"

  # État workflow
  workflow_state:
    name: "[workflow name]"
    current_step: [N]
    completed_steps: ["step1", "step2"]
    remaining_steps: ["step3", "step4"]
```

---

## Types de Handoff

### 1. Sequential (Workflow)

Agent → Agent suivant dans le workflow.

```yaml
handoff:
  from:
    agent: specification
    step: 2
  to:
    agent: architecture
    reason: "Specs validées, passage à la conception"
  context:
    summary: "User stories définies et validées par le client"
    artifacts:
      - path: ".project/02-requirements/user-stories/US-001.md"
```

### 2. Delegation (Spécialiste)

Agent → Agent spécialisé pour une sous-tâche.

```yaml
handoff:
  from:
    agent: architecture
    step: 3
  to:
    agent: security-check
    reason: "Besoin validation sécurité avant finalisation"
  expectations:
    deliverable: "Rapport de risques sur l'architecture proposée"
    constraints:
      - "Focus sur authentification et données sensibles"
    success_criteria:
      - "Aucun risque critique non adressé"
  context:
    summary: "Architecture API définie, besoin review sécurité"
```

### 3. Escalation (Humain)

Agent → Humain pour décision/validation.

```yaml
handoff:
  from:
    agent: estimation
    step: 2
  to:
    agent: human
    reason: "Décision business requise"
  context:
    summary: "Deux approches possibles avec trade-offs significatifs"
    decisions:
      - id: "pending"
        decision: "Choix entre approche A (rapide, dette) ou B (robuste, long)"
        rationale: "Dépend de la priorité business"
    open_questions:
      - question: "Quelle est la priorité : time-to-market ou maintenabilité ?"
        priority: high
  expectations:
    deliverable: "Choix validé avec justification"
```

### 4. Return (Retour)

Agent spécialisé → Agent appelant.

```yaml
handoff:
  from:
    agent: security-check
    step: null  # Pas dans le workflow principal
  to:
    agent: architecture
    reason: "Review sécurité terminée"
  context:
    summary: "2 risques identifiés, recommandations fournies"
    artifacts:
      - path: ".project/05-quality/security/review-2024-01.md"
    decisions:
      - id: "SEC-001"
        decision: "JWT avec refresh token rotation"
        rationale: "Balance sécurité/UX"
```

---

## Règles de Handoff

### 1. Jamais de Contexte Implicite

```yaml
# INTERDIT
context:
  summary: "C'est fait"

# OBLIGATOIRE
context:
  summary: "Spécifications complétées : 3 epics, 12 user stories, personas définis"
  artifacts:
    - path: ".project/02-requirements/epics/EP-001.md"
    - path: ".project/02-requirements/user-stories/"
```

### 2. Artifacts Toujours Référencés

Tout fichier créé doit être dans `artifacts` avec son chemin exact.

### 3. Open Questions Documentées

Si l'agent n'a pas pu tout résoudre, les questions ouvertes sont explicites.

### 4. Success Criteria Mesurables

```yaml
# MAUVAIS
success_criteria:
  - "Faire du bon code"

# BON
success_criteria:
  - "Tests unitaires > 80% coverage"
  - "Aucune vulnérabilité OWASP Top 10"
  - "Build passe en CI"
```

---

## Réception d'un Handoff

Quand un agent reçoit un handoff, il DOIT :

### 1. Valider le Package

```yaml
validation:
  - [ ] summary présent et compréhensible
  - [ ] tous les artifacts existent
  - [ ] expectations.deliverable clair
  - [ ] contraintes compatibles avec mes capacités
```

### 2. Accuser Réception

```yaml
acknowledgment:
  received: true
  from: "[agent source]"
  understood:
    task: "[reformulation de la tâche]"
    constraints: "[contraintes comprises]"
  questions: []  # ou liste de clarifications si besoin
  starting: true
```

### 3. Signaler les Problèmes

Si le handoff est incomplet ou ambigu :

```yaml
acknowledgment:
  received: true
  understood: partial
  blockers:
    - "Artifact .project/specs/feature.md non trouvé"
    - "Contrainte 'rapidement' non mesurable"
  action: request_clarification
```

---

## Handoff vers Human (Gate)

Cas spécial : les gates HITL sont des handoffs vers l'humain.

```yaml
handoff:
  from:
    agent: "[agent actuel]"
  to:
    agent: human
    reason: "Gate BLOQUANTE atteinte"

  gate:
    type: bloquante
    name: "[nom de la gate]"
    step: "[étape workflow]"

  context:
    summary: "[ce qui a été fait]"
    artifacts: [...]

  validation_request:
    items:
      - "[point 1 à valider]"
      - "[point 2 à valider]"
    options:
      approve: "Continuer avec l'étape suivante"
      reject: "Ajustements requis"
      question: "Clarification nécessaire"
```

---

## Persistance

Chaque handoff est loggé dans l'état :

```json
// state/current.json
{
  "handoffs": [
    {
      "id": "HO-001",
      "timestamp": "...",
      "from": "specification",
      "to": "architecture",
      "status": "completed"
    }
  ]
}
```

Et archivé dans le projet :

```
.project/07-audit/sessions/SESSION-ID/
├── handoffs/
│   ├── HO-001.yaml
│   └── HO-002.yaml
```
