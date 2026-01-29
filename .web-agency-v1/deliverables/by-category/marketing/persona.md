---
id: persona
name: Fiche Persona
version: 1.0.0
category: marketing
status: active
phase: "1-intake"
order: 1
agents:
  - direction-marketing/positionnement/persona-builder
  - content-marketing/content/orchestrator
  - marketing-ops/campagnes/orchestrator
consumes:
  - client-request
  - project-brief
  - problem-definition
  - offer-definition
produces_for:
  - content-marketing/content/ligne-editoriale
  - content-marketing/content/copywriting
  - marketing-ops/campagnes/planning-campagne
  - marketing-ops/automation/lead-scoring
  - design/ux/user-research
workflows:
  - id: wf-persona-creation
    template: wf-strategy
    phase: Discovery
    name: Création persona
    duration: 2 jours
  - id: wf-persona-validation
    template: wf-validation
    phase: Validation
    name: Validation persona client
    duration: 1 jour
tags:
  - marketing
  - strategie
  - ux
  - ciblage
---

# Fiche Persona

## Description

Le persona est une représentation fictive et détaillée du client idéal, basée sur des données réelles et des hypothèses validées. Il guide toutes les décisions marketing, produit et communication.

## Cas d'Usage

- Définir le ton et le contenu des messages marketing
- Orienter le design UX vers les besoins utilisateurs
- Segmenter les campagnes publicitaires
- Personnaliser les parcours d'automation
- Prioriser les fonctionnalités produit

## Structure du Livrable

```markdown
# Persona : [Nom du Persona]

## Photo & Identité
![Avatar](./persona-avatar.png)

| Attribut | Valeur |
|----------|--------|
| **Nom** | [Prénom Nom fictif] |
| **Âge** | [Tranche d'âge] |
| **Profession** | [Titre / Fonction] |
| **Entreprise** | [Type / Taille] |
| **Localisation** | [Ville / Région] |
| **Revenus** | [Tranche] |

## Citation Clé
> "[Une phrase qui résume sa mentalité ou son besoin principal]"

## Biographie
[Paragraphe décrivant le contexte de vie, parcours, situation actuelle]

## Objectifs & Motivations

### Objectifs Professionnels
1. [Objectif 1]
2. [Objectif 2]
3. [Objectif 3]

### Objectifs Personnels
1. [Objectif 1]
2. [Objectif 2]

### Motivations Profondes
- **Gain** : [Ce qu'il/elle veut obtenir]
- **Évitement** : [Ce qu'il/elle veut éviter]
- **Aspiration** : [Ce qu'il/elle veut devenir]

## Frustrations & Pain Points

| Pain Point | Intensité | Impact Business |
|------------|-----------|-----------------|
| [Frustration 1] | 🔥🔥🔥 | [Comment ça nous concerne] |
| [Frustration 2] | 🔥🔥 | [Comment ça nous concerne] |
| [Frustration 3] | 🔥 | [Comment ça nous concerne] |

## Comportement Digital

### Canaux Préférés
| Canal | Usage | Fréquence |
|-------|-------|-----------|
| LinkedIn | Veille professionnelle | Quotidien |
| Email | Communication travail | Quotidien |
| YouTube | Formation | Hebdo |
| Podcasts | Inspiration | Hebdo |

### Habitudes de Recherche
- **Moteurs** : Google, YouTube
- **Requêtes types** : "[exemple requête 1]", "[exemple requête 2]"
- **Format préféré** : [Articles / Vidéos / Podcasts]

### Outils Utilisés
- [Outil 1] - [Usage]
- [Outil 2] - [Usage]
- [Outil 3] - [Usage]

## Parcours d'Achat

### Déclencheurs
- [Événement qui déclenche la recherche de solution]
- [Autre déclencheur possible]

### Critères de Décision
| Critère | Poids | Notre Force |
|---------|-------|-------------|
| [Prix] | 30% | ⭐⭐⭐ |
| [Facilité] | 25% | ⭐⭐⭐⭐ |
| [Support] | 20% | ⭐⭐⭐⭐⭐ |
| [Fonctionnalités] | 25% | ⭐⭐⭐ |

### Objections Courantes
1. "[Objection 1]" → **Réponse** : [Notre argument]
2. "[Objection 2]" → **Réponse** : [Notre argument]
3. "[Objection 3]" → **Réponse** : [Notre argument]

### Influenceurs de Décision
- [Qui d'autre intervient dans la décision]
- [Rôle et niveau d'influence]

## Jobs-to-be-Done (JTBD)

### Job Principal
> "Quand je [situation], je veux [motivation], pour pouvoir [résultat attendu]"

### Jobs Secondaires
1. "Quand je [situation], je veux [motivation], pour pouvoir [résultat]"
2. "Quand je [situation], je veux [motivation], pour pouvoir [résultat]"

## Segmentation

### Segment Marché
- **B2B / B2C** : [Type]
- **Secteur** : [Industrie]
- **Taille entreprise** : [TPE / PME / ETI / GE]

### Niveau de Maturité
- [ ] Inconscient du problème
- [ ] Conscient du problème
- [ ] Conscient des solutions
- [ ] Conscient de notre solution
- [ ] Prêt à acheter

### Valeur Client
- **LTV estimée** : [X €]
- **Panier moyen** : [X €]
- **Fréquence achat** : [Récurrence]

## Mapping Émotionnel

```
        FRUSTRÉ ←────────────────→ SATISFAIT
                      │
    ANXIEUX ←─────────┼─────────→ CONFIANT
                      │
    SCEPTIQUE ←───────┼───────→ ENTHOUSIASTE
                      │
        PASSIF ←──────┼──────→ ENGAGÉ

    Position actuelle: ●
    Position souhaitée: ○
