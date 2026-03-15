# RAG Patterns & Vector Databases

## Architecture RAG

```
Documents → Chunking → Embeddings → Vector DB → Similarity Search
User Query → Embedding ────────────────────────↗ → Context + Query → LLM → Response
```

## Pipeline d'Ingestion

```typescript
const docs = await new PDFLoader('doc.pdf').load();
const chunks = await new RecursiveCharacterTextSplitter({
  chunkSize: 1000, chunkOverlap: 200,
}).splitDocuments(docs);
await PGVectorStore.fromDocuments(chunks,
  new OpenAIEmbeddings({ model: 'text-embedding-3-small' }),
  { postgresConnectionOptions: { connectionString: process.env.DATABASE_URL } }
);
```

## pgvector (PostgreSQL)

```sql
CREATE EXTENSION vector;
CREATE TABLE documents (
  id SERIAL PRIMARY KEY, content TEXT, metadata JSONB,
  embedding vector(1536)
);
CREATE INDEX ON documents USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);
SELECT content, 1 - (embedding <=> $1) AS similarity
FROM documents ORDER BY embedding <=> $1 LIMIT 5;
```

## Stratégies de Chunking

| Stratégie | Taille | Usage |
|-----------|--------|-------|
| Recursive | 500-1000 chars, overlap 100-200 | General purpose |
| Semantic | Variable | Contenu structuré |
| Token-based | 256-512 tokens | Précision LLM |

## Patterns RAG Avancés

| Pattern | Description | Quand |
|---------|-------------|-------|
| **HyDE** | Générer doc hypothétique puis chercher | Queries vagues |
| **CRAG** | Vérifier pertinence, web fallback | Fiabilité critique |
| **Hybrid Search** | Vectoriel + BM25/full-text combinés | Meilleur recall |
| **Reranking** | Cross-encoder pour re-classer résultats | Précision critique |
| **Agentic RAG** | Agent décide quand/comment chercher | Queries complexes |

## Hybrid Search (vectoriel + full-text)

```typescript
const results = await db.query(`
  SELECT content,
    (0.7 * (1 - (embedding <=> $1))) +
    (0.3 * ts_rank(to_tsvector('french', content), plainto_tsquery('french', $2)))
    AS score FROM documents ORDER BY score DESC LIMIT 5
`, [queryEmbedding, queryText]);
```

## Évaluation RAG (RAGAS)

| Métrique | Mesure | Seuil |
|----------|--------|-------|
| Faithfulness | Réponse fidèle au contexte | > 0.8 |
| Answer Relevancy | Pertinence vs question | > 0.8 |
| Context Precision | Chunks pertinents récupérés | > 0.7 |
| Context Recall | Éléments nécessaires trouvés | > 0.7 |

## Providers Embeddings

| Provider | Modèle | Dims | Coût/1M |
|----------|--------|------|---------|
| OpenAI | text-embedding-3-small | 1536 | $0.02 |
| OpenAI | text-embedding-3-large | 3072 | $0.13 |
| Mistral | mistral-embed | 1024 | $0.10 |
| Local | all-MiniLM-L6-v2 | 384 | Gratuit |

## Checklist RAG Production

- [ ] Chunking testé (plusieurs tailles comparées)
- [ ] Index vectoriel optimisé (IVFFlat ou HNSW)
- [ ] Hybrid search si contenu mixte
- [ ] Metadata filtering pour scoper les recherches
- [ ] Cache des embeddings
- [ ] Monitoring : latence, pertinence, hallucinations
- [ ] Pipeline de mise à jour incrémentale
- [ ] Tests de régression sur réponses critiques
