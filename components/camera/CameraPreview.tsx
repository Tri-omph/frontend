import React from "react";
import {
  View,
  ImageBackground,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { CameraCapturedPicture } from "expo-camera";
import Toast from "react-native-toast-message";

import ScanResultScreen from "@/app/(screens)/(scan)/scan-result";
import useAI from "@/hooks/useAI";
import { detectionMethod } from "@/types/detectionMethods";

type CameraPreviewProps = {
  photo: CameraCapturedPicture;
  retakePicture: () => void;
  keepPicture?: (() => void) | undefined;
};

const CameraPreview: React.FC<CameraPreviewProps> = ({
  photo,
  retakePicture,
  keepPicture,
}) => {
  const {
    aiIsProcessing,
    wasteTypePredictionResult,
    processWasteTypePrediction,
    makeAIAvailable,
  } = useAI(photo, retakePicture);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: photo && photo.uri }}
        style={styles.imageBackground}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={aiIsProcessing ? undefined : retakePicture}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Reprendre</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={
              keepPicture !== undefined
                ? keepPicture
                : processWasteTypePrediction
            }
            style={styles.button}
          >
            <Text style={styles.buttonText}>Analyser</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>

      {!aiIsProcessing && wasteTypePredictionResult && photo && (
        <ScanResultScreen
          material={wasteTypePredictionResult.toLowerCase()}
          imageOfWaste={photo}
          detectionMethod={detectionMethod.AI}
          onDismiss={makeAIAvailable}
        />
      )}
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    flex: 1,
    width: "100%",
    height: "100%",
  },
  imageBackground: {
    flex: 1,
    justifyContent: "flex-end",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
  },
  button: {
    backgroundColor: "#ffffff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CameraPreview;
