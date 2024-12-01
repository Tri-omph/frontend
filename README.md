# frontend
The frontend of the app.

- [Installation](#installation)
- [Environnement de développement](#environnement-de-développement)

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

## Environnement de développement

Vous avez deux façons de tester l'application pendant le développement:

- Avec votre portable
- Sur un émulateur

### Avec votre portable

1. Vous devez télécharger l'application [Expo Go](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=fr&pli=1) sur votre téléphone.

2. Lancer la commande
```bash
npm run start
```

3. Le QR code apparaîtra dans votre terminal, Scannez-le avec Expo Go !

### Sur un émulateur

1. Veuillez vous référer aux tutoriels respectifs, selon votre cas:  [Android](https://docs.expo.dev/workflow/android-studio-emulator/) ou sur [iOS](https://docs.expo.dev/workflow/ios-simulator/).

2. Utiliser la commande ```npm run android``` ou ```npm run ios``` selon votre cas.
