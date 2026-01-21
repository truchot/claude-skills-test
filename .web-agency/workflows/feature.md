# Workflow : Développement Feature

Chaîne de production complète pour développer une nouvelle fonctionnalité, avec **Human-in-the-Loop** (HITL) aux étapes clés.

## Principe HITL

```
🔴 GATE BLOQUANTE = L'IA s'arrête et attend validation humaine
🟡 GATE INFORMATIVE = L'IA présente et propose de continuer
🟢 GATE AUTO = Vérification automatique (tests, lint)
```

## Vue d'ensemble

```
┌─────────────────────────────────────────────────────────────────┐
│  1. QUALIFICATION                                                │
│     Agent: intake/qualification.md                               │
│     Livrable: Brief technique                                    │
│     HITL: 🟡 INFORMATIVE                                         │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  2. ESTIMATION & DÉCOUPAGE                                       │
│     Agents: strategy/estimation.md + strategy/task-breakdown.md  │
│     Livrables: Estimation, Découpage, Risques                    │
│     HITL: 🔴 BLOQUANTE ⚠️ Pas d'implémentation sans validation   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  3. SPÉCIFICATION TECHNIQUE                                      │
│     Agents: strategy/specification.md + strategy/architecture.md │
│     Livrables: Spec technique, Architecture, ADR                 │
│     HITL: 🔴 BLOQUANTE ⚠️ Pas de code sans spec validée          │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  4. IMPLÉMENTATION                                               │
│     Agents: development/frontend.md, development/backend.md      │
│     Livrables: Code, Tests unitaires                             │
│     HITL: 🟢 AUTO (tests passent, lint OK)                       │
│     Mode: AUTONOME (specs validées)                              │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  5. CODE REVIEW                                                  │
│     Agent: quality/code-review.md                                │
│     Livrable: Rapport de review                                  │
│     HITL: 🟡 INFORMATIVE (présente les findings)                 │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  6. DÉPLOIEMENT                                                  │
│     Agent: operations/deployment.md                              │
│     Étapes: Staging → Production                                 │
│     HITL: 🔴 BLOQUANTE avant prod ⚠️                             │
└─────────────────────────────────────────────────────────────────┘
```

---

## Étape 1 : Qualification

### Agent
`skills/intake/qualification.md`

### Objectif
Comprendre et formaliser le besoin avant tout travail.

### Process
1. Analyser la demande utilisateur
2. Clarifier les ambiguïtés (poser des questions)
3. Identifier contexte, utilisateurs, contraintes, dépendances

### Livrable : Brief Technique

```markdown
# Brief Technique : [Nom de la feature]

## Contexte
[Pourquoi cette feature ? Quel problème résout-elle ?]

## Description fonctionnelle
[Ce qui doit être fait, du point de vue utilisateur]

## Utilisateurs cibles
[Qui va utiliser cette feature ?]

## Critères d'acceptation
- [ ] [Critère 1 - vérifiable]
- [ ] [Critère 2 - vérifiable]
- [ ] [Critère 3 - vérifiable]

## Contraintes identifiées
- [Contrainte 1]
- [Contrainte 2]

## Dépendances
- [Dépendance externe ou interne]

## Questions ouvertes
- [Question non résolue → à clarifier]

## Priorité
[P1/P2/P3/P4] - [Justification]
```

### HITL : 🟡 INFORMATIVE

```markdown
---
## 🟡 Brief technique prêt

**Feature** : [Nom]
**Critères d'acceptation** : [N] définis
**Contraintes** : [Liste courte]

Confirmez-vous ce périmètre avant estimation ?

→ Si OK, je passe à l'estimation et découpage.
→ Si ajustements, dites-moi ce qu'il faut préciser.
---
```

---

## Étape 2 : Estimation & Découpage

### Agents
- `skills/strategy/estimation.md`
- `skills/strategy/task-breakdown.md`
- `skills/strategy/risk-analysis.md`

### Objectif
**OBLIGATOIRE avant toute implémentation** : estimer l'effort, découper en tâches, identifier les risques.

### Livrable 1 : Estimation Macro

