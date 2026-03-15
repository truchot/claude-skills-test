# RGPD & Cookies

## RGPD - Protection des donnees

### Principes fondamentaux

| Principe | Description |
|----------|-------------|
| Licite | Base legale pour chaque traitement |
| Loyaute | Transparence envers les personnes |
| Minimisation | Ne collecter que le necessaire |
| Exactitude | Donnees a jour |
| Limitation conservation | Duree definie par finalite |
| Integrite | Securite des donnees |

### Registre des traitements - Template

```markdown
## Traitement : [Nom]

| Champ | Valeur |
|-------|--------|
| Finalite | [pourquoi] |
| Base legale | [consentement/contrat/interet legitime/...] |
| Donnees collectees | [liste] |
| Personnes concernees | [utilisateurs/clients/...] |
| Destinataires | [internes/sous-traitants] |
| Transfert hors UE | [oui/non + garanties] |
| Duree conservation | [duree + justification] |
| Mesures securite | [chiffrement/acces/...] |
```

### Droits des personnes (a implementer)

| Droit | Delai reponse | Implementation |
|-------|--------------|----------------|
| Acces | 1 mois | Export donnees utilisateur |
| Rectification | 1 mois | Formulaire modification profil |
| Effacement | 1 mois | Suppression + anonymisation |
| Portabilite | 1 mois | Export JSON/CSV |
| Opposition | 1 mois | Opt-out marketing |
| Limitation | 1 mois | Gel du traitement |

### Criteres consentement valide

| Critere | Exigence |
|---------|----------|
| Libre | Pas de prejudice si refus |
| Specifique | Par finalite distincte |
| Eclaire | Information claire et accessible |
| Univoque | Action positive (pas de case pre-cochee) |
| Retirable | Aussi facile a retirer qu'a donner |

### Durees de conservation types

| Donnee | Duree | Base |
|--------|-------|------|
| Donnees prospect | 3 ans apres dernier contact | CNIL |
| Donnees client | Duree contrat + 3 ans | Prescription |
| Factures | 10 ans | Obligation legale |
| Logs connexion | 1 an | LCEN |
| Cookies | 13 mois max | CNIL |

## Cookies

### Audit cookies - Procedure

1. Scanner le site avec outil (CookieBot, OneTrust, ou manuel)
2. Lister tous les cookies first-party et third-party
3. Classifier chaque cookie par categorie
4. Verifier duree de vie (max 13 mois)
5. Documenter la finalite de chaque cookie

### Template audit cookies

```markdown
## Audit Cookies - [Site]

### Scan : [date] | Outil : [nom]

### Cookies first-party
| Nom | Categorie | Duree | Finalite |
|-----|-----------|-------|----------|

### Cookies third-party
| Nom | Fournisseur | Categorie | Duree | Finalite |
|-----|-------------|-----------|-------|----------|

### Non-conformites
| Probleme | Severite | Remediation |
|----------|----------|-------------|
```

### Specification bandeau cookies

| Exigence | Detail |
|----------|--------|
| Affichage | Avant tout depot de cookie non-essentiel |
| Refus | Aussi facile que l'acceptation |
| Granularite | Par categorie minimum |
| Persistance | Choix memorise (cookie de consentement) |
| Modification | Lien accessible pour changer les preferences |
| Information | Lien vers politique cookies |

### Implementation technique

```
1. Bloquer tous les scripts non-essentiels au chargement
2. Afficher le bandeau CMP
3. Attendre le choix utilisateur
4. Debloquer uniquement les categories acceptees
5. Stocker le consentement (cookie + log serveur)
6. Re-afficher le bandeau a expiration (13 mois max)
```
