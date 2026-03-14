---
paths:
  - "**/.env*"
  - "**/auth/**"
  - "**/middleware/**"
---

# Règles de sécurité
- Jamais de secrets en dur dans le code — utiliser les variables d'environnement
- .env* dans .gitignore obligatoirement
- Validation et sanitization de tous les inputs utilisateur
- CSRF protection sur les formulaires
- Headers de sécurité : CSP, X-Frame-Options, HSTS
- Auth : bcrypt pour les mots de passe, JWT avec expiration courte
- CORS : whitelist explicite, jamais wildcard en production
- Rate limiting sur les endpoints sensibles
