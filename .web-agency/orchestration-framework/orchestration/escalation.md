---
name: escalation
description: Points d'escalade vers supervision humaine
---

# Points d'Escalade Humaine

Ce document définit quand et comment escalader vers une supervision humaine.

## Philosophie

> Les skills exécutent, les humains supervisent et décident.

```
CLIENT ←→ HUMAIN (supervision) ←→ SKILLS (exécution)
```

## Matrice d'Escalade par Domaine

### Project Management

| Situation | Raison | Action |
|-----------|--------|--------|
| Brief incomplet après 2 relances | Décision commerciale | Alerter le commercial |
| Estimation hors fourchette | Risque financier | Valider avec la direction |
| Dépassement > 20% budget | Impact financier | Arbitrage nécessaire |
| Conflit ou tension client | Relationnel sensible | Intervention humaine |
| Demande hors périmètre | Avenant potentiel | Négociation commerciale |
| Retard > 1 semaine | Communication client | Chef de projet décide |
| Facture impayée > 60 jours | Recouvrement | Procédure à décider |

### Direction Technique

| Situation | Raison | Action |
|-----------|--------|--------|
| Choix de stack long terme | Décision stratégique | Validation direction technique |
| Architecture complexe/innovante | Risque technique | Review par tech lead |
| Estimation > 50 jours/homme | Engagement important | Validation chef de projet |
| Dette technique critique | Impact maintenance | Arbitrage avec PO/client |
| Faille de sécurité identifiée | Urgence | Escalade immédiate |
| Incident P1 en production | Criticité | War room |
| Données personnelles exposées | RGPD | DPO + légal |
| Migration majeure de stack | Impact équipe | Validation management |

### Web Dev Process

| Situation | Raison | Action |
|-----------|--------|--------|
| Tests échouent en boucle | Blocage technique | Pair programming |
| Code review bloquée | Désaccord technique | Arbitrage tech lead |
| Dépendance vulnérable critique | Sécurité | Décision immédiate |
| Rollback nécessaire | Impact production | Validation avant action |

### WordPress

| Situation | Raison | Action |
|-----------|--------|--------|
| Plugin tiers défaillant | Choix alternatif | Validation fonctionnelle |
| Mise à jour majeure WP | Risque régression | Planification |
| Performance dégradée | Impact utilisateurs | Investigation prioritaire |

### Design System

| Situation | Raison | Action |
|-----------|--------|--------|
| Breaking change | Impact multi-projets | Validation équipes |
| Nouveau pattern | Cohérence système | Review design |
| Accessibilité non-conforme | Légal | Correction prioritaire |

## Niveaux de Criticité

### P1 - Critique (Escalade immédiate)

```
┌─────────────────────────────────────────────────────────────────┐
│ ESCALADE IMMÉDIATE                                               │
├─────────────────────────────────────────────────────────────────┤
│ • Site en production DOWN                                        │
│ • Faille de sécurité exploitable                                │
│ • Données personnelles exposées                                  │
│ • Paiements impossibles                                          │
└─────────────────────────────────────────────────────────────────┘

Action : Interrompre, alerter, war room
```

### P2 - Haute (Escalade < 4h)

```
┌─────────────────────────────────────────────────────────────────┐
│ ESCALADE RAPIDE                                                  │
├─────────────────────────────────────────────────────────────────┤
│ • Fonctionnalité critique dégradée                              │
│ • Client VIP mécontent                                           │
│ • Deadline à risque                                              │
│ • Bug bloquant plusieurs utilisateurs                           │
└─────────────────────────────────────────────────────────────────┘

Action : Notifier responsable, prioriser
```

### P3 - Moyenne (Escalade < 24h)

```
┌─────────────────────────────────────────────────────────────────┐
│ ESCALADE NORMALE                                                 │
├─────────────────────────────────────────────────────────────────┤
│ • Dépassement budget modéré                                      │
│ • Retard non-critique                                            │
│ • Désaccord technique                                            │
│ • Changement de scope demandé                                    │
└─────────────────────────────────────────────────────────────────┘

Action : Ajouter au backlog prioritaire
```

### P4 - Basse (Escalade asynchrone)

```
┌─────────────────────────────────────────────────────────────────┐
│ ESCALADE DIFFÉRÉE                                                │
├─────────────────────────────────────────────────────────────────┤
│ • Amélioration suggérée                                          │
│ • Dette technique non-urgente                                    │
│ • Question stratégique long terme                               │
└─────────────────────────────────────────────────────────────────┘

Action : Documenter pour prochaine rétrospective
```

## Format d'Escalade

```markdown
## Escalade - [P1/P2/P3/P4]

**Contexte** : [Description de la situation]

**Impact** : [Qui/quoi est affecté]

**Options** :
1. [Option A] - Avantages / Inconvénients
2. [Option B] - Avantages / Inconvénients

**Recommandation** : [Option préférée et pourquoi]

**Décision requise avant** : [Date/heure]
```

## Règles d'Escalade

### À Faire

- Escalader AVANT que la situation empire
- Fournir le contexte complet
- Proposer des options (pas juste le problème)
- Indiquer l'urgence clairement
- Documenter la décision prise

### À Éviter

- Escalader sans données factuelles
- Escalader pour des décisions triviales
- Attendre le dernier moment
- Escalader au mauvais niveau hiérarchique
- Oublier de clôturer l'escalade

## Arbitrage Inter-Skills

