import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { router } from "expo-router";

const UserTutorial = () => {
  const handleFinishTutorial = () => {
    router.replace("/user-sign-in");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Bienvenue dans le tutoriel</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          Bonjour et bienvenue sur l'application Triomph !
        </Text>
        <Text style={styles.cardText}>
          Triomph est votre assistant pour un recyclage simplifié. Ensemble,
          sensibilisons le marché français au recyclage !
        </Text>
        <FontAwesome5
          name="crown"
          size={24}
          color="#6AA84F"
          style={styles.icon}
        />
      </View>

      {/* Section 2 */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Principe : Nourrissez le monstre !</Text>
        <Text style={styles.cardText}>
          Plus vous recyclez, plus votre monstre grandit ! Scannez et triez vos
          déchets dans les poubelles adéquates pour le nourrir.
        </Text>
        <Text style={styles.cardText}>Faites-en un champion du tri ! </Text>
        <FontAwesome5
          name="carrot"
          size={24}
          color="#6AA84F"
          style={styles.icon}
        />
      </View>

      {/* Section 3 */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          Deux méthodes pour trier les déchets
        </Text>
        <Text style={styles.cardText}>
          - Scannez le code-barre pour identifier rapidement l’emballage du
          déchet choisi.{"\n"}- Utilisez la reconnaissance visuelle pour
          détecter n’importe quel type de déchet.
        </Text>
        <MaterialIcons
          name="camera-alt"
          size={24}
          color="#6AA84F"
          style={styles.icon}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleFinishTutorial}>
        <Text style={styles.buttonText}>J'ai compris !</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8F4E1",
    alignItems: "center",
    padding: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
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

export default UserTutorial;
