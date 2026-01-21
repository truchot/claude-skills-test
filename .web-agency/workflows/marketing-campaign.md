# Workflow : Campagne Marketing

Workflow complet pour une campagne marketing, de la stratégie à l'analyse des résultats.

## Déclencheurs

- "Lancer une campagne"
- "Stratégie marketing pour..."
- "Acquisition pour le lancement"
- "Plan marketing"

## Étapes avec Gates HITL

```
┌─────────────────────────────────────────────────────────────────┐
│ 1. BRIEF & OBJECTIFS        │ Définir les objectifs SMART       │
│    Agent: strategy          │                                    │
│    🔴 Gate BLOQUANTE        │ Validation objectifs + budget      │
├─────────────────────────────┼────────────────────────────────────┤
│ 2. AUDIENCE & PERSONAS      │ Définir les cibles                 │
│    Agent: content           │                                    │
│    🟡 Gate INFORMATIVE      │ Validation personas                │
├─────────────────────────────┼────────────────────────────────────┤
│ 3. STRATÉGIE CANAUX         │ Mix canaux + budget allocation     │
│    Agent: growth            │                                    │
│    🔴 Gate BLOQUANTE        │ Validation budget + canaux         │
├─────────────────────────────┼────────────────────────────────────┤
│ 4. CONTENU & CRÉATIFS       │ Briefs contenu, messages clés      │
│    Agent: content           │                                    │
│    🔴 Gate BLOQUANTE        │ Validation messages + ton          │
├─────────────────────────────┼────────────────────────────────────┤
│ 5. TRACKING SETUP           │ Plan de mesure, pixels, events     │
│    Agent: analytics         │                                    │
│    🟢 Gate AUTO             │ Vérification technique             │
├─────────────────────────────┼────────────────────────────────────┤
│ 6. LANCEMENT                │ Go live campagnes                  │
│    Agent: growth            │                                    │
│    🔴 Gate BLOQUANTE        │ Go/No-Go avant dépenses            │
├─────────────────────────────┼────────────────────────────────────┤
│ 7. MONITORING & OPTIM       │ Suivi quotidien, ajustements       │
│    Agent: analytics         │                                    │
│    🟡 Gate INFORMATIVE      │ Rapport hebdomadaire               │
├─────────────────────────────┼────────────────────────────────────┤
│ 8. BILAN & LEARNINGS        │ Analyse finale, recommandations    │
│    Agent: analytics         │                                    │
│    🔴 Gate BLOQUANTE        │ Validation learnings + next steps  │
└─────────────────────────────┴────────────────────────────────────┘
```

## Détail des étapes

### Étape 1 : Brief & Objectifs

**Agent** : `skills/strategy/specification.md` + contexte marketing

**Output** :
- `.project/04-specs/campaigns/{{CAMPAIGN_ID}}/brief.md`

**Contenu du brief** :
```yaml
campaign:
  id: "CAMP-001"
  name: "Lancement produit X"
  type: [acquisition | awareness | retention | activation]

context:
  why: "Pourquoi cette campagne maintenant"
  product: "Produit/service concerné"
  market: "Contexte marché"

objectives:
  primary:
    metric: "Leads qualifiés"
    target: 500
    baseline: 0
    deadline: "2024-03-31"

  secondary:
    - metric: "Trafic site"
      target: "+50%"
    - metric: "Brand awareness"
      target: "+20 points"

budget:
  total: 15000€
  breakdown:
    paid: 10000€
    content: 3000€
    tools: 2000€

constraints:
  - "Pas de comparaison directe concurrents"
  - "Tone of voice approuvé uniquement"

success_criteria:
  - "CPA < 30€"
  - "ROAS > 3"
```

**🔴 Gate BLOQUANTE** :

