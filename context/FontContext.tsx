import React, { createContext, useContext, useState } from "react";

interface FontSizeContextProps {
  fontSize: number;
  increaseFontSize: () => void;
}

const FontSizeContext = createContext<FontSizeContextProps | undefined>(
  undefined,
);

export const FontSizeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [fontSize, setFontSize] = useState(14); // Default font size

  const increaseFontSize = () => setFontSize((prev) => prev * 2);

  return (
    <FontSizeContext.Provider value={{ fontSize, increaseFontSize }}>
      {children}
    </FontSizeContext.Provider>
  );
};

export const useFontContext = (): FontSizeContextProps => {
  const context = useContext(FontSizeContext);
  if (!context) {
    throw new Error("useFontContext must be used within a FontSizeProvider");
  }
  return context;
};
