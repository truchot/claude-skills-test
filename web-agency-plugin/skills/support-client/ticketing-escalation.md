# Ticketing & Escalation

## Workflow ticketing

```
Reception → Triage (categorie + priorite) → Routage (equipe + agent) → Resolution → Cloture → Feedback
```

## Triage des tickets

1. **Classifier** categorie (Bug, Question, Feature, Billing, Account, Feedback)
2. **Evaluer** impact (Bloquant/Degrade/Mineur) x urgence (Critique/Haute/Normale)
3. **Priorite** : Bloquant+Critique=P1, Degrade+Haute=P2, Mineur+Normale=P4 (voir matrice SKILL.md)

## Equipes & Routage

| Equipe | Competences | Niveau |
|--------|-------------|--------|
| Support L1 | Questions generales, how-to, FAQ | Tier 1 |
| Tech Support L2 | Bugs, configuration, diagnostic | Tier 2 |
| Dev Support L3 | Bugs complexes, code fixes | Tier 3 |
| Billing | Facturation, remboursements | Specialise |
| Account Security | Securite, fraude, acces | Specialise |

| Condition | Destination | Action supplementaire |
|-----------|-------------|----------------------|
| Question P3/P4 | Support L1 | - |
| Bug P2 | Tech Support L2 | - |
| Bug P1 | Tech Support L2 | Escalade auto L3 + alerte |
| Billing | Billing | - |
| Account + tags securite/fraude | Account Security | Override P1 |
| Feature Request | Support L1 | Transfert Product backlog |

Assignation agent : disponibilite → competence categorie → charge la plus faible → file d'attente.

## SLA par priorite

| Priorite | 1ere reponse | Resolution | Escalade auto |
|----------|-------------|------------|---------------|
| P1 | 15 min | 4h | Apres 2h sans reponse |
| P2 | 1h | 8h | Apres 4h sans progres |
| P3 | 4h | 24h | Apres 12h sans progres |
| P4 | 8h | 72h | Apres 48h sans progres |

Alertes : **75%** temps ecoule → notifier agent | **90%** → notifier manager | **100%** (breach) → escalade auto + rapport.

## Resolution et cloture

Templates reponse (validation humaine requise) : accuse reception, demande info, resolution, escalade.

**Checklist cloture :** resolution confirmee, solution documentee (alimente KB), ticket tagge, enquete CSAT envoyee J+1.

| Statut | Condition |
|--------|-----------|
| Resolu | Solution confirmee par client |
| Resolu - Auto | Pas de reponse 7 jours |
| Non resolu | Hors scope / abandonne (raison documentee) |
| Duplicate | Merge avec ticket existant |

---

## Matrice d'escalation

| Motif | De → Vers | Trigger |
|-------|-----------|---------|
| Complexite technique | L1 → L2 | Hors competence L1 |
| Bug confirme | L2 → L3 (Dev) | Necessite code fix |
| Client VIP mecontent | L1/L2 → Manager | Tier Premium/Enterprise |
| Menace legale | Any → Legal | Mots-cles detectes |
| Securite/Fraude | Any → Security | Risque compte |
| SLA depasse | Any → Manager | Breach SLA |

### Template escalade

```
Escalade [TICKET-ID] | De: [L1/L2] → Vers: [L2/L3/Manager]
Priorite: [P1-P4] | SLA restant: [temps] | Tier: [Standard/Premium/VIP]
Contexte: [resume] | Revenue at risk: [Oui/Non]
Actions tentees: [action → resultat] | Attendu: [action destinataire]
```

## Gestion des incidents majeurs

Incident majeur = P1 affectant >10% utilisateurs ou service indisponible.

| Severite | Impact | Exemples |
|----------|--------|----------|
| SEV1 | Service down | Site inaccessible |
| SEV2 | Fonctionnalite majeure KO | Paiements casses |
| SEV3 | Degradation | Lenteurs, erreurs partielles |

### Processus incident
```
Detection (monitoring/tickets multiples/escalade)
→ Triage severite → War room (equipe + bridge call + roles)
→ Resolution (root cause → fix → staging → prod)
→ Communication (status page + clients + interne)
→ Post-mortem (timeline, root cause, actions correctives, prevention)
```
