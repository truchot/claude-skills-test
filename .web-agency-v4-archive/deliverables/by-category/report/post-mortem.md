---
id: post-mortem
name: Post-Mortem
version: 1.0.0
category: report
status: active
phase: "7-maintenance"
order: 3
agents:
  - direction-technique/support/post-mortem
  - lead-dev/quality/retrospective
consumes:
  - incident-runbook
produces_for:
  - direction-technique/qualite/dette-technique
  - project-management/retrospective
tags: [post-mortem, incident, retrospective, learning, improvement]
---

# Post-Mortem

## Description

Analyse approfondie et blameless d'un incident pour comprendre les causes racines, documenter les apprentissages et définir des actions d'amélioration. Focus sur le système, pas sur les individus.

## Format de Sortie

| Attribut | Valeur |
|----------|--------|
| **Type** | Document Markdown |
| **Emplacement** | `docs/post-mortems/[YYYY-MM-DD]-[slug].md` |
| **Nommage** | `YYYY-MM-DD-incident-title.md` |
| **Encoding** | UTF-8 |

## Structure du Contenu

### Sections Obligatoires

- [ ] **Résumé exécutif** - TL;DR de l'incident
- [ ] **Timeline** - Chronologie détaillée
- [ ] **Impact** - Métriques et utilisateurs affectés
- [ ] **Root Cause** - Analyse des causes racines
- [ ] **Actions correctives** - Avec owners et deadlines
- [ ] **Lessons Learned** - Apprentissages

### Sections Optionnelles

- [ ] **Diagramme** - Visualisation du problème
- [ ] **Logs/Screenshots** - Preuves
- [ ] **Related incidents** - Incidents similaires passés

## Critères d'Acceptation

| # | Critère | Seuil/Condition | Vérification | Obligatoire |
|---|---------|-----------------|--------------|-------------|
| 1 | Blameless | Pas de blâme individuel | Review | Oui |
| 2 | Root cause identifiée | 5 Whys complétés | Manuel | Oui |
| 3 | Actions définies | Owner + deadline pour chaque | Manuel | Oui |
| 4 | Délai | < 5 jours après incident P1/P2 | Auto | Oui |

## Prérequis (Inputs)

| Source | Livrable/Donnée | Description |
|--------|-----------------|-------------|
| Incident | Logs, timeline | Données brutes |
| `direction-technique/*` | `incident-runbook` | Contexte gestion |
| Équipe | Témoignages | Perspectives |

## Points de Validation Humaine

| Étape | Moment | Validateur | Action si KO |
|-------|--------|------------|--------------|
| 1 | Rédaction | IC + SME | Compléter |
| 2 | Review | Équipe | Challenger |
| 3 | Suivi actions | Lead | Relancer |

## Exemple

### Post-Mortem Complet

```markdown
# Post-Mortem : Indisponibilité Checkout
## 2024-02-15 - E-commerce Artisanat Dupont

---

## 📋 Résumé Exécutif

| Attribut | Valeur |
|----------|--------|
| **Date** | 15 février 2024 |
| **Durée** | 47 minutes |
| **Sévérité** | P1 |
| **Impact** | Checkout inaccessible, ~150 utilisateurs impactés, ~€2,500 CA estimé perdu |
| **Root Cause** | Expiration silencieuse du token Stripe webhook |

**TL;DR :** Le webhook Stripe a cessé de fonctionner suite à l'expiration du signing secret, non détectée car aucune alerte n'était configurée. Les paiements étaient acceptés par Stripe mais non confirmés côté application.

---

## 📅 Timeline

*Toutes les heures en UTC*

| Heure | Événement |
|-------|-----------|
| **14:23** | Premier paiement échoue (non détecté) |
| **14:35** | Utilisateur signale "commande bloquée" via chat |
| **14:38** | Support escalade à l'équipe tech |
| **14:42** | On-call (Thomas) commence l'investigation |
| **14:45** | Identification : webhook retourne 401 |
| **14:52** | Root cause identifiée : signing secret expiré |
| **14:58** | Régénération du secret sur Stripe |
| **15:02** | Mise à jour variable env sur Vercel |
| **15:05** | Redéploiement déclenché |
| **15:10** | Webhook fonctionnel, test de paiement OK |
| **15:15** | Incident déclaré résolu |
| **15:30** | Traitement manuel des 8 commandes en attente |

```
14:00   14:15   14:30   14:45   15:00   15:15   15:30
  │       │       │       │       │       │       │
  │       │    ┌──┴───────┴───────┤       │       │
  │       │    │    INCIDENT      │       │       │
  │       │    │    47 min        │       │       │
  │       │    └──────────────────┘       │       │
  │       │       ▲       ▲       ▲       │       │
  │       │       │       │       │       │       │
  │       │    Détection  RC    Résolu    │       │
  │       │    +12min   +10min  +23min    │       │
