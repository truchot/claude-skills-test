---
name: support-client
description: >-
  Expert Support Client pour ticketing, base de connaissances, escalade et satisfaction.
  TRIGGER when: ticket support, FAQ, bug utilisateur, escalade, satisfaction client, NPS, documentation utilisateur.
---

## Domaines d'expertise

- **Ticketing** - Triage, classification, routage, resolution, cloture tickets (voir `ticketing-escalation.md`)
- **Escalation** - Gestion escalades L1/L2/L3, incidents, suivi SLA (voir `ticketing-escalation.md`)
- **Knowledge** - Base de connaissances, FAQ, articles, tutoriels (voir `knowledge-satisfaction.md`)
- **Satisfaction** - NPS, CSAT, feedback, amelioration continue (voir `knowledge-satisfaction.md`)

## Workflow principal

```
Ticket recu → Triage (categorie + priorite) → Resolution L1
→ [Si besoin: Escalade L2/L3] → Cloture → Feedback satisfaction
```

## Niveaux de support

| Niveau | Responsabilite | SLA reponse | SLA resolution |
|--------|----------------|------------|----------------|
| L1 | Questions simples, FAQ, how-to | 1h | 4h |
| L2 | Problemes techniques, config | 2h | 8h |
| L3 | Bugs, developpement requis | 4h | 24h |

## Categories de tickets

| Categorie | Description | SLA |
|-----------|-------------|-----|
| Bug/Incident | Probleme technique | P1: 4h, P2: 8h |
| Question | How-to, fonctionnement | 24h |
| Feature Request | Nouvelle fonctionnalite | 48h |
| Billing | Facturation, paiement | 24h |
| Account | Compte, acces, securite | 8h |
| Feedback | Retour, suggestion | 72h |

## Matrice de priorite

| Impact / Urgence | Critique | Haute | Normale |
|------------------|----------|-------|---------|
| **Bloquant** | P1 | P1 | P2 |
| **Degrade** | P1 | P2 | P3 |
| **Mineur** | P2 | P3 | P4 |

## Metriques cles

| Metrique | Cible |
|----------|-------|
| First Response Time | < 1h (L1) |
| Resolution Time | < 4h (L1), < 8h (L2) |
| First Contact Resolution | > 70% |
| CSAT | > 90% |
| NPS | > 40 |
| Ticket backlog | < 20 |
| SLA compliance | > 95% |

## Livrables types

- Reponses tickets personnalisees
- Articles de FAQ et tutoriels
- Rapports satisfaction (NPS, CSAT)
- Analyses tickets recurrents
- Guides utilisateur
- Plans d'amelioration support

## Coordination

| Skill | Interaction |
|-------|-------------|
| `client-intake` | Reception des demandes support |
| `lead-dev` | Escalade technique L3 |
| `project-management` | Reporting client, suivi |
| `commercial-crm` | Impact satisfaction sur retention |

## Escalation

- **lead-dev** : bugs confirmes, developpement requis (L3)
- **project-management** : reporting, SLA critiques
- **direction-technique** : incidents majeurs, architecture
- **commercial-crm** : risque churn lie au support
