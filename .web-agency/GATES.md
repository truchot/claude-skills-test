# Système de Gates - Checkpoints Humains

Ce document définit les points de validation humaine obligatoires dans les workflows.

## Principe

```
GATE = Point d'arrêt obligatoire où l'IA :
  1. Présente ses livrables
  2. Attend la validation humaine
  3. Ne continue PAS sans approbation explicite
```

## Types de Gates

### 🔴 GATE BLOQUANTE (STOP)

L'IA **DOIT** s'arrêter et attendre une validation explicite.

```yaml
gate:
  type: blocking
  trigger: "Avant toute implémentation"
  requires:
    - Livrables produits
    - Présentation à l'utilisateur
    - Validation explicite ("OK", "Validé", "Go")

  on_validation:
    approved: "Continuer au step suivant"
    rejected: "Réviser les livrables"
    questions: "Clarifier avant de continuer"
```

**Utilisée pour :**
- Validation du scope/périmètre
- Validation des estimations
- Validation de l'architecture
- Validation avant déploiement prod

### 🟡 GATE INFORMATIVE (PAUSE)

L'IA **PRÉSENTE** ses livrables et **PROPOSE** de continuer.

```yaml
gate:
  type: informative
  trigger: "Après production d'un livrable intermédiaire"
  requires:
    - Livrables produits
    - Résumé présenté

  behavior:
    - Présente le livrable
    - Demande "Dois-je continuer ou voulez-vous ajuster ?"
    - Continue si pas de réponse après question
```

**Utilisée pour :**
- Livrables intermédiaires
- Points de progression
- Choix non structurants

### 🟢 GATE AUTO (CHECK)

L'IA **VÉRIFIE** automatiquement des critères et continue si OK.

```yaml
gate:
  type: auto
  trigger: "Vérification technique"
  requires:
    - Critères automatisables

  checks:
    - Tests passent
    - Lint OK
    - Build réussit

  on_failure: "Escalade vers humain"
```

**Utilisée pour :**
- Validation technique (tests, build)
- Checks de sécurité automatisés
- Vérifications de format

## Gates par Workflow

### Workflow: Feature

```
ÉTAPE 1: QUALIFICATION
├── Livrable: Brief technique
└── 🟡 GATE INFORMATIVE
    "Voici le brief. Confirmez-vous le périmètre ?"

ÉTAPE 2: ESTIMATION & DÉCOUPAGE
├── Livrables:
│   ├── Estimation macro (effort, coût)
│   ├── Découpage en tâches
│   └── Analyse des risques
└── 🔴 GATE BLOQUANTE
    "Voici l'estimation et le découpage.
     ⚠️ VALIDATION REQUISE avant implémentation.
     Validez-vous ce périmètre ?"

ÉTAPE 3: SPÉCIFICATION TECHNIQUE
├── Livrables:
│   ├── Spécification technique
│   ├── Architecture/Design
│   └── ADR si décision structurante
└── 🔴 GATE BLOQUANTE
    "Voici la spécification technique.
     ⚠️ VALIDATION REQUISE avant implémentation.
     Validez-vous cette approche ?"

ÉTAPE 4: IMPLÉMENTATION
├── Mode: AUTONOME (specs validées)
├── Livrables: Code + Tests
└── 🟢 GATE AUTO
    Checks: tests passent, lint OK, build OK

ÉTAPE 5: CODE REVIEW
├── Livrable: Rapport de review
└── 🟡 GATE INFORMATIVE
    "Review terminée. Voici les points relevés.
     Dois-je corriger ou voulez-vous valider en l'état ?"

ÉTAPE 6: DÉPLOIEMENT
├── Environnement: staging puis prod
└── 🔴 GATE BLOQUANTE (avant prod)
    "Staging OK. Prêt pour production.
     ⚠️ VALIDATION REQUISE pour déployer en prod."
```

### Workflow: Bugfix

