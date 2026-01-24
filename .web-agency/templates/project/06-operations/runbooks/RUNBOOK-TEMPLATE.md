# Runbook : {{RUNBOOK_TITLE}}

> **Dernière MAJ** : {{DATE}}
> **Auteur** : {{AUTHOR}}
> **Criticité** : 🔴 Haute | 🟡 Moyenne | 🟢 Basse

---

## 1. Quand utiliser ce runbook

### Symptômes

- {{SYMPTOM_1}}
- {{SYMPTOM_2}}
- {{SYMPTOM_3}}

### Alertes associées

| Alerte | Seuil | Source |
|--------|-------|--------|
| {{ALERT_1}} | {{THRESHOLD_1}} | {{SOURCE_1}} |

---

## 2. Évaluation initiale

### Vérifications rapides

```bash
# Vérifier le statut de l'application
{{CHECK_COMMAND_1}}

# Vérifier les logs récents
{{CHECK_COMMAND_2}}

# Vérifier les métriques
{{CHECK_COMMAND_3}}
```

### Questions à se poser

1. Depuis quand le problème existe-t-il ?
2. Y a-t-il eu un déploiement récent ?
3. Y a-t-il une corrélation avec un événement externe ?

---

## 3. Procédure de résolution

### Étape 1 : {{STEP_1_TITLE}}

**Action** :
```bash
{{STEP_1_COMMAND}}
```

**Résultat attendu** : {{STEP_1_EXPECTED}}

**Si échec** : Passer à l'étape alternative A

---

### Étape 2 : {{STEP_2_TITLE}}

**Action** :
```bash
{{STEP_2_COMMAND}}
```

**Résultat attendu** : {{STEP_2_EXPECTED}}

---

### Étape 3 : {{STEP_3_TITLE}}

**Action** :
```bash
{{STEP_3_COMMAND}}
```

---

## 4. Alternatives

### Alternative A : {{ALT_A_TITLE}}

Si l'étape 1 échoue :

```bash
{{ALT_A_COMMAND}}
```

### Alternative B : {{ALT_B_TITLE}}

En dernier recours :

```bash
{{ALT_B_COMMAND}}
```

---

## 5. Vérification post-résolution

### Checklist

- [ ] Service accessible
- [ ] Health checks OK
- [ ] Métriques normales
- [ ] Pas de nouvelles erreurs dans les logs

### Commandes de vérification

```bash
# Test de santé
{{VERIFY_COMMAND_1}}

# Vérification métriques
{{VERIFY_COMMAND_2}}
```

---

## 6. Communication

### Pendant l'incident

| Canal | Message |
|-------|---------|
| Slack #incidents | "🔴 Incident en cours : {{TITLE}}" |
| Status page | Update status |

### Après résolution

| Canal | Message |
|-------|---------|
| Slack #incidents | "✅ Résolu : {{TITLE}}" |
| Status page | Resolved |
| Client (si impacté) | Email de notification |

---

## 7. Post-mortem

Après chaque incident, remplir :

- **Durée** : De {{START}} à {{END}}
- **Impact** : {{IMPACT}}
- **Root cause** : {{ROOT_CAUSE}}
- **Actions préventives** : {{PREVENTIVE_ACTIONS}}

Template post-mortem : [Lien](./POST-MORTEM-TEMPLATE.md)

---

## 8. Contacts

| Rôle | Nom | Contact | Quand contacter |
|------|-----|---------|-----------------|
| On-call | {{ONCALL}} | {{PHONE}} | Toujours |
| Tech Lead | {{TL}} | {{TL_CONTACT}} | Si > 30min |
| Management | {{MGR}} | {{MGR_CONTACT}} | Si impact client |

---

## 9. Historique d'utilisation

| Date | Utilisateur | Durée résolution | Notes |
|------|-------------|------------------|-------|
| {{DATE}} | {{USER}} | {{DURATION}} | {{NOTES}} |

---

## 10. Ressources

- [Documentation système]({{DOC_URL}})
- [Dashboard monitoring]({{MONITORING_URL}})
- [Logs]({{LOGS_URL}})
