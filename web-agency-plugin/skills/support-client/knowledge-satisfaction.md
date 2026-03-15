# Knowledge Base & Satisfaction

## Base de connaissances

### Types de contenu

Criteres de creation : > 10 tickets/mois, resolution < 5 min, self-service possible.

| Type | Usage | Longueur |
|------|-------|----------|
| FAQ | Questions frequentes, reponse courte + details | 1-2 phrases |
| How-to | Tache simple, etapes numerotees | 300-500 mots |
| Tutorial | Processus complet avec screenshots | 800-1500 mots |
| Troubleshooting | Resolution problemes courants | Variable |

### Categories

| Categorie | Contenu type |
|-----------|-------------|
| Demarrage | Onboarding, premiers pas, configuration |
| Utilisation | Fonctionnalites, tutoriels, how-to |
| Troubleshooting | Problemes courants, solutions |
| Facturation | Paiements, factures, abonnements |
| Compte / API | Gestion compte, securite, doc technique |

### Structure article

```
# [Titre clair] — Applicable a: [produit] | MAJ: [date]
## Probleme/Question → ## Prerequis → ## Etapes (numerotees)
## Points d'attention → ## Problemes courants → ## Voir aussi
```

### Optimisation recherche

- **Tags** : mots-cles + synonymes (ex: "mot de passe", "password", "mdp", "reset")
- **Titres** : privilegier les termes recherches, ameliorer si CTR < 50%
- **Maillage** : liens entre articles connexes
- **Analyse** : suivre les recherches sans resultat → creer le contenu manquant

### Maintenance

| Action | Frequence |
|--------|-----------|
| Revue articles existants | Trimestrielle |
| Identification gaps (recherches sans resultat, tickets recurrents) | Mensuelle |
| MAJ apres release produit | A chaque release |
| Archivage articles obsoletes | Semestrielle |

Workflow : ticket recurrent → identifier gap → rediger (FAQ/article) → tagger → publier → mesurer.

---

## Satisfaction client

### NPS (Net Promoter Score)

0-6: Detracteurs | 7-8: Passifs | 9-10: Promoteurs. **NPS = %Promoteurs - %Detracteurs.**

| NPS | Interpretation | Action |
|-----|---------------|--------|
| > 50 | Excellent | Maintenir, collecter temoignages |
| 30-50 | Bon | Ameliorer points faibles |
| 0-30 | A ameliorer | Plan d'action prioritaire |
| < 0 | Critique | Intervention urgente |

### CSAT & CES

- **CSAT** : score 1-5. CSAT = (Nb satisfaits [4-5] / Total) x 100. Cible > 90%.
- **CES** (Customer Effort Score) : effort ressenti par le client. Cible < 3/5.

Enquete post-ticket (auto J+1) : note resolution (1-5), delai acceptable (Oui/Non), commentaire libre.

### Analyse par segment

| Segment | NPS cible | CSAT cible | Suivi |
|---------|-----------|------------|-------|
| Enterprise | > 60 | > 4.5 | Mensuel |
| SMB | > 40 | > 4.2 | Mensuel |
| Starter | > 30 | > 4.0 | Mensuel |

### Feedback loops

| Source | Metrique | Frequence |
|--------|----------|-----------|
| Tickets | Volume, categories, recurrence | Hebdo |
| NPS / CSAT | Score + verbatims | Mensuel |
| Knowledge base | Taux resolution self-service | Mensuel |
| SLA breaches | Taux de respect | Hebdo |
| Feedback agents | Retours terrain qualitatifs | Mensuel |

### Actions correctives (prioriser par impact haut / effort faible)

- Tickets recurrents → creer/ameliorer FAQ
- CSAT bas → former l'equipe sur les points faibles
- SLA non respectes → revoir capacite / staffing
- NPS detracteurs → appel individuel de recuperation
- Faible self-service → enrichir KB + optimiser recherche