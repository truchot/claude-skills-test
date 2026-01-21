# Workflow : Nouveau Projet

Chaîne de production complète pour un nouveau projet client, du premier contact à la livraison.

## Déclencheurs

- Nouveau client contacte l'agence
- Demande de devis
- Nouveau projet pour client existant
- Appel d'offres

## Étapes

```
┌─────────────────────────────────────────────────────────────────┐
│  PHASE 1 : INTAKE (< 2h)                                        │
├─────────────────────────────────────────────────────────────────┤
│  1.1 Reception      → Parser et structurer la demande           │
│  1.2 Qualification  → Évaluer complexité, urgence, faisabilité  │
│  1.3 Routing        → Identifier les skills nécessaires         │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  PHASE 2 : DISCOVERY (1-3 jours)                                │
├─────────────────────────────────────────────────────────────────┤
│  2.1 Specification  → Clarifier les besoins, rédiger le brief   │
│  2.2 Architecture   → Concevoir la solution technique           │
│  2.3 Estimation     → Chiffrer effort, coût, planning           │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  PHASE 3 : PROPOSITION (1-2 jours)                              │
├─────────────────────────────────────────────────────────────────┤
│  3.1 Proposal       → Rédiger la proposition commerciale        │
│  3.2 Review         → Valider en interne                        │
│  3.3 Presentation   → Présenter au client                       │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    [ATTENTE VALIDATION CLIENT]
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  PHASE 4 : SETUP (1-2 jours)                                    │
├─────────────────────────────────────────────────────────────────┤
│  4.1 Planning       → Créer le plan de projet détaillé          │
│  4.2 Environment    → Setup technique (repo, CI/CD, envs)       │
│  4.3 Kickoff        → Réunion de lancement                      │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  PHASE 5 : DESIGN (selon scope)                                 │
├─────────────────────────────────────────────────────────────────┤
│  5.1 UX Research    → Analyse utilisateurs, personas            │
│  5.2 Wireframes     → Maquettes basse fidélité                  │
│  5.3 UI Design      → Maquettes haute fidélité                  │
│  5.4 Design System  → Composants réutilisables                  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  PHASE 6 : DEVELOPMENT (selon scope)                            │
├─────────────────────────────────────────────────────────────────┤
│  6.1 Frontend       → Développement interface                   │
│  6.2 Backend        → Développement API/services                │
│  6.3 Integration    → Intégrations tierces                      │
│  6.4 Testing        → Tests automatisés                         │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  PHASE 7 : QUALITY (continu)                                    │
├─────────────────────────────────────────────────────────────────┤
│  7.1 Code Review    → Revue de code systématique                │
│  7.2 QA             → Tests fonctionnels                        │
│  7.3 Security       → Audit sécurité                            │
│  7.4 Performance    → Optimisation                              │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  PHASE 8 : DELIVERY (1-3 jours)                                 │
├─────────────────────────────────────────────────────────────────┤
│  8.1 Staging        → Déploiement environnement de recette      │
│  8.2 UAT            → Tests d'acceptation client                │
│  8.3 Production     → Mise en production                        │
│  8.4 Handover       → Formation et documentation                │
└─────────────────────────────────────────────────────────────────┘
```

## Agents par étape

### Phase 1 : Intake
| Étape | Agent | Input | Output | Gate |
|-------|-------|-------|--------|------|
| 1.1 | `skills/intake/reception.md` | Demande brute | Demande structurée | - |
| 1.2 | `skills/intake/qualification.md` | Demande structurée | Score qualification | 🟡 |
| 1.3 | `skills/support/documentation.md` | Infos projet | Structure `.project/` | - |

**Étape 1.3 - Documentation** : Crée la structure documentaire complète dans `.project/` avec :
- `01-vision/` (PRD, personas, objectives)
- `02-requirements/` (epics, user stories)
- `03-architecture/` (ADR, stack, data model)
- `04-specs/`, `05-quality/`, `06-operations/`, `07-audit/`

