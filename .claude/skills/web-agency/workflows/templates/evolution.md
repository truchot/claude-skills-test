---
id: wf-evolution
name: Workflow Evolution
type: template
version: 1.0.0
description: Workflow pour l'évolution ou amélioration d'un existant
duration_range: "2-8 jours"
phases: 4
applicable_to:
  - nouvelle-feature
  - amelioration
  - optimisation
  - correction
---

# Workflow Evolution

> Template pour les évolutions et améliorations d'un système existant.

## Vue d'Ensemble

```
DEMANDE → SPECIFICATION → REALISATION → DEPLOIEMENT
```

| Phase | Durée | Validation |
|-------|-------|------------|
| Demande | 10% | Ticket qualifié |
| Spécification | 20% | Specs validées |
| Réalisation | 50% | Code review OK |
| Déploiement | 20% | Production stable |

---

## Phase 1: Demande

### Objectif
Qualifier et prioriser la demande.

### Activités
1. Réception de la demande
2. Clarification du besoin
3. Évaluation de l'impact
4. Priorisation

### Livrables
- [ ] Ticket qualifié (user story)
- [ ] Critères d'acceptation
- [ ] Estimation effort
- [ ] Priorité assignée

### Critères de Sortie
- Demande comprise et acceptée
- Estimation validée
- Slot de dev planifié

---

## Phase 2: Spécification

### Objectif
Définir précisément ce qui doit être fait.

### Activités
1. Analyse d'impact technique
2. Design de la solution
3. Identification des risques
4. Validation avec demandeur

### Livrables
- [ ] Spécification technique
- [ ] Plan de tests
- [ ] Identification des dépendances
- [ ] Accord demandeur

### Critères de Sortie
- Solution technique validée
- Pas de bloqueur identifié

---

## Phase 3: Réalisation

### Objectif
Implémenter l'évolution.

### Activités
1. Développement
2. Tests unitaires
3. Code review
4. Tests d'intégration
5. Documentation

### Livrables
- [ ] Code implémenté
- [ ] Tests passants
- [ ] Code review approuvée
- [ ] Documentation à jour

### Critères de Sortie
- CI/CD vert
- Code review validée
- Prêt pour staging

---

## Phase 4: Déploiement

### Objectif
Déployer en production de manière sécurisée.

### Activités
1. Déploiement staging
2. Recette sur staging
3. Déploiement production
4. Validation post-déploiement
5. Communication

### Livrables
- [ ] Recette staging OK
- [ ] Déploiement prod OK
- [ ] Monitoring OK
- [ ] Communication faite

### Critères de Sortie
- Fonctionnalité live et stable
- Demandeur notifié
- Ticket fermé

---

## Cas Particuliers

### Hotfix (urgence)

```
DIAGNOSTIC → FIX → DEPLOY → POSTMORTEM
```

- Bypass des étapes non critiques
- Déploiement accéléré
- Documentation a posteriori

### Optimisation

```
MESURE → ANALYSE → OPTIMISATION → VALIDATION
```

- Baseline avant optimisation
- Mesures comparatives après
- Objectif chiffré (ex: -30% temps de chargement)

---

## Points de Contrôle

| Checkpoint | Timing | Décision |
|------------|--------|----------|
| Go/No-Go Dev | Fin Phase 2 | Démarrer le dev |
| Go/No-Go Deploy | Fin Phase 3 | Déployer en staging |
| Go/No-Go Prod | Staging OK | Déployer en production |

## Rollback

Si problème post-déploiement:
1. Identifier le symptôme
2. Évaluer la sévérité
3. Rollback si sévérité > medium
4. Sinon, hotfix forward
