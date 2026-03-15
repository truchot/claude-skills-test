# Prompt Engineering Guide

## Principes Fondamentaux

1. **Être spécifique** : instructions claires, rôle, contraintes, format attendu
2. **Donner du contexte** : domaine, audience, exemples
3. **Structurer** : sections, délimiteurs, output format
4. **Itérer** : tester, mesurer, affiner

## Patterns de Prompting

### Zero-Shot (tâches simples)
```
Tu es un expert SEO. Analyse ce titre et suggère 3 améliorations :
Titre : "{title}"
Pour chaque suggestion, explique l'impact SEO.
```

### Few-Shot (format précis)
```
Classifie le sentiment :
- "J'adore ce produit!" → positif
- "Très déçu, ne fonctionne pas" → négatif
- "Ça fait le job" → neutre

Maintenant classifie : "{text}" →
```

### Chain-of-Thought (raisonnement)
```
Résous ce problème étape par étape :
1. Identifie les éléments clés
2. Analyse les relations
3. Tire une conclusion

Problème : {problem}
```

### ReAct (actions + raisonnement)
```
Thought: Je dois chercher l'information X
Action: search("query")
Observation: [résultat]
Thought: Maintenant je peux répondre
Answer: [réponse]
```

## Structure de Prompt Efficace

```typescript
const prompt = `
## Rôle
Tu es un ${role} expert en ${domain}.

## Contexte
${context}

## Tâche
${task}

## Contraintes
- ${constraint1}
- ${constraint2}

## Format de sortie
${outputFormat}

## Entrée
${input}
`;
```

## Output Parsing (JSON Mode)

```typescript
// OpenAI - Structured Output
const result = await openai.beta.chat.completions.parse({
  model: 'gpt-4o',
  response_format: zodResponseFormat(schema, 'result'),
  messages: [{ role: 'user', content: prompt }],
});

// Claude - Via instruction dans le prompt
const prompt = `Réponds UNIQUEMENT en JSON valide avec ce format :
{"summary": "string", "score": number, "tags": ["string"]}

Analyse : ${text}`;
```

## Anti-Prompt Injection

```typescript
// Séparer system/user
const messages = [
  { role: 'system', content: systemPrompt },  // Instructions fiables
  { role: 'user', content: sanitize(userInput) },  // Input non fiable
];

// Sanitization
function sanitize(input: string): string {
  return input
    .replace(/ignore.*instructions/gi, '[FILTERED]')
    .replace(/system.*prompt/gi, '[FILTERED]')
    .slice(0, 10000);  // Limiter la taille
}
```

## Guardrails

```typescript
// Validation output
function validateLLMOutput(output: string, schema: z.ZodSchema) {
  try {
    return schema.parse(JSON.parse(output));
  } catch {
    return null;  // Fallback ou retry
  }
}

// Content filtering
const BLOCKED_PATTERNS = [/carte.*crédit/i, /mot.*passe/i, /numéro.*sécu/i];
function filterSensitive(text: string): boolean {
  return BLOCKED_PATTERNS.some(p => p.test(text));
}
```

## Tests de Prompts (promptfoo)

```yaml
# promptfooconfig.yaml
prompts:
  - "Résume ce texte en 3 points : {{text}}"
  - "En tant qu'expert, fais un résumé en 3 bullets : {{text}}"
providers:
  - openai:gpt-4o
  - anthropic:messages:claude-sonnet-4-20250514
tests:
  - vars: { text: "Lorem ipsum..." }
    assert:
      - type: contains
        value: "point clé"
      - type: llm-rubric
        value: "La réponse contient exactement 3 points"
      - type: cost
        threshold: 0.01
```

```bash
npx promptfoo eval    # Lancer les tests
npx promptfoo view    # Voir les résultats
```

## Checklist Prompt Production

- [ ] Rôle et contexte définis clairement
- [ ] Format de sortie spécifié (JSON, markdown, etc.)
- [ ] Few-shot examples si format complexe
- [ ] Sanitization des inputs utilisateur
- [ ] Validation du output (schema, type)
- [ ] Guardrails contre contenu sensible
- [ ] Tests automatisés (promptfoo ou équivalent)
- [ ] Versioning des prompts (git, template engine)
- [ ] Monitoring qualité en production

## Optimisation Coûts

| Technique | Économie | Impact qualité |
|-----------|----------|----------------|
| Prompt plus court | 20-50% | Faible si bien fait |
| Modèle plus petit (mini/haiku) | 80-95% | Moyen |
| Cache réponses identiques | 50-90% | Aucun |
| Batch processing | 20-30% | Aucun |
