# Portfolio — Youssef Madane

Portfolio personnel en forme de carnet Jupyter (HTML, CSS et JavaScript, sans dépendance ni étape de build).
Bilingue FR / EN, thème clair / sombre.

## Personnaliser

Les réglages sont tout en haut de `assets/js/script.js` (section « À PERSONNALISER ») :

- `GITHUB_URL` : votre profil GitHub
- `LINKEDIN_URL` et `EMAIL` : facultatifs (laisser vide pour masquer)
- `FORM_URL` : URL d'un formulaire [Formspree](https://formspree.io) ; vide, le formulaire ouvre votre messagerie

Le contenu (résumé, formation, compétences, projets) se trouve dans l'objet `PROFILE`, juste en dessous.

## Publier sur GitHub Pages

1. Créez un dépôt public nommé `<votre-pseudo>.github.io` (ou un autre nom, par ex. `portfolio`).
2. Envoyez-y tous les fichiers de ce dossier (`index.html` à la racine).
3. Dans *Settings → Pages*, choisissez *Deploy from a branch*, branche `main`, dossier `/ (root)`.
4. Le site est en ligne après une minute : `https://<votre-pseudo>.github.io/`.

## Structure

```
index.html
assets/
├── css/style.css
└── js/script.js
```
