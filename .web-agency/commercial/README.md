# Commercial - Avant-Projet

> Documentation du cycle commercial : du premier contact à la signature du devis.

## Vue d'ensemble

```
┌─────────────────────────────────────────────────────────────────┐
│                    CYCLE AVANT-PROJET                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. DÉCOUVERTE          2. CAHIER DES         3. CHIFFRAGE     │
│     (Brief)                CHARGES                              │
│        │                      │                    │            │
│        ▼                      ▼                    ▼            │
│  ┌──────────┐          ┌──────────┐          ┌──────────┐      │
│  │ RDV 1    │    →     │ Document │    →     │ Planning │      │
│  │ Décou-   │          │ validé   │          │ + Budget │      │
│  │ verte    │          │ client   │          │          │      │
│  └──────────┘          └──────────┘          └──────────┘      │
│        │                      │                    │            │
│        └──────────────────────┴────────────────────┘            │
│                               │                                 │
│                               ▼                                 │
│                    4. PROPOSITION & SIGNATURE                   │
│                               │                                 │
│                    ┌──────────┴──────────┐                     │
│                    ▼                     ▼                      │
│              ┌──────────┐          ┌──────────┐                │
│              │ Refusé   │          │ Signé    │                │
│              │ → Email  │          │ → Acompte│                │
│              │   suivi  │          │ → Projet │                │
│              └──────────┘          └──────────┘                │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Documents

| Document | Usage | Fichier |
|----------|-------|---------|
| Brief Découverte | Questionnaire 1er RDV | `discovery-brief.md` |
| Cahier des Charges | Document contractuel client | `specification-template.md` |
| Workflow Chiffrage | Process d'estimation | `estimation-workflow.md` |
| Workflow Proposition | Devis → Signature | `proposal-workflow.md` |
| Templates Emails | Communications types | `templates/` |

## Principes

### 1. Langage Simple
- Zéro jargon technique dans les documents client
- Reformuler le besoin avec les mots du client
- User stories compréhensibles par tous

### 2. Doc = Vérité
- Le cahier des charges fait foi en cas de litige
- Tout ce qui n'est pas écrit n'existe pas
- Validation écrite obligatoire avant exécution

### 3. Pas de Travail Sans Signature
- Aucun développement avant signature du devis
- Acompte obligatoire au démarrage
- Délai de validité sur toutes les propositions

## Transition vers Exécution

Une fois le devis signé :

```
1. Créer le dossier .project/ avec templates/project/
2. Lancer le workflow new-project.md (Phase 4: Setup)
3. Transformer le cahier des charges en T-000 Session Plan
4. Créer les tâches dans Claude Tasks
```

Voir : `.web-agency/workflows/new-project.md`
