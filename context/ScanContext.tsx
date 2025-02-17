import { detectionMethod } from "@/types/detectionMethods";
import React, { createContext, useContext, useState } from "react";
import { ImageSourcePropType } from "react-native";

// ********* TYPES

type ScanContextType = {
  material: string;
  methodUsed: detectionMethod;
  imageOfWaste: ImageSourcePropType | null;
  correctedMaterial?: string;
  setScanData: (data: UpdatableScanData) => void;

  /* NB: Un useState ne pouvant pas contenir une fonction, setScanData est "omit"
      On retire la clé setScanData de ScanContextType*/
};

type ScanContextData = Omit<ScanContextType, "setScanData">;
type UpdatableScanData = Partial<ScanContextData>;

/* On met à jour qu'une seule partie des données, une clé en particulier, c'est pour ca
   que l'on utilise le mot clé Partial */

// ********* CONTEXT

const ScanContext = createContext<ScanContextType | undefined>(undefined);

export const ScanProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [scanData, setScanData] = useState<ScanContextData>({
    material: "",
    methodUsed: detectionMethod.Barcode,
    imageOfWaste: null,
    correctedMaterial: undefined,
  });

  const updateScanData = (data: UpdatableScanData) => {
    setScanData((prev) => ({ ...prev, ...data }));
  };

  return (
    <ScanContext.Provider value={{ ...scanData, setScanData: updateScanData }}>
      {children}
    </ScanContext.Provider>
  );
};

export const useScanContext = () => {
  const context = useContext(ScanContext);
  if (!context) {
    throw new Error("useScan doit être utilisé à l'intérieur de ScanProvider");
  }
  return context;
};