```markdown
---
## 🔴 CHECKPOINT - Validation Brief Campagne

### Campagne : {{CAMPAIGN_NAME}}

| Attribut | Valeur |
|----------|--------|
| **Type** | {{TYPE}} |
| **Objectif principal** | {{OBJECTIVE}} |
| **Budget total** | {{BUDGET}}€ |
| **Durée** | {{DURATION}} |

### Objectifs SMART

| Objectif | Métrique | Cible | Actuel | Deadline |
|----------|----------|-------|--------|----------|
| Principal | {{METRIC}} | {{TARGET}} | {{BASELINE}} | {{DATE}} |
| Secondaire | {{METRIC}} | {{TARGET}} | - | - |

### Budget proposé

| Poste | Montant | % |
|-------|---------|---|
| Paid media | {{X}}€ | {{Y%}} |
| Contenu | {{X}}€ | {{Y%}} |
| Outils | {{X}}€ | {{Y%}} |

### Points d'attention

- {{POINT_1}}
- {{POINT_2}}

---

⚠️ **VALIDATION REQUISE AVANT DE CONTINUER**

- [ ] Les objectifs sont réalistes et alignés avec la stratégie
- [ ] Le budget est approuvé
- [ ] Les contraintes sont comprises

**Décision** : Validé / À ajuster / Refusé

---
```

**Décision documentée** : `.project/03-architecture/decisions/MKT-001-brief-campagne.md`

---

### Étape 2 : Audience & Personas

**Agent** : `skills/marketing/content.md`

**Output** :
- `.project/04-specs/campaigns/{{CAMPAIGN_ID}}/audience.md`

**🟡 Gate INFORMATIVE** : Présente les personas et propose de continuer

---

### Étape 3 : Stratégie Canaux

**Agent** : `skills/marketing/growth.md`

**Output** :
- `.project/04-specs/campaigns/{{CAMPAIGN_ID}}/channel-strategy.md`

**Contenu** :
```yaml
channels:
  - name: "Google Ads - Search"
    objective: "Capture intent"
    budget: 5000€
    kpis:
      cpc_target: 2€
      ctr_target: 5%
      conversions_target: 200
    audiences:
      - "Keywords transactionnels"
      - "Remarketing site"

  - name: "LinkedIn Ads"
    objective: "B2B awareness + leads"
    budget: 3000€
    kpis:
      cpm_target: 15€
      leads_target: 50
    audiences:
      - "Decision makers tech"
      - "Lookalike clients"

  - name: "Content / SEO"
    objective: "Organic traffic"
    budget: 2000€ (production)
    content:
      - "5 articles piliers"
      - "1 lead magnet"

funnel_mapping:
  awareness: ["LinkedIn Ads", "Content"]
  consideration: ["Google Ads", "Retargeting"]
  conversion: ["Google Ads", "Email nurturing"]

timeline:
  week_1: "Setup + tests"
  week_2_4: "Scaling"
  week_5_6: "Optimization"
```

**🔴 Gate BLOQUANTE** :

```markdown
---
## 🔴 CHECKPOINT - Validation Stratégie Canaux

### Mix canaux proposé

| Canal | Budget | % | Objectif |
|-------|--------|---|----------|
| Google Ads | {{X}}€ | {{Y%}} | {{OBJ}} |
| LinkedIn | {{X}}€ | {{Y%}} | {{OBJ}} |
| Content | {{X}}€ | {{Y%}} | {{OBJ}} |

### Projection de résultats

| KPI | Cible | Confiance |
|-----|-------|-----------|
| Leads | {{X}} | Haute |
| CPA moyen | {{X}}€ | Moyenne |
| ROAS | {{X}} | Moyenne |

### Alternatives considérées

| Option | Pour | Contre | Décision |
|--------|------|--------|----------|
| Facebook Ads | Large reach | B2B moins efficace | Rejeté |
| TikTok | Tendance | Pas notre cible | Rejeté |

### Risques

| Risque | Impact | Mitigation |
|--------|--------|------------|
| CPC élevé | Budget insuffisant | Ajuster keywords |

---

⚠️ **VALIDATION REQUISE**

- [ ] Mix canaux validé
- [ ] Budget par canal approuvé
- [ ] Objectifs par canal réalistes

---
```

**Décision documentée** : `.project/03-architecture/decisions/MKT-002-channel-strategy.md`

---

### Étape 4 : Contenu & Créatifs

**Agent** : `skills/marketing/content.md`

**Output** :
- `.project/04-specs/campaigns/{{CAMPAIGN_ID}}/content-briefs/`
  - `ad-copies.md`
  - `landing-page.md`
  - `email-sequence.md`
  - `lead-magnet.md`

**🔴 Gate BLOQUANTE** :

