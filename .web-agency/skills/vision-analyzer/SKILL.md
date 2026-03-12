---
name: vision-analyzer
description: |-
  Analyse visuelle intelligente via IA multimodale. Utilise ce skill quand: (1) analyse de screenshots ou maquettes, (2) audit visuel de sites web, (3) extraction de specs depuis images, (4) comparaison avec concurrents, (5) reverse-engineering de designs, (6) conversion image vers code/specs.
metadata:
  version: 1.0.0
  status: active
  phase: 1
  roadmap: ROADMAP-VISION-2027.md
---

# Vision Analyzer Skill

## Position dans l'Architecture

Ce skill est un skill de **NIVEAU -1 : PERCEPTION**. Il donne à l'agence la capacité de "voir" et d'analyser visuellement son environnement.

```
┌─────────────────────────────────────────────────────────────────┐
│  NIVEAU -1 : PERCEPTION (vision-analyzer) ← CE SKILL           │
│  → Analyse visuelle, extraction d'information depuis images     │
│  → Screenshot → structured data, Mockup → specs techniques      │
├─────────────────────────────────────────────────────────────────┤
│  NIVEAU 0 : INTAKE (client-intake)                              │
│  → Qualification client, besoins, brief                         │
├─────────────────────────────────────────────────────────────────┤
│  NIVEAU 1 : POURQUOI (directions)                               │
│  → Décisions stratégiques, choix architecturaux                 │
├─────────────────────────────────────────────────────────────────┤
│  NIVEAU 2 : QUOI (process)                                      │
│  → Workflows, coordination, standards                           │
├─────────────────────────────────────────────────────────────────┤
│  NIVEAU 3 : COMMENT (implementation)                            │
│  → Code, configurations, livrables concrets                     │
└─────────────────────────────────────────────────────────────────┘
```

## Philosophie

Ce skill est le **premier sens** de l'agence IA autonome. Il permet de :

- **Voir** : Analyser screenshots, maquettes, photos, croquis
- **Comprendre** : Extraire structure, couleurs, typographies, composants
- **Critiquer** : Évaluer UX/UI, accessibilité, cohérence de marque
- **Générer** : Produire briefs, specs, code CSS depuis des visuels

Il contient :
- Agents d'intake visuel (parsing d'images)
- Agents d'analyse (critique, audit, benchmark)
- Agents d'extraction (couleurs, typos, composants)
- Agents de génération (briefs, specs, code)

Il ne contient PAS :
- Génération d'images → futur skill `visual-generator`
- Navigation web → skill `browser-automation`
- Décisions stratégiques → skills `direction-*`

## Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              vision-analyzer                                 │
│                         (PERCEPTION - 16 agents)                            │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                          4 DOMAINES                                  │   │
│  │                                                                       │   │
│  │  intake/            analysis/          extraction/      generation/  │   │
│  │    (4)                (5)                 (5)              (4)       │   │
│  │                                                                       │   │
│  │  Parse images      Critique &         Extrait specs    Génère docs   │   │
│  │  en données        audite visuels     techniques       et code       │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                    ┌─────────────────┼─────────────────┐
                    ▼                 ▼                 ▼
            ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
            │ direction-   │  │ ux-ui-       │  │ frontend-    │
            │ artistique   │  │ design       │  │ developer    │
            │              │  │              │  │              │
            │ Décisions    │  │ Wireframes   │  │ Implémente   │
            │ créatives    │  │ prototypes   │  │ le code      │
            └──────────────┘  └──────────────┘  └──────────────┘
