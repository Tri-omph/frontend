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
import Toast from "react-native-toast-message";
import { router } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

import MenuOption from "@/components/user/MenuOption";
import userMenuOptions from "@/constants/UserMenuOptions";
import resources from "@/constants/Resources";

export default function UserSettingsMenuScreen() {
  const { handleSignOut } = useSession();

  const handleAdminSignIn = async () => {
    router.replace("/user-admin-menu");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={resources.monster_v2} style={styles.monster} />
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

      <TouchableOpacity style={styles.adminButton} onPress={handleAdminSignIn}>
        <Text style={styles.adminButtonText}>Mode admin</Text>
        <FontAwesome
          name="cube"
          size={18}
          color="#FFF"
          style={styles.adminIcon}
        />
      </TouchableOpacity>

      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      <Toast />
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
  logoutIcon: {
    marginLeft: 10,
  },
});