```markdown
---
## 🔴 CHECKPOINT - Validation Contenu

### Messages clés

| Message | Cible | Canal |
|---------|-------|-------|
| "{{MESSAGE_1}}" | {{PERSONA}} | Ads |
| "{{MESSAGE_2}}" | {{PERSONA}} | Landing |

### Tone of Voice

- {{TOV_1}}
- {{TOV_2}}

### Créatifs requis

| Type | Quantité | Statut |
|------|----------|--------|
| Ad copies | {{X}} variations | 📝 Brief prêt |
| Visuels | {{X}} formats | ⏳ En attente |
| Landing page | {{X}} | 📝 Brief prêt |

### Exemples d'ad copies

**Variation A** :
> {{AD_COPY_A}}

**Variation B** :
> {{AD_COPY_B}}

---

⚠️ **VALIDATION REQUISE**

- [ ] Messages clés approuvés
- [ ] Tone of voice respecté
- [ ] Pas de claims problématiques

---
```

---

### Étape 5 : Tracking Setup

**Agent** : `skills/marketing/analytics.md`

**Output** :
- `.project/04-specs/campaigns/{{CAMPAIGN_ID}}/tracking-plan.md`

**🟢 Gate AUTO** : Vérification technique

```yaml
checks:
  - gtm_container: "configured"
  - pixels:
      google_ads: "active"
      linkedin: "active"
  - conversions:
      - name: "lead_form_submit"
        status: "tracking"
      - name: "demo_request"
        status: "tracking"
  - utm_convention: "validated"
  - attribution_model: "data-driven"

result: PASS / FAIL
if_fail: escalade vers humain
```

---

### Étape 6 : Lancement

**Agent** : `skills/marketing/growth.md`

**🔴 Gate BLOQUANTE** : Go/No-Go

```markdown
---
## 🔴 GO/NO-GO - Lancement Campagne

### Checklist pré-lancement

| Item | Statut | Responsable |
|------|--------|-------------|
| Brief validé | ✅ | {{WHO}} |
| Budget débloqué | ✅ | {{WHO}} |
| Créatifs prêts | ✅ | {{WHO}} |
| Landing page live | ✅ | {{WHO}} |
| Tracking vérifié | ✅ | Auto |
| Emails configurés | ✅ | {{WHO}} |

### Risques résiduels

| Risque | Niveau | Accepté ? |
|--------|--------|-----------|
| {{RISK}} | Faible | ✅ |

### Dépenses J1

| Canal | Budget J1 |
|-------|-----------|
| Google Ads | {{X}}€ |
| LinkedIn | {{X}}€ |

---

⚠️ **DÉCISION REQUISE**

**GO** : Lancer les campagnes
**NO-GO** : Reporter (préciser raison)

---
```

**Décision documentée** : `.project/03-architecture/decisions/MKT-003-go-live.md`

---

### Étape 7 : Monitoring & Optimisation

**Agent** : `skills/marketing/analytics.md`

**Output** :
- `.project/05-quality/campaigns/{{CAMPAIGN_ID}}/reports/`
  - `week-1.md`
  - `week-2.md`
  - ...

**🟡 Gate INFORMATIVE** : Rapport hebdomadaire

```markdown
## 🟡 Rapport Semaine {{N}}

### Performance vs Objectifs

| KPI | Cible | Actuel | Tendance | Status |
|-----|-------|--------|----------|--------|
| Leads | {{X}} | {{Y}} | {{+/-Z%}} | 🟢/🟡/🔴 |
| CPA | {{X}}€ | {{Y}}€ | {{+/-Z%}} | 🟢/🟡/🔴 |
| Budget spent | {{X}}€ | {{Y}}€ | - | - |

### Top performers

| Canal | ROAS | Action |
|-------|------|--------|
| {{CHANNEL}} | {{X}} | Scale +20% |

### Underperformers

| Canal | Issue | Action |
|-------|-------|--------|
| {{CHANNEL}} | CPA élevé | Pause + optimize |

### Ajustements proposés

1. {{AJUSTEMENT_1}}
2. {{AJUSTEMENT_2}}

Dois-je appliquer ces ajustements ?
```

---

### Étape 8 : Bilan & Learnings

**Agent** : `skills/marketing/analytics.md`

**Output** :
- `.project/05-quality/campaigns/{{CAMPAIGN_ID}}/bilan-final.md`
- `.project/07-audit/sessions/{{SESSION_ID}}/` (log complet)

**🔴 Gate BLOQUANTE** :

