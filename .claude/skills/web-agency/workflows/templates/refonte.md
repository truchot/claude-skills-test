---
id: wf-refonte
name: Workflow Refonte
type: template
version: 1.0.0
description: Workflow pour la refonte d'un existant
duration_range: "8-20 jours"
phases: 5
applicable_to:
  - refonte-site
  - refonte-identite
  - migration
  - modernisation
---

# Workflow Refonte

> Template pour tout projet de refonte ou migration d'existant.

## Vue d'Ensemble

```
AUDIT → ANALYSE → CONCEPTION → MIGRATION → BASCULE
```

| Phase | Durée | Validation |
|-------|-------|------------|
| Audit | 15-20% | Rapport d'audit |
| Analyse | 10-15% | Décisions validées |
| Conception | 20-25% | Nouvelle version specs |
| Migration | 35-40% | Recette OK |
| Bascule | 10-15% | Production live |

---

## Phase 1: Audit

### Objectif
Comprendre l'existant et identifier les problèmes.

### Activités
1. Inventaire de l'existant
2. Analyse technique (dette, performance)
3. Analyse fonctionnelle (usages, pain points)
4. Interviews stakeholders

### Livrables
- [ ] Inventaire complet
- [ ] Rapport d'audit technique
- [ ] Rapport d'audit fonctionnel
- [ ] Liste des problèmes priorisés

### Critères de Sortie
- Vision claire de l'existant
- Problèmes identifiés et priorisés

---

## Phase 2: Analyse

### Objectif
Définir la stratégie de refonte.

### Activités
1. Définir ce qu'on garde/jette/améliore
2. Identifier les risques de migration
3. Proposer les options de refonte
4. Chiffrer et planifier

### Livrables
- [ ] Matrice Keep/Drop/Improve
- [ ] Analyse des risques
- [ ] Recommandations chiffrées
- [ ] Roadmap de migration

### Critères de Sortie
- Stratégie validée par le client
- Risques acceptés et mitigés

---

## Phase 3: Conception

### Objectif
Concevoir la nouvelle version.

### Activités
1. Spécifications de la cible
2. Plan de migration des données
3. Mapping ancien → nouveau
4. Design de la nouvelle version

### Livrables
- [ ] Spécifications cible
- [ ] Plan de migration données
- [ ] Guide de mapping
- [ ] Maquettes/architecture cible

### Critères de Sortie
- Cible clairement définie
- Plan de migration validé

---

## Phase 4: Migration

### Objectif
Réaliser la migration et la nouvelle version.

### Activités
1. Setup environnement cible
2. Migration des données
3. Développement/adaptation
4. Tests de non-régression
5. Recette sur environnement parallèle

### Livrables
- [ ] Environnement cible fonctionnel
- [ ] Données migrées et validées
- [ ] Rapport de tests
- [ ] Documentation delta

### Critères de Sortie
- Nouvelle version testée
- Données migrées et vérifiées
- Parité fonctionnelle confirmée

---

## Phase 5: Bascule

### Objectif
Basculer en production sans interruption.

### Activités
1. Plan de bascule détaillé
2. Communication aux utilisateurs
3. Bascule (big bang ou progressive)
4. Monitoring post-bascule
5. Rollback si nécessaire

### Livrables
- [ ] Plan de bascule
- [ ] Checklist go-live
- [ ] Communication utilisateurs
- [ ] Procédure de rollback
- [ ] PV de mise en production

### Critères de Sortie
- Production live et stable
- Ancien système décommissionné
- Support en place

---

## Points de Contrôle

| Checkpoint | Timing | Décision |
|------------|--------|----------|
| Go/No-Go Refonte | Fin Phase 2 | Confirmer la refonte |
| Go/No-Go Migration | Fin Phase 3 | Valider le plan |
| Go/No-Go Bascule | Fin Phase 4 | Prêt pour production |

## Rollback

Conditions de rollback:
- Perte de données détectée
- Fonctionnalité critique cassée
- Performance dégradée > 50%

Procédure:
1. Activer le plan de rollback
2. Restaurer l'ancien système
3. Communiquer aux utilisateurs
4. Analyser la cause
5. Replanifier la bascule
