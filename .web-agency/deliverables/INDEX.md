# Index des Livrables

> **Principe** : Un livrable = Un fichier. Favoriser la mutualisation et la composition.

## Organisation

```
.web-agency/deliverables/
├── INDEX.md                    # Ce fichier
├── templates/
│   └── deliverable-template.md # Template standard
├── shared/                     # Livrables transversaux (multi-skills)
│   ├── technical-documentation.md
│   ├── code-review-report.md
│   └── ...
└── by-category/                # Livrables par catégorie
    ├── documentation/
    ├── specification/
    ├── code/
    ├── design/
    ├── strategy/
    ├── report/
    ├── process/
    ├── marketing/
    ├── wordpress/
    ├── legal/                  # NEW: Conformité juridique et RGPD
    ├── support/                # NEW: Support client et SLAs
    ├── commercial/             # NEW: Vente et propositions
    └── finance/                # NEW: Facturation et budgets
```

## Catégories de Livrables

| Catégorie | Description | Exemples |
|-----------|-------------|----------|
| `documentation` | Documents techniques et fonctionnels | API docs, guides, README |
| `specification` | Spécifications et définitions | Specs API, schémas de données |
| `code` | Artefacts de code | Composants, modules, configs, IaC |
| `design` | Artefacts de design | Maquettes, tokens, guidelines |
| `strategy` | Documents stratégiques | ADR, roadmaps, audits |
| `report` | Rapports et analyses | Audits, tests, reviews |
| `process` | Process et workflows | Checklists, templates projet |
| `marketing` | Marketing et acquisition | SEO, campagnes, personas |
| `wordpress` | WordPress et Gutenberg | Blocs, thèmes, CPT |
| `legal` | Conformité juridique | RGPD, CGV, politiques |
| `support` | Support client | FAQ, SLAs, knowledge base |
| `commercial` | Vente et propositions | Devis, propositions |
| `finance` | Finance et comptabilité | Factures, budgets |

## Livrables par Catégorie

### Documentation

| ID | Nom | Agents producteurs | Statut |
|----|-----|-------------------|--------|
| `technical-documentation` | Documentation Technique | direction-technique, backend-developer | Active |
| `api-documentation` | Documentation API | backend-developer/api/* | Active |
| `onboarding-guide` | Guide d'Onboarding | direction-technique/communication | Active |

### Specification

| ID | Nom | Agents producteurs | Statut |
|----|-----|-------------------|--------|
| `api-specification` | Spécification API REST | backend-developer/api/rest-design | Active |
| `data-model` | Modèle de Données | direction-technique/specification | Active |
| `openapi-schema` | Schéma OpenAPI | backend-developer/api/openapi-spec | Active |

### Strategy

| ID | Nom | Agents producteurs | Statut |
|----|-----|-------------------|--------|
| `adr` | Architecture Decision Record | direction-technique/architecture/adr | Active |
| `technical-audit` | Audit Technique | direction-technique/avant-projet | Active |
| `stack-recommendation` | Recommandation Stack | direction-technique/avant-projet | Active |

### Report

| ID | Nom | Agents producteurs | Statut |
|----|-----|-------------------|--------|
| `code-review-report` | Rapport de Code Review | lead-dev/code-review | Active |
| `test-report` | Rapport de Tests | testing-process/* | Active |
| `accessibility-audit` | Audit Accessibilité | frontend-developer/foundations/accessibilite | Active |

### Design

| ID | Nom | Agents producteurs | Statut |
|----|-----|-------------------|--------|
| `design-tokens` | Design Tokens | design-system-foundations/foundations | Active |
| `component-specs` | Spécifications Composants | design-system-foundations/atoms, molecules | Active |
| `brand-guidelines` | Charte Graphique | direction-artistique/branding | Active |

### Code

| ID | Nom | Agents producteurs | Statut |
|----|-----|-------------------|--------|
| `react-component` | Composant React | react-expert, frontend-developer | Active |
| `api-endpoint` | Endpoint API | backend-developer/api | Active |
| `ci-pipeline` | Pipeline CI/CD | devops/cicd | Active |
| `docker-compose-config` | Configuration Docker Compose | devops/containerization, backend-developer | Active |
| `infrastructure-as-code` | Infrastructure as Code (IaC) | devops/infrastructure | Active |

### Process

| ID | Nom | Agents producteurs | Statut |
|----|-----|-------------------|--------|
| `project-brief` | Brief Projet | project-management/avant-projet | Active |
| `sprint-planning` | Planning Sprint | project-management/execution | Active |
| `deployment-checklist` | Checklist Déploiement | devops/deployment | Active |

### Legal

| ID | Nom | Agents producteurs | Statut |
|----|-----|-------------------|--------|
| `privacy-policy` | Politique de Confidentialité | legal-compliance/documents, legal-compliance/rgpd | Active |
| `terms-of-service` | CGU / CGV | legal-compliance/documents, legal-compliance/contracts | Active |
| `rgpd-compliance-report` | Rapport Conformité RGPD | legal-compliance/audit, legal-compliance/rgpd | Active |
| `cookie-policy` | Politique de Cookies | legal-compliance/cookies | Active |

### Support

| ID | Nom | Agents producteurs | Statut |
|----|-----|-------------------|--------|
| `faq` | Foire Aux Questions | support-client/knowledge | Active |
| `sla-definition` | Définition des SLAs | support-client/escalation, direction-operations | Active |

### Commercial

| ID | Nom | Agents producteurs | Statut |
|----|-----|-------------------|--------|
| `commercial-proposal` | Proposition Commerciale / Devis | commercial-crm/negotiation, commercial-crm/prospection | Active |

### Finance

| ID | Nom | Agents producteurs | Statut |
|----|-----|-------------------|--------|
| `invoice-template` | Template de Facture | finance-analytics/billing | Active |
| `budget-plan` | Plan Budgétaire | finance-analytics/forecasting | Active |

## Matrice Agents → Livrables

> Cette matrice sera générée automatiquement à partir des frontmatter des livrables.

| Agent | Produit | Consomme |
|-------|---------|----------|
| `direction-technique/architecture/adr` | `adr` | - |
| `backend-developer/api/rest-design` | `api-specification` | `data-model` |
| `backend-developer/api/openapi-spec` | `openapi-schema` | `api-specification` |
| ... | ... | ... |

## Comment Ajouter un Livrable

1. **Copier le template** : `cp templates/deliverable-template.md by-category/[category]/[id].md`
2. **Remplir le frontmatter** : ID, name, category, agents, etc.
3. **Documenter le livrable** : Description, format, critères
4. **Mettre à jour cet INDEX** : Ajouter dans la catégorie appropriée
5. **Référencer dans l'agent** : Ajouter dans le frontmatter de l'agent

## Conventions

### Nommage des IDs
- `kebab-case` uniquement
- Descriptif et court (2-4 mots max)
- Préfixe par domaine si ambiguïté (`api-specification` vs `functional-specification`)

### Versioning
- Suivre le versioning sémantique (MAJOR.MINOR.PATCH)
- MAJOR : Changement breaking dans la structure
- MINOR : Ajout de sections optionnelles
- PATCH : Corrections, clarifications

### Statuts
| Statut | Description |
|--------|-------------|
| `draft` | En cours de définition, non utilisable |
| `active` | Validé et utilisable |
| `deprecated` | Obsolète, ne plus utiliser (indiquer le remplaçant) |
