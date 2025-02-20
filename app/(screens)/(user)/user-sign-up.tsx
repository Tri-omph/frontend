import React from "react";
import { StyleSheet, Text, Pressable, ScrollView } from "react-native";
import Toast from "react-native-toast-message";

import { useSession } from "@/hooks/useSession";
import { signUpFormAndRules } from "@/constants/formRules";
import { useUserActions } from "@/hooks/useUserActions";
import { useUserInformation } from "@/context/UserInformationContext";
import FormDisplayer from "@/components/general/FormDisplayer";
import Header from "@/components/general/Header"; // Si le Header est utilisé dans SignIn, il peut aussi être réutilisé ici

export default function UserSignUpScreen() {
  const { control, handleSubmit, errors } = useUserActions();
  const { handleSignUp } = useSession();
  const { saveImage } = useUserInformation();

  const onSubmit = (data: {
    username: string;
    password: string;
    email: string;
    confirmPassword: string;
  }) => {
    const signUpData = { ...data, saveImage };
    handleSignUp(signUpData);
  };

  return (
    <ScrollView style={styles.container}>
      {/* En-tête avec l'image */}
      <Header imageSource={require("@/assets/images/growing-plant.jpg")} />

      <Text style={styles.title}>Inscription</Text>
      <Text style={styles.subtitle}>
        Créer votre compte pour utiliser l'application
      </Text>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={true}
      >
        {/* Affichage du formulaire */}
        <FormDisplayer
          formRules={signUpFormAndRules}
          control={control}
          errors={errors}
        />

        <Pressable style={styles.button} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.buttonText}>Je m'inscris</Text>
        </Pressable>

        {/* Toast pour notifications */}
        <Toast />
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white", // J'ai changé le fond de la page en blanc, comme pour la page de connexion
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
});
