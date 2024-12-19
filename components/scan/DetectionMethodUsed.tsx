import React from "react";
import { View, Text, ViewStyle, TextStyle } from "react-native";

type DetectionMethodUsedProps = {
  label: string; // Texte à afficher
  isActive: boolean; // Si l'élément est actif
  styles: {
    methodItem: ViewStyle; // Style pour l'élément principal
    activeMethod: ViewStyle; // Style pour l'état actif
    methodText: TextStyle; // Style pour le texte
  };
};

const DetectionMethodUsed: React.FC<DetectionMethodUsedProps> = ({
  label,
  isActive,
  styles,
}) => {
  return (
    <View style={[styles.methodItem, isActive && styles.activeMethod]}>
      <Text style={styles.methodText}>{label}</Text>
    </View>
  );
};

export default DetectionMethodUsed;