```markdown
---
## 🔴 CHECKPOINT - Bilan Campagne

### Résultats finaux

| Objectif | Cible | Résultat | Écart | Statut |
|----------|-------|----------|-------|--------|
| Leads | {{X}} | {{Y}} | {{+/-Z%}} | ✅/❌ |
| CPA | {{X}}€ | {{Y}}€ | {{+/-Z%}} | ✅/❌ |
| ROAS | {{X}} | {{Y}} | {{+/-Z%}} | ✅/❌ |

### Budget

| Poste | Prévu | Dépensé | Écart |
|-------|-------|---------|-------|
| Total | {{X}}€ | {{Y}}€ | {{+/-Z}}€ |

### Performance par canal

| Canal | Budget | Leads | CPA | ROAS | Verdict |
|-------|--------|-------|-----|------|---------|
| Google | {{X}}€ | {{Y}} | {{Z}}€ | {{W}} | ⭐ Top |
| LinkedIn | {{X}}€ | {{Y}} | {{Z}}€ | {{W}} | 👎 Sous perf |

### Learnings clés

1. **{{LEARNING_1}}**
   - Contexte : {{CONTEXT}}
   - Action future : {{ACTION}}

2. **{{LEARNING_2}}**
   - Contexte : {{CONTEXT}}
   - Action future : {{ACTION}}

### Recommandations next steps

| Action | Priorité | Impact | Effort |
|--------|----------|--------|--------|
| {{ACTION_1}} | P1 | Haut | Moyen |
| {{ACTION_2}} | P2 | Moyen | Faible |

---

⚠️ **VALIDATION REQUISE**

- [ ] Résultats analysés et compris
- [ ] Learnings documentés
- [ ] Prochaines actions définies

---
```

**Décision documentée** : `.project/03-architecture/decisions/MKT-004-campaign-learnings.md`

---

## Traçabilité complète

### Structure projet

```
.project/
├── 03-architecture/decisions/
│   ├── MKT-001-brief-campagne.md       ← Décision brief
│   ├── MKT-002-channel-strategy.md     ← Décision canaux
│   ├── MKT-003-go-live.md              ← Décision lancement
│   └── MKT-004-campaign-learnings.md   ← Décision learnings
│
├── 04-specs/campaigns/
│   └── CAMP-001-lancement-produit/
│       ├── brief.md                     ← Brief initial
│       ├── audience.md                  ← Personas ciblés
│       ├── channel-strategy.md          ← Stratégie canaux
│       ├── tracking-plan.md             ← Plan de mesure
│       └── content-briefs/
│           ├── ad-copies.md
│           ├── landing-page.md
│           └── email-sequence.md
│
├── 05-quality/campaigns/
│   └── CAMP-001/
│       └── reports/
│           ├── week-1.md
│           ├── week-2.md
│           └── bilan-final.md
│
└── 07-audit/sessions/
    └── 2024-01-15-campaign-CAMP001/
        ├── session.md                   ← Log complet IA
        └── decisions/                   ← Copies décisions
```

### state.json

```json
{
  "campaigns": [
    {
      "id": "CAMP-001",
      "name": "Lancement produit X",
      "status": "completed",
      "started_at": "2024-01-15",
      "completed_at": "2024-03-01",
      "results": {
        "leads": 523,
        "spend": 14500,
        "roas": 3.2
      },
      "decisions": ["MKT-001", "MKT-002", "MKT-003", "MKT-004"],
      "learnings": ["MKT-004"]
    }
  ]
}
```

---

## Responsabilité et autonomie

### Qui décide quoi ?

| Décision | Qui valide | Gate |
|----------|------------|------|
| Objectifs & budget | Direction | 🔴 |
| Personas | Marketing Lead | 🟡 |
| Mix canaux | Direction + Marketing | 🔴 |
| Messages & ton | Marketing + Brand | 🔴 |
| Ajustements < 10% budget | Marketing (autonome) | 🟢 |
| Ajustements > 10% budget | Direction | 🔴 |
| Go live | Direction | 🔴 |
| Learnings | Marketing | 🔴 (pour forcer doc) |

### Audit trail

Chaque décision est tracée avec :
- **Qui** a pris la décision
- **Quand** elle a été prise
- **Quoi** a été décidé
- **Pourquoi** (contexte, alternatives)
- **Impact** mesuré a posteriori
