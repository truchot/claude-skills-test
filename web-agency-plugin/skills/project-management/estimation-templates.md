# Estimation Templates

## T-shirt Sizing (Estimation macro)

| Taille | Jours | Budget indicatif | Exemple |
|--------|-------|------------------|---------|
| XS | 1-2j | 1-2k | Landing page simple |
| S | 3-5j | 3-5k | Site vitrine 5 pages |
| M | 10-20j | 10-20k | Site corporate + blog |
| L | 20-40j | 20-40k | E-commerce standard |
| XL | 40-80j | 40-80k | Plateforme sur mesure |
| XXL | 80j+ | 80k+ | Application complexe |

## Grille d'estimation detaillee

```markdown
## Estimation - [Nom du projet]

### Informations
- **Client** : [nom]
- **Date** : [date]
- **Estimateur** : [nom]
- **Methode** : [T-shirt / Points / Jours]

### Decomposition

| Poste | Tache | Min | Moy | Max | Risque |
|-------|-------|-----|-----|-----|--------|
| Cadrage | Brief + specs | | | | |
| Design | Maquettes | | | | |
| Dev Front | Integration | | | | |
| Dev Back | API + logique | | | | |
| Tests | QA + recette | | | | |
| Deploy | MEP + config | | | | |
| PM | Coordination | | | | |
| **TOTAL** | | | | | |

### Coefficients
- Complexite technique : x[1.0-1.5]
- Incertitude specs : x[1.0-1.3]
- Buffer risque : +[10-30]%

### Total estime
- **Optimiste** : [min] jours
- **Realiste** : [moy] jours
- **Pessimiste** : [max] jours
```

## Template proposition commerciale

```markdown
## Proposition - [Projet]

### Contexte et objectifs
[Resume du besoin client]

### Perimetre
- Inclus : [liste]
- Exclus : [liste]

### Planning previsionnel
| Phase | Duree | Livrables |
|-------|-------|-----------|
| Phase 1 | Xj | ... |
| Phase 2 | Xj | ... |

### Budget
| Poste | Montant HT |
|-------|-----------|
| Conception | X EUR |
| Developpement | X EUR |
| **Total** | **X EUR** |

### Conditions
- Paiement : [echeancier]
- Validite : 30 jours
- Hors perimetre : [exclusions]
```

## Checklist avant envoi

- [ ] Brief client compris et reformule
- [ ] Toutes les fonctionnalites listees
- [ ] Risques identifies et chiffres
- [ ] Buffer de securite applique (20-30%)
- [ ] Planning coherent avec les ressources
- [ ] Conditions de paiement definies
- [ ] Exclusions clairement listees
- [ ] Relecture par un pair
