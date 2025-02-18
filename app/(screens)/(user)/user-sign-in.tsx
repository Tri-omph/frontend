import { StyleSheet, View, Image, Text, Pressable } from "react-native";
import { Link } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useForm } from "react-hook-form";

import FormInput from "@/components/user/FormInput";
import { routes } from "@/routes/routes";
import Toast from "react-native-toast-message";
import { useSession } from "@/hooks/useSession";
import { signInFormAndRules } from "@/constants/formRules";

export default function SignIn() {
  const { handleSignIn } = useSession();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: {
    username: string;
    password: string;
    email: string;
    confirmPassword: string;
  }) => {
    handleSignIn(data);
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

        {signInFormAndRules.map((rule) => (
          <View key={rule.name} style={styles.inputContainer}>
            <FontAwesome
              name={rule.name === "login" ? "user" : "lock"}
              size={20}
              color="#888"
              style={styles.icon}
            />
            <FormInput
              name={rule.name}
              control={control}
              errors={errors}
              placeholder={rule.placeholder}
              keyboardType={rule.keyboardType}
              secureTextEntry={rule.secureTextEntry}
              rules={rule.rules}
            />
          </View>
        ))}

        <Pressable style={styles.button} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.buttonText}>Se connecter</Text>
        </Pressable>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Vous n'avez pas de compte?</Text>
          <Link href={routes.USER.POLITIQUE.getHref()} style={styles.linkText}>
            Créer un compte
          </Link>
        </View>
      </View>
      <Toast />
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
  increaseFontButton: {
    marginTop: 20,
    backgroundColor: "#FF6347",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  increaseFontText: {
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "center",
  },
});
