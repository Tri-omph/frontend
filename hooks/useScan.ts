import { useState, useCallback } from "react";
import {
  CameraCapturedPicture,
  CameraView,
  BarcodeScanningResult,
} from "expo-camera";
import { Alert } from "react-native";

type ProductInfoResult = {
  productFound: boolean;
  message: string;
};

// Fonction pour récupérer les informations du produit via Open Food Facts
const getProductInfo = async (barcode: string): Promise<ProductInfoResult> => {
  try {
    const response = await fetch(
      `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`,
    );
    const data = await response.json();

    if (data.status === 1) {
      const product = data.product;
      const packagingMaterials = product.packaging_materials_tags || [
        "Informations non disponibles",
      ];
      return { productFound: true, message: packagingMaterials[0] }; // Produit trouvé
    } else {
      return {
        productFound: false,
        message: "Produit non trouvé dans la base de données.",
      }; // Produit non trouvé
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des informations :", error);
    return {
      productFound: false,
      message: "Erreur lors de la récupération des informations.",
    }; // Erreur réseau ou autre
  }
};

export const useScan = (cameraRef: React.RefObject<CameraView>) => {
  const [dealingWithScannedImg, setDealingWithScannedImg] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [scannedImage, setScannedImage] = useState<
    CameraCapturedPicture | null | undefined
  >(null);
  const [scannedMaterialByBarcode, setScannedMaterialByBarcode] = useState<
    string | null
  >(null);

  const resetScan = useCallback(() => {
    setScanned(false);
    setScannedImage(null);
    setScannedMaterialByBarcode(null);
    setDealingWithScannedImg(false);
  }, []);

  const handleBarcodeScanned = useCallback(
    async (barcodeScanningResult: BarcodeScanningResult) => {
      if (!dealingWithScannedImg) {
        // Pas Déjà en cours de traitement avec une image ! (scanned ne suffit pas, car entre temps, il y a la prise de photo !!)
        setDealingWithScannedImg(true);
        const photo = await cameraRef.current?.takePictureAsync();

        setScanned(true);
        const packagingInfo = await getProductInfo(barcodeScanningResult.data); // Récupérer les informations sur l'emballage

        if (packagingInfo.productFound) {
          setScannedMaterialByBarcode(packagingInfo.message);
          setScannedImage(photo);
          console.log(packagingInfo.message);
          console.log(photo);
        } else {
          Alert.alert(
            "L'application n'a pas su récupérer le matériau composant l'objet!",
          );
          resetScan();
        }
      }
    },
    [
      cameraRef,
      dealingWithScannedImg,
      setScanned,
      setScannedMaterialByBarcode,
      setScannedImage,
      resetScan,
    ],
  );

  return {
    scanned,
    scannedImage,
    scannedMaterialByBarcode,
    handleBarcodeScanned,
    resetScan,
  };
};
