---
id: brand-positioning
name: Positionnement de Marque
version: 1.0.0
category: marketing
status: active
phase: "1-intake"
order: 2
agents:
  - direction-marketing/strategie/brand-positioning
  - direction-marketing/strategie/market-analysis
  - content-marketing/content/ligne-editoriale
consumes:
  - client-request
  - project-brief
  - persona
produces_for:
  - content-marketing/content/ligne-editoriale
  - content-marketing/content/copywriting
  - design/branding/identite-visuelle
  - marketing-ops/campagnes/orchestrator
workflows:
  - id: wf-brand-positioning
    template: wf-strategy
    phase: Discovery
    name: Définition positionnement
    duration: 3 jours
  - id: wf-brand-validation
    template: wf-validation
    phase: Validation
    name: Validation positionnement
    duration: 1 jour
tags:
  - marketing
  - strategie
  - branding
  - differentiation
---

# Positionnement de Marque

## Description

Le positionnement de marque définit la place unique qu'occupe une marque dans l'esprit des consommateurs par rapport à la concurrence. C'est le fondement de toute stratégie marketing et communication.

## Cas d'Usage

- Lancement ou refonte de marque
- Entrée sur un nouveau marché
- Différenciation face à la concurrence
- Alignement des équipes sur le message
- Brief pour identité visuelle et communication

## Structure du Livrable

```markdown
# Positionnement de Marque : [Nom de la Marque]

## Résumé Exécutif

### Statement de Positionnement
> Pour [cible], [Marque] est la [catégorie] qui [bénéfice clé différenciant]
> parce que [raison de croire / preuve].

### Positionnement en une phrase
> "[Phrase mémorable qui capture l'essence de la marque]"

## 1. Analyse du Marché

### Contexte Marché
| Dimension | Analyse |
|-----------|---------|
| **Taille marché** | [X M€ / Mds€] |
| **Croissance** | [+X% / an] |
| **Maturité** | [Émergent / Croissance / Mature / Déclin] |
| **Tendances clés** | [Liste des tendances] |

### Mapping Concurrentiel

```
                    PREMIUM
                       │
                       │    ○ Concurrent A
                       │
    TRADITIONNEL ──────┼────────── INNOVANT
                       │
           ○ Concurrent B    ● NOUS
                       │
                       │    ○ Concurrent C
                    ACCESSIBLE
