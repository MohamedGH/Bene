# Bene

> Plateforme de mise en relation entre des besoins associatifs et des bénévoles.

Bene permet de publier des projets bénévoles, de rechercher des bénévoles par compétences et de faciliter leur mise en relation grâce à un système de matching.

## Fonctionnalités

- 🏠 Tableau d'accueil avec statistiques
- 📋 Liste et recherche de projets
- 👥 Liste et recherche de bénévoles
- 🔎 Matching projets ↔ bénévoles par compétences
- 🤝 Gestion des candidatures
- 📌 Gestion du statut des projets
- ➕ Création de projets et de profils bénévoles
- 🏷️ Recherche par compétences et filtres par statut

## Stack technique

- **React 18**
- **Vite 5**
- **JavaScript / JSX**
- **Lucide React** pour les icônes
- **GitHub Actions** pour la CI

## Installation

Pré-requis : **Node.js 20+** et npm.

```bash
git clone https://github.com/MohamedGH/Bene.git
cd Bene
npm install
```

## Développement

```bash
npm run dev
```

L'application est ensuite disponible sur l'URL indiquée par Vite, généralement `http://localhost:5173`.

## Build de production

```bash
npm run build
```

Pour prévisualiser le build :

```bash
npm run preview
```

## Architecture

Le projet suit une architecture modulaire afin d'éviter de concentrer l'interface et la logique métier dans un composant unique :

```text
src/
├── App.jsx                 # Composition de l'application
├── components/             # Composants React organisés par domaine
│   ├── home/
│   ├── layout/
│   ├── projects/
│   ├── volunteers/
│   └── ui/
├── data/                   # Données initiales / fixtures
├── domain/                 # Règles métier indépendantes de React
│   ├── applications.js
│   ├── navigation.js
│   ├── projects.js
│   ├── selectors.js
│   └── volunteers.js
├── hooks/                  # État et orchestration React
├── styles/                 # Styles globaux
└── utils/                  # Utilitaires transverses
```

### Principes

- **UI séparée du domaine** : les règles métier ne dépendent pas des composants React.
- **Composants par fonctionnalité** : projets, bénévoles et accueil sont séparés.
- **État centralisé dans un hook** : `useAppState` orchestre l'état de l'application sans contenir toute l'interface.
- **Fonctions métier testables indépendamment** : création, filtrage, statut et candidatures sont isolés dans `src/domain/`.
- **Données séparées** : les données de démonstration ne sont pas mélangées à l'interface.

Voir [`ARCHITECTURE.md`](./ARCHITECTURE.md) pour davantage de détails.

## CI

GitHub Actions exécute automatiquement :

1. l'installation avec `npm ci` ;
2. le build de production avec `npm run build`.

La CI est exécutée sur `main`, les branches de refactoring et les Pull Requests vers `main`.

## Scripts npm

| Commande | Description |
|---|---|
| `npm run dev` | Lance le serveur de développement |
| `npm run build` | Génère le build de production |
| `npm run preview` | Prévisualise le build |
| `npm run lint` | Lance ESLint si configuré |

## Contribuer

1. Créer une branche dédiée :

```bash
git checkout -b feature/ma-fonctionnalite
```

2. Installer les dépendances :

```bash
npm ci
```

3. Développer et vérifier le build :

```bash
npm run build
```

4. Committer les changements avec un message explicite.
5. Ouvrir une Pull Request vers `main`.

## Licence

Projet en cours de développement. La licence sera précisée ultérieurement.
