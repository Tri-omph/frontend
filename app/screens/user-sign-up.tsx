import { Text, View, Button, Alert } from "react-native";
import { useSession } from "@/hooks/useSession";

export default function SignIn() {
  const { createNewUser } = useSession();

  const handleSignUp = async () => {
    const defaultUser = {
      username: "defaultUser",
      password: "defaultPassword",
      email: "default@example.com",
    };

    try {
      const res = await createNewUser(defaultUser);
      Alert.alert("Succès", "Compte créé avec succès !", [{ text: "OK" }]);
      console.log("Nouvel utilisateur créé :", res);
    } catch (error) {
      Alert.alert("Erreur", "Impossible de créer le compte.", [{ text: "OK" }]);
      console.error("Erreur lors de la création du compte :", error);
    }
  };

  return (
    <View>
      <Text>Sign up</Text>
      <Button
        title="Créer un compte par défaut"
        onPress={handleSignUp}
        color="#007BFF"
      />
    </View>
  );
}
