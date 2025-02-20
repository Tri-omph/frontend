import { useState, useCallback } from "react";
import { CameraView, BarcodeScanningResult } from "expo-camera";
import ScanManager from "@/services/managers/scanManager";
import { showNotification } from "@/constants/notification";
import { useScanContext } from "@/context/ScanContext"; // Importation du ScanContext
import { detectionMethod } from "@/types/detectionMethods";

export const useScan = (cameraRef?: React.RefObject<CameraView>) => {
  const {
    setScanData,
    resetScanData,
    imageOfWaste,
    material,
    methodUsed,
    correctedByUser,
  } = useScanContext(); // Accéder aux données du ScanContext
  const [dealingWithScannedImg, setDealingWithScannedImg] = useState(false);
  const [scanned, setScanned] = useState(false);

  const resetScan = useCallback(() => {
    setScanned(false);
    setDealingWithScannedImg(false);
    resetScanData();
  }, [resetScanData]);

  const handleBarcodeScanned = useCallback(
    async (barcodeScanningResult: BarcodeScanningResult) => {
      if (dealingWithScannedImg || scanned || imageOfWaste) return;

      try {
        setDealingWithScannedImg(true);

        // Pas Déjà en cours de traitement avec une image ! (scanned ne suffit pas, car entre temps, il y a la prise de photo !!)
        if (!cameraRef) return;
        const photo = await cameraRef.current?.takePictureAsync();
        setScanned(true);

        const res = await ScanManager.GET_PRODUCT_PACKAGE_MATERIAL(
          barcodeScanningResult.data,
        ); // Récupérer les informations sur l'emballage

        if (res.status !== 200) {
          throw new Error(res.data.message);
        }

        if (res.data.warning) {
          showNotification(
            "error", // Ce n'est clairement pas une erreur, mais on souhaite mettre en avant l'importance de l'avertissement !
            "🚨 Vous avez recu un avertissement pour activité suspecte",
            `Vous avez scanné ce produit ${res.data.nbRequestsForBarcode} fois en 1 heure.`,
          );
        }

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
    [
      cameraRef,
      dealingWithScannedImg,
      scanned,
      imageOfWaste,
      resetScan,
      setScanData,
    ],
  );

  return {
    scanned,
    handleBarcodeScanned,
    setScanData,
    resetScan,
    imageOfWaste,
    material,
    methodUsed,
    correctedByUser,
  };
};
