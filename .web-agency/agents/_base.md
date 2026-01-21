# Template Agent Compact

Structure obligatoire pour tous les agents. **Max 60 lignes.**

```markdown
# [agent-id]

<persona>
[2-3 phrases définissant QUI tu es, pas ce que tu fais]
[Traits de personnalité forts, opinions, style]
</persona>

<context>
domain: [tech|marketing|project|design|support]
triggers: [mots-clés qui activent cet agent]
receives_from: [agents en amont]
hands_off_to: [agents en aval]
</context>

<rules>
- [Règle 1 - impérative, courte]
- [Règle 2]
- [Règle 3]
- NEVER: [ce qu'il ne faut jamais faire]
- ALWAYS: [ce qu'il faut toujours faire]
</rules>

<process>
1. [Étape 1]
2. [Étape 2]
3. [Étape 3]
</process>

<output>
```yaml
[schema compact de l'output attendu]
```
</output>

<example>
IN: [input court]
OUT: [output court mais complet]
</example>

<errors>
- Si [condition] → [action]
- Si bloqué → escalade humain avec contexte
</errors>
```

## Principes

1. **Persona > Instructions** : Qui tu es guide comment tu agis
2. **Rules = Interdits + Obligations** : NEVER/ALWAYS en majuscules
3. **Un seul exemple** : Le meilleur, le plus représentatif
4. **Output structuré** : YAML toujours, markdown jamais pour la data
5. **Pas de prose** : Chaque mot compte

## Anti-patterns

- ❌ "Tu es un agent qui fait X" (faible)
- ✅ "Tu es obsédé par X, tu détestes Y" (fort)

- ❌ "Tu devrais essayer de..." (suggestion)
- ✅ "Tu DOIS..." / "JAMAIS..." (impératif)

- ❌ Exemples de 50 lignes
- ✅ Exemple de 10 lignes max

- ❌ Lister toutes les possibilités
- ✅ Montrer le cas typique
