import React, { createContext, useContext, useState } from "react";
import { ImageSourcePropType } from "react-native";
import resources from "@/constants/Resources";
import { levelMonsters } from "@/constants/LevelMonsters";

// ********* TYPES

type UserContextType = {
  username: string;
  email: string; // Peut apparaitre sous la forme login dans le back !
  saveImage: boolean;
  points: number;
  monsterImage: ImageSourcePropType;
  monsterImageClosed: ImageSourcePropType;
  setUserData: (data: UpdatableUserData) => void;
  resetUserData: () => void;
};

type UserContextData = Omit<UserContextType, "setUserData" | "resetUserData">;
type UpdatableUserData = Partial<UserContextData>;

// ********* CONTEXT

const UserInformationContext = createContext<UserContextType | undefined>(
  undefined,
);

export const UserInformationProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [userData, setUserData] = useState<UserContextData>({
    username: "",
    email: "",
    saveImage: false,
    points: 0,
    monsterImage: resources.monster_v1, // Image par défaut
    monsterImageClosed: resources.monster_v1_closed,
  });

  const resetUserData = () => {
    setUserData({
      username: "",
      email: "",
      saveImage: false,
      points: 0,
      monsterImage: resources.monster_v1, // Image par défaut
      monsterImageClosed: resources.monster_v1_closed,
    });
  };

  // Fonction pour récupérer l’image en fonction des points => level = f(points)
  const getMonstersForCorrespondingPoints = (points: number) => {
    const monster = levelMonsters.find((m) => m.level === points + 1); // Le nombre de points commence à 0, le niv à 1.
    return {
      open: monster?.image || resources.monster_v1,
      closed: monster?.image_closed || resources.monster_v1_closed,
    };
  };

  // Fonction pour mettre à jour les données utilisateur
  const updateUserData = (data: UpdatableUserData) => {
    setUserData((prev) => {
      const newPoints = data.points ?? prev.points;
      const { open, closed } = getMonstersForCorrespondingPoints(newPoints);
      return {
        ...prev,
        ...data,
        monsterImageOpen: open,
        monsterImageClosed: closed,
      };
    });
  };

  return (
    <UserInformationContext.Provider
      value={{ ...userData, setUserData: updateUserData, resetUserData }}
    >
      {children}
    </UserInformationContext.Provider>
  );
};

export const useUserInformation = () => {
  const context = useContext(UserInformationContext);
  if (!context) {
    throw new Error(
      "useUserInformation doit être utilisé à l'intérieur de UserInformationProvider",
    );
  }
  return context;
};
