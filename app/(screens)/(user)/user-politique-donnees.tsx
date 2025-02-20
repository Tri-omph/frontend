import { router } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Toast from "react-native-toast-message";

import { useUserInformation } from "@/context/UserInformationContext";
import { showNotification } from "@/constants/notification";
import { routes } from "@/routes/routes";
import { dataPolicy } from "@/constants/DataPolicy";
import Header from "@/components/general/Header";
import SettingsOption from "@/components/user/SettingsOption";

const Politique = () => {
  const [isSavePhotosEnabled, setIsSavePhotosEnabled] = useState(true);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

  const { setUserData } = useUserInformation();

  /* On sauvegarde dans le contexte useUserInformation la valeur donnée par l'utilisateur */
  const toggleSavePhotos = () => {
    setIsSavePhotosEnabled((prev) => !prev);
    setUserData({ saveImage: !isSavePhotosEnabled });
  };

  // Les deux fonctions suivantes
  const toggleGettersAndSetters: [boolean, () => void][] = [
    [isSavePhotosEnabled, toggleSavePhotos],
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
    <ScrollView style={styles.container}>
      {/* En-tête avec l'image */}
      <Header />

      <Text style={styles.title}>Politique de gestion des données</Text>
      <Text style={styles.subtitle}>
        Voici les modalités d’utilisation, de stockage et de protection des
        données personnelles par l’application
      </Text>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={true}
      >
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
      </ScrollView>

      <Toast />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#67AA52",
    marginTop: 20,
    paddingLeft: 20,
  },
  subtitle: {
    fontSize: 13,
    color: "#555",
    paddingLeft: 20,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
  },
  optionText: {
    flex: 1,
    fontSize: 14,
    color: "#333",
    marginLeft: 10,
  },
  optionSubtext: {
    fontSize: 12,
    color: "#777",
  },
  optionButton: {
    backgroundColor: "#67AA52",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  optionButtonText: {
    color: "#FFF",
    fontWeight: "bold",
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
    color: "#555",
  },
  link: {
    color: "#67AA52",
    textDecorationLine: "underline",
  },
  createAccountButton: {
    backgroundColor: "#67AA52",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 40,
  },
  createAccountText: {
    fontSize: 16,
    color: "#FFF",
    fontWeight: "bold",
  },
});

export default Politique;
