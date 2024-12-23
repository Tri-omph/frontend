import {
  StyleSheet,
  View,
  Image,
  Text,
  Alert,
  TextInput,
  Pressable,
} from "react-native";
import { useSession } from "@/hooks/useSession";
import FontAwesome from "@expo/vector-icons/FontAwesome";
//import { useNavigation } from "@react-navigation/native";

export default function SignIn() {
  const { createNewUser } = useSession();
  //const navigation = useNavigation();

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

  const handleNavigateSignUp = () => {
    //navigation.navigate("UserSignIn");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("@/assets/images/monstre_v1.png")}
          style={styles.monster}
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Bienvenue</Text>
        <Text style={styles.subtitle}>Content de vous revoir !</Text>

        <View style={styles.inputContainer}>
          <FontAwesome name="user" size={20} color="#888" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Votre adresse email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <View style={styles.inputContainer}>
          <FontAwesome name="lock" size={20} color="#888" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Votre mot de passe"
            secureTextEntry={true}
            placeholderTextColor="#6D6D6D"
          />
        </View>

        <Pressable style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Se connecter</Text>
        </Pressable>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Vous n'avez pas de compte?</Text>
          <Text style={styles.linkText} onPress={handleNavigateSignUp}>
            Créer un compte
          </Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F0F8F4",
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#E8F4E1",
    width: "100%",
    height: "25%",
  },
  monster: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  content: {
    flex: 1,
    width: "80%",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#28A745",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "#000",
    textAlign: "center",
    marginVertical: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 10,
    backgroundColor: "#FFF",
    paddingLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    width: "85%",
    padding: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 10,
    backgroundColor: "#FFF",
  },
  button: {
    backgroundColor: "#28A745",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 20,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  footer: {
    alignItems: "center",
  },
  footerText: {
    color: "#000",
    fontSize: 16,
  },
  linkText: {
    color: "#28A745",
    fontSize: 16,
    textDecorationLine: "underline",
  },
});
