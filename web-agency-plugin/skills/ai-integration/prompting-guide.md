# Prompt Engineering Guide

## Principes : spécifique, contextualisé, structuré, itératif

## Patterns

### Zero-Shot (tâches simples)
```
Tu es un expert SEO. Analyse ce titre et suggère 3 améliorations :
Titre : "{title}"
```

### Few-Shot (format précis)
```
Classifie le sentiment :
- "J'adore!" → positif | "Très déçu" → négatif | "Ça fait le job" → neutre
Classifie : "{text}" →
```

### Chain-of-Thought (raisonnement)
```
Résous étape par étape : 1) Identifie les éléments 2) Analyse 3) Conclus
```

### ReAct (actions)
```
Thought → Action: tool("query") → Observation → Answer
```

## Structure de Prompt

```typescript
const prompt = `## Rôle : ${role} expert en ${domain}
## Contexte : ${context}
## Tâche : ${task}
## Contraintes : ${constraints}
## Format de sortie : ${format}
## Entrée : ${input}`;
```

## Output Parsing (JSON)

```typescript
// OpenAI - Structured Output
import { zodResponseFormat } from 'openai/helpers/zod';
await openai.beta.chat.completions.parse({
  model: 'gpt-4o', response_format: zodResponseFormat(schema, 'result'),
  messages: [{ role: 'user', content: prompt }],
});
// Claude - instruction dans le prompt
`Réponds UNIQUEMENT en JSON : {"summary": "string", "score": number}`;
```

## Anti-Prompt Injection

```typescript
// Toujours séparer system (fiable) / user (non fiable)
const messages = [
  { role: 'system', content: systemPrompt },
  { role: 'user', content: sanitize(userInput) },
];
function sanitize(input: string): string {
  return input
    .replace(/ignore.*instructions/gi, '[FILTERED]')
    .replace(/system.*prompt/gi, '[FILTERED]')
    .slice(0, 10000);
}
```

## Guardrails

```typescript
function validateOutput(output: string, schema: z.ZodSchema) {
  try { return schema.parse(JSON.parse(output)); }
  catch { return null; } // Fallback ou retry
}
const BLOCKED = [/carte.*crédit/i, /mot.*passe/i];
const hasSensitive = (t: string) => BLOCKED.some(p => p.test(t));
```

## Tests (promptfoo)

```yaml
prompts: ["Résume en 3 points : {{text}}"]
providers: [openai:gpt-4o, anthropic:messages:claude-sonnet-4-20250514]
tests:
  - vars: { text: "..." }
    assert:
      - type: llm-rubric
        value: "Contient exactement 3 points"
      - type: cost
        threshold: 0.01
```

```bash
npx promptfoo eval && npx promptfoo view
```

## Optimisation Coûts

| Technique | Économie |
|-----------|----------|
| Prompt plus court | 20-50% |
| Modèle mini/haiku | 80-95% |
| Cache réponses | 50-90% |

## Checklist

- [ ] Rôle et contexte définis
- [ ] Format sortie spécifié
- [ ] Sanitization inputs utilisateur
- [ ] Validation output (schema)
- [ ] Guardrails contenu sensible
- [ ] Tests automatisés (promptfoo)
- [ ] Versioning des prompts
