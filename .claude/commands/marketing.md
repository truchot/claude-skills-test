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
Référence: `.web-agency/skills/marketing/`
- SEO/SEA opérationnel
- Content marketing
- Social media
- Email marketing
- Analytics et tracking

## Algorithme de Routage

### 1. Analyse des mots-clés

| Mots-clés | Destination |
|-----------|-------------|
| stratégie, positionnement, différenciation, marché | direction-marketing |
| KPI, ROI, budget, allocation, mesure performance | direction-marketing |
| persona, segment, ciblage, ICP | direction-marketing |
| SEO, SEA, Google Ads, référencement | marketing |
| contenu, article, blog, rédaction | marketing |
| email, newsletter, automation, CRM | marketing |
| social media, LinkedIn, campagne, ads | marketing |
| analytics, tracking, GA4, conversion | marketing |

### 2. Analyse du contexte

- **Niveau de décision**: Stratégique (budget, vision) vs Opérationnel (campagne, contenu)
- **Horizon temporel**: Long terme → direction-marketing, Court terme → marketing
- **Type de question**: "Pourquoi?" → stratégie, "Comment?" → opérations

### 3. Résolution d'ambiguïté

```
SI plusieurs skills possibles:
  → Privilégier direction-marketing (cadrage avant exécution)

SI demande mixte (ex: "lancer campagne acquisition"):
  → Vérifier si stratégie définie
  → Si non: direction-marketing d'abord
  → Si oui: marketing pour exécution

SI demande floue:
  → Demander l'objectif business
  → Identifier si besoin de cadrage ou d'exécution
```

### 4. Fallback

Si indétermination après analyse:
1. Demander l'objectif principal
2. Identifier les contraintes (budget, temps)
3. Router vers marketing par défaut pour action rapide

## Utilisation

```
/marketing [description de la demande]
```

## Exemples

- `/marketing stratégie acquisition B2B` → direction-marketing
- `/marketing rédiger article blog SEO` → marketing
- `/marketing définir KPIs campagne` → direction-marketing
- `/marketing audit SEO technique` → marketing
- `/marketing positionnement marché` → direction-marketing