```markdown
# Estimation : [Nom de la feature]

## Estimation globale

| Métrique | Valeur |
|----------|--------|
| Complexité | [S/M/L/XL] |
| Effort estimé | [X] jours/homme |
| Durée calendaire | [Y] jours |
| Fourchette | [Min] - [Max] jours |

## Répartition

| Domaine | Effort | Justification |
|---------|--------|---------------|
| Spécification | Xh | [Pourquoi] |
| Backend | Xh | [Pourquoi] |
| Frontend | Xh | [Pourquoi] |
| Tests | Xh | [Pourquoi] |
| Review & Deploy | Xh | [Pourquoi] |

## Hypothèses
- [Hypothèse 1 : condition pour que l'estimation tienne]
- [Hypothèse 2]

## Facteurs de variabilité
| Facteur | Impact si réalisé |
|---------|-------------------|
| [Facteur 1] | +X jours |
| [Facteur 2] | +Y jours |
```

### Livrable 2 : Découpage en Tâches

```markdown
# Découpage : [Nom de la feature]

## Tâches identifiées

### Tâche 1 : [Titre clair et actionnable]
- **Domaine** : [Backend/Frontend/DevOps/Full-stack]
- **Effort** : [X]h
- **Dépendances** : [Aucune / Tâche N]
- **Definition of Done** :
  - [ ] [Critère 1]
  - [ ] [Critère 2]

### Tâche 2 : [Titre]
...

## Ordre d'exécution recommandé

1. [Tâche X] - Bloquante pour les autres
2. [Tâche Y] - Peut commencer après X
3. [Tâche Z] - Parallélisable avec Y

## Dépendances externes

| Dépendance | Responsable | Statut | Bloquant ? |
|------------|-------------|--------|------------|
| [API tierce] | [Qui] | [À confirmer] | [Oui/Non] |
```

### Livrable 3 : Analyse des Risques

```markdown
# Risques : [Nom de la feature]

## Matrice des risques

### 🔴 Élevés (à traiter avant de commencer)

| Risque | Probabilité | Impact | Mitigation |
|--------|-------------|--------|------------|
| [Risque] | Haute | Élevé | [Action concrète] |

### 🟡 Moyens (à surveiller)

| Risque | Probabilité | Impact | Mitigation |
|--------|-------------|--------|------------|
| [Risque] | Moyenne | Moyen | [Action] |

### 🟢 Faibles (acceptés)

| Risque | Probabilité | Impact | Mitigation |
|--------|-------------|--------|------------|
| [Risque] | Faible | Faible | [Accepté / Monitor] |

## Plan de contingence

Si [risque majeur] se réalise :
→ [Action 1]
→ [Action 2]
→ [Point de décision : abandonner / pivoter / continuer]
```

### HITL : 🔴 BLOQUANTE

```markdown
---
## 🔴 CHECKPOINT - Validation OBLIGATOIRE

### Livrables produits

| Livrable | Résumé |
|----------|--------|
| Estimation | [X] j/h, fourchette [Min-Max] |
| Découpage | [N] tâches |
| Risques | [X] élevés, [Y] moyens |

### Points clés

- **Effort total** : [X] jours/homme
- **Durée estimée** : [Y] jours calendaires
- **Tâches critiques** : [Liste]
- **Risques majeurs** : [Liste]

### Hypothèses à valider

- [ ] [Hypothèse 1]
- [ ] [Hypothèse 2]

---

⚠️ **JE NE PEUX PAS PASSER À LA SPÉCIFICATION SANS VOTRE VALIDATION**

Validez-vous :
- [ ] L'estimation globale
- [ ] Le découpage en tâches
- [ ] Les risques identifiés
- [ ] Les hypothèses

**Répondez** :
- ✅ **"Validé"** → Je passe à la spécification technique
- ❌ **"Ajuster"** → Précisez ce qu'il faut revoir
- ❓ **Questions** → Je clarifie avant de continuer

---
```

---

## Étape 3 : Spécification Technique

### Agents
- `skills/strategy/specification.md`
- `skills/strategy/architecture.md`

### Objectif
Définir **COMMENT** implémenter. Aucun code n'est écrit avant validation de la spec.

### Livrable 1 : Spécification Technique