### Phase 2 : Discovery
| Étape | Agent | Input | Output | Gate |
|-------|-------|-------|--------|------|
| 2.1 | `skills/strategy/specification.md` | Demande qualifiée | PRD complet | 🔴 |
| 2.2 | `skills/strategy/architecture.md` | PRD | Architecture + ADR | 🔴 |
| 2.3 | `skills/strategy/estimation.md` | Architecture | Estimation détaillée | 🔴 |

**Livrables Phase 2** :
- `.project/01-vision/PRD.md`
- `.project/01-vision/personas.md`
- `.project/03-architecture/overview.md`
- `.project/03-architecture/stack.md`
- `.project/03-architecture/decisions/ADR-001-*.md`

### Phase 3 : Proposition
| Étape | Agent | Input | Output |
|-------|-------|-------|--------|
| 3.1 | `skills/project/proposal.md` | Estimation | Proposition commerciale |
| 3.2 | `skills/quality/review.md` | Proposition | Proposition validée |
| 3.3 | `skills/project/communication.md` | Proposition validée | Support présentation |

### Phase 4 : Setup
| Étape | Agent | Input | Output |
|-------|-------|-------|--------|
| 4.1 | `skills/project/planning.md` | Proposition signée | Plan de projet |
| 4.2 | `skills/operations/setup.md` | Plan | Environnements prêts |
| 4.3 | `skills/project/kickoff.md` | Tout | Compte-rendu kickoff |

### Phase 5 : Design
| Étape | Agent | Input | Output |
|-------|-------|-------|--------|
| 5.1 | `skills/development/ux-research.md` | Brief | Personas, parcours |
| 5.2 | `skills/development/wireframes.md` | Research | Wireframes |
| 5.3 | `skills/development/ui-design.md` | Wireframes | Maquettes |
| 5.4 | `skills/development/design-system.md` | Maquettes | Composants |

### Phase 6 : Development
| Étape | Agent | Input | Output |
|-------|-------|-------|--------|
| 6.1 | `skills/development/frontend.md` | Maquettes | Code frontend |
| 6.2 | `skills/development/backend.md` | Specs API | Code backend |
| 6.3 | `skills/development/integration.md` | Specs intégration | Connecteurs |
| 6.4 | `skills/quality/testing.md` | Code | Tests automatisés |

### Phase 7 : Quality
| Étape | Agent | Input | Output |
|-------|-------|-------|--------|
| 7.1 | `skills/quality/code-review.md` | PR | Feedback, corrections |
| 7.2 | `skills/quality/qa.md` | Build | Rapport QA |
| 7.3 | `skills/quality/security-check.md` | Build | Rapport sécurité |
| 7.4 | `skills/quality/performance.md` | Build | Optimisations |

### Phase 8 : Delivery
| Étape | Agent | Input | Output |
|-------|-------|-------|--------|
| 8.1 | `skills/operations/deployment.md` | Build validé | Staging live |
| 8.2 | `skills/project/uat.md` | Staging | PV de recette |
| 8.3 | `skills/operations/deployment.md` | PV signé | Production live |
| 8.4 | `skills/project/handover.md` | Tout | Documentation, formation |

## Points de validation client

| Après phase | Validation requise | Format |
|-------------|-------------------|--------|
| Phase 2 | Brief fonctionnel | Document signé |
| Phase 3 | Proposition commerciale | Devis signé |
| Phase 5 | Maquettes | Validation écrite |
| Phase 8.2 | Recette | PV de recette signé |

## Escalade

| Situation | Action |
|-----------|--------|
| Budget dépassé > 10% | Alerte client + avenant |
| Retard > 1 semaine | Point de situation |
| Blocage technique | Escalade direction technique |
| Conflit client | Escalade direction commerciale |

## Livrables finaux

```
□ Code source (repository)
□ Documentation technique
□ Documentation utilisateur
□ Accès environnements (staging, prod)
□ Accès monitoring
□ Plan de maintenance
□ Formation (si incluse)
```
