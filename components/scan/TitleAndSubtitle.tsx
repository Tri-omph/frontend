import React from "react";
import { View, Text, StyleSheet } from "react-native";

type DescriptionProps = {
  title: string; // Le titre principal
  subtitle: string; // Le titre secondaire
};

const TitleAndSubtitle: React.FC<DescriptionProps> = ({ title, subtitle }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    alignItems: "flex-start", // Aligne les éléments à gauche
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginTop: 5,
  },
});

export default TitleAndSubtitle;
