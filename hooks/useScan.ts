import { useState, useCallback } from "react";
import {
  CameraCapturedPicture,
  CameraView,
  BarcodeScanningResult,
} from "expo-camera";
import ScanManager from "@/services/managers/scanManager";
import { showNotification } from "@/constants/notification";

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
      try {
        if (!dealingWithScannedImg) {
          // Pas Déjà en cours de traitement avec une image ! (scanned ne suffit pas, car entre temps, il y a la prise de photo !!)
          setDealingWithScannedImg(true);
          const photo = await cameraRef.current?.takePictureAsync();

          setScanned(true);
          const res = await ScanManager.GET_PRODUCT_PACKAGE_MATERIAL(
            barcodeScanningResult.data,
          ); // Récupérer les informations sur l'emballage

          if (res.status !== 200) {
            throw new Error(res.data.message);
          }

          setScannedMaterialByBarcode(res.data.productPackagingMaterial);
          setScannedImage(photo);
        }
      } catch (error) {
        showNotification(
          "error",
          `${error.message}`,
          "Impossible de récupérer les informations du produit scanné !",
        );
        resetScan();
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
