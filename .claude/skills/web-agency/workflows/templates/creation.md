---
id: wf-creation
name: Workflow Création
type: template
version: 1.0.0
description: Workflow pour la création from scratch d'un livrable
duration_range: "5-15 jours"
phases: 4
applicable_to:
  - nouveau-projet
  - nouvelle-fonctionnalite
  - nouveau-composant
---

# Workflow Création

> Template pour tout projet de création partant de zéro.

## Vue d'Ensemble

```
BRIEF → CONCEPTION → PRODUCTION → LIVRAISON
```

| Phase | Durée | Validation |
|-------|-------|------------|
| Brief | 10-15% | Cahier des charges signé |
| Conception | 25-30% | Maquettes/specs validées |
| Production | 45-50% | Livrable fonctionnel |
| Livraison | 10-15% | PV de recette signé |

---

## Phase 1: Brief

### Objectif
Comprendre le besoin et définir le périmètre.

### Activités
1. Réunion de cadrage client
2. Collecte des informations existantes
3. Analyse des contraintes (budget, délai, technique)
4. Rédaction du cahier des charges

### Livrables
- [ ] Compte-rendu de réunion
- [ ] Cahier des charges
- [ ] Planning prévisionnel
- [ ] Devis validé

### Critères de Sortie
- Client a signé le cahier des charges
- Budget et planning validés

---

## Phase 2: Conception

### Objectif
Concevoir la solution avant production.

### Activités
1. Recherche et benchmark
2. Esquisse des concepts
3. Itérations avec le client
4. Finalisation des spécifications

### Livrables
- [ ] Benchmark/moodboard
- [ ] Wireframes ou specs techniques
- [ ] Maquettes ou architecture
- [ ] Document de validation

### Critères de Sortie
- Conception validée par le client
- Aucune zone d'ombre sur le périmètre

---

## Phase 3: Production

### Objectif
Réaliser le livrable selon les specs validées.

### Activités
1. Mise en place environnement
2. Production itérative
3. Tests internes
4. Corrections et ajustements

### Livrables
- [ ] Livrable en environnement de recette
- [ ] Documentation technique
- [ ] Rapport de tests internes

### Critères de Sortie
- Livrable fonctionnel et testé
- Prêt pour recette client

---

## Phase 4: Livraison

### Objectif
Livrer et transférer au client.

### Activités
1. Présentation au client
2. Formation si nécessaire
3. Recette client
4. Corrections finales
5. Mise en production

### Livrables
- [ ] PV de recette signé
- [ ] Documentation utilisateur
- [ ] Accès et credentials
- [ ] Garantie/support

### Critères de Sortie
- PV de recette signé
- Client autonome sur le livrable

---

## Points de Contrôle

| Checkpoint | Timing | Décision |
|------------|--------|----------|
| Go/No-Go Brief | Fin Phase 1 | Continuer ou ajuster périmètre |
| Go/No-Go Conception | Fin Phase 2 | Valider avant production |
| Go/No-Go Recette | Fin Phase 3 | Prêt pour livraison client |

## Escalade

Escalader vers supervision humaine si:
- Dépassement > 20% du budget
- Retard > 1 semaine
- Changement de périmètre significatif
- Conflit avec le client
