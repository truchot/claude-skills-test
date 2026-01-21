# Spécification : {{FEATURE_ID}} - {{FEATURE_TITLE}}

> **Epic** : [{{EPIC_ID}}](../../02-requirements/epics/{{EPIC_ID}}.md)
> **User Stories** : {{US_IDS}}
> **Date** : {{DATE}}
> **Auteur** : {{AUTHOR}}
> **Statut** : ⚪ Draft | 🟡 Review | 🟢 Validé

---

## 1. Résumé

{{SUMMARY}}

## 2. Contexte & Objectifs

### 2.1 Problème

{{PROBLEM}}

### 2.2 Objectifs

| Objectif | KPI | Target |
|----------|-----|--------|
| {{OBJ_1}} | {{KPI_1}} | {{TARGET_1}} |

### 2.3 Non-objectifs

- {{NON_GOAL_1}}
- {{NON_GOAL_2}}

## 3. User Stories couvertes

| ID | Story | Priorité |
|----|-------|----------|
| [US-001](../../02-requirements/user-stories/US-001.md) | {{US_1}} | Must |

## 4. Spécifications fonctionnelles

### 4.1 Parcours utilisateur

```
[Entry Point] → [Step 1] → [Step 2] → [Success]
                    ↓
               [Error handling]
```

### 4.2 Écrans / Interfaces

#### Écran 1 : {{SCREEN_1_NAME}}

**Description** : {{SCREEN_1_DESC}}

**Éléments** :
| Élément | Type | Comportement |
|---------|------|--------------|
| {{ELEM_1}} | Button | {{BEHAVIOR_1}} |
| {{ELEM_2}} | Input | {{BEHAVIOR_2}} |

**États** :
- Default : {{DEFAULT_STATE}}
- Loading : {{LOADING_STATE}}
- Success : {{SUCCESS_STATE}}
- Error : {{ERROR_STATE}}

**Maquette** : [Figma]({{FIGMA_URL}})

### 4.3 Règles métier

| # | Règle | Détail |
|---|-------|--------|
| R1 | {{RULE_1_NAME}} | {{RULE_1_DETAIL}} |
| R2 | {{RULE_2_NAME}} | {{RULE_2_DETAIL}} |

### 4.4 Validations

| Champ | Règle | Message d'erreur |
|-------|-------|------------------|
| {{FIELD_1}} | {{VALIDATION_1}} | "{{ERROR_MSG_1}}" |

### 4.5 Cas limites (Edge Cases)

| Cas | Comportement attendu |
|-----|---------------------|
| {{EDGE_1}} | {{BEHAVIOR_1}} |
| {{EDGE_2}} | {{BEHAVIOR_2}} |

## 5. Données

### 5.1 Entités impactées

| Entité | Action | Détail |
|--------|--------|--------|
| {{ENTITY_1}} | Create/Update/Delete | {{DETAIL_1}} |

### 5.2 Nouveaux champs

| Entité | Champ | Type | Description |
|--------|-------|------|-------------|
| {{ENTITY}} | {{FIELD}} | {{TYPE}} | {{DESC}} |

## 6. Intégrations

| Service | Action | Endpoint |
|---------|--------|----------|
| {{SERVICE_1}} | {{ACTION_1}} | {{ENDPOINT_1}} |

## 7. Sécurité & Permissions

| Action | Rôles autorisés | Condition |
|--------|-----------------|-----------|
| {{ACTION_1}} | admin, user | {{CONDITION_1}} |

## 8. Performance

| Métrique | Target |
|----------|--------|
| Temps de réponse | < {{RESPONSE_TIME}} |
| Taille payload | < {{PAYLOAD_SIZE}} |

## 9. Analytics & Tracking

| Événement | Trigger | Données |
|-----------|---------|---------|
| {{EVENT_1}} | {{TRIGGER_1}} | {{DATA_1}} |

## 10. Critères d'acceptation

- [ ] {{CRITERION_1}}
- [ ] {{CRITERION_2}}
- [ ] {{CRITERION_3}}
- [ ] Tests unitaires passants
- [ ] Tests E2E passants
- [ ] Code review effectuée

## 11. Questions ouvertes

| # | Question | Réponse | Date |
|---|----------|---------|------|
| Q1 | {{QUESTION_1}} | {{ANSWER_1}} | {{DATE_1}} |

## 12. Hors scope

- {{OUT_1}}
- {{OUT_2}}

---

## Approbations

| Rôle | Nom | Date | Statut |
|------|-----|------|--------|
| Product | {{PO}} | | ☐ |
| Tech Lead | {{TL}} | | ☐ |
| Client | {{CLIENT}} | | ☐ |

---

## Historique

| Version | Date | Auteur | Modifications |
|---------|------|--------|---------------|
| 1.0 | {{DATE}} | {{AUTHOR}} | Création |
