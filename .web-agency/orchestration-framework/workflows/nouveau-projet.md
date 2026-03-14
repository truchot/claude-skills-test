---
name: nouveau-projet
description: Workflow complet pour un nouveau projet client — vision double (process interne + expérience client)
---

# Workflow : Nouveau Projet Client

Ce workflow guide la composition des skills pour un nouveau projet de A à Z, en intégrant les **touchpoints client** à chaque phase.

## Vue d'Ensemble

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                        WORKFLOW NOUVEAU PROJET (DOUBLE VISION)                           │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                          │
│  Phase 1        Phase 2         Phase 3         Phase 4        Phase 5       Phase 6    │
│  ACCUEIL &      CO-CRÉATION     SETUP           DEV/TEST       DÉPLOIEMENT   LANCEMENT  │
│  CADRAGE                                                       & LIVRAISON   & SUIVI    │
│                                                                                          │
│  ┌─────────┐   ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐   ┌─────────┐│
│  │ Brief   │──►│ Specs   │───►│ Repo    │───►│ Code    │───►│ Recette │──►│ Bilan   ││
│  │ Devis   │   │ Archi   │    │ CI/CD   │    │ Tests   │    │ Deploy  │   │ J+30    ││
│  │ Contrat │   │ Design  │    │ Envs    │    │ Review  │    │ PV      │   │ Fidéli  ││
│  └─────────┘   └─────────┘    └─────────┘    └─────────┘    └─────────┘   └─────────┘│
│                                                                                          │
│  Process:       Process:        Process:        Process:       Process:      Process:    │
│  • proj-mgmt    • dir-tech      • web-dev       • dev skills   • proj-mgmt   • exp-cli  │
│  • dir-tech     • design-sys    • devops        • web-dev      • devops      • cust-suc  │
│  • exp-client   • exp-client    (interne)       • exp-client   • exp-client  • support   │
│                                                                                          │
│  Client vit:    Client vit:     Client vit:     Client vit:    Client vit:   Client vit:│
│  CONFIANCE      PARTICIPATION   (rien)          SÉRÉNITÉ       SÉCURITÉ      FIERTÉ     │
│  CLARTÉ                                                                      FIDÉLITÉ   │
│                                                                                          │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## Phase 1 : Accueil & Cadrage

**Objectif process** : Comprendre le besoin, estimer, proposer
**Objectif client** : Établir la CONFIANCE et la CLARTÉ

### Étapes Process

| # | Action | Skill | Agent | Output |
|---|--------|-------|-------|--------|
| 1 | Collecter le besoin | project-management | avant-projet/collecte-besoin | Extraction brute |
| 2 | Formaliser le brief | project-management | avant-projet/formalisation-brief | Brief structuré |
| 3 | Clarifier (si besoin) | project-management | avant-projet/questions-clarification | Questions client |
| 4 | Estimer commercialement | project-management | avant-projet/chiffrage | Estimation €/jours |
| 5 | Valider faisabilité | direction-technique | avant-projet/etude-faisabilite | Go/NoGo technique |
| 6 | Estimer techniquement | direction-technique | estimation/estimation-macro | Estimation j/h |
| 7 | Rédiger proposition | project-management | avant-projet/redaction-proposition | Proposition commerciale |

### Touchpoints Client (NOUVEAUX)

| # | Touchpoint | Skill | Agent | Ce que le client vit |
|---|------------|-------|-------|---------------------|
| A | Accusé réception personnalisé | experience-client | accueil/premier-contact | "Ils m'ont lu et compris" |
| B | Écoute active du besoin | experience-client | accueil/ecoute-active | "Ils s'intéressent à mon problème" |
| C | Synthèse du besoin en 1 page | experience-client | accueil/synthese-besoin | "Ils ont reformulé parfaitement" |
| D | Proposition en langage business | experience-client | cadrage/proposition-projet | "Je comprends ce que je vais avoir" |
| E | Mesure satisfaction post-cadrage | experience-client | mesure/nps-csat | "Mon avis compte" |

