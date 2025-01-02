import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { router } from "expo-router";

import TutorialCard from "@/components/user/TutorialCard";
import { tutorialData } from "@/constants/Tutorial";
import resources from "@/constants/Resources";

const UserTutorial = () => {
  const handleFinishTutorial = () => {
    router.replace("/(tabs)");
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Image source={resources.monster_v1} style={styles.monster} />
        </View>
        <Text style={styles.headerText}>Bienvenue dans le tutoriel</Text>

        {tutorialData.map((item, index) => (
          <TutorialCard
            key={index}
            title={item.title}
            text={item.text}
            icon={item.icon}
          />
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={handleFinishTutorial}>
          <Text style={styles.buttonText}>J'ai compris !</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8F4E1",
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    backgroundColor: "#E8F4E1",
    width: "100%",
  },
  monster: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  footer: {
    backgroundColor: "#E8F4E1",
    padding: 10,
    borderTopWidth: 0,
    borderTopColor: "#DDD",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#6AA84F",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 40,
  },
  buttonText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});

export default UserTutorial;
