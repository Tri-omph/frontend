import { createContext, useContext, useState } from "react";
import { ImageSourcePropType } from "react-native";

import resources from "@/constants/Resources";

type BackgroundContextType = {
  selectedBackground: ImageSourcePropType;
  setSelectedBackground: (background: ImageSourcePropType) => void;
};

const BackgroundContext = createContext<BackgroundContextType | undefined>(
  undefined,
);

export const BackgroundProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedBackground, setSelectedBackground] =
    useState<ImageSourcePropType>(
      resources.background_jour_de_neige, // Fond par défaut
    );

  return (
    <BackgroundContext.Provider
      value={{ selectedBackground, setSelectedBackground }}
    >
      {children}
    </BackgroundContext.Provider>
  );
};

export const useBackgroundContext = () => {
  const context = useContext(BackgroundContext);
  if (!context) {
    throw new Error(
      "useBackgroundContext doit être utilisé dans BackgroundProvider",
    );
  }
  return context;
};
