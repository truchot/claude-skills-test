# RAG Patterns & Vector Databases

## Architecture RAG Standard

```
Documents → Chunking → Embeddings → Vector DB
                                        ↓
User Query → Embedding → Similarity Search → Context
                                                ↓
                              LLM ← Prompt(Context + Query) → Response
```

## Pipeline d'Ingestion

```typescript
// 1. Charger les documents
const loader = new PDFLoader('doc.pdf');
const docs = await loader.load();

// 2. Découper en chunks
const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1000, chunkOverlap: 200,
});
const chunks = await splitter.splitDocuments(docs);

// 3. Générer embeddings + stocker
const embeddings = new OpenAIEmbeddings({ model: 'text-embedding-3-small' });
await PGVectorStore.fromDocuments(chunks, embeddings, {
  postgresConnectionOptions: { connectionString: process.env.DATABASE_URL },
  tableName: 'documents',
});
```

## pgvector (PostgreSQL)

```sql
CREATE EXTENSION vector;
CREATE TABLE documents (
  id SERIAL PRIMARY KEY,
  content TEXT,
  metadata JSONB,
  embedding vector(1536)
);
CREATE INDEX ON documents USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);

-- Recherche similarité
SELECT content, 1 - (embedding <=> $1) AS similarity
FROM documents ORDER BY embedding <=> $1 LIMIT 5;
```

## Stratégies de Chunking

| Stratégie | Taille | Overlap | Usage |
|-----------|--------|---------|-------|
| Recursive | 500-1000 | 100-200 | General purpose |
| Semantic | Variable | N/A | Contenu structuré |
| Token-based | 256-512 tokens | 50 | Précision LLM |
| Par paragraphe | Variable | 0 | Docs bien structurés |

## Patterns RAG Avancés

| Pattern | Description | Quand utiliser |
|---------|-------------|----------------|
| **HyDE** | Générer doc hypothétique, chercher par similarité | Queries vagues |
| **CRAG** | Vérifier pertinence, web search si insuffisant | Fiabilité critique |
| **Agentic RAG** | Agent décide quand/comment chercher | Queries complexes |
| **Hybrid Search** | Combinaison vectoriel + BM25/full-text | Meilleur recall |
| **Reranking** | Cross-encoder pour re-classer les résultats | Précision critique |

## Hybrid Search (pgvector + full-text)

```typescript
const results = await db.query(`
  SELECT content,
    (0.7 * (1 - (embedding <=> $1))) +
    (0.3 * ts_rank(to_tsvector('french', content), plainto_tsquery('french', $2)))
    AS score
  FROM documents
  ORDER BY score DESC LIMIT 5
`, [queryEmbedding, queryText]);
```

## Évaluation RAG (RAGAS)

| Métrique | Mesure | Seuil |
|----------|--------|-------|
| Faithfulness | Réponse fidèle au contexte | > 0.8 |
| Answer Relevancy | Réponse pertinente à la question | > 0.8 |
| Context Precision | Chunks pertinents récupérés | > 0.7 |
| Context Recall | Tous les éléments nécessaires trouvés | > 0.7 |

## Checklist RAG Production

- [ ] Chunking adapté au contenu (tester plusieurs tailles)
- [ ] Index vectoriel optimisé (IVFFlat ou HNSW)
- [ ] Hybrid search si contenu mixte
- [ ] Metadata filtering pour scoper les recherches
- [ ] Cache des embeddings (ne changent pas)
- [ ] Monitoring : latence retrieval, pertinence, hallucinations
- [ ] Pipeline de mise à jour incrémentale des documents
- [ ] Tests de régression sur les réponses critiques

## Providers Embeddings

| Provider | Modèle | Dimensions | Coût/1M tokens |
|----------|--------|-----------|----------------|
| OpenAI | text-embedding-3-small | 1536 | $0.02 |
| OpenAI | text-embedding-3-large | 3072 | $0.13 |
| Mistral | mistral-embed | 1024 | $0.10 |
| Local | all-MiniLM-L6-v2 | 384 | Gratuit |
