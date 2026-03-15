# Templates de reponse

## Accuse de reception - Nouveau projet

```
Objet: Confirmation de reception - Votre projet [type]

Bonjour [Prenom],

Merci pour votre demande concernant [resume_projet].
Nous avons bien recu votre message et notre equipe va l'analyser.

**Prochaines etapes :**
1. Analyse de votre demande par notre equipe
2. Prise de contact sous [delai] pour un appel decouverte
3. Proposition personnalisee suite a notre echange

Reference : [intake_id]
```

## Accuse de reception - Demande de devis

```
Objet: Votre demande de devis - [type_projet]

Bonjour [Prenom],

Nous avons bien recu votre demande de devis pour [resume].
Notre equipe commerciale vous contactera sous [delai] heures.

Reference : [intake_id]
```

## Accuse de reception - Support

```
Objet: Ticket [intake_id] - Votre demande de support

Bonjour [Prenom],

Votre demande de support a ete enregistree (ref: [intake_id]).
Niveau de priorite : [P1-P4]
Delai de reponse estime : [SLA]

Notre equipe technique prend en charge votre demande.
```

## Demande de clarification

```
Objet: Precision sur votre demande - [intake_id]

Bonjour [Prenom],

Merci pour votre message. Pour mieux comprendre votre besoin,
pourriez-vous nous preciser :

[questions_specifiques]

Ces informations nous permettront de vous proposer
la solution la plus adaptee.
```

## Rejet poli (hors scope)

```
Objet: Re: [sujet_original]

Bonjour [Prenom],

Merci de votre interet. Apres analyse, votre demande sort
du perimetre de nos services ([raison]).

Nous vous recommandons de contacter [alternative].
N'hesitez pas a revenir vers nous pour tout projet web.
```

## Notification de statut

```
Objet: Mise a jour - [intake_id]

Bonjour [Prenom],

Votre demande [intake_id] est passee au statut : [statut].
[details_specifiques]

Prochaine etape : [next_action]
```

## Delais de reponse par type

| Type demande | Accuse reception | Reponse complete |
|-------------|-----------------|-----------------|
| Nouveau projet | < 5 min (auto) | < 24h |
| Devis | < 5 min (auto) | < 48h |
| Support P1 | < 5 min (auto) | < 1h |
| Support P2-P3 | < 5 min (auto) | < 8h |
| Information | < 5 min (auto) | < 24h |

## Regles de personnalisation

- Utiliser le prenom si disponible, sinon "Madame, Monsieur"
- Adapter le ton : formel pour entreprise, semi-formel pour startup
- Inclure toujours la reference intake_id
- Mentionner le delai de reponse concret
- Si P1/P2 : ajouter numero de telephone direct
- Si > 50k : signature du directeur commercial

## Variables disponibles

| Variable | Source |
|----------|--------|
| `[Prenom]` | stakeholder-identifier |
| `[type]` | intent-classifier |
| `[resume_projet]` | requirements-extractor |
| `[delai]` | urgency-detector |
| `[intake_id]` | systeme |
| `[SLA]` | urgency-detector |
