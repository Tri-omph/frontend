import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

interface FactCardProps {
  buttonText: string;
  factText: string;
  onButtonPress?: () => void;
  style?: ViewStyle;
}

const FactCard: React.FC<FactCardProps> = ({
  buttonText,
  factText,
  onButtonPress,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity style={styles.button} onPress={onButtonPress}>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>
      <Text style={styles.factText}>{factText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#6AA84F", // Fond vert
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 20,
  },
  button: {
    backgroundColor: "black", // Bouton noir
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignSelf: "flex-start", // Pour que le bouton ne prenne pas toute la largeur
  },
  buttonText: {
    color: "white", // Texte blanc
    fontWeight: "bold",
  },
  factText: {
    color: "white", // Texte blanc
    marginTop: 10, // Espacement après le bouton
    fontSize: 14,
  },
});

export default FactCard;
