---
id: project-brief
name: Brief Projet
version: 1.0.0
category: process
status: active
phase: "2-strategy"
order: 5
agents:
  - project-management/avant-projet/brief
  - project-management/planification/kick-off
consumes:
  - client-request
  - requirements-list
  - project-qualification
produces_for:
  - direction-technique/specification/cadrage-technique
  - direction-technique/estimation/estimation-detaillee
  - ux-ui-design/research/user-research
  - direction-artistique/orchestration/brief-creatif
  - direction-marketing/orchestration/brief-marketing
tags: [project, brief, kick-off, cadrage, planning]
---

# Brief Projet

## Description

Document de référence synthétisant toutes les informations clés d'un projet validé, servant de base commune à toutes les équipes (technique, design, marketing). Le brief projet est le point de départ officiel après le Go et reste la source de vérité tout au long du projet.

## Format de Sortie

| Attribut | Valeur |
|----------|--------|
| **Type** | Document Markdown |
| **Emplacement** | `projects/[client-slug]/02-strategy/project-brief.md` |
| **Nommage** | `project-brief.md` |
| **Encoding** | UTF-8 |

## Structure du Contenu

### Sections Obligatoires

- [ ] **Fiche d'identité** - Client, projet, équipe, dates clés
- [ ] **Contexte & Enjeux** - Pourquoi ce projet, problème à résoudre
- [ ] **Objectifs** - Résultats attendus mesurables
- [ ] **Périmètre** - In scope / Out of scope
- [ ] **Livrables attendus** - Liste des outputs
- [ ] **Planning macro** - Jalons principaux
- [ ] **Budget** - Enveloppe et répartition
- [ ] **Équipe projet** - Rôles et responsabilités

### Sections Optionnelles

- [ ] **Personas** - Utilisateurs cibles
- [ ] **Références** - Benchmark, inspirations
- [ ] **Contraintes spécifiques** - Techniques, légales, etc.
- [ ] **Critères de succès** - KPIs de validation
- [ ] **Risques** - Points de vigilance
- [ ] **Historique** - Versions et modifications

## Critères d'Acceptation

| # | Critère | Seuil/Condition | Vérification | Obligatoire |
|---|---------|-----------------|--------------|-------------|
| 1 | Complétude | Toutes sections obligatoires remplies | Manuel | Oui |
| 2 | Validation client | Signature ou accord écrit | Manuel | Oui |
| 3 | Objectifs SMART | Spécifique, Mesurable, Atteignable, Réaliste, Temporel | Manuel | Oui |
| 4 | Scope clair | In/Out explicites | Manuel | Oui |
| 5 | Équipe identifiée | Au moins 1 responsable par domaine | Manuel | Oui |

## Prérequis (Inputs)

| Source | Livrable/Donnée | Description |
|--------|-----------------|-------------|
| `client-intake/*` | `client-request` | Demande initiale |
| `client-intake/*` | `requirements-list` | Exigences |
| `client-intake/*` | `project-qualification` | Go validé |
| Commercial | Proposition signée | Accord contractuel |

## Points de Validation Humaine

| Étape | Moment | Validateur | Action si KO |
|-------|--------|------------|--------------|
| 1 | Rédaction | Chef de projet | Compléter |
| 2 | Review interne | Direction technique | Ajuster |
| 3 | Validation finale | Client | Modifier selon feedback |

## Exemple

### Exemple Minimal

```markdown
---
projet: site-ecommerce-dupont
client: Dupont SARL
version: 1.0
date_creation: 2024-01-20
statut: validé
---

# Brief Projet - Site E-commerce Dupont

## Fiche d'Identité

| Champ | Valeur |
|-------|--------|
| **Client** | Dupont SARL |
| **Projet** | Refonte site + e-commerce |
| **Chef de projet** | Marie Martin |
| **Kick-off** | 25/01/2024 |
| **Livraison** | 01/09/2024 |
| **Budget** | 18 000 € HT |

## Contexte

Dupont SARL souhaite moderniser son site web et ajouter une boutique en ligne pour vendre ses produits artisanaux.

## Objectifs

1. Refondre le site vitrine avec un design moderne
2. Créer une boutique e-commerce fonctionnelle
3. Être en ligne avant la saison des fêtes

## Périmètre

### In Scope
- Refonte design responsive
- Catalogue ~50 produits
- Panier + paiement CB
- Back-office gestion

### Out of Scope
- Application mobile
- Marketplace
- Programme fidélité
```

### Exemple Complet

