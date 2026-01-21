# Execution Engine - Pattern REACT

Ce fichier définit comment un agent **exécute** une tâche de manière structurée.

---

## Le Pattern REACT

**R**easoning + **A**cting = REACT

Chaque agent suit un cycle itératif :

```
┌─────────────────────────────────────────┐
│                                         │
│   ┌─────────┐      ┌─────────┐         │
│   │ THOUGHT │ ───► │ ACTION  │         │
│   └─────────┘      └────┬────┘         │
│        ▲                │              │
│        │                ▼              │
│   ┌────┴──────┐   ┌───────────┐        │
│   │REFLECTION │◄──│OBSERVATION│        │
│   └───────────┘   └───────────┘        │
│        │                               │
│        ▼                               │
│   [continue | done | escalate]         │
│                                         │
└─────────────────────────────────────────┘
```

---

## Format de Sortie

### Pendant l'exécution

```yaml
step: [N]
thought: |
  [Analyse de la situation actuelle]
  [Ce que je sais / ce qui me manque]
  [Stratégie choisie]
action: [action_id]
action_input:
  [paramètres de l'action]
```

### Après observation

```yaml
observation: |
  [Résultat factuel de l'action]
reflection: |
  [Analyse du résultat]
  [Est-ce suffisant ?]
  [Prochaine étape logique]
decision: [continue | done | escalate]
reason: [justification courte]
```

---

## Actions Standard

Chaque agent peut utiliser ces actions de base :

| Action | Description | Input |
|--------|-------------|-------|
| `analyze` | Analyser des données/code | `{target, focus}` |
| `search` | Chercher dans le contexte | `{query, scope}` |
| `generate` | Produire du contenu | `{type, spec}` |
| `validate` | Vérifier une assertion | `{assertion, data}` |
| `transform` | Convertir un format | `{input, from, to}` |
| `compare` | Comparer deux éléments | `{a, b, criteria}` |
| `request_info` | Demander info manquante | `{question, context}` |
| `delegate` | Passer à un autre agent | `{agent_id, task}` |
| `escalate` | Remonter à l'humain | `{reason, context}` |

Les agents peuvent définir des actions spécifiques dans leur `REACT_CYCLE`.

---

## Règles d'Exécution

### 1. Maximum d'Itérations

```yaml
default_max_iterations: 5
on_max_reached: escalate
```

Un agent ne doit pas boucler indéfiniment. Après N itérations sans `done`, escalader.

### 2. Thought Obligatoire

**Jamais d'action sans thought préalable.**

```yaml
# INTERDIT
action: generate
action_input: {type: code}

# OBLIGATOIRE
thought: |
  L'utilisateur veut un composant React.
  Je dois générer un composant fonctionnel avec TypeScript.
action: generate
action_input: {type: code, spec: "React FC with TypeScript"}
```

### 3. Reflection Honnête

La reflection doit être **critique**, pas complaisante :

```yaml
# MAUVAIS
reflection: "Ça a bien marché, je continue."

# BON
reflection: |
  L'analyse a identifié 3 problèmes de sécurité.
  Cependant, je n'ai pas vérifié les dépendances.
  Je dois continuer avec une analyse des imports.
```

### 4. Escalation Proactive

Escalader **avant** de deviner :

```yaml
escalate_triggers:
  - Ambiguïté non résoluble par le contexte
  - Décision business/stratégique
  - Risque sécurité identifié
  - Conflit avec contraintes existantes
  - Information manquante critique
```

---

## Chain of Verification (CoVe)

Avant de produire l'output final, chaque agent DOIT vérifier :

```yaml
verification:
  completeness:
    question: "Ai-je répondu à TOUTES les exigences du contract.input ?"
    check: [liste des required inputs traités]

  consistency:
    question: "Mon output est-il cohérent avec le contexte fourni ?"
    check: [références au contexte utilisées]

  correctness:
    question: "Y a-t-il des erreurs factuelles ou logiques ?"
    check: [assertions vérifiées]

  constraints:
    question: "Mon output respecte-t-il TOUTES les contraintes ?"
    check: [contraintes du contract validées]
```

**Si une vérification échoue** → Réviser avant de soumettre.

---

## États de Sortie

| État | Signification | Action suivante |
|------|---------------|-----------------|
| `done` | Tâche complétée avec succès | Output final + handoff |
| `done_partial` | Tâche partiellement complétée | Output partiel + raison |
| `escalate` | Intervention humaine requise | Question/contexte pour humain |
| `delegate` | Autre agent requis | Handoff vers agent spécifié |
| `blocked` | Impossible de continuer | Raison du blocage |

---

## Exemple Complet

```yaml
# Itération 1
step: 1
thought: |
  On me demande d'auditer la sécurité de ce code JavaScript.
  Je vois un fichier de 50 lignes avec des appels API.
  Je commence par chercher les patterns dangereux courants.
action: analyze
action_input:
  target: code
  focus: security_patterns

---
observation: |
  Trouvé:
  - L.12: eval() avec variable
  - L.34: innerHTML sans sanitization
  - L.45: SQL string concatenation
reflection: |
  3 vulnérabilités critiques identifiées.
  Je dois maintenant vérifier s'il y a des protections ailleurs.
  Notamment: CSP headers, input validation, prepared statements.
decision: continue
reason: "Besoin de vérifier les mitigations possibles"

---
# Itération 2
step: 2
thought: |
  J'ai 3 vulnérabilités. Je cherche maintenant des mitigations.
  Si aucune mitigation, ce sont des criticals confirmés.
action: search
action_input:
  query: "sanitize|escape|prepared|CSP"
  scope: full_codebase

---
observation: |
  Aucune occurrence trouvée.
  Pas de fonction de sanitization.
  Pas de prepared statements.
reflection: |
  Aucune mitigation en place.
  Les 3 vulnérabilités sont confirmées critiques.
  J'ai assez d'information pour produire le rapport.
decision: done
reason: "Analyse complète, vulnérabilités confirmées"

---
# Verification
verification:
  completeness: ✓ Code analysé, vulnérabilités listées
  consistency: ✓ Lignes correspondent au code fourni
  correctness: ✓ Patterns reconnus sont bien des vulnérabilités
  constraints: ✓ Max issues respecté, suggestions fournies

---
# Output final
[Output selon contract.output.schema]
```

---

## Intégration avec les Agents

Dans chaque fichier `.agent.md`, la section `REACT_CYCLE` définit :

```markdown
## REACT_CYCLE

### Thoughts typiques
- [Question type 1 que l'agent se pose]
- [Question type 2]

### Actions spécifiques
- `action_specifique_1`: [description]
- `action_specifique_2`: [description]

### Critères de done
- [Condition 1 pour considérer la tâche finie]
- [Condition 2]

### Triggers d'escalation
- [Situation 1 qui nécessite escalation]
- [Situation 2]
```
