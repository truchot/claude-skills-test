---
name: gestion-incidents
description: Gestion des incidents en production selon les bonnes pratiques
---

# Gestion des Incidents

Tu gères les **incidents en production** de manière structurée pour minimiser l'impact et restaurer le service.

## Classification des Incidents

### Matrice de Sévérité

| Sévérité | Impact | Exemples |
|----------|--------|----------|
| **P1 - Critique** | Service complètement down | Site inaccessible, perte de données |
| **P2 - Majeur** | Fonctionnalité majeure impactée | Paiements KO, login impossible |
| **P3 - Modéré** | Fonctionnalité secondaire | Export PDF cassé, lenteurs |
| **P4 - Mineur** | Impact limité | Bug cosmétique, edge case |

### Critères de Priorité

```
                    Impact Utilisateurs
                    Low    Medium    High
Urgence    High     P3       P2       P1
           Medium   P4       P3       P2
           Low      P4       P4       P3
```

## Processus de Gestion

### Cycle de Vie

```
Detection → Triage → Investigation → Mitigation → Resolution → Post-Mortem
    │         │           │              │            │            │
    ▼         ▼           ▼              ▼            ▼            ▼
  Alerte   Classify    Debug        Restore      Fix Root      Document
           Assign                   Service       Cause        Learn
```

### Phase 1: Détection

| Source | Type |
|--------|------|
| Monitoring | Alertes automatiques (CPU, erreurs, latence) |
| Utilisateurs | Tickets support, signalements |
| Équipe | Observation lors de tests |
| Partenaires | Signalement API down |

### Phase 2: Triage

```markdown
## Checklist Triage

1. [ ] Confirmer que c'est un vrai incident (pas false positive)
2. [ ] Évaluer l'impact (scope, utilisateurs, business)
3. [ ] Assigner la sévérité (P1-P4)
4. [ ] Identifier l'Incident Commander
5. [ ] Créer le canal de communication (#incident-YYYY-MM-DD)
6. [ ] Notifier les parties prenantes appropriées
```

### Phase 3: Investigation & Mitigation

| Action | Objectif |
|--------|----------|
| Containment | Limiter la propagation |
| Mitigation | Restaurer le service (workaround OK) |
| Root Cause | Identifier la vraie cause |
| Fix | Résoudre définitivement |

## Rôles Incident Response

### RACI

| Rôle | Responsabilité |
|------|----------------|
| **Incident Commander (IC)** | Coordonne, décide, communique |
| **Tech Lead** | Investigation technique |
| **Communicator** | Updates stakeholders |
| **Scribe** | Documente la timeline |
| **Subject Matter Expert** | Expertise domaine spécifique |

### Incident Commander

```markdown
## Responsabilités IC

- Déclarer le début et la fin de l'incident
- Coordonner les efforts de résolution
- Prendre les décisions de priorisation
- Autoriser les actions risquées
- Assurer la communication régulière
- Décider quand escalader
```

## Communication

### Template Notification Initiale

```markdown
🚨 **INCIDENT P1 - [Titre Court]**

**Statut**: En cours d'investigation
**Début**: HH:MM UTC
**Impact**: [Description impact utilisateurs]
**Affectés**: [Scope - tous, région, segment]

**Équipe assignée**: @on-call @tech-lead
**Canal**: #incident-2024-01-15

Prochain update dans 15 minutes.
```

### Template Update

```markdown
📊 **UPDATE INCIDENT P1 - [Titre]**

**Statut**: [En cours / Mitigé / Résolu]
**Durée**: Xh Xmin

**Progrès**:
- 10:15 - Cause identifiée : [cause]
- 10:20 - Mitigation en cours : [action]

**Prochaines étapes**: [actions planifiées]

Prochain update dans [X] minutes.
```

### Template Résolution

```markdown
✅ **RÉSOLU - INCIDENT P1 - [Titre]**

**Durée totale**: Xh Xmin
**Cause**: [résumé cause racine]
**Résolution**: [action qui a résolu]

**Impact final**:
- Utilisateurs affectés: ~X
- Durée d'indisponibilité: Xh Xmin

Post-mortem prévu: [date]
```

## Runbooks

### Structure

```markdown
# Runbook: [Nom du Scénario]

## Symptômes
- Alerte X déclenchée
- Logs montrent Y
- Utilisateurs rapportent Z

## Diagnostic Rapide

\`\`\`bash
# Vérifier le service
curl -I https://api.example.com/health

# Vérifier les logs
kubectl logs -f deployment/api --tail=50

# Vérifier la DB
psql -c "SELECT count(*) FROM pg_stat_activity;"
\`\`\`

## Actions de Mitigation

### Option 1: Restart Service
\`\`\`bash
kubectl rollout restart deployment/api
kubectl rollout status deployment/api
\`\`\`

### Option 2: Rollback
\`\`\`bash
kubectl rollout undo deployment/api
\`\`\`

### Option 3: Scale Up
\`\`\`bash
kubectl scale deployment/api --replicas=5
\`\`\`

## Vérification

\`\`\`bash
# Confirmer le retour à la normale
curl https://api.example.com/health
# Vérifier les métriques dans Grafana
\`\`\`

## Escalade

Si non résolu après 15 minutes:
- Escalader à @tech-lead
- Contacter le support [fournisseur]
```

## Outils

### PagerDuty / OpsGenie

```yaml
# Configuration alerte
alert:
  name: High Error Rate
  condition: error_rate > 1%
  duration: 5m
  severity: P2
  notify:
    - on-call-primary
    - slack:#alerts
  runbook: https://wiki.example.com/runbooks/high-error-rate
```

### Slack Integration

```typescript
// Incident bot commands
/incident create "API Down" P1
/incident update "Identified - DB connection pool exhausted"
/incident resolve "Fixed - Increased pool size"
/incident postmortem create
```

## War Room (P1)

### Setup

```markdown
## Checklist War Room

- [ ] Créer le bridge call (Zoom/Meet permanent)
- [ ] Inviter IC, Tech Lead, SMEs
- [ ] Partager le lien dans #incident
- [ ] Scribe prêt à documenter
- [ ] Dashboard monitoring partagé
- [ ] Accès aux environnements confirmés
```

### Règles

| Règle | Raison |
|-------|--------|
| IC mène les discussions | Éviter le chaos |
| Un speaker à la fois | Clarté |
| Focus sur la mitigation d'abord | Restaurer le service |
| Pas de blame | Psychologie sécurité |
| Documenter en temps réel | Post-mortem facilité |

## Métriques

### KPIs Incident Management

| Métrique | Définition | Cible |
|----------|------------|-------|
| **MTTA** | Mean Time To Acknowledge | < 5 min |
| **MTTD** | Mean Time To Detect | < 2 min |
| **MTTR** | Mean Time To Resolve | P1: < 1h |
| **MTBF** | Mean Time Between Failures | > 30 jours |

### Tracking

```sql
-- Dashboard incidents
SELECT
  date_trunc('month', created_at) as month,
  severity,
  count(*) as total,
  avg(extract(epoch from resolved_at - created_at)/60) as avg_mttr_minutes
FROM incidents
WHERE created_at > now() - interval '6 months'
GROUP BY 1, 2
ORDER BY 1 DESC, 2;
```

## Points d'Escalade

| Situation | Action |
|-----------|--------|
| P1 > 30 min sans mitigation | Escalade management |
| Besoin rollback risqué | Approbation IC + backup |
| Impact financier majeur | CFO/CEO informé |
| Fuite de données suspectée | RSSI + légal |
