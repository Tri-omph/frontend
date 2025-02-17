import { useState, useCallback } from "react";
import { CameraView, BarcodeScanningResult } from "expo-camera";
import ScanManager from "@/services/managers/scanManager";
import { showNotification } from "@/constants/notification";
import { useScanContext } from "@/context/ScanContext"; // Importation du ScanContext
import { detectionMethod } from "@/types/detectionMethods";

export const useScan = (cameraRef: React.RefObject<CameraView>) => {
  const { setScanData, imageOfWaste, material } = useScanContext(); // Accéder aux données du ScanContext
  const [dealingWithScannedImg, setDealingWithScannedImg] = useState(false);
  const [scanned, setScanned] = useState(false);

  const resetScan = useCallback(() => {
    setScanned(false);
    setDealingWithScannedImg(false);
  }, []);

  const handleBarcodeScanned = useCallback(
    async (barcodeScanningResult: BarcodeScanningResult) => {
      if (dealingWithScannedImg || scanned) return;

      try {
        setDealingWithScannedImg(true);

        // Pas Déjà en cours de traitement avec une image ! (scanned ne suffit pas, car entre temps, il y a la prise de photo !!)
        const photo = await cameraRef.current?.takePictureAsync();
        setScanned(true);

        const res = await ScanManager.GET_PRODUCT_PACKAGE_MATERIAL(
          barcodeScanningResult.data,
        ); // Récupérer les informations sur l'emballage

        if (res.status !== 200) {
          throw new Error(res.data.message);
        }

        console.log(res.data.productPackagingMaterial);

        // Mettre à jour le contexte ScanContext avec les données scannées
        setScanData({
          material: res.data.productPackagingMaterial,
          methodUsed: detectionMethod.Barcode,
          imageOfWaste: photo,
        });
      } catch (error) {
        showNotification(
          "error",
          `${error.message}`,
          "Impossible de récupérer les informations du produit scanné !",
        );
        resetScan();
      }
    },
    [cameraRef, dealingWithScannedImg, scanned, resetScan, setScanData],
  );

  return {
    scanned,
    handleBarcodeScanned,
    resetScan,
    imageOfWaste,
    material,
  };
};
