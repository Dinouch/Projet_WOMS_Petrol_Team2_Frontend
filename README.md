# PRISM – Frontend

**WOMS Petrol** est l’interface web de la solution de gestion et de planification préventive des opérations pétrolières destinée à **Sonatrach**. Conçue pour offrir une expérience utilisateur fluide et réactive, elle permet aux ingénieurs et aux managers de :

- Visualiser en temps réel l’état des puits et des installations.
- Gérer et configurer les alertes critiques (pression, débit, IADC grading, etc.).
- Planifier les interventions préventives selon les contraintes métiers.
- Consulter l’historique des rapports et suivre l’avancement des opérations.

---

## À propos du projet

La plateforme frontend de **WOMS Petrol**, conçue pour fournir aux équipes de Sonatrach une interface intuitive et réactive :

- Une vue consolidée des opérations de forage.
- Des tableaux de bord configurables pour le suivi des indicateurs métiers.
- Des outils de cartographie et de visualisation en temps réel.
- Une gestion fine des alertes et des utilisateurs.

---

## Fonctionnalités clés

### Tableau de bord principal
- Vue consolidée des indicateurs métiers.
- Widgets configurables avec déplacement par glisser-déposer.

### Cartographie interactive
- Affichage géospatial des puits (via OpenStreetMap).
- Codes couleur selon l’état (
    Rouge : Alerte dépassement,
    Orange : Alerte possibilité de dépassement ou léger dépassement,
    Vert : Alerte sur la stabilité des coûts et délais
).

### Gestion des alertes
- Seuils personnalisés par paramètre.
- Notifications en temps réel.

### Historique et rapports
- Recherche et filtres avancés.
- Export PDF et Excel avec résumé graphique.

### Administration des utilisateurs
- Création, modification et attribution de rôles.
- Authentification sécurisée.

### Responsive Design
- Adapté aux écrans desktop, tablette et mobile.

---

## Stack technologique

| Composant              | Version  | Rôle                              |
|------------------------|----------|-----------------------------------|
| React                  | 19.x     | Bibliothèque UI                   |
| TypeScript             | 5.x      | Typage statique                   |
| React Router DOM       | 7.5.3    | Gestion des routes                |
| Tailwind CSS           | 3.x      | Framework CSS utility-first       |
| Axios                  | 1.x      | Requêtes HTTP                     |
| Recharts & Chart.js    | Latest   | Visualisation graphique           |
| Leaflet & React-Leaflet| 1.x      | Cartographie interactive          |
| Framer Motion          | 7.x      | Animations                        |
| React Icons & Heroicons| 4.x      | Bibliothèque d’icônes             |
| react-date-range       | 1.x      | Sélecteur de plages de dates      |

---

## Structure du projet

```
src/
├── assets/              # Images, polices et styles globaux
├── components/          # Composants réutilisables (UI, formulaires, modales)
├── pages/               # Pages principales (Login, Dashboard, Profile…)
├── services/            # Services API (instances Axios)
├── routes/              # Configuration des routes avec React Router
├── utils/               # Fonctions utilitaires et constantes
└── App.js               # Point d’entrée de l’application
```

### Fichiers de configuration

- `tailwind.config.js`
- `postcss.config.js`
- `tsconfig.json`
- `.eslintrc.js` & `.prettierrc`

---

## Installation et démarrage

### 1. Cloner le dépôt

```bash
git clone https://github.com/Dinouch/Projet_WOMS_Petrol_Team2_Frontend.git
cd src
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configurer l’environnement

Dupliquer `.env.example` en `.env` puis renseigner les variables suivantes :

```env
REACT_APP_API_URL=http://localhost:3000/api
```

### 4. Lancer en développement

```bash
npm start
```

### 5. Compiler pour la production

```bash
npm run build
```

---

## Scripts utiles

| Commande         | Description                                    |
|------------------|------------------------------------------------|
| `npm start`      | Démarrage du serveur de développement          |
| `npm run build`  | Construction optimisée pour la production      |
| `npm test`       | Exécution des tests unitaires                  |
| `npm lint`       | Vérification du code (ESLint + Prettier)       |

---

## Contribuer

1. Fork du projet.
2. Créer une branche :

```bash
git checkout -b feat/ma-fonctionnalite
```

3. Committer vos changements :

```bash
git commit -m "Ajout de ..."
```

4. Pousser la branche :

```bash
git push origin feat/ma-fonctionnalite
```

5. Ouvrir une Pull Request.

Merci de respecter les conventions de commit et la charte de code !

---

**© 2025 - PRISM / WOMS Petrol / Sonatrach**