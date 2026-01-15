---
id: requirements-list
name: Liste des Exigences
version: 1.0.0
category: specification
status: active
phase: "1-intake"
order: 2
agents:
  - client-intake/extraction/requirements-extractor
  - client-intake/extraction/constraints-mapper
consumes:
  - client-request
produces_for:
  - client-intake/qualification/feasibility-checker
  - client-intake/qualification/complexity-assessor
  - direction-technique/avant-projet/audit-existant
  - direction-technique/estimation/estimation-macro
tags: [intake, requirements, exigences, extraction, analyse]
---

# Liste des Exigences

## Description

Document structuré listant toutes les exigences extraites de la demande client, catégorisées par type (fonctionnelles, non-fonctionnelles, contraintes). Ce livrable transforme la demande brute en spécifications exploitables pour la qualification et l'estimation.

## Format de Sortie

| Attribut | Valeur |
|----------|--------|
| **Type** | Document Markdown |
| **Emplacement** | `projects/[client-slug]/01-intake/requirements-list.md` |
| **Nommage** | `requirements-list.md` |
| **Encoding** | UTF-8 |

## Structure du Contenu

### Sections Obligatoires

- [ ] **Référence** - Lien vers `client-request.md`
- [ ] **Exigences fonctionnelles** - Ce que le système doit faire
- [ ] **Exigences non-fonctionnelles** - Comment il doit le faire (performance, sécurité, etc.)
- [ ] **Contraintes** - Limites imposées (budget, délai, technique)
- [ ] **Priorités** - Classification MoSCoW ou équivalent

### Sections Optionnelles

- [ ] **Exigences implicites** - Déduites mais non exprimées
- [ ] **Exclusions** - Ce qui est explicitement hors scope
- [ ] **Hypothèses** - Suppositions faites en l'absence d'info
- [ ] **Risques identifiés** - Problèmes potentiels détectés

## Critères d'Acceptation

| # | Critère | Seuil/Condition | Vérification | Obligatoire |
|---|---------|-----------------|--------------|-------------|
| 1 | Traçabilité | Chaque exigence liée à la source | Manuel | Oui |
| 2 | Unicité | ID unique par exigence | Auto | Oui |
| 3 | Testabilité | Exigences vérifiables | Manuel | Oui |
| 4 | Priorisation | Toutes classifiées MoSCoW | Manuel | Oui |
| 5 | Complétude | Couverture de la demande client | Manuel | Oui |

## Prérequis (Inputs)

| Source | Livrable/Donnée | Description |
|--------|-----------------|-------------|
| `client-intake/reception/*` | `client-request` | Demande client structurée |
| Client | Clarifications | Réponses aux questions |

## Points de Validation Humaine

| Étape | Moment | Validateur | Action si KO |
|-------|--------|------------|--------------|
| 1 | Après extraction | Chef de projet | Clarifier avec client |
| 2 | Avant estimation | Direction technique | Valider faisabilité |

## Exemple

### Exemple Minimal

```markdown
---
reference: ./client-request.md
date_extraction: 2024-01-16
version: 1
---

# Liste des Exigences - Dupont SARL

## Exigences Fonctionnelles

| ID | Exigence | Priorité | Source |
|----|----------|----------|--------|
| F01 | Afficher les produits en catalogue | Must | Demande client |
| F02 | Permettre l'achat en ligne | Must | Demande client |
| F03 | Gérer un panier d'achat | Must | Implicite |
| F04 | Paiement sécurisé | Must | Implicite |

## Exigences Non-Fonctionnelles

| ID | Exigence | Priorité | Source |
|----|----------|----------|--------|
| NF01 | Design moderne | Should | "quelque chose de plus moderne" |
| NF02 | Responsive mobile | Must | Standard marché |

## Contraintes

| ID | Contrainte | Type | Valeur |
|----|------------|------|--------|
| C01 | Budget | Financière | 15-20k€ |
| C02 | Délai | Temporelle | Septembre 2024 |
```

### Exemple Complet

