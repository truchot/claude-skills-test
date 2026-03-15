# Ticketing & Escalade

## Workflow ticketing

```
Reception → Triage (categorie + priorite) → Routage → Resolution → Cloture → Feedback
```

## Triage des tickets

1. **Classifier** la categorie (Bug, Question, Feature, Billing, Account, Feedback)
2. **Evaluer** impact (Bloquant, Degrade, Mineur) et urgence (Critique, Haute, Normale)
3. **Attribuer** priorite P1-P4 via matrice, **router** vers le niveau adequat

### Routage automatique

| Categorie + Priorite | Niveau | Assignation |
|----------------------|--------|-------------|
| Bug P1 | L2/L3 | Dev senior + alert manager |
| Bug P2-P3 | L2 | Dev disponible (load balancing) |
| Question P3-P4 | L1 | Agent support |
| Feature Request | L1 | Product backlog |
| Billing | L1 | Equipe admin |
| Account + securite | L2 | Admin systeme, priorite P1 forcee |

## SLA par priorite

| Priorite | 1ere reponse | Resolution | Escalade auto |
|----------|-------------|------------|---------------|
| P1 | 15 min | 4h | Apres 2h sans reponse |
| P2 | 1h | 8h | Apres 4h sans progres |
| P3 | 4h | 24h | Apres 12h sans progres |
| P4 | 8h | 72h | Apres 48h sans progres |

### Alertes SLA

| Seuil | Action |
|-------|--------|
| 75% temps ecoule | Notifier agent |
| 90% temps ecoule | Notifier manager |
| 100% (breach) | Escalade auto + rapport |

## Resolution et cloture

**Template reponse :** `Bonjour [Prenom], ref [TICKET-ID]. Diagnostic: [X]. Solution: [Y]. Statut: [Resolu/En cours/Escalade].`

**Checklist cloture :**
- [ ] Probleme resolu et confirme par le client
- [ ] Solution documentee (alimente la base de connaissances)
- [ ] Ticket categorise correctement (stats)
- [ ] Enquete satisfaction envoyee (J+1)

Cloture auto si pas de reponse client apres 7 jours.

## Matrice d'escalade

| Motif | De → Vers | Trigger |
|-------|-----------|---------|
| Complexite technique | L1 → L2 | Hors competence L1 |
| Bug confirme | L2 → L3 (Dev) | Necessite code fix |
| Client VIP mecontent | L1/L2 → Manager | Tier Premium/Enterprise |
| Menace legale | Any → Legal | Mots-cles detectes |
| Securite/Fraude | Any → Security | Risque compte |
| SLA depasse | Any → Manager | Breach SLA |

### Template escalade

```markdown
## Escalade - [TICKET-ID]
**De :** [L1/L2] | **Vers :** [L2/L3/Manager]
**Priorite :** [P1-P4] | **SLA restant :** [temps]
**Contexte :** [resume du probleme]
**Actions tentees :** 1. [action] → [resultat]
**Attendu :** [ce qui est attendu de l'equipe destinataire]
**Impact :** Tier [Standard/Premium/VIP] | Revenue at risk: [Oui/Non]
```

## Gestion des incidents majeurs

**Incident majeur** = P1 affectant >10% utilisateurs ou service indisponible.

| Severite | Impact | Exemples |
|----------|--------|----------|
| SEV1 | Service down | Site inaccessible |
| SEV2 | Fonctionnalite majeure KO | Paiements casses |
| SEV3 | Degradation | Lenteurs, erreurs partielles |

### Processus incident

```
Detection → Confirmation severite → War room → Resolution → Communication → Post-mortem
```

Post-mortem obligatoire : timeline, root cause, actions correctives, mesures de prevention.
