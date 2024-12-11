# frontend
The frontend of the app.

- [Installation](#installation)
- [Développement](#développement)
    - [Lancement du serveur et de la base de données](#lancement-du-serveur-et-de-la-base-de-données)
    - [Variables d'environnement](#variables-denvironnement)
    - [Environnement de développement](#environnement-de-développement)
- [Structure du projet](#structure-du-projet)

## Installation

### Prérequis
Assurez-vous d'avoir les éléments suivants installés sur votre machine :

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en/download/), utiliser la version LTS.

### Cloner le dépôt

```bash
git clone https://github.com/Tri-omph/frontend.git
cd ./frontend
```

### Installer les dépendances avec npm (la première fois uniquement ou lorsque les dépendances changent)

```bash
npm install
```

## Développement

## Lancement du serveur et de la base de données

Pour ce faire, consultez le fichier README du [dépôt backend](https://github.com/Tri-omph/backend/blob/main/README.md).

## Variables d'environnement

Créez un fichier `.env` à la racine du projet et ajoutez les variables d'environnement suivantes :

- Les variables d'environnement se trouvent dans le fichier `.env`
- Les variables d'environnement sont préfixées par `EXPO_PUBLIC_` pour être accessibles dans le frontend.
- Les variables d'environnement sont :
    - `EXPO_PUBLIC_BASE_URL` : l'URL de l'API

```bash
EXPO_PUBLIC_BASE_URL=http://adresseIP:3000/api/v1
```

**Notez bien**: Vous devez utiliser l'adresse IP de la machine sur laquelle vous allez faire tourner ce projet. En effet, [si vous utilisez votre portable](#avec-votre-portable), se contenter de préciser `localhost` sera inapproprié !


## Environnement de développement

Vous avez deux façons de tester l'application pendant le développement:

- Avec votre portable
- Sur un émulateur

### Avec votre portable

1. Vous devez télécharger l'application [Expo Go](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=fr&pli=1) sur votre téléphone.

2. Assurez-vous que votre téléphone et votre ordinateur portable sont sur le même réseau Wi-Fi.

3. Si ce n'est pas déjà fait, définissez le fichier `.env`. **Mettez le à jour à chaque changement de réseau Wi-Fi**.

4. Lancer la commande
```bash
npm run start
```

5. Le QR code apparaîtra dans votre terminal, Scannez-le avec Expo Go !

### Sur un émulateur

1. Veuillez vous référer aux tutoriels respectifs, selon votre cas:  [Android](https://docs.expo.dev/workflow/android-studio-emulator/) ou sur [iOS](https://docs.expo.dev/workflow/ios-simulator/).

2. Utiliser la commande ```npm run android``` ou ```npm run ios``` selon votre cas.

## Structure du projet
Le projet suit une architecture modulaire et claire pour faciliter la maintenance et l'extensibilité.

### Code source

- **`app`** : Point d'entrée principal de l'application Expo, on y retrouve l'ensemble de vues utilisateurs.
    - **`(tabs)/`** : Contient la configuration des onglets principaux (tab bar) de l'application, ils permettent à l'utilisateur de naviguer entre les différentes sections.

    - **`screens/`** : Contient toutes les vues ou écrans spécifiques de l'application. Chaque fichier dans ce répertoire représente un écran distinct, comme la page de connexion, les paramètres de l'utilisateur...
- **`assets`** : Fichier centralisé qui regroupe les ressources de l'application, comme les images, polices...
    - **`fonts/`** : Dossier contenant toutes les polices personnalisées utilisées dans l'application.

    - **`images/`** : Dossier qui contient toutes les images statiques utilisées dans l'application, telles que les icônes, les images de fond, et d'autres ressources graphiques.

- **`components/`** : Dossier qui contient tous les composants réutilisables de l'application. Il représente une partie de l'interface utilisateur, comme des boutons, des formulaires, des cartes, ou des modals..
    - **`tests/`** : Ce sous-dossier est destiné à contenir les tests unitaires et d'intégration des composants.

- **`constants/`** : Dossier où l'on définit toutes les constantes utilisées dans l'application, telles que les chaînes de caractères, les couleurs, les tailles d'éléments, ou les routes du front...

- **`context/`** : Dossier contenant les fichiers liés à la gestion de l'état global de l'application via React Context. Le contexte permet de partager des valeurs entre les composants sans avoir à passer les props manuellement à chaque niveau de l'arborescence des composants.
- **`hooks/`** : Dossier qui contient des hooks personnalisés pour encapsuler des logiques réutilisables et améliorer la lisibilité et la modularité du code. Les hooks personnalisés permettent de séparer la logique de l'interface utilisateur tout en conservant la possibilité de partager des fonctionnalités entre plusieurs composants. 
- **`types/`** : Dossier qui contient tous les fichiers liés aux types TypeScript utilisés dans le projet. On centralise la définition des types et interfaces.

- **`services/`** : Ce dossier contient la logique métier et les appels API utilisés pour interagir avec les services externes de l'application.

    - **`.endpoints/`** : Ce dossier contient les définitions des endpoints API utilisés pour communiquer avec le backend.

    - **`.managers/`** : Ce dossier contient des classes ou modules dédiés à la gestion des requêtes API et de la logique métier pour chaque ressource de l'application. Chaque "manager" est responsable de l'interaction avec les endpoints définis dans `.endpoints/`.

### Configuration du projet

- **`.husky/`** : Dossier contenant la configuration pour les hooks Git (comme les pré-commits) pour automatiser certaines vérifications avant les commits.
- **`.github/`** : Dossier contenant les workflows GitHub Actions, comme `ci.yaml`, pour automatiser les processus de test et de déploiement.

- **`.app.json/`** : Fichier de configuration utilisé par Expo pour gérer les paramètres globaux de l'application.

- **`.eslintrc.js`** : Configuration d'ESLint pour maintenir une qualité de code optimale.
- **`.gitignore`** : Spécifie les fichiers et répertoires à ignorer par Git, comme les fichiers de build ou les dépendances.
- **`node_modules/`** : Contient toutes les dépendances installées par `npm`.
- **`package.json`** : Dépendances du projet et scripts pour la gestion de l'application, comme les commandes `npm start`, `npm run build`, et `npm test`.
- **`tsconfig.json`** : Configuration de TypeScript pour définir le comportement de la compilation et la résolution des modules.