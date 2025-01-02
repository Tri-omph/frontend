import { router } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Toast from "react-native-toast-message";

import SettingsOption from "@/components/user/SettingsOption";
import { showNotification } from "@/constants/notification";
import { routes } from "@/routes/routes";
import { dataPolicy } from "@/constants/DataPolicy";
import resources from "@/constants/Resources";

const Politique = () => {
  const [isSavePhotosEnabled, setIsSavePhotosEnabled] = useState(false);
  const [isAIModeEnabled, setIsAIModeEnabled] = useState(false);
  const [isLocationEnabled, setIsLocationEnabled] = useState(false);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

  const toggleSavePhotos = () => setIsSavePhotosEnabled((prev) => !prev);
  const toggleAIMode = () => setIsAIModeEnabled((prev) => !prev);
  const toggleLocation = () => setIsLocationEnabled((prev) => !prev);

  // Les deux fonctions suivantes
  const toggleGettersAndSetters: [boolean, () => void][] = [
    [isSavePhotosEnabled, toggleSavePhotos],
    [isAIModeEnabled, toggleAIMode],
    [isLocationEnabled, toggleLocation],
  ];

  const handleGoToAccountCreation = () => {
    if (!isTermsAccepted) {
      showNotification(
        "error",
        "Accord manquant",
        "Vous devez accepter les Conditions Générales et la Politique de Confidentialité.",
      );
      return;
    }
    // On utilise "push" pour que l'utilisateur puisse revenir en arrière si nécessaire !
    router.push(routes.USER.SIGN_UP.getHref());
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image source={resources.monster_v1} style={styles.monster} />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Politique de gestion des données</Text>
        <Text style={styles.description}>
          Voici les modalités d’utilisation, de stockage et de protection des
          données personnelles par l’application
        </Text>

        {dataPolicy.map((item) => (
          <SettingsOption
            key={item.id}
            value={toggleGettersAndSetters[item.id - 1][0]}
            onValueChange={toggleGettersAndSetters[item.id - 1][1]}
            title={item.title}
            description={item.description}
          />
        ))}

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => setIsTermsAccepted((prev) => !prev)}
          >
            <View
              style={[
                styles.checkbox,
                { backgroundColor: isTermsAccepted ? "#6AA84F" : "#FFF" },
              ]}
            />
            <Text style={styles.checkboxText}>
              J’ai lu et j’accepte les{" "}
              <Text style={styles.link}>conditions générales</Text> et la{" "}
              <Text style={styles.link}>politique de confidentialité</Text>.
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.createAccountButton}
            onPress={handleGoToAccountCreation}
          >
            <Text style={styles.createAccountText}>Créer votre compte</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Toast />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#E8F4E1",
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  monster: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  content: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: "#555555",
    marginBottom: 20,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  optionText: {
    flex: 1,
    fontSize: 14,
    color: "#333333",
    marginLeft: 10,
  },
  optionSubtext: {
    fontSize: 12,
    color: "#777777",
  },
  footer: {
    marginTop: 20,
    alignItems: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#CCC",
    backgroundColor: "#FFF",
    marginRight: 10,
  },
  checkboxText: {
    fontSize: 14,
    color: "#555555",
  },
  link: {
    color: "#6AA84F",
    textDecorationLine: "underline",
  },
  createAccountButton: {
    backgroundColor: "#6AA84F",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 40,
  },
  createAccountText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});

export default Politique;
