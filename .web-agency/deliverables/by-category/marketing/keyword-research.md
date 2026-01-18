---
id: keyword-research
name: Étude de Mots-Clés
version: 1.0.0
category: marketing
status: active
phase: "2-strategy"
order: 7
agents:
  - marketing/acquisition/seo/contenu/recherche-mots-cles
  - marketing/acquisition/seo/strategie/opportunites-keywords
  - marketing/acquisition/seo/contenu/semantique-seo
consumes:
  - persona
  - brand-positioning
  - seo-audit
produces_for:
  - marketing/acquisition/seo/contenu/brief-redactionnel
  - marketing/acquisition/seo/strategie/roadmap-seo
  - marketing/content/arborescence
  - marketing/content/content-calendar
workflows:
  - id: wf-keyword-research
    template: wf-audit
    phase: Research
    name: Recherche mots-clés
    duration: 3 jours
tags:
  - marketing
  - seo
  - keywords
  - content-strategy
---

# Étude de Mots-Clés

## Description

L'étude de mots-clés identifie et priorise les requêtes sur lesquelles se positionner en SEO. Elle analyse le volume de recherche, la difficulté, l'intention et organise les mots-clés en clusters thématiques.

## Cas d'Usage

- Définition de la stratégie de contenu SEO
- Création d'arborescence de site
- Brief pour rédaction d'articles
- Optimisation de pages existantes
- Identification d'opportunités de croissance

## Structure du Livrable

```markdown
# Étude de Mots-Clés : [Projet/Thématique]

## Résumé Exécutif

### Vue d'Ensemble
| Métrique | Valeur |
|----------|--------|
| Mots-clés analysés | [X] |
| Volume total mensuel | [X K] |
| Mots-clés prioritaires | [X] |
| Clusters identifiés | [X] |

### Top 10 Opportunités

| Mot-clé | Volume | KD | Intent | Position Actuelle | Priorité |
|---------|--------|----|----|-------------------|----------|
| [KW 1] | [X] | [X] | [Intent] | [Pos ou -] | 🔥🔥🔥 |
| [KW 2] | [X] | [X] | [Intent] | [Pos ou -] | 🔥🔥🔥 |
| [KW 3] | [X] | [X] | [Intent] | [Pos ou -] | 🔥🔥🔥 |
| [KW 4] | [X] | [X] | [Intent] | [Pos ou -] | 🔥🔥 |
| [KW 5] | [X] | [X] | [Intent] | [Pos ou -] | 🔥🔥 |

### Volume par Intention

```
INFORMATIONNEL  ████████████████░░░░ 45%  [X K/mois]
COMMERCIAL      ██████████░░░░░░░░░░ 30%  [X K/mois]
TRANSACTIONNEL  ██████░░░░░░░░░░░░░░ 15%  [X K/mois]
NAVIGATIONNEL   ████░░░░░░░░░░░░░░░░ 10%  [X K/mois]
```

## 1. Méthodologie

### Sources de Données
| Source | Usage | Date Extraction |
|--------|-------|-----------------|
| [Ahrefs/SEMrush] | Volume, KD, SERP | [Date] |
| Google Keyword Planner | Volume, CPC | [Date] |
| Google Search Console | Positions actuelles | [Date] |
| AnswerThePublic | Questions | [Date] |
| AlsoAsked | PAA | [Date] |

### Critères de Sélection
- **Volume minimum** : [X] recherches/mois
- **KD maximum** : [X] (pour quick wins)
- **Pertinence business** : Score 1-5
- **Intent alignment** : Correspondance avec objectifs

### Scoring Formula
```
Score = (Volume × 0.3) + (Pertinence × 0.4) + ((100 - KD) × 0.3)
```

## 2. Analyse par Intention

### 2.1 Mots-Clés Informationnels
*Recherche d'information, apprentissage*

| Mot-clé | Volume | KD | CPC | Format Recommandé |
|---------|--------|----|----|-------------------|
| comment [X] | [Vol] | [KD] | [CPC] | Article guide |
| qu'est-ce que [X] | [Vol] | [KD] | [CPC] | Article définition |
| pourquoi [X] | [Vol] | [KD] | [CPC] | Article explicatif |
| [X] tutoriel | [Vol] | [KD] | [CPC] | Guide pas à pas |
| [X] exemple | [Vol] | [KD] | [CPC] | Article + exemples |

**Volume total informationnels** : [X K/mois]

### 2.2 Mots-Clés Commerciaux
*Comparaison, évaluation avant achat*

| Mot-clé | Volume | KD | CPC | Format Recommandé |
|---------|--------|----|----|-------------------|
| meilleur [X] | [Vol] | [KD] | [CPC] | Comparatif |
| [X] vs [Y] | [Vol] | [KD] | [CPC] | Versus |
| avis [X] | [Vol] | [KD] | [CPC] | Review |
| comparatif [X] | [Vol] | [KD] | [CPC] | Tableau comparatif |
| [X] alternative | [Vol] | [KD] | [CPC] | Liste alternatives |

**Volume total commerciaux** : [X K/mois]

### 2.3 Mots-Clés Transactionnels
*Intention d'achat/action*

| Mot-clé | Volume | KD | CPC | Page Cible |
|---------|--------|----|----|------------|
| acheter [X] | [Vol] | [KD] | [CPC] | Page produit |
| [X] prix | [Vol] | [KD] | [CPC] | Page pricing |
| [X] pas cher | [Vol] | [KD] | [CPC] | Page promo |
| commander [X] | [Vol] | [KD] | [CPC] | Page produit |
| devis [X] | [Vol] | [KD] | [CPC] | Page contact |

**Volume total transactionnels** : [X K/mois]

### 2.4 Mots-Clés Navigationnels
*Recherche d'une marque/site spécifique*

| Mot-clé | Volume | Position | Action |
|---------|--------|----------|--------|
| [Marque] | [Vol] | [Pos] | Maintenir P1 |
| [Marque] + [produit] | [Vol] | [Pos] | Optimiser |
| [Marque] login | [Vol] | [Pos] | Page dédiée |

## 3. Clusters Thématiques

### Cluster 1 : [Thème Principal]

```
                    ┌─────────────────────┐
                    │   PAGE PILIER       │
                    │   "[KW Pilier]"     │
                    │   Volume: [X K]     │
                    └──────────┬──────────┘
                               │
       ┌───────────────────────┼───────────────────────┐
       │                       │                       │
