# Audit Critique du Framework Web Agency

> **Date** : 2026-03-13
> **Objectif** : Analyse en profondeur des process, identification des failles, et proposition d'un langage commun inter-métiers.

---

## Sommaire

1. [Synthèse Exécutive](#synthèse-exécutive)
2. [Forces Identifiées](#forces-identifiées)
3. [Failles Structurelles](#failles-structurelles)
4. [Incohérences Terminologiques](#incohérences-terminologiques)
5. [Angles Morts Processuels](#angles-morts-processuels)
6. [Proposition : Glossaire Commun Inter-Métiers](#proposition--glossaire-commun-inter-métiers)
7. [Proposition : Matrice RACI Unifiée](#proposition--matrice-raci-unifiée)
8. [Plan d'Actions Prioritaires](#plan-dactions-prioritaires)

---

## Synthèse Exécutive

Le framework `.web-agency/` est une base solide : 60+ livrables standardisés, un système de learning loop, une orchestration multi-agents à 3 niveaux et des ADR bien documentés. Cependant, l'analyse révèle **7 problèmes structurels majeurs** qui, s'ils ne sont pas corrigés, créeront de la friction entre métiers, des zones grises de responsabilité, et un risque de framework "documentation-only" déconnecté de la réalité opérationnelle.

**Verdict** : Framework ambitieux et bien architecturé, mais qui souffre d'un **biais technique fort**, d'un **mélange linguistique FR/EN dommageable**, et de **processus client/business sous-documentés** par rapport aux processus dev.

---

## Forces Identifiées

Avant la critique, reconnaissons ce qui fonctionne bien :

| Force | Détail |
|-------|--------|
| **Architecture 3 niveaux** | La séparation POURQUOI/QUOI/COMMENT est un excellent principe directeur |
| **Learning Loop** | Le système patterns/anti-patterns avec critères de promotion est mature |
| **Livrables standardisés** | 60+ templates avec frontmatter YAML validable en CI |
| **Escalade documentée** | 4 niveaux de criticité (P1-P4) avec actions claires |
| **ADR** | Les décisions architecturales sont tracées et justifiées |
| **Exemples concrets** | 4 scénarios réels qui rendent le framework tangible |

---

## Failles Structurelles

### 1. Déséquilibre massif entre domaines

**Constat** : Le framework est hyper-détaillé côté technique/dev et lacunaire côté business/créatif.

| Domaine | Agents | Livrables définis | Couverture |
|---------|--------|-------------------|------------|
| wordpress-gutenberg | 41 | 169 | 100% |
| backend-developer | 32 | 71 | 100% |
| web-dev-process | 61 | 172 | 94% |
| direction-technique | 52 | 165 | 93% |
| **marketing** | **115** | **279** | **68%** |
| **client-intake** | **23** | **-** | **Non analysé** |
| **direction-commerciale** | **-** | **-** | **Non analysé** |
| **direction-artistique** | **25** | **-** | **Non analysé** |
| **ux-ui-design** | **22** | **-** | **Non analysé** |
| **finance-analytics** | **17** | **-** | **Non analysé** |

**Problème** : Un designer, un commercial ou un chef de projet ne se retrouvera pas dans ce framework. Il verra un système pensé par et pour des développeurs.

**Recommandation** :
- Analyser et documenter les livrables des skills "À analyser" en priorité absolue
- Commencer par `client-intake` et `direction-commerciale` qui sont le point d'entrée de tout projet
- Impliquer les métiers non-tech dans la définition de leurs propres livrables

---

### 2. Hiérarchie des niveaux incohérente selon les documents

**Constat** : Les niveaux attribués aux skills changent d'un document à l'autre.

| Skill | README.md | MAPPING.md | dependency-graph.md | composition.md |
|-------|-----------|------------|---------------------|----------------|
| direction-technique | Niveau 1 | Niveau 2 | Niveau 1 | Niveau 1 |
| project-management | Niveau 2 | Niveau 3 | SÉPARÉ | TRANSVERSE |
| lead-dev | Niveau 2 | Niveau 3 | Niveau 2 | Niveau 2 |
| client-intake | Niveau 2 | Niveau 0 | Non mentionné | Non mentionné |
| frontend-developer | Niveau 3 | Niveau 4 | Niveau 3 | Niveau 3 |

**Problème** : Un nouvel arrivant ne sait pas quelle source fait foi. La numérotation des niveaux elle-même change (3 niveaux dans certains docs, 5 dans d'autres).

**Recommandation** :
- Fixer UNE SEULE source de vérité pour la hiérarchie (le README.md racine)
- Éliminer les niveaux numériques au profit de labels sémantiques constants : `STRATÉGIE`, `PROCESSUS`, `IMPLÉMENTATION`, `TRANSVERSE`
- Ajouter un script de validation qui vérifie la cohérence des niveaux entre tous les documents

---

### 3. Le cycle de vie projet ignore le client après la livraison

**Constat** : `PROJECT-LIFECYCLE.md` définit 7 phases mais la Phase 7 (Maintenance) est la plus pauvre, et il n'y a **aucune phase de suivi de satisfaction, d'upsell, ou de réengagement**.

```
Phase 7 actuelle (5 livrables seulement) :
- incident-runbook
- support-ticket
- post-mortem
- changelog
- tech-debt-report
```

**Ce qui manque** :
- Bilan projet (ROI, objectifs atteints vs promis)
- Enquête satisfaction client
- Proposition d'évolutions / next steps
- Rapport de performance post-lancement (SEO, conversion, vitesse)
- Processus de renouvellement de contrat

**Problème** : Le framework traite le client comme un "input" en phase 1 et un "destinataire" en phase 7. Il n'y a pas de vision relationnelle continue.

**Recommandation** :
- Ajouter une **Phase 8 : CAPITALISATION** (bilan, satisfaction, upsell)
- Documenter le process de hand-off au `customer-success`
- Créer des livrables : `project-retrospective`, `client-satisfaction-survey`, `evolution-proposal`

---

### 4. L'orchestration est trop rigide pour les petits projets

**Constat** : Le framework impose systématiquement la hiérarchie POURQUOI → QUOI → COMMENT.

Dans `composition.md` :
```
❌ MAUVAIS : Aller directement en implémentation
   "Crée un composant Button" → react-expert

✅ BON : Respecter les niveaux
   direction-technique (si nouveau) → web-dev-process → react-expert
```

**Problème** : Pour un fix CSS ou l'ajout d'un champ dans un formulaire, mobiliser `direction-technique` est du sur-process. L'over-engineering processuel est un anti-pattern autant que l'over-engineering technique.

**Recommandation** :
- Définir des **seuils de complexité** qui déclenchent les différents niveaux :
  - **Micro** (< 2h) : Niveau 3 seul, pas d'orchestration
  - **Petit** (< 2j) : Niveau 2 + 3
  - **Moyen** (2-15j) : Niveaux 1 + 2 + 3
  - **Grand** (> 15j) : Processus complet avec toutes les phases
- Documenter ces seuils dans `routing.md`

---

### 5. Aucune gestion des conflits inter-skills

**Constat** : `escalation.md` couvre bien l'escalade vers les humains, mais ne traite pas du cas où **deux skills produisent des recommandations contradictoires**.

**Exemples concrets** :
- `seo-expert` recommande des pages longues avec beaucoup de texte, `ux-ui-design` recommande une interface minimaliste
- `direction-technique` choisit Next.js, mais `marketing-ops` a besoin d'un plugin WordPress spécifique
- `legal-compliance` exige un bandeau cookies intrusif, `customer-success` dit que ça dégrade l'expérience

**Problème** : Le framework n'a aucun mécanisme d'arbitrage entre métiers de même niveau.

**Recommandation** :
- Ajouter une section "Arbitrage inter-skills" dans `escalation.md`
- Définir des règles de priorité par contexte :
  - **Légal > tout** (conformité non-négociable)
  - **Business > technique** (le technique sert le business)
  - **Utilisateur > SEO** (l'UX prime sur l'optimisation)
- Créer un livrable `arbitrage-decision` pour tracer ces résolutions

---

### 6. Le routing par mots-clés est fragile

**Constat** : `routing.md` repose sur un matching par mots-clés dans les requêtes utilisateur. La matrice de désambiguïsation liste 12 mots-clés ambigus avec des règles complexes.

**Problème** :
- "Je veux améliorer mon site" → Aucun mot-clé matchable
- "Le site rame" → "performance" match 5 skills différents
- Les requêtes en langage naturel du client ne correspondent jamais aux mots-clés techniques

**Recommandation** :
- Remplacer l'approche "mots-clés" par une approche **"intention + contexte"** :
  ```
  1. Identifier l'INTENTION (créer, corriger, optimiser, analyser, documenter)
  2. Identifier le DOMAINE (frontend, backend, design, marketing, business)
  3. Identifier l'URGENCE (bloquant, important, normal, nice-to-have)
  4. Router vers le skill approprié
  ```
- Ajouter des exemples de requêtes en langage "client" (non technique) dans la matrice

---

### 7. Les scripts de validation référencés n'existent pas

**Constat** : `SCHEMA.md` référence des scripts :
```bash
./.web-agency/scripts/validate-all.sh
./.web-agency/scripts/validate-frontmatter.sh
./.web-agency/scripts/validate-crossrefs.sh
```

Or le dossier `scripts/` à la racine de `.web-agency/` n'existe pas. Seul `learnings/scripts/collect-learning-metrics.js` existe.

**Problème** : Documentation trompeuse. Un contributeur qui suit les instructions sera bloqué.

**Recommandation** :
- Créer les scripts référencés ou supprimer les références
- Centraliser la validation dans un `package.json` racine (pas seulement dans `learnings/`)
- Ajouter une CI GitHub Actions qui valide automatiquement le framework entier

---

## Incohérences Terminologiques

C'est l'un des problèmes les plus critiques pour la collaboration inter-métiers.

### Mélange FR/EN systématique

| Contexte | Terme utilisé | Alternative trouvée ailleurs | Problème |
|----------|--------------|------------------------------|----------|
| Phases | `intake`, `strategy`, `realisation` | `réception`, `stratégie`, `développement` | Même concept, noms différents |
| Documents | `deliverables`, `livrables` | Les deux sont utilisés | Français ou anglais ? |
| Rôles | `lead-dev`, `direction-technique` | Un en EN, l'autre en FR | Incohérence de convention |
| Statuts | `active`, `draft`, `deprecated` | Toujours en EN | OK mais pas explicite pour non-anglophones |
| Process | `routing`, `escalation`, `composition` | Pas traduits | Inaccessible aux profils non-tech |
| Catégories | `code`, `design`, `process`, `report`, `strategy` | En EN dans le schema | Mais `commercial`, `finance` sont FR-compatibles |

**Impact** : Un chef de projet ou un commercial devra constamment traduire mentalement. Un designer ne comprendra pas "routing" ou "escalation".

### Termes synonymes non harmonisés

| Concept | Terme 1 | Terme 2 | Terme 3 |
|---------|---------|---------|---------|
| Estimation | `macro-estimation` | `chiffrage` | `budget-estimation-initial` |
| Cahier des charges | `requirements-list` | `brief` | `project-qualification` |
| Recette | `livraison/pv-recette` | `acceptance-criteria` | `test client` |
| Maquette | `wireframe` | `mockup` | `ui-mockups` |
| Brique logicielle | `skill` | `agent` | `domaine` |

---

## Angles Morts Processuels

### Ce qui manque dans le framework

| Processus manquant | Impact | Priorité |
|-------------------|--------|----------|
| **Processus commercial complet** (prospection → signature) | Pas de pipeline de vente documenté | CRITIQUE |
| **Processus de staffing** (affecter les bonnes personnes aux projets) | Skills = agents IA, pas de mapping humain | HAUTE |
| **Processus de feedback client continu** (pas juste en fin de projet) | Aucun checkpoint satisfaction en cours de route | HAUTE |
| **Processus de pricing dynamique** | Le `pricing.example.yaml` est statique, pas de logique d'ajustement | MOYENNE |
| **Processus de veille techno/marché** | Comment le framework se met-il à jour ? | MOYENNE |
| **Processus d'onboarding d'un nouveau membre** (humain) | Le framework documente l'onboarding technique, pas humain | MOYENNE |
| **Processus de gestion de la sous-traitance** | Aucune mention de freelances ou partenaires externes | BASSE |
| **Processus de gestion du changement** (scope creep) | Mentionné dans escalation mais pas formalisé | HAUTE |

### Livrables critiques absents

| Livrable | Pourquoi c'est critique |
|----------|----------------------|
| `devis-detaille` | Le commercial n'a pas de template structuré |
| `contrat-prestation` | Aucun modèle contractuel |
| `pv-reunion` | Mentionné dans routing mais sans livrable |
| `rapport-avancement` | Pas de template de reporting client |
| `grille-tarifaire` | Le `pricing.example.yaml` n'est pas un livrable exploitable |
| `benchmark-concurrentiel` | Mentionné dans routing mais absent des livrables |
| `cahier-de-recette` | Critique pour la phase de livraison |
| `bilan-projet` | Aucun template de REX/post-mortem business |

---

## Proposition : Glossaire Commun Inter-Métiers

Pour que dev, design, marketing, commercial et direction parlent le même langage, voici un glossaire normalisé.

### Principes du glossaire

1. **Un concept = Un terme** (pas de synonymes)
2. **Français par défaut**, anglais uniquement si le terme français n'existe pas ou est ambigu
3. **Chaque terme a une définition de 1 phrase**, compréhensible par tous les métiers

### Le Glossaire

#### A. Cycle de vie

| Terme normalisé | Définition | Remplace |
|-----------------|------------|----------|
| **Phase d'accueil** | Réception et qualification d'une demande client | intake, réception |
| **Phase de cadrage** | Définition de la stratégie, du périmètre et du budget | strategy, stratégie, avant-projet |
| **Phase de conception** | Création des spécifications et des maquettes | conception, design phase |
| **Phase de réalisation** | Développement et tests du produit | réalisation, développement, build |
| **Phase de déploiement** | Mise en ligne et configuration de l'infrastructure | déploiement, mise en production, go-live |
| **Phase de lancement** | Activation marketing et suivi post-mise en ligne | lancement, go-to-market |
| **Phase de maintenance** | Support continu et évolutions | maintenance, run, MCO |
| **Phase de bilan** | Rétrospective, mesure des résultats, propositions d'évolution | (nouveau) |

#### B. Acteurs et rôles

| Terme normalisé | Définition | Remplace |
|-----------------|------------|----------|
| **Responsable stratégique** | Définit le POURQUOI (objectifs, contraintes, standards) | direction-technique, direction-* |
| **Coordinateur** | Définit le QUOI et coordonne le QUI | lead-dev, chef de projet, PM |
| **Spécialiste** | Exécute le COMMENT (code, design, contenu) | developer, designer, expert |
| **Référent métier** | Expert d'un domaine transverse (SEO, légal, sécurité) | expert, consultant |
| **Client** | Le commanditaire du projet | stakeholder, donneur d'ordre |

#### C. Livrables

| Terme normalisé | Définition | Remplace |
|-----------------|------------|----------|
| **Brief** | Document synthétique décrivant le besoin client | brief, cahier des charges, requirements |
| **Cadrage** | Document de périmètre, budget et planning | qualification, scoping, estimation |
| **Spécification** | Description détaillée de ce qui doit être construit | spec, specification, technical-specification |
| **Maquette** | Représentation visuelle d'une interface | wireframe, mockup, ui-mockup, prototype |
| **Estimation** | Évaluation du temps et du coût d'un travail | chiffrage, macro-estimation, budget-estimation |
| **Proposition** | Document commercial envoyé au client | devis, commercial-proposal, offre |
| **Recette** | Processus de validation par le client avant livraison | acceptance, PV recette, validation |
| **Bilan** | Analyse post-projet des résultats vs objectifs | post-mortem, retrospective, REX |

#### D. Process

| Terme normalisé | Définition | Remplace |
|-----------------|------------|----------|
| **Routage** | Orientation d'une demande vers le bon interlocuteur | routing, dispatch, triage |
| **Escalade** | Remontée d'un problème à un niveau de décision supérieur | escalation, alerte |
| **Arbitrage** | Décision prise pour trancher entre options contradictoires | (nouveau) |
| **Point de contrôle** | Moment où un humain doit valider avant de continuer | checkpoint, gate, milestone |
| **Transition** | Passage d'un livrable d'un métier à un autre | handoff, passation, handover |

#### E. Qualité

| Terme normalisé | Définition | Remplace |
|-----------------|------------|----------|
| **Revue** | Examen critique d'un livrable par un pair ou un supérieur | review, code review, relecture |
| **Audit** | Analyse complète d'un système selon des critères définis | audit, assessment, diagnostic |
| **Test** | Vérification automatisée ou manuelle d'un comportement | test, QA, vérification |
| **Critères d'acceptation** | Liste de conditions pour qu'un livrable soit considéré comme terminé | acceptance criteria, DoD, definition of done |

---

## Proposition : Matrice RACI Unifiée

La matrice actuelle dans `routing.md` ne couvre que le technique. Voici une version élargie.

### Par phase de projet

| Phase | Responsable | Approbateur | Consulté | Informé |
|-------|-------------|-------------|----------|---------|
| Accueil | Commercial | Direction | Spécialiste technique | Chef de projet |
| Cadrage | Chef de projet | Direction + Client | Technique + Design + Marketing | Équipe dev |
| Conception | Technique + Design | Client | Marketing, SEO | Commercial |
| Réalisation | Lead dev | Technique | Design, QA | Chef de projet, Client |
| Déploiement | DevOps | Lead dev + Technique | Sécurité | Chef de projet, Client |
| Lancement | Marketing | Direction + Client | Technique, Support | Commercial |
| Maintenance | Support | Technique | Lead dev | Client, Commercial |
| Bilan | Chef de projet | Direction + Client | Tous les métiers | Commercial |

### Par type de décision

| Décision | Qui décide | Qui est consulté | Qui est informé |
|----------|-----------|-----------------|-----------------|
| Budget / prix | Direction commerciale | Chef de projet, Technique | Client |
| Stack technique | Direction technique | Lead dev, DevOps | Chef de projet |
| Design / UX | Direction artistique | Client, Marketing | Technique |
| Stratégie marketing | Direction marketing | Commercial, SEO | Technique |
| Conformité légale | Juridique | Technique, Marketing | Direction |
| Priorité des features | Chef de projet | Client, Technique | Équipe |
| Architecture | Direction technique | Lead dev | Équipe dev |
| Contenu éditorial | Marketing | Client, SEO | Design |

---

## Plan d'Actions Prioritaires

### Sprint 1 : Fondations (semaine 1-2)

| # | Action | Impact | Effort |
|---|--------|--------|--------|
| 1.1 | Fixer la hiérarchie des niveaux dans UN document source | Élimine la confusion | Faible |
| 1.2 | Adopter le glossaire commun et l'appliquer aux noms de fichiers | Langage partagé | Moyen |
| 1.3 | Créer les scripts de validation référencés ou nettoyer les références | Crédibilité du framework | Faible |
| 1.4 | Ajouter les seuils de complexité dans le routing | Évite le sur-process | Faible |

### Sprint 2 : Couverture métier (semaine 3-4)

| # | Action | Impact | Effort |
|---|--------|--------|--------|
| 2.1 | Analyser et documenter les livrables `client-intake` | Couvre le point d'entrée | Moyen |
| 2.2 | Analyser et documenter les livrables `direction-commerciale` | Inclut le business | Moyen |
| 2.3 | Créer les livrables business manquants (devis, contrat, bilan) | Complète le cycle | Moyen |
| 2.4 | Documenter le processus de gestion du changement (scope creep) | Réduit les conflits | Faible |

### Sprint 3 : Robustesse (semaine 5-6)

| # | Action | Impact | Effort |
|---|--------|--------|--------|
| 3.1 | Ajouter le mécanisme d'arbitrage inter-skills | Résout les conflits | Moyen |
| 3.2 | Remplacer le routing par mots-clés par intention + contexte | Fiabilise l'orientation | Élevé |
| 3.3 | Ajouter la Phase 8 (Bilan/Capitalisation) au lifecycle | Boucle vertueuse | Faible |
| 3.4 | Harmoniser FR/EN dans tous les documents | Cohérence | Élevé |

### Sprint 4 : Validation (semaine 7-8)

| # | Action | Impact | Effort |
|---|--------|--------|--------|
| 4.1 | CI complète validant structure + cross-refs + glossaire | Qualité garantie | Élevé |
| 4.2 | Faire relire le framework par un non-tech (commercial, designer) | Test utilisabilité | Faible |
| 4.3 | Créer un onboarding guide pour nouveaux contributeurs humains | Adoption | Moyen |
| 4.4 | Documenter 2 scénarios supplémentaires vus par un non-tech | Inclusivité | Moyen |

---

## Conclusion

Ce framework a le potentiel d'être un outil de gouvernance exceptionnel pour une agence web. Les fondations architecturales (3 niveaux, ADR, learning loop) sont solides.

Les 3 chantiers prioritaires sont :

1. **Uniformiser le langage** : adopter le glossaire commun pour que chaque métier se reconnaisse
2. **Combler le gap business** : documenter les process commerciaux et relationnels avec la même rigueur que les process techniques
3. **Assouplir l'orchestration** : introduire des seuils de complexité pour éviter que le framework devienne un frein sur les petits projets

Le framework ne sera adopté que s'il parle à **tous** les métiers, pas seulement aux développeurs.
