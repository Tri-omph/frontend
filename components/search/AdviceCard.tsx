import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { UserAdvancedResearchType } from "@/constants/UserAdvancedResearch";
import FilterWithSingleOption from "@/components/filters/FilterWithSingleOption";

type UserAdvancedResearchAdviceType = UserAdvancedResearchType & {
  optionsTitle: string;
  selected: string | null;
  setSelected: (value: string) => void;
};
// TODO: Expérience utilsateur semble un peu perturbée par la lenteur des "FilterWithSingleOption"!
const AdviceCard: React.FC<UserAdvancedResearchAdviceType> = ({
  title,
  extraAdvice,
  options,
  optionsTitle,
  selected,
  setSelected,
}) => {
  const [expandedAdvice, setExpandedAdvice] = useState<boolean>(false);

  const toggleExtraAdvice = () => {
    setExpandedAdvice((prev) => !prev);
  };

  const data = Object.entries(options).map(([key, value], index) => ({
    key: (index + 1).toString(),
    value: value,
  }));

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <TouchableOpacity onPress={toggleExtraAdvice} style={styles.cardHeader}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.toggleButton}>{expandedAdvice ? "−" : "+"}</Text>
        </TouchableOpacity>
        {expandedAdvice && (
          <Text style={styles.extraAdvice}>{extraAdvice}</Text>
        )}
        <FilterWithSingleOption
          filterTitle={optionsTitle}
          selected={selected}
          setSelected={setSelected}
          data={data}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1, // Ajoute l'épaisseur du contour
    borderColor: "#D3D3D3", // Définir la couleur du contour (gris)
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
  },
  toggleButton: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#6AA84F",
  },
  extraAdvice: {
    marginTop: 10,
    fontSize: 14,
    color: "#555555",
  },
});

export default AdviceCard;
