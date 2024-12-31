import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { router } from "expo-router";

const UserTutorial = () => {
  const handleFinishTutorial = () => {
    router.replace("/(tabs)");
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Image
            source={require("@/assets/images/monstre_v1.png")}
            style={styles.monster}
          />
        </View>
        <Text style={styles.headerText}>Bienvenue dans le tutoriel</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Bienvenue sur l'application Triomph !
          </Text>
          <Text style={styles.cardText}>
            Triomph est votre assistant pour un recyclage simplifié. Ensemble,
            sensibilisons les français aux pratiques du recyclage !
          </Text>
          <FontAwesome5
            name="crown"
            size={20}
            color="#6AA84F"
            style={styles.icon}
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Nourrissez votre monstre</Text>
          <Text style={styles.cardText}>
            Plus vous recyclez, plus votre monstre grandit ! Scannez et triez
            vos déchets dans les poubelles adéquates pour le nourrir.
          </Text>
          <Text style={styles.cardText}>
            Faites-en le champion numéro un du tri !
          </Text>
          <FontAwesome5
            name="carrot"
            size={24}
            color="#6AA84F"
            style={styles.icon}
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Trois méthodes pour trier les déchets
          </Text>
          <Text style={styles.cardText}>
            1. Scannez le code-barre pour identifier rapidement l’emballage du
            déchet choisi.{"\n"}2. Utilisez la reconnaissance visuelle pour
            détecter n’importe quel type de déchet.{"\n"}3. Utilisez directement
            la recherche avancée pour vous renseigner sur un déchet.
          </Text>
          <MaterialIcons
            name="recycling"
            size={28}
            color="#6AA84F"
            style={styles.icon}
          />
        </View>
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
