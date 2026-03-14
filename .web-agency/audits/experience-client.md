---
date: 2026-03-14
type: audit
---

# Audit Complet : Expérience Client Web Agency

> **Date** : 2026-03-14
> **Objectif** : Proposer la meilleure expérience client possible
> **Périmètre** : Ensemble du framework `.web-agency/`, focus sur les skills client-facing
> **Score Global** : **7.8 / 10** — Framework solide avec des gaps stratégiques à combler

---

## Synthèse Exécutive

Le framework web-agency a considérablement progressé depuis l'audit du 2026-03-13. L'ajout du skill `experience-client` (34 agents + 5 validators) constitue une avancée majeure. Le parcours émotionnel client en 8 phases est bien pensé et les validators (zero-jargon, ton-et-empathie, etc.) sont un dispositif unique et puissant.

**Cependant**, 5 problèmes critiques empêchent encore d'offrir la meilleure expérience client possible.

---

## Forces Majeures

| Force | Score | Détail |
|-------|-------|--------|
| **Parcours émotionnel 8 phases** | 9/10 | CLIENT-EXPERIENCE.md est un document de référence exceptionnel |
| **Validators qualité** | 9/10 | 5 validators (zero-jargon, ton, complétude, SLA, cohérence émotionnelle) garantissent la qualité |
| **Agents accueil** | 8.5/10 | `premier-contact`, `ecoute-active`, `synthese-besoin` sont excellents avec templates concrets |
| **Rapport d'avancement** | 9/10 | Template 5 lignes + traduction jargon → client exemplaire |
| **Workflow email-to-devis** | 8.5/10 | Processus bout-en-bout automatisé, < 24h, bien documenté |
| **Routing intention-first** | 8/10 | Remplacement des mots-clés par intention+contexte+urgence |
| **Glossaire bilingue** | 8/10 | Guide par profil (CDP, designer, dev) très utile |
| **Seuils de complexité** | 8/10 | MICRO/PETIT/MOYEN/GRAND évitent le sur-process |

---

## Les 5 Gaps Critiques pour l'Expérience Client

### GAP 1 : Absence de commande `/client` unifiée

**Problème** : Les 4 commandes Claude existantes (`/tech`, `/design`, `/marketing`, `/project`) sont organisées par métier interne, pas par le parcours client. Un utilisateur qui veut communiquer avec son client doit savoir quel skill utiliser.

**Impact client** : Le client subit les silos internes de l'agence. La communication n'a pas de point d'entrée unique.

**Exemples concrets** :
- "Je dois répondre à un client" → `/project` ou `/marketing` ou `/tech` ?
- "Préparer la proposition pour le client" → `/project` ? Mais les aspects design sont dans `/design`
- "Le client veut un point sur l'avancement" → `/project` qui route vers `experience-client`

**Recommandation** : Créer une commande `/client` qui route directement vers `experience-client` et unifie toute interaction client.

**Priorité** : **P1 — CRITIQUE**

---

### GAP 2 : Déconnexion entre `experience-client` et `client-intake`

**Problème** : `client-intake` (28 agents) et `experience-client` (34 agents) couvrent des phases qui se chevauchent :
- `client-intake` a un domaine `reception/` et `qualification/`
- `experience-client` a un domaine `accueil/` avec `premier-contact`, `ecoute-active`, `qualification-rapide`

Le client passe de `client-intake` à `experience-client` sans transition définie.

**Impact client** : Risque de double traitement, incohérence de ton entre les deux skills, perte d'informations lors de la transition.

**Recommandation** :
1. Définir le point de handoff précis : `client-intake` qualifie techniquement, `experience-client/accueil` gère la relation
2. Ajouter un agent `transition-intake-experience` qui garantit la continuité
3. Documenter la matrice de responsabilité entre les deux skills

**Priorité** : **P1 — CRITIQUE**

---

### GAP 3 : Pas de dashboard client temps réel

