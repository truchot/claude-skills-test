# Product Requirements Document (PRD)

> **Projet** : {{PROJECT_NAME}}
> **Version** : 1.0
> **Date** : {{DATE}}
> **Auteur** : {{AUTHOR}}
> **Statut** : Draft | En review | Validé

---

## 1. Résumé exécutif

### 1.1 Problème à résoudre

{{PROBLEM_STATEMENT}}

### 1.2 Solution proposée

{{SOLUTION_SUMMARY}}

### 1.3 Métriques de succès

| Métrique | Objectif | Mesure |
|----------|----------|--------|
| {{METRIC_1}} | {{TARGET_1}} | {{HOW_1}} |
| {{METRIC_2}} | {{TARGET_2}} | {{HOW_2}} |

---

## 2. Contexte

### 2.1 Situation actuelle

{{CURRENT_SITUATION}}

### 2.2 Pourquoi maintenant ?

{{WHY_NOW}}

### 2.3 Risques de ne rien faire

- {{RISK_1}}
- {{RISK_2}}

---

## 3. Objectifs

### 3.1 Objectifs business

| # | Objectif | Priorité | KPI |
|---|----------|----------|-----|
| O1 | {{OBJECTIVE_1}} | P1 | {{KPI_1}} |
| O2 | {{OBJECTIVE_2}} | P2 | {{KPI_2}} |

### 3.2 Objectifs utilisateurs

| Persona | Objectif principal |
|---------|-------------------|
| {{PERSONA_1}} | {{USER_GOAL_1}} |
| {{PERSONA_2}} | {{USER_GOAL_2}} |

---

## 4. Périmètre

### 4.1 In Scope (MVP)

- [ ] {{FEATURE_1}}
- [ ] {{FEATURE_2}}
- [ ] {{FEATURE_3}}

### 4.2 Out of Scope (Phase 2+)

- {{FUTURE_1}}
- {{FUTURE_2}}

### 4.3 Hypothèses

| Hypothèse | Impact si fausse |
|-----------|-----------------|
| {{ASSUMPTION_1}} | {{IMPACT_1}} |

### 4.4 Contraintes

- **Budget** : {{BUDGET}}
- **Deadline** : {{DEADLINE}}
- **Techniques** : {{TECH_CONSTRAINTS}}
- **Légales** : {{LEGAL_CONSTRAINTS}}

---

## 5. Personas

Voir [personas.md](./personas.md) pour le détail.

| Persona | Description | Besoin principal |
|---------|-------------|------------------|
| {{PERSONA_1}} | {{DESC_1}} | {{NEED_1}} |

---

## 6. User Journeys (haut niveau)

### Journey 1 : {{JOURNEY_NAME}}

```
[Trigger] → [Action 1] → [Action 2] → [Résultat attendu]
```

---

## 7. Exigences fonctionnelles (haut niveau)

| ID | Exigence | Priorité | Epic |
|----|----------|----------|------|
| REQ-001 | {{REQUIREMENT_1}} | Must Have | E001 |
| REQ-002 | {{REQUIREMENT_2}} | Should Have | E002 |

Détail dans [02-requirements/](../02-requirements/)

---

## 8. Exigences non-fonctionnelles

### 8.1 Performance

- Temps de réponse : < {{RESPONSE_TIME}}
- Disponibilité : {{UPTIME}}%

### 8.2 Sécurité

- {{SECURITY_REQ_1}}
- {{SECURITY_REQ_2}}

### 8.3 Scalabilité

- Utilisateurs simultanés : {{CONCURRENT_USERS}}
- Volume de données : {{DATA_VOLUME}}

### 8.4 Accessibilité

- Niveau WCAG : {{WCAG_LEVEL}}

---

## 9. Timeline & Jalons

| Jalon | Date cible | Critères de succès |
|-------|------------|-------------------|
| Kick-off | {{DATE_1}} | PRD validé |
| MVP | {{DATE_2}} | Features core livrées |
| Launch | {{DATE_3}} | Production live |

---

## 10. Dépendances

| Dépendance | Type | Responsable | Statut |
|------------|------|-------------|--------|
| {{DEP_1}} | Externe/Interne | {{OWNER_1}} | {{STATUS_1}} |

---

## 11. Risques

| Risque | Probabilité | Impact | Mitigation |
|--------|-------------|--------|------------|
| {{RISK_1}} | Haute/Moyenne/Basse | Haut/Moyen/Bas | {{MITIGATION_1}} |

---

## 12. Approbations

| Rôle | Nom | Date | Signature |
|------|-----|------|-----------|
| Product Owner | {{PO}} | | ☐ |
| Tech Lead | {{TL}} | | ☐ |
| Client | {{CLIENT}} | | ☐ |

---

## Historique des modifications

| Version | Date | Auteur | Modifications |
|---------|------|--------|---------------|
| 1.0 | {{DATE}} | {{AUTHOR}} | Création initiale |