```

## Domaines et Agents (16 agents)

### 1. intake/ - Parsing d'Images (4 agents)

Transforme les images brutes en données structurées exploitables.

| Agent | Responsabilité | Input | Output |
|-------|----------------|-------|--------|
| `orchestrator` | Coordination intake visuel | Image + contexte | Routage vers agent approprié |
| `screenshot-parser` | Parse screenshots de sites/apps | Screenshot PNG/JPG | Structure JSON des éléments UI |
| `mockup-interpreter` | Interprète maquettes Figma/Sketch | Image de maquette | Specs techniques structurées |
| `handwritten-decoder` | Décode croquis papier | Photo de croquis | Wireframe structuré |

### 2. analysis/ - Analyse & Critique (5 agents)

Évalue la qualité et la conformité des designs.

| Agent | Responsabilité | Input | Output |
|-------|----------------|-------|--------|
| `orchestrator` | Coordination analyses visuelles | Image + critères | Routage + synthèse |
| `design-critic` | Critique UX/UI experte | Screenshot/maquette | Rapport critique détaillé |
| `accessibility-scanner` | Détecte problèmes a11y visuels | Image UI | Rapport a11y avec solutions |
| `brand-consistency-checker` | Vérifie cohérence de marque | Image + brand guidelines | Rapport conformité |
| `competitor-visual-analyzer` | Analyse designs concurrents | URL ou screenshot concurrent | Benchmark comparatif |

### 3. extraction/ - Extraction de Specs (5 agents)

Extrait les spécifications techniques depuis les visuels.

| Agent | Responsabilité | Input | Output |
|-------|----------------|-------|--------|
| `orchestrator` | Coordination extractions | Image | Routage multi-extraction |
| `color-palette-extractor` | Extrait palettes couleurs | Image | Palette JSON (hex, HSL, tokens) |
| `typography-detector` | Identifie typographies | Image avec texte | Fonts, sizes, weights, line-heights |
| `component-identifier` | Identifie composants UI | Screenshot | Liste composants + variants |
| `layout-mapper` | Map la structure de layout | Image page complète | Grid/Flexbox structure, spacing |

### 4. generation/ - Génération de Livrables (4 agents)

Génère des documents et du code depuis l'analyse visuelle.

| Agent | Responsabilité | Input | Output |
|-------|----------------|-------|--------|
| `orchestrator` | Coordination génération | Analyse + contexte | Routage génération |
| `design-brief-generator` | Génère brief depuis image | Screenshot/maquette | Brief créatif structuré |
| `figma-spec-writer` | Écrit specs pour Figma | Image analysée | Document specs Figma-ready |
| `css-from-visual` | Génère CSS depuis image | Image + extraction | Code CSS/Tailwind |

## Règles de Routage

### Routage par type d'input

```
SI input est [screenshot site web, capture d'écran app]
   → intake/screenshot-parser.md

SI input est [maquette Figma, export Sketch, design XD]
   → intake/mockup-interpreter.md

SI input est [photo croquis, dessin papier, whiteboard]
   → intake/handwritten-decoder.md

SI demande est [critique, avis, évaluation du design]
   → analysis/design-critic.md

SI demande est [accessibilité, contraste, a11y, WCAG]
   → analysis/accessibility-scanner.md

SI demande est [cohérence marque, brand, charte graphique]
   → analysis/brand-consistency-checker.md

SI demande est [concurrent, benchmark, comparaison]
   → analysis/competitor-visual-analyzer.md

SI demande est [couleurs, palette, color scheme]
   → extraction/color-palette-extractor.md

SI demande est [police, typo, font, typography]
   → extraction/typography-detector.md

SI demande est [composants, boutons, cards, UI elements]
   → extraction/component-identifier.md

SI demande est [layout, grille, espacement, structure]
   → extraction/layout-mapper.md

SI demande est [brief, cahier des charges depuis image]
   → generation/design-brief-generator.md

SI demande est [specs Figma, spécifications design]
   → generation/figma-spec-writer.md

SI demande est [CSS, code, Tailwind depuis image]
   → generation/css-from-visual.md
```

### Mots-clés par domaine

| Domaine | Mots-clés |
|---------|-----------|
| **intake** | screenshot, capture, image, maquette, mockup, croquis, sketch, photo, upload |
| **analysis** | critique, audit, évaluer, analyser, a11y, accessibilité, marque, brand, concurrent, benchmark |
| **extraction** | extraire, couleurs, palette, typo, police, font, composants, layout, grille, espacement |
| **generation** | générer, brief, specs, CSS, Tailwind, code, Figma |

## Workflows Typiques

### Workflow 1 : Reverse-engineering d'un site concurrent

```
1. intake/screenshot-parser.md
   → Parse le screenshot en éléments structurés

2. extraction/* (en parallèle)
   → color-palette-extractor.md → Palette couleurs
   → typography-detector.md → Typographies utilisées
   → component-identifier.md → Composants UI
   → layout-mapper.md → Structure layout

3. analysis/competitor-visual-analyzer.md
   → Benchmark et analyse des choix

4. generation/design-brief-generator.md
   → Brief pour créer une version différenciée
```

### Workflow 2 : Conversion maquette client en specs

```
1. intake/mockup-interpreter.md
   → Interprète la maquette Figma/image

2. extraction/* (en parallèle)
   → Extraction complète des specs

3. generation/figma-spec-writer.md
   → Document de specs complet

4. generation/css-from-visual.md
   → Code CSS de base généré
```

### Workflow 3 : Audit visuel rapide

```
1. intake/screenshot-parser.md
   → Parse le screenshot

2. analysis/* (en parallèle)
   → design-critic.md → Critique UX/UI
   → accessibility-scanner.md → Audit a11y
   → brand-consistency-checker.md → Cohérence marque

3. Synthèse des recommandations
```

## Composition avec Autres Skills

### Vers direction-artistique (NIVEAU 1)

| Ce skill fournit | direction-artistique utilise pour |
|------------------|-----------------------------------|
| Analyse concurrent | Définir positionnement visuel |
| Extraction palette | Valider/ajuster identité |
| Audit accessibilité | Décisions charte graphique |

### Vers ux-ui-design (NIVEAU 3)

| Ce skill fournit | ux-ui-design utilise pour |
|------------------|---------------------------|
| Brief généré | Créer wireframes |
| Specs Figma | Implémenter design |
| Composants identifiés | Design system |

### Vers frontend-developer (NIVEAU 3)

| Ce skill fournit | frontend-developer utilise pour |
|------------------|--------------------------------|
| CSS généré | Base d'implémentation |
| Layout mappé | Structure HTML/CSS |
| Composants identifiés | Architecture composants |

## Prérequis Techniques

### APIs et Services

| Service | Usage | Priorité |
|---------|-------|----------|
| Claude Vision API | Analyse multimodale | Critique |
| OpenAI Vision | Fallback/comparaison | Haute |
| Google Cloud Vision | OCR avancé | Moyenne |

### Formats Supportés

| Format | Support | Notes |
|--------|---------|-------|
| PNG | Complet | Recommandé pour screenshots |
| JPG/JPEG | Complet | OK pour photos |
| WebP | Complet | Format moderne |
| SVG | Partiel | Converti en raster |
| PDF | Partiel | Première page uniquement |
| Figma URL | Via export | Nécessite export image |

## Métriques de Succès

| Métrique | Cible | Mesure |
|----------|-------|--------|
| Précision extraction couleurs | > 95% | Delta E < 5 |
| Identification composants UI | > 85% | Recall sur dataset test |
| Temps d'analyse moyen | < 30s | P95 latency |
| Satisfaction critique UX | > 80% | Feedback utilisateurs |

## Points d'Escalade

### Vers l'humain

- Image de très mauvaise qualité
- Croquis illisible
- Demande de jugement esthétique subjectif
- Design avec éléments culturels sensibles

### Vers d'autres skills

- Implémentation code → `frontend-developer`
- Décisions stratégiques → `direction-artistique`
- Tests automatisés → `browser-automation`
- Design system → `design-system-foundations`

## Limitations Connues

| Limitation | Impact | Mitigation |
|------------|--------|------------|
| Texte petit/flou | OCR imprécis | Demander meilleure résolution |
| Animations/vidéos | Non supporté | Screenshot frames clés |
| Designs 3D complexes | Analyse partielle | Focus sur éléments 2D |
| Dark patterns subtils | Détection limitée | Review humaine |

## Skills Associés

| Skill | Niveau | Relation |
|-------|--------|----------|
| `browser-automation` | PERCEPTION | Capture automatique de screenshots |
| `direction-artistique` | POURQUOI | Reçoit analyses pour décisions |
| `ux-ui-design` | COMMENT | Reçoit briefs et specs |
| `frontend-developer` | COMMENT | Reçoit CSS et structure |
| `design-system-foundations` | COMMENT | Reçoit composants identifiés |

## Changelog

### v1.0.0
- Création initiale avec 4 domaines et 16 agents
- Positionnement NIVEAU -1 : PERCEPTION
- Workflows de reverse-engineering et audit
- Règles de composition avec skills existants
