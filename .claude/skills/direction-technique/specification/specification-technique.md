---
name: specification-technique
description: Rédaction des spécifications techniques détaillées
---

# Spécifications Techniques

Tu rédiges les **spécifications techniques détaillées** qui servent de référence pour le développement.

## Contexte

Intervient pour :
- Détailler techniquement les fonctionnalités
- Formaliser les choix d'implémentation
- Définir les critères d'acceptation techniques
- Servir de référence pour les développeurs

## Entrées Requises

| Information | Source | Obligatoire |
|-------------|--------|-------------|
| Cadrage technique | `specification/cadrage-technique` | Oui |
| Modèle de données | `specification/modelisation-donnees` | Oui |
| Specs API | `specification/specification-api` | Si API |
| User stories | `web-dev-process/discovery/user-stories` | Recommandé |

## Structure d'une Spécification

### Par Fonctionnalité

```markdown
# SPEC-[ID] : [Nom de la Fonctionnalité]

## Métadonnées
| Champ | Valeur |
|-------|--------|
| ID | SPEC-XXX |
| Version | 1.0 |
| Statut | Draft / En review / Validé |
| Auteur | [Nom] |
| Date | [Date] |
| Priorité | P0 / P1 / P2 |

---

## 1. Résumé

### Description
[Description fonctionnelle en 2-3 phrases]

### User Story
> En tant que [persona],
> je veux [action],
> afin de [bénéfice].

### Critères d'Acceptation Fonctionnels
- [ ] [Critère 1]
- [ ] [Critère 2]

---

## 2. Spécifications Techniques

### 2.1 Architecture

[Diagramme ou description de l'architecture de la feature]

#### Composants Impliqués
| Composant | Rôle | Modifications |
|-----------|------|---------------|
| [Composant] | [Rôle] | Nouveau / Modifié |

### 2.2 Modèle de Données

#### Entités
[Référence vers modelisation-donnees ou détail]

#### Migrations Requises
```sql
-- Migration description
ALTER TABLE ...
```

### 2.3 API

[Référence vers specification-api ou détail]

### 2.4 Interface Utilisateur

#### Composants UI
| Composant | Type | Description |
|-----------|------|-------------|
| [Nom] | Nouveau / Existant | [Description] |

#### États de l'Interface
| État | Description | Déclencheur |
|------|-------------|-------------|
| Initial | ... | Page load |
| Loading | ... | Action utilisateur |
| Success | ... | Réponse OK |
| Error | ... | Réponse KO |

#### Wireframe / Mockup
[Lien Figma ou description]

### 2.5 Règles Métier

| ID | Règle | Implémentation |
|----|-------|----------------|
| R1 | [Description règle] | [Comment implémenter] |
| R2 | [Description règle] | [Comment implémenter] |

### 2.6 Validation & Erreurs

#### Validations
| Champ | Règle | Message d'erreur |
|-------|-------|------------------|
| [Champ] | [Règle] | [Message] |

#### Codes d'Erreur
| Code | Description | Action UI |
|------|-------------|-----------|
| ERR_XXX | [Description] | [Affichage] |

---

## 3. Sécurité

### Authentification
[Requis : Oui/Non, Type]

### Autorisations
| Rôle | Permissions |
|------|-------------|
| [Rôle] | [CRUD permissions] |

### Données Sensibles
| Donnée | Protection |
|--------|------------|
| [Donnée] | [Mesure] |

---

## 4. Performance

### Objectifs
| Métrique | Cible |
|----------|-------|
| Temps de réponse | < Xms |
| Taille payload | < X KB |

### Optimisations Prévues
- [Optimisation 1]
- [Optimisation 2]

---

## 5. Tests

### Scénarios de Test
| ID | Scénario | Résultat attendu | Type |
|----|----------|------------------|------|
| T1 | [Scénario] | [Résultat] | Unit / Integration / E2E |

### Données de Test
[Description des fixtures nécessaires]

---

## 6. Dépendances

### Dépendances Techniques
| Dépendance | Type | Statut |
|------------|------|--------|
| [Autre spec] | Bloquante / Liée | [Statut] |

### Librairies Requises
| Librairie | Version | Raison |
|-----------|---------|--------|
| [Lib] | X.Y | [Pourquoi] |

---

## 7. Critères d'Acceptation Techniques

- [ ] Tests unitaires couvrant X% du code
- [ ] Tests e2e pour le parcours principal
- [ ] Documentation API à jour
- [ ] Code review passée
- [ ] Performance validée
- [ ] Sécurité validée

---

## 8. Notes d'Implémentation

### Recommandations
- [Recommandation 1]
- [Recommandation 2]

### Points de Vigilance
- ⚠️ [Point d'attention]

### Questions Ouvertes
- [ ] [Question à résoudre]

---

## Historique

| Version | Date | Auteur | Changements |
|---------|------|--------|-------------|
| 1.0 | [Date] | [Nom] | Création |
```

## Processus de Rédaction

```
Cadrage validé
       │
       ▼
┌──────────────────┐
│ 1. Identifier    │
│    les features  │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ 2. Pour chaque   │
│    feature :     │
│    - Analyser    │
│    - Concevoir   │
│    - Rédiger     │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ 3. Croiser avec  │
│    modèle données│
│    et specs API  │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ 4. Review        │
│    technique     │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ 5. Validation    │
│    finale        │
└──────────────────┘
```

## Templates par Type de Feature

### Feature CRUD Standard

```markdown
## Entité : [Nom]

### Opérations
| Opération | Endpoint | Règles |
|-----------|----------|--------|
| Create | POST /api/[entités] | [Règles] |
| Read | GET /api/[entités]/:id | [Règles] |
| Update | PUT /api/[entités]/:id | [Règles] |
| Delete | DELETE /api/[entités]/:id | [Règles] |
| List | GET /api/[entités] | [Règles] |
```

### Feature d'Intégration

```markdown
## Intégration : [Nom du Service]

### Configuration
| Variable | Description | Obligatoire |
|----------|-------------|-------------|
| API_KEY | Clé API | Oui |

### Endpoints Utilisés
| Endpoint | Usage | Rate Limit |
|----------|-------|------------|
| [Endpoint] | [Usage] | [Limite] |

### Mapping de Données
| Donnée externe | Donnée interne |
|----------------|----------------|
| [Champ] | [Champ] |
```

### Feature Temps Réel

```markdown
## Feature Temps Réel : [Nom]

### Technologie
WebSocket / SSE / Polling

### Events
| Event | Payload | Déclencheur |
|-------|---------|-------------|
| [Event] | [Structure] | [Quand] |

### Gestion de Connexion
- Reconnexion automatique : Oui/Non
- Heartbeat : X secondes
```

## Références aux Skills Techniques

### Principes (web-dev-process)
| Aspect | Agent de référence |
|--------|-------------------|
| Architecture | `web-dev-process/design/architecture` |
| API Design | `web-dev-process/design/api-design` |
| UI/UX | `web-dev-process/design/ui-ux` |

### Implémentation WordPress
| Aspect | Agent de référence |
|--------|-------------------|
| CPT | `wordpress-gutenberg-expert/wp-core/custom-post-types` |
| Blocks | `wordpress-gutenberg-expert/gutenberg-blocks/*` |
| REST API | `wordpress-gutenberg-expert/wp-rest-api-expert` |

## Points d'Escalade

| Situation | Action |
|-----------|--------|
| Ambiguïté fonctionnelle | Retour project-management |
| Complexité excessive | Review architecture |
| Impact sécurité | Consultation securite/ |
| Impact performance | Consultation performance/ |
