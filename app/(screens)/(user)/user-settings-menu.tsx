import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { useSession } from "@/hooks/useSession";
import Toast from "react-native-toast-message";
import { router } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

import MenuOption from "@/components/user/MenuOption";
import userMenuOptions from "@/constants/UserMenuOptions";
import Header from "@/components/general/Header";
import { ScrollView } from "react-native-gesture-handler";

export default function UserSettingsMenuScreen() {
  const { handleSignOut } = useSession();

  const handleAdminSignIn = async () => {
    router.replace("/admin-search");
  };

  return (
    <ScrollView style={styles.container}>
      {/* En-tête avec le titre et le sous-titre */}
      <Header
        title="Paramètres utilisateur"
        subtitle="Gérer vos informations et paramètres"
      />

      <View style={styles.content}>
        {/* Menu des options de l'utilisateur */}
        <View style={styles.options}>
          {userMenuOptions.map((menu, index) => (
            <MenuOption
              key={index}
              icon={menu.icon}
              title={menu.title}
              subtitle={menu.subtitle}
              onPress={() => router.push(menu.goToPage)}
            />
          ))}
        </View>

        {/* Bouton pour passer en mode admin */}
        <TouchableOpacity
          style={styles.adminButton}
          onPress={handleAdminSignIn}
        >
          <Text style={styles.adminButtonText}>Mode admin</Text>
          <FontAwesome
            name="cube"
            size={18}
            color="#FFF"
            style={styles.adminIcon}
          />
        </TouchableOpacity>

        {/* Bouton Déconnexion */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleSignOut}>
          <Text style={styles.logoutText}>Déconnexion</Text>
          <FontAwesome
            name="sign-out"
            size={18}
            color="#FFF"
            style={styles.logoutIcon}
          />
        </TouchableOpacity>

        {/* Toast pour notifications */}
        <Toast />
      </View>

      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  options: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  adminButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6AA84F",
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
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    borderRadius: 10,
    padding: 15,
    marginTop: 20,
  },
  logoutIcon: {
    marginLeft: 10,
  },
  logoutText: {
    fontSize: 16,
    color: "#FFF",
    fontWeight: "bold",
  },
});