```

---

## 📊 Impact

### Métriques

| Métrique | Valeur |
|----------|--------|
| Durée totale | 47 minutes |
| Temps de détection (TTD) | 12 minutes |
| Temps de résolution (TTR) | 35 minutes |
| Commandes impactées | 8 |
| Utilisateurs uniques | ~150 |
| CA estimé perdu | ~€2,500 |
| Erreurs Sentry | 34 |

### Utilisateurs Impactés
- 8 utilisateurs n'ont pas pu finaliser leur commande
- ~142 utilisateurs ont vu une erreur et abandonné
- 0 données perdues (commandes récupérées manuellement)

### Réputation
- 2 avis négatifs sur Google (résolus avec geste commercial)
- 3 emails de plainte

---

## 🔍 Root Cause Analysis

### Cause Immédiate
Le signing secret du webhook Stripe avait expiré, causant le rejet de tous les événements webhook avec une erreur 401 Unauthorized.

### 5 Whys

```
1. Pourquoi le checkout était bloqué ?
   → Les webhooks Stripe retournaient 401

2. Pourquoi les webhooks retournaient 401 ?
   → Le signing secret était invalide

3. Pourquoi le signing secret était invalide ?
   → Il avait expiré (rotation automatique Stripe après 90 jours)

4. Pourquoi l'expiration n'a pas été anticipée ?
   → Aucun rappel/monitoring n'était en place

5. Pourquoi aucun monitoring n'était en place ?
   → Le risque d'expiration n'avait pas été identifié lors du setup initial
```

### Diagramme

```
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│   Client    │      │   Stripe    │      │    App      │
│  Checkout   │      │   Payment   │      │   Server    │
└──────┬──────┘      └──────┬──────┘      └──────┬──────┘
       │                    │                    │
       │  1. Submit payment │                    │
       │───────────────────►│                    │
       │                    │                    │
       │  2. Payment OK     │  3. Webhook event  │
       │◄───────────────────│───────────────────►│
       │                    │                    │
       │                    │   4. 401 ERROR ✗   │
       │                    │◄───────────────────│
       │                    │                    │
       │  5. Stuck on       │  (secret expired)  │
       │     "Processing"   │                    │
       │                    │                    │
