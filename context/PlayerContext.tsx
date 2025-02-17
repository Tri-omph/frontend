import { createContext, useContext, useState } from "react";
import { ImageSourcePropType } from "react-native";
import resources from "@/constants/Resources";
import { levelMonsters } from "@/constants/LevelMonsters";

// Définir le type du contexte de l'utilisateur
type PlayerContextType = {
  userLevel: number | null;
  monsterImage: ImageSourcePropType;
  setUserLevel: (level: number) => void;
};

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
  const [userLevel, setUserLevel] = useState<number | null>(null);
  const [monsterImage, setMonsterImage] = useState<ImageSourcePropType>(
    resources.monster_v1,
  );

  const updateMonsterImage = (level: number) => {
    const monster = levelMonsters.find((m) => m.level === level);
    if (monster) {
      setMonsterImage(monster.image);
    }
  };

  const handleLevelChange = (level: number) => {
    setUserLevel(level);
    updateMonsterImage(level);
  };

  return (
    <PlayerContext.Provider
      value={{ userLevel, monsterImage, setUserLevel: handleLevelChange }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayerContext = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayerContext doit être utilisé dans PlayerProvider");
  }
  return context;
};
