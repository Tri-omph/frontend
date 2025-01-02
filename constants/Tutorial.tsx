import React, { ReactNode } from "react";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";

interface TutorialDataType {
  title: string;
  text: string;
  icon: ReactNode;
}

const color = "#6AA84F";

// Ce fichier réunit le texte à afficher sur la page "Tutorial"

export const tutorialData: TutorialDataType[] = [
  {
    title: "Bienvenue sur l'application Triomph !",
    text: "Triomph est votre assistant pour un recyclage simplifié. Ensemble, sensibilisons les français aux pratiques du recyclage !",
    icon: <FontAwesome5 name="crown" size={20} color={color} />,
  },
  {
    title: "Nourrissez votre monstre",
    text: "Plus vous recyclez, plus votre monstre grandit ! Scannez et triez vos déchets dans les poubelles adéquates pour le nourrir.\nFaites-en le champion numéro un du tri !",
    icon: <FontAwesome5 name="carrot" size={24} color={color} />,
  },
  {
    title: "Trois méthodes pour trier les déchets",
    text: "1. Scannez le code-barre pour identifier rapidement l’emballage du déchet choisi.\n2. Utilisez la reconnaissance visuelle pour détecter n’importe quel type de déchet.\n3. Utilisez directement la recherche avancée pour vous renseigner sur un déchet.",
    icon: <MaterialIcons name="recycling" size={28} color={color} />,
  },
];
