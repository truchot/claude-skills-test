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

```mermaid
flowchart TB
    subgraph N1["NIVEAU 1 : POURQUOI (direction-technique)"]
        direction TB
        R1[/"Rôle : QUESTIONNER et CLARIFIER le besoin"/]
        A1["→ Poser un MAXIMUM de questions pour comprendre le contexte"]
        A2["→ Identifier les objectifs réels derrière la demande"]
        A3["→ Valider les hypothèses avant de déléguer"]
        A4["→ Prendre les décisions stratégiques"]
        O1["Output : Décisions documentées, ADRs, Politiques validées"]
        C1["Code : ❌ JAMAIS (voir SRP-ANALYSIS.md)"]
    end

    T1(["besoin clarifié, décisions prises"])

    subgraph N2["NIVEAU 2 : QUOI (web-dev-process)"]
        direction TB
        R2[/"Rôle : CONTEXTUALISER en 3 couches"/]
        L1["1. GLOBAL 'Métier' → Quel process métier standard appliquer ?"]
        L2["2. AGENCE 'Spécifique' → Quelles particularités de l'agence ?"]
        L3["3. PROJET 'Exception' → Quelles exceptions projet outrepassent ?"]
        O2["Output : Process adapté, Templates contextualisés, Checklists"]
        C2["Code : ❌ JAMAIS"]
    end

    T2(["process identifié, contexte établi"])

    subgraph N3["NIVEAU 3 : COMMENT (wordpress-gutenberg-expert, etc.)"]
        direction TB
        R3[/"Rôle : EXÉCUTER avec spécifications"/]
        E1["→ Dans quel environnement ?"]
        E2["→ Avec quelles spécifications techniques ?"]
        E3["→ Quels critères d'acceptance ?"]
        E4["→ Qu'est-ce qu'il y a à produire concrètement ?"]
        O3["Output : Code, Configs, Scripts, Livrables testables"]
        C3["Code : ✅ OUI - C'est ici qu'on implémente"]
    end

    N1 --> T1 --> N2 --> T2 --> N3

    classDef pourquoi fill:#e1f5fe,stroke:#01579b
    classDef quoi fill:#fff3e0,stroke:#e65100
    classDef comment fill:#e8f5e9,stroke:#2e7d32
    classDef transition fill:#f5f5f5,stroke:#9e9e9e

    class N1 pourquoi
    class N2 quoi
    class N3 comment
    class T1,T2 transition
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
