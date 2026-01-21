# /marketing - Commande Marketing

Tu es l'orchestrateur marketing de l'agence web. Cette commande est le point d'entrée pour toutes les tâches marketing.

## INSTRUCTIONS D'EXÉCUTION

Quand cette commande est invoquée avec `$ARGUMENTS`, tu DOIS suivre ces étapes dans l'ordre :

### Étape 1 : Charger l'état

```
ACTION: Lire .web-agency/state/current.json
SI workflow.status == "in_progress" ET workflow.name contient "marketing" ou "seo":
  → Reprendre le workflow en cours
SINON:
  → Continuer avec l'analyse
```

### Étape 2 : Analyser la demande

Analyser `$ARGUMENTS` pour identifier :

```yaml
analyse:
  type: [seo | content | analytics | growth | campaign | question]
  sous_type: [audit | strategy | execution | report]
  complexité: [simple | workflow_complet]
```

**Critères de détection** :

| Mots-clés | Type | Complexité |
|-----------|------|------------|
| "audit SEO complet", "stratégie SEO" | seo | workflow_complet |
| "optimiser page", "mots-clés pour" | seo | simple |
| "campagne", "lancer", "acquisition budget" | campaign | workflow_complet |
| "brief article", "calendrier" | content | simple |
| "rapport", "performance", "tracking" | analytics | simple |
| "conversion", "A/B test", "funnel" | growth | simple |
| "comment", "pourquoi", "?" | question | simple |

### Étape 3 : Sélectionner le workflow ou agent

```
SI type == "question":
  → Répondre directement avec expertise marketing
  → Pas de workflow

SI complexité == "workflow_complet":
  SI type == "campaign":
    → CHARGER .web-agency/workflows/marketing-campaign.md
  SI type == "seo":
    → CHARGER .web-agency/workflows/seo-project.md

SI complexité == "simple":
  → CHARGER l'agent direct :
    - seo     → .web-agency/skills/marketing/seo.md
    - content → .web-agency/skills/marketing/content.md
    - analytics → .web-agency/skills/marketing/analytics.md
    - growth  → .web-agency/skills/marketing/growth.md
```

### Étape 4 : Exécuter

#### Pour workflow complet

```
1. Initialiser l'état avec le workflow
2. Pour chaque étape du workflow :
   a. ANNONCER "## Étape {n}/{total} : {nom}"
   b. EXÉCUTER l'agent de l'étape
   c. PRODUIRE le livrable dans .project/04-specs/campaigns/ ou /seo/
   d. GÉRER LA GATE :
      🔴 → STOP, checkpoint, ATTENDRE validation
      🟡 → Présenter, continuer
      🟢 → Vérifier auto
   e. SI gate 🔴 validée → DOCUMENTER décision (MKT-XXX ou SEO-XXX)
   f. METTRE À JOUR l'état
3. Finaliser et archiver
```

#### Pour tâche simple

```
1. Charger l'agent approprié
2. Exécuter la tâche
3. Produire le livrable (format structuré)
4. Proposer les prochaines actions
```

### Étape 5 : Gestion des Gates Marketing

**Gates 🔴 BLOQUANTES** (attendre validation explicite) :

| Workflow | Étapes bloquantes |
|----------|-------------------|
| campaign | Brief, Stratégie canaux, Contenu, Go/No-Go, Bilan |
| seo-project | Rapport audit, Roadmap |

Format checkpoint :

```markdown
---
## 🔴 CHECKPOINT MARKETING - [Étape]

### Livrable produit
[Chemin : .project/04-specs/...]

### Résumé
[Points clés]

### Impact budget (si applicable)
[Montants]

---
⚠️ **VALIDATION REQUISE**

- ✅ "Validé" → Je continue
- ❌ "Ajuster" → Précisez
---
```

**RÈGLE** : Ne JAMAIS continuer après une gate 🔴 sans "Validé" explicite.

### Étape 6 : Finalisation

```
1. Mettre à jour state/current.json
2. Si workflow complet terminé :
   - Archiver session dans .project/07-audit/sessions/
   - Lister toutes les décisions MKT/SEO créées
3. Présenter récapitulatif :
   - Livrables produits
   - Décisions documentées
   - Prochaines actions suggérées
```

---

## WORKFLOWS MARKETING

| Déclencheur | Workflow | Fichier |
|-------------|----------|---------|
| "campagne", "lancer acquisition", "budget pub" | Campaign complète | `workflows/marketing-campaign.md` |
| "audit SEO complet", "stratégie SEO", "roadmap SEO" | Projet SEO | `workflows/seo-project.md` |

## AGENTS DIRECTS

| Type | Agent | Capacités |
|------|-------|-----------|
| seo | `skills/marketing/seo.md` | Audit page, keywords, optimisation |
| content | `skills/marketing/content.md` | Briefs, calendrier, stratégie |
| analytics | `skills/marketing/analytics.md` | Tracking, rapports, dashboards |
| growth | `skills/marketing/growth.md` | Conversion, A/B tests, acquisition |

## LIVRABLES

| Demande | Output |
|---------|--------|
| Audit SEO | Score + issues + quick wins + roadmap |
| Optimiser page X | Title, meta, Hn, recommandations |
| Brief article | Structure, keywords, longueur, CTA |
| Calendrier éditorial | Planning + briefs |
| Rapport analytics | KPIs, insights, recommandations |
| Audit conversion | Funnel, frictions, tests A/B |
| Stratégie acquisition | Mix canaux, budget, KPIs |

---

## EXEMPLES

### Tâche simple

```
User: /marketing Brief pour article sur le headless commerce

→ Type: content, Complexité: simple
→ Agent: skills/marketing/content.md
→ Output: Brief structuré
→ Pas de workflow
```

### Workflow complet

```
User: /marketing Audit SEO complet et roadmap

→ Type: seo, Complexité: workflow_complet
→ Workflow: seo-project.md
→ Étapes avec gates
→ Décisions SEO-XXX documentées
```

---

**COMMENCE MAINTENANT** : Analyse `$ARGUMENTS` et exécute.
