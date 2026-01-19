# /marketing - Commande Marketing

## Rôle
Point d'entrée pour toutes les demandes liées au marketing digital et à la stratégie d'acquisition.

## Comportement
1. **Analyse la demande** marketing
2. **Route vers le niveau** approprié (stratégie vs exécution)
3. **Coordonne** entre stratégie et opérations si nécessaire

## Hiérarchie Marketing

### Niveau 2 - Stratégie Marketing (POURQUOI)
Référence: `.web-agency/skills/direction-marketing/`
- Positionnement et différenciation
- Stratégie d'acquisition
- KPIs et mesure de performance
- Vision marketing globale

### Niveau 3 - Opérations Marketing (QUOI/COMMENT)
Les opérations marketing sont éclatées en skills spécialisés :

| Skill | Référence | Domaine |
|-------|-----------|---------|
| SEO Expert | `.web-agency/skills/seo-expert/` | SEO technique et stratégique |
| Paid Media | `.web-agency/skills/paid-media/` | SEA, Google Ads, Social Ads |
| Content Marketing | `.web-agency/skills/content-marketing/` | Contenu, blog, réseaux sociaux |
| Marketing Ops | `.web-agency/skills/marketing-ops/` | Automation, CRM, email |
| Marketing Analytics | `.web-agency/skills/marketing-analytics/` | Tracking, attribution, GA4 |
| Customer Success | `.web-agency/skills/customer-success/` | Fidélisation, NPS, lifecycle |

## Algorithme de Routage

### 1. Analyse des mots-clés

| Mots-clés | Destination |
|-----------|-------------|
| stratégie, positionnement, différenciation, marché | direction-marketing |
| KPI, ROI, budget, allocation, mesure performance | direction-marketing |
| persona, segment, ciblage, ICP | direction-marketing |
| SEO, référencement, backlinks, sitemap | seo-expert |
| SEA, Google Ads, PPC, campagne payante | paid-media |
| contenu, article, blog, rédaction, social media | content-marketing |
| email, newsletter, automation, CRM, nurturing | marketing-ops |
| analytics, tracking, GA4, conversion, attribution | marketing-analytics |
| fidélisation, NPS, customer success, onboarding | customer-success |

### 2. Analyse du contexte

- **Niveau de décision**: Stratégique (budget, vision) vs Opérationnel (campagne, contenu)
- **Horizon temporel**: Long terme → direction-marketing, Court terme → skill opérationnel spécialisé
- **Type de question**: "Pourquoi?" → stratégie, "Comment?" → opérations

### 3. Résolution d'ambiguïté

```
SI plusieurs skills possibles:
  → Privilégier direction-marketing (cadrage avant exécution)

SI demande mixte (ex: "lancer campagne acquisition"):
  → Vérifier si stratégie définie
  → Si non: direction-marketing d'abord
  → Si oui: skill opérationnel approprié (paid-media, content-marketing, etc.)

SI demande floue:
  → Demander l'objectif business
  → Identifier si besoin de cadrage ou d'exécution
```

### 4. Fallback

Si indétermination après analyse:
1. Demander l'objectif principal
2. Identifier les contraintes (budget, temps)
3. Router vers content-marketing par défaut pour action rapide

## Utilisation

```
/marketing [description de la demande]
```

## Exemples

- `/marketing stratégie acquisition B2B` → direction-marketing
- `/marketing rédiger article blog SEO` → content-marketing
- `/marketing définir KPIs campagne` → direction-marketing
- `/marketing audit SEO technique` → seo-expert
- `/marketing positionnement marché` → direction-marketing
- `/marketing campagne Google Ads` → paid-media
- `/marketing setup tracking GA4` → marketing-analytics
- `/marketing automation email nurturing` → marketing-ops
