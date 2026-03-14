# Plan : Skill `experience-client` — Le Client au Centre

## Vision

Créer un **skill de niveau 2 (orchestration)** dédié à l'expérience client. Ce skill ne produit pas de code — il orchestre les interactions client à travers tout le cycle de vie du projet, en s'assurant que chaque livrable orienté client est de qualité, sans jargon, et aligné avec les émotions cibles.

```
┌─────────────────────────────────────────────────────────────┐
│  experience-client (Level 2 - Orchestration)                │
│  "Le gardien de l'expérience client"                        │
│                                                             │
│  Orchestre 6 domaines / 30 agents / 1 validateur global     │
│                                                             │
│  Inputs : livrables internes (specs, maquettes, code...)    │
│  Outputs : livrables client (sans jargon, émotionnels)      │
└─────────────────────────────────────────────────────────────┘
```

---

## Structure du Skill

```
skills/experience-client/
├── SKILL.md                          # Définition du skill
├── orchestrator.md                   # Point d'entrée / routage
├── package.json                      # Config tests
├── CHANGELOG.md                      # Historique
├── agents/
│   ├── accueil/                      # Phase 1 — CONFIANCE
│   │   ├── orchestrator.md           # Routage accueil
│   │   ├── premier-contact.md        # Accusé réception personnalisé
│   │   ├── ecoute-active.md          # Guide d'écoute et reformulation
│   │   ├── synthese-besoin.md        # Produit la synthèse besoin (1 page)
│   │   └── qualification-rapide.md   # Pré-qualification orientée client
│   │
│   ├── cadrage/                      # Phase 2 — CLARTÉ
│   │   ├── orchestrator.md
│   │   ├── proposition-projet.md     # Proposition en langage business
│   │   ├── traducteur-technique.md   # Traduit le jargon en impact business
│   │   ├── options-budget.md         # Présente les arbitrages budgétaires
│   │   └── planning-client.md        # Planning avec jalons compréhensibles
│   │
│   ├── co-creation/                  # Phase 3 — PARTICIPATION
│   │   ├── orchestrator.md
│   │   ├── walkthrough-narratif.md   # Présentation guidée des maquettes
│   │   ├── collecte-feedback.md      # Process structuré de retours client
│   │   ├── arbitrage-guide.md        # Aide le client à choisir (avec impacts)
│   │   └── validation-formelle.md    # PV de validation clair et protecteur
│   │
│   ├── suivi/                        # Phase 4-5 — SÉRÉNITÉ
│   │   ├── orchestrator.md
│   │   ├── rapport-avancement.md     # Point hebdo (5 lignes max)
│   │   ├── demo-intermediaire.md     # Guide pour démos bi-hebdo
│   │   ├── alerte-proactive.md       # Notification avant que le problème arrive
│   │   └── guide-mise-en-ligne.md    # Guide jour J en langage client
│   │
│   ├── lancement/                    # Phase 6 — FIERTÉ
│   │   ├── orchestrator.md
│   │   ├── formation-client.md       # Sessions pratiques post-livraison
│   │   ├── bilan-lancement.md        # Rapport J+30 (métriques business)
│   │   └── celebration.md            # Moment de reconnaissance mutuelle
│   │
│   └── fidelisation/                 # Phase 7-8 — FIDÉLITÉ
│       ├── orchestrator.md
│       ├── rapport-mensuel.md        # Suivi mensuel (uptime + business)
│       ├── point-trimestriel.md      # Bilan trimestriel + roadmap
│       ├── bilan-partenariat.md      # REX annuel + ROI mesuré
│       └── veille-opportunites.md    # Propositions proactives d'évolution
│
├── validators/
│   ├── zero-jargon.md                # Valide l'absence de jargon technique
│   ├── ton-et-empathie.md            # Valide le ton (chaleureux, pas corporate)
│   ├── completude-client.md          # Vérifie que le livrable répond au besoin
│   ├── sla-reactivite.md             # Vérifie le respect des SLA (24h, 4h...)
│   └── coherence-emotionnelle.md     # Vérifie l'alignement émotion/phase
│
└── tests/
    ├── config.js
    ├── utils.js
    ├── validate-skill.test.js
    ├── validate-agents.test.js
    ├── validate-domains.test.js
    └── validate-validators.test.js
```

