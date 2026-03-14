---
paths:
  - "**/api/**"
  - "**/controllers/**"
  - "**/routes/**"
---

# Conventions API
- RESTful : noms de ressources au pluriel, verbes HTTP standards
- Validation des inputs à l'entrée (zod, joi, ou équivalent)
- Réponses JSON structurées : { data, error, meta }
- Codes HTTP appropriés (201 création, 204 suppression, 422 validation)
- Pagination : cursor-based préféré, offset accepté
- Gestion d'erreurs centralisée avec middleware
- Pas de logique métier dans les controllers — déléguer aux services