```markdown
---
projet: site-ecommerce-dupont
client: Dupont SARL
code_projet: DUP-2024-001
version: 1.2
date_creation: 2024-01-20
date_validation: 2024-01-25
statut: validé
auteur: Marie Martin
---

# Brief Projet - Site E-commerce Dupont SARL

## 1. Fiche d'Identité

### Informations Générales

| Champ | Valeur |
|-------|--------|
| **Nom du projet** | Site E-commerce Dupont |
| **Code projet** | DUP-2024-001 |
| **Client** | Dupont SARL |
| **Contact client** | Jean Dupont (Gérant) |
| **Type de projet** | Refonte + Évolution |
| **Secteur** | Artisanat / Commerce |

### Dates Clés

| Jalon | Date | Statut |
|-------|------|--------|
| Kick-off | 25/01/2024 | ✅ Fait |
| Maquettes validées | 28/02/2024 | 🔄 En cours |
| Développement terminé | 15/07/2024 | ⏳ À venir |
| Recette | 01/08/2024 | ⏳ À venir |
| Mise en production | 01/09/2024 | ⏳ À venir |

### Budget

| Poste | Montant | % |
|-------|---------|---|
| Design UX/UI | 3 500 € | 19% |
| Développement | 10 000 € | 56% |
| Contenu & SEO | 2 500 € | 14% |
| Déploiement & Tests | 2 000 € | 11% |
| **TOTAL** | **18 000 € HT** | 100% |

---

## 2. Contexte & Enjeux

### Contexte

Dupont SARL est une PME familiale spécialisée dans les produits artisanaux du terroir depuis 1985. L'entreprise dispose d'une boutique physique et d'un site vitrine créé en 2018 sous WordPress.

Le site actuel :
- Design daté, non responsive
- Pas de vente en ligne
- Contenu peu mis à jour
- Analytics : ~500 visites/mois

### Problème à Résoudre

> "Nous perdons des ventes car les clients nous demandent souvent s'ils peuvent commander en ligne." - Jean Dupont

### Enjeux Business

1. **Nouveau canal de vente** : Capter le CA online (objectif : +15% CA annuel)
2. **Image de marque** : Moderniser la perception de l'entreprise
3. **Saisonnalité** : Être prêt pour la saison des fêtes (60% du CA)

---

## 3. Objectifs

### Objectifs Business (SMART)

| # | Objectif | Indicateur | Cible | Deadline |
|---|----------|------------|-------|----------|
| O1 | Générer des ventes en ligne | CA e-commerce | 50k€ | Déc 2024 |
| O2 | Augmenter le trafic | Visites mensuelles | 2000 | Déc 2024 |
| O3 | Convertir les visiteurs | Taux de conversion | 2% | Mars 2025 |

### Objectifs Projet

| # | Objectif | Critère de succès |
|---|----------|-------------------|
| P1 | Refondre le design | Validation client des maquettes |
| P2 | Implémenter le e-commerce | Commande test réussie |
| P3 | Livrer avant septembre | Mise en prod le 01/09 |

---

## 4. Périmètre

### In Scope ✅

#### Site Vitrine
- [ ] Page d'accueil avec mise en avant produits
- [ ] Pages À propos, Notre histoire
- [ ] Page Contact avec formulaire
- [ ] Mentions légales, CGV, Politique de confidentialité

#### E-commerce
- [ ] Catalogue produits (~50 références)
- [ ] Fiches produits avec galerie photos
- [ ] Catégorisation (5-6 catégories)
- [ ] Panier d'achat
- [ ] Tunnel de commande
- [ ] Paiement CB (Stripe)
- [ ] Confirmation email automatique
- [ ] Espace client (historique commandes)

#### Back-office
- [ ] Gestion des produits (CRUD)
- [ ] Gestion des commandes
- [ ] Gestion des stocks (simple)
- [ ] Tableau de bord basique

#### Technique
- [ ] Design responsive (mobile-first)
- [ ] SEO on-page optimisé
- [ ] HTTPS / Sécurité
- [ ] RGPD compliance
- [ ] Hébergement WordPress managé

### Out of Scope ❌

| Élément | Raison | Évolution future ? |
|---------|--------|-------------------|
| Application mobile | Budget | V2 possible |
| Marketplace multi-vendeurs | Complexité | Non prévu |
| Programme fidélité | Budget | V2 possible |
| Chat en ligne | Budget | V2 possible |
| Paiement PayPal | Simplification | V1.1 si demandé |
| Multi-langue | Pas de besoin | Non prévu |
| Blog | Pas prioritaire | V2 possible |

---

## 5. Livrables Attendus

| # | Livrable | Responsable | Format | Date |
|---|----------|-------------|--------|------|
| L1 | Maquettes UI | UX Designer | Figma | 28/02 |
| L2 | Spécifications techniques | Dir. Technique | Markdown | 15/02 |
| L3 | Site développé | Dev WordPress | WordPress | 15/07 |
| L4 | Documentation admin | Dev WordPress | PDF | 25/08 |
| L5 | Formation client | Chef de projet | Visio | 28/08 |
| L6 | Site en production | DevOps | URL live | 01/09 |

---

## 6. Planning Macro

```
Janvier   Février   Mars      Avril     Mai       Juin      Juillet   Août      Septembre
|---------|---------|---------|---------|---------|---------|---------|---------|---------|
[CADRAGE ]
          [  DESIGN / UX                ]
                    [    DÉVELOPPEMENT                                  ]
                                                                        [ RECETTE ]
                                                                                  [PROD]
