# Cahier des Charges

> Document contractuel définissant le périmètre du projet.
> **Ce document fait foi en cas de litige.**

---

# CAHIER DES CHARGES
## [Nom du Projet]

**Version** : 1.0
**Date** : [Date]
**Client** : [Nom entreprise]
**Rédacteur** : [Nom agence]

---

## Historique des versions

| Version | Date | Auteur | Modifications |
|---------|------|--------|---------------|
| 1.0 | [Date] | [Nom] | Version initiale |
| | | | |

---

## 1. Présentation du Projet

### 1.1 Contexte

> _Décrire l'entreprise et son contexte en 3-5 phrases, avec les mots du client._

[Description]

### 1.2 Problématique

> _Quel problème ce projet doit-il résoudre ?_

**Le problème principal est que** : [Description du problème]

**Conséquences actuelles** :
- [Conséquence 1]
- [Conséquence 2]
- [Conséquence 3]

### 1.3 Objectifs

| # | Objectif | Indicateur de succès | Priorité |
|---|----------|---------------------|----------|
| 1 | [Objectif principal] | [KPI mesurable] | Critique |
| 2 | [Objectif secondaire] | [KPI mesurable] | Important |
| 3 | [Objectif tertiaire] | [KPI mesurable] | Souhaité |

---

## 2. Description Fonctionnelle

> _Cette section décrit CE QUE le système doit faire, pas COMMENT._

### 2.1 Utilisateurs Cibles

| Profil | Description | Besoins principaux |
|--------|-------------|-------------------|
| [Profil 1] | [Description] | [Besoins] |
| [Profil 2] | [Description] | [Besoins] |

### 2.2 Parcours Utilisateur

#### Parcours 1 : [Nom du parcours]

```
[Utilisateur] veut [action] pour [objectif]

1. L'utilisateur arrive sur [page/écran]
2. Il [action]
3. Le système [réponse]
4. L'utilisateur peut alors [résultat]
```

#### Parcours 2 : [Nom du parcours]

```
[Utilisateur] veut [action] pour [objectif]

1. ...
```

### 2.3 Fonctionnalités

#### Module : [Nom du module]

| Réf | Fonctionnalité | Description | Priorité |
|-----|----------------|-------------|----------|
| F01 | [Nom] | [Description en langage simple] | Must |
| F02 | [Nom] | [Description en langage simple] | Must |
| F03 | [Nom] | [Description en langage simple] | Should |
| F04 | [Nom] | [Description en langage simple] | Could |

**Légende priorités** :
- **Must** : Indispensable au lancement
- **Should** : Important mais peut attendre V1.1
- **Could** : Souhaitable si budget/temps le permet
- **Won't** : Hors périmètre (explicitement exclu)

#### Module : [Nom du module 2]

| Réf | Fonctionnalité | Description | Priorité |
|-----|----------------|-------------|----------|
| F05 | [Nom] | [Description] | Must |
| ... | | | |

---

## 3. Périmètre

### 3.1 Ce qui est INCLUS

| Élément | Description |
|---------|-------------|
| [Élément 1] | [Description] |
| [Élément 2] | [Description] |
| [Élément 3] | [Description] |

### 3.2 Ce qui est EXCLU

> _Liste explicite de ce qui n'est PAS dans ce projet._

| Élément exclu | Raison |
|---------------|--------|
| [Élément 1] | [Raison] |
| [Élément 2] | [Raison] |
| [Élément 3] | [Raison] |

### 3.3 Options (chiffrées séparément)

| Option | Description | Estimation |
|--------|-------------|------------|
| [Option 1] | [Description] | [Fourchette] |
| [Option 2] | [Description] | [Fourchette] |

---

## 4. Contraintes

### 4.1 Contraintes Techniques

| Contrainte | Description | Impact |
|------------|-------------|--------|
| Hébergement | [Ex: OVH imposé] | |
| Compatibilité | [Ex: IE11, mobile] | |
| Performance | [Ex: < 3s chargement] | |
| Sécurité | [Ex: RGPD, HTTPS] | |
| Accessibilité | [Ex: RGAA niveau AA] | |

### 4.2 Contraintes Calendaires

| Jalon | Date | Contrainte |
|-------|------|------------|
| Lancement souhaité | [Date] | ☐ Impératif ☐ Souhaité |
| Événement clé | [Date] | [Description] |

### 4.3 Contraintes Budget

| Élément | Montant |
|---------|---------|
| Enveloppe globale | [Fourchette] |
| Budget maintenance annuel | [Fourchette] |

---

## 5. Livrables

