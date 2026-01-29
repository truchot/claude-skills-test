# Session IA : {{SESSION_ID}}

> **Date** : {{DATE}}
> **Durée** : {{DURATION}}
> **Workflow** : {{WORKFLOW_NAME}}
> **Statut** : 🟢 Complété | 🟡 En cours | 🔴 Abandonné

---

## Contexte

### Demande initiale

> {{INITIAL_REQUEST}}

### Objectif

{{OBJECTIVE}}

---

## Agents impliqués

| # | Agent | Rôle | Durée | Statut |
|---|-------|------|-------|--------|
| 1 | `{{AGENT_1}}` | {{ROLE_1}} | {{DURATION_1}} | ✅ |
| 2 | `{{AGENT_2}}` | {{ROLE_2}} | {{DURATION_2}} | ✅ |
| 3 | `{{AGENT_3}}` | {{ROLE_3}} | {{DURATION_3}} | 🟡 |

---

## Déroulement

### Étape 1 : {{STEP_1_NAME}}

**Agent** : `{{AGENT_1}}`
**Heure** : {{TIME_1}}

**Input** :
```
{{INPUT_1}}
```

**Output** :
```
{{OUTPUT_1}}
```

**Décisions prises** :
- {{DECISION_1}}

---

### Étape 2 : {{STEP_2_NAME}}

**Agent** : `{{AGENT_2}}`
**Heure** : {{TIME_2}}

**Input** :
```
{{INPUT_2}}
```

**Output** :
```
{{OUTPUT_2}}
```

---

### 🔴 Gate : {{GATE_NAME}}

**Type** : BLOQUANTE
**Heure** : {{GATE_TIME}}

**Question posée** :
> {{GATE_QUESTION}}

**Réponse utilisateur** :
> {{USER_RESPONSE}}

**Résultat** : ✅ Validé / ❌ Rejeté / 🔄 Ajustements demandés

---

## Livrables produits

| # | Livrable | Fichier | Agent |
|---|----------|---------|-------|
| 1 | {{DELIVERABLE_1}} | [Lien](./deliverables/{{FILE_1}}) | `{{AGENT}}` |
| 2 | {{DELIVERABLE_2}} | [Lien](./deliverables/{{FILE_2}}) | `{{AGENT}}` |

---

## Décisions documentées

| # | Décision | Contexte | Décideur |
|---|----------|----------|----------|
| 1 | {{DECISION_1}} | {{CONTEXT_1}} | {{DECIDER_1}} |
| 2 | {{DECISION_2}} | {{CONTEXT_2}} | Utilisateur |

---

## Interactions humaines

| Heure | Type | Contenu |
|-------|------|---------|
| {{TIME}} | Gate | {{CONTENT}} |
| {{TIME}} | Question | {{CONTENT}} |
| {{TIME}} | Validation | {{CONTENT}} |

---

## Métriques

| Métrique | Valeur |
|----------|--------|
| Tokens input | {{INPUT_TOKENS}} |
| Tokens output | {{OUTPUT_TOKENS}} |
| Coût estimé | {{COST}} |
| Temps total | {{TOTAL_TIME}} |

---

## Issues rencontrées

| Issue | Résolution |
|-------|------------|
| {{ISSUE_1}} | {{RESOLUTION_1}} |

---

## Prochaines actions

- [ ] {{NEXT_ACTION_1}}
- [ ] {{NEXT_ACTION_2}}

---

## Notes

{{NOTES}}

---

## Fichiers associés

```
sessions/{{SESSION_ID}}/
├── session.md          # Ce fichier
├── deliverables/       # Livrables produits
│   ├── {{FILE_1}}
│   └── {{FILE_2}}
├── decisions.md        # Décisions détaillées
└── raw-logs/           # Logs bruts (si nécessaire)
```
