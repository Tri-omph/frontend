import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  Pressable,
} from "react-native";
//import { useSession } from "@/hooks/useSession";
//import { router } from "expo-router";

export default function UserSignUpScreen() {
  const handleSignUp = () => {
    console.log("Inscription");
  };
  /*
  const { createNewUser } = useSession();
  const handleSignUp = async () => {
    const defaultUser = {
      username: "defaultUser",
      password: "defaultPassword",
      email: "default@example.com",
    };

    try {
      const res = await createNewUser(defaultUser);
      console.log("Nouvel utilisateur créé :", res);
      router.replace("/(tabs)"); // Si on doit attendre la résolution d'une fonction, on se doit d'utiliser router.replace après un "await" => ici, retour à "home"
    } catch (error) {
      console.error("Erreur lors de la création du compte :", error);
    }
  };*/

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("@/assets/images/monstre_v1.png")}
          style={styles.monster}
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Inscription</Text>
        <Text style={styles.subtitle}>
          Créer votre compte pour utiliser l'application
        </Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nom d'utilisateur</Text>
          <TextInput
            style={styles.input}
            placeholder="Votre nom d'utilisateur"
            placeholderTextColor="#6D6D6D"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Adresse mail</Text>
          <TextInput
            style={styles.input}
            placeholder="Votre email"
            keyboardType="email-address"
            placeholderTextColor="#6D6D6D"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Mot de passe</Text>
          <TextInput
            style={styles.input}
            placeholder="Mot de passe"
            secureTextEntry={true}
            placeholderTextColor="#6D6D6D"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Confirmer le mot de passe</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirmer le mot de passe"
            secureTextEntry={true}
            placeholderTextColor="#6D6D6D"
          />
        </View>

        <Pressable style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Je m'inscris</Text>
        </Pressable>
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
    height: "20%",
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
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    color: "#000",
  },
  input: {
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 10,
    backgroundColor: "#FFF",
    padding: 15,
    marginVertical: 5,
    color: "#6D6D6D",
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
});