```

### Jalons Détaillés

| Phase | Début | Fin | Livrables |
|-------|-------|-----|-----------|
| Cadrage | 25/01 | 15/02 | Brief, Specs, Planning |
| Design | 15/02 | 31/03 | Wireframes, Maquettes |
| Développement | 01/04 | 15/07 | Site complet |
| Recette | 15/07 | 25/08 | Tests, Corrections |
| Mise en prod | 25/08 | 01/09 | Site live |

---

## 7. Équipe Projet

### Côté Agence

| Rôle | Personne | Responsabilités |
|------|----------|-----------------|
| **Chef de projet** | Marie Martin | Coordination, planning, client |
| **Direction technique** | Thomas Bernard | Architecture, specs, review |
| **UX/UI Designer** | Sophie Leroy | Wireframes, maquettes, UI kit |
| **Développeur WordPress** | Lucas Petit | Développement, intégration |
| **DevOps** | Antoine Moreau | Hébergement, déploiement |

### Côté Client

| Rôle | Personne | Responsabilités |
|------|----------|-----------------|
| **Sponsor** | Jean Dupont | Décisions, validation finale |
| **Référent contenu** | Claire Dupont | Fourniture contenus, photos |

### Matrice RACI

| Activité | Client | CDP | Dir Tech | Designer | Dev |
|----------|--------|-----|----------|----------|-----|
| Validation maquettes | A | R | C | R | I |
| Fourniture contenu | R | A | I | I | I |
| Développement | I | A | C | C | R |
| Recette | A | R | C | I | R |
| Mise en prod | I | A | C | I | R |

*R=Responsible, A=Accountable, C=Consulted, I=Informed*

---

## 8. Personas (Utilisateurs Cibles)

### Persona 1 : Marie, 45 ans

- **Profil** : Cadre, citadine, CSP+
- **Besoin** : Acheter des produits du terroir de qualité
- **Comportement** : Achète en ligne, sensible à l'authenticité
- **Devices** : Mobile (60%), Desktop (40%)

### Persona 2 : Pierre, 62 ans

- **Profil** : Retraité, rural
- **Besoin** : Commander pour offrir à ses enfants en ville
- **Comportement** : Moins à l'aise avec le digital
- **Devices** : Desktop (80%), Tablette (20%)

---

## 9. Références & Inspirations

| Site | Ce qu'on aime | Ce qu'on ne veut pas |
|------|---------------|----------------------|
| artisans-terroir.fr | Ambiance chaleureuse | Trop chargé |
| maison-productive.fr | Navigation claire | - |
| lafermedelouise.fr | Photos produits | Design trop classique |

---

## 10. Risques & Points de Vigilance

| # | Risque | Probabilité | Impact | Mitigation |
|---|--------|-------------|--------|------------|
| R1 | Retard contenu client | Haute | Fort | Relances planifiées, deadline ferme |
| R2 | Ajouts de scope | Moyenne | Moyen | Cadrage strict, avenant si besoin |
| R3 | Photos produits insuffisantes | Moyenne | Moyen | Prévoir shooting si nécessaire |

---

## 11. Critères de Succès

Le projet sera considéré comme réussi si :

- [ ] Le site est en ligne le 01/09/2024
- [ ] Le client valide la recette sans réserves majeures
- [ ] Le budget est respecté (±10%)
- [ ] Une première commande test est passée avec succès
- [ ] Le client est formé et autonome sur le back-office

---

## 12. Annexes

- [Proposition commerciale signée](./annexes/proposition-dupont-signee.pdf)
- [Client Request](../01-intake/client-request.md)
- [Requirements List](../01-intake/requirements-list.md)
- [Project Qualification](../01-intake/project-qualification.md)

---

## Historique des Modifications

| Version | Date | Auteur | Modifications |
|---------|------|--------|---------------|
| 1.0 | 20/01/2024 | Marie Martin | Création initiale |
| 1.1 | 22/01/2024 | Thomas Bernard | Ajout specs techniques |
| 1.2 | 25/01/2024 | Marie Martin | Validation client |
```

## Anti-patterns

| Anti-pattern | Pourquoi c'est problématique | Correction |
|--------------|------------------------------|------------|
| Brief oral uniquement | Pas de référence, malentendus | Toujours documenter par écrit |
| Scope flou | Dérives, conflits | Lister explicitement In/Out |
| Pas de validation client | Contestations ultérieures | Faire signer ou valider par écrit |
| Brief figé | Ne s'adapte pas aux évolutions | Versionner, historiser les changements |
| Trop long | Personne ne le lit | Max 5-10 pages, synthétique |

## Références

- Livrables précédents : `client-request`, `requirements-list`, `project-qualification`
- Livrables suivants : `technical-specification`, `wireframes`, `macro-estimation`
- Template : PRINCE2 Project Brief

## Historique des Versions

| Version | Date | Auteur | Changements |
|---------|------|--------|-------------|
| 1.0.0 | 2024-01-15 | project-management | Création initiale |
