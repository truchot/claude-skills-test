---
id: wf-support
name: Workflow Support
type: template
version: 1.0.0
description: Workflow pour le traitement des tickets et incidents
duration_range: "1h-5 jours"
phases: 4
applicable_to:
  - ticket-support
  - incident
  - demande-information
  - bug-report
  - reclamation
---

# Workflow Support

> Template pour le traitement des demandes de support et incidents.

## Vue d'Ensemble

```
RECEPTION → DIAGNOSTIC → RESOLUTION → CLOTURE
```

| Phase | Durée | Validation |
|-------|-------|------------|
| Réception | 5-10% | Ticket qualifié |
| Diagnostic | 20-30% | Cause identifiée |
| Résolution | 40-50% | Problème résolu |
| Clôture | 10-20% | Client satisfait |

---

## Phase 1: Réception

### Objectif
Qualifier et prioriser la demande entrante.

### Activités
1. Réception du ticket (email, tel, chat)
2. Création/enrichissement du ticket
3. Qualification (type, urgence, impact)
4. Assignation au bon interlocuteur

### Livrables
- [ ] Ticket créé dans l'outil
- [ ] Priorité assignée (P1-P4)
- [ ] Catégorie définie
- [ ] Accusé de réception envoyé

### SLA par Priorité

| Priorité | Description | Réponse | Résolution |
|----------|-------------|---------|------------|
| P1 | Critique (site down) | 15 min | 4h |
| P2 | Majeur (fonction KO) | 1h | 8h |
| P3 | Modéré (dégradé) | 4h | 48h |
| P4 | Mineur (cosmétique) | 24h | 5 jours |

---

## Phase 2: Diagnostic

### Objectif
Identifier la cause du problème.

### Activités
1. Reproduction du problème
2. Analyse des logs/données
3. Identification de la cause racine
4. Évaluation des options de résolution

### Livrables
- [ ] Problème reproduit (ou non reproductible documenté)
- [ ] Cause identifiée
- [ ] Options de résolution listées
- [ ] Estimation du temps de résolution

### Critères de Sortie
- Cause racine identifiée
- Solution viable trouvée

---

## Phase 3: Résolution

### Objectif
Résoudre le problème et restaurer le service.

### Activités
1. Application de la solution
2. Tests de vérification
3. Déploiement si nécessaire
4. Validation avec le demandeur

### Livrables
- [ ] Correction appliquée
- [ ] Tests de non-régression OK
- [ ] Demandeur informé
- [ ] Documentation de la solution

### Critères de Sortie
- Problème résolu
- Service restauré
- Demandeur confirme

---

## Phase 4: Clôture

### Objectif
Clôturer proprement et capitaliser.

### Activités
1. Confirmation de résolution avec client
2. Enquête de satisfaction
3. Documentation de la solution (KB)
4. Analyse post-mortem si P1/P2
5. Clôture du ticket

### Livrables
- [ ] Ticket clôturé
- [ ] Feedback client collecté
- [ ] Article KB si pertinent
- [ ] Post-mortem si incident majeur

### Critères de Sortie
- Ticket fermé
- Client satisfait
- Connaissance capitalisée

---

## Escalade

### Niveaux d'Escalade

| Niveau | Interlocuteur | Quand |
|--------|---------------|-------|
| N1 | Support front | Demandes simples |
| N2 | Support technique | Problèmes techniques |
| N3 | Développeur | Bugs, évolutions |
| N4 | Lead/Architecte | Incidents critiques |

### Critères d'Escalade

Escalader si:
- Temps de diagnostic > 30 min sans avancée
- Compétence requise non disponible
- Client VIP ou contrat spécifique
- Impact business significatif

---

## Gestion des Incidents

### Incident Majeur (P1/P2)

```
ALERTE → MOBILISATION → RESOLUTION → POSTMORTEM
```

1. **Alerte**: Notification immédiate des stakeholders
2. **Mobilisation**: War room, toutes ressources
3. **Résolution**: Focus unique sur restauration
4. **Postmortem**: Analyse à froid dans les 48h

### Template Postmortem

```markdown
## Incident: [Titre]

**Date**: [Date et heure]
**Durée**: [Temps d'indisponibilité]
**Impact**: [Utilisateurs affectés, perte business]

### Timeline
- HH:MM - Événement 1
- HH:MM - Événement 2

### Cause Racine
[Analyse de la cause]

### Actions Correctives
- [ ] Action 1 (responsable, deadline)
- [ ] Action 2 (responsable, deadline)

### Enseignements
[Ce qu'on a appris]
```

---

## Métriques

| Métrique | Description | Cible |
|----------|-------------|-------|
| MTTR | Mean Time To Resolve | < 4h (P1) |
| First Response | Temps avant 1ère réponse | < SLA |
| Resolution Rate | % tickets résolus | > 95% |
| CSAT | Satisfaction client | > 4/5 |
| Reopening Rate | % tickets réouverts | < 5% |