### Livrables Phase 1

- [ ] Brief client validé
- [ ] Estimation commerciale
- [ ] Estimation technique
- [ ] Proposition commerciale (en langage client, validée par zero-jargon)
- [ ] Contrat signé (hors skill)
- [ ] **Synthèse besoin envoyée au client** (NOUVEAU)
- [ ] **CSAT mesuré** (NOUVEAU)

### SLA Client

| Engagement | Délai |
|-----------|-------|
| Accusé réception | < 4h (heures ouvrées) |
| Retour personnalisé | < 24h |
| Proposition commerciale | < 1 semaine |

### Point d'Escalade

Si estimation > 50 j/h ou budget > 50k€ → Validation direction

---

## Phase 2 : Co-création

**Objectif process** : Définir l'architecture, le design, les specs
**Objectif client** : PARTICIPATION active, le client co-construit

### Étapes Process (séquentielles)

| # | Action | Skill | Agent | Output |
|---|--------|-------|-------|--------|
| 1 | Choisir la stack | direction-technique | avant-projet/selection-stack | ADR stack |
| 2 | Définir l'architecture | direction-technique | architecture/architecture-applicative | Schéma archi |
| 3 | Spécifier techniquement | direction-technique | specification/specification-technique | Specs techniques |

### Étapes Process (parallèles, après specs)

