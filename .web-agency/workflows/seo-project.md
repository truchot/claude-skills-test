# Workflow : Projet SEO

Workflow complet pour un projet SEO, de l'audit initial au suivi des résultats.

## Déclencheurs

- "Audit SEO"
- "Améliorer le référencement"
- "Stratégie SEO"
- "Optimiser pour Google"

## Étapes avec Gates HITL

```
┌─────────────────────────────────────────────────────────────────┐
│ 1. AUDIT TECHNIQUE          │ Crawl, Core Web Vitals, erreurs   │
│    Agent: seo               │                                    │
│    🟢 Gate AUTO             │ Checks automatiques                │
├─────────────────────────────┼────────────────────────────────────┤
│ 2. AUDIT ON-PAGE            │ Titles, metas, Hn, contenu        │
│    Agent: seo               │                                    │
│    🟡 Gate INFORMATIVE      │ Présentation findings              │
├─────────────────────────────┼────────────────────────────────────┤
│ 3. AUDIT MOTS-CLÉS          │ Positions, opportunités, gaps     │
│    Agent: seo               │                                    │
│    🟡 Gate INFORMATIVE      │ Présentation opportunités          │
├─────────────────────────────┼────────────────────────────────────┤
│ 4. RAPPORT COMPLET          │ Synthèse + priorisation           │
│    Agent: seo               │                                    │
│    🔴 Gate BLOQUANTE        │ Validation audit + priorités       │
├─────────────────────────────┼────────────────────────────────────┤
│ 5. ROADMAP SEO              │ Plan d'action priorisé            │
│    Agent: seo + estimation  │                                    │
│    🔴 Gate BLOQUANTE        │ Validation roadmap + ressources    │
├─────────────────────────────┼────────────────────────────────────┤
│ 6. IMPLÉMENTATION           │ Exécution des optimisations       │
│    Agent: seo + dev         │                                    │
│    🟢 Gate AUTO             │ Vérification technique             │
├─────────────────────────────┼────────────────────────────────────┤
│ 7. SUIVI MENSUEL            │ Positions, trafic, conversions    │
│    Agent: analytics         │                                    │
│    🟡 Gate INFORMATIVE      │ Rapport mensuel                    │
└─────────────────────────────┴────────────────────────────────────┘
```

## Détail des étapes

### Étape 1 : Audit Technique

**Agent** : `skills/marketing/seo.md`

**Output** :
- `.project/04-specs/seo/{{PROJECT_ID}}/audit-technique.md`

**Checks automatiques** :
```yaml
technique:
  https:
    status: ✅ | ❌
    issue: "Mixed content"

  mobile:
    status: ✅ | ❌
    viewport: "configured"
    responsive: true

  core_web_vitals:
    lcp:
      value: "2.3s"
      status: 🟢 | 🟡 | 🔴
    fid:
      value: "45ms"
      status: 🟢 | 🟡 | 🔴
    cls:
      value: "0.05"
      status: 🟢 | 🟡 | 🔴

  crawlability:
    robots_txt: ✅
    sitemap: ❌ "Missing"
    canonical: ⚠️ "Inconsistent"

  errors:
    4xx: 12
    5xx: 0
    redirect_chains: 3
```

---

### Étape 4 : Rapport Complet

**Agent** : `skills/marketing/seo.md`

**Output** :
- `.project/04-specs/seo/{{PROJECT_ID}}/audit-complet.md`

**🔴 Gate BLOQUANTE** :

```markdown
---
## 🔴 CHECKPOINT - Validation Audit SEO

### Score global : {{SCORE}}/100

| Catégorie | Score | Priorité |
|-----------|-------|----------|
| Technique | {{X}}/100 | {{P}} |
| On-page | {{X}}/100 | {{P}} |
| Contenu | {{X}}/100 | {{P}} |
| Backlinks | {{X}}/100 | {{P}} |

### Top 10 Issues (par impact)

| # | Issue | Impact | Effort | Pages |
|---|-------|--------|--------|-------|
| 1 | {{ISSUE}} | Haut | Faible | {{N}} |
| 2 | {{ISSUE}} | Haut | Moyen | {{N}} |
| ... | ... | ... | ... | ... |

### Opportunités mots-clés

| Mot-clé | Volume | Position | Potentiel |
|---------|--------|----------|-----------|
| {{KW}} | {{VOL}} | {{POS}} | +{{X}} trafic |

### Quick wins identifiés

1. **{{QW_1}}** - Impact: +{{X%}} trafic
2. **{{QW_2}}** - Impact: +{{X%}} trafic
3. **{{QW_3}}** - Impact: +{{X%}} trafic

### Estimation impact global

Si toutes les recommandations sont implémentées :
- Trafic organique : +{{X%}} à 6 mois
- Positions top 10 : +{{Y}} mots-clés

---

⚠️ **VALIDATION REQUISE**

- [ ] Audit compris et accepté
- [ ] Priorités validées
- [ ] Budget pour implémentation discuté

**Décision** : Continuer vers roadmap / Ajuster priorités / Stop

---
```

**Décision documentée** : `.project/03-architecture/decisions/SEO-001-audit-findings.md`

---

### Étape 5 : Roadmap SEO

**Agent** : `skills/marketing/seo.md` + `skills/strategy/estimation.md`