```

### Analyse Concurrents

| Concurrent | Positionnement | Forces | Faiblesses |
|------------|---------------|--------|------------|
| [Concurrent A] | [Son positionnement] | [+] | [-] |
| [Concurrent B] | [Son positionnement] | [+] | [-] |
| [Concurrent C] | [Son positionnement] | [+] | [-] |

### Espace Stratégique Disponible
- **Gap identifié** : [Zone non occupée]
- **Opportunité** : [Ce qu'on peut revendiquer]
- **Risques** : [Pourquoi ce territoire est libre]

## 2. Définition de la Cible

### Cible Primaire
- **Qui** : [Persona principal]
- **Insight clé** : "[Ce qu'ils pensent/ressentent vraiment]"
- **Besoin non satisfait** : [Le gap qu'on comble]

### Cible Secondaire
- **Qui** : [Persona secondaire]
- **Rôle** : [Influenceur / Prescripteur / Décideur]

### Segmentation

| Segment | Taille | Priorité | Potentiel |
|---------|--------|----------|-----------|
| [Segment 1] | [X%] | 🥇 | [Haut] |
| [Segment 2] | [X%] | 🥈 | [Moyen] |
| [Segment 3] | [X%] | 🥉 | [Moyen] |

## 3. Identité de Marque

### Vision
> "[Ce que la marque aspire à accomplir dans le monde]"

### Mission
> "[La raison d'être de la marque au quotidien]"

### Valeurs

| Valeur | Signification | Comportement associé |
|--------|---------------|---------------------|
| [Valeur 1] | [Ce que ça veut dire] | [Comment on l'incarne] |
| [Valeur 2] | [Ce que ça veut dire] | [Comment on l'incarne] |
| [Valeur 3] | [Ce que ça veut dire] | [Comment on l'incarne] |

### Personnalité de Marque

#### Archétype
**[Archétype principal]** : [Description]
- Traits dominants : [trait 1], [trait 2], [trait 3]
- Voix : [Comment la marque s'exprime]

#### Spectre de Personnalité
```
Sérieux    ○────────●────○ Ludique
Formel     ○────●────────○ Décontracté
Expert     ●────────────○ Accessible
Classique  ○────────●────○ Moderne
Discret    ○────●────────○ Audacieux
```

### Brand Character
> Si [Marque] était une personne, ce serait [description en 2-3 phrases]

## 4. Proposition de Valeur

### Value Proposition Canvas

#### Profil Client
| Jobs-to-be-Done | Pains | Gains |
|-----------------|-------|-------|
| [Job 1] | [Pain 1] | [Gain 1] |
| [Job 2] | [Pain 2] | [Gain 2] |
| [Job 3] | [Pain 3] | [Gain 3] |

#### Notre Offre
| Produits/Services | Pain Relievers | Gain Creators |
|-------------------|----------------|---------------|
| [Offre 1] | [Solution pain 1] | [Création gain 1] |
| [Offre 2] | [Solution pain 2] | [Création gain 2] |

### Bénéfices Clés

| Type | Bénéfice | Preuve |
|------|----------|--------|
| **Fonctionnel** | [Ce que ça fait] | [RTB] |
| **Émotionnel** | [Ce que ça fait ressentir] | [RTB] |
| **Social** | [Ce que ça dit de moi] | [RTB] |

### Reasons to Believe (RTB)
1. **[RTB 1]** : [Preuve tangible]
2. **[RTB 2]** : [Preuve tangible]
3. **[RTB 3]** : [Preuve tangible]

## 5. Différenciation

### Points de Parité (POP)
*Ce qu'on doit avoir pour être crédible dans la catégorie*
- [POP 1]
- [POP 2]
- [POP 3]

### Points de Différence (POD)
*Ce qui nous rend unique*
| POD | Pertinence | Crédibilité | Distinctivité |
|-----|------------|-------------|---------------|
| [POD 1] | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| [POD 2] | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |

### Territoire de Marque Exclusif
> [L'espace que seule notre marque peut légitimement occuper]

## 6. Expression de Marque

### Tagline / Signature
> "[Tagline principale]"

Alternatives testées :
- "[Option A]"
- "[Option B]"

### Messages Clés par Audience

| Audience | Message Principal | Ton |
|----------|-------------------|-----|
| [Cible 1] | "[Message adapté]" | [Ton] |
| [Cible 2] | "[Message adapté]" | [Ton] |
| [Cible 3] | "[Message adapté]" | [Ton] |

### Elevator Pitch
> "[Pitch de 30 secondes pour expliquer la marque]"

### Boilerplate (À propos)
> "[Paragraphe standard pour les communications officielles]"

## 7. Territoire Visuel

### Codes Visuels
| Élément | Direction |
|---------|-----------|
| **Couleurs** | [Palette suggérée et signification] |
| **Typographie** | [Style typographique] |
| **Imagerie** | [Style photographique/illustration] |
| **Iconographie** | [Style des icônes] |

### Mood Board
[Références visuelles qui incarnent le positionnement]

### Do's and Don'ts Visuels
| ✅ Do | ❌ Don't |
|-------|---------|
| [Bonne pratique] | [Mauvaise pratique] |
| [Bonne pratique] | [Mauvaise pratique] |

## 8. Activation

### Quick Wins
- [ ] [Action immédiate 1]
- [ ] [Action immédiate 2]
- [ ] [Action immédiate 3]

### Roadmap Déploiement

| Phase | Actions | Timeline |
|-------|---------|----------|
| **Fondations** | Charte, Guidelines | [Durée] |
| **Interne** | Formation équipes | [Durée] |
| **Externe** | Lancement communication | [Durée] |

### KPIs de Marque

| Métrique | Baseline | Objectif |
|----------|----------|----------|
| Notoriété spontanée | [X%] | [Y%] |
| Notoriété assistée | [X%] | [Y%] |
| Attribution message | [X%] | [Y%] |
| NPS | [X] | [Y] |
```

## Critères d'Acceptation

### Complétude
- [ ] Statement de positionnement validé
- [ ] Analyse concurrentielle documentée
- [ ] Cible clairement définie
- [ ] Proposition de valeur articulée
- [ ] Points de différence identifiés
- [ ] Expression de marque définie