| Action | Skill | Agent | Output |
|--------|-------|-------|--------|
| Design tokens | design-system-foundations | foundations/* | theme.json / tokens |
| Contenus | content (si disponible) | - | Arborescence, textes |
| Maquettes | design (si disponible) | - | Figma |

### Touchpoints Client (NOUVEAUX)

| # | Touchpoint | Skill | Agent | Ce que le client vit |
|---|------------|-------|-------|---------------------|
| A | Walkthrough narratif des maquettes | experience-client | co-creation/walkthrough-narratif | "Je comprends l'expérience de mes utilisateurs" |
| B | Collecte structurée de feedback | experience-client | co-creation/collecte-feedback | "Mon avis est écouté et structuré" |
| C | Arbitrage guidé des choix | experience-client | co-creation/arbitrage-guide | "Je comprends les implications de mes choix" |
| D | Validation formelle | experience-client | co-creation/validation-formelle | "C'est clair ce que j'ai validé" |
| E | Mesure satisfaction post-co-création | experience-client | mesure/nps-csat | "On me demande si je suis satisfait" |

### Livrables Phase 2

- [ ] ADR choix de stack
- [ ] Architecture documentée
- [ ] Specs techniques
- [ ] Design tokens
- [ ] Maquettes (si applicable)
- [ ] **Maquettes commentées pour le client** (pas un lien Figma brut) (NOUVEAU)
- [ ] **PV de validation client** (NOUVEAU)
- [ ] **CSAT mesuré** (NOUVEAU)

### Règle d'Or

> Chaque validation client présente le "pourquoi" avant le "quoi". Pas "Voici la maquette de la page produit" mais "Vos clients arriveront sur cette page après avoir cherché un produit. Voici ce qu'ils verront et pourquoi."

---

## Phase 3 : Setup

**Objectif process** : Préparer l'environnement de développement
**Objectif client** : Phase INVISIBLE pour le client (pas de bruit inutile)

### Étapes

| # | Action | Skill | Agent | Output |
|---|--------|-------|-------|--------|
| 1 | Créer le repository | web-dev-process | setup/repository | Repo Git |
| 2 | Configurer Git | web-dev-process | setup/git-config | .gitignore, branches |
| 3 | Setup environnements | wordpress-* | tooling/local-dev | wp-env.json |
| 4 | Configurer CI/CD | web-dev-process | setup/cicd | GitHub Actions |
| 5 | Configurer qualité | web-dev-process | setup/quality-tools | ESLint, PHPCS |

### Touchpoint Client

| # | Touchpoint | Ce que le client vit |
|---|------------|---------------------|
| A | **Email de transition** : "Bonne nouvelle, la construction de votre projet démarre !" | "Ça y est, ça avance !" |

> Le client ne doit PAS être sollicité pendant le setup. Un simple email de transition suffit pour maintenir la confiance.

### Livrables Phase 3

- [ ] Repository créé et configuré
- [ ] Environnements local/staging/prod
- [ ] Pipeline CI/CD fonctionnel
- [ ] Outils qualité configurés
- [ ] **Email de transition envoyé au client** (NOUVEAU)

---

## Phase 4 : Développement & Tests

**Objectif process** : Implémenter et valider
**Objectif client** : SÉRÉNITÉ — le client sait que ça avance

### Boucle de Développement

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                  │
│    ┌────────┐     ┌────────┐     ┌────────┐     ┌────────┐    │
│    │  Code  │────►│  Test  │────►│ Review │────►│ Merge  │    │
│    └────────┘     └────────┘     └────────┘     └────────┘    │
│         │                              │                        │
│         └──────────────────────────────┘                        │
│                   (si refus)                                    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Skills par Activité

| Activité | Skill | Agents |
|----------|-------|--------|
| Développement WP | wordpress-* | wp-core/*, gutenberg-blocks/*, theme/* |
| Tests unitaires | wordpress-* | testing/php-unit-tests, testing/js-unit-tests |
| Tests e2e | wordpress-* | testing/e2e-tests |
| Code review | web-dev-process | development/code-review |

### Touchpoints Client (NOUVEAUX)

| # | Touchpoint | Fréquence | Skill | Agent |
|---|------------|-----------|-------|-------|
| A | Rapport d'avancement en 5 lignes | Hebdomadaire | experience-client | suivi/rapport-avancement |
| B | Démo intermédiaire | Toutes les 2 semaines | experience-client | suivi/demo-intermediaire |
| C | Alerte proactive si risque | Au besoin | experience-client | suivi/alerte-proactive |
| D | Dashboard client temps réel | Continu | experience-client | suivi/dashboard-client |
| E | Checkpoint satisfaction | Toutes les 2 semaines | experience-client | mesure/nps-csat |
| F | Accès environnement de test | Continu | devops | staging |

### Livrables Phase 4

- [ ] Code complet et fonctionnel
- [ ] Tests passants (couverture selon standards)
- [ ] Code reviews approuvées
- [ ] Déploiement staging
- [ ] **Rapports d'avancement hebdomadaires envoyés** (NOUVEAU)
- [ ] **Au moins 2 démos intermédiaires réalisées** (NOUVEAU)
- [ ] **CSAT mesuré toutes les 2 semaines** (NOUVEAU)

### Règle d'Or

> Le client ne doit JAMAIS apprendre un retard le jour de la deadline. Chaque risque est communiqué dès qu'il est identifié, avec une solution proposée.

---

## Phase 5 : Déploiement & Livraison

**Objectif process** : Recetter, déployer, clôturer
**Objectif client** : SÉCURITÉ — tout est sous contrôle

### Étapes Process

| # | Action | Skill | Agent | Output |
|---|--------|-------|-------|--------|
| 1 | Préparer recette | project-management | livraison/plan-recette | Plan de recette |
| 2 | Créer grille tests | project-management | livraison/grille-recette | Grille de recette |
| 3 | Suivre anomalies | project-management | livraison/suivi-anomalies | Suivi bugs |
| 4 | Déployer prod | web-dev-process | deployment/production | Site en production |
| 5 | Rédiger PV | project-management | livraison/pv-recette | PV signé |
| 6 | Facturer | project-management | facturation/* | Facture |

### Touchpoints Client (NOUVEAUX)

| # | Touchpoint | Skill | Agent | Ce que le client vit |
|---|------------|-------|-------|---------------------|
| A | Guide de mise en ligne | experience-client | suivi/guide-mise-en-ligne | "Je sais ce qui va se passer" |
| B | Accompagnement jour J | experience-client | (intervention humaine) | "Je ne suis pas seul" |
| C | Confirmation J+1 | experience-client | lancement/celebration | "Tout fonctionne !" |
| D | Mesure NPS post-livraison | experience-client | mesure/nps-csat | "Mon avis compte" |

### Livrables Phase 5

- [ ] Site en production
- [ ] PV de recette signé
- [ ] Documentation technique
- [ ] Facture envoyée
- [ ] **Guide de mise en ligne envoyé au client** (NOUVEAU)
- [ ] **Email de célébration envoyé** (NOUVEAU)
- [ ] **NPS post-livraison mesuré** (NOUVEAU)

### Anti-patterns

- Mettre en ligne un vendredi soir sans prévenir
- Parler de "blue-green deployment" ou de "rollback" au client
- Ne pas avoir de plan B visible par le client
- Envoyer la facture sans bilan

---

## Phase 6 : Lancement & Fidélisation (NOUVEAU)

**Objectif process** : Mesurer les résultats, accompagner, fidéliser
**Objectif client** : FIERTÉ puis FIDÉLITÉ — la relation continue

### Étapes

| # | Action | Skill | Agent | Output |
|---|--------|-------|-------|--------|
| 1 | Former le client | experience-client | lancement/formation-client | Sessions pratiques |
| 2 | Bilan J+30 | experience-client | lancement/bilan-lancement | Rapport J+30 |
| 3 | Transition vers support | support-client | - | Contrat support actif |
| 4 | Rapport mensuel | experience-client | fidelisation/rapport-mensuel | Rapport mensuel |
| 5 | Point trimestriel | experience-client | fidelisation/point-trimestriel | Bilan + roadmap |
| 6 | Bilan annuel | experience-client | fidelisation/bilan-partenariat | ROI + évolutions |

### Ce que le client reçoit

| Quand | Livrable | Contenu |
|-------|----------|---------|
| J+1 à J+5 | Formation | Sessions pratiques sur son outil |
| J+15 | Premier bilan | Premiers chiffres (visiteurs, performances) |
| J+30 | Bilan de lancement | ROI, métriques, recommandations |
| Mensuel | Rapport mensuel | Uptime, incidents, métriques business |
| Trimestriel | Point trimestriel | Bilan + roadmap d'évolutions |
| Annuel | Bilan de partenariat | ROI complet + proposition d'évolution |

### Livrables Phase 6

- [ ] Client formé sur son outil
- [ ] Bilan J+30 envoyé avec métriques
- [ ] Support opérationnel
- [ ] NPS mesuré à J+30

---

## Timeline Indicative

| Phase | Durée typique | Dépend de | Émotion client |
|-------|---------------|-----------|----------------|
| Accueil & Cadrage | 1-2 semaines | Réactivité client | Confiance + Clarté |
| Co-création | 1-3 semaines | Complexité | Participation |
| Setup | 1-2 jours | Stack connue ou non | (invisible) |
| Développement | Variable | Scope | Sérénité |
| Déploiement | 1 semaine | Bugs recette | Sécurité |
| Lancement & Suivi | Continu | Relation | Fierté + Fidélité |

---

## Checklist de Transition entre Phases

À chaque transition de phase, vérifier :

- [ ] Le client a été informé du passage à la phase suivante
- [ ] Un email de transition a été envoyé
- [ ] La satisfaction a été mesurée (CSAT 1 question)
- [ ] Le dashboard client est à jour
- [ ] Les engagements de la prochaine phase sont clairs

## Références

- [Composition des skills](../orchestration/composition.md)
- [Points d'escalade](../orchestration/escalation.md)
- [CLIENT-EXPERIENCE.md](../../CLIENT-EXPERIENCE.md)
- [experience-client/SKILL.md](../../skills/experience-client/SKILL.md)