### Le Problème

Deux skills de même niveau peuvent produire des recommandations contradictoires. Contrairement à l'escalade humaine (un problème remonte), l'arbitrage inter-skills résout un **conflit horizontal** entre métiers.

### Exemples de Conflits Courants

| Skill A | Recommande | Skill B | Recommande | Conflit |
|---------|------------|---------|------------|---------|
| `seo-expert` | Pages longues, riches en texte | `ux-ui-design` | Interface minimaliste, peu de texte | Contenu vs UX |
| `direction-technique` | Stack Next.js | `marketing-ops` | Plugin WordPress spécifique | Techno vs besoin métier |
| `legal-compliance` | Bandeau cookies intrusif | `customer-success` | Parcours fluide sans friction | Conformité vs expérience |
| `seo-expert` | URLs longues avec mots-clés | `ux-ui-design` | URLs courtes et lisibles | SEO vs lisibilité |
| `devops` | Infrastructure haute dispo (coûteuse) | `finance-analytics` | Réduire les coûts serveur | Fiabilité vs budget |
| `direction-technique` | Refactoring complet | `project-management` | Livrer la feature d'abord | Qualité vs délai |

### Règles de Priorité par Contexte

Quand deux skills s'opposent, appliquer cette hiérarchie de priorité :

```
┌─────────────────────────────────────────────────────────────┐
│  PRIORITÉ 1 : LÉGAL & SÉCURITÉ                             │
│  legal-compliance, security-expert                          │
│  → Conformité non-négociable (RGPD, accessibilité, OWASP)  │
│  → Pas d'arbitrage possible, on s'adapte autour            │
├─────────────────────────────────────────────────────────────┤
│  PRIORITÉ 2 : UTILISATEUR                                   │
│  ux-ui-design, customer-success, experience-client          │
│  → L'expérience utilisateur prime sur l'optimisation        │
│  → Un site beau mais inutilisable ne sert à personne       │
├─────────────────────────────────────────────────────────────┤
│  PRIORITÉ 3 : BUSINESS                                      │
│  direction-commerciale, project-management, finance         │
│  → Le technique sert le business, pas l'inverse            │
│  → ROI et objectifs métier guident les choix               │
├─────────────────────────────────────────────────────────────┤
│  PRIORITÉ 4 : TECHNIQUE                                     │
│  direction-technique, devops, lead-dev                      │
│  → Qualité technique importante mais au service du reste   │
│  → Compromis acceptable si le business l'exige             │
├─────────────────────────────────────────────────────────────┤
│  PRIORITÉ 5 : OPTIMISATION                                  │
│  seo-expert, paid-media, marketing-analytics                │
│  → Optimisation cède face à l'UX et au légal               │
│  → Chercher des solutions qui satisfont les deux parties   │
└─────────────────────────────────────────────────────────────┘
```

### Processus d'Arbitrage

```
Conflit détecté entre Skill A et Skill B
│
├─ Les deux skills sont dans la même priorité ?
│  └─ OUI → Escalade humaine (P3). Un humain tranche.
│
├─ Un skill a une priorité supérieure ?
│  └─ OUI → Le skill prioritaire l'emporte.
│         Le skill de moindre priorité doit ADAPTER
│         sa recommandation (pas l'abandonner).
│
└─ Le conflit est mitigeable ?
   ├─ OUI → Trouver un compromis technique.
   │        Documenter dans un `arbitrage-decision`.
   └─ NON → Escalade humaine (P2). Décision requise.
```

### Livrable : Arbitrage Decision

Chaque arbitrage doit être tracé :

```markdown
## Arbitrage - [Titre court]

**Date** : [Date]
**Skills en conflit** : [Skill A] vs [Skill B]

**Position Skill A** : [Ce que Skill A recommande et pourquoi]
**Position Skill B** : [Ce que Skill B recommande et pourquoi]

**Règle de priorité appliquée** : [Priorité X > Priorité Y]

**Décision** : [Ce qui a été décidé]
**Compromis** : [Comment le skill de moindre priorité a été accommodé]

**Impact** : [Conséquences de la décision]
**Décideur** : [Humain qui a validé, ou "automatique" si règle de priorité claire]
```

### Exemples d'Arbitrages Résolus

#### SEO vs UX : Pages longues vs interface minimaliste

- **Règle** : UTILISATEUR (P2) > OPTIMISATION (P5)
- **Décision** : Interface minimaliste avec contenu SEO en accordion/tabs
- **Compromis** : Le contenu SEO est présent mais ne dégrade pas l'UX. Sections dépliables, FAQ structurée, contenu progressif.

#### Legal vs UX : Bandeau cookies intrusif vs parcours fluide

- **Règle** : LÉGAL (P1) > UTILISATEUR (P2)
- **Décision** : Le bandeau cookies est obligatoire
- **Compromis** : `ux-ui-design` conçoit un bandeau élégant, non-intrusif visuellement, qui respecte le RGPD tout en minimisant la friction. Pas de dark patterns.

#### Tech vs Business : Refactoring vs livraison feature

- **Règle** : BUSINESS (P3) > TECHNIQUE (P4)
- **Décision** : La feature est livrée d'abord
- **Compromis** : `direction-technique` obtient un sprint de refactoring planifié dans les 4 semaines suivantes. La dette technique est documentée et échéancée, pas ignorée.

## Références

- [Règles de routage](./routing.md)
- [Composition des skills](./composition.md)
