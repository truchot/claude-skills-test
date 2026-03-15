# Customer Success & Métriques - Référence condensée

## Health Score Composite (0-100)

### Pondération
| Dimension | Poids | Composantes |
|-----------|-------|-------------|
| Usage | 30% | Fréquence connexion, profondeur features, volume données |
| Satisfaction | 25% | NPS, CSAT, tickets (ratio résolu/ouvert), sentiment |
| Business Fit | 25% | Adoption use cases, ROI démontré, croissance compte |
| Relationship | 20% | Engagement CSM, participation events, réponse surveys |

### Segmentation par Score
| Score | Statut | Action |
|-------|--------|--------|
| 81-100 | Champion | Expansion, advocacy, case study |
| 61-80 | Healthy | Maintenir, identifier opportunités |
| 41-60 | Neutral | Investiguer, plan engagement |
| 21-40 | At Risk | Intervention CSM, plan de sauvetage |
| 0-20 | Critical | Escalade management, action immédiate |

### Alertes
- Baisse >15 points en 30j → alerte CSM
- Passage sous seuil 40 → escalade manager
- 2 dimensions sous 30% → plan intervention

## NPS / CSAT / CES

### NPS (Net Promoter Score)
- Échelle 0-10 : Détracteurs (0-6), Passifs (7-8), Promoteurs (9-10)
- NPS = % Promoteurs - % Détracteurs | Bon >30, Excellent >50
- Fréquence : transactionnel (post-interaction) + relationnel (trimestriel)
- **Benchmarks** : SaaS 30-40, E-commerce 40-50, Services 50-60

### CSAT (Customer Satisfaction)
- Échelle 1-5 | CSAT = réponses 4-5 / total × 100 | Cible >80%
- Utiliser post-interaction (ticket, achat, onboarding)

### CES (Customer Effort Score)
- Échelle 1-7 | Cible >6 (effort minimal)
- Mesurer après parcours complexes (setup, migration, résolution problème)

### Design Survey
- Max 3 questions, < 1 min | Taux réponse cible >25%
- Toujours inclure question ouverte "Pourquoi ?"

### Closed-Loop Process
- **Détracteur** : contact <24h, diagnostic, plan résolution, suivi J+15
- **Passif** : email remerciement + question amélioration, action J+7
- **Promoteur** : remerciement + demande avis/referral/case study

## CSM Operations

### Modèles par Segment
| Segment | Ratio CSM:Clients | Touch | Cadence |
|---------|-------------------|-------|---------|
| Enterprise | 1:10-20 | High-touch | Hebdomadaire |
| Mid-Market | 1:30-50 | Mid-touch | Bi-mensuelle |
| SMB | 1:100-200 | Low-touch | Mensuelle auto |
| Self-serve | 1:500+ | Tech-touch | Automatisé |

### Playbooks CSM Clés
1. **Handoff new client** : intro CSM J+1 post-vente → kickoff J+3 → plan succès J+7
2. **Client silencieux** : J7 check-in → J14 valeur ajoutée → J21 appel → J30 escalade
3. **Prépa renouvellement** : J-90 health check → J-60 QBR → J-30 proposition → J-Day

### KPIs CSM
- GRR (Gross Revenue Retention) >90% | NRR (Net Revenue Retention) >100%
- Time-to-Value <14j | Expansion rate >20% | NPS portefeuille >40

## QBR (Quarterly Business Review)

### Structure (45-60 min)
1. **Bilan** (10 min) : métriques clés, usage, incidents
2. **ROI** (10 min) : valeur délivrée vs objectifs, chiffres concrets
3. **Feedback** (10 min) : satisfaction, points de friction, suggestions
4. **Roadmap** (10 min) : features à venir alignées besoins client
5. **Plan** (10 min) : objectifs prochain trimestre, actions mutuelles
6. **Next steps** (5 min) : récap actions, owners, deadlines

### Préparation
- [ ] Données usage 90 derniers jours extraites
- [ ] ROI calculé et chiffré (€ ou heures économisées)
- [ ] Feedback équipe support/CSM compilé
- [ ] Roadmap produit filtrée (features pertinentes client)
- [ ] Deck préparé (max 12 slides, visuel > texte)

## VoC (Voix du Client)
- **Sources** : sollicitées (surveys, interviews, advisory board 8-15 membres) | non sollicitées (tickets, avis, réseaux sociaux) | observées (analytics, heatmaps)
- **Framework** : Collecter → Catégoriser → Quantifier (fréquence × impact) → Prioriser → Agir → Communiquer ("You asked, we listened")
- **Checklist** : 3+ sources actives, process priorisation défini, boucle retour systématique, revue VoC mensuelle en comité produit