---

## Détail des 6 Domaines

### 1. `accueil/` — Phase 1 (CONFIANCE)

| Agent | Responsabilité unique | Input | Output |
|-------|----------------------|-------|--------|
| `premier-contact` | Génère un accusé réception personnalisé (pas un template générique) | Demande client brute | Email/message personnalisé en < 24h |
| `ecoute-active` | Guide la reformulation du besoin en miroir du client | Notes d'appel/échange | Questions de clarification empathiques |
| `synthese-besoin` | Produit une synthèse de 1 page en langage client | Requirements extraits par `client-intake` | Document `synthese-besoin.md` |
| `qualification-rapide` | Pré-qualifie en termes de valeur client (pas de complexité technique) | Synthèse besoin | Score de correspondance agence/besoin |

**Composition** : Consomme les outputs de `client-intake/extraction/` et les transforme en langage client.

### 2. `cadrage/` — Phase 2 (CLARTÉ)

| Agent | Responsabilité unique | Input | Output |
|-------|----------------------|-------|--------|
| `proposition-projet` | Crée la proposition commerciale complète sans jargon | ADR, estimation, brief | Document `proposition-projet.md` |
| `traducteur-technique` | Traduit chaque décision technique en impact business | Outputs de `direction-technique` | Paragraphes "ce que ça veut dire pour vous" |
| `options-budget` | Présente 2-3 options budgétaires avec arbitrages clairs | Estimation détaillée | Tableau comparatif business |
| `planning-client` | Transforme le planning technique en jalons compréhensibles | Planning projet | Timeline avec "ce que vous verrez à chaque étape" |

**Composition** : Consomme les outputs de `direction-technique/` et `project-management/avant-projet/`.

### 3. `co-creation/` — Phase 3 (PARTICIPATION)

| Agent | Responsabilité unique | Input | Output |
|-------|----------------------|-------|--------|
| `walkthrough-narratif` | Raconte l'histoire utilisateur à travers les maquettes | Maquettes de `ux-ui-design` | Script de présentation narratif |
| `collecte-feedback` | Structure le processus de retour client | Feedback brut | Feedback catégorisé et actionnable |
| `arbitrage-guide` | Explique l'impact de chaque choix sans orienter | Options techniques | "Si vous choisissez A → impact. Si B → impact." |
| `validation-formelle` | Produit un PV de validation protecteur | Éléments validés | PV signable avec périmètre clair |

**Composition** : Consomme les outputs de `ux-ui-design/` et `design-system-foundations/`.

### 4. `suivi/` — Phases 4-5 (SÉRÉNITÉ)

| Agent | Responsabilité unique | Input | Output |
|-------|----------------------|-------|--------|
| `rapport-avancement` | Produit un résumé hebdo de 5 lignes en langage client | Tickets, commits, sprints | `rapport-avancement.md` (terminé/en cours/à venir) |
| `demo-intermediaire` | Prépare et structure les démos bi-hebdo | Fonctionnalités terminées | Script de démo + talking points |
| `alerte-proactive` | Détecte et communique les risques AVANT la deadline | Risk matrix, retards | Notification claire avec solution proposée |
| `guide-mise-en-ligne` | Prépare le client au jour J du déploiement | Plan de déploiement | Guide simple : étapes, actions client, contacts |

**Composition** : Consomme les outputs de `lead-dev/`, `web-dev-process/`, `devops/`.

### 5. `lancement/` — Phase 6 (FIERTÉ)

| Agent | Responsabilité unique | Input | Output |
|-------|----------------------|-------|--------|
| `formation-client` | Organise les sessions de prise en main | Fonctionnalités livrées | Plan de formation + supports |
| `bilan-lancement` | Produit le rapport J+30 en métriques business | Analytics, tickets, performance | `bilan-lancement.md` (visiteurs, conversion, satisfaction) |
| `celebration` | Marque le moment de livraison comme un succès partagé | Projet livré | Communication de célébration |

