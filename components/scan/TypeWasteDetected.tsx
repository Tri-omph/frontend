import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import TitleAndSubtitle from "@/components/scan/TitleAndSubtitle";
import DetectionMethodUsed from "@/components/scan/DetectionMethodUsed";
import { detectionMethod } from "@/types/detectionMethods";

type TypeWasteDetectedProps = {
  title: string; // Titre principal
  subtitle: string; // Titre secondaire
  activeMethod: string; // Méthode active (par ex. "IA")
  askUserFeedback?: boolean;
  onThumbUp?: () => void; // Ajout de la fonction callback pour pouce du haut
  onThumbDown?: () => void; // Ajout de la fonction callback pour pouce du bas
};

const TypeWasteDetected: React.FC<TypeWasteDetectedProps> = ({
  title,
  subtitle,
  activeMethod,
  askUserFeedback = false,
  onThumbUp,
  onThumbDown,
}) => {
  const allDetectionMethods = Object.values(detectionMethod);
  const [feedbackGiven, setFeedbackGiven] = useState(false); // État local pour gérer la visibilité des boutons => si le feedback a été donné, les boutons disparaissent !

  const handleFeedback = (type: "thumbUp" | "thumbDown") => {
    setFeedbackGiven(true);
    if (type === "thumbUp" && onThumbUp) {
      onThumbUp();
    }
    if (type === "thumbDown" && onThumbDown) {
      onThumbDown();
    }
  };

  return (
    <View style={styles.container}>
      {/* Message de confirmation */}
      <Text style={styles.detectionMessage}>
        {"✅ L'application a bien détecté votre déchet"}
      </Text>

      {/* Ligne avec description et boutons */}
      <View style={styles.rowContainer}>
        <View style={styles.titleAndSubtitleContainer}>
          <TitleAndSubtitle title={title} subtitle={subtitle} />
        </View>

        {/* Dans le cas où le feedback user est attendu: boutons d'approbation et de rejet */}
        {askUserFeedback && !feedbackGiven && (
          <View style={styles.feedbackContainer}>
            <TouchableOpacity
              style={styles.feedbackButton}
              onPress={() => handleFeedback("thumbUp")}
            >
              <Text style={styles.feedbackText}>👍</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.feedbackButton}
              onPress={() => handleFeedback("thumbDown")}
            >
              <Text style={styles.feedbackText}>👎</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Liste des méthodes de détection */}
      <View style={styles.methodContainer}>
        {allDetectionMethods.map((method) => (
          <DetectionMethodUsed
            key={method}
            label={method}
            isActive={activeMethod === method}
            styles={{
              methodItem: styles.methodItem,
              activeMethod: styles.activeMethod,
              methodText: styles.methodText,
            }}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  detectionMessage: {
    fontSize: 16,
    color: "#4CAF50",
    marginBottom: 10,
    fontWeight: "600",
    textAlign: "left",
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleAndSubtitleContainer: {
    flex: 7, // 70% of the space
  },
  feedbackContainer: {
    flex: 3, // 30% of the space
    flexDirection: "row",
  },
  feedbackButton: {
    marginHorizontal: 5,
    backgroundColor: "#F5F5F5",
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  feedbackText: {
    fontSize: 24,
  },
  methodContainer: {
    flexDirection: "row", // Les boutons sont alignés en ligne
    justifyContent: "space-between", // Ajoute un espace égal entre les boutons
    marginVertical: 5,
  },
  methodItem: {
    flex: 1, // Les boutons occupent un espace égal
    marginHorizontal: 5, // Petit espace entre les boutons
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: "#F5F5F5", // Couleur de fond par défaut
  },
  activeMethod: {
    backgroundColor: "#4CAF50", // Couleur verte pour l'élément actif
  },
  methodText: {
    fontSize: 16,
    textAlign: "center",
    color: "#000", // Couleur du texte
  },
});

export default TypeWasteDetected;
