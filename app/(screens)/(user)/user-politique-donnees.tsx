import { showNotification } from "@/constants/notification";
import { routes } from "@/routes/routes";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Toast from "react-native-toast-message";

const Politique = () => {
  const [isSavePhotosEnabled, setIsSavePhotosEnabled] = useState(false);
  const [isAIModeEnabled, setIsAIModeEnabled] = useState(false);
  const [isLocationEnabled, setIsLocationEnabled] = useState(false);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

  const toggleSavePhotos = () => setIsSavePhotosEnabled((prev) => !prev);
  const toggleAIMode = () => setIsAIModeEnabled((prev) => !prev);
  const toggleLocation = () => setIsLocationEnabled((prev) => !prev);

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
        <Image
          source={require("@/assets/images/monstre_v1.png")}
          style={styles.monster}
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Politique de gestion des données</Text>
        <Text style={styles.description}>
          Voici les modalités d’utilisation, de stockage et de protection des
          données personnelles par l’application
        </Text>

        <View style={styles.option}>
          <Switch
            value={isSavePhotosEnabled}
            onValueChange={toggleSavePhotos}
            trackColor={{ false: "#ccc", true: "#6AA84F" }}
            thumbColor={isSavePhotosEnabled ? "#FFFFFF" : "#f4f3f4"}
          />
          <Text style={styles.optionText}>
            Permettre à l’application de conserver vos photos{"\n"}
            <Text style={styles.optionSubtext}>
              Vos photos apparaîtront dans votre historique de scans. Elles
              seront visibles par vous et par l’administrateur.
            </Text>
          </Text>
        </View>

        {/* AI Training Switch */}
        <View style={styles.option}>
          <Switch
            value={isAIModeEnabled}
            onValueChange={toggleAIMode}
            trackColor={{ false: "#ccc", true: "#6AA84F" }}
            thumbColor={isAIModeEnabled ? "#FFFFFF" : "#f4f3f4"}
          />
          <Text style={styles.optionText}>
            Permettre à l’IA de s’entraîner grâce à vos retours{"\n"}
            <Text style={styles.optionSubtext}>
              Si vous êtes en mode “recherche avancée” alors l’IA n’a pas su
              répondre à vos attentes, nous pourrons l’améliorer grâce à vos
              retours.
            </Text>
          </Text>
        </View>

        <View style={styles.option}>
          <Switch
            value={isLocationEnabled}
            onValueChange={toggleLocation}
            trackColor={{ false: "#ccc", true: "#6AA84F" }}
            thumbColor={isLocationEnabled ? "#FFFFFF" : "#f4f3f4"}
          />
          <Text style={styles.optionText}>
            Permettre à l’application de vous localiser{"\n"}
            <Text style={styles.optionSubtext}>
              Votre localisation permet à l’application de déterminer les zones
              de tri et les poubelles disponibles autour de vous ! L’application
              ne stocke pas votre localisation !
            </Text>
          </Text>
        </View>

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
    backgroundColor: "#F5F5F5",
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