**Composition** : Consomme les outputs de `marketing/`, `analytics/`, `project-management/livraison/`.

### 6. `fidelisation/` — Phases 7-8 (FIDÉLITÉ)

| Agent | Responsabilité unique | Input | Output |
|-------|----------------------|-------|--------|
| `rapport-mensuel` | Produit le rapport mensuel en langage business | Monitoring, tickets, métriques | `rapport-mensuel.md` |
| `point-trimestriel` | Prépare le bilan trimestriel + roadmap | Rapports mensuels, feedback | Présentation trimestrielle |
| `bilan-partenariat` | Produit le REX annuel avec ROI mesuré | Objectifs initiaux, résultats | `bilan-partenariat.md` |
| `veille-opportunites` | Détecte les opportunités d'évolution proactive | Marché, techno, analytics | Propositions argumentées |

**Composition** : Consomme les outputs de `support-client/`, `devops/monitoring/`, et les métriques business.

---

## Détail des 5 Validators

Les validators sont des agents transversaux qui vérifient la qualité de TOUT livrable destiné au client, quel que soit le domaine qui l'a produit.

### `zero-jargon`
**Responsabilité** : Scanner tout document client et signaler/remplacer le jargon technique.

**Dictionnaire de traduction** :
| Jargon interdit | Alternative client |
|-----------------|-------------------|
| CI/CD | "mise en ligne automatisée" |
| SSR/ISR/SSG | "votre site se charge rapidement" |
| API | "connexion entre systèmes" |
| Sprint | "cycle de travail de 2 semaines" |
| Rollback | "retour à la version précédente" |
| Stack | "les technologies utilisées" |
| ADR | "décision technique documentée" |
| skill/agent/orchestrateur | INTERDIT — ne jamais mentionner |
| PR / merge / branch | "modification validée" |
| Docker / Kubernetes | "infrastructure du serveur" |

**Règle** : Si le score jargon > 0 sur un livrable client, le livrable est rejeté.

### `ton-et-empathie`
**Responsabilité** : Vérifier que le ton est adapté à la phase émotionnelle.

| Phase | Ton attendu | Mots-clés OK | Mots-clés KO |
|-------|-------------|-------------|-------------|
| Accueil | Chaleureux, curieux | "comprendre", "écouter", "votre projet" | "procédure", "formulaire", "obligatoire" |
| Cadrage | Professionnel, rassurant | "nous recommandons", "transparence" | "il faut", "vous devez", "impossible" |
| Co-création | Collaboratif, enthousiaste | "ensemble", "votre avis", "explorer" | "c'est mieux", "techniquement", "contrainte" |
| Réalisation | Serein, factuel | "avance bien", "prévu", "prochaine étape" | "retard", "problème", "bug" (→ "point d'attention") |
| Lancement | Fier, reconnaissant | "réussi", "bravo", "résultats" | "enfin", "malgré", "reste à faire" |
| Fidélisation | Proactif, partenaire | "on a pensé à", "opportunité" | "renouvellement", "contrat", "facturation" |

### `completude-client`
**Responsabilité** : Vérifier que chaque livrable client contient toutes les sections requises selon son type.

| Type de livrable | Sections obligatoires |
|-----------------|----------------------|
| `synthese-besoin` | Contexte client, Besoin reformulé, Objectifs, Prochaines étapes |
| `proposition-projet` | Problème résolu, Solution, Budget détaillé par lot, Planning, Inclus/Exclu |
| `rapport-avancement` | Terminé, En cours, À venir, Points d'attention, Actions client |
| `bilan-lancement` | Métriques, Fonctionnalités utilisées, Problèmes résolus, Recommandations |
| `rapport-mensuel` | Disponibilité, Incidents, Métriques business, Recommandations |

### `sla-reactivite`
**Responsabilité** : Vérifier le respect des engagements de réactivité.

