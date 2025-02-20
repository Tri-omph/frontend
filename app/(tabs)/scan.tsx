import React from "react";
import { Button, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import ScanResultScreen from "@/app/(screens)/(scan)/scan-result";
import { useScan } from "@/hooks/useScan";
import { useCamera } from "@/hooks/useCamera";
import { barcodeTypes } from "@/types/barcodeTypes";
import CameraPreview from "@/components/camera/CameraPreview";

import Toast from "react-native-toast-message";

export default function Scan() {
  const [permission, requestPermission] = useCameraPermissions();
  // Camera (prendre une photo et l'analyser avec l'IA)
  const {
    previewVisible,
    capturedImage,
    cameraRef,
    takePicture,
    retakePicture,
  } = useCamera();

  // IA n'est utilisable que si et seulement si l'utilisateur déjà pris une photo
  // **** Elle est donc utilisé au sein de CameraPreView, le composant permettant de voir une image prise par l'utilisateur ******

  // Scan (detecter le code-barre et chercher les informations correspondantes), priorité à la caméra, le scan doit s'adapter !
  const {
    scanned,
    handleBarcodeScanned,
    resetScan,
    imageOfWaste: scannedImage,
    material: scannedMaterialByBarcode,
    correctedByUser,
  } = useScan(cameraRef);

  // ********************************* Vue SCAN

  if (!permission) {
    // Chargement des permissions concernant l'accèes à la caméra
    return <View />;
  }

  if (!permission.granted) {
    // Demande explicite d'accès à la caméra
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          Vous devez accorder l'accès à la caméra à l'application
        </Text>
        <Button
          onPress={requestPermission}
          title="Donner l'accèes à la caméra"
        />
      </View>
    );
  }

  return previewVisible && capturedImage ? (
    <CameraPreview photo={capturedImage} retakePicture={retakePicture} />
  ) : (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={StyleSheet.absoluteFillObject}
        onBarcodeScanned={capturedImage ? undefined : handleBarcodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: barcodeTypes,
        }}
      >
        <View style={styles.scanArea} />

        {/* Boutton pour déclencher la photo */}
        <View style={styles.captureButtonContainer}>
          <TouchableOpacity
            onPress={takePicture}
            style={styles.captureButton}
          />
        </View>
      </CameraView>
      {((scanned && scannedImage && scannedMaterialByBarcode) ||
        correctedByUser) && (
        <ScanResultScreen imageOfWaste={scannedImage} onDismiss={resetScan} />
      )}
      <Toast />
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
  scanArea: {
    width: 250,
    height: 250,
    borderRadius: 30, // coins arrondis
    borderWidth: 4, // bordure légère
    borderColor: "white", // bordure blanche pour les coins
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -125 }, { translateY: -125 }],
    overflow: "hidden", // évite que la bordure dépasse
  },
  scanText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  captureButtonContainer: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: "#fff",
  },
});
