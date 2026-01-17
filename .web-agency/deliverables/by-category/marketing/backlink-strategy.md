---
id: backlink-strategy
name: Stratégie Netlinking
version: 1.0.0
category: marketing
status: active
phase: "3-conception"
order: 9
agents:
  - marketing/acquisition/seo/netlinking/strategie-backlinks
  - marketing/acquisition/seo/netlinking/prospection-liens
  - marketing/acquisition/seo/netlinking/outreach-partenariats
consumes:
  - seo-audit
  - keyword-research
  - seo-roadmap
produces_for:
  - marketing/acquisition/seo/netlinking/outreach-partenariats
  - marketing/acquisition/seo/netlinking/analyse-profil-liens
workflows:
  - id: wf-backlink-strategy
    template: wf-strategy
    phase: Strategy
    name: Élaboration stratégie netlinking
    duration: 2 jours
tags:
  - marketing
  - seo
  - netlinking
  - backlinks
  - offpage
---

# Stratégie Netlinking

## Description

La stratégie netlinking définit le plan d'acquisition de backlinks pour améliorer l'autorité du domaine. Elle identifie les opportunités, les méthodes d'acquisition et les cibles prioritaires pour construire un profil de liens naturel et efficace.

## Cas d'Usage

- Amélioration du Domain Rating/Authority
- Support au positionnement sur mots-clés compétitifs
- Construction de notoriété de marque
- Récupération de liens perdus
- Désaveu de liens toxiques

## Structure du Livrable

```markdown
# Stratégie Netlinking : [Projet]

## État des Lieux

### Profil de Backlinks Actuel

| Métrique | Valeur | Benchmark Secteur | Écart |
|----------|--------|-------------------|-------|
| Domain Rating (DR) | [X] | [Y] | [+/-Z] |
| Domaines référents | [X] | [Y] | [+/-Z] |
| Backlinks totaux | [X] | [Y] | [+/-Z] |
| Ratio DoFollow/NoFollow | [X%/Y%] | 70/30 | [OK/KO] |

### Distribution Qualité

```
DR 70+   ████░░░░░░░░░░░░░░░░ 10%  [X domaines]
DR 50-69 ██████████░░░░░░░░░░ 25%  [X domaines]
DR 30-49 ████████████████░░░░ 40%  [X domaines]
DR 10-29 ██████░░░░░░░░░░░░░░ 20%  [X domaines]
DR 0-9   ██░░░░░░░░░░░░░░░░░░  5%  [X domaines]
```

### Top Backlinks Actuels

| Domaine Référent | DR | Ancre | Page Cible | Type |
|------------------|----|----|------------|------|
| [site1.com] | [X] | "[Ancre]" | /[page] | DoFollow |
| [site2.com] | [X] | "[Ancre]" | /[page] | DoFollow |
| [site3.com] | [X] | "[Ancre]" | /[page] | NoFollow |

### Analyse Concurrentielle

| Concurrent | DR | Domaines Réf. | Croissance/mois | Gap |
|------------|----|----|-----------------|-----|
| [Concurrent 1] | [X] | [Y] | +[Z]/mois | [+A] |
| [Concurrent 2] | [X] | [Y] | +[Z]/mois | [+A] |
| [Concurrent 3] | [X] | [Y] | +[Z]/mois | [+A] |

## Objectifs

### KPIs à 12 Mois

| KPI | Actuel | 3 mois | 6 mois | 12 mois |
|-----|--------|--------|--------|---------|
| Domain Rating | [X] | [Y] | [Z] | [W] |
| Domaines référents | [X] | [+Y] | [+Z] | [+W] |
| Backlinks DR50+ | [X] | [+Y] | [+Z] | [+W] |
| Mentions de marque | [X] | [Y] | [Z] | [W] |

### Objectifs Mensuels

| Mois | Liens Acquis | DR Moyen Cible | Budget |
|------|--------------|----------------|--------|
| M1 | [X] | [Y] | [Z €] |
| M2 | [X] | [Y] | [Z €] |
| M3 | [X] | [Y] | [Z €] |
| ... | ... | ... | ... |

## Stratégie d'Acquisition

### Mix de Tactiques

| Tactique | Part | Volume/mois | Coût/lien | Effort |
|----------|------|-------------|-----------|--------|
| Guest posting | 30% | [X] | [Y €] | Moyen |
| Digital PR | 20% | [X] | [Y €] | Élevé |
| Linkable assets | 20% | [X] | [Y €] | Élevé |
| Broken link building | 15% | [X] | [0 €] | Moyen |
| Partenariats | 10% | [X] | [Y €] | Faible |
| Réclamation liens | 5% | [X] | [0 €] | Faible |

### 1. Guest Posting

#### Process
```
1. Prospection    2. Qualification    3. Pitch    4. Rédaction    5. Publication
   Sites cibles      DR, relevance      Personalisé   Qualité        Suivi