### Qualité
- [ ] Positionnement différenciant (pas générique)
- [ ] Cohérent avec les capacités réelles
- [ ] Pertinent pour la cible
- [ ] Défendable face à la concurrence
- [ ] Mémorable et compréhensible

### Validation
- [ ] Validé par la direction
- [ ] Testé auprès de la cible (quali)
- [ ] Aligné avec le business plan

## Points de Contrôle Humain

| Checkpoint | Responsable | Critères |
|------------|-------------|----------|
| Données marché | Analyste | Sources fiables et récentes |
| Différenciation | Marketing Director | Réellement distinctif |
| Faisabilité | Operations | Peut être tenu dans les faits |
| Validation finale | CEO / Client | Vision alignée |

## Exemples

### Exemple : Positionnement Tech B2B

```markdown
# Positionnement : DataFlow

## Statement
> Pour les équipes Data des ETI, DataFlow est la plateforme d'intégration
> qui simplifie les flux de données complexes, parce que notre approche
> no-code et nos 200+ connecteurs natifs réduisent le time-to-value de 80%.

## Personnalité
- **Archétype** : Le Magicien (transformation, simplification)
- **Traits** : Expert mais accessible, moderne, fiable, agile

## Proposition de Valeur
| Bénéfice | Preuve |
|----------|--------|
| Rapidité de déploiement | 200+ connecteurs prêts à l'emploi |
| Accessibilité | Interface no-code |
| Fiabilité | 99.9% uptime garanti |

## POD Principal
> "Le seul outil qui permet à un analyste métier de créer des pipelines
> de données enterprise-grade sans écrire une ligne de code"
```

### Exemple : Positionnement E-commerce

```markdown
# Positionnement : GreenBox

## Statement
> Pour les parents soucieux de l'environnement, GreenBox est le service
> de box mensuelle qui propose des produits bébé/enfant écologiques
> et éthiques, parce que chaque produit est certifié et notre impact
> carbone est compensé à 200%.

## Personnalité
- **Archétype** : Le Soignant (protection, bienveillance)
- **Traits** : Bienveillant, transparent, engagé, rassurant

## Différenciation
| POP (Parité) | POD (Différence) |
|--------------|------------------|
| Produits bébé de qualité | 100% certifiés éco |
| Livraison pratique | Emballage 0 plastique |
| Prix compétitif | Traçabilité totale |
```

## Anti-Patterns

### ❌ À Éviter

1. **Positionnement générique**
   - "La qualité à prix juste"
   - Applicable à n'importe quelle marque

2. **Positionnement aspirationnel irréaliste**
   - Promet ce qu'on ne peut pas tenir
   - Déconnecté de la réalité opérationnelle

3. **Positionnement par négation**
   - Défini par ce qu'on n'est PAS
   - Sans identité propre positive

4. **Copier le leader**
   - "Comme [Leader] mais moins cher"
   - Position vouée à l'échec

5. **Trop de positionnements**
   - Vouloir plaire à tout le monde
   - Message dilué et confus

### ✅ Bonnes Pratiques

1. **Choisir = Renoncer** - Accepter de ne pas plaire à tous
2. **Simple et mémorable** - Testable en "elevator pitch"
3. **Preuve tangible** - Chaque claim doit être prouvable
4. **Cohérence 360°** - Incarné à chaque point de contact
5. **Évolutif mais stable** - Peut évoluer sans rupture

## Intégrations

### Consomme
- `persona` : Définition de la cible
- `client-request` : Brief initial
- `project-brief` : Contexte business

### Produit pour
- `editorial-charter` : Ton et voix
- `design-tokens` : Traduction visuelle
- `marketing-objectives` : KPIs de marque
- `content-calendar` : Piliers de contenu

## Outils Recommandés

| Outil | Usage |
|-------|-------|
| Miro/Figjam | Workshops positionnement |
| Brandwatch | Perception de marque |
| SurveyMonkey | Tests de positionnement |
| Typeform | Études qualitatives |

## Références

- "Positioning" - Al Ries & Jack Trout
- "Building Strong Brands" - David Aaker
- "Start with Why" - Simon Sinek
- "Zag" - Marty Neumeier
