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

## Logique de Routage

```
SI demande concerne stratégie/positionnement/vision
  → direction-marketing (Niveau 2)

SI demande concerne exécution/campagnes/contenu
  → marketing (Niveau 3)

SI demande concerne les deux
  → Commencer par direction-marketing pour cadrer
  → Puis déléguer à marketing pour exécuter
```

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
