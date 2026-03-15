# Editorial Workflow - Référence condensée

## Workflow de publication

### Statuts et transitions
```
Draft → Review → Approved → Scheduled → Published → Archived
  ↓        ↓         ↓
Deleted  Rejected   On Hold
```

### Règles de transition

| De → Vers       | Condition requise              | Notification       |
|------------------|-------------------------------|-------------------|
| Draft → Review   | Contenu complet               | Reviewer           |
| Review → Approved| Validation reviewer           | Approver           |
| Review → Rejected| Refus motivé                  | Auteur (retour)    |
| Approved → Scheduled| Date définie               | Publication auto   |
| Scheduled → Published| Date atteinte             | Content team       |
| Published → Archived| Durée expirée              | Auto               |

### Rôles et permissions

| Rôle     | Créer | Éditer | Soumettre | Valider | Publier | Supprimer |
|----------|-------|--------|-----------|---------|---------|-----------|
| Author   | x     | x      | x         |         |         |           |
| Reviewer |       | x      |           | x       |         |           |
| Editor   | x     | x      | x         | x       | x       |           |
| Admin    | x     | x      | x         | x       | x       | x         |

## Calendrier éditorial

### Structure entrée calendrier
```json
{
  "title": "Guide SEO 2026",
  "type": "article",
  "dates": {
    "brief_due": "J-10",
    "draft_due": "J-5",
    "review_due": "J-3",
    "publish_date": "J"
  },
  "assignees": { "writer": "", "reviewer": "", "approver": "" },
  "channels": ["blog", "newsletter", "linkedin"],
  "priority": "high"
}
```

### Types de contenu (code couleur)
| Type         | Couleur | Lead time |
|--------------|---------|-----------|
| Article blog | Bleu    | 14 jours  |
| Newsletter   | Vert    | 7 jours   |
| Social post  | Orange  | 3 jours   |
| Landing page | Violet  | 21 jours  |
| Webinar      | Rouge   | 30 jours  |

### Métriques planning
| Métrique            | Cible  |
|---------------------|--------|
| Respect deadlines   | > 90%  |
| Fill rate créneaux  | > 80%  |
| Lead time moyen     | 14j    |
| Taux de report      | < 15%  |

## Publication

### Fenêtres optimales (Europe/Paris)

| Contenu     | Jour      | Heure | Canal          |
|-------------|-----------|-------|----------------|
| Blog B2B    | Mar-Jeu   | 10h00 | Site           |
| Blog B2C    | Sam-Dim   | 09h00 | Site           |
| Newsletter  | Mardi     | 10h30 | Email          |
| LinkedIn    | Mar-Jeu   | 08h00 | Social         |
| X/Twitter   | Lun-Ven   | 12h00 | Social         |

### Checklist pré-publication

**Contenu**
- [ ] Titre optimisé SEO (< 60 car.)
- [ ] Meta description (< 155 car.)
- [ ] Images avec alt text
- [ ] Liens internes vérifiés
- [ ] CTA présent
- [ ] Relecture orthographique
- [ ] Preview mobile testée

**Technique**
- [ ] URL slug propre
- [ ] Redirections configurées
- [ ] Cache invalidé
- [ ] Sitemap mis à jour
- [ ] UTMs configurés
- [ ] Tracking events actifs

### Gestion des erreurs publication

| Erreur            | Action                  | Escalade              |
|-------------------|-------------------------|-----------------------|
| Timeout serveur   | Retry 3x (backoff)     | DevOps après 3 échecs|
| Conflit URL       | Suffixe auto           | Notifier auteur       |
| Assets manquants  | Bloquer publication    | Retour workflow       |
| CDN indisponible  | Queue retry            | DevOps immédiat       |

## Rédaction - Patterns

### Article : structure type
```
H1 (keyword) → Intro (hook, 150 mots)
  H2 → Section principale
    H3 → Sous-section
  H2 → Section suivante
  H2 → FAQ (longue traîne)
  Conclusion + CTA
```

### SEO on-page checklist
- [ ] Keyword dans H1, URL, meta title
- [ ] Keyword dans 1er paragraphe
- [ ] Densité keyword 1-2%
- [ ] H2/H3 avec variantes sémantiques
- [ ] Images nommées avec keyword + alt
- [ ] Schema markup si pertinent
- [ ] Canonical URL définie