```

#### Sites Cibles

| Site | DR | DA | Trafic | Contact | Topic |
|------|----|----|--------|---------|-------|
| [site1.com] | [X] | [X] | [X K] | [email] | [Thématique] |
| [site2.com] | [X] | [X] | [X K] | [email] | [Thématique] |
| [site3.com] | [X] | [X] | [X K] | [email] | [Thématique] |

#### Template Pitch Guest Post

```
Objet : Proposition d'article pour [Site]

Bonjour [Prénom],

[Accroche personnalisée sur un article récent]

Je suis [Prénom] de [Entreprise], et je souhaiterais contribuer
à [Site] avec un article sur [Sujet].

Quelques idées :
1. [Titre 1] - [Angle unique]
2. [Titre 2] - [Angle unique]
3. [Titre 3] - [Angle unique]

Mes dernières publications :
- [Lien article 1]
- [Lien article 2]

Seriez-vous intéressé(e) ?

[Signature]
```

### 2. Digital PR

#### Types de Contenus PR

| Type | Description | Potentiel Liens | Effort |
|------|-------------|-----------------|--------|
| Étude sectorielle | Données exclusives | Élevé | Élevé |
| Newsjacking | Réaction actualité | Moyen | Faible |
| Expert commentary | Citations presse | Moyen | Faible |
| Data journalism | Visualisations données | Élevé | Élevé |

#### Journalistes/Médias Cibles

| Média | Journaliste | Contact | Thématique |
|-------|-------------|---------|------------|
| [Média 1] | [Nom] | [Twitter/Email] | [Topic] |
| [Média 2] | [Nom] | [Twitter/Email] | [Topic] |
| [Média 3] | [Nom] | [Twitter/Email] | [Topic] |

#### Calendrier PR

| Mois | Event/Actualité | Angle | Asset Requis |
|------|-----------------|-------|--------------|
| [Mois] | [Événement] | [Notre angle] | [Contenu] |
| [Mois] | [Actualité sectorielle] | [Expertise] | [Étude/Réaction] |

### 3. Linkable Assets

#### Assets à Créer

| Asset | Format | KW Cible | Potentiel | Budget |
|-------|--------|----------|-----------|--------|
| [Rapport sectoriel 2024] | PDF + Landing | [KW] | 50+ liens | [X €] |
| [Calculateur/Outil] | Interactive | [KW] | 30+ liens | [X €] |
| [Infographie] | Image | [KW] | 20+ liens | [X €] |
| [Template gratuit] | Download | [KW] | 15+ liens | [X €] |

#### Promotion des Assets

| Canal | Action | Timeline |
|-------|--------|----------|
| Outreach | Pitch 100 sites pertinents | S1-S2 |
| Social | Promotion LinkedIn/Twitter | S1 |
| Newsletter | Envoi à la base | S1 |
| PR | Pitch journalistes | S1-S2 |
| Communities | Reddit, forums | S2-S4 |

### 4. Broken Link Building

#### Opportunités Identifiées

| Page Source | DR | Lien Cassé | Notre Contenu Alternatif |
|-------------|----|----|--------------------------|
| [URL source] | [X] | [URL 404] | [Notre URL] |
| [URL source] | [X] | [URL 404] | [Notre URL] |
| [URL source] | [X] | [URL 404] | [Notre URL] |

#### Template Broken Link

```
Objet : Lien cassé sur votre page [Titre]

Bonjour,

En parcourant votre excellent article "[Titre]", j'ai remarqué
que le lien vers [ancre] renvoie une erreur 404.

Pour maintenir la qualité de votre contenu, je suggère :
- [Notre ressource] qui couvre le même sujet de manière [avantage]

Voici le lien : [URL]

