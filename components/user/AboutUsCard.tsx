import React from "react";
import { View, Text, StyleSheet } from "react-native";

type AboutUsCardProps = {
  title: string; // Le titre principal
  text: string; // Le titre principal
  icon: React.ReactNode; // L'icône affichée dans le conteneur
};

const AboutUsCard: React.FC<AboutUsCardProps> = ({ title, text, icon }) => (
  <View style={styles.section}>
    <View style={styles.icon}>{icon}</View>
    <Text style={styles.sectionTitle}>{title}</Text>
    <Text style={styles.sectionText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  section: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  icon: {
    alignSelf: "center",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333333",
    textAlign: "center",
  },
  sectionText: {
    fontSize: 14,
    color: "#555555",
    lineHeight: 20,
    textAlign: "center",
  },
});

export default AboutUsCard;
