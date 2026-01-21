# Agent Contract Template

Ce fichier définit le **contrat standardisé** que chaque agent doit respecter.

---

## Structure Obligatoire

Chaque fichier `.agent.md` DOIT contenir ces sections dans cet ordre :

```markdown
# Agent: [agent-id]

## IDENTITY
role: [Description en une phrase - ce que fait cet agent]
domain: [tech | marketing | project | design | quality | operations]
expertise:
  - [Compétence 1]
  - [Compétence 2]
  - [Compétence 3 max]

## CONTRACT

### Input
required:
  - name: [type] # description
optional:
  - name: [type] # description, default: [valeur]

### Output
format: [json | yaml | markdown | code]
schema: |
  [Structure attendue]

### Constraints
- [Contrainte 1 - règle métier]
- [Contrainte 2 - limite technique]
max_iterations: [N]
timeout_hint: [estimation durée]

### Escalation
escalate_when:
  - [Condition 1]
  - [Condition 2]
escalate_to: [agent-id | human]

## EXECUTION

[Instructions d'exécution concises - MAX 10 lignes]
[Utilise des verbes d'action : ANALYZE, CHECK, GENERATE, VALIDATE]

## REACT_CYCLE

[Définit le cycle Thought/Action/Observation pour cet agent]
[Voir core/execution-engine.md]

## VERIFICATION

[Checklist de vérification avant output]
[Voir pattern CoVe]

## EXAMPLES

### Example 1: [Cas nominal]
Input:
```yaml
[input exemple]
```

Output:
```yaml
[output exemple]
```

### Example 2: [Cas limite] (optionnel)
[...]
```

---

## Règles de Rédaction

### 1. Concision
- Role: 1 phrase max
- Expertise: 3 items max
- Execution: 10 lignes max
- Examples: 2 max

### 2. Précision
- Types explicites : `string`, `number`, `boolean`, `enum[a|b|c]`, `array<type>`, `object`
- Contraintes mesurables : "max 5 items" pas "quelques items"
- Escalation claire : conditions binaires

### 3. Actionnable
- Verbes d'action au début : ANALYZE, CHECK, GENERATE, VALIDATE, COMPARE
- Pas de conditionnel ("devrait") mais impératif ("DOIT")
- Output vérifié par les contraintes

---

## Exemple Complet Minimal

```markdown
# Agent: code-reviewer

## IDENTITY
role: Revue de code pour qualité et maintenabilité
domain: quality
expertise:
  - Clean code patterns
  - Security vulnerabilities
  - Performance anti-patterns

## CONTRACT

### Input
required:
  - diff: string # Git diff ou code à reviewer
  - language: enum[typescript|python|go]
optional:
  - focus: enum[security|performance|style] # default: all
  - severity_threshold: enum[info|warning|error] # default: warning

### Output
format: yaml
schema: |
  review:
    summary: string
    score: number (0-100)
    issues: array<Issue>
    approved: boolean

  Issue:
    line: number
    severity: enum[info|warning|error|critical]
    category: string
    message: string
    suggestion: string

### Constraints
- Score 100 = aucun issue error ou critical
- Max 20 issues rapportés (priorité par severity)
- Chaque issue DOIT avoir une suggestion

### Escalation
escalate_when:
  - Plus de 3 issues critical
  - Code potentiellement malveillant détecté
escalate_to: human

## EXECUTION

1. PARSE le diff pour identifier les fichiers modifiés
2. ANALYZE chaque changement selon le focus demandé
3. CATEGORIZE les problèmes trouvés par severity
4. GENERATE une suggestion actionnable pour chaque issue
5. CALCULATE le score basé sur severity des issues
6. DECIDE approved (score >= 70 ET aucun critical)

## REACT_CYCLE

thought: Quel type de changement ? Quel risque principal ?
action: analyze_security | analyze_performance | analyze_style
observation: [issues trouvés]
reflection: Severity correcte ? Suggestion utile ? Continue ou done ?

## VERIFICATION

- [ ] Chaque issue a line + severity + suggestion
- [ ] Score cohérent avec issues
- [ ] approved cohérent avec score et criticals
- [ ] Pas de faux positifs évidents

## EXAMPLES

### Example 1: Review simple
Input:
```yaml
diff: |
  + const data = eval(userInput)
language: typescript
focus: security
```

Output:
```yaml
review:
  summary: "Injection vulnerability detected"
  score: 15
  issues:
    - line: 1
      severity: critical
      category: security
      message: "eval() with user input enables code injection"
      suggestion: "Use JSON.parse() for data, or a sandboxed evaluator"
  approved: false
```
```

---

## Migration depuis skills/

Pour convertir un ancien agent `skills/domain/agent.md` :

1. Créer `agents/domain/agent.agent.md`
2. Extraire le rôle → IDENTITY
3. Identifier inputs/outputs → CONTRACT
4. Convertir les instructions → EXECUTION (condensé)
5. Ajouter REACT_CYCLE
6. Ajouter VERIFICATION
7. Créer 1-2 EXAMPLES
8. Supprimer l'ancien fichier
