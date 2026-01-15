---
id: project-qualification
name: Qualification Projet
version: 1.0.0
category: process
status: active
phase: "1-intake"
order: 3
agents:
  - client-intake/qualification/intent-classifier
  - client-intake/qualification/complexity-assessor
  - client-intake/qualification/feasibility-checker
  - client-intake/qualification/urgency-detector
consumes:
  - client-request
  - requirements-list
produces_for:
  - client-intake/routing/skill-matcher
  - client-intake/routing/priority-ranker
  - direction-technique/avant-projet/etude-faisabilite
  - project-management/avant-projet/brief
tags: [intake, qualification, scoring, go-nogo, triage]
---

# Qualification Projet

## Description

Document de scoring et qualification d'un projet entrant, permettant de décider rapidement du Go/No-Go et d'orienter vers les bons skills. Ce livrable agrège les analyses de faisabilité, complexité, urgence et budget pour produire une recommandation actionnable.

## Format de Sortie

| Attribut | Valeur |
|----------|--------|
| **Type** | Document Markdown |
| **Emplacement** | `projects/[client-slug]/01-intake/project-qualification.md` |
| **Nommage** | `project-qualification.md` |
| **Encoding** | UTF-8 |

## Structure du Contenu

### Sections Obligatoires

- [ ] **Score global** - Note de 0-100 avec seuils Go/No-Go
- [ ] **Décision** - Go / No-Go / Go conditionnel
- [ ] **Type de projet** - Classification (création, refonte, évolution, maintenance)
- [ ] **Complexité** - Évaluation sur grille standardisée
- [ ] **Adéquation budget/scope** - Analyse réalisme
- [ ] **Skills requis** - Liste des compétences nécessaires

### Sections Optionnelles

- [ ] **Conditions Go** - Si Go conditionnel, quelles conditions
- [ ] **Raisons No-Go** - Si refus, justification
- [ ] **Risques majeurs** - Points de vigilance
- [ ] **Recommandations commerciales** - Ajustements proposition

## Critères d'Acceptation

| # | Critère | Seuil/Condition | Vérification | Obligatoire |
|---|---------|-----------------|--------------|-------------|
| 1 | Score calculé | Formule appliquée | Auto | Oui |
| 2 | Décision explicite | Go / No-Go / Conditionnel | Manuel | Oui |
| 3 | Skills identifiés | Au moins 1 skill principal | Auto | Oui |
| 4 | Justification | Chaque critère argumenté | Manuel | Oui |
| 5 | Délai qualification | < 24h après réception | Auto | Oui |

## Prérequis (Inputs)

| Source | Livrable/Donnée | Description |
|--------|-----------------|-------------|
| `client-intake/reception/*` | `client-request` | Demande client |
| `client-intake/extraction/*` | `requirements-list` | Exigences extraites |
| CRM | Historique client | Projets précédents |
| Planning | Charge actuelle | Disponibilité équipes |

## Points de Validation Humaine

| Étape | Moment | Validateur | Action si KO |
|-------|--------|------------|--------------|
| 1 | Après scoring auto | Commercial | Ajuster si contexte particulier |
| 2 | Décision finale | Direction | Valider Go/No-Go |

## Exemple

### Exemple Minimal

```markdown
---
reference:
  - ./client-request.md
  - ./requirements-list.md
date_qualification: 2024-01-16
qualified_by: intent-classifier
---

# Qualification Projet - Dupont SARL

## Score Global : 78/100 ✅

**Décision : GO**

## Scores Détaillés

| Critère | Score | Poids | Pondéré |
|---------|-------|-------|---------|
| Adéquation budget | 70 | 30% | 21 |
| Faisabilité technique | 90 | 25% | 22.5 |
| Clarté du besoin | 75 | 20% | 15 |
| Délai réaliste | 65 | 15% | 9.75 |
| Potentiel client | 80 | 10% | 8 |

## Classification

- **Type** : Refonte + Évolution (e-commerce)
- **Complexité** : Moyenne
- **Urgence** : Normale (3 mois)

## Skills Requis

1. `wordpress-gutenberg-expert` (principal)
2. `ux-ui-design`
3. `direction-technique`
```

### Exemple Complet

