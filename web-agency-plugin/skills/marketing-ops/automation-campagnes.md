# Automation & Campagnes - Référence condensée

## Marketing Automation

### Workflows essentiels

| Workflow           | Trigger                  | Séquence type              | Objectif        |
|--------------------|--------------------------|----------------------------|-----------------|
| Welcome            | Inscription              | J0→J1→J3→J7               | Onboarding      |
| Lead nurturing     | Download contenu         | J0→J3→J7→J14→J21          | MQL→SQL         |
| Abandon panier     | Panier non finalisé      | H1→H24→J3                 | Récupération    |
| Re-engagement      | Inactif 30j+             | J30→J37→J45               | Réactivation    |
| Post-achat         | Achat complété           | J0→J7→J30→J90             | Fidélisation    |

### Template séquence email nurturing
```
J0  : Merci + ressource promise (Open rate cible > 50%)
J3  : Contenu éducatif lié au sujet (valeur pure)
J7  : Case study / témoignage client
J14 : Contenu avancé + soft CTA
J21 : Offre / démo / RDV (hard CTA)
```

### Lead Scoring

**Fit Score (démographique)**
| Critère            | Score  |
|--------------------|--------|
| Titre décideur     | +20    |
| Entreprise ICP     | +15    |
| Bonne industrie    | +10    |
| Email pro          | +5     |
| Email perso        | -5     |

**Engagement Score (comportemental)**
| Action             | Score  | Decay    |
|--------------------|--------|----------|
| Visite pricing     | +15    | 30 jours |
| Download guide     | +10    | 60 jours |
| Ouverture email    | +3     | 14 jours |
| Clic email         | +5     | 30 jours |
| Demande démo       | +25    | -        |
| Inactif 30j        | -10    | -        |

**Seuils qualification**
```
Score < 30  → Cold lead (nurturing)
30-60       → Warm lead (MQL)
60-80       → Hot lead (SQL → commercial)
> 80        → Sales ready (transfert immédiat)
```

### Outils automation
| Outil       | Cible         | Force                  |
|-------------|---------------|------------------------|
| HubSpot     | PME-ETI       | All-in-one             |
| Brevo       | PME, FR       | Prix, simplicité       |
| ActiveCampaign| PME         | Automation avancée     |
| Marketo     | Enterprise    | Complexité, scale      |
| Klaviyo     | E-commerce    | Intégration Shopify    |

## Gestion de campagnes

### Planning campagne - template
```
Nom      : [Campagne] - [Période]
Objectif : [SMART: spécifique, mesurable, atteignable, réaliste, temporel]
Budget   : [Montant] réparti sur [canaux]
Cible    : [Persona] - [Segment]
Canaux   : [Email + Social + SEA + ...]
KPIs     : [Métrique 1 = cible, Métrique 2 = cible]
Timeline : [Date début → Date fin]
```

### Coordination multi-canal
| Phase       | Email    | Social   | SEA      | Display  |
|-------------|----------|----------|----------|----------|
| Teasing     | -        | Organique| -        | -        |
| Lancement   | Blast    | Boost    | Activer  | Activer  |
| Sustain     | Nurture  | Régulier | Optimiser| Retarget |
| Clôture     | Dernière chance| Urgence | Pause  | Pause    |
| Post        | Merci    | Résultats| Analyse  | -        |

### Budget allocation - règle de base
```
Canaux prouvés (ROI connu)  : 60-70%
Test nouveaux canaux        : 20-30%
Expérimentation pure        : 10%
```

## Suivi performance campagne

### Métriques par canal
| Canal   | Métrique primaire | Secondaire       | Tertiaire     |
|---------|-------------------|------------------|---------------|
| Email   | Open rate > 25%   | CTR > 3%         | Unsubscribe <0.5%|
| Social  | Engagement > 3%   | Reach            | Partages      |
| SEA     | ROAS > 3x         | CPA < seuil      | Quality Score |
| Display | Viewability > 70% | CTR > 0.15%      | Brand safety  |

### Cadence de suivi
| Fréquence   | Action                              |
|-------------|-------------------------------------|
| Quotidien   | Check budget pacing, anomalies      |
| Hebdo       | Optimisation enchères, audiences    |
| Bi-mensuel  | A/B tests créas, ajustements        |
| Mensuel     | Reporting complet, stratégie        |
| Trimestriel | Bilan ROI, replanification          |

## Checklist lancement campagne
- [ ] Brief validé (objectif SMART, cible, budget)
- [ ] Assets créatifs produits et validés
- [ ] Landing page live et testée
- [ ] Tracking UTMs configurés
- [ ] Pixels/conversions vérifiés
- [ ] Audiences segmentées et uploadées
- [ ] Séquences automation activées
- [ ] Budget réparti par canal et par jour
- [ ] Alertes et seuils configurés
- [ ] Go/no-go stakeholders obtenu
