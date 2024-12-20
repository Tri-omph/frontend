import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import {
  CameraView,
  CameraType,
  useCameraPermissions,
  BarcodeScanningResult,
} from "expo-camera";
import ScanResultScreen from "@/app/screens/scan/scan-result";

// Fonction pour récupérer les informations du produit via Open Food Facts
const getProductInfo = async (barcode: string) => {
  try {
    // Effectuer une requête GET à Open Food Facts avec le code-barres
    const response = await fetch(
      `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`,
    );
    const data = await response.json();
    console.log(data);

    if (data.status === 1) {
      // Extraire les informations d'emballage
      const product = data.product;

      // Matériaux d'emballage
      const packagingMaterials = product.packaging_materials_tags || [
        "Informations sur les matériaux non disponibles",
      ];

      return packagingMaterials[0]; // On prend seulement le premier matériau pour l'exemple
    } else {
      return "Produit non trouvé dans la base de données.";
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des informations :", error);
    return "Erreur lors de la récupération des informations.";
  }
};

export default function App() {
  const [facing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [productMaterial, setProductMaterial] = useState<string | null>(null); // Stocke le matériau du produit

  const handleBarcodeScanned = async ({
    type,
    data,
    cornerPoints,
    bounds,
  }: BarcodeScanningResult) => {
    setScanned(true);

    // Récupérer les informations sur l'emballage du produit
    const packagingInfo = await getProductInfo(data);
    setProductMaterial(packagingInfo);
  };

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing={facing}
        onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: [
            "aztec",
            "ean13",
            "ean8",
            "qr",
            "pdf417",
            "upc_e",
            "datamatrix",
            "code39",
            "code93",
            "itf14",
            "codabar",
            "code128",
            "upc_a",
          ],
        }}
      >
        <View style={styles.overlay}>
          <View style={styles.scanArea}>
            <Text style={styles.scanText}>Place QR Code Here</Text>
          </View>
        </View>
      </CameraView>

      {/* Afficher ScanResultScreen si le matériau du produit est défini */}
      {productMaterial && (
        <ScanResultScreen
          material={productMaterial}
          detectionMethod="Code barre" // Méthode de détection
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Slight dark overlay
  },
  scanArea: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  scanText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
