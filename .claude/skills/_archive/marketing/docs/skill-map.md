# Marketing Skill - Visual Map

Carte visuelle du skill marketing et de ses interactions.

## Architecture Globale

```mermaid
flowchart TB
    subgraph Marketing["🎯 MARKETING SKILL (74 agents)"]
        direction TB

        subgraph L1["NIVEAU 1: POURQUOI"]
            STRAT[strategie/]
        end

        subgraph L2["NIVEAU 2: QUOI"]
            CAMP[campagnes/]
        end

        subgraph L3["NIVEAU 3: COMMENT"]
            CONT[content/]
            ACQ[acquisition/]
            ANA[analytics/]
        end

        L1 --> L2
        L2 --> L3
    end
```

## Détail des Domaines

```mermaid
flowchart LR
    subgraph Strategie["strategie/ (5)"]
        S1[market-analysis]
        S2[persona-definition]
        S3[brand-positioning]
        S4[objectifs-marketing]
    end

    subgraph Campagnes["campagnes/ (5)"]
        C1[planning-campagne]
        C2[budget-allocation]
        C3[coordination-canaux]
        C4[suivi-performance]
    end

    subgraph Content["content/ (5)"]
        CO1[copywriting]
        CO2[blog-articles]
        CO3[social-media-content]
        CO4[landing-pages]
    end

    subgraph Analytics["analytics/ (5)"]
        A1[kpi-tracking]
        A2[reporting]
        A3[attribution]
        A4[ab-testing]
    end
```

## Structure SEO (49 agents)

```mermaid
flowchart TB
    subgraph SEO["acquisition/seo/"]
        direction TB

        SEO_ORCH[orchestrator v4.0.0]

        subgraph Triptyque["TRIPTYQUE FONDAMENTAL"]
            direction LR
            STRAT_SEO[strategie/]
            TECH[technique/]
            CONTENU[contenu/]
        end

        subgraph Support["SUPPORT"]
            direction LR
            NET[netlinking/]
            PIL[pilotage/]
        end

        subgraph Specialized["SPÉCIALISÉ"]
            direction LR
            GEO[geo/]
            LOCAL[local/]
            ECOM[ecommerce/]
            INTL[international/]
        end

        SEO_ORCH --> Triptyque
        SEO_ORCH --> Support
        SEO_ORCH --> Specialized
    end
```

## Détail SEO - Domaines Spécialisés

### GEO (AI Search)

```mermaid
flowchart LR
    subgraph GEO["seo/geo/ (6)"]
        G1[ai-search-strategy]
        G2[ai-overviews]
        G3[entity-authority]
        G4[citation-optimization]
        G5[llm-content-strategy]
    end

    ChatGPT([ChatGPT]) --> G1
    Perplexity([Perplexity]) --> G1
    AIOverviews([Google AI]) --> G2
    KnowledgeGraph([Knowledge Graph]) --> G3
```

### Local SEO

```mermaid
flowchart LR
    subgraph Local["seo/local/ (5)"]
        L1[google-business]
        L2[citations-nap]
        L3[avis-reputation]
        L4[local-content]
    end

    GBP([Google Business]) --> L1
    Annuaires([Annuaires]) --> L2
    Avis([Reviews]) --> L3
```

### E-commerce SEO

```mermaid
flowchart LR
    subgraph Ecom["seo/ecommerce/ (5)"]
        E1[fiches-produits]
        E2[categories-navigation]
        E3[google-merchant]
        E4[stock-lifecycle]
    end

    Products([Produits]) --> E1
    Categories([Catégories]) --> E2
    Shopping([Google Shopping]) --> E3
```

### International SEO

```mermaid
flowchart LR
    subgraph Intl["seo/international/ (5)"]
        I1[strategie-structure]
        I2[hreflang]
        I3[localisation-contenu]
        I4[geotargeting]
    end

    Structure([ccTLD/Subdomain]) --> I1
    Lang([Multi-langues]) --> I2
    Localization([Localisation]) --> I3
```

