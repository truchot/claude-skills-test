# Vision Analyzer Skill

> **NIVEAU -1 : PERCEPTION** - Le premier sens de l'agence IA autonome

## Vue d'ensemble

Le skill `vision-analyzer` donne à l'agence la capacité de **voir** et d'analyser visuellement son environnement. Il transforme des images (screenshots, maquettes, croquis) en données structurées exploitables.

## Capacités

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   INTAKE    │ →   │  ANALYSIS   │ →   │ EXTRACTION  │ →   │ GENERATION  │
│             │     │             │     │             │     │             │
│ Parse image │     │ Critique &  │     │ Specs       │     │ Briefs &    │
│ en données  │     │ Audits      │     │ techniques  │     │ Code        │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
```

## Structure

```
vision-analyzer/
├── SKILL.md                    # Documentation principale
├── CHANGELOG.md                # Historique des versions
├── README.md                   # Ce fichier
└── agents/
    ├── intake/                 # 4 agents
    │   ├── orchestrator.md
    │   ├── screenshot-parser.md
    │   ├── mockup-interpreter.md
    │   └── handwritten-decoder.md
    ├── analysis/               # 5 agents
    │   ├── orchestrator.md
    │   ├── design-critic.md
    │   ├── accessibility-scanner.md
    │   ├── brand-consistency-checker.md
    │   └── competitor-visual-analyzer.md
    ├── extraction/             # 5 agents
    │   ├── orchestrator.md
    │   ├── color-palette-extractor.md
    │   ├── typography-detector.md
    │   ├── component-identifier.md
    │   └── layout-mapper.md
    └── generation/             # 4 agents
        ├── orchestrator.md
        ├── design-brief-generator.md
        ├── figma-spec-writer.md
        └── css-from-visual.md
```

**Total : 18 agents** (16 spécialisés + 4 orchestrateurs inclus)

## Cas d'Usage

### 1. Reverse-Engineering d'un Concurrent

```
Input: Screenshot du site concurrent
↓
Workflow: intake → extraction (all) → analysis → generation
↓
Output: Brief + Design tokens + CSS de base
```

### 2. Conversion Maquette → Code

```
Input: Export Figma/image de maquette
↓
Workflow: intake → extraction → generation/css-from-visual
↓
Output: Variables CSS + Classes composants + Config Tailwind
```

### 3. Audit Visuel Rapide

```
Input: Screenshot du site à auditer
↓
Workflow: intake → analysis (all)
↓
Output: Rapport UX + Rapport A11Y + Conformité marque
```

### 4. Brief depuis Croquis Client

```
Input: Photo de croquis papier
↓
Workflow: intake/handwritten → generation/brief
↓
Output: Brief créatif structuré
```

## Mots-clés de Routage

| Domaine | Mots-clés |
|---------|-----------|
| intake | screenshot, capture, image, maquette, mockup, croquis |
| analysis | critique, audit, évaluer, a11y, marque, concurrent |
| extraction | couleurs, palette, typo, composants, layout, grille |
| generation | brief, specs, CSS, Tailwind, Figma |

## Intégration avec Autres Skills

### Vers qui ce skill envoie des données

| Skill | Ce qu'il reçoit |
|-------|-----------------|
| `direction-artistique` | Analyses pour décisions créatives |
| `ux-ui-design` | Briefs et specs pour wireframes |
| `frontend-developer` | CSS et structure pour implémentation |
| `design-system-foundations` | Composants identifiés |

### Qui envoie des données à ce skill

| Skill | Ce qu'il fournit |
|-------|------------------|
| `browser-automation` | Screenshots capturés automatiquement |
| `client-intake` | Images fournies par le client |

## Prérequis Techniques

- Claude Vision API (ou équivalent multimodal)
- Formats supportés : PNG, JPG, WebP, PDF (1ère page)

## Métriques de Succès

| Métrique | Cible |
|----------|-------|
| Précision extraction couleurs | > 95% |
| Identification composants UI | > 85% |
| Temps d'analyse moyen | < 30s |

## Version

**v1.0.0** - Janvier 2026

---

*Ce skill fait partie de la Phase 1 (Perception) de la roadmap VISION-2027.*
