# Matrice de Positionnement Client

> **Triangle Projet** : Budget, Qualité, Délai - On ne peut maximiser que 2 sur 3.

## Principe Fondamental

```
        QUALITÉ
           △
          /|\
         / | \
        /  |  \
       /   |   \
      /    |    \
     /_____|_____\
  BUDGET ◄────► DÉLAI
```

**Règle d'or** : Le client choisit 2 priorités, la 3ème devient la variable d'ajustement.

---

## Matrice de Positionnement

### Profils Types

| Profil | Priorité 1 | Priorité 2 | Variable | Caractéristiques |
|--------|------------|------------|----------|------------------|
| **Startup MVP** | Délai | Budget | Qualité | Livraison rapide, budget serré, dette technique acceptable |
| **Enterprise** | Qualité | Budget | Délai | Standards élevés, ROI maîtrisé, planning flexible |
| **Urgence Marché** | Délai | Qualité | Budget | Time-to-market critique, pas de compromis qualité |
| **Artisan** | Qualité | Délai | Budget | Excellence technique, deadlines respectées |
| **Économique** | Budget | Délai | Qualité | Contrainte financière forte, MVP acceptable |
| **Premium** | Qualité | Budget | Délai | Haut de gamme, investissement justifié |

---

## Grille d'Évaluation Client

```yaml
positionnement_client:
  projet: "[Nom du projet]"
  date: "[Date]"

  # Le client attribue 100 points entre les 3 critères
  # Minimum 10 points par critère, maximum 60 points
  repartition:
    budget: 0      # /100 - Importance maîtrise coûts
    qualite: 0     # /100 - Importance excellence technique
    delai: 0       # /100 - Importance respect planning

  # Contraintes absolues (non négociables)
  contraintes:
    budget_max: null        # € - Plafond absolu
    date_limite: null       # Date - Deadline impérative
    exigences_qualite: []   # Standards obligatoires (RGPD, WCAG, etc.)

  # Flexibilités acceptées
  flexibilites:
    budget_flexible: false   # Peut-on dépasser de 10-20% ?
    delai_flexible: false    # Peut-on décaler de 1-2 semaines ?
    scope_flexible: false    # Peut-on réduire le périmètre ?
```

---

## Impact sur les Livrables

### Configuration par Profil

#### Profil "Startup MVP" (Délai + Budget)
```yaml
livrables:
  documentation: minimal      # README + inline comments
  tests: critiques_only       # Tests chemins critiques uniquement
  revue_code: automatisée     # Linters, pas de revue manuelle systématique
  accessibilité: a_basic      # WCAG niveau A minimum
  performance: acceptable     # Core Web Vitals "needs improvement" OK
  sécurité: owasp_top10       # Top 10 seulement
```

#### Profil "Enterprise" (Qualité + Budget)
```yaml
livrables:
  documentation: complète     # ADR, API docs, guides, runbooks
  tests: pyramide_complète    # Unit 80%+, integration, e2e
  revue_code: manuelle        # Revue par pair obligatoire
  accessibilité: aa           # WCAG niveau AA
  performance: optimale       # Core Web Vitals "good"
  sécurité: audit_complet     # OWASP + audit externe
```

#### Profil "Urgence Marché" (Délai + Qualité)
```yaml
livrables:
  documentation: essentielle  # API docs, déploiement
  tests: automatisés          # CI/CD avec gates qualité
  revue_code: rapide          # Revue async, merge si OK
  accessibilité: aa           # WCAG niveau AA
  performance: optimale       # Core Web Vitals "good"
  sécurité: owasp_complet     # OWASP complet
  # Note: Équipe renforcée = budget plus élevé
```

---

## Niveaux de Livrables

### Documentation

| Niveau | Contenu | Effort |
|--------|---------|--------|
| **minimal** | README, commentaires inline | 0.5j |
| **essentielle** | + API docs, guide déploiement | 1-2j |
| **complète** | + ADR, guides utilisateur, runbooks | 3-5j |
| **exhaustive** | + Formation, vidéos, wiki | 5-10j |

### Tests

| Niveau | Couverture | Effort |
|--------|------------|--------|
| **critiques_only** | Chemins critiques, 40% coverage | x1 |
| **automatisés** | Unit + integration, 60% coverage | x1.5 |
| **pyramide_complète** | Unit 80%+ , integration, e2e | x2 |
| **mutation_testing** | + Tests de mutation, 90%+ | x3 |

### Accessibilité

| Niveau | Standard | Effort |
|--------|----------|--------|
| **a_basic** | WCAG 2.1 niveau A | x1 |
| **aa** | WCAG 2.1 niveau AA | x1.5 |
| **aaa** | WCAG 2.1 niveau AAA | x2.5 |

### Performance

| Niveau | Core Web Vitals | Effort |
|--------|-----------------|--------|
| **acceptable** | "Needs improvement" | x1 |
| **optimale** | "Good" | x1.5 |
| **exceptionnelle** | Top 10% | x2.5 |

### Sécurité

| Niveau | Scope | Effort |
|--------|-------|--------|
| **owasp_top10** | Top 10 vulnérabilités | x1 |
| **owasp_complet** | OWASP ASVS niveau 1 | x1.5 |
| **audit_complet** | ASVS niveau 2 + audit externe | x3 |

---

## Processus de Positionnement

### 1. Questionnaire Initial

```markdown
## Questions de Cadrage

1. **Budget**
   - Avez-vous un budget défini ? [ ] Oui [ ] Non
   - Ce budget est-il : [ ] Ferme [ ] Indicatif [ ] Flexible +20%
   - Fourchette : ____________

2. **Délai**
   - Avez-vous une date de livraison cible ? [ ] Oui [ ] Non
   - Cette date est liée à : [ ] Événement [ ] Contrat [ ] Stratégie [ ] Aucune contrainte
   - Date souhaitée : ____________

3. **Qualité**
   - Secteur d'activité : ____________
   - Contraintes réglementaires : [ ] RGPD [ ] WCAG [ ] PCI-DSS [ ] Autre: ____
   - Niveau de criticité : [ ] Vitrine [ ] Business [ ] Mission critique

4. **Arbitrage**
   Si vous deviez choisir, vous préféreriez :
   [ ] Livrer vite quitte à améliorer après
   [ ] Livrer parfait quitte à prendre plus de temps
   [ ] Respecter le budget quitte à réduire le scope
```

### 2. Atelier de Positionnement

1. Présenter le triangle projet
2. Faire répartir 100 points (min 10, max 60 par critère)
3. Identifier les contraintes absolues
4. Valider les flexibilités acceptées
5. Déduire le profil et les niveaux de livrables

### 3. Validation Formelle

```yaml
validation_positionnement:
  client: "[Nom]"
  date: "[Date]"
  profil_retenu: "[Profil]"

  engagement_agence:
    - "Respecter les niveaux de livrables définis"
    - "Alerter si dérive détectée"
    - "Proposer arbitrages si nécessaire"

  engagement_client:
    - "Valider le positionnement choisi"
    - "Accepter les conséquences sur la variable d'ajustement"
    - "Décider rapidement en cas d'arbitrage"

  signatures:
    client: ________________
    agence: ________________
```

---

## Révision du Positionnement

Le positionnement peut être révisé :
- À chaque phase majeure du projet
- En cas de changement de contexte client
- Si les contraintes initiales évoluent

**Processus de révision** :
1. Identifier le changement de contexte
2. Réévaluer la répartition des 100 points
3. Recalculer les niveaux de livrables
4. Valider avec le client
5. Mettre à jour le contrat si nécessaire