## Composition avec Autres Skills

```mermaid
flowchart TB
    subgraph External["SKILLS EXTERNES"]
        PM[project-management]
        DT[direction-technique]
        FD[frontend-developer]
        DS[design-system-foundations]
        WDP[web-dev-process]
    end

    subgraph Marketing["MARKETING"]
        MKT[marketing/]
    end

    PM <--> |"Coordination projets"| MKT
    DT <--> |"Specs techniques"| MKT
    FD <--> |"Landing pages"| MKT
    DS <--> |"Cohérence visuelle"| MKT
    WDP <--> |"Intégration dev"| MKT
```

## Flux Utilisateur Typique

```mermaid
sequenceDiagram
    participant U as User
    participant M as Marketing Orchestrator
    participant S as strategie/
    participant C as campagnes/
    participant A as acquisition/
    participant AN as analytics/

    U->>M: "Lance ma stratégie marketing"
    M->>S: Délègue positionnement
    S-->>M: Personas, positionnement
    M->>C: Délègue planning
    C-->>M: Roadmap campagnes
    M->>A: Délègue activation
    A-->>M: Canaux activés
    M->>AN: Délègue mesure
    AN-->>M: Dashboard KPIs
    M-->>U: Plan marketing complet
```

## Arbre de Décision Routing

```mermaid
flowchart TD
    Q[Requête Marketing]

    Q --> Q1{Décision stratégique?}
    Q1 -->|Oui| STRAT[strategie/]
    Q1 -->|Non| Q2{Planning campagne?}

    Q2 -->|Oui| CAMP[campagnes/]
    Q2 -->|Non| Q3{Création contenu?}

    Q3 -->|Oui| CONT[content/]
    Q3 -->|Non| Q4{Acquisition trafic?}

    Q4 -->|Oui| Q5{SEO?}
    Q4 -->|Non| ANA[analytics/]

    Q5 -->|Oui| SEO[acquisition/seo/]
    Q5 -->|Non| ACQ[acquisition/]

    SEO --> Q6{Type SEO?}
    Q6 -->|Technique| TECH[seo/technique/]
    Q6 -->|Contenu| CONT_SEO[seo/contenu/]
    Q6 -->|Liens| NET[seo/netlinking/]
    Q6 -->|AI Search| GEO[seo/geo/]
    Q6 -->|Local| LOCAL[seo/local/]
    Q6 -->|E-commerce| ECOM[seo/ecommerce/]
    Q6 -->|International| INTL[seo/international/]
```

## Statistiques du Skill

```
┌─────────────────────────────────────────────────────────────┐
│                    MARKETING SKILL v1.2.0                    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Total Agents: 74                                           │
│  ├── Base: 25 agents                                        │
│  │   ├── strategie/: 5                                      │
│  │   ├── campagnes/: 5                                      │
│  │   ├── content/: 5                                        │
│  │   ├── acquisition/ (base): 5                             │
│  │   └── analytics/: 5                                      │
│  │                                                          │
│  └── SEO: 49 agents                                         │
│      ├── strategie/: 5                                      │
│      ├── technique/: 6                                      │
│      ├── contenu/: 6                                        │
│      ├── netlinking/: 5                                     │
│      ├── pilotage/: 5                                       │
│      ├── geo/: 6                                            │
│      ├── local/: 5                                          │
│      ├── ecommerce/: 5                                      │
│      └── international/: 5                                  │
│                                                             │
│  Niveaux: 3 (POURQUOI / QUOI / COMMENT)                     │
│  Profondeur max: 4 niveaux (acquisition/seo/geo/agent)      │
│  Tests: 7 suites, 200+ assertions                           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Légende

| Symbole | Signification |
|---------|---------------|
| 🎯 | Skill principal |
| 📁 | Domaine |
| 📄 | Agent |
| → | Délégation |
| ↔ | Interaction bidirectionnelle |
