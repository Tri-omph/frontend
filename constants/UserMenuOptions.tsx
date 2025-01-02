// constants/aboutUsData.ts
import React, { ReactNode } from "react";
import { FontAwesome, MaterialIcons, Feather } from "@expo/vector-icons";
import { Href } from "expo-router";

export interface UserMenuType {
  title: string;
  subtitle: string;
  icon: ReactNode;
  goToPage: Href;
}

const color = "#6AA84F";
const size = 24;

const userMenuOptions: UserMenuType[] = [
  {
    title: "Vos informations",
    subtitle: "Modifier vos informations personnelles",
    icon: <FontAwesome name="user" size={size} color={color} />,
    goToPage: "/user-modification-donnees",
  },
  {
    title: "Image de fond",
    subtitle: "Choisir l'image de fond qui vous convient !",
    icon: <MaterialIcons name="photo-library" size={size} color={color} />,
    goToPage: "/user-image-fond",
  },
  {
    title: "Tutoriel",
    subtitle: "Un petit rappel du fonctionnement de l’application",
    icon: <Feather name="target" size={size} color={color} />,
    goToPage: "/user-tutoriel",
  },
  {
    title: "Qui sommes nous ?",
    subtitle: "Quelques informations sur la mission et l’équipe...",
    icon: <FontAwesome name="info-circle" size={size} color={color} />,
    goToPage: "/user-about-us",
  },
];

export default userMenuOptions;
