# User Story : {{US_ID}} - {{US_TITLE}}

> **Epic** : [{{EPIC_ID}}](../epics/{{EPIC_ID}}.md)
> **Créé le** : {{DATE}}
> **Priorité** : Must Have | Should Have | Could Have
> **Estimation** : {{POINTS}} points
> **Statut** : ⚪ Backlog | 🔵 Ready | 🟡 In Progress | 🟣 Review | ✅ Done | 🔴 Blocked

---

## User Story

> En tant que **{{PERSONA}}**,
> je veux **{{ACTION}}**
> afin de **{{BENEFIT}}**

## Contexte

{{CONTEXT}}

## Critères d'acceptation

### Scénario 1 : {{SCENARIO_1_NAME}}

```gherkin
Given {{GIVEN_1}}
When {{WHEN_1}}
Then {{THEN_1}}
```

### Scénario 2 : {{SCENARIO_2_NAME}}

```gherkin
Given {{GIVEN_2}}
When {{WHEN_2}}
Then {{THEN_2}}
```

### Cas d'erreur

```gherkin
Given {{GIVEN_ERROR}}
When {{WHEN_ERROR}}
Then {{THEN_ERROR}}
```

## Règles métier

- {{RULE_1}}
- {{RULE_2}}

## UI/UX

### Maquettes

- [Desktop]({{FIGMA_DESKTOP}})
- [Mobile]({{FIGMA_MOBILE}})

### Composants UI

- {{COMPONENT_1}}
- {{COMPONENT_2}}

## Données

### Input

| Champ | Type | Obligatoire | Validation |
|-------|------|-------------|------------|
| {{FIELD_1}} | {{TYPE_1}} | Oui/Non | {{VALIDATION_1}} |

### Output

| Donnée | Format |
|--------|--------|
| {{OUTPUT_1}} | {{FORMAT_1}} |

## Technique

### Endpoints concernés

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/{{RESOURCE}}` | {{ENDPOINT_DESC}} |

### Modifications DB

- {{DB_CHANGE_1}}

## Découpage en tâches

| # | Tâche | Effort | Assigné | Statut |
|---|-------|--------|---------|--------|
| 1 | {{TASK_1}} | {{EFFORT_1}} | {{ASSIGNEE_1}} | ⚪ |
| 2 | {{TASK_2}} | {{EFFORT_2}} | {{ASSIGNEE_2}} | ⚪ |
| 3 | Tests unitaires | {{EFFORT_3}} | {{ASSIGNEE_3}} | ⚪ |
| 4 | Tests E2E | {{EFFORT_4}} | {{ASSIGNEE_4}} | ⚪ |

## Dépendances

| Type | Dépendance | Statut |
|------|------------|--------|
| Bloque | {{BLOCKS}} | - |
| Bloqué par | {{BLOCKED_BY}} | - |

## Questions ouvertes

- [ ] {{QUESTION_1}}
- [x] {{QUESTION_2}} → Réponse : {{ANSWER_2}}

## Notes

{{NOTES}}

---

## Historique

| Date | Événement | Par |
|------|-----------|-----|
| {{DATE}} | Création | {{AUTHOR}} |
| {{DATE}} | Passage en Ready | {{AUTHOR}} |
| {{DATE}} | Début implémentation | {{DEV}} |
