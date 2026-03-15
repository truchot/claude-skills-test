# Editorial Workflow - Référence condensée

## Workflow de publication

### Statuts et transitions
```
Draft → Review → Approved → Scheduled → Published → Archived
  ↓        ↓         ↓
Deleted  Rejected   On Hold
```

### Règles de transition
| De → Vers            | Condition             | Notification     |
|----------------------|-----------------------|------------------|
| Draft → Review       | Contenu complet       | Reviewer         |
| Review → Approved    | Validation reviewer   | Approver         |
| Review → Rejected    | Refus motivé          | Auteur (retour)  |
| Approved → Scheduled | Date définie          | Publication auto |
| Scheduled → Published| Date atteinte         | Content team     |

### Rôles et permissions
| Rôle     | Créer | Éditer | Soumettre | Valider | Publier | Supprimer |
|----------|-------|--------|-----------|---------|---------|-----------|
| Author   | x     | x      | x         |         |         |           |
| Reviewer |       | x      |           | x       |         |           |
| Editor   | x     | x      | x         | x       | x       |           |
| Admin    | x     | x      | x         | x       | x       | x         |

## Calendrier éditorial

### Types de contenu
| Type         | Couleur | Lead time |
|--------------|---------|-----------|
| Article blog | Bleu    | 14 jours  |
| Newsletter   | Vert    | 7 jours   |
| Social post  | Orange  | 3 jours   |
| Landing page | Violet  | 21 jours  |

### Métriques planning
| Métrique            | Cible  |
|---------------------|--------|
| Respect deadlines   | > 90%  |
| Fill rate créneaux  | > 80%  |
| Lead time moyen     | 14j    |
| Taux de report      | < 15%  |

## Publication

### Fenêtres optimales (Europe/Paris)
| Contenu    | Jour    | Heure | Canal  |
|------------|---------|-------|--------|
| Blog B2B   | Mar-Jeu | 10h00 | Site   |
| Newsletter | Mardi   | 10h30 | Email  |
| LinkedIn   | Mar-Jeu | 08h00 | Social |
| X/Twitter  | Lun-Ven | 12h00 | Social |

### Checklist pré-publication
- [ ] Titre optimisé SEO (< 60 car.)
- [ ] Meta description (< 155 car.)
- [ ] Images avec alt text
- [ ] Liens internes vérifiés
- [ ] CTA présent + relecture ortho
- [ ] Preview mobile testée
- [ ] URL slug propre, redirections OK
- [ ] UTMs + tracking events configurés
- [ ] Sitemap mis à jour

### Gestion erreurs publication
| Erreur           | Action              | Escalade             |
|------------------|---------------------|----------------------|
| Timeout serveur  | Retry 3x (backoff)  | DevOps après 3 échecs|
| Assets manquants | Bloquer publication | Retour workflow      |
| CDN indisponible | Queue retry         | DevOps immédiat      |

## Rédaction - Structure article SEO
```
H1 (keyword) → Intro (hook, 150 mots)
  H2 → Section principale
    H3 → Sous-section
  H2 → FAQ (longue traîne)
  Conclusion + CTA
```

### SEO on-page checklist
- [ ] Keyword dans H1, URL, meta title, 1er paragraphe
- [ ] Densité keyword 1-2%, H2/H3 avec variantes
- [ ] Images nommées avec keyword + alt text
- [ ] Schema markup si pertinent
- [ ] Canonical URL définie