```markdown
---
reference:
  - ./client-request.md
  - ./requirements-list.md
date_qualification: 2024-01-16
qualified_by:
  - intent-classifier
  - complexity-assessor
  - feasibility-checker
  - urgency-detector
  - budget-estimator
version: 1
---

# Qualification Projet - Dupont SARL

## Résumé Exécutif

| Métrique | Valeur |
|----------|--------|
| **Score Global** | 78/100 |
| **Décision** | ✅ GO |
| **Type Projet** | Refonte + E-commerce |
| **Complexité** | Moyenne (M) |
| **Priorité** | P2 - Normale |
| **Estimation initiale** | 15-22k€ |

---

## 1. Score Global : 78/100

### Grille de Scoring

| Critère | Score | Poids | Pondéré | Justification |
|---------|-------|-------|---------|---------------|
| Adéquation budget/scope | 70/100 | 30% | 21 | Budget cohérent mais serré pour e-commerce complet |
| Faisabilité technique | 90/100 | 25% | 22.5 | Stack WordPress maîtrisée, pas de complexité majeure |
| Clarté du besoin | 75/100 | 20% | 15 | Besoin clair, quelques points à préciser |
| Délai réaliste | 65/100 | 15% | 9.75 | 3 mois faisable mais tendu |
| Potentiel client | 80/100 | 10% | 8 | PME établie, potentiel maintenance + évolutions |
| **TOTAL** | - | 100% | **78** | - |

### Seuils de Décision

| Score | Décision |
|-------|----------|
| ≥ 80 | GO automatique |
| 60-79 | GO avec validation direction |
| 40-59 | GO conditionnel (renégociation) |
| < 40 | NO-GO |

---

## 2. Décision : ✅ GO

**Validation requise** : Direction (score 60-79)

**Recommandation** : Accepter le projet avec ajustements mineurs.

---

## 3. Classification du Projet

### Type de Projet

| Type | Applicable | Justification |
|------|------------|---------------|
| Création | ❌ | Site existant |
| **Refonte** | ✅ | Refonte visuelle et technique |
| **Évolution** | ✅ | Ajout e-commerce |
| Maintenance | ❌ | - |

**Classification finale** : Refonte + Évolution majeure

### Complexité

| Facteur | Niveau | Score |
|---------|--------|-------|
| Nombre de features | Moyen | 6/10 |
| Intégrations externes | Faible | 3/10 |
| Volume de contenu | Moyen | 5/10 |
| Contraintes techniques | Faible | 3/10 |
| Contraintes business | Moyen | 5/10 |
| **Complexité globale** | **Moyenne (M)** | **4.4/10** |

### Urgence

| Indicateur | Valeur | Impact |
|------------|--------|--------|
| Délai demandé | 3 mois | ⚠️ Serré |
| Saisonnalité | Sept = avant Noël | ⚠️ Date ferme |
| Dépendances | Aucune | ✅ OK |
| **Niveau d'urgence** | **P2 - Normale** | - |

---

## 4. Analyse Budget / Scope

### Estimation vs Budget Client

| Élément | Estimation | Budget client | Gap |
|---------|------------|---------------|-----|
| Refonte design | 4-6k€ | - | - |
| Développement WP | 5-7k€ | - | - |
| E-commerce WooCommerce | 4-6k€ | - | - |
| Intégration contenu | 1-2k€ | - | - |
| Tests & recette | 1-2k€ | - | - |
| **TOTAL** | **15-23k€** | **15-20k€** | **0 à -3k€** |

### Analyse

- ✅ Budget dans la fourchette basse réaliste
- ⚠️ Peu de marge pour imprévus
- 💡 Recommandation : Proposer 18k€ avec scope MVP

### Adéquation Score : 70/100

---

## 5. Faisabilité Technique

| Aspect | Évaluation | Commentaire |
|--------|------------|-------------|
| Stack requise | ✅ Maîtrisée | WordPress + WooCommerce |
| Compétences dispo | ✅ OK | Équipe dispo |
| Risques techniques | ✅ Faibles | Pas d'innovation |
| Intégrations | ✅ Standard | Paiement Stripe/PayPal |
| Hébergement | ✅ Standard | Hébergement WP classique |

### Faisabilité Score : 90/100

---

## 6. Skills Requis

### Skill Principal

| Skill | Rôle | Charge estimée |
|-------|------|----------------|
| `wordpress-gutenberg-expert` | Développement WP + WooCommerce | 60% |

### Skills Secondaires

| Skill | Rôle | Charge estimée |
|-------|------|----------------|
| `ux-ui-design` | Maquettes, UI Kit | 15% |
| `direction-technique` | Architecture, specs | 10% |
| `content-management` | Migration contenu | 10% |
| `devops` | Hébergement, déploiement | 5% |

### Routing Recommandé

```
client-intake
  → direction-technique (cadrage)
    → ux-ui-design (maquettes)
      → wordpress-gutenberg-expert (réalisation)
        → devops (mise en prod)
```

---

## 7. Risques & Points de Vigilance

| # | Risque | Probabilité | Impact | Mitigation |
|---|--------|-------------|--------|------------|
| R1 | Délai insuffisant | Moyenne | Fort | Scope MVP strict |
| R2 | Contenu non prêt | Haute | Moyen | Planifier tôt |
| R3 | Demandes additionnelles | Moyenne | Moyen | Cadrage ferme |

---

## 8. Recommandations

### Pour l'équipe commerciale

1. **Proposer 18k€** (milieu de fourchette avec marge)
2. **Cadrer le scope MVP** : Catalogue + panier + paiement CB
3. **Reporter features P2** : PayPal, filtres avancés → V2
4. **Sécuriser le planning** : Kick-off avant fin janvier

### Conditions de succès

- [ ] Contenu produits fourni avant 15 février
- [ ] Validation maquettes avant 1er mars
- [ ] Pas d'ajout de scope sans avenant

---

## 9. Prochaines Étapes

| # | Action | Responsable | Deadline |
|---|--------|-------------|----------|
| 1 | Validation direction | Direction | J+1 |
| 2 | Envoi proposition | Commercial | J+3 |
| 3 | Kick-off si GO client | Chef de projet | J+10 |
```

## Anti-patterns

| Anti-pattern | Pourquoi c'est problématique | Correction |
|--------------|------------------------------|------------|
| Qualification "au feeling" | Subjectif, non reproductible | Grille de scoring standard |
| Ignorer les signaux d'alerte | Projets à problèmes acceptés | Seuils de No-Go clairs |
| Pas de trace de décision | Impossible de comprendre a posteriori | Documenter la justification |
| Sur-qualifier | Perte de temps sur prospects froids | Timeboxer à 24h max |

## Références

- Livrables précédents : `client-request`, `requirements-list`
- Livrables suivants : `project-brief`, `feasibility-study`
- Méthode : BANT (Budget, Authority, Need, Timeline)

## Historique des Versions

| Version | Date | Auteur | Changements |
|---------|------|--------|-------------|
| 1.0.0 | 2024-01-15 | client-intake | Création initiale |
