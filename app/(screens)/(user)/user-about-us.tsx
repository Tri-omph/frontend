import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";

const AboutUs = () => {
  const goBack = () => {
    console.log("Inscription");
    router.replace("/(tabs)");
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>À propos de nous</Text>
        <Image
          source={require("@/assets/images/monstre_v2.png")}
          style={styles.headerImage}
        />
      </View>

      <View style={styles.section}>
        <MaterialIcons
          name="school"
          size={30}
          color="#6AA84F"
          style={styles.icon}
        />
        <Text style={styles.sectionTitle}>Notre projet</Text>
        <Text style={styles.sectionText}>
          Triomph est un projet né dans le cadre de notre dernière année
          d'études à Polytech Paris-Saclay, en partenariat avec Viveris. Notre
          mission : sensibiliser les Français aux pratiques du recyclage grâce à
          une application ludique et innovante.
        </Text>
      </View>

      <View style={styles.section}>
        <FontAwesome5
          name="leaf"
          size={30}
          color="#6AA84F"
          style={styles.icon}
        />
        <Text style={styles.sectionTitle}>Pourquoi cette application ?</Text>
        <Text style={styles.sectionText}>
          Le recyclage est un enjeu crucial pour préserver notre planète. Nous
          avons voulu créer une solution accessible à tous, qui guide les
          utilisateurs dans le tri de leurs déchets tout en rendant ce geste
          éco-responsable amusant et gratifiant.
        </Text>
      </View>

      <View style={styles.section}>
        <MaterialIcons
          name="group"
          size={30}
          color="#6AA84F"
          style={styles.icon}
        />
        <Text style={styles.sectionTitle}>Qui sommes-nous ?</Text>
        <Text style={styles.sectionText}>
          Nous sommes cinq étudiants spécialisés en informatique et ingénierie
          mathématique :
        </Text>
        <View style={styles.teamList}>
          <View style={styles.teamList}>
            <Text style={styles.teamMember}>
              👩‍💻 Léa - Développeuse en herbe et experte en pixels perdus
            </Text>
            <Text style={styles.teamMember}>
              👨‍💻 Cyril - Roi du front et dompteur de bugs capricieux
            </Text>
            <Text style={styles.teamMember}>
              👩‍💻 Marie - Magicienne du back et reine des bases de données
            </Text>
            <Text style={styles.teamMember}>
              👨‍💻 Simon - Maître des algorithmes et chercheur de variables
              égarées
            </Text>
            <Text style={styles.teamMember}>
              👩‍💻 Eva - Architecte de l'IA et chasseuse de null pointer
              exceptions
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <FontAwesome5
          name="seedling"
          size={30}
          color="#6AA84F"
          style={styles.icon}
        />
        <Text style={styles.sectionTitle}>Nos attentes</Text>
        <Text style={styles.sectionText}>
          Nous espérons que Triomph pourra :{"\n"}- Inspirer les utilisateurs à
          trier leurs déchets quotidiennement.{"\n"}- Faire découvrir de
          nouvelles méthodes de tri grâce à l’IA.{"\n"}- Apporter une touche
          ludique à une tâche souvent perçue comme fastidieuse.
        </Text>
      </View>

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
  section: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  icon: {
    alignSelf: "center",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333333",
    textAlign: "center",
  },
  sectionText: {
    fontSize: 14,
    color: "#555555",
    lineHeight: 20,
    textAlign: "center",
  },
  teamList: {
    marginTop: 10,
  },
  teamMember: {
    fontSize: 14,
    color: "#555555",
    marginBottom: 5,
    textAlign: "center",
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