```

## Scénarios d'Usage

### Scénario 1 : [Nom du scénario]
**Contexte** : [Situation de départ]
**Action** : [Ce que le persona fait]
**Résultat** : [Ce qu'il obtient]
**Émotion** : [Ce qu'il ressent]

### Scénario 2 : [Nom du scénario]
**Contexte** : [Situation de départ]
**Action** : [Ce que le persona fait]
**Résultat** : [Ce qu'il obtient]
**Émotion** : [Ce qu'il ressent]

## Messages Clés

### Proposition de Valeur pour ce Persona
> "[Message principal adapté à ce persona]"

### Arguments Prioritaires
1. **[Argument 1]** : [Détail]
2. **[Argument 2]** : [Détail]
3. **[Argument 3]** : [Détail]

### Ton à Adopter
- **Registre** : [Formel / Décontracté / Expert]
- **Vocabulaire** : [Technique / Accessible / Inspirant]
- **Longueur** : [Court et percutant / Détaillé et pédagogique]

## Sources de Données

| Source | Type | Date |
|--------|------|------|
| [Interviews clients] | Quali | [Date] |
| [Analytics] | Quanti | [Date] |
| [Enquêtes] | Quali + Quanti | [Date] |
| [Support tickets] | Quali | [Date] |

## Métriques de Validation

- [ ] Basé sur minimum 5 interviews réelles
- [ ] Validé par l'équipe commerciale
- [ ] Testé avec des campagnes pilotes
- [ ] Mis à jour dans les 6 derniers mois
```

## Critères d'Acceptation

### Complétude
- [ ] Identité complète avec photo/avatar
- [ ] Minimum 3 objectifs documentés
- [ ] Minimum 3 pain points identifiés
- [ ] Parcours d'achat détaillé
- [ ] Jobs-to-be-Done formulés
- [ ] Messages clés définis

