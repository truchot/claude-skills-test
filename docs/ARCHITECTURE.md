# Architecture des Skills Techniques

## Vue d'ensemble

```mermaid
graph TB
    subgraph "NIVEAU 1: POURQUOI"
        DT[direction-technique<br/>52 agents]
    end

    subgraph "NIVEAU 2: QUOI"
        WDP[web-dev-process<br/>61 agents]
    end

    subgraph "NIVEAU 3: COMMENT"
        WGE[wordpress-gutenberg-expert<br/>41 agents]
        DSF[design-system-foundations<br/>21 agents]
        FUTURE[autres skills techniques<br/>à venir]
    end

    DT -->|"Décisions<br/>stratégiques"| WDP
    WDP -->|"Process<br/>contextualisé"| WGE
    WDP -->|"Process<br/>contextualisé"| DSF
    WDP -.->|"futur"| FUTURE

    classDef pourquoi fill:#e1f5fe,stroke:#01579b
    classDef quoi fill:#fff3e0,stroke:#e65100
    classDef comment fill:#e8f5e9,stroke:#2e7d32

    class DT pourquoi
    class WDP quoi
    class WGE,DSF,FUTURE comment
```

## Hiérarchie POURQUOI / QUOI / COMMENT

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    NIVEAU 1 : POURQUOI                                       │
│                   (direction-technique)                                      │
│                                                                              │
│  Rôle : QUESTIONNER et CLARIFIER le besoin                                  │
│                                                                              │
│  → Poser un MAXIMUM de questions pour comprendre le contexte                │
│  → Identifier les objectifs réels derrière la demande                       │
│  → Valider les hypothèses avant de déléguer                                 │
│  → Prendre les décisions stratégiques                                       │
│                                                                              │
│  Output : Décisions documentées, ADRs, Politiques validées                  │
│  Code : ❌ JAMAIS (voir SRP-ANALYSIS.md)                                    │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                      (besoin clarifié, décisions prises)
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                       NIVEAU 2 : QUOI                                        │
│                    (web-dev-process)                                         │
│                                                                              │
│  Rôle : CONTEXTUALISER en 3 couches                                         │
│                                                                              │
│  1. GLOBAL "Métier"     → Quel process métier standard appliquer ?          │
│  2. AGENCE "Spécifique" → Quelles particularités de l'agence ?              │
│  3. PROJET "Exception"  → Quelles exceptions projet outrepassent ?          │
│                                                                              │
│  Output : Process adapté, Templates contextualisés, Checklists              │
│  Code : ❌ JAMAIS                                                            │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                      (process identifié, contexte établi)
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                      NIVEAU 3 : COMMENT                                      │
│                (wordpress-gutenberg-expert, etc.)                            │
│                                                                              │
│  Rôle : EXÉCUTER avec spécifications                                        │
│                                                                              │
│  → Dans quel environnement ?                                                │
│  → Avec quelles spécifications techniques ?                                 │
│  → Quels critères d'acceptance ?                                            │
│  → Qu'est-ce qu'il y a à produire concrètement ?                            │
│                                                                              │
│  Output : Code, Configs, Scripts, Livrables testables                       │
│  Code : ✅ OUI - C'est ici qu'on implémente                                  │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Structure des Domaines (direction-technique)

```mermaid
graph LR
    subgraph "Phase Amont"
        AP[avant-projet]
        SPEC[specification]
    end

    subgraph "Conception"
        ARCH[architecture]
        EST[estimation]
    end

    subgraph "Qualité"
        QUAL[qualite]
        SEC[securite]
        PERF[performance]
    end

    subgraph "Ops"
        INFRA[infrastructure]
        COM[communication]
        SUP[support]
    end

    AP --> SPEC --> ARCH --> EST
    QUAL --> SEC --> PERF
    INFRA --> COM --> SUP
```

### Détail par Domaine

| Domaine | Agents | Responsabilité |
|---------|--------|----------------|
| `avant-projet` | 5 | Cadrage technique initial |
| `specification` | 5 | Rédaction specs techniques |
| `architecture` | 6 | Conception et validation |
| `estimation` | 5 | Chiffrage et planning |
| `qualite` | 6 | Standards et code review |
| `securite` | 5 | OWASP, RGPD, secrets |
| `performance` | 5 | Optimisation et monitoring |
| `infrastructure` | 5 | CI/CD et déploiement |
| `communication` | 5 | Documentation et handoff |
| `support` | 5 | Debug et veille techno |

## Flux de Données

```mermaid
sequenceDiagram
    participant U as Utilisateur
    participant WA as web-agency
    participant DT as direction-technique
    participant WDP as web-dev-process
    participant WGE as wordpress-*

    U->>WA: Demande technique
    WA->>DT: Route vers POURQUOI

    DT->>U: Questions de clarification
    U->>DT: Réponses
    DT->>DT: Décision stratégique

    DT->>WDP: Délègue avec décisions
    WDP->>WDP: Contextualise (3 couches)

    WDP->>WGE: Instructions précises
    WGE->>WGE: Génère code/configs
    WGE->>U: Livrables
```

## Références

- [ADR-005: Frontières entre Skills](../.web-agency/skills/web-agency/docs/adr/005-skill-responsibility-boundaries.md)
- [SRP Analysis](./analysis/SRP-ANALYSIS.md)
- [Migration Guide](./analysis/MIGRATION.md)
- [Quick Start](./QUICK_START.md)
