# Design Strategy & UX - Condensed

## Vision Design

| Composant | Contenu | Livrable |
|-----------|---------|----------|
| Vision creative | Direction, moodboards, ambition | Vision statement |
| Principes design | 5-7 principes directeurs | Matrice de decision |
| Design System | Architecture, portee, gouvernance | Plan DS |
| Innovation | Veille tendances, experimentation | Rapport veille |

## Principes Design - Framework

### Definition (5-7 principes)
Chaque principe doit avoir :
- **Nom** court et memorable
- **Description** en 1-2 phrases
- **Exemple** d'application concrete
- **Contre-exemple** (ce que ce n'est PAS)

### Matrice de Decision
Quand 2 principes entrent en conflit, la hierarchie tranche :
```
1. Accessibilite > Esthetique
2. Clarte > Originalite
3. Performance > Richesse visuelle
4. Coherence > Cas particulier
```

## Design System Strategy

| Phase | Actions | Livrable |
|-------|---------|----------|
| Scope | Definir perimetre (tokens, composants, patterns) | Document de cadrage |
| Architecture | Choisir structure (atomic, modulaire) | Schema architecture |
| Rollout | Planifier deploiement progressif | Roadmap DS |
| Gouvernance | Regles contribution, validation, versioning | Guide contribution |

## Strategie UX

### Recherche UX - Plan
| Methode | Quand | Livrable |
|---------|-------|----------|
| Interviews utilisateurs | Discovery | Synthese besoins |
| Tests utilisabilite | Prototype, pre-launch | Rapport + recommandations |
| Analytics quantitatif | Post-launch | Dashboard comportemental |
| A/B testing | Optimisation | Resultats + decisions |

### Parcours Utilisateur
- Definir parcours cibles (happy path)
- Identifier moments de verite (conversion, friction)
- Fixer objectifs par etape (taux, temps, satisfaction)
- Concevoir la vision ideale vs etat actuel

### Principes UX (5-7)
Exemples types :
1. **Simplicite** : Reduire la charge cognitive
2. **Feedback** : Informer l'utilisateur a chaque action
3. **Coherence** : Memes patterns = memes interactions
4. **Efficacite** : Minimiser les etapes pour atteindre l'objectif
5. **Inclusivite** : Accessible a tous les profils

## Accessibilite - Strategie

| Niveau | Standard | Perimetre |
|--------|----------|-----------|
| A | WCAG 2.1 A | Minimum legal |
| AA | WCAG 2.1 AA | Cible recommandee |
| AAA | WCAG 2.1 AAA | Excellence (selon contexte) |

### Checklist cle
- [ ] Niveau de conformite cible defini
- [ ] Contrastes couleurs valides (4.5:1 texte, 3:1 UI)
- [ ] Navigation clavier fonctionnelle
- [ ] Textes alternatifs sur tous les medias
- [ ] Hierarchie de titres coherente
- [ ] Formulaires accessibles (labels, erreurs)

## Guidelines & Standards

### Composants
- Nommage : PascalCase, semantique (ex: `CardProduct`)
- Etats : default, hover, active, focus, disabled, error
- Variantes : taille (sm/md/lg), couleur (primary/secondary)
- Documentation : usage, props, exemples, do's/don'ts

### Criteres Qualite Design
- [ ] Alignement grille respecte
- [ ] Couleurs de la palette uniquement
- [ ] Typo conforme a la hierarchie
- [ ] Composants du DS utilises (pas de custom)
- [ ] Responsive valide (mobile, tablet, desktop)
- [ ] Etats interactifs tous definis

### Style Guide
- Documenter chaque style visuel avec exemple
- Regles d'usage par contexte (web, mobile, email)
- Versionner et maintenir a jour

## Brief Creatif - Template

```
Projet : [nom]
Objectif : [quoi resoudre]
Cible : [personas concernes]
Contraintes : [techniques, marque, delai]
References : [inspirations, benchmarks]
Livrables attendus : [formats, nombre]
Criteres de validation : [checklist]
```
