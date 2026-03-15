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

## Sécurité & Guardrails

```typescript
// Séparer system (fiable) / user (non fiable)
const messages = [
  { role: 'system', content: systemPrompt },
  { role: 'user', content: input.replace(/ignore.*instructions/gi, '[FILTERED]').slice(0, 10000) },
];
// Validation output
function validate(output: string, schema: z.ZodSchema) {
  try { return schema.parse(JSON.parse(output)); } catch { return null; }
}
```

## Tests (promptfoo)

```yaml
prompts: ["Résume en 3 points : {{text}}"]
providers: [openai:gpt-4o, anthropic:messages:claude-sonnet-4-20250514]
tests:
  - vars: { text: "..." }
    assert: [{ type: llm-rubric, value: "3 points" }, { type: cost, threshold: 0.01 }]
```

## Checklist

- [ ] Rôle/contexte/format définis, few-shot si complexe
- [ ] Sanitization inputs, validation output (schema)
- [ ] Tests automatisés (promptfoo), versioning prompts
- [ ] Coûts : prompt court, modèle mini/haiku (-80%), cache (-50%)
