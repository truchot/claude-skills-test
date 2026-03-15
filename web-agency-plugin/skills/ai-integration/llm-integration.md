# LLM Integration Guide

## Choix du Provider

| Critère | OpenAI GPT-4o | Claude Sonnet | Mistral | Ollama |
|---------|---------------|---------------|---------|--------|
| Coût input/1M | $2.50 | $3 | $2 | Gratuit |
| Context | 128k | 200k | 32k | Variable |
| Privacy | Cloud US | Cloud US | Cloud EU | Total |

**Règle** : mini/haiku pour tâches simples, GPT-4o/Sonnet pour complexe.

## Setup OpenAI

```typescript
import OpenAI from 'openai';
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY, maxRetries: 3 });
// Streaming
const stream = await openai.chat.completions.create({
  model: 'gpt-4o', stream: true,
  messages: [{ role: 'user', content: prompt }],
});
for await (const chunk of stream) {
  process.stdout.write(chunk.choices[0]?.delta?.content || '');
}
// Structured Output
import { zodResponseFormat } from 'openai/helpers/zod';
const result = await openai.beta.chat.completions.parse({
  model: 'gpt-4o', response_format: zodResponseFormat(Schema, 'result'),
  messages: [{ role: 'user', content: input }],
});
```

## Setup Claude (Anthropic)

```typescript
import Anthropic from '@anthropic-ai/sdk';
const anthropic = new Anthropic();
// Streaming
const stream = await anthropic.messages.stream({
  model: 'claude-sonnet-4-20250514', max_tokens: 1024,
  messages: [{ role: 'user', content: prompt }],
});
stream.on('text', (text) => process.stdout.write(text));
// Tool Use
const response = await anthropic.messages.create({
  model: 'claude-sonnet-4-20250514', max_tokens: 1024,
  tools: [{ name: 'fn', description: '...', input_schema: {...} }],
  messages: [{ role: 'user', content: query }],
});
```

## Next.js (Vercel AI SDK)

```typescript
// app/api/chat/route.ts
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
export async function POST(req: Request) {
  const { messages } = await req.json();
  return streamText({ model: openai('gpt-4o'), messages }).toDataStreamResponse();
}
```

## LangChain Multi-Provider

```typescript
const chain = ChatPromptTemplate
  .fromMessages([['system', 'Expert {domain}.'], ['user', '{question}']])
  .pipe(model)  // ChatOpenAI | ChatAnthropic | ChatMistralAI
  .pipe(new StringOutputParser());
```

## Error Handling

```typescript
try { await llmCall(); }
catch (e) {
  if (e.status === 429) { /* Rate limited - backoff */ }
  if (e.status === 401) { /* API key invalide */ }
  if (e.status >= 500) { /* Retry */ }
}
```

## MLOps & Monitoring

| Outil | Usage |
|-------|-------|
| LangSmith | Tracing LangChain |
| Helicone | Monitoring OpenAI, coûts |
| promptfoo | Tests automatisés prompts |

## Checklist Production

- [ ] API keys en env vars, jamais en code
- [ ] Streaming activé, error handling + retry backoff + timeout 30s
- [ ] Rate limiting côté client, cache embeddings/réponses stables
- [ ] Monitoring coûts/latence, tests régression prompts critiques