┌──────┴──────┐         ┌──────┴──────┐         ┌──────┴──────┐
│  CLUSTER A  │         │  CLUSTER B  │         │  CLUSTER C  │
│  "[KW A]"   │         │  "[KW B]"   │         │  "[KW C]"   │
│  [X] vol    │         │  [X] vol    │         │  [X] vol    │
└─────────────┘         └─────────────┘         └─────────────┘
```

#### Page Pilier
| Attribut | Valeur |
|----------|--------|
| Mot-clé principal | [KW] |
| Volume | [X]/mois |
| KD | [X] |
| Intent | [Intent] |
| URL suggérée | /[slug] |
| Longueur recommandée | [X] mots |

#### Articles Cluster
| Mot-clé | Volume | KD | Lien vers Pilier |
|---------|--------|----|----|
| [KW cluster 1] | [X] | [X] | Anchor: "[texte]" |
| [KW cluster 2] | [X] | [X] | Anchor: "[texte]" |
| [KW cluster 3] | [X] | [X] | Anchor: "[texte]" |
| [KW cluster 4] | [X] | [X] | Anchor: "[texte]" |
| [KW cluster 5] | [X] | [X] | Anchor: "[texte]" |

**Volume total cluster** : [X K/mois]

---

### Cluster 2 : [Thème 2]
[Même structure]

### Cluster 3 : [Thème 3]
[Même structure]

## 4. Questions (PAA / FAQ)

### Questions Fréquentes

| Question | Volume | Difficulté | Featured Snippet |
|----------|--------|------------|------------------|
| [Question 1] ? | [X] | [X] | [Oui/Non] |
| [Question 2] ? | [X] | [X] | [Oui/Non] |
| [Question 3] ? | [X] | [X] | [Oui/Non] |
| [Question 4] ? | [X] | [X] | [Oui/Non] |
| [Question 5] ? | [X] | [X] | [Oui/Non] |

### Opportunités Featured Snippets

| Question | Format Actuel | Notre Opportunité |
|----------|---------------|-------------------|
| [Question] | [Paragraphe/Liste/Tableau] | [Format à créer] |

## 5. Long Tail & Variations

### Variations Géographiques
| Base KW | + Ville | Volume |
|---------|---------|--------|
| [KW] | Paris | [X] |
| [KW] | Lyon | [X] |
| [KW] | Marseille | [X] |

### Variations Temporelles
| Base KW | + Année/Période | Volume |
|---------|-----------------|--------|
| [KW] | 2024 | [X] |
| [KW] | tendances | [X] |

### Long Tail High Value
| Mot-clé Long Tail | Volume | KD | Conversion estimée |
|-------------------|--------|----|--------------------|
| [KW long 1] | [X] | [X] | Haute |
| [KW long 2] | [X] | [X] | Haute |
| [KW long 3] | [X] | [X] | Moyenne |

## 6. Analyse Concurrentielle

### Mots-clés Concurrents (pas nous)

| Mot-clé | Volume | Concurrent | Notre Gap |
|---------|--------|------------|-----------|
| [KW 1] | [X] | [Concurrent] | Pas de page |
| [KW 2] | [X] | [Concurrent] | Page faible |
| [KW 3] | [X] | [Concurrent] | Pas de page |

### Keyword Gap Analysis

| Métrique | Nous | Concurrent 1 | Concurrent 2 |
|----------|------|--------------|--------------|
| KW en commun | [X] | [X] | [X] |
| KW uniques | [X] | [X] | [X] |
| KW manquants | - | [X] | [X] |

## 7. Priorisation

### Matrice Effort/Impact

```
           IMPACT ÉLEVÉ
                │
    Quick Wins  │  Priorités
    ────────────┼────────────
    À éviter    │  Projets
                │
           IMPACT FAIBLE
    EFFORT FAIBLE    EFFORT ÉLEVÉ
