# RGPD & Cookies

## RGPD - Protection des donnees

### Principes fondamentaux

Licite (base legale), Loyaute (transparence), Minimisation (necessaire uniquement), Exactitude (a jour), Limitation conservation (duree definie), Integrite (securite).

### Registre des traitements - Template

```markdown
## Traitement : [Nom]

| Champ | Valeur |
|-------|--------|
| Finalite | [pourquoi] |
| Base legale | [consentement/contrat/interet legitime] |
| Donnees collectees | [liste] |
| Personnes concernees | [utilisateurs/clients] |
| Destinataires | [internes/sous-traitants] |
| Transfert hors UE | [oui/non + garanties] |
| Duree conservation | [duree + justification] |
| Mesures securite | [chiffrement/acces] |
```

### Droits des personnes (delai reponse : 1 mois)

| Droit | Implementation |
|-------|----------------|
| Acces | Export donnees utilisateur |
| Rectification | Formulaire modification profil |
| Effacement | Suppression + anonymisation |
| Portabilite | Export JSON/CSV |
| Opposition | Opt-out marketing |
| Limitation | Gel du traitement |

### Criteres consentement valide

Libre (pas de prejudice si refus), Specifique (par finalite), Eclaire (information claire), Univoque (action positive, pas de case pre-cochee), Retirable (aussi facile qu'a donner).

### Durees de conservation types

| Donnee | Duree | Base |
|--------|-------|------|
| Prospect | 3 ans apres dernier contact | CNIL |
| Client | Duree contrat + 3 ans | Prescription |
| Factures | 10 ans | Obligation legale |
| Logs connexion | 1 an | LCEN |
| Cookies | 13 mois max | CNIL |

## Cookies

### Audit cookies - Procedure

1. Scanner le site (CookieBot, OneTrust, ou manuel)
2. Lister cookies first-party et third-party
3. Classifier par categorie, verifier duree (max 13 mois)
4. Documenter la finalite de chaque cookie

### Template audit cookies

```markdown
## Audit Cookies - [Site] | Scan : [date] | Outil : [nom]

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
| Affichage | Avant tout depot cookie non-essentiel |
| Refus | Aussi facile que l'acceptation |
| Granularite | Par categorie minimum |
| Modification | Lien accessible pour changer preferences |

### Implementation technique

1. Bloquer scripts non-essentiels au chargement
2. Afficher bandeau CMP, attendre choix utilisateur
3. Debloquer uniquement categories acceptees
4. Stocker consentement (cookie + log serveur)
5. Re-afficher a expiration (13 mois max)
