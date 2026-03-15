# Qualification & Routing

## Classification des intentions

### Framework de classification

1. **Analyser** le contenu brut (sujet, corps, pieces jointes)
2. **Identifier** l'intention principale (voir taxonomie SKILL.md)
3. **Sous-classifier** le type de projet si `new_project`
4. **Scorer** la confiance (0.0 - 1.0)

### Types de projet (si new_project)

| Type | Exemples |
|------|----------|
| `website` | Site vitrine, corporate |
| `ecommerce` | Boutique en ligne, marketplace |
| `webapp` | Application web, SaaS |
| `redesign` | Refonte de site existant |
| `migration` | Migration de plateforme |
| `landing_page` | Landing page, campagne |

## Evaluation de complexite

| Signal | Indicateur complexite haute |
|--------|-----------------------------|
| Pages | > 15 pages |
| Integrations | > 3 systemes externes |
| E-commerce | Catalogue > 500 produits |
| Multi-langue | > 2 langues |
| Custom | Fonctionnalites sur mesure |

## Detection d'urgence

| Signal | Priorite |
|--------|----------|
| "urgent", "ASAP", "prod down" | P1 |
| "deadline", "date limite", "bloquant" | P2 |
| "des que possible", "rapidement" | P3 |
| Aucun signal d'urgence | P4 |

## Estimation budget preliminaire

Croiser la complexite (S/M/L/XL) avec le type de projet :
- Site vitrine S = 1.5k-3k / M = 3k-8k
- E-commerce M = 8k-15k / L = 15k-40k
- Webapp L = 20k-50k / XL = 50k-120k

## Routage vers skills

### Matrice de routage par intent

| Intent | Skill primaire | Skills secondaires |
|--------|---------------|-------------------|
| `new_project` | project-management | direction-technique |
| `support_request` | lead-dev | support-client |
| `bug_report` | lead-dev | devops |
| `quote_request` | project-management | commercial-crm |
| `feature_request` | project-management | lead-dev |
| `consultation` | direction-technique | - |

### Routage par stack technique

| Stack detectee | Skill specialise |
|----------------|-----------------|
| React/Next.js | react-expert, nextjs-expert |
| WordPress | wordpress-expert |
| Node/Express/API | backend-developer |
| CI/CD, Docker | devops |

## Priorisation

Score = (urgence * 40) + (valeur_business * 30) + (complexite_inverse * 20) + (anciennete * 10)

| Score | Queue |
|-------|-------|
| 80-100 | Immediate |
| 60-79 | Haute priorite |
| 40-59 | Normale |
| 0-39 | Basse priorite |

## Verification de faisabilite

Avant routage, verifier :
- [ ] Budget coherent avec complexite
- [ ] Timeline realiste (min 2 sem pour S, 6 sem pour M)
- [ ] Stack supportee par l'agence
- [ ] Pas de conflit legal/ethique
- Si non faisable : reponse honnete + alternatives