```

### Liste Priorisée

| Priorité | Mot-clé | Volume | KD | Action | Deadline |
|----------|---------|--------|----|----|----------|
| P1 | [KW] | [X] | [X] | [Créer/Optimiser] | [Date] |
| P1 | [KW] | [X] | [X] | [Action] | [Date] |
| P2 | [KW] | [X] | [X] | [Action] | [Date] |
| P2 | [KW] | [X] | [X] | [Action] | [Date] |
| P3 | [KW] | [X] | [X] | [Action] | [Date] |

## 8. Mapping URL

### Affectation Mots-clés → Pages

| Mot-clé Principal | Secondaires | URL | Status |
|-------------------|-------------|-----|--------|
| [KW 1] | [KW 1a], [KW 1b] | /[url-existante] | Optimiser |
| [KW 2] | [KW 2a], [KW 2b] | /[url-à-créer] | Créer |
| [KW 3] | [KW 3a] | /[url-existante] | OK |

## Annexes

### A. Export Complet
[Lien vers fichier CSV/Excel avec tous les mots-clés]

### B. Glossaire Intentions
| Intent | Définition | Signaux |
|--------|------------|---------|
| Informationnel | Recherche d'info | comment, qu'est-ce, pourquoi |
| Commercial | Comparaison | meilleur, vs, avis, comparatif |
| Transactionnel | Achat | acheter, prix, commander |
| Navigationnel | Site précis | [marque], login |
```

## Critères d'Acceptation

### Complétude
- [ ] Minimum 100 mots-clés analysés
- [ ] Intentions classifiées
- [ ] Clusters thématiques définis
- [ ] Questions PAA identifiées
- [ ] Priorisation effectuée
- [ ] Mapping URL proposé

### Qualité
- [ ] Données de moins d'un mois
- [ ] Pertinence business validée
- [ ] Volume réaliste (pas de KW impossibles)
- [ ] Mix intentions équilibré

### Validation
- [ ] Validé par SEO manager
- [ ] Aligné avec Content manager
- [ ] Approuvé par le client

## Points de Contrôle Humain

| Checkpoint | Responsable | Critères |
|------------|-------------|----------|
| Pertinence KW | SEO Lead | Alignement business |
| Faisabilité | Content Manager | Capacité de production |
| Priorisation | Marketing Manager | Cohérence stratégique |

## Anti-Patterns

### ❌ À Éviter

1. **Chasse au volume**
   - Viser que les gros volumes
   - Ignorer la pertinence business

2. **Ignorer l'intention**
   - Même KW ≠ même besoin
   - Mélanger les intentions sur une page

3. **Données périmées**
   - Étude de plus de 3 mois
   - Saisonnalité ignorée

4. **Pas de priorisation**
   - Liste de 500 KW sans ordre
   - Impossible à exécuter

### ✅ Bonnes Pratiques

1. **Qualité > Quantité** : 50 KW pertinents > 500 génériques
2. **Cluster thinking** : Organiser en thématiques
3. **Intent first** : Comprendre le besoin derrière la recherche
4. **Actualiser régulièrement** : Quarterly minimum

## Outils Recommandés

| Outil | Usage |
|-------|-------|
| Ahrefs | KD, volume, SERP analysis |
| SEMrush | Gap analysis, clustering |
| AnswerThePublic | Questions |
| AlsoAsked | PAA mapping |
| Google Trends | Saisonnalité |
| Keyword Planner | CPC, volume Google |

## Références

- "Keyword Research" - Brian Dean (Backlinko)
- "The Art of SEO" - Eric Enge
- Ahrefs Blog - Keyword Research Guide