**Output** :
- `.project/04-specs/seo/{{PROJECT_ID}}/roadmap.md`

**🔴 Gate BLOQUANTE** :

```markdown
---
## 🔴 CHECKPOINT - Validation Roadmap SEO

### Phase 1 : Quick Wins (Mois 1)

| Action | Impact | Effort | Responsable |
|--------|--------|--------|-------------|
| {{ACTION_1}} | Haut | 2h | {{WHO}} |
| {{ACTION_2}} | Haut | 4h | {{WHO}} |
| {{ACTION_3}} | Moyen | 2h | {{WHO}} |

**Effort total Phase 1** : {{X}} jours
**Impact attendu** : +{{Y%}} trafic

### Phase 2 : Fondations (Mois 2-3)

| Action | Impact | Effort | Responsable |
|--------|--------|--------|-------------|
| {{ACTION}} | Haut | {{X}}j | {{WHO}} |

**Effort total Phase 2** : {{X}} jours

### Phase 3 : Contenu (Mois 3-6)

| Action | Volume | Effort | Responsable |
|--------|--------|--------|-------------|
| Articles piliers | {{X}} | {{Y}}j | {{WHO}} |
| Optimisation existant | {{X}} pages | {{Y}}j | {{WHO}} |

**Effort total Phase 3** : {{X}} jours

### Phase 4 : Autorité (Mois 6+)

| Action | Objectif | Effort |
|--------|----------|--------|
| Link building | +{{X}} backlinks | {{Y}}j/mois |

### Budget total

| Phase | Effort | Coût estimé |
|-------|--------|-------------|
| Phase 1 | {{X}}j | {{Y}}€ |
| Phase 2 | {{X}}j | {{Y}}€ |
| Phase 3 | {{X}}j | {{Y}}€ |
| Phase 4 | {{X}}j/mois | {{Y}}€/mois |
| **Total** | **{{X}}j** | **{{Y}}€** |

### Projection résultats

| Mois | Trafic organique | Positions top 10 |
|------|------------------|------------------|
| M0 (actuel) | {{X}} | {{Y}} |
| M3 | {{X}} | {{Y}} |
| M6 | {{X}} | {{Y}} |
| M12 | {{X}} | {{Y}} |

---

⚠️ **VALIDATION REQUISE**

- [ ] Roadmap approuvée
- [ ] Budget validé
- [ ] Ressources assignées

---
```

**Décision documentée** : `.project/03-architecture/decisions/SEO-002-roadmap.md`

---

### Étape 7 : Suivi Mensuel

**Agent** : `skills/marketing/analytics.md`

**Output** :
- `.project/05-quality/seo/{{PROJECT_ID}}/reports/`
  - `month-1.md`
  - `month-2.md`
  - ...

**🟡 Gate INFORMATIVE** :

```markdown
## 🟡 Rapport SEO - Mois {{N}}

### KPIs vs Objectifs

| KPI | Objectif | Actuel | Δ M-1 | Status |
|-----|----------|--------|-------|--------|
| Trafic organique | {{X}} | {{Y}} | {{+/-Z%}} | 🟢/🟡/🔴 |
| Positions top 10 | {{X}} | {{Y}} | {{+/-Z}} | 🟢/🟡/🔴 |
| Positions top 3 | {{X}} | {{Y}} | {{+/-Z}} | 🟢/🟡/🔴 |
| CTR moyen | {{X%}} | {{Y%}} | {{+/-Z%}} | 🟢/🟡/🔴 |

### Mouvements de positions

#### Gains 🟢

| Mot-clé | Avant | Après | Volume |
|---------|-------|-------|--------|
| {{KW}} | {{X}} | {{Y}} | {{VOL}} |

#### Pertes 🔴

| Mot-clé | Avant | Après | Action |
|---------|-------|-------|--------|
| {{KW}} | {{X}} | {{Y}} | {{ACTION}} |

### Actions réalisées ce mois

| Action | Status | Impact |
|--------|--------|--------|
| {{ACTION_1}} | ✅ | En cours de mesure |
| {{ACTION_2}} | ✅ | +{{X%}} |

### Actions prévues mois prochain

1. {{ACTION_1}}
2. {{ACTION_2}}

### Recommandations

- {{RECO_1}}
- {{RECO_2}}

Dois-je ajuster la stratégie ?
```

---

## Traçabilité

### Structure projet

```
.project/
├── 03-architecture/decisions/
│   ├── SEO-001-audit-findings.md
│   └── SEO-002-roadmap.md
│
├── 04-specs/seo/
│   └── {{PROJECT_ID}}/
│       ├── audit-technique.md
│       ├── audit-onpage.md
│       ├── audit-keywords.md
│       ├── audit-complet.md
│       └── roadmap.md
│
├── 05-quality/seo/
│   └── {{PROJECT_ID}}/
│       └── reports/
│           ├── month-1.md
│           ├── month-2.md
│           └── ...
│
└── 07-audit/sessions/
    └── {{SESSION_ID}}/
        └── session.md
```

### Conventions

```yaml
décisions:
  prefix: "SEO-"
  format: "SEO-001-description.md"

rapports:
  fréquence: mensuel
  rétention: illimitée

reviews:
  audit: annuel (recommandé)
  roadmap: trimestriel
```
