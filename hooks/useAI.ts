import { useState } from "react";
import { Platform } from "react-native";
import { CameraCapturedPicture } from "expo-camera";

import { useScanContext } from "@/context/ScanContext";
import { showNotification } from "@/constants/notification";
import { detectionMethod } from "@/types/detectionMethods";

const IA_URL = process.env.EXPO_PUBLIC_IA_URL;

const useAI = (
  capturedImage: CameraCapturedPicture | null | undefined,
  retakePicture: () => void,
) => {
  const { setScanData } = useScanContext(); // Accéder aux données du ScanContext
  const [aiIsProcessing, setAiIsProcessing] = useState(false);
  const [wasteTypePredictionResult, setWasteTypePredictionResult] = useState<
    string | null
  >(null);

  if (!IA_URL) {
    showNotification(
      "error",
      "Impossible d'accéder à l'IA",
      "Veuillez renseigner un URL valide",
    );
    return;
  }

  /** Convertit une URI d’image en blob */
  const imageUriToBlob = async (uri: string) => {
    const response = await fetch(uri);
    return await response.blob();
  };

  /** Prépare le FormData en fonction de la plateforme (web ou mobile) */
  const prepareFormData = async (imageUri: string): Promise<FormData> => {
    const formData = new FormData();

    if (Platform.OS === "web") {
      const imageBlob = await imageUriToBlob(imageUri);
      formData.append("file", imageBlob, "photo.jpg");
    } else {
      const fileType = imageUri.split(".").pop();
      /* eslint-disable @typescript-eslint/no-explicit-any */
      formData.append("file", {
        uri: imageUri,
        name: `image.${fileType}`,
        type: `image/${fileType}`,
      } as any);
      /* eslint-disable @typescript-eslint/no-explicit-any */
    }

    return formData;
  };

  /** Gère les erreurs d'appel API */
  const handleError = (error: unknown) => {
    showNotification(
      "error",
      "Erreur lors de l'analyse",
      error instanceof Error
        ? error.message
        : "Une erreur inconnue s'est produite.",
    );
    setAiIsProcessing(false);
  };

  /** Envoie l'image à l'IA et retourne la prédiction */
  const uploadImageToAI = async (
    image: CameraCapturedPicture,
  ): Promise<string | null> => {
    try {
      const formData = await prepareFormData(image.uri);
      const response = await fetch(IA_URL!, { method: "POST", body: formData });
      const result = await response.json();

      if (!result.predicted_class) {
        showNotification(
          "error",
          "Image invalide",
          "L'image fournie semble invalide. Veuillez réessayer.",
        );
        return null;
      }

      return result.predicted_class;
    } catch (error) {
      handleError(error);
      return null;
    }
  };

  /** Démarre la prédiction et met à jour le contexte */
  const processWasteTypePrediction = async () => {
    if (aiIsProcessing || !capturedImage) return;

    setAiIsProcessing(true);
    showNotification(
      "success",
      "Début de l'analyse",
      "Analyse en cours, veuillez patienter...",
    );

    const prediction = await uploadImageToAI(capturedImage);
    if (prediction) {
      setWasteTypePredictionResult(prediction);
      setScanData({
        material: prediction,
        methodUsed: detectionMethod.AI,
        imageOfWaste: capturedImage,
      });
    }

    setAiIsProcessing(false);
  };

  /** Réinitialise l'état du hook */
  const makeAIAvailable = () => {
    retakePicture();
    setAiIsProcessing(false);
    setWasteTypePredictionResult(null);
  };

  return {
    aiIsProcessing,
    wasteTypePredictionResult,
    processWasteTypePrediction,
    makeAIAvailable,
  };
};

export default useAI;
