import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import { router } from "expo-router";

import AboutUsCard from "@/components/user/AboutUsCard";
import { aboutUsData } from "@/constants/AboutUs";
import resources from "@/constants/Resources";

const AboutUs = () => {
  const goBack = () => {
    router.replace("/(tabs)");
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>À propos de nous</Text>
        <Image source={resources.monster_v2} style={styles.headerImage} />
      </View>

      {aboutUsData.map((item, index) => (
        <AboutUsCard
          key={index}
          title={item.title}
          text={item.text}
          icon={item.icon}
        />
      ))}

      <Pressable style={styles.button} onPress={goBack}>
        <Text style={styles.buttonText}>Revenir à l'accueil</Text>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#E8F4E1",
    padding: 20,
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 10,
  },
  headerImage: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
  button: {
    backgroundColor: "#6AA84F",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 40,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});

export default AboutUs;
