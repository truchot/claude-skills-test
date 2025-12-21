# Vision : Agents IA pour Agence Web

> **Objectif** : Industrialiser les métiers d'une agence Web avec des agents IA supervisés par des humains.

## Philosophie

Les agents IA exécutent les tâches opérationnelles tandis que les humains assurent :
- La supervision stratégique
- La validation des livrables
- La relation client de haut niveau
- Les décisions créatives finales

---

## Les 6 Domaines Métiers

| # | Domaine | Skill | Statut |
|---|---------|-------|--------|
| 1 | **Gestion de projet & Relation client** | `web-agency/project-management` | 🔴 À créer |
| 2 | **Stratégie & Conseil** | `web-agency/strategy` | 🔴 À créer |
| 3 | **Design & Création graphique** | `web-agency/design` | 🔴 À créer |
| 4 | **Technique & Développement** | `web-dev-process` | 🟢 Existant |
| 5 | **Contenu & Rédaction** | `web-agency/content` | 🔴 À créer |
| 6 | **Marketing Digital** | `web-agency/marketing` | 🔴 À créer |

---

## Domaine 1 : Gestion de projet & Relation client

### Périmètre
Tout ce qui concerne la gestion opérationnelle des projets et la relation avec les clients.

### Agents prévus

| Agent | Responsabilité |
|-------|----------------|
| `orchestrator` | Routage vers les agents spécialisés |
| `brief-client` | Collecte et formalisation du brief client |
| `estimation` | Chiffrage, estimation des charges, devis |
| `planning` | Planning de production, jalons, dépendances |
| `suivi-projet` | Suivi d'avancement, reporting, alertes |
| `communication-client` | Rédaction emails, comptes-rendus, présentations |
| `recettage` | Processus de validation, PV de recette |
| `facturation` | Suivi financier, facturation, relances |

---

## Domaine 2 : Stratégie & Conseil

### Périmètre
Audit, analyse et recommandations stratégiques pour les clients.

### Agents prévus

| Agent | Responsabilité |
|-------|----------------|
| `orchestrator` | Routage vers les agents spécialisés |
| `audit-existant` | Audit de site, analyse technique et UX |
| `benchmark` | Analyse concurrentielle, veille marché |
| `strategie-digitale` | Définition de la stratégie globale |
| `recommandations` | Formalisation des préconisations |
| `kpis` | Définition des indicateurs de succès |

---

## Domaine 3 : Design & Création graphique

### Périmètre
Tout ce qui touche à l'identité visuelle et la création graphique.

### Agents prévus

| Agent | Responsabilité |
|-------|----------------|
| `orchestrator` | Routage vers les agents spécialisés |
| `direction-artistique` | Guidelines créatives, moodboards |
| `branding` | Identité visuelle, charte graphique |
| `maquettes` | Conception UI, wireframes, prototypes |
| `motion-design` | Animations, micro-interactions |
| `assets-creation` | Icônes, illustrations, visuels |

> Note : S'appuie sur les agents UI/UX existants dans `web-dev-process/design`

---

## Domaine 4 : Technique & Développement

### Périmètre
Développement, infrastructure, qualité du code.

### Statut
✅ **Déjà couvert** par :
- `web-dev-process` (61 agents - framework générique)
- `wordpress-gutenberg-expert` (41 agents - implémentation WP)

---

## Domaine 5 : Contenu & Rédaction

### Périmètre
Production de contenus textuels et éditoriaux.

### Agents prévus

| Agent | Responsabilité |
|-------|----------------|
| `orchestrator` | Routage vers les agents spécialisés |
| `copywriting` | Rédaction persuasive, accroches, CTA |
| `redaction-seo` | Contenus optimisés pour le référencement |
| `arborescence` | Architecture de l'information, navigation |
| `ligne-editoriale` | Ton, style, persona éditorial |
| `production-contenu` | Articles, fiches produits, pages |

---

## Domaine 6 : Marketing Digital

### Périmètre
Acquisition, visibilité, conversion et fidélisation.

### Agents prévus

| Agent | Responsabilité |
|-------|----------------|
| `orchestrator` | Routage vers les agents spécialisés |
| `seo` | Référencement naturel technique et sémantique |
| `sea` | Google Ads, campagnes payantes |
| `social-media` | Stratégie réseaux sociaux, community management |
| `email-marketing` | Newsletters, automation, séquences |
| `analytics` | Tracking, reporting, data analysis |
| `growth` | Growth hacking, acquisition, CRO |

---

## Architecture globale

```
.claude/skills/
├── web-agency/                    # NOUVEAU SKILL
│   ├── SKILL.md                   # Orchestrateur principal
│   ├── agents/
│   │   ├── project-management/    # Domaine 1
│   │   ├── strategy/              # Domaine 2
│   │   ├── design/                # Domaine 3
│   │   ├── content/               # Domaine 5
│   │   └── marketing/             # Domaine 6
│   ├── templates/
│   └── docs/
│
├── web-dev-process/               # Existant (Domaine 4)
└── wordpress-gutenberg-expert/    # Existant (Domaine 4 - WP)
```

---

## Interactions entre domaines

```
                    ┌─────────────────┐
                    │   CLIENT        │
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │  1. GESTION     │◄──── Point d'entrée
                    │     PROJET      │
                    └────────┬────────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
┌───────▼───────┐   ┌────────▼────────┐   ┌──────▼──────┐
│ 2. STRATÉGIE  │   │   3. DESIGN     │   │ 5. CONTENU  │
└───────┬───────┘   └────────┬────────┘   └──────┬──────┘
        │                    │                    │
        └────────────────────┼────────────────────┘
                             │
                    ┌────────▼────────┐
                    │  4. TECHNIQUE   │
                    │  (web-dev-proc) │
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │  6. MARKETING   │◄──── Post-lancement
                    └─────────────────┘
```

---

## Roadmap de développement

### Phase 1 : Gestion de projet (prioritaire)
- [ ] Structurer les agents
- [ ] Créer les templates (brief, devis, planning)
- [ ] Définir les workflows

### Phase 2 : Contenu & Rédaction
- [ ] Agents de rédaction
- [ ] Guidelines éditoriales

### Phase 3 : Marketing Digital
- [ ] Agents SEO/SEA
- [ ] Analytics et reporting

### Phase 4 : Stratégie & Conseil
- [ ] Frameworks d'audit
- [ ] Templates de recommandations

### Phase 5 : Design (compléments)
- [ ] Étendre les agents UI/UX existants
- [ ] Branding et identité visuelle

---

## Principes de conception des agents

1. **Supervision humaine** : Chaque agent produit des livrables validables
2. **Traçabilité** : Historique des décisions et modifications
3. **Interopérabilité** : Les agents communiquent entre domaines
4. **Templates réutilisables** : Modèles de documents prêts à l'emploi
5. **Escalade claire** : Quand l'agent doit solliciter un humain
