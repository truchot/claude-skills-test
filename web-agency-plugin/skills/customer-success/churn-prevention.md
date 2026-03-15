# Churn Prevention - Référence condensée

## Taxonomie du Churn
- **Volontaire** : décision client (prix, valeur, concurrent, besoin disparu)
- **Involontaire** : échec paiement, carte expirée (20-40% du churn total, 80-90% récupérable)
- **Silencieux** : désengagement progressif sans signal explicite (le plus dangereux)

## Détection - 5 Catégories de Signaux

| Catégorie | Signaux clés | Sévérité |
|-----------|-------------|----------|
| Comportemental | Baisse usage >30%, export données, visite page annulation | CRITIQUE |
| Transactionnel | Échec paiement, downgrade, refus renouvellement | ÉLEVÉ |
| Explicite | NPS détracteur, plainte, demande annulation | CRITIQUE |
| Contextuel | Départ champion, M&A, restructuration | ÉLEVÉ |
| Communication | Baisse ouverture emails, non-réponse CSM | MODÉRÉ |

### Patterns combinés à surveiller
- **Silent Churner** : baisse usage + baisse engagement emails + pas de tickets
- **Frustrated User** : hausse tickets + NPS détracteur + usage maintenu
- **Price Shopper** : visite page pricing + recherche concurrents + demande devis
- **Champion Lost** : départ contact principal + changement interlocuteur + reset relation

## Scoring Model (0-100)

### Formule
`Score = Σ(poids_signal × sévérité × decay_temporel)`
- Decay : signal récent pèse plus (decay factor 0.95/jour)
- Recalcul : quotidien pour high-touch, hebdo pour low-touch

### Seuils de Risque
| Score | Niveau | SLA réponse | Action |
|-------|--------|-------------|--------|
| 0-20 | FAIBLE | Monitoring auto | Nurture standard |
| 21-40 | MODÉRÉ | 7 jours | Séquence re-engagement 21j |
| 41-60 | ÉLEVÉ | 48h | Intervention active CSM 14j |
| 61-80 | CRITIQUE | 24h | Save intensif 7j |
| 81-100 | IMMINENT | 4h | Last chance 3j + préparer offboarding |

## Playbooks par Niveau

### MODÉRÉ (21 jours)
J1 email valeur → J3 feature discovery → J7 check-in → J14 incentive → J21 bilan

### ÉLEVÉ (14 jours)
J1 appel découverte (diagnostic) → J3 plan action personnalisé → J7 suivi →
J10 escalade si pas d'amélioration → J14 décision (sauvé ou escalade CRITIQUE)

### CRITIQUE (7 jours)
J1 appel senior/manager → J2 offre retention ciblée → J4 suivi exécution →
J7 bilan : sauvé → monitoring renforcé 90j / échec → offboarding gracieux

### IMMINENT (3 jours)
J1 contact direct (tel + email) offre last chance → J2 escalade direction si stratégique →
J3 si échec : offboarding + enquête sortie + séquence win-back J30/J60/J90

## Offres de Rétention

### Matrice Segment × Raison
| Raison \ Segment | Starter | PME | Enterprise |
|-------------------|---------|-----|------------|
| Prix | -20% 3 mois | -15% 6 mois | Restructuration custom |
| Valeur insuffisante | Onboarding dédié | CSM assigné | Advisory + roadmap |
| Concurrent | Feature match + migration | Engagement prix 12m | Executive sponsor |
| Usage faible | Formation + setup | Audit usage | Consultant dédié |

### Principes offres
1. **Proportionnalité** : offre proportionnelle à la valeur client
2. **Conditionnalité** : engagement en échange (durée, usage, feedback)
3. **Durabilité** : résoudre la cause racine, pas juste un discount
4. Anti-pattern : offre panique sans diagnostic, discount illimité, discrimination

## Dunning (Churn Involontaire)

### Pré-dunning
- J-60 : vérifier cartes expirant bientôt
- J-30 : notification mise à jour moyen de paiement
- J-3 : rappel renouvellement imminent
- Activer Card Account Updater (mise à jour auto via réseau carte)

### Séquence post-échec (14 jours)
| Jour | Action | Canal |
|------|--------|-------|
| J0 | Retry #1 + notification échec | Email + in-app |
| J1 | Retry #2 (autre heure) | Auto |
| J3 | Email urgent + lien update | Email |
| J5 | Retry #3 + SMS | Email + SMS |
| J7 | Appel si high-value | Téléphone |
| J10 | Dernière chance | Email + in-app |
| J14 | Suspension compte (pas suppression) | Email |

### Smart Retry par Code Refus
- **Fonds insuffisants** : retry J+1, J+3, J+7 | **Carte expirée** : pas de retry, nouvelle carte
- **Refus banque** : retry J+2 puis contacter | **Fraude** : stop retry, contacter immédiatement

## Métriques Churn
- **Churn rate** = clients perdus / clients début période | **Revenue churn** = MRR perdu / MRR début
- **Coût** = LTV perdue + CAC remplacement + coût réputation
- **Cibles** : <5%/an B2B SaaS, <7% e-commerce, <10% B2C