```markdown
---
reference: ./client-request.md
date_extraction: 2024-01-16
extracted_by: requirements-extractor
version: 2
last_update: 2024-01-18
---

# Liste des Exigences - Dupont SARL

## Résumé

- **Total exigences** : 24
- **Fonctionnelles** : 15
- **Non-fonctionnelles** : 6
- **Contraintes** : 3
- **Couverture MoSCoW** : 100%

## Exigences Fonctionnelles

### Catalogue Produits

| ID | Exigence | Description | Priorité | Source | Testable |
|----|----------|-------------|----------|--------|----------|
| F01 | Catalogue produits | Afficher les produits avec photos, descriptions, prix | Must | Demande | ✓ |
| F02 | Catégorisation | Organiser les produits par catégories | Should | Implicite | ✓ |
| F03 | Recherche | Permettre la recherche de produits | Should | Standard | ✓ |
| F04 | Filtres | Filtrer par prix, catégorie, disponibilité | Could | Standard | ✓ |

### E-commerce

| ID | Exigence | Description | Priorité | Source | Testable |
|----|----------|-------------|----------|--------|----------|
| F05 | Panier | Ajouter/modifier/supprimer des produits au panier | Must | Implicite | ✓ |
| F06 | Checkout | Processus de commande complet | Must | Demande | ✓ |
| F07 | Paiement CB | Paiement par carte bancaire sécurisé | Must | Standard | ✓ |
| F08 | Paiement PayPal | Option de paiement PayPal | Could | Standard | ✓ |
| F09 | Confirmation | Email de confirmation de commande | Must | Standard | ✓ |
| F10 | Suivi commande | Espace client pour suivre les commandes | Should | Standard | ✓ |

### Gestion Contenu

| ID | Exigence | Description | Priorité | Source | Testable |
|----|----------|-------------|----------|--------|----------|
| F11 | Pages vitrine | Pages À propos, Contact, Mentions légales | Must | Légal | ✓ |
| F12 | Blog/Actualités | Section actualités/recettes | Could | Implicite | ✓ |
| F13 | Back-office | Interface d'administration des contenus | Must | Implicite | ✓ |

### Administration

| ID | Exigence | Description | Priorité | Source | Testable |
|----|----------|-------------|----------|--------|----------|
| F14 | Gestion produits | CRUD produits depuis back-office | Must | Implicite | ✓ |
| F15 | Gestion commandes | Visualiser et traiter les commandes | Must | Implicite | ✓ |

## Exigences Non-Fonctionnelles

| ID | Catégorie | Exigence | Métrique | Priorité | Source |
|----|-----------|----------|----------|----------|--------|
| NF01 | UX/Design | Design moderne et artisanal | Validation client | Must | Demande |
| NF02 | Responsive | Compatible mobile/tablette | Score Lighthouse > 90 | Must | Standard |
| NF03 | Performance | Temps de chargement rapide | LCP < 2.5s | Should | Standard |
| NF04 | SEO | Optimisé pour le référencement | Score SEO > 80 | Should | Standard |
| NF05 | Sécurité | Conformité RGPD | Checklist CNIL | Must | Légal |
| NF06 | Accessibilité | Accessible WCAG 2.1 AA | Audit a11y | Should | Standard |

## Contraintes

| ID | Type | Contrainte | Valeur | Ferme | Impact |
|----|------|------------|--------|-------|--------|
| C01 | Budget | Enveloppe maximale | 15-20k€ | Souple | Scope |
| C02 | Délai | Date de mise en ligne | Sept 2024 | Ferme | Planning |
| C03 | Technique | Plateforme existante | WordPress | Souple | Stack |

## Exclusions (Hors Scope)

- [ ] Application mobile native
- [ ] Marketplace multi-vendeurs
- [ ] Système de fidélité/points
- [ ] Chat en ligne

## Hypothèses

| # | Hypothèse | Impact si fausse |
|---|-----------|------------------|
| H1 | Stock géré manuellement (pas d'ERP) | Intégration ERP à prévoir |
| H2 | ~50 produits maximum | Architecture à revoir si plus |
| H3 | Livraison France métropolitaine uniquement | Modules livraison internationaux |

## Risques Identifiés

| # | Risque | Probabilité | Impact | Mitigation |
|---|--------|-------------|--------|------------|
| R1 | Délai serré pour la saisonnalité | Moyenne | Fort | MVP puis itérations |
| R2 | Contenu produits non prêt | Haute | Moyen | Planifier shooting photo |
| R3 | Budget insuffisant pour toutes les features | Moyenne | Moyen | Priorisation stricte MoSCoW |

## Matrice de Traçabilité

| Demande Client | Exigences Liées |
|----------------|-----------------|
| "refaire notre site web" | F11, F13, NF01 |
| "boutique en ligne" | F01-F10, F14-F15 |
| "plus moderne" | NF01, NF02 |
| "15-20k€" | C01 |
| "septembre" | C02 |
```

## Anti-patterns

| Anti-pattern | Pourquoi c'est problématique | Correction |
|--------------|------------------------------|------------|
| Exigences vagues | Impossible à tester | "Rapide" → "LCP < 2.5s" |
| Sans priorité | Tout semble urgent | Toujours classifier MoSCoW |
| Sans traçabilité | Impossible de justifier | Lier chaque exigence à sa source |
| Mélanger besoins/solutions | Bride les options techniques | Séparer le "quoi" du "comment" |
| Oublier les implicites | Gaps en réalisation | Expliciter les standards du marché |

## Références

- Livrable précédent : `client-request`
- Livrables suivants : `project-qualification`, `feasibility-assessment`, `macro-estimation`
- Standard : IEEE 830 (Software Requirements Specification)

## Historique des Versions

| Version | Date | Auteur | Changements |
|---------|------|--------|-------------|
| 1.0.0 | 2024-01-15 | client-intake | Création initiale |
