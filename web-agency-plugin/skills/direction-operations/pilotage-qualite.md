# Pilotage & Qualite - Condensed

## Priorisation (WSJF)

### Formule
```
WSJF = (Business Value + Time Criticality + Risk Reduction) / Job Size
```
| Critere | Poids |
|---------|-------|
| Business Value | 30% |
| Time Criticality | 25% |
| Risk Reduction | 20% |
| Job Size (inverse) | 25% |

## Risques Portefeuille

### Categories
| Categorie | Exemples |
|-----------|----------|
| Financier | Depassement budget, non-paiement |
| Ressources | Turnover, indisponibilite cle |
| Technique | Dette technique, obsolescence |
| Client | Changement scope, insatisfaction |
| Marche | Concurrence, evolution techno |

### Matrice Probabilite x Impact
| | Faible | Moyen | Eleve |
|--|--------|-------|-------|
| Probable | Moyen | Haut | Critique |
| Possible | Faible | Moyen | Haut |
| Peu probable | Faible | Faible | Moyen |

## Reporting Direction

### KPIs cles
| Categorie | KPI | Cible |
|-----------|-----|-------|
| Delivery | On-time delivery | > 85% |
| Qualite | Bugs post-livraison | < 5/sprint |
| Finance | Marge projet moyenne | > 30% |
| Equipe | Turnover | < 15%/an |
| Client | NPS | > 40 |

## Standards Qualite

### Code
| Critere | Standard |
|---------|----------|
| Coverage tests | > 80% |
| Complexite cyclomatique | < 10 |
| Code review | Obligatoire |
| Documentation | README + JSDoc |

### Design
- Alignement grille, palette, typo conformes
- Composants DS, responsive valide
- Etats interactifs tous definis

## SLAs Standard

### Support/Maintenance
| Priorite | Temps Reponse | Temps Resolution |
|----------|---------------|------------------|
| P1 Critique | 1h | 4h |
| P2 Majeur | 4h | 24h |
| P3 Mineur | 24h | 72h |
| P4 Evolution | 72h | Planifie |

## Metriques Operations

### Delivery
| Metrique | Cible |
|----------|-------|
| Velocity | Stable +/-10% |
| Lead time | < 2 semaines |
| Cycle time | < 3 jours |
| Throughput | Croissant |

## Amelioration Continue (PDCA)

```
Plan : Identifier probleme, analyser causes (5 Whys)
Do   : Implementer la solution
Check : Mesurer les resultats
Act  : Standardiser ou ajuster
```

### Sources d'amelioration
- Retrospectives equipe
- Post-mortems incidents
- Metriques de performance
- Audits processus (trimestriels)

## Audit : Dev/PM/QA trimestriel, Security semestriel

## Escalade
Budget > 20% → Dir Ops | Retard > 2 sem → Lead+PM | Blocage > 3j → Dir Tech | Conflit > 48h → Dir Ops | NPS < 6 → Dir Com
