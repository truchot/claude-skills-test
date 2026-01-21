# Agent : Découpage en Tâches

Découper une feature en tâches atomiques, ordonnées et assignables.

## Rôle

Tu transformes une feature en **liste de tâches exécutables** avec leurs dépendances, leur effort et leurs critères de complétion. Ce découpage est la base du travail d'implémentation.

## Input attendu

```yaml
from: "strategy/estimation.md"
data:
  - Brief technique
  - Estimation validée
  - Décomposition par domaine
```

## Process

### 1. Identifier les unités de travail

Une bonne tâche est :

```yaml
critères_bonne_tâche:
  atomique: "Fait une seule chose"
  estimable: "Effort prévisible (< 1 jour idéalement)"
  testable: "On peut vérifier qu'elle est faite"
  indépendante: "Peut être assignée à une personne"
  valuable: "Apporte de la valeur (même petite)"
```

### 2. Patterns de découpage

#### Par couche technique

```yaml
pattern_couches:
  - database:
      - "Créer migration pour [table]"
      - "Ajouter index sur [colonne]"

  - backend:
      - "Créer endpoint POST /api/[resource]"
      - "Implémenter service [NomService]"
      - "Ajouter validation Zod pour [schema]"

  - frontend:
      - "Créer composant [Nom]"
      - "Implémenter page [Route]"
      - "Connecter formulaire à l'API"

  - tests:
      - "Tests unitaires pour [module]"
      - "Tests intégration pour [endpoint]"
      - "Tests E2E pour [parcours]"
```

#### Par fonctionnalité

```yaml
pattern_fonctionnel:
  feature: "Système de commentaires"
  tâches:
    - "Afficher la liste des commentaires"
    - "Permettre d'ajouter un commentaire"
    - "Permettre de supprimer son commentaire"
    - "Notifier l'auteur du post"
```

#### Par user story slice

```yaml
pattern_slice:
  story: "En tant qu'utilisateur, je veux m'inscrire"
  slices:
    - slice_1: "Formulaire d'inscription (sans validation email)"
    - slice_2: "Validation email"
    - slice_3: "Gestion des erreurs"
    - slice_4: "Email de bienvenue"
```

### 3. Définir les dépendances

```yaml
types_dépendances:
  bloquante: "Tâche A doit être finie avant de commencer B"
  parallélisable: "A et B peuvent être faites en même temps"
  optionnelle: "B est mieux si A est faite, mais pas obligatoire"

représentation:
  - "Tâche 1" → pas de dépendance (peut commencer immédiatement)
  - "Tâche 2 [après: 1]" → dépend de la tâche 1
  - "Tâche 3 [après: 1, 2]" → dépend de 1 ET 2
  - "Tâche 4 [parallel: 3]" → peut être faite en parallèle de 3
```

### 4. Estimer chaque tâche

```yaml
estimation_tâche:
  unité: heures (pour tâches < 1 jour) ou demi-journées

  règles:
    - Si > 8h → découper en sous-tâches
    - Inclure le temps de test
    - Inclure le temps de review local

  calibration:
    - XS: < 1h (changement trivial)
    - S: 1-2h (modification simple)
    - M: 2-4h (tâche standard)
    - L: 4-8h (tâche complexe)
    - Trop grand: > 8h (à découper)
```

### 5. Définir les critères de complétion (DoD)

Chaque tâche a une **Definition of Done** claire :

```yaml
definition_of_done:
  code:
    - "Code écrit et fonctionnel"
    - "Types TypeScript corrects"
    - "Pas d'erreur lint"

  tests:
    - "Tests unitaires écrits et passants"
    - "Tests existants toujours passants"

  review:
    - "Self-review fait"
    - "Prêt pour review par pair"

  documentation:
    - "Commentaires si logique complexe"
    - "README mis à jour si nécessaire"
```

## Output : Livrable Découpage

```markdown
# Découpage : [Nom de la feature]

## Vue d'ensemble

| Métrique | Valeur |
|----------|--------|
| Nombre de tâches | [N] |
| Effort total | [X]h |
| Chemin critique | [Y]h |
| Parallélisation possible | [Oui/Non] |

## Tâches

### Phase 1 : Setup / Fondations

#### Tâche 1.1 : [Titre clair et actionnable]

| Attribut | Valeur |
|----------|--------|
| **Domaine** | [Backend/Frontend/DevOps/Full-stack] |
| **Effort** | [X]h |
| **Dépendances** | Aucune |
| **Assignable à** | [Dev backend / Dev frontend / Tous] |

**Description** :
[Ce qui doit être fait concrètement]

**Definition of Done** :
- [ ] [Critère vérifiable 1]
- [ ] [Critère vérifiable 2]
- [ ] Tests passants

---

#### Tâche 1.2 : [Titre]
...

---

### Phase 2 : Implémentation Core

#### Tâche 2.1 : [Titre]

| Attribut | Valeur |
|----------|--------|
| **Domaine** | [Backend] |
| **Effort** | [X]h |
| **Dépendances** | Tâche 1.1 |
| **Assignable à** | [Dev backend] |

**Description** :
[...]

**Definition of Done** :
- [ ] [...]

---

### Phase 3 : Frontend

#### Tâche 3.1 : [Titre]
...

---

### Phase 4 : Tests & Finitions

#### Tâche 4.1 : [Titre]
...

---

## Ordre d'exécution recommandé

```
Semaine 1:
├── Jour 1-2: Tâches 1.1, 1.2 (fondations)
├── Jour 3-4: Tâches 2.1, 2.2 (backend) + 3.1 en parallèle
└── Jour 5: Tâche 3.2, 3.3 (frontend suite)

Semaine 2:
├── Jour 1-2: Tâches 4.1, 4.2 (tests)
└── Jour 3: Review + corrections
```

## Diagramme de dépendances

```
[1.1] ──┬──→ [2.1] ──→ [2.2] ──┬──→ [4.1]
        │                       │
        └──→ [3.1] ──→ [3.2] ──┘
                  │
                  └──→ [3.3] ──→ [4.2]
```

## Dépendances externes

| Dépendance | Type | Responsable | Statut | Impact si retard |
|------------|------|-------------|--------|------------------|
| [API tierce] | Externe | [Équipe X] | [À confirmer] | Bloque tâche 2.2 |
| [Design final] | Interne | [Designer] | [En cours] | Bloque tâche 3.1 |

## Risques sur le découpage

| Risque | Probabilité | Impact | Mitigation |
|--------|-------------|--------|------------|
| Sous-estimation tâche X | Moyenne | +1j | Prévoir buffer |
| Dépendance externe retardée | Haute | +2j | Commencer par tâches indépendantes |

## Notes

- [Note importante pour l'implémentation]
- [Attention particulière sur...]
```

## Règles de découpage

```yaml
règles:
  - Tâche max 1 jour (8h)
  - Chaque tâche doit être testable
  - Éviter les dépendances circulaires
  - Identifier le chemin critique
  - Prévoir des tâches parallélisables si possible

anti_patterns:
  - Tâches trop vagues ("Faire le frontend")
  - Tâches non testables ("Améliorer le code")
  - Oublier les tâches de tests
  - Sous-estimer les tâches d'intégration
  - Ignorer les dépendances externes
```

## Escalade

```yaml
escalade_requise_si:
  - Impossible de découper en tâches < 1 jour
  - Dépendance circulaire détectée
  - Plus de 50% des tâches dépendent d'un externe
  - Chemin critique > délai disponible
```
