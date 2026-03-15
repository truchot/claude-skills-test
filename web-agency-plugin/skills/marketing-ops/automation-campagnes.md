# Automation & Campagnes - Référence condensée

## Marketing Automation

### Workflows essentiels
| Workflow        | Trigger             | Séquence          | Objectif     |
|-----------------|---------------------|--------------------|--------------|
| Welcome         | Inscription         | J0→J1→J3→J7       | Onboarding   |
| Lead nurturing  | Download contenu    | J0→J3→J7→J14→J21  | MQL→SQL      |
| Abandon panier  | Panier non finalisé | H1→H24→J3         | Récupération |
| Re-engagement   | Inactif 30j+        | J30→J37→J45        | Réactivation |
| Post-achat      | Achat complété      | J0→J7→J30          | Fidélisation |

### Template nurturing
```
J0: Merci + ressource (open rate > 50%)  |  J14: Contenu avancé + soft CTA
J3: Contenu éducatif (valeur pure)       |  J21: Offre / démo (hard CTA)
J7: Case study / témoignage              |
```

### Lead Scoring
**Fit (démographique)** : Titre décideur +20, Entreprise ICP +15, Email pro +5, Email perso -5
**Engagement** : Visite pricing +15, Download +10, Clic email +5, Demande démo +25, Inactif 30j -10

| Score  | Statut                        |
|--------|-------------------------------|
| < 30   | Cold → nurturing              |
| 30-60  | Warm → MQL                    |
| 60-80  | Hot → SQL (commercial)        |
| > 80   | Sales ready (transfert immédiat)|

### Outils automation
| Outil          | Cible      | Force                |
|----------------|------------|----------------------|
| HubSpot        | PME-ETI    | All-in-one           |
| Brevo          | PME, FR    | Prix, simplicité     |
| ActiveCampaign | PME        | Automation avancée   |
| Klaviyo        | E-commerce | Intégration Shopify  |

## Gestion de campagnes

### Planning - template
```
Objectif SMART → Budget réparti par canal → Cible (persona/segment)
→ Canaux (Email+Social+SEA+...) → KPIs cibles → Timeline
```

### Coordination multi-canal
| Phase     | Email         | Social   | SEA       | Display   |
|-----------|---------------|----------|-----------|-----------|
| Teasing   | -             | Organique| -         | -         |
| Lancement | Blast         | Boost    | Activer   | Activer   |
| Sustain   | Nurture       | Régulier | Optimiser | Retarget  |
| Clôture   | Dernière chance| Urgence  | Pause     | Pause     |

### Budget allocation
```
Canaux prouvés (ROI connu) : 60-70%  |  Test nouveaux : 20-30%  |  Expérimentation : 10%
```

## Suivi performance

### Métriques par canal
| Canal  | Primaire       | Secondaire    | Seuil alerte    |
|--------|----------------|---------------|-----------------|
| Email  | Open rate > 25%| CTR > 3%      | Unsub > 0.5%    |
| Social | Engagement > 3%| Reach         | ER < 1%         |
| SEA    | ROAS > 3x      | CPA < seuil   | QS < 5          |
| Display| Viewability >70%| CTR > 0.15%  | Brand safety <95%|

### Cadence de suivi
| Fréquence  | Action                            |
|------------|-----------------------------------|
| Quotidien  | Budget pacing, anomalies          |
| Hebdo      | Optimisation enchères, audiences  |
| Mensuel    | Reporting complet, stratégie      |
| Trimestriel| Bilan ROI, replanification        |

## Checklist lancement campagne
- [ ] Brief validé (objectif SMART, cible, budget)
- [ ] Assets créatifs produits et validés
- [ ] Landing page live et testée
- [ ] Tracking UTMs + pixels/conversions vérifiés
- [ ] Audiences segmentées et uploadées
- [ ] Séquences automation activées
- [ ] Budget réparti par canal et par jour
- [ ] Go/no-go stakeholders obtenu
