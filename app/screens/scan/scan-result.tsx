import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import resources from "@/constants/Resources";
import TypeWasteDetected from "@/components/scan/TypeWasteDetected";
import ImageWasteDetected from "@/components/scan/ImageWasteDetected";
import SortingTrashCan from "@/components/scan/SortingTrashCan";

const ScanResultScreen = () => {
  const [showAdditionalComponents, setShowAdditionalComponents] =
    useState(false);

  const handleThumbUp = () => {
    setShowAdditionalComponents(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.popup}>
        <TypeWasteDetected
          title="C’est de l’aluminium"
          subtitle="Méthode de détection"
          activeMethod="IA"
          askUserFeedback={true}
          onThumbUp={handleThumbUp}
        />

        {showAdditionalComponents && (
          <>
            <View style={styles.separator} />
            <ImageWasteDetected
              title="Votre photo"
              subtitle="prise le {date téléphone}"
              image={resources.canetteCoca}
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
