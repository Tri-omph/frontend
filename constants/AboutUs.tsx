// constants/aboutUsData.ts
import React, { ReactNode } from "react";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";

export interface AboutUsDataType {
  title: string;
  text: string;
  icon: ReactNode;
}

const color = "#6AA84F";
const size = 30;

// Ce fichier réunit le texte à afficher sur la page "AboutUs"

export const aboutUsData: AboutUsDataType[] = [
  {
    title: "Notre projet",
    text: "Triomph est un projet né dans le cadre de notre dernière année d'études à Polytech Paris-Saclay, en partenariat avec Viveris.\nNotre mission : sensibiliser les Français aux pratiques du recyclage grâce à une application ludique et innovante.",
    icon: <MaterialIcons name="school" size={size} color={color} />,
  },
  {
    title: "Pourquoi cette application ?",
    text: "Le recyclage est un enjeu crucial pour préserver notre planète. Nous avons voulu créer une solution accessible à tous, qui guide les utilisateurs dans le tri de leurs déchets tout en rendant ce geste éco-responsable amusant et gratifiant.",
    icon: <FontAwesome5 name="leaf" size={size} color="#6AA84F" />,
  },
  {
    title: "Qui sommes-nous ?",
    text: `Nous sommes cinq étudiants spécialisés en informatique et ingénierie mathématique :
👩‍💻 Léa - Développeuse en herbe et experte en pixels perdus
👨‍💻 Cyril - Roi du front et dompteur de bugs capricieux
👩‍💻 Marie - Magicienne du back et reine des bases de données
👨‍💻 Simon - Maître des algorithmes et chercheur de variables égarées
👩‍💻 Eva - Architecte de l'IA et chasseuse de null pointer exceptions`,
    icon: <MaterialIcons name="group" size={size} color="#6AA84F" />,
  },
  {
    title: "Nos attentes",
    text: "Nous espérons que Triomph pourra :\n- Inspirer les utilisateurs à trier leurs déchets quotidiennement.\n- Faire découvrir de nouvelles méthodes de tri grâce à l’IA.\n- Apporter une touche ludique à une tâche souvent perçue comme fastidieuse.",
    icon: <FontAwesome5 name="seedling" size={size} color="#6AA84F" />,
  },
];