### Qualité
- [ ] Basé sur des données réelles (pas d'hypothèses non validées)
- [ ] Spécifique (pas de persona générique "tout le monde")
- [ ] Actionnable (permet des décisions concrètes)
- [ ] Distinct des autres personas (pas de chevauchement)

### Validation
- [ ] Revu par l'équipe marketing
- [ ] Validé par l'équipe commerciale/CSM
- [ ] Approuvé par le client/stakeholder

## Points de Contrôle Humain

| Checkpoint | Responsable | Critères |
|------------|-------------|----------|
| Données sources | Data Analyst | Sources fiables et récentes |
| Cohérence persona | Marketing Manager | Pas de contradictions internes |
| Pertinence business | Sales/CSM | Correspond aux vrais clients |
| Validation finale | Client | Aligné avec sa vision |

## Exemples

### Exemple : Persona B2B SaaS

```markdown
# Persona : Marie, la DRH Débordée

## Photo & Identité
| Attribut | Valeur |
|----------|--------|
| **Nom** | Marie Dupont |
| **Âge** | 38-45 ans |
| **Profession** | Directrice RH |
| **Entreprise** | PME 50-200 salariés |
| **Localisation** | Lyon métropole |

## Citation Clé
> "Je passe plus de temps à gérer l'administratif qu'à développer les talents"

## Objectifs & Motivations
### Objectifs Professionnels
1. Réduire le turnover de 20%
2. Digitaliser les processus RH
3. Améliorer la marque employeur

### Pain Points
| Pain Point | Intensité |
|------------|-----------|
| Trop de tâches administratives | 🔥🔥🔥 |
| Outils RH non connectés | 🔥🔥🔥 |
| Difficulté à recruter | 🔥🔥 |

## Job Principal
> "Quand je dois gérer les congés/absences, je veux un système automatisé,
> pour pouvoir me concentrer sur l'accompagnement des managers"
```

### Exemple : Persona E-commerce

```markdown
# Persona : Thomas, le Papa Pressé

## Photo & Identité
| Attribut | Valeur |
|----------|--------|
| **Nom** | Thomas Martin |
| **Âge** | 32-40 ans |
| **Profession** | Cadre / Manager |
| **Situation** | Marié, 2 enfants |
| **Localisation** | Banlieue grande ville |

## Citation Clé
> "Je veux des produits de qualité sans passer des heures à comparer"

## Comportement Digital
| Canal | Usage | Fréquence |
|-------|-------|-----------|
| Mobile | Achat rapide | Quotidien |
| Google | Recherche produits | Hebdo |
| Avis clients | Validation choix | À chaque achat |

## Critères de Décision
| Critère | Poids |
|---------|-------|
| Livraison rapide | 35% |
| Avis positifs | 25% |
| Prix compétitif | 25% |
| SAV réactif | 15% |
```

## Anti-Patterns

### ❌ À Éviter

1. **Persona fourre-tout**
   - Persona trop large qui décrit "tout le monde"
   - Aucune décision concrète possible

2. **Persona inventé**
   - Basé uniquement sur des suppositions
   - Sans validation terrain

3. **Persona statique**
   - Jamais mis à jour
   - Ne reflète plus la réalité du marché

4. **Persona cosmétique**
   - Créé pour "cocher une case"
   - Jamais utilisé dans les décisions

5. **Trop de personas**
   - Plus de 4-5 personas = dilution
   - Impossible de personnaliser efficacement

### ✅ Bonnes Pratiques

1. **Limiter à 3-4 personas max** pour rester actionnable
2. **Prioriser un persona primaire** pour les décisions
3. **Réviser tous les 6-12 mois** avec nouvelles données
4. **Afficher les personas** visiblement dans l'équipe
5. **Utiliser les personas** dans chaque brief créatif

## Intégrations

### Consomme
- `client-request` : Brief initial client
- `project-brief` : Contexte projet

### Produit pour
- `editorial-charter` : Adaptation du ton
- `content-calendar` : Thématiques prioritaires
- `marketing-objectives` : KPIs par segment
- `lead-scoring` : Critères de scoring
- `campaign-planning` : Ciblage publicitaire

## Outils Recommandés

| Outil | Usage |
|-------|-------|
| Miro/Figjam | Template visuel persona |
| Notion/Confluence | Documentation collaborative |
| HubSpot | Personas intégrés au CRM |
| Xtensio | Templates personas pro |
| Hotjar | Données comportementales |

## Références

- "Buyer Personas" - Adele Revella
- "Jobs to be Done" - Clayton Christensen
- "Lean Customer Development" - Cindy Alvarez