Bien cordialement,
[Signature]
```

### 5. Partenariats & Co-marketing

#### Partenaires Potentiels

| Partenaire | Synergies | Type Collab | Potentiel |
|------------|-----------|-------------|-----------|
| [Entreprise 1] | [Complémentarité] | Co-webinar + échange liens | [X] liens |
| [Entreprise 2] | [Audience partagée] | Étude commune | [X] liens |
| [Entreprise 3] | [Même cible] | Intégration produit | [X] liens |

### 6. Réclamation de Liens

#### Mentions Non Liées

| URL Source | Contexte Mention | Contact | Status |
|------------|------------------|---------|--------|
| [URL] | "[Citation]" | [Email] | 🔴 À contacter |
| [URL] | "[Mention marque]" | [Email] | 🔴 À contacter |

#### Liens Perdus à Récupérer

| Domaine | Raison Perte | Page Cible | Action |
|---------|--------------|------------|--------|
| [Domaine] | Page supprimée | /[ancienne-url] | Redirect + contact |
| [Domaine] | Refonte site | /[page] | Recontacter |

## Profil d'Ancres Cible

### Distribution Recommandée

| Type d'Ancre | % Actuel | % Cible | Exemple |
|--------------|----------|---------|---------|
| Marque | [X%] | 35-40% | "[Marque]", "[Marque.com]" |
| URL nue | [X%] | 20-25% | "https://marque.com" |
| Générique | [X%] | 15-20% | "cliquez ici", "site web" |
| Mot-clé partiel | [X%] | 10-15% | "guide [KW]" |
| Exact match | [X%] | <5% | "[KW exact]" |

### Ancres par Page Cible

| Page Cible | KW Principal | Ancres Recommandées |
|------------|--------------|---------------------|
| /[page-1] | [KW] | "[Marque] [KW]", "guide [KW]" |
| /[page-2] | [KW] | "[KW] par [Marque]", "ressource [KW]" |

## Liens Toxiques & Désaveu

### Liens à Surveiller

| Domaine | DR | Raison Suspect | Action |
|---------|----|----|--------|
| [domaine-spam] | [X] | PBN évident | Désavouer |
| [domaine-hors-sujet] | [X] | Hors thématique | Surveiller |
| [domaine-hack] | [X] | Injection liens | Désavouer |

### Fichier Désaveu
```
# Domaines toxiques identifiés
domain:spam-site1.com
domain:spam-site2.com
```

## Suivi & Reporting

### Métriques Hebdo

| Métrique | Semaine | Mois | Target |
|----------|---------|------|--------|
| Pitches envoyés | [X] | [Y] | [Z] |
| Taux réponse | [X%] | [Y%] | [Z%] |
| Liens acquis | [X] | [Y] | [Z] |
| DR moyen acquis | [X] | [Y] | [Z] |

### Dashboard Netlinking

| KPI | Jan | Fév | Mar | ... |
|-----|-----|-----|-----|-----|
| Nouveaux domaines réf. | [X] | [X] | [X] | ... |
| DR | [X] | [X] | [X] | ... |
| Liens perdus | [X] | [X] | [X] | ... |
| Net gain | [X] | [X] | [X] | ... |

## Budget

| Poste | Mensuel | Annuel |
|-------|---------|--------|
| Outils (Ahrefs, Pitchbox) | [X €] | [Y €] |
| Guest posts sponsorisés | [X €] | [Y €] |
| Création assets | [X €] | [Y €] |
| PR/Outreach | [X €] | [Y €] |
| **Total** | **[X €]** | **[Y €]** |
```

## Critères d'Acceptation

### Complétude
- [ ] Audit profil actuel
- [ ] Objectifs chiffrés
- [ ] Mix de tactiques défini
- [ ] Cibles identifiées
- [ ] Profil d'ancres planifié
- [ ] Budget estimé

### Qualité
- [ ] Tactiques white-hat uniquement
- [ ] Cibles pertinentes et réalistes
- [ ] Aligné avec stratégie SEO globale

### Validation
- [ ] Validé par SEO Manager
- [ ] Budget approuvé

## Points de Contrôle Humain

| Checkpoint | Responsable | Critères |
|------------|-------------|----------|
| Qualité cibles | SEO Lead | Sites pertinents et sains |
| Templates outreach | Content | Personnalisés, pas spam |
| Liens acquis | SEO Manager | Qualité avant quantité |

## Anti-Patterns

### ❌ À Éviter

1. **PBN / Link farms**
   - Réseaux de sites artificiels
   - Pénalités Google garanties

2. **Achat de liens massif**
   - Patterns détectables
   - Risque algorithme

3. **Ancres sur-optimisées**
   - Trop d'exact match
   - Signal manipulatif

4. **Guest post de mauvaise qualité**
   - Contenus spinnés
   - Sites non pertinents

### ✅ Bonnes Pratiques

1. **Qualité > Quantité** : 1 lien DR60 > 10 liens DR10
2. **Diversifier les sources** et les ancres
3. **Prioriser la pertinence** thématique
4. **Créer du contenu linkable** plutôt qu'acheter des liens

## Outils Recommandés

| Outil | Usage |
|-------|-------|
| Ahrefs | Analyse backlinks |
| Pitchbox/BuzzStream | Outreach automation |
| Hunter.io | Recherche emails |
| HARO | PR/Expert quotes |
