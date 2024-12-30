import React from "react";
import { Button, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import ScanResultScreen from "@/app/(screens)/(scan)/scan-result";
import { useScan } from "@/hooks/useScan";
import { useCamera } from "@/hooks/useCamera";
import { detectionMethod } from "@/types/detectionMethods";
import { barcodeTypes } from "@/types/barcodeTypes";
import CameraPreview from "@/components/camera/CameraPreview";

import Toast from "react-native-toast-message";
import useAI from "@/hooks/useAI";

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();
  // Camera (prendre une photo et l'analyser avec l'IA)
  const {
    previewVisible,
    capturedImage,
    cameraRef,
    takePicture,
    retakePicture,
  } = useCamera();
  // IA
  const {
    aiIsProcessing,
    wasteTypePredictionResult,
    processWasteTypePrediction,
    makeAIAvailable,
  } = useAI(capturedImage, retakePicture);

  // Scan (detecter le code-barre et chercher les informations correspondantes), priorité à la caméra, le scan doit s'adapter !
  const {
    scanned,
    scannedImage,
    scannedMaterialByBarcode,
    handleBarcodeScanned,
    resetScan,
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
    <CameraPreview
      photo={capturedImage}
      retakePicture={aiIsProcessing ? undefined : retakePicture}
      keepPicture={processWasteTypePrediction}
    />
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

      {scanned && scannedImage && scannedMaterialByBarcode && (
        <ScanResultScreen
          material={scannedMaterialByBarcode}
          imageOfWaste={scannedImage}
          detectionMethod={detectionMethod.Barcode}
          onDismiss={resetScan}
        />
      )}

      {!aiIsProcessing && wasteTypePredictionResult && capturedImage && (
        <ScanResultScreen
          material={wasteTypePredictionResult.toLowerCase()}
          imageOfWaste={capturedImage}
          detectionMethod={detectionMethod.AI}
          onDismiss={makeAIAvailable}
        />
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
    borderWidth: 2,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -125 }, { translateY: -125 }],
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
