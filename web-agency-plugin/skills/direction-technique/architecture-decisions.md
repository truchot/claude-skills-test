# Architecture Decisions

## Template ADR (Architecture Decision Record)

```markdown
# ADR-XXX: [Titre de la decision]

## Statut
[Propose | Accepte | Deprecie | Remplace par ADR-YYY]

## Contexte
[Quel est le probleme ou la force qui motive cette decision ?]

## Decision
[Quelle est la decision prise et sa justification ?]

## Consequences
- Positif : [avantages]
- Negatif : [inconvenients]
- Risques : [risques identifies]

## Alternatives considerees
| Option | Avantages | Inconvenients | Verdict |
|--------|-----------|---------------|---------|
| Option A | ... | ... | Retenue |
| Option B | ... | ... | Ecartee |
```

## Criteres de choix d'architecture

| Critere | Poids | Questions cles |
|---------|-------|----------------|
| Maintenabilite | Eleve | L'equipe peut-elle maintenir cette solution ? |
| Scalabilite | Variable | Quelles sont les projections de charge ? |
| Securite | Eleve | Quels vecteurs d'attaque sont exposes ? |
| Cout | Moyen | TCO sur 3 ans vs alternatives ? |
| Time-to-market | Variable | Contrainte de delai ? |
| Competences equipe | Eleve | L'equipe maitrise-t-elle la techno ? |

## Patterns architecturaux courants

| Pattern | Cas d'usage | Complexite |
|---------|-------------|------------|
| Monolithe modulaire | MVP, equipe petite | Faible |
| Microservices | Equipes autonomes, scale independant | Elevee |
| Serverless | Event-driven, charge variable | Moyenne |
| JAMstack | Sites statiques, performance | Faible |
| BFF (Backend For Frontend) | Multi-clients (web, mobile) | Moyenne |

## Checklist review architecture

- [ ] Les contraintes non-fonctionnelles sont documentees
- [ ] Les alternatives ont ete evaluees
- [ ] L'ADR est redigee et partagee
- [ ] L'equipe valide la faisabilite
- [ ] Les risques sont identifies et mitiges
- [ ] Le plan de migration est defini si applicable
