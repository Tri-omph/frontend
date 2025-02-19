import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import AdviceCard from "@/components/search/AdviceCard";
import { userAdvancedResearchAdvice } from "@/constants/UserAdvancedResearch";
import { router } from "expo-router";
import { detectionMethod } from "@/types/detectionMethods";
import { useScan } from "@/hooks/useScan";
import FactHeader from "@/components/general/FactHeader";

const AdvancedResearch: React.FC = () => {
  const { setScanData } = useScan();
  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    new Array(userAdvancedResearchAdvice.length).fill(null),
  );

  const handleSelectOption = (index: number, value: string) => {
    const updatedSelectedOptions = [...selectedOptions];
    updatedSelectedOptions[index] = value;
    setSelectedOptions(updatedSelectedOptions);
  };

  const onValidateClick = () => {
    console.log("Options sélectionnées :", selectedOptions);

    setScanData({
      material: selectedOptions[0],
      methodUsed: detectionMethod.Advanced,
      correctedByUser: true,
    });

    router.replace("/scan");
  };

  return (
    <ScrollView style={styles.container}>
      {/* Utilisation de FactHeader */}
      <FactHeader />

      <Text style={styles.title}>Recherche avancée</Text>
      <ScrollView style={styles.scrollView}>
        {userAdvancedResearchAdvice.map((researchItem, index) => (
          <AdviceCard
            key={index}
            title={researchItem.title}
            extraAdvice={researchItem.extraAdvice}
            options={researchItem.options}
            optionsTitle={""}
            selected={selectedOptions[index]}
            setSelected={(value) => handleSelectOption(index, value)}
          />
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.button} onPress={onValidateClick}>
        <Text style={styles.buttonText}>Valider</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
    marginTop: 60,
    marginLeft: 22, // ajout d'une marge à gauche si tu veux espacer un peu le titre
  },
  scrollView: {
    flex: 1,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6AA84F",
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 20,
    marginVertical: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AdvancedResearch;
