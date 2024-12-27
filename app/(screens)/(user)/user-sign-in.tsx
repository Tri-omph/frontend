import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  Pressable,
} from "react-native";
import { useSession } from "@/hooks/useSession";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import { Link, router } from "expo-router";
import { routes } from "@/routes/routes";

export default function SignIn() {
  const { createNewUser } = useSession();

  // /!\ ATTENTION, effectivement, on est sur la page sign in, mais on réalise un sign up,  c'est parce que à l'époque
  // où j'ai mis en place la base du projet, seul cet endpoints était pseudo-focntionnel. Dis moi, lorsque tu souhaites
  // revenir dessus, je te montrerai une fois la coonexion avec le back et tu verras que c'est toujours la meme chose !
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
            placeholderTextColor="#6D6D6D"
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
          <Link href={routes.USER.SIGN_UP.getHref()} style={styles.linkText}>
            Créer un compte
          </Link>
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
