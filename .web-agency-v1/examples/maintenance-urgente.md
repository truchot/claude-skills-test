# Scénario : Maintenance Urgente (Hotfix)

## Contexte

Un client existant signale un bug critique en production empêchant les paiements.

## Déclencheur

```
De: support@client-existant.fr
À: urgence@agence.fr
Objet: URGENT - Paiements bloqués !!!

Les clients ne peuvent plus payer depuis 10h ce matin !
Message d'erreur: "Erreur 500 lors du paiement"

C'est CRITIQUE, nous perdons des ventes !

Jean Martin
DSI
```

## Classification Automatique

```yaml
intake:
  urgency: P1 (critique)
  impact: Production down - Revenue loss
  sla: 4h max
  type: Bug/Hotfix
  escalation: Immédiate
```

## Flux d'Exécution

### Phase 1 : Triage (< 15 min)

```
📥 client-intake
├── reception/email-parser → Extraction urgence
├── qualification/urgency-detector → 🔴 P1 CRITIQUE
├── qualification/intent-classifier → Type: Bug Production
└── routing/skill-router → Route directe: task-orchestrator (priority: critical)

📋 task-orchestrator
├── queue/priority-manager → Insertion tête de queue
├── state-machine/task-creator → Tâche P1 créée
└── execution/task-dispatcher → Dispatch immédiat
```

**Alerte Automatique :**
```
🚨 ALERTE P1 - Paiements bloqués
Client: client-existant.fr
Impact: Production / Revenue
SLA: 4h (Deadline: 14h00)
Assigné: Équipe DevOps + Backend
```

### Phase 2 : Diagnostic (< 30 min)

```
🔧 devops
├── monitoring/log-analyzer → Analyse logs Stripe
│   └── Erreur: "API Key expired"
├── monitoring/alert-manager → Confirmation cause
└── containers/health-checker → Services OK

⚙️ backend-developer
└── api/error-handler → Confirmation: Token Stripe expiré
```

**Diagnostic :**
```markdown
## Cause Identifiée

- **Problème**: Clé API Stripe expirée (rotation automatique)
- **Impact**: Tous les paiements échouent
- **Solution**: Mettre à jour la clé API dans les secrets
- **Risque**: Faible (opération standard)
- **Temps estimé**: 15 minutes
```

### Phase 3 : Résolution (< 30 min)

```
🔧 devops
├── secrets/secret-manager → Rotation clé Stripe
├── containers/deployment-manager → Redéploiement
└── monitoring/health-checker → Vérification santé

🧪 testing-process
└── types/smoke-tester → Test paiement OK
```

**Actions Exécutées :**
```bash
# 1. Mise à jour secret
kubectl create secret generic stripe-api \
  --from-literal=key=sk_live_new... --dry-run -o yaml | kubectl apply -f -

# 2. Restart pods
kubectl rollout restart deployment/payment-service

# 3. Vérification
curl -X POST https://api.client.fr/test-payment
# Response: {"status": "success"}
```

### Phase 4 : Communication (< 15 min)

```
📋 project-management
├── communication/email-annonce → Client notifié
└── pilotage/reporting → Incident documenté

📚 support-client
└── ticketing/ticket-closer → Ticket fermé
```

**Email Client :**
```
De: support@agence.fr
À: support@client-existant.fr
Objet: RE: URGENT - Paiements bloqués !!! ✅ RÉSOLU

Bonjour Jean,

Le problème est résolu. Les paiements fonctionnent à nouveau.

## Cause
Expiration automatique de la clé API Stripe (rotation sécurité)

## Actions
1. Nouvelle clé API déployée
2. Services redémarrés
3. Paiement test validé

## Temps de résolution
1h45 (SLA 4h respecté ✅)

## Prévention
Alerte automatique ajoutée 7 jours avant expiration

Cordialement,
L'équipe Support
```

### Phase 5 : Post-Mortem (< 2h)

```
🔧 devops
└── monitoring/alert-manager → Nouvelle alerte créée

📋 project-management
└── pilotage/alertes-projet → Post-mortem documenté
```

**Post-Mortem :**
```markdown
## Incident: Paiements bloqués - 2025-01-09

### Timeline
- 10:00 - Début de l'incident
- 11:30 - Signalement client
- 11:45 - Diagnostic complété
- 12:00 - Fix déployé
- 12:15 - Confirmation résolution

### Impact
- Durée: 2h15
- Transactions perdues: ~12
- Revenue impact: ~€850

### Cause Racine
Rotation automatique des clés Stripe sans alerte préventive

### Actions Correctives
1. ✅ Alerte 7j avant expiration
2. ⏳ Documentation runbook
3. ⏳ Test rotation clés en staging
```

## Résultat

### Métriques

| Métrique | Valeur | SLA |
|----------|--------|-----|
| Temps détection | 1h30 | - |
| Temps diagnostic | 15 min | < 30 min ✅ |
| Temps résolution | 45 min | < 4h ✅ |
| Temps total | 1h45 | < 4h ✅ |

### Skills Impliqués

| Skill | Rôle |
|-------|------|
| `client-intake` | Réception + Classification urgence |
| `task-orchestrator` | Prioritisation P1 |
| `devops` | Diagnostic + Résolution |
| `backend-developer` | Support diagnostic |
| `testing-process` | Validation fix |
| `project-management` | Communication + Post-mortem |
| `support-client` | Gestion ticket |

### Automatisation

- **Triage** : 100% automatisé
- **Diagnostic** : 80% automatisé
- **Fix** : 60% automatisé (approbation humaine)
- **Communication** : 90% automatisé
- **Post-mortem** : 50% automatisé
