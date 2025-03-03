import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, Button } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { useSession } from "@/hooks/useSession";

export default function UserSettingsMenuScreen() {
  const { disconnectUser } = useSession();

  const handleSignOut = async () => {
    try {
      await disconnectUser();
      alert("Vous vous êtes déconnecté avec succès.");
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
      alert("Une erreur s'est produite lors de la déconnexion.");
    }
  };

  // PARTIE FRONT PUR
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Paramètres utilisateur</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="app/screens/user-settings-menu.tsx" />
      <Button title="Se déconnecter" onPress={handleSignOut} color="#FF3B30" />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
