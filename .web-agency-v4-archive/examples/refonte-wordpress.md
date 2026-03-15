# Scénario : Refonte WordPress vers Gutenberg

## Contexte

Un client avec un site WordPress classique souhaite moderniser vers Gutenberg full-site editing.

## Déclencheur

```
Formulaire de contact:

Nom: Sophie Laurent
Entreprise: Cabinet Avocat Laurent
Email: s.laurent@cabinet-laurent.fr

Message:
Notre site WordPress a 5 ans et fait vraiment vieillot.
On aimerait quelque chose de moderne, facile à mettre à jour.
J'ai entendu parler de Gutenberg, est-ce adapté ?

Budget: ~8000€
```

## Flux d'Exécution

### Phase 1 : Qualification (< 4h)

```
📥 client-intake
├── reception/form-handler → Données structurées
├── qualification/intent-classifier → Type: "Refonte WordPress"
├── qualification/complexity-estimator → Complexité: Moyenne
└── extraction/requirements-extractor → Besoins initiaux

📋 project-management
├── avant-projet/collecte-besoin → Analyse site actuel
├── avant-projet/questions-clarification → RDV découverte proposé
└── avant-projet/formalisation-brief → Brief initial
```

**Audit Automatique Site Actuel :**
```yaml
audit:
  url: https://cabinet-laurent.fr
  wordpress_version: 5.4.2 (obsolète)
  theme: Theme personnalisé (2019)
  plugins: 23 (dont 8 obsolètes)
  pages: 12
  articles: 45
  media: 234 fichiers
  performance:
    lcp: 4.2s (mauvais)
    cls: 0.35 (mauvais)
  seo:
    score: 45/100
  accessibility:
    score: 62/100
```

### Phase 2 : Proposition Technique (< 8h)

```
🏛️ direction-technique
├── decisions/technology-selector → Gutenberg FSE + Theme.json
├── decisions/architecture-designer → Block-based architecture
└── decisions/migration-planner → Plan de migration

🎨 design-system-foundations
└── foundations/color-palette → Extraction couleurs existantes
```

**Proposition Architecture :**
```markdown
## Stack Recommandée

### WordPress 6.4+ avec Gutenberg FSE
- Theme.json pour design tokens
- Blocks patterns réutilisables
- Templates site complet
- Navigation block-based

### Avantages
- Édition WYSIWYG complète
- Performance améliorée
- Accessibilité native
- Maintenance simplifiée

### Migration
1. Nouveau thème FSE custom
2. Migration contenu par blocs
3. Redirection URLs
4. Formation client
```

### Phase 3 : Design UX/UI (5 jours)

```
🎨 ux-ui-design
├── research/competitor-analyzer → Benchmark cabinets avocats
├── wireframe/sitemap-designer → Nouvelle arborescence (8 pages)
├── visual/style-guide-creator → Charte modernisée
├── visual/ui-designer → Maquettes desktop/mobile
└── prototype/prototype-builder → Prototype interactif
```

**Livrables Design :**
- Wireframes 8 pages
- Maquettes Figma (desktop + mobile)
- Style guide (couleurs, typo, espacements)
- Prototype cliquable

### Phase 4 : Développement WordPress (12 jours)

```
🔷 wordpress-gutenberg-expert
├── theme/theme-creator → Thème FSE créé
│   ├── theme.json (design tokens)
│   ├── templates/ (header, footer, single, archive)
│   ├── parts/ (composants réutilisables)
│   └── patterns/ (patterns métier avocat)
│
├── blocks/block-creator → Blocks custom
│   ├── hero-cabinet (présentation)
│   ├── team-grid (équipe)
│   ├── expertise-list (domaines)
│   ├── testimonials (avis)
│   └── cta-contact (contact)
│
├── migration/content-migrator → Migration contenu
│   ├── Pages converties en blocs
│   ├── Articles conservés
│   └── Médias optimisés
│
└── optimization/performance-optimizer → Optimisation
    ├── Lazy loading images
    ├── CSS critique inline
    └── Cache navigateur
```

**Theme.json :**
```json
{
  "version": 2,
  "settings": {
    "color": {
      "palette": [
        {"slug": "primary", "color": "#1e3a5f"},
        {"slug": "secondary", "color": "#c9a227"}
      ]
    },
    "typography": {
      "fontFamilies": [
        {"fontFamily": "Playfair Display", "slug": "heading"},
        {"fontFamily": "Source Sans Pro", "slug": "body"}
      ]
    },
    "spacing": {
      "units": ["px", "em", "rem", "%"]
    }
  }
}
```

### Phase 5 : Conformité (Parallèle)

```
⚖️ legal-compliance
├── documents/legal-notice-generator → Mentions légales avocat
├── documents/privacy-policy-generator → RGPD cabinet
└── cookies/banner-specifier → Bandeau cookies CNIL
```

### Phase 6 : Tests & Livraison (3 jours)

```
🧪 testing-process
├── types/visual-regression-tester → Tests visuels
├── quality/accessibility-auditor → Score: 94/100
├── performance/performance-auditor → LCP: 1.8s
└── types/cross-browser-tester → Chrome, Firefox, Safari

📋 project-management
├── livraison/plan-recette → Tests client
├── livraison/pv-recette → Validation
└── communication/email-annonce-livraison → Go live

📚 support-client
└── knowledge/article-writer → Guide Gutenberg client
```

### Phase 7 : Formation (0.5 jour)

```
📋 project-management
└── pilotage/formation-client → Session Gutenberg

📚 support-client
└── knowledge/faq-manager → FAQ éditeur
```

**Formation :**
- 2h visio enregistrée
- Guide PDF 20 pages
- Vidéos tutoriels (5×3min)
- FAQ interactive

## Résultat

### Comparatif Avant/Après

| Métrique | Avant | Après | Δ |
|----------|-------|-------|---|
| LCP | 4.2s | 1.8s | -57% |
| CLS | 0.35 | 0.05 | -86% |
| Score SEO | 45 | 89 | +98% |
| Score A11Y | 62 | 94 | +52% |
| Plugins | 23 | 8 | -65% |
| Temps MAJ page | 15 min | 2 min | -87% |

### Métriques Projet

| Métrique | Valeur |
|----------|--------|
| Durée totale | 20 jours |
| Budget final | 7,800€ |
| Satisfaction | 9.5/10 |
| Skills impliqués | 8 |
| Agents utilisés | 32 |

### Skills Impliqués

| Skill | Contribution |
|-------|--------------|
| `client-intake` | Qualification initiale |
| `project-management` | Pilotage complet |
| `direction-technique` | Choix architecture |
| `ux-ui-design` | Design moderne |
| `design-system-foundations` | Tokens design |
| `wordpress-gutenberg-expert` | Développement |
| `legal-compliance` | Documents légaux |
| `testing-process` | Validation qualité |
| `support-client` | Formation + Documentation |