| Engagement | SLA | Mesure |
|-----------|-----|--------|
| Premier contact | < 24h | Timestamp premier message vs réponse |
| Rapport d'avancement | Hebdomadaire | Dernière date d'envoi |
| Alerte proactive | Dès détection | Délai entre détection risque et communication |
| Support P1-P2 | < 4h | Temps de première réponse |
| Support P3-P4 | < 24h | Temps de première réponse |
| Bilan lancement | J+30 max | Date de mise en prod vs date du bilan |

### `coherence-emotionnelle`
**Responsabilité** : Vérifier que le livrable est aligné avec l'émotion cible de la phase.

**Signaux d'incohérence** :
- Phase Accueil : document trop formel, trop long, ou qui parle budget
- Phase Cadrage : proposition sans options, sans planning, ou trop technique
- Phase Co-création : maquette envoyée sans explication narrative
- Phase Réalisation : silence > 7 jours, ou rapport technique sans traduction
- Phase Lancement : facture envoyée sans bilan
- Phase Fidélisation : contact uniquement pour renouvellement

---

## Ordre d'Implémentation

### Étape 1 : Fondations (à faire maintenant)
1. Créer `skills/experience-client/SKILL.md`
2. Créer `skills/experience-client/orchestrator.md`
3. Créer `skills/experience-client/package.json` + `CHANGELOG.md`

### Étape 2 : Domaines prioritaires (P1)
4. Créer domaine `accueil/` (4 agents + orchestrator) — premier contact
5. Créer domaine `cadrage/` (4 agents + orchestrator) — proposition projet
6. Créer domaine `suivi/` (4 agents + orchestrator) — rapport avancement

### Étape 3 : Validators
7. Créer `validators/zero-jargon.md`
8. Créer `validators/ton-et-empathie.md`
9. Créer `validators/completude-client.md`
10. Créer `validators/sla-reactivite.md`
11. Créer `validators/coherence-emotionnelle.md`

### Étape 4 : Domaines secondaires (P2)
12. Créer domaine `co-creation/` (4 agents + orchestrator)
13. Créer domaine `lancement/` (3 agents + orchestrator)
14. Créer domaine `fidelisation/` (4 agents + orchestrator)

### Étape 5 : Tests & Intégration
15. Créer la suite de tests (config + 4 fichiers de test)
16. Mettre à jour le routing global (`orchestration/routing.md`)
17. Mettre à jour le graphe de dépendances (`orchestration/dependency-graph.md`)
18. Mettre à jour `PROJECT-LIFECYCLE.md` pour intégrer la couche client

---

## Composition avec les Skills Existants

```
┌─────────────────────────────────────────────────────────────────────┐
│                     FLUX DE DONNÉES                                 │
│                                                                     │
│  client-intake ─────► experience-client/accueil ─────► CLIENT      │
│                        (transforme en langage client)               │
│                                                                     │
│  direction-technique ─► experience-client/cadrage ────► CLIENT     │
│  project-management ──┘ (traduit en impact business)               │
│                                                                     │
│  ux-ui-design ────────► experience-client/co-creation ► CLIENT     │
│  design-system ───────┘ (walkthrough narratif)                     │
│                                                                     │
│  lead-dev ────────────► experience-client/suivi ──────► CLIENT     │
│  web-dev-process ─────┘ (rapport 5 lignes)                         │
│                                                                     │
│  devops ──────────────► experience-client/suivi ──────► CLIENT     │
│                         (guide mise en ligne)                       │
│                                                                     │
│  marketing/analytics ─► experience-client/lancement ──► CLIENT     │
│                         (bilan J+30)                                │
│                                                                     │
│  support-client ──────► experience-client/fidelisation ► CLIENT    │
│  monitoring ──────────┘ (rapport mensuel, bilan annuel)            │
│                                                                     │
│  ─── VALIDATORS (transversaux) ───────────────────────────────     │
│  Chaque flèche vers CLIENT passe par :                             │
│  zero-jargon → ton-et-empathie → completude → coherence            │
└─────────────────────────────────────────────────────────────────────┘
```

**Règle critique** : Aucun livrable ne sort vers le client sans passer par les validators. Les skills internes produisent des livrables techniques. `experience-client` les transforme et les valide avant transmission.