**Problème** : Le `rapport-avancement` est un livrable ponctuel (hebdomadaire). Le CLIENT-EXPERIENCE.md promet une "visibilité permanente" (engagement #4), mais aucun mécanisme de dashboard en temps réel n'existe.

**Impact client** : Entre deux rapports hebdomadaires, le client vit une "boîte noire". Il ne peut pas voir l'avancement quand il veut, ce qui contredit l'engagement de transparence.

**Recommandation** :
1. Créer un agent `suivi/dashboard-client` qui génère une vue temps réel
2. Intégrer avec le `state-manager` existant pour alimenter le dashboard automatiquement
3. Définir les métriques visibles par le client (progression par lot fonctionnel, pas par ticket technique)

**Priorité** : **P2 — HAUTE**

---

### GAP 4 : Mesure de satisfaction absente du parcours actif

**Problème** : L'agent `suivi/checkpoint-satisfaction` existe mais n'est pas intégré dans le workflow principal de `experience-client`. Il n'y a pas de déclencheur automatique.

Le CLIENT-EXPERIENCE.md mentionne une `enquete-satisfaction` dans les livrables à créer, mais elle n'existe pas encore.

**Impact client** : La satisfaction est mesurée en fin de projet (si elle l'est), alors qu'elle devrait être mesurée en continu pour détecter les insatisfactions avant qu'elles ne deviennent des problèmes.

**Recommandation** :
1. Intégrer des micro-checkpoints de satisfaction à chaque transition de phase
2. Créer l'agent `mesure/nps-automatique` avec une enquête en 2 questions max
3. Ajouter un système d'alerte quand le score de satisfaction baisse

**Priorité** : **P2 — HAUTE**

---

### GAP 5 : Workflow "nouveau-projet" ignorant l'expérience client

**Problème** : Le workflow `nouveau-projet.md` dans `orchestration-framework/workflows/` décrit 5 phases purement techniques (Avant-projet → Conception → Setup → Dev/Test → Livraison). Aucune mention de :
- Communication client proactive
- Points de validation client
- Checkpoints de satisfaction
- Transition vers `experience-client`
- Phase post-livraison (lancement, accompagnement, croissance)

**Impact client** : Le workflow opérationnel ne reflète pas la vision CLIENT-EXPERIENCE.md. Les équipes suivent le workflow technique et oublient l'expérience client.

**Recommandation** : Réécrire le workflow nouveau-projet pour intégrer les touchpoints client à chaque phase.

**Priorité** : **P1 — CRITIQUE**

---

## Analyse par Phase Client

| Phase | Score | Agents Existants | Gap Principal |
|-------|-------|------------------|---------------|
| 1. Accueil | 8.5/10 | `premier-contact`, `ecoute-active`, `qualification-rapide`, `synthese-besoin` | Chevauchement avec `client-intake` |
| 2. Cadrage | 8/10 | `proposition-projet`, `traducteur-technique`, `options-budget`, `planning-client` | Pas de template de devis formaté |
| 3. Co-création | 7.5/10 | `walkthrough-narratif`, `collecte-feedback`, `arbitrage-guide`, `validation-formelle` | Manque un processus de prototype interactif |
| 4. Réalisation | 8/10 | `rapport-avancement`, `demo-intermediaire`, `alerte-proactive`, `checkpoint-satisfaction` | Dashboard temps réel manquant |
| 5. Déploiement | 7/10 | `guide-mise-en-ligne` | Un seul agent, manque checklist client et plan B visible |
| 6. Lancement | 7.5/10 | `formation-client`, `bilan-lancement`, `celebration` | Pas de métriques business automatiques |
| 7. Accompagnement | 8/10 | `rapport-mensuel`, `point-trimestriel` | Bien couvert via `fidelisation` |
| 8. Croissance | 7/10 | `bilan-partenariat`, `veille-opportunites` | Pas de scoring de satisfaction client intégré |

---

## Analyse de Cohérence Inter-Skills

### Skills Client-Facing : Couverture

| Skill | Agents | Phase Client | Qualité | Commentaire |
|-------|--------|-------------|---------|-------------|
| `client-intake` | 28 | Phase 1 | 8/10 | Très complet, chevauchement avec experience-client |
| `experience-client` | 34 | Phases 1-8 | 8.5/10 | Cœur du dispositif, bien structuré |
| `customer-success` | 26 | Phases 7-8 | 7.5/10 | Bon mais peu connecté à experience-client |
| `support-client` | 16 | Phase 7 | 7/10 | Fonctionnel mais process-oriented, pas client-oriented |
| `commercial-crm` | 18 | Phases 1-2, 8 | 7/10 | Pipeline commercial, mais pas de vision relationnelle |
| `project-management` | 30 | Phases 2-5 | 8/10 | Solide, mais communication client déléguée |
| `direction-commerciale` | 28 | Stratégie | 7/10 | Vision business, peu de touchpoints client directs |

### Problèmes de Cohérence

1. **Orchestrateur `experience-client` vs `client-intake`** : Les deux ont un arbre de décision pour le premier contact. Qui prime ?
2. **`customer-success` vs `experience-client/fidelisation`** : Duplication potentielle sur la fidélisation
3. **`support-client` vs `experience-client/suivi`** : Confusion sur qui gère la communication post-livraison
4. **Commandes Claude** : Aucune des 4 commandes ne pointe directement vers `experience-client`

---

## Plan d'Actions Prioritaires

### Sprint 1 : Fondations Client (semaine 1)

| # | Action | Impact | Effort |
|---|--------|--------|--------|
| 1.1 | **Créer la commande `/client`** | Point d'entrée unifié pour toute interaction client | Faible |
| 1.2 | **Définir le handoff `client-intake` → `experience-client`** | Élimine la confusion d'entrée | Faible |
| 1.3 | **Enrichir le workflow nouveau-projet** avec les touchpoints client | Aligne l'opérationnel sur la vision | Moyen |

### Sprint 2 : Mesure et Visibilité (semaine 2)

| # | Action | Impact | Effort |
|---|--------|--------|--------|
| 2.1 | **Créer l'agent `suivi/dashboard-client`** | Visibilité permanente promise | Moyen |
| 2.2 | **Créer l'agent `mesure/nps-csat`** | Satisfaction mesurée en continu | Moyen |
| 2.3 | **Enrichir la phase Déploiement** (agents checklist-client, plan-b-visible) | Phase actuellement sous-couverte | Moyen |

### Sprint 3 : Cohérence et Consolidation (semaine 3)

| # | Action | Impact | Effort |
|---|--------|--------|--------|
| 3.1 | **Clarifier les responsabilités** `customer-success` vs `experience-client/fidelisation` | Élimine les doublons | Faible |
| 3.2 | **Ajouter des métriques business** au `bilan-lancement` | Le client voit la valeur de son investissement | Moyen |
| 3.3 | **Intégrer les validators** dans les autres skills client-facing | Qualité uniforme partout | Moyen |

---

## Recommandations d'Excellence

### 1. Le "Client Score" — Indicateur Composite

Créer un score de santé de la relation client basé sur :

```
Client Score = (Réactivité × 0.25) + (Satisfaction × 0.30) + (Engagement × 0.20) + (Transparence × 0.25)

Réactivité : % de réponses dans les SLA (24h, 4h urgences)
Satisfaction : Score CSAT/NPS des checkpoints
Engagement : Taux de participation aux validations/feedbacks
Transparence : Rapports hebdo envoyés à temps, alertes proactives
```

### 2. Le Parcours Client Anti-Friction

Chaque transition de phase doit inclure :
1. Un **email de transition** ("Nous passons à la phase suivante, voici ce qui change")
2. Une **question de satisfaction** (1 question, pas un formulaire)
3. Un **rappel des engagements** pour la nouvelle phase

### 3. Le "Client First" Protocol

Avant toute décision technique, poser 3 questions :
1. **Impact client visible ?** → Si oui, communiquer avant d'agir
2. **Retard potentiel ?** → Si oui, alerter dans les 4h
3. **Jargon dans la communication ?** → Si oui, repasser par le validator zero-jargon

---

## Conclusion

Le framework a les fondations pour offrir une expérience client exceptionnelle. Le skill `experience-client` avec ses 34 agents et 5 validators est un dispositif unique et puissant. Le parcours émotionnel en 8 phases (CONFIANCE → CLARTÉ → PARTICIPATION → SÉRÉNITÉ → SÉCURITÉ → FIERTÉ → SOUTIEN → FIDÉLITÉ) est remarquable.

Les 3 actions qui auront le plus d'impact immédiat :

1. **La commande `/client`** — Un point d'entrée unique change tout
2. **Le workflow nouveau-projet enrichi** — Aligner l'opérationnel sur la vision
3. **Le dashboard client** — Tenir la promesse de visibilité permanente

> Le meilleur framework d'agence web n'est pas celui qui a le plus d'agents. C'est celui où le client ne voit jamais la complexité interne, mais ressent constamment la qualité de l'attention qu'on lui porte.