### 5.1 Liste des Livrables

| # | Livrable | Format | Destinataire |
|---|----------|--------|--------------|
| 1 | [Ex: Maquettes validées] | [Figma/PDF] | Client |
| 2 | [Ex: Site en production] | [URL] | Client |
| 3 | [Ex: Documentation admin] | [PDF/Wiki] | Client |
| 4 | [Ex: Formation] | [Session 2h] | Équipe client |
| 5 | [Ex: Code source] | [Git] | Client |

### 5.2 Critères de Recette

> _Conditions pour que le livrable soit considéré comme accepté._

| Livrable | Critères d'acceptation |
|----------|----------------------|
| [Livrable 1] | ☐ [Critère 1] ☐ [Critère 2] |
| [Livrable 2] | ☐ [Critère 1] ☐ [Critère 2] |

---

## 6. Organisation

### 6.1 Équipe Projet

**Côté Client** :

| Rôle | Nom | Responsabilités |
|------|-----|-----------------|
| Sponsor | [Nom] | Validation finale, arbitrages |
| Chef de projet | [Nom] | Suivi, coordination, validations |
| Référent contenu | [Nom] | Fourniture contenus |

**Côté Agence** :

| Rôle | Nom | Responsabilités |
|------|-----|-----------------|
| Chef de projet | [Nom] | Coordination, reporting |
| [Autres rôles] | [Nom] | [Responsabilités] |

### 6.2 Modalités de Communication

| Type | Fréquence | Outil | Participants |
|------|-----------|-------|--------------|
| Point hebdo | 1x/semaine | [Visio/Présentiel] | CDP Client + Agence |
| Reporting | [Fréquence] | [Email/Outil] | |
| Urgences | À la demande | [Téléphone] | |

### 6.3 Processus de Validation

```
1. Livrable présenté par l'agence
2. Client dispose de [X] jours ouvrés pour valider ou demander des modifications
3. Modifications mineures : incluses (max [X] itérations)
4. Modifications majeures : avenant au devis
5. Absence de réponse sous [X] jours = validation tacite
```

---

## 7. Planning Prévisionnel

### 7.1 Jalons Principaux

| Phase | Description | Durée estimée | Livrable |
|-------|-------------|---------------|----------|
| Cadrage | Spécifications détaillées | [X] sem. | Specs validées |
| Conception | Maquettes UX/UI | [X] sem. | Maquettes |
| Développement | Réalisation technique | [X] sem. | Site recette |
| Recette | Tests et corrections | [X] sem. | PV recette |
| Mise en ligne | Déploiement production | [X] jours | Site en ligne |

### 7.2 Dépendances Client

> _Éléments que le client doit fournir pour respecter le planning._

| Élément | Date limite | Impact si retard |
|---------|-------------|------------------|
| [Contenus textes] | [Date] | Décalage équivalent |
| [Visuels/Photos] | [Date] | Décalage équivalent |
| [Accès hébergement] | [Date] | Blocage mise en ligne |
| [Validation maquettes] | [Date] | Décalage développement |

---

## 8. Conditions Contractuelles

### 8.1 Propriété Intellectuelle

> _Définir qui possède quoi à la fin du projet._

- Le code source développé spécifiquement pour ce projet est cédé au Client à réception du paiement intégral.
- Les composants génériques et librairies tierces restent sous leur licence respective.
- Les maquettes et éléments graphiques sont cédés au Client.

### 8.2 Confidentialité

Les deux parties s'engagent à maintenir confidentielles les informations échangées dans le cadre de ce projet.

### 8.3 Garantie

L'agence garantit le bon fonctionnement des livrables pendant une période de [X] mois après la mise en ligne (correction des anomalies bloquantes).

### 8.4 Maintenance (optionnel)

| Formule | Contenu | Tarif |
|---------|---------|-------|
| [Formule 1] | [Description] | [€/mois ou €/an] |
| [Formule 2] | [Description] | [€/mois ou €/an] |

---

## 9. Annexes

- [ ] Brief découverte original
- [ ] Benchmark / références visuelles
- [ ] Schémas fonctionnels
- [ ] Contenus fournis par le client

---

## Validation

### Signatures

**Pour le Client** :

| | |
|---|---|
| Nom | |
| Fonction | |
| Date | |
| Signature | |

**Pour l'Agence** :

| | |
|---|---|
| Nom | |
| Fonction | |
| Date | |
| Signature | |

---

> **IMPORTANT** : Ce document, une fois signé par les deux parties, constitue la référence contractuelle du projet. Toute modification du périmètre fera l'objet d'un avenant.
