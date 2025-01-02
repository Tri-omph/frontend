import React from "react";
import { View, Text, StyleSheet } from "react-native";

type TutorialCardProps = {
  title: string; // Le titre principal
  text: string; // Le titre principal
  icon: React.ReactNode; // L'icône affichée dans le conteneur
};

const TutorialCard: React.FC<TutorialCardProps> = ({ title, text, icon }) => (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>{title}</Text>
    <Text style={styles.cardText}>{text}</Text>
    <View style={styles.icon}>{icon}</View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    width: "100%",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  cardText: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
  },
  icon: {
    marginTop: 10,
    alignSelf: "flex-end",
  },
});

export default TutorialCard;