```
ÉTAPE 1: DIAGNOSTIC
├── Livrable: Rapport de diagnostic
└── 🟡 GATE INFORMATIVE
    "Cause identifiée : [X]. Solution proposée : [Y].
     Dois-je procéder à la correction ?"

ÉTAPE 2: CORRECTION
├── Mode: AUTONOME si P1/P2, sinon GATE
├── Livrable: Code corrigé + Test de non-régression
└── 🟢 GATE AUTO
    Check: test de non-régression passe

ÉTAPE 3: DÉPLOIEMENT
└── Selon urgence:
    P1: 🟡 GATE INFORMATIVE (déploiement rapide)
    P2-P4: 🔴 GATE BLOQUANTE (validation avant prod)
```

### Workflow: Deployment

```
ÉTAPE 1: PRE-DEPLOY CHECKLIST
├── Livrable: Checklist validée
└── 🔴 GATE BLOQUANTE
    "Checklist pré-déploiement :
     ✅ Tests passent
     ✅ Build OK
     ⚠️ Migration DB requise

     VALIDATION REQUISE pour continuer."

ÉTAPE 2: STAGING
├── Action: Déploiement staging
└── 🟢 GATE AUTO
    Checks: smoke tests staging

ÉTAPE 3: PRODUCTION
└── 🔴 GATE BLOQUANTE
    "Staging validé. Prêt pour production.
     ⚠️ VALIDATION REQUISE pour déployer en prod."

ÉTAPE 4: POST-DEPLOY
├── Action: Monitoring
└── 🟡 GATE INFORMATIVE
    "Déploiement terminé. Monitoring actif.
     Métriques normales. Surveillance pendant 30min."
```

## Format de présentation des Gates

### Gate Bloquante

```markdown
---
## 🔴 CHECKPOINT - Validation Requise

### Livrables produits

1. **[Nom du livrable 1]**
   [Résumé ou lien vers le contenu]

2. **[Nom du livrable 2]**
   [Résumé ou lien vers le contenu]

### Résumé

[Résumé en 2-3 phrases de ce qui a été fait]

### Points d'attention

- [Point 1]
- [Point 2]

### Décision requise

⚠️ **Je ne peux pas continuer sans votre validation.**

Options :
- ✅ "Validé" / "OK" / "Go" → Je continue
- ❌ "Non" / "Stop" → J'attends vos retours
- ❓ Questions → Je clarifie avant de continuer

---
```

### Gate Informative

```markdown
---
## 🟡 POINT DE PROGRESSION

### Ce qui a été fait

[Résumé]

### Livrable

[Contenu ou lien]

### Suite proposée

Je propose de continuer avec [étape suivante].

Souhaitez-vous :
- Continuer → (défaut si pas de réponse)
- Ajuster quelque chose ?
- Poser des questions ?

---
```

## Règles d'escalade

### Escalade automatique vers Gate Bloquante

Une gate devient **bloquante** si :

```yaml
auto_escalate_to_blocking:
  - budget_estimated > 5000€
  - duration_estimated > 5 jours
  - risk_level: high
  - external_dependency: true
  - breaking_change: true
  - security_impact: true
  - data_migration: true
```

### Escalade vers humain (hors workflow)

```yaml
escalate_out_of_workflow:
  - ambiguity_after_clarification: true
  - blocker_unresolvable: true
  - scope_change_major: true
  - conflict_with_existing_decision: true
```

## Configuration

```yaml
# .web-agency/config/gates.yaml

defaults:
  feature:
    estimation: blocking
    specification: blocking
    implementation: auto
    review: informative
    deployment_staging: auto
    deployment_prod: blocking

  bugfix:
    diagnostic: informative
    fix:
      P1: informative  # Urgence = moins de gates
      P2: informative
      P3: blocking
      P4: blocking
    deployment:
      P1: informative
      P2: blocking
      P3: blocking
      P4: blocking

  deployment:
    pre_deploy: blocking
    staging: auto
    production: blocking

# Override par projet si nécessaire
project_overrides:
  high_risk_project:
    all_gates: blocking
```
