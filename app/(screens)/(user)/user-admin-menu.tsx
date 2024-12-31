import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { useSession } from "@/hooks/useSession";
import { router } from "expo-router";
import { Feather, FontAwesome, MaterialIcons } from "@expo/vector-icons";

export default function UserSettingsMenuScreen() {
  const { disconnectUser } = useSession();

  const handleSignOut = async () => {
    try {
      await disconnectUser();
      router.back(); // Redirection automatique en cas de déconnexion.
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
      alert("Une erreur s'est produite lors de la déconnexion.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("@/assets/images/monstre_v3.png")}
          style={styles.monster}
        />
        <TouchableOpacity style={styles.logoutButton} onPress={handleSignOut}>
          <Text style={styles.logoutText}>Déconnexion</Text>
          <FontAwesome
            name="sign-out"
            size={18}
            color="#FFF"
            style={styles.logoutIcon}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.adminModeBanner}>
        <Text style={styles.adminModeText}>
          Vous êtes en mode administrateur
        </Text>
      </View>

      <View style={styles.options}>
        <TouchableOpacity
          style={styles.optionItem}
          onPress={() => router.push("/user-modification-donnees")}
        >
          <View style={styles.iconContainer}>
            <FontAwesome name="user" size={24} color="#6AA84F" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.optionTitle}>Vos informations</Text>
            <Text style={styles.optionSubtitle}>
              Modifier vos informations personnelles
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionItem}
          onPress={() => router.push("/user-image-fond")}
        >
          <View style={styles.iconContainer}>
            <MaterialIcons name="photo-library" size={24} color="#6AA84F" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.optionTitle}>Image de fond</Text>
            <Text style={styles.optionSubtitle}>
              Choisir l'image de fond qui vous convient !
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionItem}
          onPress={() => router.push("/user-tutoriel")}
        >
          <View style={styles.iconContainer}>
            <Feather name="target" size={24} color="#6AA84F" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.optionTitle}>Tutoriel</Text>
            <Text style={styles.optionSubtitle}>
              Un petit rappel du fonctionnement de l’application
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionItem}
          onPress={() => router.push("/user-about-us")}
        >
          <View style={styles.iconContainer}>
            <FontAwesome name="info-circle" size={24} color="#6AA84F" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.optionTitle}>Qui sommes nous ?</Text>
            <Text style={styles.optionSubtitle}>
              Quelques informations sur la mission et l’équipe...
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.optionItem}
          onPress={() => router.push("/user-admin-role")}
        >
          <View style={styles.iconContainer}>
            <Feather name="archive" size={24} color="#6AA84F" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.optionTitle}>Mode administrateur</Text>
            <Text style={styles.optionSubtitle}>
              Rechercher un joueur et le sanctionner si besoin.
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.adminButton}
        onPress={() => router.push("/(tabs)")}
      >
        <Text style={styles.adminButtonText}>Quitter le mode admin</Text>
        <FontAwesome
          name="codepen"
          size={18}
          color="#FFF"
          style={styles.adminIcon}
        />
      </TouchableOpacity>

      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#E8F4E1",
  },
  monster: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
  logoutButton: {
    backgroundColor: "#000",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    left: "-4%",
    alignItems: "center",
  },
  logoutText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  options: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 40,
    height: 40,
    backgroundColor: "#E8F5E9",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  optionSubtitle: {
    fontSize: 14,
    color: "#777",
    marginTop: 5,
  },
  adminButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 20,
    marginTop: 20,
  },
  adminIcon: {
    marginLeft: 10,
  },
  adminButtonText: {
    fontSize: 16,
    color: "#FFF",
    fontWeight: "bold",
  },
  logoutIcon: {
    marginLeft: 10,
  },
  adminModeBanner: {
    backgroundColor: "#FFE4E1", // Fond rosé
    padding: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 15,
  },
  adminModeText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#D9534F", // Texte rouge pâle
  },
});
