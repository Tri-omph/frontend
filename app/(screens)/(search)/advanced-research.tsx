import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import AdviceCard from "@/components/search/AdviceCard";
import { userAdvancedResearchAdvice } from "@/constants/UserAdvancedResearch";
import { router, useLocalSearchParams } from "expo-router";

const AdvancedResearch: React.FC = () => {
  const { imageOfWasteToCorrect } = useLocalSearchParams();
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
    router.replace({
      pathname: "/scan",
      params: {
        wasteCorrectedByUser: selectedOptions[0],
        imageOfWasteToCorrect: imageOfWasteToCorrect,
      },
    });
  };

  return (
    <View style={styles.container}>
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
        <Text>Valider</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  scrollView: {
    flex: 1,
    marginBottom: 5,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6AA84F",
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 20,
    marginTop: 20,
  },
});

export default AdvancedResearch;
