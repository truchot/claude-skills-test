# LLM Integration Guide

## Choix du Provider

| Critère | OpenAI (GPT-4o) | Claude (Sonnet) | Mistral | Ollama (Local) |
|---------|-----------------|-----------------|---------|----------------|
| Qualité | Top | Top | Très bon | Variable |
| Coût input/1M | $2.50 | $3 | $2 | Gratuit |
| Context | 128k | 200k | 32k | Variable |
| Privacy | Cloud US | Cloud US | Cloud EU | Total |
| Latence | Moyenne | Moyenne | Rapide | Variable |

**Règle** : GPT-4o-mini ou Haiku pour tâches simples, GPT-4o/Sonnet pour complexe.

## Setup OpenAI

```typescript
import OpenAI from 'openai';
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY, maxRetries: 3 });

// Chat + Streaming
const stream = await openai.chat.completions.create({
  model: 'gpt-4o', stream: true,
  messages: [{ role: 'user', content: prompt }],
});
for await (const chunk of stream) {
  process.stdout.write(chunk.choices[0]?.delta?.content || '');
}

// Structured Output (JSON)
import { zodResponseFormat } from 'openai/helpers/zod';
const result = await openai.beta.chat.completions.parse({
  model: 'gpt-4o', response_format: zodResponseFormat(MySchema, 'result'),
  messages: [{ role: 'user', content: input }],
});
```

## Setup Claude (Anthropic)

```typescript
import Anthropic from '@anthropic-ai/sdk';
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// Chat + Streaming
const stream = await anthropic.messages.stream({
  model: 'claude-sonnet-4-20250514', max_tokens: 1024,
  system: 'Tu es un expert web.',
  messages: [{ role: 'user', content: prompt }],
});
stream.on('text', (text) => process.stdout.write(text));

// Tool Use (Function Calling)
const response = await anthropic.messages.create({
  model: 'claude-sonnet-4-20250514', max_tokens: 1024,
  tools: [{ name: 'get_data', description: '...', input_schema: {...} }],
  messages: [{ role: 'user', content: query }],
});
```

## Next.js App Router (Vercel AI SDK)

```typescript
// app/api/chat/route.ts
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export async function POST(req: Request) {
  const { messages } = await req.json();
  const result = streamText({ model: openai('gpt-4o'), messages });
  return result.toDataStreamResponse();
}
```

## LangChain Multi-Provider

```typescript
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';

const chain = ChatPromptTemplate
  .fromMessages([['system', 'Expert en {domain}.'], ['user', '{question}']])
  .pipe(model)  // Swap: ChatOpenAI, ChatAnthropic, ChatMistralAI
  .pipe(new StringOutputParser());
```

## Error Handling Pattern

```typescript
try {
  const response = await llmCall();
} catch (error) {
  if (error.status === 429) { /* Rate limited - backoff */ }
  else if (error.status === 401) { /* API key invalide */ }
  else if (error.status >= 500) { /* Retry */ }
}
```

## Sécurité & Coûts

- [ ] API keys dans env vars (.env + .gitignore), jamais en code
- [ ] Rate limiting côté client (token bucket ou sliding window)
- [ ] Estimer coût avant chaque appel (`tokens * price_per_token`)
- [ ] Logger tous les appels LLM (tokens, coût, latence)
- [ ] Cacher les réponses déterministes (embeddings, classifications)
- [ ] Timeout sur chaque appel (30s max recommandé)

## MLOps & Monitoring

| Outil | Usage |
|-------|-------|
| LangSmith | Tracing LangChain, debug chains |
| Helicone | Monitoring OpenAI, dashboard coûts |
| Weights & Biases | Experiment tracking, fine-tuning |
| promptfoo | Tests automatisés de prompts |

## Checklist Production

- [ ] Provider choisi selon contraintes (coût, privacy, qualité)
- [ ] Streaming activé pour UX réactive
- [ ] Error handling + retry avec backoff
- [ ] Monitoring coûts et latence
- [ ] Cache intelligent (embeddings, réponses stables)
- [ ] Rate limiting en place
- [ ] Tests de régression sur prompts critiques
