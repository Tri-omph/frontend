import { useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-react-native";
import { bundleResourceIO, decodeJpeg } from "@tensorflow/tfjs-react-native";
import * as FileSystem from "expo-file-system";
import { showNotification } from "@/constants/notification";
import { CameraCapturedPicture } from "expo-camera";

// Charger le modèle
const modelJson = require("@/offline_ai_tfjs/model");
const modelWeights = [
  require("@/offline_ai_tfjs/group1-shard1of4.bin"),
  require("@/offline_ai_tfjs/group1-shard2of4.bin"),
  require("@/offline_ai_tfjs/group1-shard3of4.bin"),
  require("@/offline_ai_tfjs/group1-shard4of4.bin"),
];

const RESULT_MAPPING = [
  "PILE",
  "CARTON",
  "VERRE",
  "MÉTAL",
  "PAPIER",
  "PLASTIQUE",
  "TEXTILE",
  "ORDURES",
];

/**
 * Transforme une image à partir de son URI en un "tensor" prêt à être utilisé par le modèle TensorFlow.js.
 * Ce prétraitement est basé sur la fonction `preprocess_image` utilisée dans le fichier Python `testTF.py` dans le depot 'ia'.
 *
 * /!\ SI LA PROCEDURE DE PREPROCESSING EVOLUE DANS LE DEPOT 'ia', elle devra aussi évoulée ici !
 *
 * @param uri L'URI (ou chemin) local de l'image à prétraiter.
 * @returns Un tensor TensorFlow.js prêt pour la prédiction ou `null` en cas d'erreur.
 *
 * @throws Error Si une erreur se produit lors de la lecture ou du prétraitement de l'image.
 */
const preprocessImageToTensor = async (uri: string) => {
  try {
    const img64 = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    // Décoder l'image JPEG
    const imgBuffer = tf.util.encodeString(img64, "base64").buffer;
    const raw = new Uint8Array(imgBuffer);

    // Convertir l'image en tensor
    let imgTensor = decodeJpeg(raw);
    imgTensor = tf.image.resizeBilinear(imgTensor, [224, 224]).toFloat();

    // Normaliser l'image
    const mean = tf.tensor1d([0.485, 0.456, 0.406]);
    const std = tf.tensor1d([0.229, 0.224, 0.225]);
    imgTensor = imgTensor.div(tf.scalar(255.0)).sub(mean).div(std);

    // Ajouter la dimension batch
    const imgWithBatch = imgTensor.expandDims(0);
    return imgWithBatch;
  } catch (error) {
    console.error("Error transforming image to tensor: ", error);
    return null;
  }
};

const makePredictions = async (
  model: tf.GraphModel,
  img: tf.Tensor<tf.Rank>,
) => {
  const predictions = await model.executeAsync(img);
  return (predictions as tf.Tensor).dataSync();
};

const useAI = (
  capturedImage: CameraCapturedPicture | null | undefined,
  retakePicture: () => void,
) => {
  const [model, setModel] = useState<tf.GraphModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [aiIsProcessing, setAiIsProcessing] = useState(false);
  const [wasteTypePredictionResult, setWasteTypePredictionResult] = useState<
    string | null
  >(null);

  useEffect(() => {
    if (model) return; // Évite de recharger le modèle s'il est déjà disponible

    const loadModel = async () => {
      try {
        // Attendre que tensorflow soit prêt
        await tf.ready();
        // Charger le modèle
        const loadedModel = await tf.loadGraphModel(
          bundleResourceIO(modelJson, modelWeights),
        );
        setModel(loadedModel);
      } catch (err) {
        console.log(
          "Une erreur est survenue lors du chargement du modèle d'IA. Veuillez réessayer plus tard. Détails : " +
            err,
        );
        showNotification(
          "error",
          "Impossible de charger l'IA",
          "Une erreur est survenue lors du chargement du modèle d'IA. Veuillez réessayer plus tard. Détails : " +
            err,
        );
      } finally {
        setLoading(false); // S'assure que loading est mis à jour, même en cas d'erreur
      }
    };

    loadModel();
    // ATTENTION : Dans notre application, nous chargeons toujours le même modèle et une seule fois,
    // car seule la tab "scan" a accès à ce modèle.
    //
    // Si un jour d'autres composants appellent ce modèle (par exemple, si on permet à plusieurs
    // composants d'utiliser ce modèle), il faudra alors réactiver le code de nettoyage ci-dessous.
    //
    // return () => {
    //   if (model) {
    //     model.dispose();
    //   }
    // };
  });

  const startPrediction = async (
    image: CameraCapturedPicture,
    classes: string[] = RESULT_MAPPING,
  ) => {
    try {
      if (!model) return;

      const imgTensor = await preprocessImageToTensor(image.uri);

      if (!imgTensor || imgTensor.size === 0) {
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

      const output = await makePredictions(model, imgTensor);
      console.log(output);

      if (output === undefined) {
        console.log("l'IA n'a rien renvoyé. Veuillez réessayer.");
        showNotification(
          "error",
          "Résultat invalide",
          "l'IA n'a rien renvoyé. Veuillez réessayer.",
        );
        return null;
      }

      const predictedClassIdx = output.indexOf(Math.max(...output));

      return classes[predictedClassIdx];
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
      return null;
    }
  };

  const processWasteTypePrediction = async () => {
    if (aiIsProcessing) return; // Déjà en cours de traitement ...

    console.log("Votre image est en cours d'analyse");

    setAiIsProcessing(true);

    if (model && capturedImage) {
      showNotification(
        "success",
        "Début de l'analyse",
        "Le modèle a été chargé, l'analyse prendra quelques secondes...",
      );
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
    loading,
    aiIsProcessing,
    wasteTypePredictionResult,
    processWasteTypePrediction,
    makeAIAvailable,
  };
};

export default useAI;
