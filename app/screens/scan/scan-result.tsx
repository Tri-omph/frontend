import React, { useState } from "react";
import { View, StyleSheet, ImageSourcePropType } from "react-native";
import resources from "@/constants/Resources";
import TypeWasteDetected from "@/components/scan/TypeWasteDetected";
import ImageWasteDetected from "@/components/scan/ImageWasteDetected";
import SortingTrashCan from "@/components/scan/SortingTrashCan";

type ScanResultScreenProps = {
  material: string; // Le matériau du produit (ex : "aluminium")
  detectionMethod: string; // La méthode de détection (ex : "Code barre")
  imageOfWaste: ImageSourcePropType;
  //imageOfSort;
};

const ScanResultScreen: React.FC<ScanResultScreenProps> = ({
  material,
  detectionMethod,
  imageOfWaste,
}) => {
  const [showAdditionalComponents, setShowAdditionalComponents] =
    useState(false);

  const handleThumbUp = () => {
    setShowAdditionalComponents(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.popup}>
        <TypeWasteDetected
          title={`C’est du ${material}`}
          subtitle="Méthode de détection"
          activeMethod={detectionMethod}
          askUserFeedback={true}
          onThumbUp={handleThumbUp}
        />

        {showAdditionalComponents && (
          <>
            <View style={styles.separator} />
            <ImageWasteDetected
              title="Votre photo"
              subtitle="prise le {date téléphone}"
              image={imageOfWaste}
            />

            <View style={styles.separator} />
            <SortingTrashCan
              title="Quelle poubelle ?"
              subtitle="Poubelle {date téléphone}"
              image={resources.canetteCoca}
            />
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  popup: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  separator: {
    height: 1, // Épaisseur de la ligne
    backgroundColor: "#ccc", // Couleur de la ligne
  },
});

export default ScanResultScreen;
