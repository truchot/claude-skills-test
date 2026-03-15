---
name: client-intake
description: >-
  Point d'entree automatise pour reception, qualification et routage des demandes clients.
  TRIGGER when: nouveau client, demande entrante, email/formulaire/chat, brief projet, qualification besoin.
---

## Domaines d'expertise

- **Reception** - Parsing multi-canal : email, formulaire, chat, webhook, pieces jointes (voir `qualification-routing.md`)
- **Qualification** - Classification intention, complexite, urgence, budget, faisabilite (voir `qualification-routing.md`)
- **Extraction** - Requirements, stakeholders, timeline, stack technique, contraintes
- **Response** - Accuses reception, demandes clarification, notifications statut (voir `response-templates.md`)
- **Routing** - Matching skill, priorisation, load balancing, resolution dependances (voir `qualification-routing.md`)

## Workflow principal

```
Demande entrante → Reception (parse canal) → Qualification (intent + complexite + urgence)
→ Extraction (requirements + contacts + timeline) → Response (accuse reception)
→ Routing (skill matching + priorisation) → OUTPUT task-orchestrator
```

## Types d'intentions reconnus

| Intent | Description | Route primaire |
|--------|-------------|----------------|
| `new_project` | Nouveau projet web | project-management |
| `support_request` | Demande de support | lead-dev |
| `bug_report` | Signalement de bug | lead-dev |
| `quote_request` | Demande de devis | project-management |
| `feature_request` | Demande d'evolution | project-management |
| `consultation` | Conseil/consultation | direction-technique |
| `partnership` | Proposition partenariat | project-management |
| `spam` | Non sollicite | IGNORE |
| `unclear` | Intention indeterminee | CLARIFICATION |

## Niveaux de complexite

| Niveau | Criteres | Budget typique | Duree |
|--------|----------|----------------|-------|
| **S** | 1-2 pages, pas d'integration | < 3k | < 2 sem |
| **M** | 5-10 pages, 1-2 integrations | 3k-10k | 2-6 sem |
| **L** | 10-30 pages, e-commerce, 3+ integrations | 10k-30k | 2-4 mois |
| **XL** | App complexe, multi-plateforme | 30k-100k | 4-12 mois |

## Niveaux d'urgence

| Priorite | Delai reponse | Criteres |
|----------|---------------|----------|
| **P1** | < 1h | Prod down, faille securite |
| **P2** | < 4h | Bug bloquant, deadline imminente |
| **P3** | < 24h | Demande standard avec date limite |
| **P4** | < 72h | Demande standard, pas d'urgence |

## Format de sortie (Intake Record)

```json
{
  "intake_id": "INK-YYYY-XXXXXX",
  "channel": "email|form|chat|webhook",
  "client": { "name": "", "contact": "", "email": "" },
  "classification": { "intent": "", "complexity": "S|M|L|XL", "urgency": "P1-P4" },
  "requirements": { "summary": "", "features": [], "constraints": [] },
  "routing": { "primary_skill": "", "priority_score": 0 }
}
```

## Escalade humaine automatique

- Demande > 50k estime
- Client VIP/strategique identifie
- Mention legale/RGPD/contentieux
- Intention indeterminee apres 2 clarifications
- Score de confiance < 0.6

## Metriques cles

| Metrique | Cible |
|----------|-------|
| Time to Acknowledge | < 5 min |
| Classification Accuracy | > 90% |
| Routing Accuracy | > 95% |
| Escalation Rate | < 10% |

## Escalation

- **project-management** : transition vers gestion de projet
- **direction-technique** : consultations et decisions architecture
- **lead-dev** : support technique et bugs
