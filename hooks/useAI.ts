import { useState } from "react";
import { Platform } from "react-native";
import { CameraCapturedPicture } from "expo-camera";

import { useScanContext } from "@/context/ScanContext";
import { showNotification } from "@/constants/notification";
import { detectionMethod } from "@/types/detectionMethods";

const useAI = (
  capturedImage: CameraCapturedPicture | null | undefined,
  retakePicture: () => void,
) => {
  const { setScanData } = useScanContext(); // Accéder aux données du ScanContext
  const [aiIsProcessing, setAiIsProcessing] = useState(false);
  const [wasteTypePredictionResult, setWasteTypePredictionResult] = useState<
    string | null
  >(null);

  const imageUriToBlob = async (uri: string) => {
    const response = await fetch(uri);
    return await response.blob();
  };

  const startPrediction = async (image: CameraCapturedPicture) => {
    try {
      // Here we process the image for AI, but we're going to adapt this to send it to Flask instead
      const uri = image.uri;
      // *** Disjonction des cas, pour traiter le formData, voir [https://bmsptra.medium.com/resolving-network-request-failed-error-in-expo-app-when-uploading-images-to-server-931f5cb6bfe6]
      const formData = new FormData();

      if (Platform.OS === "web") {
        const imageBlob = await imageUriToBlob(uri);
        formData.append("file", imageBlob, "photo.jpg");
      } else {
        const fileType = uri.split(".").pop();
        /* eslint-disable @typescript-eslint/no-explicit-any */
        formData.append("file", {
          uri: uri, // Image URI
          name: `image.${fileType}`,
          type: `image/${fileType}`,
        } as any);
        /* eslint-disable @typescript-eslint/no-explicit-any */
      }

      const response = await fetch("http://192.168.1.102:5000/predict", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (result.predicted_class) {
        setWasteTypePredictionResult(result.predicted_class);
        return result.predicted_class;
      } else {
        showNotification(
          "error",
          "Image invalide",
          "L'image que vous avez fournie semble invalide. Veuillez essayer avec une autre photo.",
        );
        return null;
      }
    } catch (error) {
      showNotification(
        "error",
        "Impossible de renvoyer le résultat",
        error.message,
      );
    }
  };

  const processWasteTypePrediction = async () => {
    if (aiIsProcessing) return;

    setAiIsProcessing(true);

    if (capturedImage) {
      showNotification(
        "success",
        "Début de l'analyse",
        "La requete a été transmise, l'analyse prendra quelques secondes...",
      );
      // Process the image and send it to Flask
      const prediction = await startPrediction(capturedImage);

      if (prediction) {
        setWasteTypePredictionResult(prediction);
        setScanData({
          material: prediction,
          methodUsed: detectionMethod.AI,
          imageOfWaste: capturedImage,
        });
      }
    }
    setAiIsProcessing(false);
  };

  const makeAIAvailable = () => {
    retakePicture();
    setAiIsProcessing(false);
    setWasteTypePredictionResult(null);
  };

  return {
    //loading,
    aiIsProcessing,
    wasteTypePredictionResult,
    processWasteTypePrediction,
    makeAIAvailable,
  };
};

export default useAI;
