import { StyleSheet, View, Text, Pressable, ScrollView } from "react-native";
import { Link } from "expo-router";
import { useForm } from "react-hook-form";

import { routes } from "@/routes/routes";
import Toast from "react-native-toast-message";
import { useSession } from "@/hooks/useSession";
import { signInFormAndRules } from "@/constants/formRules";
import Header from "@/components/general/Header";
import FormDisplayer from "@/components/general/FormDisplayer";

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
    <ScrollView style={styles.container}>
      {/* En-tête avec l'image */}
      <Header imageSource={require("@/assets/images/growing-plant.jpg")} />

      <Text style={styles.title}>Bienvenue</Text>
      <Text style={styles.subtitle}>Content de vous revoir !</Text>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={true}
      >
        {/* Affichage du formulaire */}
        <FormDisplayer
          formRules={signInFormAndRules}
          control={control}
          errors={errors}
        />

        <Pressable style={styles.button} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.buttonText}>Se connecter</Text>
        </Pressable>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Vous n'avez pas de compte?</Text>
          <Link href={routes.USER.POLITIQUE.getHref()} style={styles.linkText}>
            Créer un compte
          </Link>
        </View>

        {/* Toast pour les notifications */}
        <Toast />
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Assure que la vue principale prend tout l'écran
    backgroundColor: "white",
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#67AA52",
    marginTop: 20,
    paddingLeft: 20,
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    paddingLeft: 20,
  },
  button: {
    backgroundColor: "#67AA52",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 20,
    width: "100%",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  footer: {
    alignItems: "center",
    marginTop: 10,
  },
  footerText: {
    fontSize: 16,
  },
  linkText: {
    color: "#67AA52",
    fontSize: 16,
    textDecorationLine: "underline",
  },
});