```markdown
# Spécification Technique : [Feature]

## 1. Résumé de l'approche
[2-3 paragraphes expliquant la solution technique choisie]

## 2. Architecture

### Composants impactés
| Composant | Action | Description |
|-----------|--------|-------------|
| [Composant] | Créer/Modifier | [Ce qui change] |

### Diagramme
```
[Schéma ASCII ou référence Mermaid]
```

## 3. Modèle de données

### Nouvelles entités
```prisma
model NouvelleEntite {
  id        String   @id @default(cuid())
  // ...
}
```

### Modifications
```prisma
model EntiteExistante {
  // Ajout de champ
  nouveauChamp String?
}
```

### Migrations
- [ ] Migration 1 : [Description + réversibilité]

## 4. API

### Endpoints
| Méthode | Route | Description | Auth |
|---------|-------|-------------|------|
| POST | /api/xxx | Créer | Oui |
| GET | /api/xxx/:id | Lire | Oui |

### Contrats
```typescript
// Request
interface CreateXxxRequest {
  field1: string;
}

// Response
interface CreateXxxResponse {
  id: string;
  field1: string;
  createdAt: string;
}

// Errors
type CreateXxxError =
  | { code: 'VALIDATION_ERROR'; message: string }
  | { code: 'NOT_FOUND'; message: string };
```

## 5. Frontend

### Composants
| Composant | Responsabilité | Props |
|-----------|----------------|-------|
| [Composant] | [Rôle] | [Props principales] |

### État
```typescript
interface FeatureState {
  data: Xxx[];
  loading: boolean;
  error: Error | null;
}
```

### Routes/Pages
| Route | Page | Description |
|-------|------|-------------|
| /xxx | XxxPage | Liste des xxx |

## 6. Tests requis

### Unitaires (obligatoires)
- [ ] [Fonction/Composant] : [Cas testé]

### Intégration (obligatoires)
- [ ] [Endpoint] : [Scénario]

### E2E (si parcours critique)
- [ ] [Parcours utilisateur]

## 7. Sécurité

- **Authentification** : [Requise/Non]
- **Autorisation** : [Règles]
- **Validation** : [Schéma Zod]
- **Données sensibles** : [Mesures]

## 8. Performance

- **Pagination** : [Oui/Non, stratégie]
- **Cache** : [Stratégie]
- **Lazy loading** : [Oui/Non]

## 9. Hors scope (explicite)

- [Ce qui n'est PAS fait dans cette feature]
- [Ce qui sera fait dans une future itération]
```

### Livrable 2 : ADR (Architecture Decision Record)

*Uniquement si décision structurante*

```markdown
# ADR-XXX : [Titre de la décision]

## Statut
[Proposé / Accepté / Déprécié]

## Contexte
[Pourquoi cette décision doit être prise maintenant]

## Options considérées

### Option A : [Nom]
**Avantages** :
- [+1]

**Inconvénients** :
- [-1]

### Option B : [Nom]
**Avantages** :
- [+1]

**Inconvénients** :
- [-1]

## Décision
[L'option choisie et pourquoi]

## Conséquences
- [Conséquence 1]
- [Conséquence 2]

## Références
- [Lien vers documentation externe si pertinent]
```

### HITL : 🔴 BLOQUANTE

```markdown
---
## 🔴 CHECKPOINT - Validation OBLIGATOIRE

### Spécification produite

| Élément | Détail |
|---------|--------|
| Architecture | [Résumé en 1 ligne] |
| Data model | [N] entités ([X] nouvelles, [Y] modifiées) |
| API | [N] endpoints |
| Frontend | [N] composants |
| ADR | [Oui : titre / Non] |

### Décisions techniques prises

1. [Décision 1] : [Choix fait]
2. [Décision 2] : [Choix fait]

### Points d'attention

- [Point 1 nécessitant votre attention]
- [Point 2]

---

⚠️ **JE NE PEUX PAS ÉCRIRE DE CODE SANS VOTRE VALIDATION**

Validez-vous :
- [ ] L'architecture proposée
- [ ] Le modèle de données
- [ ] Les choix techniques
- [ ] Le périmètre (scope vs hors-scope)

**Répondez** :
- ✅ **"Validé"** → Je commence l'implémentation
- ❌ **"Ajuster"** → Précisez les points à revoir
- ❓ **Questions** → Je clarifie

---
```

---

## Étape 4 : Implémentation

### Agents
- `skills/development/frontend.md`
- `skills/development/backend.md`
- `skills/development/database.md`

### Mode : AUTONOME

La spécification a été validée. L'implémentation suit le plan sans interruption.

