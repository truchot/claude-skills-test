# Changelog - Vision Analyzer Skill

Toutes les modifications notables de ce skill sont documentées dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/),
et ce projet adhère au [Semantic Versioning](https://semver.org/lang/fr/).

## [1.0.0] - 2026-01-19

### Added

#### Skill Foundation
- Création du skill `vision-analyzer` comme premier skill de NIVEAU -1 (Perception)
- Positionnement dans l'architecture : donne à l'agence la capacité de "voir"
- Documentation complète dans SKILL.md

#### Domain: intake/ (4 agents)
- `orchestrator.md` - Coordination du parsing d'images
- `screenshot-parser.md` - Parse screenshots de sites web et apps
- `mockup-interpreter.md` - Interprète maquettes Figma/Sketch/XD
- `handwritten-decoder.md` - Décode croquis papier et whiteboard

#### Domain: analysis/ (5 agents)
- `orchestrator.md` - Coordination des analyses visuelles
- `design-critic.md` - Critique UX/UI basée sur heuristiques de Nielsen
- `accessibility-scanner.md` - Audit accessibilité visuelle (WCAG)
- `brand-consistency-checker.md` - Vérification conformité charte graphique
- `competitor-visual-analyzer.md` - Benchmark et analyse concurrentielle

#### Domain: extraction/ (5 agents)
- `orchestrator.md` - Coordination des extractions
- `color-palette-extractor.md` - Extraction palettes couleurs avec tokens
- `typography-detector.md` - Identification typographies et échelle
- `component-identifier.md` - Identification composants UI
- `layout-mapper.md` - Analyse structure layout et grilles

#### Domain: generation/ (4 agents)
- `orchestrator.md` - Coordination de la génération
- `design-brief-generator.md` - Génération briefs créatifs structurés
- `figma-spec-writer.md` - Specs Figma/design tokens importables
- `css-from-visual.md` - Code CSS/Tailwind depuis visuels

### Technical
- Output JSON structuré pour chaque agent
- Niveaux de confiance pour toutes les extractions
- Export multi-format (CSS, SCSS, Tailwind, Figma Tokens)
- Documentation des limitations et cas d'escalade

### Documentation
- Workflows typiques documentés (reverse-engineering, audit, handoff)
- Règles de routage par mots-clés
- Composition avec autres skills (direction-artistique, ux-ui-design, frontend-developer)
- Métriques de succès définies

---

## Roadmap

### [1.1.0] - Planned
- Intégration API Claude Vision pour analyse multimodale
- Support vidéo/GIF (extraction de frames clés)
- Amélioration OCR pour texte dans images

### [1.2.0] - Planned
- Mode batch pour analyse de multiples screenshots
- Comparaison avant/après pour tracking de changements
- Export vers Storybook

### [2.0.0] - Planned
- Intégration avec skill `browser-automation` pour capture automatique
- Génération de tests visuels automatiques
- Support Figma API direct (lecture fichiers .fig)
