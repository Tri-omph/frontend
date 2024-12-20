import React from "react";
import {
  View,
  StyleSheet,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
} from "react-native";
import ContentWithImage from "@/components/scan/ContentWithImage";

type SortingTrashCanProps = {
  title: string; // Titre principal
  subtitle: string; // Titre secondaire
  image: ImageSourcePropType;
};

const SortingTrashCan: React.FC<SortingTrashCanProps> = ({
  title,
  subtitle,
  image,
}) => {
  return (
    <View style={styles.container}>
      <ContentWithImage title={title} subtitle={subtitle} image={image}>
        {/* Injection de deux boutons "C'est trié" et "Indisponible", occupe t-en chat */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={[styles.button, styles.greenButton]}>
            <Text style={styles.buttonText}>C'est trié</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.blackButton]}>
            <Text style={styles.buttonText}>Indisponible</Text>
          </TouchableOpacity>
        </View>
      </ContentWithImage>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  buttonsContainer: {
    flexDirection: "row", // Disposer les boutons côte à côte
    justifyContent: "space-between", // Espacement entre les boutons
    marginTop: 10, // Espace au-dessus des boutons
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: "#4CAF50", // Couleur de fond pour "C'est trié"
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  greenButton: {
    backgroundColor: "#4CAF50", // Fond vert pour "C'est trié"
  },
  blackButton: {
    backgroundColor: "#000", // Fond noir pour "Indisponible"
  },
  buttonText: {
    color: "#fff", // Texte en blanc
    fontSize: 16,
  },
});

export default SortingTrashCan;
