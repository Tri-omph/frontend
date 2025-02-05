import { useState } from "react";
//import * as FileSystem from "expo-file-system";
import { showNotification } from "@/constants/notification";
import { CameraCapturedPicture } from "expo-camera"; // CameraCapturedPicture is what you get after capturing the image

const useAI = (
  capturedImage: CameraCapturedPicture | null | undefined,
  retakePicture: () => void,
) => {
  //const [loading, setLoading] = useState(true);
  const [aiIsProcessing, setAiIsProcessing] = useState(false);
  const [wasteTypePredictionResult, setWasteTypePredictionResult] = useState<
    string | null
  >(null);

  const startPrediction = async (image: CameraCapturedPicture) => {
    try {
      // Here we process the image for AI, but we're going to adapt this to send it to Flask instead
      const uri = image.uri;
      const response_uri = await fetch(uri);
      const blob = await response_uri.blob(); // Convert the image to a Blob

      // Create a FormData object and append the file
      const formData = new FormData();
      formData.append("file", blob, "photo.jpg");

      const response = await fetch("http://10.188.232.115:5000/predict", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (result.predicted_class) {
        setWasteTypePredictionResult(result.predicted_class);
        return result.predicted_class;
      } else {
        console.log(
          "L'image que vous avez fournie semble invalide. Veuillez essayer avec une autre photo.",
        );
        showNotification(
          "error",
          "Image invalide",
          "L'image que vous avez fournie semble invalide. Veuillez essayer avec une autre photo.",
        );
        return null;
      }
    } catch (error) {
      console.log(
        "Une erreur est survenue lors de l'utilisation de l'IA. Veuillez réessayer plus tard.",
        error,
      );
      showNotification(
        "error",
        "Impossible de renvoyer le résultat",
        "Une erreur est survenue lors de l'utilisation de l'IA. Veuillez réessayer plus tard.",
      );
    }
  };

  const processWasteTypePrediction = async () => {
    if (aiIsProcessing) return;

    console.log("Votre image est en cours d'analyse");

    setAiIsProcessing(true);

    if (capturedImage) {
      showNotification(
        "success",
        "Début de l'analyse",
        "Le modèle a été chargé, l'analyse prendra quelques secondes...",
      );
      // Process the image and send it to Flask
      const prediction = await startPrediction(capturedImage);

      if (prediction) {
        setWasteTypePredictionResult(prediction);
        console.log(`C'est du ${prediction}`);
        showNotification(
          "success",
          "Résultat IA => SUPPP",
          `C'est du ${prediction}`,
        );
      }
    } else {
      console.log(
        'Le model n\'est pas chargé. Relancer la requete en appuyant à noubeau sur "Analyser"',
      );
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
