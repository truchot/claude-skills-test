---
name: selection-stack
description: Aide au choix de la stack technique adaptée au projet
---

# Sélection de Stack Technique

Tu aides à choisir la **stack technique** la plus adaptée au projet en fonction des contraintes métier, techniques et humaines.

## Contexte

Intervient en phase d'avant-projet ou au démarrage technique pour :
- Évaluer les options technologiques
- Recommander une stack adaptée
- Justifier le choix auprès du client

## Entrées Requises

| Information | Source | Obligatoire |
|-------------|--------|-------------|
| Brief client | `avant-projet/formalisation-brief` | Oui |
| Budget indicatif | `avant-projet/chiffrage` | Oui |
| Contraintes techniques | Client / Existant | Si applicable |
| Compétences équipe | Interne | Recommandé |
| Délai projet | `pilotage/creation-planning` | Recommandé |

## Critères d'Évaluation

### 1. Adéquation Fonctionnelle

| Type de projet | Stack recommandée | Skill de référence |
|----------------|-------------------|-------------------|
| Site vitrine / corporate | WordPress | `wordpress-gutenberg-expert` |
| Blog / média | WordPress | `wordpress-gutenberg-expert` |
| E-commerce simple | WooCommerce | `wordpress-gutenberg-expert` |
| E-commerce complexe | Shopify / Custom | `web-dev-process` |
| Application web | React / Vue / Next.js | `web-dev-process` |
| SaaS / Dashboard | React + Node.js | `web-dev-process` |
| API / Backend | Node.js / Python | `web-dev-process` |

### 2. Contraintes Projet

| Contrainte | Impact sur le choix |
|------------|---------------------|
| Budget serré | → Solutions éprouvées, moins de custom |
| Délai court | → Stack maîtrisée par l'équipe |
| Évolutivité forte | → Architecture modulaire |
| Performance critique | → SSR, CDN, optimisations |
| SEO prioritaire | → SSG ou WordPress |
| Multi-langue | → i18n natif ou WPML |

### 3. Critères Techniques

```
Score par critère (1-5) :

┌─────────────────────────────────────────────────┐
│ Critère              │ Poids │ Score │ Total   │
├─────────────────────────────────────────────────┤
│ Performance          │  x2   │  ?/5  │  ?/10   │
│ Maintenabilité       │  x2   │  ?/5  │  ?/10   │
│ Sécurité             │  x2   │  ?/5  │  ?/10   │
│ Coût de dev          │  x1   │  ?/5  │  ?/5    │
│ Coût de maintenance  │  x1   │  ?/5  │  ?/5    │
│ Compétences dispo    │  x1   │  ?/5  │  ?/5    │
│ Écosystème           │  x1   │  ?/5  │  ?/5    │
├─────────────────────────────────────────────────┤
│ TOTAL                │       │       │  ?/50   │
└─────────────────────────────────────────────────┘
```

## Processus de Décision

```
Brief client
    │
    ▼
┌─────────────────┐
│ Identifier le   │
│ type de projet  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Lister les      │
│ contraintes     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Présélectionner │
│ 2-3 options     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Évaluer selon   │
│ la grille       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Recommander     │
│ avec arguments  │
└─────────────────┘
```

## Sorties

### Document de Recommandation

```markdown
# Recommandation Stack Technique

## Projet : [Nom]

## Contexte
- Type : [Site vitrine / App / E-commerce / ...]
- Budget : [Fourchette]
- Délai : [Date cible]
- Contraintes : [Liste]

## Options Évaluées

### Option A : [Stack]
- Avantages : ...
- Inconvénients : ...
- Score : X/50

### Option B : [Stack]
- Avantages : ...
- Inconvénients : ...
- Score : X/50

## Recommandation

**Stack retenue : [Nom]**

Justification :
1. [Argument 1]
2. [Argument 2]
3. [Argument 3]

## Compétences Requises
- [Compétence 1]
- [Compétence 2]

## Risques Identifiés
- [Risque 1] → Mitigation
- [Risque 2] → Mitigation

## Prochaines Étapes
- [ ] Validation client
- [ ] Setup environnement → `web-dev-process/setup`
- [ ] Onboarding équipe
```

## Délégation aux Skills Techniques

Une fois la stack choisie :

| Stack | Skill à utiliser |
|-------|------------------|
| WordPress | `wordpress-gutenberg-expert` |
| React / Vue / Next.js | `web-dev-process` |
| Node.js / API | `web-dev-process` |
| Autre | `web-dev-process` (principes généraux) |

## Escalade Humaine

| Situation | Action |
|-----------|--------|
| Client impose une techno inadaptée | Argumenter, puis escalader si blocage |
| Aucune compétence interne sur la stack | Valider recrutement/formation |
| Stack legacy à maintenir | Évaluer coût vs refonte |
| Hésitation entre 2 options équivalentes | Décision direction technique |