### Process
1. Suivre la spécification tâche par tâche
2. Écrire les tests en parallèle du code
3. Respecter les conventions du projet
4. Commits atomiques et descriptifs

### Livrables
- Code source implémenté
- Tests unitaires
- Tests d'intégration

### HITL : 🟢 AUTO

```yaml
auto_checks:
  - npm run lint        # 0 errors
  - npm run type-check  # 0 errors
  - npm run test        # All pass
  - npm run build       # Success

on_failure:
  - Tentative de correction automatique
  - Si échec répété → escalade humaine
```

---

## Étape 5 : Code Review

### Agent
`skills/quality/code-review.md`

### Livrable : Rapport de Review

```markdown
# Code Review : [Feature]

## Verdict : [APPROVED / CHANGES_REQUESTED]

## Résumé

| Critère | Statut | Commentaire |
|---------|--------|-------------|
| Fonctionnel | ✅/⚠️/❌ | [Note] |
| Lisibilité | ✅/⚠️/❌ | [Note] |
| Tests | ✅/⚠️/❌ | [Note] |
| Performance | ✅/⚠️/❌ | [Note] |
| Sécurité | ✅/⚠️/❌ | [Note] |

## Points positifs
- [Ce qui est bien fait]

## À corriger

### 🔴 Bloquants
| Fichier | Ligne | Problème | Suggestion |
|---------|-------|----------|------------|
| [file] | [L] | [Issue] | [Fix] |

### 🟡 Recommandés
| Fichier | Ligne | Problème | Suggestion |
|---------|-------|----------|------------|
| [file] | [L] | [Issue] | [Fix] |

### 🟢 Suggestions (optionnel)
| Fichier | Ligne | Suggestion |
|---------|-------|------------|
| [file] | [L] | [Improvement] |
```

### HITL : 🟡 INFORMATIVE

```markdown
---
## 🟡 Review terminée

**Verdict** : [APPROVED / CHANGES_REQUESTED]
**Bloquants** : [N]
**Recommandés** : [M]

[Si APPROVED] : Prêt pour déploiement. Dois-je continuer ?

[Si CHANGES_REQUESTED] : [N] corrections nécessaires.
Dois-je les appliquer ?

---
```

---

## Étape 6 : Déploiement

### Agent
`skills/operations/deployment.md`

### Process
1. Merge dans main (si feature branch)
2. Déploiement staging
3. Smoke tests staging
4. **GATE BLOQUANTE** - Validation pour prod
5. Déploiement production
6. Vérification post-deploy

### HITL : 🔴 BLOQUANTE (avant production)

```markdown
---
## 🔴 CHECKPOINT - Déploiement Production

### Statut staging

| Check | Statut |
|-------|--------|
| Déployé | ✅ |
| Smoke tests | ✅ [N]/[N] passés |
| Erreurs logs | ✅ Aucune |
| Performance | ✅ Normale |

### URL staging pour test
[URL]

### Changements inclus
- [Feature/Fix 1]
- [Feature/Fix 2]

### Risques déploiement
| Risque | Mitigation |
|--------|------------|
| [Risque] | [Plan rollback] |

---

⚠️ **PRÊT POUR PRODUCTION**

Avez-vous testé sur staging ?

**Répondez** :
- ✅ **"Go prod"** → Je déploie en production
- ⏸️ **"Attendre"** → Je reste en staging
- 🔍 **"Tester d'abord"** → Prenez le temps, je reste en attente

---
```

---

## Raccourcis pour features simples

Si la feature est **triviale** (< 2h, pas de changement de data model, pas d'API) :

```yaml
simplified_flow:
  conditions:
    - effort < 2h
    - no_database_change
    - no_api_change
    - no_external_dependency
    - low_risk

  steps:
    1. Brief rapide (🟡 informative)
    2. Implémentation directe (🟢 auto)
    3. Review rapide (🟡 informative)
    4. Déploiement (🟡 informative, pas bloquante)

  example: "Changer la couleur d'un bouton"
```

L'orchestrateur détecte automatiquement si le raccourci s'applique.

---

## Critères de sortie du workflow

```markdown
□ Brief technique validé
□ Estimation et découpage validés
□ Spécification technique validée
□ Code implémenté selon spec
□ Tests passants (unit, integration)
□ Code review approuvé
□ Déployé en staging + smoke tests OK
□ Déployé en production
□ Monitoring OK (pas de régression)
```