```

### Facteurs Contributifs

| Facteur | Impact | Catégorie |
|---------|--------|-----------|
| Pas de monitoring webhook | Détection tardive | Observabilité |
| Pas de documentation rotation | Non anticipé | Documentation |
| Dépendance unique Stripe | Pas de fallback | Architecture |
| Pas d'alerte expiration | Surprise | Monitoring |

---

## ✅ Actions Correctives

### Immédiat (fait)

| Action | Owner | Status |
|--------|-------|--------|
| Régénérer le signing secret | Thomas | ✅ Fait |
| Traiter commandes en attente | Support | ✅ Fait |
| Contacter clients impactés | Marie | ✅ Fait |
| Geste commercial (10% off) | Marie | ✅ Fait |

### Court terme (< 2 semaines)

| # | Action | Owner | Deadline | Status |
|---|--------|-------|----------|--------|
| 1 | Ajouter monitoring webhook success rate | Antoine | 22/02 | 🔄 En cours |
| 2 | Créer alerte si webhook 4xx > 1% | Antoine | 22/02 | ⏳ À faire |
| 3 | Documenter process rotation secrets | Thomas | 20/02 | ⏳ À faire |
| 4 | Ajouter à la checklist mensuelle | Marie | 18/02 | ⏳ À faire |

### Moyen terme (< 1 mois)

| # | Action | Owner | Deadline | Status |
|---|--------|-------|----------|--------|
| 5 | Implémenter retry logic webhook | Lucas | 01/03 | ⏳ À faire |
| 6 | Ajouter fallback polling Stripe | Lucas | 15/03 | ⏳ À faire |
| 7 | Calendrier rotation secrets automatique | Antoine | 01/03 | ⏳ À faire |

### Long terme (backlog)

| # | Action | Description |
|---|--------|-------------|
| 8 | Chaos engineering | Test expiration secrets en staging |
| 9 | Runbook webhooks | Documentation complète troubleshooting |

---

## 📚 Lessons Learned

### Ce qui a bien fonctionné ✅

1. **Escalade rapide** - Support a escaladé en 7 minutes
2. **Investigation efficace** - Root cause trouvée en 10 minutes
3. **Communication** - Updates régulières sur Slack
4. **Récupération** - Commandes traitées manuellement
5. **Client management** - Geste commercial apprécié

### Ce qui n'a pas fonctionné ❌

1. **Détection** - 12 minutes avant d'être alertés (par un user, pas le monitoring)
2. **Anticipation** - Expiration prévisible non monitorée
3. **Documentation** - Process rotation secrets non documenté
4. **Tests** - Scénario expiration jamais testé

### Recommendations

| Domaine | Recommendation |
|---------|---------------|
| **Monitoring** | Toujours monitorer les intégrations tierces (webhooks, APIs) |
| **Secrets** | Maintenir un inventaire des secrets avec dates d'expiration |
| **Tests** | Inclure les scénarios d'expiration dans les tests |
| **Documentation** | Documenter le cycle de vie de chaque intégration |

---

## 📎 Annexes

### Logs Pertinents

```
[2024-02-15T14:23:45Z] ERROR Stripe webhook verification failed
[2024-02-15T14:23:45Z] ERROR WebhookSignatureVerificationError:
  Signature verification failed. Is your webhook secret correct?
```

### Sentry Event
- [ECOM-1234](https://sentry.io/xxx)

### Slack Thread
- [#incidents - Thread incident 15/02](https://slack.com/xxx)

---

## 📝 Metadata

| Champ | Valeur |
|-------|--------|
| **Auteur** | Thomas Bernard |
| **Reviewers** | Marie Martin, Antoine Moreau |
| **Date rédaction** | 16/02/2024 |
| **Dernière mise à jour** | 18/02/2024 |
| **Status** | Validé, actions en cours |
| **Prochaine review** | 01/03/2024 (vérifier actions) |
```

## Anti-patterns

| Anti-pattern | Pourquoi c'est problématique | Correction |
|--------------|------------------------------|------------|
| Blaming individuals | Tue la culture de transparence | Focus sur le système |
| Pas de 5 Whys | Cause superficielle | Creuser jusqu'à la racine |
| Actions sans owner | Jamais fait | Toujours un responsable |
| Post-mortem tardif | Mémoire perdue | < 5 jours après P1/P2 |
| Pas de suivi | Actions oubliées | Review des actions |

## Références

- [Google SRE - Postmortem Culture](https://sre.google/sre-book/postmortem-culture/)
- [Etsy Debriefing Facilitation Guide](https://extfiles.etsy.com/DebriefingFacilitationGuide.pdf)
- [Blameless Postmortems](https://www.atlassian.com/incident-management/postmortem/blameless)
- Livrables liés : `incident-runbook`, `risk-matrix`, `tech-debt-report`

## Historique des Versions

| Version | Date | Auteur | Changements |
|---------|------|--------|-------------|
| 1.0.0 | 2026-01-18 | direction-technique | Création initiale |
