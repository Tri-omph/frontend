import React, { createContext, useContext, useState } from "react";

const BackgroundContext = createContext<{
  selectedBackground: string;
  setSelectedBackground: (background: string) => void;
}>({
  selectedBackground: "@/assets/images/fond_neige.png",
  setSelectedBackground: () => {},
});

export const BackgroundProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedBackground, setSelectedBackground] = useState(
    "@/assets/images/fond_neige.png",
  );

  return (
    <BackgroundContext.Provider
      value={{ selectedBackground, setSelectedBackground }}
    >
      {children}
    </BackgroundContext.Provider>
  );
};

export const useBackground = () => useContext(BackgroundContext);
