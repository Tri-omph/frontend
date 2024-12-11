import { Text, View, Button } from "react-native";
import UserManager from "@/services/managers/userManager";

export default function SignIn() {
  // Utilisation correcte du Hook ici
  //const { signIn, signOut, session } = useAuthContext();

  const createNewUser = async () => {
    try {
      const res = await UserManager.AUTH_USER({
        username: "john_doe",
        password: "securePassword123",
      });
      console.log("Fin de la requête: ", res);
    } catch (error) {
      console.error("ERROR :", error);
    }
  };

  return (
    <View>
      <Text>Sign In</Text>
      <Button
        title="Créer un compte par défaut"
        onPress={createNewUser}
        color="#007BFF"
      />
    </View>
  );
}
