import React from "react";
import { View, StyleSheet } from "react-native";
import TypeWasteDetected from "@/components/scan/TypeWasteDetected";

const ScanResultScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.popup}>
        <TypeWasteDetected
          title="C’est de l’aluminium"
          subtitle="Méthode de détection"
          activeMethod="IA"
          askUserFeedback={true}
        />
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
});

export default ScanResultScreen;
